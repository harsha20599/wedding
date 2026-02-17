"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * LOCATION — Getting There
 *
 * A transport guide styled as a refined tab interface with vertical
 * timelines. Each tab (Bus, Train, Flight) reveals one or more route
 * cards — each drawn as an N-milestone vertical timeline with
 * labeled connectors between consecutive dots.
 *
 * Design decisions:
 * - Tabs feel like embossed card labels, not app-like buttons
 * - Active tab uses olive fill with cream text (ink-on-paper)
 * - Timeline uses a thin olive line with small dot markers
 * - Multiple route cards stack vertically within a tab
 * - Motion is gentle: tab switch fades content in
 */

/* ── Transport data ── */

interface Stop {
    name: string;
    detail: string;
    duration?: string;
    mapUrl: string;
}

interface Route {
    stops: Stop[];              // Ordered list of milestones (≥ 2)
    connectorLabels: string[];  // One label between each consecutive pair
}

interface TransportMode {
    id: string;
    label: string;
    icon: string;
    description: string;
    routes: Route[];
}

const VENUE: Stop = {
    name: "Boddu Satyanarayana Function Hall",
    detail: "Tallarevu Bypass Junction, Korangi, AP 533463",
    duration: "Arrive",
    mapUrl: "https://maps.app.goo.gl/EvuxbtdR9BV2neUW7",
};

const transportModes: TransportMode[] = [
    {
        id: "bus",
        label: "Bus",
        icon: "🚌",
        description: "All travel buses reaches to these points",
        routes: [
            {
                stops: [
                    {
                        name: "Yanam ⭐ Bypass Junction",
                        detail: "Yanam, Andhra Pradesh",
                        duration: "",
                        mapUrl: "https://maps.app.goo.gl/1roaZkMvMPS4FVMa8",
                    },
                    { ...VENUE, duration: "10 mins" },
                ],
                connectorLabels: ["'Kakinada' Bus or an Auto"],
            },
            {
                stops: [
                    {
                        name: "Kakinada Bus Stand",
                        detail: "APSRTC main terminal",
                        duration: "Depart",
                        mapUrl: "https://maps.app.goo.gl/wVZWUiyfe2rNW9J46",
                    },
                    { ...VENUE, duration: "30 - 40 min" },
                ],
                connectorLabels: ["'Amalapuram' Bus or an Auto"],
            },
        ],
    },
    {
        id: "train",
        label: "Train",
        icon: "🚆",
        description: "Arrive by train, then a short ride to the venue.",
        routes: [
            {
                stops: [
                    {
                        name: "Kakinada ⭐ Town Railway Station",
                        detail: "Rama Rao Peta, Kakinada, Andhra Pradesh 533004",
                        duration: "",
                        mapUrl: "https://maps.app.goo.gl/Ya7BAEqbUhKWzrMb8",
                    },
                    { ...VENUE, duration: "45 min" },
                ],
                connectorLabels: ["Reach Bustop and take 'Amalapuram' Bus or an Auto"],
            },
            {
                stops: [
                    {
                        name: "Samarlakota Railway Station",
                        detail: "Jaggamma Garipeta, Samarlakota, Andhra Pradesh 533440",
                        duration: "",
                        mapUrl: "https://maps.app.goo.gl/3cYeLc652Dih2jrR7",
                    },
                    {
                        name: "Kakinada Bus Stop",
                        detail: "APSRTC bus stand , Burma Colony, Kakinada",
                        duration: "45 mins",
                        mapUrl: "https://maps.app.goo.gl/9KJ6QR7P7ZLEcHwn9",
                    },
                    { ...VENUE, duration: "30 - 40 min" },
                ],
                connectorLabels: ["Take bus to Kakinada", "Take 'Amalapuram' Bus or an Auto"],
            },
        ],
    },
    {
        id: "flight",
        label: "Flight",
        icon: "✈️",
        description: "Fly into Rajahmundry Airport, then 2 buses ride to the venue.",
        routes: [
            {
                stops: [
                    {
                        name: "Rajahmundry Airport (RJA)",
                        detail: "Domestic terminal arrivals",
                        duration: "Arrive",
                        mapUrl: "https://maps.app.goo.gl/qWcYmgvMYm7iBA9AA",
                    },
                    {
                        name: "Kakinada Bus Stop",
                        detail: "APSRTC bus stand , Burma Colony, Kakinada",
                        duration: "1 hr",
                        mapUrl: "https://maps.app.goo.gl/9KJ6QR7P7ZLEcHwn9",
                    },
                    { ...VENUE, duration: "30 - 40 Mins" },
                ],
                connectorLabels: ["Take Non-Stop Kakinada bus", "Take 'Amalapuram' Bus or an Auto"],
            },
        ],
    },
];

/* Dot size constants — keeps alignment consistent */
const DOT_SIZE = 12;
const HALF_DOT = DOT_SIZE / 2;

/* ── Map pin link (reused per stop) ── */
function MapLink({ url, customLabel }: { url: string, customLabel?: string }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2.5 font-body text-xs tracking-[0.15em] uppercase text-olive/60 hover:text-olive border-b border-olive/20 hover:border-olive/50 pb-0.5 transition-all duration-300"
        >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
            {customLabel || "View on Map"}
        </a>
    );
}

/* ── Single milestone (dot + content) ── */
function Milestone({ stop, isLast, hasLineAbove }: { stop: Stop; isLast: boolean; hasLineAbove: boolean }) {
    return (
        <div className="relative flex items-start" style={{ paddingLeft: 32 }}>
            {/* Line segment above: from top to dot center (only for non-first stops) */}
            {hasLineAbove && (
                <div
                    className="absolute bg-olive/25"
                    style={{ width: 1, left: 0, top: 0, height: 6 + HALF_DOT }}
                />
            )}
            {/* Line segment below: from dot center to bottom (only for non-last stops) */}
            {!isLast && (
                <div
                    className="absolute bg-olive/25"
                    style={{ width: 1, left: 0, top: 6 + HALF_DOT, bottom: 0 }}
                />
            )}
            {/* Dot — filled for destination, hollow for others */}
            <div
                className={`absolute rounded-full border-2 border-olive z-10 ${isLast ? 'bg-olive' : 'bg-ivory'}`}
                style={{ width: DOT_SIZE, height: DOT_SIZE, left: -HALF_DOT, top: 6 }}
            />
            {/* Content */}
            <div className={`flex-1 min-w-0 ${hasLineAbove ? 'pt-2' : 'pb-2'} ${!isLast && hasLineAbove ? 'pb-2' : ''}`}>
                <div>
                    <h4 className="font-serif text-charcoal text-lg md:text-xl font-normal leading-snug">
                        {stop.name}
                    </h4>
                </div>
                <p className="font-body text-warm-gray text-sm md:text-base mt-1 leading-relaxed">
                    {stop.detail}
                </p>
                <MapLink url={stop.mapUrl} />
            </div>
        </div>
    );
}

/* ── Connector between milestones ── */
function Connector({ label, duration }: { label: string; duration?: string }) {
    return (
        <div className="relative flex items-center" style={{ paddingLeft: 32, height: 64 }}>
            {/* Line segment: full height */}
            <div
                className="absolute bg-olive/25"
                style={{ width: 1, left: 0, top: 0, bottom: 0 }}
            />
            <span
                className="absolute font-body text-[11px] tracking-[0.15em] uppercase text-charcoal bg-ivory px-2 z-10 flex flex-col items-start leading-relaxed"
                style={{ left: -16, top: '50%', transform: 'translateY(-50%)' }}
            >
                <span>{label}</span>
                {duration && (
                    <span className="text-xs text-olive/80 normal-case tracking-normal font-sans italic">{duration}</span>
                )}
            </span>
        </div>
    );
}

/* ── Route card: N milestones with connectors ── */
function RouteCard({ route }: { route: Route }) {
    return (
        <div className="relative" style={{ paddingLeft: `${HALF_DOT}px` }}>
            {route.stops.map((stop, i) => {
                const isFirst = i === 0;
                const isLast = i === route.stops.length - 1;
                return (
                    <div key={i}>
                        {/* Connector before this stop (not before the first) */}
                        {!isFirst && (
                            <Connector
                                label={route.connectorLabels[i - 1]}
                                duration={stop.duration}
                            />
                        )}
                        <Milestone
                            stop={stop}
                            isLast={isLast}
                            hasLineAbove={!isFirst}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default function Location() {
    const sectionRef = useScrollReveal();
    const [activeTab, setActiveTab] = useState("bus");

    const activeMode = transportModes.find((m) => m.id === activeTab)!;

    return (
        <section
            ref={sectionRef}
            id="location"
            className="py-28 md:py-40 px-6 bg-ivory"
        >
            <div className="max-w-2xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-16 md:mb-20">
                    <p className="reveal font-body text-warm-gray text-xs tracking-[0.4em] uppercase mb-6">
                        Finding Your Way
                    </p>
                    <h2 className="reveal reveal-delay-1 font-serif text-charcoal text-4xl sm:text-5xl md:text-6xl font-normal">
                        Getting There
                    </h2>
                    <div className="reveal reveal-delay-2 w-12 h-px bg-olive/40 mx-auto mt-8" />
                    <p className="reveal reveal-delay-3 font-body text-warm-gray text-lg mt-8 leading-relaxed">
                        Boddu Satyanarayana Function Hall — Tallarevu, AP
                    </p>
                    <MapLink url="https://maps.app.goo.gl/EvuxbtdR9BV2neUW7" customLabel="Venue Location" />
                </div>

                {/* ── Tab bar ── */}
                <div className="reveal reveal-delay-3 flex justify-center gap-3 sm:gap-4 mb-12 md:mb-16">
                    {transportModes.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setActiveTab(mode.id)}
                            className={`
                                relative px-5 sm:px-8 py-3 sm:py-3.5
                                font-body text-xs sm:text-sm tracking-[0.2em] uppercase
                                border transition-all duration-400 ease-out
                                cursor-pointer
                                ${activeTab === mode.id
                                    ? "bg-olive text-cream border-olive"
                                    : "bg-transparent text-olive border-olive/40 hover:border-olive hover:bg-olive/5"
                                }
                            `}
                        >
                            <span className="mr-2">{mode.icon}</span>
                            {mode.label}
                        </button>
                    ))}
                </div>

                {/* ── Route cards ── */}
                <div
                    key={activeTab}
                    className="space-y-8"
                    style={{
                        animation: "fadeInUp 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
                    }}
                >
                    {/* Mode description */}
                    <p className="font-body text-warm-gray text-base md:text-lg text-center leading-relaxed">
                        {activeMode.description}
                    </p>

                    {activeMode.routes.map((route, index) => (
                        <div
                            key={index}
                            className="border border-warm-gray-light/40 p-8 sm:p-10 md:p-14 relative"
                        >
                            {/* Corner accents */}
                            <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-olive/30" />
                            <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-olive/30" />
                            <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-olive/30" />
                            <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-olive/30" />

                            {/* Route label for multi-route modes */}
                            {activeMode.routes.length > 1 && (
                                <p className="font-body text-olive/50 text-xs tracking-[0.3em] uppercase text-center mb-8">
                                    Via {route.stops[0].name.split(' ')[0]}
                                </p>
                            )}

                            <RouteCard route={route} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
