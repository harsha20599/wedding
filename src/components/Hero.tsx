"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * HERO SECTION
 * 
 * The opening breath. This should feel like unfolding a luxury invitation
 * for the first time — the names are the centerpiece, everything else
 * supports them.
 * 
 * Design decisions:
 * - Names are oversized and serif — they ARE the design
 * - The ampersand is deliberately smaller, creating visual rhythm
 * - Date and location sit quietly below, never competing
 * - The hero image is treated as atmosphere, not content
 * - A scroll indicator whispers "there's more" without demanding action
 */
export default function Hero() {
    const sectionRef = useScrollReveal(0.1);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background image — treated as atmosphere, softened with overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/cover5.jpg"
                    alt="Romantic garden setting"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                {/* Warm cream overlay — softens the image, maintains readability.
            The gradient creates depth: lighter at center (text area),
            slightly deeper at edges */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 py-20 md:py-32">
                {/* Pre-title — whisper-quiet context */}
                <p className="reveal font-body text-warm-gray text-sm tracking-[0.3em] uppercase mb-8 md:mb-12">
                    Together with their families
                </p>

                {/* Names — the centerpiece of the entire site.
            Scale deliberately oversized. The names should feel
            like they were letterpressed onto the screen. */}
                <div className="reveal reveal-delay-1 mb-8 md:mb-12">
                    <h1 className="font-serif font-normal leading-none">
                        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white">
                            Harsha Vardhan
                        </span>
                        {/* Ampersand — deliberately smaller, in body serif.
                Creates breathing room between the names. */}
                        <span className="block text-3xl sm:text-4xl md:text-5xl text-white font-body italic my-3 md:my-5">
                            &amp;
                        </span>
                        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white">
                            Sai Sri
                        </span>
                    </h1>
                </div>

                {/* Date — small caps, generous letter-spacing.
            Should feel like embossed text on a card. */}
                <div className="reveal reveal-delay-2">
                    <p className="font-body text-[#d6d6d6] text-base md:text-lg tracking-[0.25em] uppercase font-variant-numeric ">
                        March 7th
                    </p>
                    <p className="font-body text-[#d6d6d6] text-base md:text-lg tracking-[0.25em] uppercase mt-1">
                        2026
                    </p>
                </div>

                {/* Location hint */}
                <p className="reveal reveal-delay-3 font-body text-warm-gray-light text-sm tracking-[0.2em] uppercase mt-6 md:mt-10">
                    Tallarevu, Andhra Pradesh
                </p>
            </div>

            {/* Scroll indicator — a gentle downward nudge.
          Should feel organic, not UI-like. */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 reveal reveal-delay-4">
                <div
                    className="w-px h-12 bg-warm-gray/40 mx-auto"
                    style={{ animation: "gentleBounce 2.5s ease-in-out infinite" }}
                />
            </div>
        </section>
    );
}
