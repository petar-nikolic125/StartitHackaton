// src/components/VideoModal.tsx
import { useState, FC } from "react";
import { Dialog } from "@headlessui/react";

interface VideoModalProps {
    className?: string;
}

export const VideoModal: FC<VideoModalProps> = ({ className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`${className} mt-6 inline-flex items-center space-x-2 text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-accent1`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M10 8l6 4-6 4V8z" />
                </svg>
                <span>Watch how it works in 60s</span>
            </button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 z-50"
            >
                <div className="flex items-center justify-center h-full bg-black/60">
                    <Dialog.Panel className="w-11/12 max-w-3xl">
                        <iframe
                            src="https://www.youtube.com/embed/your-video-id?autoplay=1"
                            className="w-full aspect-video rounded-xl shadow-lg"
                            allow="autoplay; encrypted-media"
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};
