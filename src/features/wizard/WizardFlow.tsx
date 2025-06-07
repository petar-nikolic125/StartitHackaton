// src/features/wizard/WizardFlow.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { TimerBar } from "../../components/TimerBar";         // ← fixed import
import { Button } from "../../components/ui/Button";
import BusinessInfoStep, {
  type BusinessInfoHandles,
} from "./BusinessInfoStep";
import { AIPricingStep, type PricingHandles } from "./AIPricingStep";
import { AIMarketingStep, type MarketingHandles } from "./AIMarketingStep";
import { ReviewPublishStep, type ReviewHandles } from "./ReviewPublishStep";
import SimulationRunner from "../simulator/SimulationRunner";

import {
  setBasics,
  setPricing,
  setMarketing,
  reset as resetWizard,
} from "./wizardSlice";
import type { RootState } from "../../store";
// import type { Basics } from "./types";                  ← removed unused import
import { useNetworkStatus } from "../../hooks/useNetworkStatus";

const fadeSlide = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: 20 },
} as const;

const totalSteps = 4;

export default function WizardFlow() {
  const { stepIndex } = useParams();
  const navigate     = useNavigate();
  const dispatch     = useDispatch();
  useSelector((s: RootState) => s.wizard.basics); // re-render on basics change

  const [idx, setIdx]                   = useState(Number(stepIndex) || 0);
  const [runningSimId, setRunningSimId] = useState<string | null>(null);
  const online                          = useNetworkStatus();

  // keep idx in sync with the URL
  useEffect(() => {
    setIdx(Number(stepIndex) || 0);
  }, [stepIndex]);

  // push new URL whenever idx changes
  useEffect(() => {
    navigate(`/wizard/${idx}`, { replace: true });
  }, [idx, navigate]);

  // refs for each wizard step
  const infoRef      = useRef<BusinessInfoHandles>(null);
  const pricingRef   = useRef<PricingHandles>(null);
  const marketingRef = useRef<MarketingHandles>(null);
  const reviewRef    = useRef<ReviewHandles>(null);


  // “Next” is enabled only if the current step is valid and we’re not already launching
  const canNext =
    idx === 0
      ? (() => {
          const data = infoRef.current?.getData();
          return !!data?.niche && !!data?.productType && !!data?.targetPriceRange;
        })()
      : idx === 1
        ? pricingRef.current?.isValid() ?? false
        : idx === 2
          ? marketingRef.current?.isValid() ?? false
          : !reviewRef.current?.isLaunching?.();

  // generic Next handler for steps 1–3, and “Launch” on step 4
  const handleNext = async () => {
    if (!canNext) return;

    if (idx === 0) {
      if (!infoRef.current?.isValid()) return;
      dispatch(setBasics(infoRef.current.getData()));
      setIdx(1);
      return;
    }

    if (idx === 1) {
      dispatch(setPricing(pricingRef.current!.getData()));
    } else if (idx === 2) {
      dispatch(setMarketing(marketingRef.current!.getData()));
    }

    if (idx === 3) {
      const simId = await reviewRef.current!.launch();
      if (simId) setRunningSimId(simId);
    } else {
      setIdx((i) => i + 1);
    }
  };

  const handleBack = () => {
    if (runningSimId) {
      // once in simulation view, “Back” is a no-op
      return;
    }
    if (idx === 0) navigate("/");
    else setIdx((i) => Math.max(i - 1, 0));
  };

  const handleExit = () => {
    dispatch(resetWizard());
    navigate("/");
  };

  return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-dark1 relative">
        <TimerBar currentStep={idx + 1} total={totalSteps} />

        {!online && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-40 text-white">
              Offline — reconnect to continue.
            </div>
        )}

        <div className="w-full max-w-lg space-y-6">
          <div className="flex justify-between items-center">
            <button
                className="text-sm text-gray-400 hover:underline"
                onClick={handleExit}
            >
              Exit Wizard
            </button>
            {runningSimId && (
                <button
                    className="text-sm text-gray-400 hover:underline"
                    onClick={() => {
                      dispatch(resetWizard());
                      setRunningSimId(null);
                      navigate("/");
                    }}
                >
                  Close Simulation
                </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
                key={idx}
                variants={fadeSlide}
                initial="initial"
                animate="animate"
                exit="exit"
            >
              {runningSimId ? (
                  <SimulationRunner simId={runningSimId} />
              ) : idx === 0 ? (
                  <BusinessInfoStep ref={infoRef} />
              ) : idx === 1 ? (
                  <AIPricingStep ref={pricingRef} />
              ) : idx === 2 ? (
                  <AIMarketingStep ref={marketingRef} />
              ) : (
                  <ReviewPublishStep ref={reviewRef} />
              )}
            </motion.div>
          </AnimatePresence>

          {!runningSimId && (
              <div className="flex justify-between pt-4">
                <Button onClick={handleBack} variant="solid" disabled={!online}>
                  {idx === 0 ? "Exit" : "Back"}
                </Button>
                <Button onClick={handleNext} disabled={!canNext || !online}>
                  {idx === totalSteps - 1 ? "Launch" : "Next"}
                </Button>
              </div>
          )}
        </div>
      </div>
  );
}
