import { createClient as createSupabaseClient } from "@supabase/supabase-js";

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. Copy .env.example to .env.local and add your credentials."
    );
  }

  return { url, anonKey };
}

export function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createSupabaseClient(url, anonKey);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
