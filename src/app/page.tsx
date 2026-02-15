import Hero from "@/components/Hero";
import SaveTheDate from "@/components/SaveTheDate";
import Location from "@/components/Location";
import OurStory from "@/components/OurStory";
import Footer from "@/components/Footer";

/**
 * Main page composition.
 * 
 * The sections flow like pages of an invitation suite:
 * 1. Hero — the cover (names + atmosphere)
 * 2. Save the Date — the ceremony card
 * 3. Location — transport guide with tab navigation
 * 4. Our Story — the insert with the couple's narrative
 * 5. Footer — the envelope back
 * 
 * Each section manages its own scroll-reveal animations.
 * The page is a clean assembly — design lives in the components.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <SaveTheDate />
      <Location />
      {/* <OurStory /> */}
      <Footer />
    </main>
  );
}
