import Hero from "@/components/Hero";
import SaveTheDate from "@/components/SaveTheDate";
import OurStory from "@/components/OurStory";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

/**
 * Main page composition.
 * 
 * The sections flow like pages of an invitation suite:
 * 1. Hero — the cover (names + atmosphere)
 * 2. Save the Date — the ceremony card
 * 3. Our Story — the insert with the couple's narrative
 * 4. Contact/RSVP — the response card
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
      <OurStory />
      <ContactForm />
      <Footer />
    </main>
  );
}
