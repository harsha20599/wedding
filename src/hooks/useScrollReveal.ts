"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for scroll-triggered reveal animations.
 * 
 * Uses Intersection Observer to detect when elements enter the viewport,
 * then adds the 'revealed' class to trigger CSS transitions.
 * 
 * Design choice: We use CSS transitions (not JS animations) because
 * they're more performant and feel more natural — like ink appearing
 * on paper rather than a digital effect.
 */
export function useScrollReveal(
    threshold: number = 0.15,
    rootMargin: string = "0px 0px -60px 0px"
) {
    const ref = useRef<HTMLDivElement>(null);

    const handleIntersection = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    /* Find all revealable children within this container */
                    const revealElements = entry.target.querySelectorAll(
                        ".reveal, .reveal-image"
                    );
                    revealElements.forEach((el) => {
                        el.classList.add("revealed");
                    });

                    /* Also reveal the container itself if it has the class */
                    if (
                        entry.target.classList.contains("reveal") ||
                        entry.target.classList.contains("reveal-image")
                    ) {
                        entry.target.classList.add("revealed");
                    }
                }
            });
        },
        []
    );

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold,
            rootMargin,
        });

        const container = ref.current;
        if (container) {
            /* Observe the container itself */
            observer.observe(container);

            /* Also observe individual revealable children for staggered reveals */
            const children = container.querySelectorAll(".reveal, .reveal-image");
            children.forEach((child) => observer.observe(child));
        }

        return () => observer.disconnect();
    }, [handleIntersection, threshold, rootMargin]);

    return ref;
}
