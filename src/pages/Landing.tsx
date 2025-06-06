// src/components/Landing.tsx
import Home from './Home'
import Features from './Features'
import Pricing from './Pricing'
import Creators from './Creators'
import { Section } from '../components/scroll/Section'

export default function Landing() {
    return (
        <div className="bg-seamless-gradient bg-fixed text-white">
            {/** ──────────────────────────────────────────────────
             HOME SECTION (Hero)
             ─────────────────────────────────────────────────── */}
            <Section
                id="home"
                className="
          relative overflow-hidden
          min-h-screen
          flex items-center justify-center
        "
            >
                {/** Very faint neon “wash” behind (–z-20) */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-br
              from-primary/5
              via-secondary/5
              to-accent/5
            -z-20
          "
                />
                {/** Hero Content (z-10) */}
                <div className="relative z-10 w-full">
                    <Home />
                </div>
            </Section>

            {/** ──────────────────────────────────────────────────
             FEATURES SECTION
             ─────────────────────────────────────────────────── */}
            <Section
                id="features"
                className="
          relative overflow-hidden
          min-h-screen
          flex items-center justify-center
        "
            >
                {/** Very faint “rainbow” wash behind (–z-20) */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-tr from-insta-yellow/5 via-insta-orange/5 to-insta-pink/5
            -z-20
          "
                />

                {/** Single drifting orb behind cards (–z-10, NO blur) */}
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

                {/** Features content wrapper (z-10) */}
                <div className="relative z-10 w-full">
                    <Features />
                </div>
            </Section>

            {/** ──────────────────────────────────────────────────
             PRICING SECTION
             ─────────────────────────────────────────────────── */}
            <Section
                id="pricing"
                className="
          relative overflow-hidden
          min-h-screen
          flex items-center justify-center
        "
            >
                {/** Very subtle gradient wash (–z-20) */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-br
              from-insta-purple/5
              via-insta-blue/5
              to-insta-pink/5
            -z-20
          "
                />
                {/** Pricing content wrapper (z-10) */}
                <div className="relative z-10 w-full">
                    <Pricing />
                </div>
            </Section>

            {/** ──────────────────────────────────────────────────
             CREATORS SECTION
             ─────────────────────────────────────────────────── */}
            <Section
                id="creators"
                className="
          relative overflow-hidden
          min-h-screen
          flex items-center justify-center
        "
            >
                {/** Very faint neon “wash” (–z-20) */}
                <div
                    className="
            absolute inset-0
            bg-gradient-to-br
              from-insta-pink/5
              via-insta-purple/5
              to-insta-blue/5
            -z-20
          "
                />
                {/** Creators content wrapper (z-10) */}
                <div className="relative z-10 w-full">
                    <Creators />
                </div>
            </Section>
        </div>
    )
}
