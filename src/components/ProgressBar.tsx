interface Props {
  currentStep: number;
  total: number;
}

export function ProgressBar({ currentStep, total }: Props) {
  const pct = (currentStep / total) * 100;
  return (
    <div className="w-full h-2 bg-dark2 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-width duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
