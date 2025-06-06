// src/components/Creators.tsx
import { useState } from 'react'
import { creators, Creator } from '../data/creators'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'

export default function Creators() {
    const [selected, setSelected] = useState<Creator | null>(null)

    return (
        <div
            className="
        relative overflow-hidden
        w-full max-w-6xl mx-auto px-6 lg:px-12 xl:px-24
        py-24
        bg-transparent                           /* transparent so the global gradient shows */
      "
        >
            {/** ─────────────────────────────────────────────────
             Subtle “neon wash” behind everything (–z-20)
             ───────────────────────────────────────────────── */}
            <div
                className="
          absolute inset-0
          bg-gradient-to-br from-insta-pink/5 via-insta-purple/5 to-insta-blue/5
          -z-20
        "
            />

            {/** ─────────────────────────────────────────────────
             Section Heading (z-10)
             ───────────────────────────────────────────────── */}
            <h2
                className="
          relative z-10
          text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight
          text-transparent bg-clip-text
          bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal
          animate-text-gradient             /* neon shimmer */
          drop-shadow-[0_0_25px_rgba(214,41,118,0.7)]  /* heavy pink glow */
          text-center mb-12
        "
            >
                Success Stories
            </h2>

            {/** ─────────────────────────────────────────────────
             Optional Logos Row (z-10)
             ───────────────────────────────────────────────── */}
            <div className="relative z-10 flex items-center justify-center space-x-6 mb-16">
                {['/vite.svg', '/vite.svg', '/vite.svg'].map((src, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt="partner-logo"
                        className="
              h-12 w-12
              filter brightness-125
              opacity-90
              animate-badge-pulse          /* subtle pulse */
              hover:scale-125 transition-transform duration-300 ease-out
            "
                        aria-hidden="true"
                    />
                ))}
            </div>

            {/** ─────────────────────────────────────────────────
             Creator Cards Grid (z-10)
             ───────────────────────────────────────────────── */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {creators.map((c) => (
                    <Card
                        key={c.handle}
                        className="
              relative
              bg-dark1/40                          /* semi-opaque dark panel (no blur) */
              hover:floatY
              hover:shadow-card-lg
              transform transition-transform duration-400 ease-out
              border border-dark-overlay
              p-6
              cursor-pointer
            "
                        onClick={() => setSelected(c)}
                    >
                        {/** ─── Pulsing Badge ───────────────────────────── */}
                        {c.badge && (
                            <span
                                className="
                  absolute top-3 right-4
                  px-3 py-1 rounded-full text-xs font-semibold text-white
                  bg-gradient-to-br from-insta-pink via-insta-purple to-insta-blue   /* vibrant badge gradient */
                  shadow-[0_0_10px_rgba(214,41,118,0.6),0_0_20px_rgba(79,91,213,0.4)]  /* neon glow */
                  animate-badge-pulse                                                   /* pulsing badge */
                  hover:badge-shake                                                     /* slight shake on hover */
                  transition-all duration-300 ease-in-out
                  z-20
                "
                            >
                {c.badge}
              </span>
                        )}

                        {/** ─── Avatar Container ───────────────────────────── */}
                        <div
                            className="
                w-20 h-20 rounded-full
                ring-4 ring-gradient-to-br from-insta-yellow via-insta-orange to-insta-pink   /* neon ring */
                bg-dark2
                mx-auto
                flex items-center justify-center
                animate-avatar-glow                                   /* pulsing glow */
                hover:scale-110 transition-transform duration-300 ease-out
                mb-4
              "
                        >
              <span
                  className="
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal   /* shimmering initials */
                  animate-text-gradient                                  /* continuous shimmer */
                  font-bold text-2xl
                "
              >
                {c.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
              </span>
                        </div>

                        {/** ─── Name & Handle ───────────────────────────────── */}
                        <h3
                            className="
                text-lg md:text-xl font-extrabold
                text-transparent bg-clip-text
                bg-gradient-to-r from-insta-orange via-insta-pink to-insta-purple   /* gradient name text */
                animate-text-gradient                                            /* shimmer */
                text-center mb-1
              "
                        >
                            {c.name}
                        </h3>
                        <p className="text-sm text-gray-400 text-center mb-4">@{c.handle}</p>

                        {/** ─── Quote Text ───────────────────────────── */}
                        <p
                            className="
                italic text-gray-300 text-center
                tracking-wide leading-relaxed
                relative pl-6                                            /* space for quote mark */
                before:content-['“'] before:absolute before:left-0 before:top-0 before:text-4xl before:text-insta-yellow before:opacity-50  /* stylized quote mark */
              "
                        >
                            {c.quote}
                        </p>
                    </Card>
                ))}
            </div>

            {/** ─────────────────────────────────────────────────
             Modal for Selected Creator (z-50)
             ───────────────────────────────────────────────── */}
            <Modal open={Boolean(selected)} onClose={() => setSelected(null)}>
                {selected && (
                    <div
                        className="
              relative overflow-hidden
              bg-dark1/60
              border border-dark-overlay
              rounded-2xl p-8 max-w-md mx-auto
              shadow-card-lg                            /* neon shadow around modal */
              animate-warpFade                          /* fade-in warp animation */
              transform transition-transform duration-500 ease-out
            "
                    >
                        {/** ─── Modal Avatar ───────────────────────────────── */}
                        <div
                            className="
                w-24 h-24 rounded-full
                ring-4 ring-gradient-to-br from-insta-pink via-insta-purple to-cyber-teal   /* neon ring */
                bg-dark2
                mx-auto
                flex items-center justify-center
                animate-avatar-glow                     /* pulsing glow */
                hover:scale-110 transition-transform duration-300 ease-out
                mb-6
              "
                        >
              <span
                  className="
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal   /* shimmering initials */
                  animate-text-gradient                     /* continuous shimmer */
                  font-bold text-3xl
                "
              >
                {selected.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
              </span>
                        </div>

                        {/** ─── Modal Text Content ─────────────────────── */}
                        <h3
                            className="
                text-2xl font-extrabold
                text-transparent bg-clip-text
                bg-gradient-to-r from-electric-magenta via-hyper-purple to-cyber-teal   /* neon gradient shimmer */
                animate-text-gradient                          /* shimmer */
                text-center mb-2
              "
                        >
                            {selected.name}
                        </h3>
                        <p className="text-gray-400 text-center mb-4">@{selected.handle}</p>
                        <p
                            className="
                text-gray-300 text-center mb-6
                tracking-wide leading-relaxed
                px-4
              "
                        >
                            {selected.quote}
                        </p>

                        {/** ─── View Store Button ─────────────────────── */}
                        <Button
                            className="
                bg-gradient-to-r from-insta-yellow via-insta-orange to-insta-pink   /* insta gradient */
                hover:from-insta-blue hover:to-insta-purple                          /* invert on hover */
                shadow-insta-glow                         /* multicolor drop shadow */
                text-white font-semibold rounded-full
                w-full py-3
                transform hover:scale-105 transition-transform duration-300 ease-out
                focus:outline-none focus:ring-6 focus:ring-insta-pink/50
              "
                            onClick={() => alert('view store')}
                        >
                            View Store →
                        </Button>
                    </div>
                )}
            </Modal>
        </div>
    )
}
