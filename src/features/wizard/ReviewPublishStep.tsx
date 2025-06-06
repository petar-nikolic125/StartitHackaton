import { useSelector } from "react-redux";
import { Button } from "../../components/ui/Button";
import type { RootState } from "../../store";

interface Props {
  onBack: () => void;
}

export function ReviewPublishStep({ onBack }: Props) {
  const { basics, pricing, marketing } = useSelector(
    (s: RootState) => s.wizard,
  );

  return (
    <div className="space-y-4">
      <pre className="bg-dark2 p-4 rounded-md text-sm whitespace-pre-wrap">
        {JSON.stringify({ basics, pricing, marketing }, null, 2)}
      </pre>
      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="solid">
          Back
        </Button>
        <Button>Publish</Button>
      </div>
    </div>
  );
}
