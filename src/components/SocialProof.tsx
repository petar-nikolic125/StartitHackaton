import { creators } from '../data/creators'
import { Card } from './ui/Card'

export default function SocialProof() {
    return (
        <section
            id="social"
            className="
        relative overflow-hidden
        py-16                                          /* NEW: more vertical padding */
        space-y-12
        futuristic-bg-1                                 /* NEW: layered radial gradient background */
        before:absolute before:inset-0 before:scroll-warp /* NEW: scroll-warp effect */
      "
        >
            {/* Logos Row */}
            <div
                className="
          flex items-center justify-center space-x-8
          opacity-80
          z-10                                         /* NEW: keep above background */
        "
            >
                {[0, 1, 2].map((i) => (
                    <img
                        key={i}
                        src="/vite.svg"
                        alt="partner logo"
                        className="
              h-12 md:h-14
              filter brightness-125
              animate-badge-pulse                       /* NEW: pulsing glow animation */
              hover:scale-110 transition-transform duration-300 ease-out  /* NEW: slight pop on hover */
            "
                        aria-hidden="true"
                    />
                ))}
            </div>

            {/* Creator Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-24 z-10">
                {creators.map((c) => (
                    <Card
                        key={c.handle}
                        className="
              relative
              glass-card                                 /* NEW: semi-transparent glass panel */
              hover:floatY                               /* NEW: 3D float on hover */
              hover:shadow-card-lg                       /* NEW: deeper shadow on hover */
              transform transition-transform duration-400 ease-out
              bg-dark1/60 backdrop-blur-md                /* NEW: glassmorphism */
              border border-dark-overlay                  /* NEW: subtle dark border */
              p-6                                         /* NEW: padding inside card */
            "
                    >
                        {c.badge && (
                            <span
                                className="
                  absolute top-3 right-4
                  px-3 py-1 rounded-full text-xs font-semibold text-white
                  bg-gradient-to-r from-secondary via-accent to-primary  /* NEW: multicolor badge gradient */
                  shadow-lg                                           /* NEW: badge glow */
                  animate-badge-pulse                                  /* NEW: badge pulsing */
                  hover:badge-shake                                    /* NEW: subtle shake on hover */
                  transition-all duration-300 ease-in-out
                  z-20
                "
                            >
                {c.badge}
              </span>
                        )}
                        <div className="flex items-center space-x-4">
                            <div
                                className="
                  w-16 h-16 rounded-full
                  ring-4 ring-gradient-to-br from-primary via-secondary to-accent   /* NEW: neon gradient ring */
                  bg-dark2
                  flex items-center justify-center
                  overflow-hidden
                  animate-avatar-glow                                              /* NEW: avatar glow animation */
                  hover:scale-110 transition-transform duration-300 ease-out       /* NEW: avatar pop on hover */
                "
                            >
                <span
                    className="
                    text-white font-bold text-xl
                    animate-text-gradient                                            /* NEW: shimmering initials */
                  "
                >
                  {c.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                </span>
                            </div>
                            <div className="space-y-1">
                                <p
                                    className="
                    text-xl md:text-2xl font-extrabold text-transparent
                    bg-clip-text bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal /* NEW: gradient name */
                    animate-text-gradient                                           /* NEW: shimmer on name */
                  "
                                >
                                    {c.name}
                                </p>
                                <p className="text-sm text-gray-400">@{c.handle}</p>
                            </div>
                        </div>

                        <p
                            className="
                mt-6 italic text-gray-300
                tracking-wide leading-relaxed
                before:content-['“'] after:content-['”']                     /* NEW: stylized quotation marks */
                relative pl-4                                                     /* NEW: indentation for quotes */
                before:absolute before:left-0 before:top-0 before:text-4xl before:text-primary opacity-50 /* NEW: large faint quote mark */
                z-10
              "
                        >
                            {c.quote}
                        </p>
                    </Card>
                ))}
            </div>
        </section>
    )
}
