import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { FieldGroup } from "../../components/FieldGroup";
import { Toast } from "../../components/ui/Toast";
import { LoadingDots } from '../../components/LoadingDots';
import { motion } from "framer-motion";
import type { Basics } from './types';

export interface BusinessInfoStepProps {
  onNext(payload: { basics: Basics }): void | Promise<void>;
  onBack(): void;
}

export function BusinessInfoStep({ onNext, onBack }: BusinessInfoStepProps) {
  const basics = useSelector((s: RootState) => s.wizard.basics);
  const [niche, setNiche] = useState("");
  const [productType, setProductType] = useState("");
  const [targetPriceRange, setTargetPriceRange] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const nicheRef = useRef<HTMLInputElement>(null);
  const productRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (basics) {
      setNiche(basics.niche);
      setProductType(basics.productType);
      setTargetPriceRange(basics.targetPriceRange);
    }
  }, [basics]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!niche) errs.niche = "Required";
    if (!productType) errs.productType = "Required";
    if (!targetPriceRange) errs.targetPriceRange = "Required";
    setErrors(errs);
    if (Object.keys(errs).length) {
      setToast("Please complete all required fields.");
      const first = Object.keys(errs)[0];
      const map: Record<string, React.RefObject<Element>> = {
        niche: nicheRef as React.RefObject<Element>,
        productType: productRef as React.RefObject<Element>,
        targetPriceRange: priceRef as React.RefObject<Element>,
      };
      setTimeout(() =>
        map[first]?.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
      50);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await Promise.resolve(
      onNext({ basics: { niche, productType, targetPriceRange } }),
    );
    setLoading(false);
  };

  return (
    <motion.div
      className="space-y-4"
      variants={{ initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } }}
      initial="initial"
      animate="animate"
    >
      <FieldGroup label="Your niche">
        <input
          ref={nicheRef}
          className={`w-full rounded-md bg-dark2 p-2 ${errors.niche ? "border border-red-500" : ""}`}
          value={niche}
          onChange={(e) => {
            setNiche(e.target.value);
            if (errors.niche) setErrors((r) => ({ ...r, niche: "" }));
          }}
        />
        {errors.niche && <p className="text-red-500 text-sm">{errors.niche}</p>}
      </FieldGroup>
      <FieldGroup label="Product type">
        <select
          ref={productRef}
          className={`w-full rounded-md bg-dark2 p-2 ${errors.productType ? "border border-red-500" : ""}`}
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
            if (errors.productType) setErrors((r) => ({ ...r, productType: "" }));
          }}
        >
          <option value="">Select...</option>
          <option value="video">video</option>
          <option value="pdf">pdf</option>
          <option value="coaching">coaching</option>
        </select>
        {errors.productType && (
          <p className="text-red-500 text-sm">{errors.productType}</p>
        )}
      </FieldGroup>
      <FieldGroup label="Target price range">
        <select
          ref={priceRef}
          className={`w-full rounded-md bg-dark2 p-2 ${errors.targetPriceRange ? "border border-red-500" : ""}`}
          value={targetPriceRange}
          onChange={(e) => {
            setTargetPriceRange(e.target.value);
            if (errors.targetPriceRange)
              setErrors((r) => ({ ...r, targetPriceRange: "" }));
          }}
        >
          <option value="">Select...</option>
          <option value="$0-49">$0-49</option>
          <option value="$50-99">$50-99</option>
          <option value="$100+">$100+</option>
        </select>
        {errors.targetPriceRange && (
          <p className="text-red-500 text-sm">{errors.targetPriceRange}</p>
        )}
      </FieldGroup>
      {toast && <Toast message={toast} onClose={() => setToast("")} />}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          className="text-sm text-gray-400 hover:underline"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !!Object.keys(errors).length || !niche || !productType || !targetPriceRange}
          className="bg-primary px-4 py-2 rounded-md text-white disabled:opacity-50 flex items-center justify-center"
        >
          {loading ? <LoadingDots /> : 'Next'}
        </button>
      </div>
    </motion.div>
  );
}

BusinessInfoStep.displayName = 'BusinessInfoStep';
