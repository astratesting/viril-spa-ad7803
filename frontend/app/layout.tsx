import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Goon — Coming Soon | A Private Members Club",
  description:
    "Goon is West Hollywood's first members-only club for high-net-worth gay and lesbian individuals — a private sanctuary where old-world elegance meets authentic community. Coming soon. Apply for membership.",
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
