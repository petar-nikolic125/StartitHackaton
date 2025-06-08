// src/features/wizard/AIPricingStep.tsx
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { tiers as staticTiers } from "../../data/tiers";
import { Card } from "../../components/ui/Card";
import { motion } from "framer-motion";
import type { PricingData } from "./types";

export interface PricingHandles {
  isValid: () => boolean;
  getData: () => PricingData;
}

const fadeSlide = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export const AIPricingStep = forwardRef<PricingHandles>((_, ref) => {
  // billing cycle toggle
  const [yearly, setYearly] = useState(false);
  // which tier is selected by name
  const [selected, setSelected] = useState<string | null>(null);

  // expose to WizardFlow
  useImperativeHandle(ref, () => ({
    isValid: () => selected !== null,
    getData: (): PricingData => ({
      selectedTier: selected!,
      yearly,
    }),
  }));

  // Preselect “Pro” if nothing chosen
  useEffect(() => {
    if (!selected) {
      const popular = staticTiers.find((t) => t.highlight);
      setSelected(popular?.name ?? staticTiers[0].name);
    }
  }, [selected]);

  function displayPrice(priceStr: string) {
    const base = Number(priceStr.replace(/[^\d]/g, ""));
    const amount = yearly ? base * 10 : base;
    const suffix = yearly ? "/yr" : "/mo";
    return `$${amount}${suffix}`;
  }

  return (
      <motion.div
          className="space-y-6"
          variants={fadeSlide}
          initial="initial"
          animate="animate"
      >
        {/* Monthly / Yearly Toggle */}
        <div className="flex justify-center space-x-4">
          {["Monthly", "Yearly"].map((mode) => {
            const isYearly = mode === "Yearly";
            const active = yearly === isYearly;
            return (
                <button
                    key={mode}
                    onClick={() => setYearly(isYearly)}
                    aria-pressed={active}
                    className={`
                px-6 py-2 rounded-full text-sm font-semibold border-2 border-primary
                ${
                        active
                            ? "bg-primary/20 text-white animate-glow-pulse"
                            : "bg-dark2 text-gray-400 hover:text-white hover:bg-primary/30 transition"
                    }
                focus:outline-none focus:ring-4 focus:ring-electric-magenta
                transform transition-transform hover:scale-105
              `}
                >
                  {mode}
                </button>
            );
          })}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {staticTiers.map((tier) => {
            const isSelected = selected === tier.name;
            return (
                <Card
                    key={tier.name}
                    onClick={() => setSelected(tier.name)}
                    className={`
                relative p-8 text-center cursor-pointer
                bg-dark1/60 border border-dark-overlay
                transform transition-shadow duration-300
                ${isSelected ? "shadow-card-lg" : "hover:shadow-card-lg"}
                ${isSelected ? "scale-105" : "hover:scale-105"}
              `}
                >
                  {tier.highlight && (
                      <span
                          className="
                    absolute -top-5 left-1/2 -translate-x-1/2
                    px-4 py-1 rounded-full text-xs font-semibold text-white
                    bg-gradient-to-r from-secondary via-accent to-primary
                    shadow-lg animate-badge-pulse
                  "
                      >
                  Most Popular
                </span>
                  )}

                  <h3
                      className="
                  text-2xl font-extrabold
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-primary via-accent to-secondary
                  animate-text-gradient drop-shadow-xl
                "
                  >
                    {tier.name}
                  </h3>

                  <motion.p
                      className="
                  text-4xl font-extrabold my-4
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal
                  animate-text-gradient drop-shadow-2xl
                "
                      animate={{ rotateX: yearly ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                  >
                    {displayPrice(tier.price)}
                  </motion.p>

                  <ul className="text-gray-300 space-y-2 text-left list-disc list-inside">
                    {tier.features.map((feat) => (
                        <li
                            key={feat}
                            className="
                      flex items-center space-x-2
                      before:content-['✓'] before:text-primary before:animate-badge-pulse
                      hover:text-white transition-colors duration-200
                    "
                        >
                          <span className="flex-1">{feat}</span>
                        </li>
                    ))}
                  </ul>
                </Card>
            );
          })}
        </div>
      </motion.div>
  );
});

AIPricingStep.displayName = "AIPricingStep";
