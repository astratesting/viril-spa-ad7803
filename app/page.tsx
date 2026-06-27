import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import WaitlistForm from "@/components/WaitlistForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <Hero />
      <Vision />
      <WaitlistForm />
      <FAQ />
      <Footer />
    </main>
  );
}
