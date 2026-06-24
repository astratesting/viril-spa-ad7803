import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goon | Premium Spa for Gay Men in West Hollywood",
  description:
    "A members-only luxury spa and grooming destination designed exclusively for gay men. Massage, facials, waxing, and body treatments in West Hollywood. Coming Soon.",
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
