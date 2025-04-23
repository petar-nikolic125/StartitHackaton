// src/components/SeenOn.tsx
import type { FC } from "react";

export interface SeenOnProps {
    className?: string;
}

export const SeenOn: FC<SeenOnProps> = ({ className = "" }) => {
    const logos = [
        { name: "IndieHackers", src: "/logos/indiehackers.svg" },
        { name: "Product Hunt", src: "/logos/producthunt.svg" },
        // …add more as needed
    ];

    return (
        <div
            className={`${className} mt-6 flex items-center justify-center md:justify-start gap-6 opacity-70`}
        >
            {logos.map((l) => (
                <img
                    key={l.name}
                    src={l.src}
                    alt={l.name}
                    className="h-6"
                />
            ))}
        </div>
    );
};
