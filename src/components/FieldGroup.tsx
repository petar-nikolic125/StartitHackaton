// src/components/FieldGroup.tsx
import { ReactNode } from "react";

interface FieldGroupProps {
  /** Now accepts strings, JSX, fragments, etc. */
  label: ReactNode;
  children: ReactNode;
}

export function FieldGroup({ label, children }: FieldGroupProps) {
  return (
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
        {children}
      </div>
  );
}
