import type { FC } from "react";

const Hero: FC = () => (
    <section className="hero-section">
        <div className="hero-container">

            {/* ← LEFT */}
            <div className="hero-left">
                {/* Nav */}
                <nav className="hero-nav">
                    <h1 className="hero-nav__logo">GramCourses</h1>
                    <ul className="hero-nav__list">
                        {["Features", "Pricing", "Creators"].map((item) => (
                            <li key={item} className="hero-nav__item">
                                {item}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Headline */}
                <h2 className="hero-headline">
                    Open your <br className="hidden md:block" />
                    course store in 4 minutes—<br />
                    no code.
                </h2>

                {/* Subtext */}
                <p className="hero-subtext">
                    Trusted by 6,300+ creators · 190M followers
                </p>

                {/* CTA */}
                <button className="hero-cta">Start Free Store</button>

                {/* Rating */}
                <p className="hero-rating">
                    Rated <span className="text-white font-semibold">★ 4.9/5</span> by
                    2,134 creators
                </p>

                {/* Footer */}
                <footer className="hero-footer">
                    <span className="hero-footer__link">@coachmike</span>
                    <span>→ $3,482 today</span>
                </footer>
            </div>

            {/* ← RIGHT */}
            <div className="hero-right">
                {/* Glow */}
                <div className="phone-glow" />

                {/* Mockup */}
                <div className="phone-mockup">
                    <div className="phone-mockup__notch" />

                    <button className="phone-mockup__button phone-mockup__button--swipe">
                        SWIPE UP
                    </button>

                    <button className="phone-mockup__button phone-mockup__button--pay">
                        <span> Pay</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </button>

                    <div className="phone-mockup__video">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8 text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M10 8l6 4-6 4V8z" />
                        </svg>
                    </div>

                    <div className="flex-1" />
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
