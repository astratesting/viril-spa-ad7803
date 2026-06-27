import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Refreshes the Supabase session on every request when Supabase is configured.
 * When Supabase is NOT configured, the app uses the built-in JWT session cookie
 * (handled by lib/auth.ts + middleware.ts), and this helper is a no-op.
 */
export async function updateSession(request: NextRequest): Promise<NextResponse> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  const url = SUPABASE_URL;
  const key = SUPABASE_ANON_KEY;
  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  await supabase.auth.getUser();

  return response;
}
