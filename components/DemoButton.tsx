// One-click entry into the live demo. Submits a plain form POST to the demo
// auth route, which sets a session cookie and redirects to the dashboard.
export default function DemoButton() {
  return (
    <form action="/api/auth/demo" method="post" className="inline">
      <button
        type="submit"
        className="inline-flex items-center gap-2 border border-brass text-brass px-10 py-4 font-satoshi text-sm font-bold tracking-[0.2em] uppercase hover:bg-brass hover:text-ink transition-all duration-300"
      >
        View Live Demo
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
            d="M14 5l7 7-7 7M21 12H3"
          />
        </svg>
      </button>
      <input type="hidden" name="role" value="member" />
    </form>
  );
}
