import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import VenueTeaser from "@/components/VenueTeaser";
import WaitlistForm from "@/components/WaitlistForm";
import InstagramGallery from "@/components/InstagramGallery";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Hero />
      <Manifesto />
      <VenueTeaser />
      <WaitlistForm />
      <InstagramGallery />
      <FAQ />
      <Footer />
    </main>
  );
}
