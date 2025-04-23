import { FC } from 'react'
import { motion } from 'framer-motion'
import RobertImg from '../assets/Robert-Kiyosaki.jpg'

const phoneContainer = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 80, damping: 12 }
    }
}

const listContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
}

const listItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export const PhoneMockup: FC = () => (
    <div className="hero-right md:w-1/2 flex items-center justify-center">
        {/* pulsing glow */}
        <motion.div
            className="phone-glow"
            animate={{ opacity: [0.6, 0.9, 0.6], scale: [1,1.05,1] }}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
        />

        {/* phone frame + cards */}
        <motion.div
            className="phone-mockup group flex flex-col p-6"
            variants={phoneContainer}
            initial="hidden"
            animate="visible"
        >
            <div className="phone-mockup__notch" />

            {/* staggered list */}
            <motion.div
                className="flex flex-col flex-1 w-full gap-y-4"
                variants={listContainer}
                initial="hidden"
                animate="visible"
            >
                <motion.button
                    className="phone-mockup__button phone-mockup__button--swipe flex-1 w-full"
                    variants={listItem}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(217,62,255,0.6)' }}
                >
                    Buy a course
                </motion.button>

                <motion.button
                    className="phone-mockup__button phone-mockup__button--pay flex-1 w-full"
                    variants={listItem}
                    whileHover={{ scale: 1.03, boxShadow: '0 0 40px rgba(59,130,246,0.6)' }}
                >
                    Free materials
                </motion.button>

                <motion.div
                    className="phone-mockup__video relative overflow-hidden flex-1 w-full rounded-xl"
                    variants={listItem}
                    whileHover={{ scale: 1.02 }}
                >
                    <img
                        src={RobertImg}
                        alt="Placeholder"
                        className="w-full h-full object-cover filter blur-lg brightness-50"
                    />
                    <button className="absolute inset-0 flex items-center justify-center text-white opacity-70 hover:opacity-100 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 8l6 4-6 4V8z" />
                        </svg>
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    </div>
)
