import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIRIL | Luxury Gay Men's Spa - Coming Soon",
  description:
    "The first members-only luxury spa for gay men in West Hollywood. Massage, facials, waxing, and body treatments in an affirming, upscale environment. Coming Soon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
