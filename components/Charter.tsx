"use client";

import { useState } from "react";

// UI-only gate. The charter PDF itself is a placeholder (#) per spec.
const CHARTER_PASSPHRASE = "founding-charter";

export default function Charter() {
  const [pass, setPass] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pass.trim().toLowerCase() === CHARTER_PASSPHRASE) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <section id="charter" className="py-24 px-6 bg-[#141415]">
      <div className="max-w-xl mx-auto text-center">
        <p className="font-inter text-[#B8894D] text-sm tracking-[0.25em] uppercase mb-4">
          The Founding Charter
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-[#F5F0EB] mb-6">
          Read the charter.
        </h2>
        <p className="font-inter text-base text-[#F5F0EB]/65 mb-10 leading-relaxed">
          The Founding Charter outlines the principles, privileges, and
          obligations of Goon&rsquo;s first members. It is reserved for those
          who hold the passphrase — shared privately with invited founding
          applicants.
        </p>

        {unlocked ? (
          <a
            href="#placeholder"
            download
            className="inline-flex items-center gap-3 border border-[#B8894D] text-[#B8894D] px-10 py-4 rounded-sm font-inter text-sm tracking-[0.2em] uppercase hover:bg-[#B8894D] hover:text-[#1C1C1E] transition-all duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"
              />
            </svg>
            Download Charter (PDF)
          </a>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="password"
              required
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Passphrase"
              aria-label="Charter passphrase"
              className="flex-1 bg-[#4B2A2C]/15 border border-[#B8894D]/25 rounded-sm px-5 py-4 text-[#F5F0EB] font-inter placeholder:text-[#F5F0EB]/40 focus:border-[#B8894D] transition-colors"
            />
            <button
              type="submit"
              className="border border-[#B8894D] text-[#B8894D] px-8 py-4 rounded-sm font-inter text-sm tracking-[0.2em] uppercase hover:bg-[#B8894D] hover:text-[#1C1C1E] transition-all duration-300"
            >
              Unlock
            </button>
          </form>
        )}

        {error && (
          <p className="mt-6 font-inter text-sm text-[#6B1D2F]">
            That passphrase is not recognized. Founding applicants receive it by
            invitation.
          </p>
        )}
      </div>
    </section>
  );
}
