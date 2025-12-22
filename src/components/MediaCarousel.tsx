import { useState } from 'react';

export default function MediaCarousel({ media }: { media: string[] }) {
    if (!media || media.length === 0) return null;

    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => {
        setActiveIndex((current) => (current + 1) % media.length);
    };

    const prev = () => {
        setActiveIndex((current) => (current - 1 + media.length) % media.length);
    };

    return (
        <div className="relative w-full h-auto group">
            <div className="overflow-hidden rounded-lg shadow-lg aspect-video bg-gray-900 border border-[var(--lt2-color)]/20">
                <img
                    src={media[activeIndex]}
                    alt={`Project media ${activeIndex + 1}`}
                    className="w-full h-full object-contain"
                />
            </div>

            {media.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-opacity opacity-0 group-hover:opacity-100"
                    >
                        ←
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/80 transition-opacity opacity-0 group-hover:opacity-100"
                    >
                        →
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                        {media.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full ${idx === activeIndex ? 'bg-white' : 'bg-gray-500'
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
