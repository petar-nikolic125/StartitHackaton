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
        bg-dark1                                   /* NEW: deep dark background */
        before:absolute before:inset-0 before:scroll-warp /* NEW: subtle warp effect */
        flex flex-col items-center
        py-16 px-6 lg:px-12 xl:px-24
      "
        >
            {/* Section Heading */}
            <h2
                className="
          text-3xl md:text-4xl lg:text-5xl font-extrabold
          text-transparent bg-clip-text
          bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal
          animate-text-gradient                       /* NEW: continuous shimmer */
          drop-shadow-2xl                             /* NEW: neon glow */
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
                            ? 'bg-primary/20 text-white animate-glow-pulse' /* NEW: active glowy state */
                            : 'bg-dark2 text-gray-400 hover:text-white hover:bg-primary/30 transition-colors duration-300'
                    }
            focus:outline-none focus:ring-4 focus:ring-electric-magenta /* NEW: neon focus ring */
            transform transition-transform duration-300
            hover:scale-105                                /* NEW: pop on hover */
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
                            ? 'bg-primary/20 text-white animate-glow-pulse' /* NEW: active glowy state */
                            : 'bg-dark2 text-gray-400 hover:text-white hover:bg-primary/30 transition-colors duration-300'
                    }
            focus:outline-none focus:ring-4 focus:ring-electric-magenta /* NEW: neon focus ring */
            transform transition-transform duration-300
            hover:scale-105                                /* NEW: pop on hover */
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
          btn-primary                                 /* NEW: neon gradient + glow */
          hover:glow-accent                           /* NEW: accent glow on hover */
          focus:ring-6 focus:ring-neon-amber          /* NEW: neon focus ring */
          mb-12 w-full max-w-xs
          transform transition-transform duration-300
          hover:scale-105                             /* NEW: pop on hover */
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
                        className={`
              relative
              glass-card                                /* NEW: glassmorphic panel */
              hover:floatY                              /* NEW: 3D float on hover */
              hover:shadow-card-lg                      /* NEW: deeper neon shadow */
              transform transition-transform duration-400 ease-out
              bg-dark1/60                               /* translucent dark bg */
              border border-dark-overlay                /* NEW: subtle dark border */
              p-10                                       /* NEW: padding inside card */
              text-center space-y-6
            `}
                    >
                        {/* Highlight Badge */}
                        {t.highlight && (
                            <span
                                className="
                  absolute -top-5 left-1/2 -translate-x-1/2
                  px-5 py-2 rounded-full text-xs font-semibold text-white
                  bg-gradient-to-r from-secondary via-accent to-primary /* NEW: vibrant badge gradient */
                  shadow-lg                                           /* NEW: badge glow */
                  animate-badge-pulse                                  /* NEW: pulsing badge */
                  hover:badge-shake                                    /* NEW: subtle shake on hover */
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
                bg-gradient-to-r from-primary via-accent to-secondary /* NEW: shimmering tier name */
                animate-text-gradient                                /* NEW: continuous shimmer */
                drop-shadow-xl                                        /* NEW: neon glow shadow */
              "
                        >
                            {t.name}
                        </h3>

                        {/* Tier Price */}
                        <motion.p
                            className="
                text-4xl md:text-5xl font-extrabold
                text-transparent bg-clip-text
                bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal /* NEW: premium gradient */
                animate-text-gradient                                            /* NEW: continuous shimmer */
                drop-shadow-2xl                                                   /* NEW: neon glow */
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
                    before:content-['✓'] before:text-primary               /* NEW: checkmark icon */
                    before:animate-badge-pulse                             /* NEW: pulsing checkmark */
                    hover:text-white transition-colors duration-200        /* NEW: brighten on hover */
                  "
                                >
                                    <span className="flex-1">{f}</span>
                                </li>
                            ))}
                        </ul>

                        {/* “Choose Plan” Button */}
                        <Button
                            className="
                btn-primary                                   /* NEW: neon gradient + glow */
                hover:glow-accent                             /* NEW: accent glow on hover */
                focus:ring-6 focus:ring-neon-amber            /* NEW: neon focus ring */
                mt-6 w-full
                transform transition-transform duration-300
                hover:scale-105                               /* NEW: pop on hover */
              "
                            onClick={() => document.getElementById('wizard')?.classList.remove('hidden')}
                        >
                            Choose Plan
                        </Button>
                    </Card>
                ))}
            </div>

            {/* Subtle Background Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none animate-bg-glow-pulse opacity-20" />
        </section>
    )
}
