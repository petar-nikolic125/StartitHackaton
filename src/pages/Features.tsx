// src/components/Features.tsx
import { features } from '../data/features'
import { Card } from '../components/ui/Card'

export default function Features() {
    return (
        <section
            id="features"
            className="
        relative overflow-hidden
        max-w-7xl mx-auto px-6 lg:px-12 xl:px-24
        py-16
        bg-dark2                          /* very dark base */
        before:absolute before:inset-0 before:scroll-warp  /* subtle warp effect */
      "
        >
            {/** ──────────────────────────────────────────────────
             1) Subtle “neon fog” behind everything (–z-20)
             ─────────────────────────────────────────────────── */}
            <div
                className="
          absolute inset-0
          bg-gradient-to-tr
            from-primary/10
            via-secondary/10
            to-accent/10
          animate-bg-glow-pulse
          -z-20
        "
            />

            {/** ──────────────────────────────────────────────────
             2) Single drifting orb behind cards (–z-10, NO blur)
             ─────────────────────────────────────────────────── */}
            <div
                className="
          absolute top-[-10%] right-[-5%]
          w-96 h-96 rounded-full
          bg-gradient-to-br from-insta-pink/30 via-insta-purple/20 to-insta-blue/10
          opacity-80
          animate-floatY
          -z-10
        "
            />

            {/** ──────────────────────────────────────────────────
             Section Heading (z-10)
             ─────────────────────────────────────────────────── */}
            <h2
                className="
          relative z-10
          text-3xl md:text-4xl lg:text-5xl font-extrabold
          text-transparent bg-clip-text
          bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal
          animate-text-gradient                    /* continuous shimmer */
          drop-shadow-[0_0_30px_rgba(214,41,118,0.7)]  /* strong pink glow */
          text-center mb-12
        "
            >
                Speed → Revenue
            </h2>

            {/** ──────────────────────────────────────────────────
             Feature Cards Grid (z-10)
             ─────────────────────────────────────────────────── */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((f) => (
                    <Card
                        key={f.title}
                        className="
              relative
              glass-card                                        /* frosted‐glass look panel (but no actual blur) */
              hover:floatY                                      /* lift on hover */
              hover:shadow-card-lg                              /* deeper glow on hover */
              transform transition-transform duration-400 ease-out
              bg-dark1/40                                       /* translucent dark bg (no blur) */
              border border-dark-overlay                         /* subtle border */
              p-8                                                /* generous padding */
              text-center space-y-6                               /* spacing */
              overflow-visible
            "
                    >
                        {/** Icon Container */}
                        <div
                            className="
                mx-auto mb-6
                w-20 h-20 rounded-full
                bg-gradient-to-br from-insta-yellow via-insta-orange to-insta-pink  /* neon orb background */
                grid place-items-center
                shadow-[0_0_20px_rgba(254,218,119,0.6),0_0_40px_rgba(214,41,118,0.4)]  /* glowing shadow */
                animate-card-gradient                                   /* subtle gradient shift */
                hover:scale-110                                          /* pop on hover */
                transition-transform duration-300 ease-out
              "
                            aria-hidden="true"
                        >
              <span
                  className="
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal /* icon shimmer */
                  animate-text-gradient                                   /* continuous shimmer */
                  text-4xl md:text-5xl
                "
              >
                {f.icon}
              </span>
                        </div>

                        {/** Feature Title */}
                        <h3
                            className="
                text-xl md:text-2xl font-extrabold
                text-transparent bg-clip-text
                bg-gradient-to-r from-insta-orange via-insta-pink to-insta-purple /* shimmering title */
                animate-text-gradient                                              /* shimmer */
                drop-shadow-[0_0_20px_rgba(214,41,118,0.6)]                        /* pink glow */
                mb-2
              "
                        >
                            {f.title}
                        </h3>

                        {/** Feature Description */}
                        <p
                            className="
                text-gray-300 text-base md:text-lg
                tracking-wide leading-relaxed
                transition-colors duration-300
                hover:text-white                                                /* brighten on hover */
              "
                        >
                            {f.text}
                        </p>
                    </Card>
                ))}
            </div>
        </section>
    )
}
