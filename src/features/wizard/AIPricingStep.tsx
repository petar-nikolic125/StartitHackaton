import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useGeneratePricingMutation } from "./aiAgent";
import { tiers as fallbackTiers } from "../../data/tiers";
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
    if (pricing) {
      setTiers(pricing.tiers);
    } else if (basics) {
      generatePricing(basics);
    }
  }, [basics, pricing, generatePricing]);

  useEffect(() => {
    if (data) {
      setTiers(data.tiers);
    }
    if (data || error) console.log(data, error);
  }, [data, error]);

  useEffect(() => {
    if (error) setErrMsg('Failed to load pricing data.');
  }, [error]);

  // fallback to local pricing tiers when API fails
  useEffect(() => {
    if (error && tiers.length === 0) {
      setTiers(
        fallbackTiers.map((t) => ({
          label: t.name,
          price: Number(String(t.price).replace(/[^0-9.]/g, "")),
        }))
      );
    }
  }, [error, tiers.length]);

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
