// src/components/StickyCTA.tsx
import { useEffect, useState, FC } from "react";

interface StickyCTAProps {
    className?: string;
}

export const StickyCTA: FC<StickyCTAProps> = ({ className = "" }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.2);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`${className} fixed bottom-6 right-6 bg-accent1 text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition`}
        >
            🚀 Launch your store
        </button>
    );
};
