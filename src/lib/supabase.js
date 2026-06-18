import { createClient } from '@supabase/supabase-js';

/* ============================================================
   SUPABASE SETUP
   1. Create a Supabase project.
   2. Auth > Providers > enable Google, paste your existing Google
      OAuth client ID + secret there (same GCP project used for
      YouTube Data API access).
   3. Auth > URL Configuration > add your deployed Vercel URL as a
      Redirect URL.
   4. Table editor > create a table named "experiment_events" with
      columns: id (uuid, default gen_random_uuid(), pk), created_at
      (timestamptz, default now()), session_id (text), name (text),
      payload (jsonb).
   5. Set the env vars below in .env.local (local dev) and in the
      Vercel project settings (production):
      VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
      VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
============================================================ */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = SUPABASE_ENABLED
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export const YT_SCOPES = [
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly',
].join(' ');

// Starts the Supabase-managed Google OAuth flow. Requires Google enabled
// as a provider in Supabase Auth settings — this is the recommended path
// for production since Supabase handles token exchange and session
// storage for you.
export async function signInWithGoogleViaSupabase(redirectTo) {
  if (!supabase) throw new Error('Supabase not configured — set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo, scopes: YT_SCOPES },
  });
}

const _sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);

// Best-effort event write. Falls back to console.log if Supabase isn't
// configured, so the app behaves identically in local/demo mode.
export async function writeEvent(name, payload) {
  console.log('[experiment_event]', name, payload);
  if (!supabase) return;
  try {
    await supabase.from('experiment_events').insert({
      session_id: _sessionId,
      name,
      payload,
    });
  } catch (err) {
    console.error('Failed to write event to Supabase:', err);
  }
}
