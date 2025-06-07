import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { TimerBar } from "../../components/TimerBar";
import { Button } from "../../components/ui/Button";
import {
  BusinessInfoStep,
  type BusinessInfoHandles,
} from "./BusinessInfoStep";
import { AIPricingStep, type PricingHandles } from "./AIPricingStep";
import { AIMarketingStep, type MarketingHandles } from "./AIMarketingStep";
import { ReviewPublishStep, type ReviewHandles } from "./ReviewPublishStep";
import {
  setBasics,
  setMarketing,
  setPricing,
  reset,
} from "./wizardSlice";
import { useStartSimMutation } from "../simulator/simApi";
import { setSession } from "../simulator/simSlice";
import type { RootState } from "../../store";
import { useNetworkStatus } from "../../hooks/useNetworkStatus";

const fadeSlide = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const steps = [
  BusinessInfoStep,
  AIPricingStep,
  AIMarketingStep,
  ReviewPublishStep,
];

export default function WizardFlow() {
  const { stepIndex } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { basics } = useSelector((s: RootState) => s.wizard);

  const [idx, setIdx] = useState(Number(stepIndex) || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startSim] = useStartSimMutation();
  const online = useNetworkStatus();

  useEffect(() => {
    setIdx(Number(stepIndex) || 0);
  }, [stepIndex]);

  useEffect(() => {
    navigate(`/wizard/${idx}`, { replace: true });
  }, [idx, navigate]);

  const infoRef = useRef<BusinessInfoHandles>(null);
  const priceRef = useRef<PricingHandles>(null);
  const marketingRef = useRef<MarketingHandles>(null);
  const reviewRef = useRef<ReviewHandles>(null);

  const refs = [infoRef, priceRef, marketingRef, reviewRef];
  const Current = steps[idx];
  const currentRef = refs[idx];

  const canNext = currentRef.current?.isValid?.() ?? false;

  const handleNext = async () => {
    if (!currentRef.current?.isValid()) return;
    const data = currentRef.current.getData();
    if (idx === 0) dispatch(setBasics(data as any));
    else if (idx === 1) dispatch(setPricing(data as any));
    else if (idx === 2) dispatch(setMarketing(data as any));
    if (idx === steps.length - 1) {
      try {
        setLoading(true);
        const res = await startSim({ basics: basics! }).unwrap();
        dispatch(setSession({ simId: res.simId, weekPlan: res.weekPlan, forecast: res.forecast }));
        navigate("/dashboard");
      } catch (err) {
        setError("Failed to start simulation. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setIdx((i) => Math.min(i + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    if (idx === 0) navigate("/");
    else setIdx((i) => Math.max(i - 1, 0));
  };

  const handleExit = () => {
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-dark1 relative">
      <TimerBar currentStep={idx + 1} total={steps.length} />
      {loading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 text-white text-lg">
          Preparing your AI Business Simulation…
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-50 text-white space-y-4">
          <p>{error}</p>
          <Button onClick={handleNext}>Retry</Button>
        </div>
      )}
      {!online && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-40 text-white">
          Offline — reconnect to continue.
        </div>
      )}
      <div className="w-full max-w-lg space-y-6">
        <div className="flex justify-between items-center">
          <button className="text-sm text-gray-400 hover:underline" onClick={handleExit}>
            Exit Wizard
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            variants={fadeSlide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Current ref={currentRef as any} />
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between pt-4">
          <Button onClick={handleBack} variant="solid" disabled={!online}>
            {idx === 0 ? "Exit" : "Back"}
          </Button>
          <Button onClick={handleNext} disabled={!canNext || !online}>
            {idx === steps.length - 1 ? "Start" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
