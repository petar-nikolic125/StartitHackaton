import { useState } from "react";
import { useDispatch } from "react-redux";
import { setBasics } from "./wizardSlice";
import { FieldGroup } from "../../components/FieldGroup";
import { Button } from "../../components/ui/Button";

interface Props {
  onNext: () => void;
}

export function BusinessInfoStep({ onNext }: Props) {
  const dispatch = useDispatch();
  const [niche, setNiche] = useState("");
  const [productType, setProductType] = useState("");
  const [targetPriceRange, setTargetPriceRange] = useState("");

  const handleNext = () => {
    dispatch(setBasics({ niche, productType, targetPriceRange }));
    onNext();
  };

  return (
    <div className="space-y-4">
      <FieldGroup label="Your niche">
        <input
          className="w-full rounded-md bg-dark2 p-2"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
        />
      </FieldGroup>
      <FieldGroup label="Product type">
        <input
          className="w-full rounded-md bg-dark2 p-2"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        />
      </FieldGroup>
      <FieldGroup label="Target price range">
        <input
          className="w-full rounded-md bg-dark2 p-2"
          value={targetPriceRange}
          onChange={(e) => setTargetPriceRange(e.target.value)}
        />
      </FieldGroup>
      <div className="flex justify-end pt-4">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
