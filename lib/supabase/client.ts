import { createBrowserClient } from "@supabase/ssr";

import { isRealEnv } from "@/lib/env";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  isRealEnv(SUPABASE_URL) && isRealEnv(SUPABASE_ANON_KEY);

/** Browser-side Supabase client. Real when configured, null otherwise. */
export function createBrowserSupabase() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string);
}
