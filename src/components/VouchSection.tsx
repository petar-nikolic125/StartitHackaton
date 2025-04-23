import { FC } from "react"
import { motion, Variants } from "framer-motion"
import { CreatorCard, Creator } from "./CreatorCard"

const creators: Creator[] = [
    {
        avatarUrl: "/avatars/rachel.jpg",
        quote: "Made $1.2k in 3 days with a 2-video course. I’m hooked.",
        name: "Rachel K.",
        handle: "coachrachel",
        tag: "Fitness",
        badge: "💰 $1.2k in 3d",
    },
    {
        avatarUrl: "/avatars/mark.jpg",
        quote: "No marketing degree, just 10k followers and a voice. Sold out my first 50 spots.",
        name: "Mark T.",
        handle: "markcreates",
        tag: "Design",
    },
    {
        avatarUrl: "/avatars/lisa.jpg",
        quote: "My $7 grammar guide just paid my rent.",
        name: "Lisa S.",
        handle: "lisawrites",
        tag: "Writing",
    },
    {
        avatarUrl: "/avatars/jordan.jpg",
        quote: "$27k course in 30 days—unreal ROI!",
        name: "Jordan P.",
        handle: "jordanprofit",
        badge: "🏆 Top Vouch",
    },
    {
        avatarUrl: "/avatars/alex.jpg",
        quote: "Zero code setup, $5k in month one.",
        name: "Alex M.",
        handle: "alexlaunch",
        tag: "Tech",
    },
]

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, when: "beforeChildren" },
    },
};

export const VouchSection: FC = () => (
    <motion.section
        id="vouch-section"
        className="mt-24 px-6 md:px-16 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
    >
        <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Thousands of creators are already selling in 4 minutes.
        </h3>
        <p className="text-white/70 mb-12">Real revenue. Real people. Zero friction.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {creators.map((c, i) => (
                <CreatorCard key={i} creator={c} />
            ))}
        </div>
    </motion.section>
);