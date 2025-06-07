import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useGeneratePricingMutation } from "./aiAgent";
import { LoadingDots } from "../../components/LoadingDots";
import { Toast } from "../../components/ui/Toast";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { useWizardGuard } from "./useWizardGuard";
import type { PricingData } from "./types";

export interface PricingHandles {
  isValid: () => boolean;
  getData: () => PricingData;
}

export const AIPricingStep = forwardRef<PricingHandles>((_, ref) => {
  const basics = useSelector((s: RootState) => s.wizard.basics);
  const pricing = useSelector((s: RootState) => s.wizard.pricing);
  const [generatePricing, { data, error, isLoading }] =
    useGeneratePricingMutation();
  const [tiers, setTiers] = useState<Array<{ label: string; price: number }>>([]);
  const [toast, setToast] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useWizardGuard(1);

  useEffect(() => {
    if (pricing) setTiers(pricing.tiers);
    else if (basics) generatePricing(basics);
  }, [pricing, basics, generatePricing]);

  useEffect(() => {
    if (data) setTiers(data.tiers);
  }, [data]);

  useEffect(() => {
    if (error) setErrMsg('Failed to load pricing data.');
  }, [error]);

  const validate = () => {
    const invalid = tiers.length === 0 || tiers.some((t) => !t.label || !t.price);
    if (invalid) {
      setToast("Please review your pricing tiers.");
      return false;
    }
    return true;
  };

  useImperativeHandle(ref, () => ({
    isValid: validate,
    getData: () => ({ tiers }),
  }));

  return (
    <motion.div
      className="space-y-4"
      variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }}
      initial="initial"
      animate="animate"
    >
      {isLoading && (
        <div className="text-center py-10">
          <LoadingDots />
        </div>
      )}
      {!isLoading && tiers.length === 0 && (
        <div className="space-y-2 text-center">
          <p>{errMsg || 'No pricing data available.'}</p>
          <Button onClick={() => basics && generatePricing(basics)}>Retry</Button>
        </div>
      )}
      {tiers.length > 0 && (
        <ul className="space-y-2">
          {tiers.map((t, idx) => (
            <li key={idx} className="bg-dark2 rounded-md p-2 flex space-x-2">
              <input
                className="bg-transparent flex-1"
                value={t.label}
                onChange={(e) => {
                  const copy = [...tiers];
                  copy[idx].label = e.target.value;
                  setTiers(copy);
                }}
              />
              <input
                type="number"
                className="w-20 bg-transparent"
                value={t.price}
                onChange={(e) => {
                  const copy = [...tiers];
                  copy[idx].price = Number(e.target.value);
                  setTiers(copy);
                }}
              />
            </li>
          ))}
        </ul>
      )}
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </motion.div>
  );
});

AIPricingStep.displayName = "AIPricingStep";
