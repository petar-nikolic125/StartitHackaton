// src/features/wizard/IdeaStep.tsx
import { forwardRef, useImperativeHandle, useState, useCallback } from "react";
import { FieldGroup } from "../../components/FieldGroup";
import { Toast } from "../../components/ui/Toast";
import { motion } from "framer-motion";
import type { Basics } from "./types";

export interface IdeaHandles {
    isValid(): boolean;
    getData(): Pick<Basics, 'idea'>;
}

const fade = { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } };

const IdeaStep = forwardRef<IdeaHandles>((_, ref) => {
    const [idea, setIdea] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [toast, setToast] = useState<string>("");

    // Validation
    const validate = useCallback((): boolean => {
        if (!idea.trim()) {
            setError("Please describe your idea.");
            setToast("A detailed idea description is required.");
            return false;
        }
        setError("");
        return true;
    }, [idea]);

    // Expose to WizardFlow
    useImperativeHandle(
        ref,
        () => ({
            isValid: validate,
            getData: () => ({ idea }),
        }),
        [validate, idea]
    );

    return (
        <motion.div
            className="space-y-4"
            variants={fade}
            initial="initial"
            animate="animate"
        >
            {toast && <Toast message={toast} onClose={() => setToast("")} />}

            <FieldGroup label="Describe your business idea in detail">
        <textarea
            className={`w-full bg-dark2 p-3 rounded-lg text-gray-100 border-2 transition-all h-40 resize-y
            focus:border-primary focus:ring-2 focus:ring-primary/50 ${error ? "border-red-500" : "border-dark-overlay"}`}
            value={idea}
            maxLength={2000}
            placeholder="Enter your full vision, features, market approach, etc..."
            onChange={(e) => setIdea(e.target.value)}
        />
                {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
            </FieldGroup>
        </motion.div>
    );
});

IdeaStep.displayName = "IdeaStep";
export default IdeaStep;
