import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Waitlist from "@/components/Waitlist";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1C1C1E]">
      <Hero />
      <Benefits />
      <FAQ />
      <Waitlist />

      <footer className="border-t border-[#B8894D]/15 py-10 px-6 text-center bg-[#1C1C1E]">
        <p className="font-playfair text-2xl text-[#B8894D] tracking-wider mb-2">
          Goon
        </p>
        <p className="font-inter text-xs text-[#F5F0EB]/40 tracking-widest uppercase">
          West Hollywood · Coming Soon
        </p>
      </footer>
    </main>
  );
}
