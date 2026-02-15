"use client";

import { useState, FormEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * CONTACT FORM — The Guestbook
 * 
 * This should feel like writing in a leather-bound guestbook at the
 * wedding venue — intimate, unhurried, and elegant.
 * 
 * Design decisions:
 * - Bottom-border inputs only (not boxed) — feels like writing on lined paper
 * - Generous padding creates an unhurried feeling
 * - Focus states use olive underline — subtle but intentional
 * - Labels float above inputs in warm gray
 * - The submit button matches the ceremony card's ink-fill effect
 * - Success state is a gentle message, not a loud toast
 */
export default function ContactForm() {
    const sectionRef = useScrollReveal();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        attendance: "",
        message: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // In production, this would send to an API
        setIsSubmitted(true);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="py-28 md:py-40 px-6 bg-cream"
        >
            <div className="max-w-xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16 md:mb-20">
                    <p className="reveal font-body text-warm-gray text-xs tracking-[0.4em] uppercase mb-6">
                        We&apos;d Love to Hear From You
                    </p>
                    <h2 className="reveal reveal-delay-1 font-serif text-charcoal text-4xl sm:text-5xl md:text-6xl font-normal">
                        RSVP
                    </h2>
                    <div className="reveal reveal-delay-2 w-12 h-px bg-olive/40 mx-auto mt-8" />
                    <p className="reveal reveal-delay-3 font-body text-warm-gray text-lg mt-8 leading-relaxed">
                        Kindly respond by the first of July,
                        <br />
                        Two Thousand Twenty-Six
                    </p>
                </div>

                {/* The form — or the success message */}
                {isSubmitted ? (
                    <div className="reveal text-center py-16">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="block w-12 h-px bg-olive/30" />
                            <span className="font-serif text-olive text-lg">✦</span>
                            <span className="block w-12 h-px bg-olive/30" />
                        </div>
                        <p className="font-serif text-charcoal text-2xl md:text-3xl mb-4">
                            Thank You
                        </p>
                        <p className="font-body text-warm-gray text-lg">
                            Your response has been received with joy.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-10 md:space-y-12">
                        {/* Name */}
                        <div className="reveal reveal-delay-1">
                            <label
                                htmlFor="name"
                                className="block font-body text-warm-gray text-xs tracking-[0.3em] uppercase mb-3"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="
                  w-full bg-transparent
                  border-b border-warm-gray-light/60
                  py-3 px-1
                  font-body text-charcoal text-lg
                  placeholder-warm-gray-light
                  transition-colors duration-300
                  focus:border-olive
                "
                                placeholder="As you wish to be addressed"
                            />
                        </div>

                        {/* Email */}
                        <div className="reveal reveal-delay-2">
                            <label
                                htmlFor="email"
                                className="block font-body text-warm-gray text-xs tracking-[0.3em] uppercase mb-3"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="
                  w-full bg-transparent
                  border-b border-warm-gray-light/60
                  py-3 px-1
                  font-body text-charcoal text-lg
                  placeholder-warm-gray-light
                  transition-colors duration-300
                  focus:border-olive
                "
                                placeholder="your@email.com"
                            />
                        </div>

                        {/* Attendance */}
                        <div className="reveal reveal-delay-3">
                            <label
                                htmlFor="attendance"
                                className="block font-body text-warm-gray text-xs tracking-[0.3em] uppercase mb-3"
                            >
                                Will You Be Joining Us?
                            </label>
                            <select
                                id="attendance"
                                name="attendance"
                                required
                                value={formData.attendance}
                                onChange={handleChange}
                                className="
                  w-full bg-transparent
                  border-b border-warm-gray-light/60
                  py-3 px-1
                  font-body text-charcoal text-lg
                  appearance-none cursor-pointer
                  transition-colors duration-300
                  focus:border-olive
                "
                            >
                                <option value="" disabled>
                                    Please select
                                </option>
                                <option value="joyfully-accepts">Joyfully Accepts</option>
                                <option value="regretfully-declines">
                                    Regretfully Declines
                                </option>
                            </select>
                        </div>

                        {/* Message */}
                        <div className="reveal reveal-delay-4">
                            <label
                                htmlFor="message"
                                className="block font-body text-warm-gray text-xs tracking-[0.3em] uppercase mb-3"
                            >
                                A Few Words
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="
                  w-full bg-transparent
                  border-b border-warm-gray-light/60
                  py-3 px-1
                  font-body text-charcoal text-lg
                  placeholder-warm-gray-light
                  resize-none
                  transition-colors duration-300
                  focus:border-olive
                "
                                placeholder="Share your wishes, dietary notes, or a favorite memory…"
                            />
                        </div>

                        {/* Submit button — ink-fill effect matching the ceremony card */}
                        <div className="reveal reveal-delay-5 text-center pt-4">
                            <button
                                type="submit"
                                className="
                  group relative inline-block
                  px-12 py-4
                  font-body text-sm tracking-[0.3em] uppercase
                  text-olive
                  border border-olive/50
                  overflow-hidden
                  transition-colors duration-500 ease-out
                  hover:text-cream hover:border-olive
                  cursor-pointer
                "
                            >
                                {/* Ink fill background */}
                                <span className="
                  absolute inset-0 bg-olive
                  transform translate-y-full
                  transition-transform duration-500 ease-out
                  group-hover:translate-y-0
                " />
                                <span className="relative z-10">Send With Love</span>
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
