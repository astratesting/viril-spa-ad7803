import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIRIL Spa | West Hollywood's First Luxury Spa for Gay Men",
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
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
