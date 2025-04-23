// src/components/Hero.tsx
import type { FC } from 'react'
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

const Hero: FC = () => (
    <section className="hero-section h-screen w-screen">
        {/* HEADER */}
        <header className="absolute inset-x-0 top-0 px-6 md:px-16 py-6 flex justify-between items-center z-20">
            <h1 className="hero-nav__logo">GramCourses</h1>
            <nav>
                <ul className="hero-nav__list">
                    {['Features', 'Pricing', 'Creators'].map(item => (
                        <li key={item} className="hero-nav__item">{item}</li>
                    ))}
                </ul>
            </nav>
        </header>

        {/* MAIN HERO */}
        <div className="hero-container max-w-7xl w-full mx-auto px-6 md:px-16 flex items-center justify-between">
            {/* LEFT */}
            <div className="hero-content md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-10">
                <h2 className="hero-headline">
                    Open your <br className="hidden md:block"/> course store in 4 minutes—<br/> no code.
                </h2>
                <p className="hero-subtext">Trusted by 6,300+ creators · 190M followers</p>
                <button className="hero-cta">Start Free Store</button>
                <p className="hero-rating">
                    Rated <span className="text-white font-semibold">★ 4.9/5</span> by 2,134 creators
                </p>
                <footer className="hero-footer">
                    <span className="hero-footer__link">@coachmike</span>
                    <span>→ $3,482 today</span>
                </footer>
            </div>

            {/* RIGHT: animated phone */}
            <div className="hero-right md:w-1/2 flex items-center justify-center">
                <motion.div
                    className="phone-glow"
                    animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity }}
                />

                <motion.div
                    className="phone-mockup group flex flex-col p-6"
                    variants={phoneContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="phone-mockup__notch" />

                    {/* stagger wrapper */}
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
        </div>
    </section>
)

export default Hero
