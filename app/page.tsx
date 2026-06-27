import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Hero />
      <Benefits />
      <FAQ />
      <Waitlist />

      <footer className="border-t border-[#C8A45C]/15 py-10 px-6 text-center">
        <p className="font-playfair text-2xl text-[#C8A45C] tracking-wider mb-2">
          Goon
        </p>
        <p className="font-inter text-xs text-[#F5F0E8]/40 tracking-widest uppercase">
          A private house. Coming soon.
        </p>
      </footer>
    </main>
  );
}
