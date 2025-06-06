import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMarketing } from "./wizardSlice";
import { useGenerateMarketingMutation } from "./aiAgent";
import { Button } from "../../components/ui/Button";
import { LoadingDots } from "../../components/LoadingDots";
import type { RootState } from "../../store";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export function AIMarketingStep({ onNext, onBack }: Props) {
  const dispatch = useDispatch();
  const basics = useSelector((s: RootState) => s.wizard.basics);
  const pricing = useSelector((s: RootState) => s.wizard.pricing);
  const [generate, { data, isLoading }] = useGenerateMarketingMutation();

  useEffect(() => {
    if (basics && pricing) {
      generate({ basics, pricing });
    }
  }, [basics, pricing, generate]);

  useEffect(() => {
    if (data) {
      dispatch(setMarketing(data));
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
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-1">Captions</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {data.captions.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Hashtags</h3>
            <p className="text-sm">{data.hashtags.join(" ")}</p>
          </div>
        </div>
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
