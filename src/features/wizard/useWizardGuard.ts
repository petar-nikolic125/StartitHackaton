import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";

export function useWizardGuard(step: number) {
  const navigate = useNavigate();
  const { basics, pricing, marketing } = useSelector(
    (s: RootState) => s.wizard,
  );

  useEffect(() => {
    if (step > 0 && !basics) navigate("/wizard");
    else if (step > 1 && !pricing) navigate("/wizard");
    else if (step > 2 && !marketing) navigate("/wizard");
  }, [step, basics, pricing, marketing, navigate]);
}
