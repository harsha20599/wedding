"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * FOOTER — The Final Page
 * 
 * Like the back of a wedding invitation suite — grounding, intimate,
 * and beautifully finished. The dark background creates contrast
 * with the rest of the site, signaling closure.
 * 
 * Design decisions:
 * - Deep olive background — feels like a dark green envelope
 * - Large serif names echo the hero as a bookend
 * - Contact details are soft and understated
 * - Links hover with a gentle opacity shift, not color change
 * - The heart ornament is a quiet, earnest touch
 */
export default function Footer() {
    const sectionRef = useScrollReveal();

    return (
        <footer
            ref={sectionRef}
            className="bg-olive-dark py-20 md:py-28 px-6"
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Couple names — echoing the hero as bookend */}
                <h2 className="reveal font-serif text-cream/90 text-4xl sm:text-5xl md:text-6xl font-normal mb-4">
                    Harsha Vardhan & Sai Sri
                </h2>

                {/* Date reminder */}
                <p className="reveal reveal-delay-1 font-body text-cream/50 text-sm tracking-[0.3em] uppercase mb-10 md:mb-14">
                    March 7, 2026 — Tallarevu
                </p>

                {/* Decorative ornament */}
                <div className="reveal reveal-delay-1 flex items-center justify-center gap-4 mb-10 md:mb-14">
                    <span className="block w-16 h-px bg-cream/20" />
                    <span className="font-body text-cream/30 text-xs">♥</span>
                    <span className="block w-16 h-px bg-cream/20" />
                </div>

                {/* Navigation links — simple, soft */}
                {/* <nav className="reveal reveal-delay-2 flex flex-wrap justify-center gap-8 md:gap-12 mb-10 md:mb-14">
                    {[
                        { label: "Ceremony", href: "#ceremony" },
                        { label: "Our Story", href: "#story" },
                        { label: "RSVP", href: "#contact" },
                    ].map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="
                font-body text-cream/50 text-sm tracking-[0.2em] uppercase
                transition-opacity duration-300
                hover:opacity-100 hover:text-cream/80
              "
                        >
                            {link.label}
                        </a>
                    ))}
                </nav> */}

                {/* Contact details */}
                <div className="reveal reveal-delay-3 space-y-2 mb-12 md:mb-16">
                    <p className="font-body text-cream/40 text-sm tracking-wide">
                        For inquiries, please reach us at
                    </p>
                    <a
                        href="https://www.instagram.com/harsha_20599"
                        className="
              font-body text-cream/60 text-base tracking-wide
              transition-opacity duration-300
              hover:text-cream/80
            "
                    >
                        @harsha_20599
                    </a>
                </div>

                {/* Copyright — barely visible, a whisper */}
                <p className="reveal reveal-delay-4 font-body text-cream/20 text-xs tracking-[0.2em] uppercase">
                    Made with love · 2026
                </p>
            </div>
        </footer>
    );
}
