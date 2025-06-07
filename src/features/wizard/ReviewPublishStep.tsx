import {
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { motion } from "framer-motion";
import type { Basics, PricingData, MarketingData } from "./types";

export interface ReviewHandles {
  isValid: () => boolean;
  getData: () => { basics: Basics | null; pricing: PricingData | null; marketing: MarketingData | null };
}

export const ReviewPublishStep = forwardRef<ReviewHandles>((_, ref) => {
  const data = useSelector((s: RootState) => s.wizard);

  useImperativeHandle(ref, () => ({
    isValid: () => true,
    getData: () => data,
  }));

  return (
    <motion.div
      className="space-y-4"
      variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }}
      initial="initial"
      animate="animate"
    >
      <pre className="bg-dark2 p-4 rounded-md text-sm whitespace-pre-wrap">
        {JSON.stringify(data, null, 2)}
      </pre>
    </motion.div>
  );
});

ReviewPublishStep.displayName = "ReviewPublishStep";
