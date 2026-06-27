// Shared cookie/session constants. Kept separate from lib/auth.ts so the
// Edge middleware can import the cookie name without pulling in `jose`.

export const SESSION_COOKIE = "goon_session";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
