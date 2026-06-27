import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-ink">
      <div className="w-full max-w-md text-center">
        <div className="mb-10">
          <Link href="/" className="font-archivo text-3xl text-ivory tracking-tight">
            GOON
          </Link>
        </div>

        <div className="border border-brass/20 bg-charcoal-soft p-8">
          <div className="text-brass text-4xl mb-4">✉</div>
          <h1 className="font-playfair text-2xl text-ivory mb-3">
            Check your email
          </h1>
          <p className="font-satoshi text-sm text-ivory/70 leading-relaxed mb-6">
            A verification link has been sent to your inbox. Click it to verify
            your account and gain access to the house.
          </p>
          <p className="font-satoshi text-xs text-ivory/40">
            Didn&rsquo;t receive it? Check your spam folder or{" "}
            <Link href="/login" className="text-brass hover:underline">
              sign in
            </Link>{" "}
            to try again.
          </p>
        </div>

        <p className="mt-6 font-satoshi text-sm text-ivory/60">
          <Link href="/" className="text-brass hover:underline">
            ← Back to landing
          </Link>
        </p>
      </div>
    </main>
  );
}