import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ProgressBar } from "../../components/ProgressBar";
import { reset } from "./wizardSlice";
import type { RootState } from "../../store";
import { BusinessInfoStep } from "./BusinessInfoStep";
import { AIPricingStep } from "./AIPricingStep";
import { AIMarketingStep } from "./AIMarketingStep";
import { ReviewPublishStep } from "./ReviewPublishStep";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  BusinessInfoStep,
  AIPricingStep,
  AIMarketingStep,
  ReviewPublishStep,
];

const fadeSlide = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export default function WizardLayout() {
  const { stepIndex } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { basics, pricing, marketing } = useSelector(
    (s: RootState) => s.wizard,
  );

  let maxCompleted = 0;
  if (basics) maxCompleted = 1;
  if (pricing) maxCompleted = 2;
  if (marketing) maxCompleted = 3;

  const urlStep = Number(stepIndex) || 0;
  const currentStep = Math.min(urlStep, maxCompleted);
  const Step = steps[currentStep] ?? steps[0];

  useEffect(() => {
    if (urlStep !== currentStep) {
      navigate(`/wizard/${currentStep}`, { replace: true });
    }
  }, [urlStep, currentStep, navigate]);

  const handleNext = () =>
    navigate(`/wizard/${Math.min(currentStep + 1, steps.length - 1)}`);
  const handleBack = () => {
    if (currentStep === 0) navigate("/");
    else navigate(`/wizard/${currentStep - 1}`);
  };
  const handleExit = () => {
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-dark1">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex justify-between items-center">
          <button
            className="text-sm text-gray-400 hover:underline"
            onClick={handleExit}
          >
            Exit Wizard
          </button>
          <ProgressBar currentStep={currentStep + 1} total={steps.length} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={fadeSlide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Step onNext={handleNext} onBack={handleBack} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
