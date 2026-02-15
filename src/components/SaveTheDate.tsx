"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * SAVE THE DATE — Ceremony Card
 * 
 * This section mimics a physical invitation card laid on paper.
 * It should feel discrete, precious, and hand-set.
 * 
 * Design decisions:
 * - A subtle border creates the "card" feeling without being heavy
 * - The decorative line is a nod to letterpress ornaments
 * - Typography hierarchy: event type → date → time → venue
 * - Generous internal padding for breathing room
 * - The RSVP button uses an ink-fill hover effect
 */
export default function SaveTheDate() {
    const sectionRef = useScrollReveal();

    return (
        <section
            ref={sectionRef}
            className="py-28 md:py-40 px-6 bg-cream"
        >
            <div className="max-w-2xl mx-auto">
                {/* The ceremony card — bordered container that feels like a physical card */}
                <div className="reveal border border-warm-gray-light/40 p-10 sm:p-14 md:p-20 text-center relative">

                    {/* Corner accent — subtle ornamental detail */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-olive/30" />
                    <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-olive/30" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-olive/30" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-olive/30" />

                    {/* Section label */}
                    <p className="reveal reveal-delay-1 font-body text-warm-gray text-xs tracking-[0.4em] uppercase mb-8 md:mb-12">
                        Save the Date
                    </p>

                    {/* Decorative line — a simple horizontal rule that feels
              like a letterpress ornament */}
                    <div className="reveal reveal-delay-1 flex items-center justify-center gap-4 mb-8 md:mb-12">
                        <span className="block w-12 h-px bg-olive/30" />
                        <span className="font-serif text-olive text-lg">✦</span>
                        <span className="block w-12 h-px bg-olive/30" />
                    </div>

                    {/* Event type */}
                    <p className="reveal reveal-delay-2 font-body text-warm-gray text-sm tracking-[0.3em] uppercase mb-4">
                        The Wedding Ceremony
                    </p>

                    {/* Date — the star of this card */}
                    <h2 className="reveal reveal-delay-2 font-serif text-charcoal text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-6 md:mb-8">
                        August 24, 2026
                    </h2>

                    {/* Time */}
                    <p className="reveal reveal-delay-3 font-body text-charcoal/80 text-lg md:text-xl tracking-wide mb-6 md:mb-8">
                        Four O&apos;Clock in the Afternoon
                    </p>

                    {/* Decorative divider */}
                    <div className="reveal reveal-delay-3 w-8 h-px bg-olive/40 mx-auto mb-6 md:mb-8" />

                    {/* Venue */}
                    <div className="reveal reveal-delay-3">
                        <p className="font-serif text-charcoal text-xl md:text-2xl mb-2">
                            Villa di Maiano
                        </p>
                        <p className="font-body text-warm-gray text-base tracking-wide">
                            Via Benedetto da Maiano, 11
                        </p>
                        <p className="font-body text-warm-gray text-base tracking-wide">
                            Fiesole, Tuscany, Italy
                        </p>
                    </div>

                    {/* RSVP Button — designed to feel like embossed text on an invitation.
              The hover effect fills with olive ink, like a stamp pressing down. */}
                    <div className="reveal reveal-delay-4 mt-10 md:mt-14">
                        <a
                            href="#contact"
                            className="
                group relative inline-block
                px-10 py-3.5
                font-body text-sm tracking-[0.3em] uppercase
                text-olive
                border border-olive/50
                overflow-hidden
                transition-colors duration-500 ease-out
                hover:text-cream hover:border-olive
              "
                        >
                            {/* Ink-fill background — slides up on hover like ink filling paper */}
                            <span className="
                absolute inset-0 bg-olive
                transform translate-y-full
                transition-transform duration-500 ease-out
                group-hover:translate-y-0
              " />
                            <span className="relative z-10">Kindly Respond</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
