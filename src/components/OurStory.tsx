"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * OUR STORY — Editorial Narrative
 * 
 * This section should read like a magazine spread. Asymmetric layout,
 * mixed image sizes, and poetic text that invites you to linger.
 * 
 * Design decisions:
 * - Asymmetric two-column layout that feels hand-composed
 * - Images at different scales create visual rhythm
 * - Text is intimate and personal, not informational
 * - Generous whitespace between story blocks
 * - Each milestone is a small narrative vignette
 */

interface StoryMoment {
    year: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    reverse?: boolean;
}

const moments: StoryMoment[] = [
    {
        year: "2019",
        title: "A Chance Encounter",
        description:
            "In a quiet corner of a Kyoto bookshop, between shelves of poetry and the scent of aged paper, we found each other. What began as a shared smile over Bashō became an evening that never quite ended.",
        image:
            "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=1200",
        imageAlt: "A peaceful bookshop interior with warm lighting",
    },
    {
        year: "2021",
        title: "The Question",
        description:
            "On a rain-softened evening in Florence, beneath the arches of the Ponte Vecchio, the question that had lived quietly between us finally found its voice. She said yes before the words were finished.",
        image:
            "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=1200",
        imageAlt: "Romantic bridge at dusk with soft golden light",
        reverse: true,
    },
    {
        year: "2026",
        title: "Forever Begins",
        description:
            "And now, surrounded by the people who have shaped our lives and carried our love, we choose each other — again and always — in the golden light of Tuscany.",
        image:
            "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1200",
        imageAlt: "Tuscan vineyard at golden hour with rolling hills",
    },
];

export default function OurStory() {
    const sectionRef = useScrollReveal(0.08);

    return (
        <section
            ref={sectionRef}
            id="story"
            className="py-28 md:py-40 px-6 bg-ivory"
        >
            {/* Section header */}
            <div className="text-center mb-20 md:mb-28">
                <p className="reveal font-body text-warm-gray text-xs tracking-[0.4em] uppercase mb-6">
                    How It All Began
                </p>
                <h2 className="reveal reveal-delay-1 font-serif text-charcoal text-4xl sm:text-5xl md:text-6xl font-normal">
                    Our Story
                </h2>
                <div className="reveal reveal-delay-2 w-12 h-px bg-olive/40 mx-auto mt-8" />
            </div>

            {/* Story moments — each rendered as an editorial spread */}
            <div className="max-w-6xl mx-auto space-y-24 md:space-y-36">
                {moments.map((moment, index) => (
                    <StoryBlock key={moment.year} moment={moment} index={index} />
                ))}
            </div>
        </section>
    );
}

function StoryBlock({
    moment,
    index,
}: {
    moment: StoryMoment;
    index: number;
}) {
    const blockRef = useScrollReveal(0.12);

    return (
        <div
            ref={blockRef}
            className={`
        grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center
      `}
        >
            {/* Image column — 7 of 12 columns for generous visual space */}
            <div
                className={`
          md:col-span-7
          ${moment.reverse ? "md:order-2" : "md:order-1"}
        `}
            >
                <div className="reveal-image relative overflow-hidden aspect-[4/5] md:aspect-[3/4]">
                    <Image
                        src={moment.image}
                        alt={moment.imageAlt}
                        fill
                        className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 58vw"
                    />
                    {/* Subtle warm overlay on images for cohesion */}
                    <div className="absolute inset-0 bg-cream/5 pointer-events-none" />
                </div>
            </div>

            {/* Text column — 5 of 12 columns. The asymmetry is deliberate:
          more space for visuals, tighter text column creates intimacy. */}
            <div
                className={`
          md:col-span-5
          ${moment.reverse ? "md:order-1 md:pr-8" : "md:order-2 md:pl-8"}
        `}
            >
                {/* Year — quiet timestamp */}
                <p className="reveal font-body text-olive text-sm tracking-[0.3em] uppercase mb-4">
                    {moment.year}
                </p>

                {/* Title */}
                <h3 className="reveal reveal-delay-1 font-serif text-charcoal text-2xl sm:text-3xl md:text-4xl font-normal leading-snug mb-5 md:mb-6">
                    {moment.title}
                </h3>

                {/* Narrative text — poetic, not factual */}
                <p
                    className="reveal reveal-delay-2 font-body text-charcoal/70 text-lg md:text-xl leading-relaxed"
                    style={{ lineHeight: "1.8" }}
                >
                    {moment.description}
                </p>

                {/* Decorative line after text */}
                <div
                    className={`reveal reveal-delay-3 w-10 h-px bg-olive/30 mt-6 md:mt-8 ${index === 2 ? "mx-auto md:mx-0" : ""
                        }`}
                />
            </div>
        </div>
    );
}
