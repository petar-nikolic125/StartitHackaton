// src/features/wizard/BusinessInfoStep.tsx
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import type { Basics } from "./types";
import { FieldGroup } from "../../components/FieldGroup";
import { Toast } from "../../components/ui/Toast";
import { motion } from "framer-motion";

export interface BusinessInfoHandles {
  /** Returns true only if all 3 fields are non‐empty */
  isValid(): boolean;
  /** Returns the current form data */
  getData(): Basics;
}

export interface BusinessInfoStepProps {
  /** Called any time any field changes */
  onChange?: (data: Basics) => void;
}

const fade = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

const BusinessInfoStep = forwardRef<
  BusinessInfoHandles,
  BusinessInfoStepProps
>(({ onChange }, ref) => {
  const stored = useSelector((s: RootState) => s.wizard.basics);

  const [niche, setNiche] = useState("");
  const [productType, setProductType] = useState("");
  const [targetPriceRange, setTargetPriceRange] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");

  const nicheRef = useRef<HTMLInputElement>(null);
  const prodRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLSelectElement>(null);

  // hydrate from Redux if already set
  useEffect(() => {
    if (stored) {
      setNiche(stored.niche);
      setProductType(stored.productType);
      setTargetPriceRange(stored.targetPriceRange);
    }
  }, [stored]);

  // notify parent on every field change
  useEffect(() => {
    onChange?.({ niche, productType, targetPriceRange });
  }, [niche, productType, targetPriceRange, onChange]);

  // stable validate fn: sets errors, shows toast & scrolls if any required missing
  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!niche) errs.niche = "Required";
    if (!productType) errs.productType = "Required";
    if (!targetPriceRange) errs.targetPriceRange = "Required";
    setErrors(errs);

    if (Object.keys(errs).length) {
      setToast("Please complete all required fields");
      const firstKey = Object.keys(errs)[0];
      const map: Record<string, HTMLElement | null> = {
        niche: nicheRef.current,
        productType: prodRef.current,
        targetPriceRange: priceRef.current,
      };
      const el = map[firstKey];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return false;
    }
    return true;
  }, [niche, productType, targetPriceRange]);

  // expose isValid() and getData() through the ref
  useImperativeHandle(
    ref,
    () => ({
      isValid: validate,
      getData: () => ({ niche, productType, targetPriceRange }),
    }),
    [validate, niche, productType, targetPriceRange]
  );

  return (
    <motion.div
      className="space-y-4"
      variants={fade}
      initial="initial"
      animate="animate"
    >
      <FieldGroup label="Your niche">
        <input
          ref={nicheRef}
          className={`w-full rounded-md bg-dark2 p-2 ${
            errors.niche ? "border-red-500 border" : ""
          }`}
          value={niche}
          onChange={(e) => {
            setNiche(e.target.value);
            if (errors.niche) setErrors((e) => ({ ...e, niche: "" }));
          }}
        />
        {errors.niche && (
          <p className="text-sm text-red-500">{errors.niche}</p>
        )}
      </FieldGroup>

      <FieldGroup label="Product type">
        <select
          ref={prodRef}
          className={`w-full rounded-md bg-dark2 p-2 ${
            errors.productType ? "border-red-500 border" : ""
          }`}
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
            if (errors.productType)
              setErrors((e) => ({ ...e, productType: "" }));
          }}
        >
          <option value="">Select…</option>
          <option value="video">video</option>
          <option value="pdf">pdf</option>
          <option value="coaching">coaching</option>
        </select>
        {errors.productType && (
          <p className="text-sm text-red-500">{errors.productType}</p>
        )}
      </FieldGroup>

      <FieldGroup label="Target price range">
        <select
          ref={priceRef}
          className={`w-full rounded-md bg-dark2 p-2 ${
            errors.targetPriceRange ? "border-red-500 border" : ""
          }`}
          value={targetPriceRange}
          onChange={(e) => {
            setTargetPriceRange(e.target.value);
            if (errors.targetPriceRange)
              setErrors((e) => ({ ...e, targetPriceRange: "" }));
          }}
        >
          <option value="">Select…</option>
          <option value="$0-49">$0–49</option>
          <option value="$50-99">$50–99</option>
          <option value="$100+">$100+</option>
        </select>
        {errors.targetPriceRange && (
          <p className="text-sm text-red-500">{errors.targetPriceRange}</p>
        )}
      </FieldGroup>

      {toast && <Toast message={toast} onClose={() => setToast("")} />}
    </motion.div>
  );
});

BusinessInfoStep.displayName = "BusinessInfoStep";
export default BusinessInfoStep;
export { BusinessInfoStep };
