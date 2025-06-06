import { Button } from './ui/Button'

export default function WizardDrawer() {
    return (
        <div
            id="wizard"
            className="
        hidden fixed inset-0 z-50 flex
        overflow-hidden
      "
        >
            {/* Overlay */}
            <div
                className="
          flex-1 bg-black/60 backdrop-blur-md
          cursor-pointer
          animate-bg-glow-pulse                    /* NEW: subtle pulsing glow on backdrop */
        "
                onClick={() => document.getElementById('wizard')?.classList.add('hidden')}
            />

            {/* Drawer Panel */}
            <div
                className="
          w-full sm:w-96
          bg-dark1/80 backdrop-blur-lg                /* NEW: glassmorphism backdrop */
          border border-dark-overlay                   /* NEW: subtle border */
          rounded-l-3xl                                /* NEW: rounded left edge */
          p-8 space-y-6
          shadow-card-lg                                /* NEW: deep card shadow */
          transform translate-x-full                   /* NEW: start offscreen to the right */
          animate-warpFade                              /* NEW: slide-in fade */
          duration-500
          z-20
        "
            >
                <h2
                    className="
            text-2xl md:text-3xl font-extrabold
            text-transparent bg-clip-text
            bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal
            animate-text-gradient                      /* NEW: continuous header shimmer */
            drop-shadow-2xl                             /* NEW: neon glow under heading */
          "
                >
                    Start in 4 Minutes
                </h2>

                <p
                    className="
            text-gray-300 text-lg
            tracking-wide
            hover:text-white transition-colors duration-300 /* NEW: text brightens on hover */
          "
                >
                    Pick a template to begin.
                </p>

                <Button
                    className="
            btn-primary                                 /* NEW: neon gradient + glow */
            hover:glow-accent                            /* NEW: accent glow on hover */
            focus:ring-6 focus:ring-neon-amber           /* NEW: bold focus ring */
            w-full
            transform transition-transform duration-300
            hover:scale-105                              /* NEW: scale up */
          "
                    onClick={() => alert('Next step...')}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
