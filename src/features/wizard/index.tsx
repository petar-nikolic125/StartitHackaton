import { useState } from "react";
import { ProgressBar } from "../../components/ProgressBar";
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
  const [step, setStep] = useState(0);
  const Step = steps[step];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-dark1">
      <div className="w-full max-w-lg space-y-6">
        <ProgressBar currentStep={step + 1} total={steps.length} />
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={fadeSlide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Step
              onNext={() => setStep(Math.min(step + 1, steps.length - 1))}
              onBack={() => setStep(Math.max(step - 1, 0))}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
