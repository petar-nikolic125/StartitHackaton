// src/components/Landing.tsx
import Home from './Home'
import Features from './Features'
import Pricing from './Pricing'
import Creators from './Creators'
import { Section } from '../components/scroll/Section'

export default function Landing() {
    return (
        <div className="bg-seamless-gradient bg-fixed bg-cover">
            {/** ──────────────────────────────────────────────────
             HOME SECTION (Hero)
             – transparent (no solid bg), faint neon wash overlay
             ─────────────────────────────────────────────────── */}
            <Section
                id="home"
                className="
          relative overflow-hidden
          min-h-screen
          bg-transparent             /* ← transparent so seamless-gradient shows */
          flex items-center justify-center
        "
            >
                {/** Very faint neon wash overlay (–z-20) */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-br from-insta-purple/5 via-insta-blue/5 to-insta-pink/5
            -z-20
          "
                />

                <div className="relative z-10 w-full">
                    <Home />
                </div>
            </Section>

            {/** ──────────────────────────────────────────────────
             FEATURES SECTION
             – transparent, faint rainbow wash overlay
             ─────────────────────────────────────────────────── */}
            <Section
                id="features"
                className="
          relative overflow-hidden
          min-h-screen
          bg-transparent             /* transparent to show seamless gradient */
          flex items-center justify-center
        "
            >
                {/** Very faint Instagram‐rainbow wash behind (–z-20) */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-tr from-insta-yellow/5 via-insta-orange/5 to-insta-pink/5
            -z-20
          "
                />

                <div className="relative z-10 w-full">
                    <Features />
                </div>
            </Section>

            {/** ──────────────────────────────────────────────────
             PRICING SECTION
             – transparent, subtle neon tint
             ─────────────────────────────────────────────────── */}
            <Section
                id="pricing"
                className="
          relative overflow-hidden
          min-h-screen
          bg-transparent             /* transparent to keep seamless BG */
          flex items-center justify-center
        "
            >
                {/** Subtle neon‐gradient wash behind (–z-20) */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-br from-insta-purple/5 via-insta-blue/5 to-insta-pink/5
            -z-20
          "
                />

                <div className="relative z-10 w-full">
                    <Pricing />
                </div>
            </Section>

            {/** ──────────────────────────────────────────────────
             CREATORS SECTION
             – transparent, gentle neon tint
             ─────────────────────────────────────────────────── */}
            <Section
                id="creators"
                className="
          relative overflow-hidden
          min-h-screen
          bg-transparent             /* transparent, no own bg color */
          flex items-center justify-center
        "
            >
                {/** Very faint neon‐pink→purple wash (–z-20) */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-br from-insta-pink/5 via-insta-purple/5 to-insta-blue/5
            -z-20
          "
                />

                <div className="relative z-10 w-full">
                    <Creators />
                </div>
            </Section>
        </div>
    )
}
