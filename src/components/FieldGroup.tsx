import { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
}

export function FieldGroup({ label, children }: Props) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-gray-200">{label}</span>
      {children}
    </label>
  );
}
