// src/components/Pricing.tsx
import { useState } from 'react'
import { tiers } from '../data/tiers'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { motion } from 'framer-motion'

export default function Pricing() {
    const [yearly, setYearly] = useState(false)

    function displayPrice(price: string) {
        const m = Number(price.replace(/[^\d]/g, ''))
        const val = yearly ? m * 10 : m
        const suffix = yearly ? '/yr' : '/mo'
        return `$${val}${suffix}`
    }

    return (
        <section
            id="pricing"
            className="
        relative overflow-hidden
        min-h-screen
        bg-transparent                            /* transparent so seamless-gradient shows */
        flex flex-col items-center
        py-16 px-6 lg:px-12 xl:px-24
      "
        >
            {/** Very faint neon‐gradient wash behind (–z-20) */}
            <div
                className="
          absolute inset-0
          bg-gradient-to-br from-insta-purple/5 via-insta-blue/5 to-insta-pink/5
          -z-20
        "
            />

            {/* Section Heading */}
            <h2
                className="
          text-3xl md:text-4xl lg:text-5xl font-extrabold
          text-transparent bg-clip-text
          bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal
          animate-text-gradient                       /* continuous shimmer */
          drop-shadow-2xl                             /* neon glow */
          text-center mb-12 z-10
        "
            >
                Pricing &amp; Plans
            </h2>

            {/* Toggle Buttons */}
            <div className="flex space-x-4 mb-8 z-10">
                <button
                    className={`
            px-6 py-3 rounded-full text-sm font-semibold
            border-2 border-primary
            ${
                        !yearly
                            ? 'bg-primary/20 text-white animate-glow-pulse'    /* active glowy state */
                            : 'bg-dark2 text-gray-400 hover:text-white hover:bg-primary/30 transition-colors duration-300'
                    }
            focus:outline-none focus:ring-4 focus:ring-electric-magenta /* neon focus ring */
            transform transition-transform duration-300
            hover:scale-105                                          /* pop on hover */
          `}
                    onClick={() => setYearly(false)}
                    aria-pressed={!yearly}
                >
                    Monthly
                </button>
                <button
                    className={`
            px-6 py-3 rounded-full text-sm font-semibold
            border-2 border-primary
            ${
                        yearly
                            ? 'bg-primary/20 text-white animate-glow-pulse'     /* active glowy state */
                            : 'bg-dark2 text-gray-400 hover:text-white hover:bg-primary/30 transition-colors duration-300'
                    }
            focus:outline-none focus:ring-4 focus:ring-electric-magenta /* neon focus ring */
            transform transition-transform duration-300
            hover:scale-105                                          /* pop on hover */
          `}
                    onClick={() => setYearly(true)}
                    aria-pressed={yearly}
                >
                    Yearly
                </button>
            </div>

            {/* “Pick Pro Now” CTA */}
            <Button
                className="
          btn-primary                                 /* neon gradient + glow */
          hover:glow-accent                           /* accent glow on hover */
          focus:ring-6 focus:ring-neon-amber          /* neon focus ring */
          mb-12 w-full max-w-xs
          transform transition-transform duration-300
          hover:scale-105                             /* pop on hover */
          z-10
        "
                onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}
            >
                Pick Pro Now
            </Button>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-10">
                {tiers.map((t) => (
                    <Card
                        key={t.name}
                        className="
              relative
              bg-dark1/60                              /* translucent dark bg (no blur) */
              border border-dark-overlay                /* subtle dark border */
              p-10                                      /* padding inside card */
              text-center space-y-6
              hover:shadow-card-lg                      /* deeper neon shadow on hover */
              transform transition-transform duration-400 ease-out
            "
                    >
                        {/* Highlight Badge */}
                        {t.highlight && (
                            <span
                                className="
                  absolute -top-5 left-1/2 -translate-x-1/2
                  px-5 py-2 rounded-full text-xs font-semibold text-white
                  bg-gradient-to-r from-secondary via-accent to-primary /* vibrant badge gradient */
                  shadow-lg                                           /* badge glow */
                  animate-badge-pulse                                  /* pulsing badge */
                  hover:badge-shake                                    /* subtle shake on hover */
                  transition-all duration-300 ease-in-out
                  z-20
                "
                            >
                Most Popular
              </span>
                        )}

                        {/* Tier Name */}
                        <h3
                            className="
                text-2xl md:text-3xl font-extrabold
                text-transparent bg-clip-text
                bg-gradient-to-r from-primary via-accent to-secondary /* shimmering tier name */
                animate-text-gradient                                /* continuous shimmer */
                drop-shadow-xl                                        /* neon glow shadow */
              "
                        >
                            {t.name}
                        </h3>

                        {/* Tier Price */}
                        <motion.p
                            className="
                text-4xl md:text-5xl font-extrabold
                text-transparent bg-clip-text
                bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal /* premium gradient */
                animate-text-gradient                                            /* continuous shimmer */
                drop-shadow-2xl                                                   /* neon glow */
                my-4
              "
                            animate={{ rotateX: yearly ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {displayPrice(t.price)}
                        </motion.p>

                        {/* Feature List */}
                        <ul className="text-gray-300 space-y-3 text-left list-disc list-inside">
                            {t.features.map((f) => (
                                <li
                                    key={f}
                                    className="
                    flex items-center space-x-2
                    before:content-['✓'] before:text-primary               /* checkmark icon */
                    before:animate-badge-pulse                             /* pulsing checkmark */
                    hover:text-white transition-colors duration-200        /* brighten on hover */
                  "
                                >
                                    <span className="flex-1">{f}</span>
                                </li>
                            ))}
                        </ul>

                        {/* “Choose Plan” Button */}
                        <Button
                            className="
                btn-primary                                   /* neon gradient + glow */
                hover:glow-accent                             /* accent glow on hover */
                focus:ring-6 focus:ring-neon-amber            /* neon focus ring */
                mt-6 w-full
                transform transition-transform duration-300
                hover:scale-105                               /* pop on hover */
              "
                            onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}
                        >
                            Choose Plan
                        </Button>
                    </Card>
                ))}
            </div>
        </section>
    )
}
