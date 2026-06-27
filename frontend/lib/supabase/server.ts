import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isRealEnv } from "@/lib/env";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  isRealEnv(SUPABASE_URL) && isRealEnv(SUPABASE_ANON_KEY);

/**
 * Server-side Supabase client. Returns null when Supabase env vars are
 * unset/placeholder — the app then falls back to the built-in credential
 * auth in lib/auth.ts.
 */
export async function createServerSupabase() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll may be called from a Server Component where cookies are read-only.
        }
      },
    },
  });
}
