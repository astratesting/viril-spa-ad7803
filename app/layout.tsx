import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goon — A Private Sanctuary for the Discerning",
  description:
    "Goon is an identity-verified, members-only spa and salon for lesbian and gay men — built in the spirit of an old European private members club. By invitation. Coming Soon.",
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
