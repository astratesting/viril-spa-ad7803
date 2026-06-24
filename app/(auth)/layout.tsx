import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-rich-black flex flex-col items-center justify-center px-6">
      <Link href="/" className="font-playfair text-2xl text-gold tracking-widest mb-10">
        VIRIL
      </Link>
      {children}
    </div>
  );
}
