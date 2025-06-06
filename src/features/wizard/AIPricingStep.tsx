import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPricing } from "./wizardSlice";
import { useGeneratePricingMutation } from "./aiAgent";
import { Button } from "../../components/ui/Button";
import { LoadingDots } from "../../components/LoadingDots";
import type { RootState } from "../../store";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function AIPricingStep({ onNext, onBack }: Props) {
  const dispatch = useDispatch();
  const basics = useSelector((s: RootState) => s.wizard.basics);
  const [generatePricing, { data, isLoading }] = useGeneratePricingMutation();

  useEffect(() => {
    if (basics) {
      generatePricing(basics);
    }
  }, [basics, generatePricing]);

  useEffect(() => {
    if (data) {
      dispatch(setPricing(data));
    }
  }, [data, dispatch]);

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="text-center py-10">
          <LoadingDots />
        </div>
      )}
      {data && (
        <ul className="space-y-2">
          {data.tiers.map((t) => (
            <li key={t.label} className="bg-dark2 rounded-md p-2">
              {t.label}: ${t.price}
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="solid">
          Back
        </Button>
        <Button onClick={onNext} disabled={!data}>
          Next
        </Button>
      </div>
    </div>
  );
}
