import { forwardRef, useImperativeHandle, useState } from "react";
import { FieldGroup } from "../../components/FieldGroup";
import { motion } from "framer-motion";

export interface PromptHandles {
  isValid(): boolean;
  getData(): { prompt: string };
}

const fade = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } };

const PromptStep = forwardRef<PromptHandles>((_, ref) => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const validate = (): boolean => {
    if (!prompt.trim()) {
      setError("Please enter a prompt describing your business.");
      return false;
    }
    setError("");
    return true;
  };

  useImperativeHandle(ref, () => ({
    isValid: validate,
    getData: () => ({ prompt }),
  }));

  return (
    <motion.div
      className="space-y-4"
      variants={fade}
      initial="initial"
      animate="animate"
    >
      <FieldGroup label="Write a prompt for the AI to understand your business">
        <textarea
          className={`w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 transition-all h-36 resize-y ${
            error
              ? "border-red-500"
              : "border-dark-overlay focus:border-primary focus:ring-2 focus:ring-primary/50"
          }`}
          placeholder="e.g. Help me grow my online fitness course..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
      </FieldGroup>
    </motion.div>
  );
});

PromptStep.displayName = "PromptStep";
export default PromptStep;
