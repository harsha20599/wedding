"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * GALLERY — Immersive Photo Carousel
 *
 * A full-bleed, cinematic image gallery. Images crossfade with a
 * gentle scale shift underneath, creating a parallax-like depth.
 *
 * Transition model (simplified for consistency):
 * - Outgoing image fades out + scales down slightly (0.97)
 * - Incoming image fades in + scales up from 1.03 to 1.0
 * - Ken Burns runs continuously on a CSS loop (no JS restart)
 * - All transitions use the same cubic-bezier curve
 * - GPU-accelerated via will-change + transform
 */

const galleryImages = [
    { src: "/carousel/carousel (1).jpg", alt: "Harsha Vardhan & Sai Sri — moment one" },
    { src: "/carousel/carousel (2).jpg", alt: "Harsha Vardhan & Sai Sri — moment two" },
    { src: "/carousel/carousel (3).jpg", alt: "Harsha Vardhan & Sai Sri — moment three" },
    { src: "/carousel/carousel (7).jpg", alt: "Harsha Vardhan & Sai Sri — moment seven" },
    { src: "/carousel/carousel (4).jpg", alt: "Harsha Vardhan & Sai Sri — moment four" },
    { src: "/carousel/carousel (5).jpg", alt: "Harsha Vardhan & Sai Sri — moment five" },
    { src: "/carousel/carousel (6).jpg", alt: "Harsha Vardhan & Sai Sri — moment six" },
];

const AUTOPLAY_MS = 5000;
const TRANSITION_MS = 900;
const EASE = "cubic-bezier(0.4, 0, 0.15, 1)";

export default function Gallery() {
    const sectionRef = useScrollReveal();
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(-1);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const touchStartX = useRef(0);
    const progressRef = useRef(0);
    const rafRef = useRef(0);
    const lastTimeRef = useRef(0);
    const lockRef = useRef(false);

    const total = galleryImages.length;

    const goTo = useCallback(
        (index: number) => {
            if (lockRef.current) return;
            const next = ((index % total) + total) % total;
            if (next === current) return;

            lockRef.current = true;
            setPrev(current);
            setCurrent(next);
            progressRef.current = 0;
            setProgress(0);
            lastTimeRef.current = 0;

            setTimeout(() => {
                setPrev(-1);
                lockRef.current = false;
            }, TRANSITION_MS);
        },
        [total, current]
    );

    const goNext = useCallback(() => goTo(current + 1), [current, goTo]);
    const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);

    /* Animated progress bar + auto-advance */
    useEffect(() => {
        if (isPaused || lockRef.current) {
            lastTimeRef.current = 0;
            return;
        }

        const tick = (timestamp: number) => {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const delta = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;

            progressRef.current += delta;
            const pct = Math.min(progressRef.current / AUTOPLAY_MS, 1);
            setProgress(pct);

            if (pct >= 1) {
                /* Auto-advance */
                const nextIdx = (current + 1) % total;
                lockRef.current = true;
                setPrev(current);
                setCurrent(nextIdx);
                progressRef.current = 0;
                setProgress(0);
                lastTimeRef.current = 0;

                setTimeout(() => {
                    setPrev(-1);
                    lockRef.current = false;
                }, TRANSITION_MS);
            } else {
                rafRef.current = requestAnimationFrame(tick);
            }
        };

        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [isPaused, total, current]);

    /* Touch / swipe */
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        setIsPaused(true);
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goNext() : goPrev();
        }
        setIsPaused(false);
    };

    /* Click left/right thirds to navigate */
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width * 0.3) goPrev();
        else if (x > rect.width * 0.7) goNext();
    };

    /**
     * Determine layer state for each image:
     * - "active"   → fully visible, Ken Burns running
     * - "leaving"  → fading out + scaling down
     * - "hidden"   → invisible, no transitions (instant reset)
     */
    const getLayerState = (index: number) => {
        if (index === current) return "active";
        if (index === prev) return "leaving";
        return "hidden";
    };

    return (
        <section
            ref={sectionRef}
            id="gallery"
            className="py-28 md:py-40 px-0 bg-cream overflow-hidden"
        >
            {/* Section header */}
            <div className="text-center mb-12 md:mb-16 px-6">
                <p className="reveal font-body text-warm-gray text-xs tracking-[0.4em] uppercase mb-6">
                    Moments Together
                </p>
                <h2 className="reveal reveal-delay-1 font-serif text-charcoal text-4xl sm:text-5xl md:text-6xl font-normal">
                    Gallery
                </h2>
                <div className="reveal reveal-delay-2 w-12 h-px bg-olive/40 mx-auto mt-8" />
            </div>

            {/* Carousel viewport */}
            <div className="reveal reveal-delay-3 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                <div
                    className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/9] overflow-hidden cursor-pointer group select-none"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onClick={handleClick}
                    role="region"
                    aria-label="Image gallery"
                    aria-roledescription="carousel"
                >
                    {/* Image layers */}
                    {galleryImages.map((img, index) => {
                        const state = getLayerState(index);
                        const isVisible = state !== "hidden";

                        return (
                            <div
                                key={img.src}
                                aria-hidden={!isVisible}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: state === "active" ? 3 : state === "leaving" ? 2 : 1,
                                    opacity: state === "active" ? 1 : state === "leaving" ? 0 : 0,
                                    transform:
                                        state === "active"
                                            ? "scale(1)"
                                            : state === "leaving"
                                                ? "scale(0.97)"
                                                : "scale(1.03)",
                                    transition: isVisible
                                        ? `opacity ${TRANSITION_MS}ms ${EASE}, transform ${TRANSITION_MS}ms ${EASE}`
                                        : "none",
                                    willChange: isVisible ? "opacity, transform" : "auto",
                                }}
                            >
                                {/* Layer 1: Blurred background fill — 
                                    a scaled-up, heavily blurred copy of the
                                    image that fills empty space behind portrait
                                    or non-fitting photos. Creates a frosted
                                    glass effect. */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: "-20px",
                                    }}
                                >
                                    <Image
                                        src={img.src}
                                        alt=""
                                        fill
                                        className="object-cover blur-2xl scale-110 brightness-75"
                                        sizes="100px"
                                        priority={false}
                                        draggable={false}
                                        aria-hidden="true"
                                    />
                                </div>

                                {/* Layer 2: Actual image — contained within
                                    the frame so nothing gets cropped. Ken Burns
                                    animation gives it life. */}
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        animation:
                                            state === "active"
                                                ? "kenBurns 12s ease-in-out infinite alternate"
                                                : "none",
                                    }}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1152px"
                                        priority={index === 0}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    {/* Vignette overlay */}
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 20%, transparent 75%, rgba(0,0,0,0.15) 100%)",
                        }}
                    />

                    {/* Left nav hint — frosted glass, visible on hover */}
                    <div className="absolute inset-y-0 left-0 w-1/3 z-20 flex items-center pl-4 sm:pl-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 shadow-lg shadow-black/10">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </div>
                    </div>

                    {/* Right nav hint */}
                    <div className="absolute inset-y-0 right-0 w-1/3 z-20 flex items-center justify-end pr-4 sm:pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/15 shadow-lg shadow-black/10">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </div>
                    </div>

                    {/* Counter — bottom right */}
                    <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-20 pointer-events-none">
                        <span
                            className="font-body text-white/80 text-sm sm:text-base tracking-[0.2em] tabular-nums"
                            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
                        >
                            {String(current + 1).padStart(2, "0")}
                            <span className="text-white/40 mx-1.5">/</span>
                            {String(total).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* Progress bars */}
                <div className="flex gap-1.5 mt-4">
                    {galleryImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            aria-label={`View image ${index + 1}`}
                            className="relative flex-1 h-[2px] bg-charcoal/10 overflow-hidden cursor-pointer group/bar"
                        >
                            <div
                                className="absolute inset-y-0 left-0 bg-olive/60 group-hover/bar:bg-olive"
                                style={{
                                    width:
                                        index === current
                                            ? `${progress * 100}%`
                                            : index < current ||
                                                (prev !== -1 && index < current)
                                                ? "100%"
                                                : "0%",
                                    transition:
                                        index === current
                                            ? "none"
                                            : `width ${TRANSITION_MS}ms ${EASE}`,
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
