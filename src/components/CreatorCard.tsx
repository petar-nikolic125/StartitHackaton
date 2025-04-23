import { FC } from "react"
import { motion, Variants } from "framer-motion"

export interface Creator {
    avatarUrl: string
    quote: string
    name: string
    handle: string
    tag?: string
    badge?: string
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export const CreatorCard: FC<{ creator: Creator }> = ({ creator }) => (
    <motion.div
        variants={cardVariants}
        whileHover={{
            y: -8,
            boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
        }}
        className="relative bg-panel/90 rounded-2xl p-6 flex flex-col items-center text-center"
    >
        {creator.badge?.includes("Top Vouch") && (
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-accent1 to-accent2 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-[0_0_20px_rgba(217,62,255,0.4)]">
                {creator.badge}
            </div>
        )}

        <img
            src={creator.avatarUrl}
            loading="lazy"
            alt={creator.name}
            className="w-14 h-14 rounded-full mb-4 object-cover ring-2 ring-white/30"
        />

        <p className="text-base text-white/80 mb-6 leading-relaxed">
            “{creator.quote}”
        </p>

        <span className="font-bold text-white">{creator.name}</span>
        <span className="text-sm text-white/60 mb-4">@{creator.handle}</span>

        {creator.tag && (
            <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full">
        {creator.tag}
      </span>
        )}

        {!creator.badge?.includes("Top Vouch") && creator.badge && (
            <span className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
        {creator.badge}
      </span>
        )}
    </motion.div>
)
