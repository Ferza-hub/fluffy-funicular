import { YT_SCOPES } from './supabase.js';

/* ============================================================
   GOOGLE OAUTH (direct, non-Supabase path)
   Set these in .env.local / Vercel env:
     VITE_USE_REAL_OAUTH=true
     VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

   In Google Cloud Console > APIs & Services > Credentials, add your
   deployed Vercel URL (e.g. https://your-app.vercel.app) as an
   Authorized redirect URI and Authorized JavaScript origin.
============================================================ */
export const USE_REAL_OAUTH = import.meta.env.VITE_USE_REAL_OAUTH === 'true';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export function startYouTubeOAuthRedirect() {
  const redirectUri = window.location.origin + window.location.pathname;
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(YT_SCOPES)}&prompt=consent`;
  window.location.href = authUrl;
}

// Parses the implicit-grant access token from the URL fragment after
// Google redirects back (response_type=token flow). Call this once on
// app load to detect a freshly completed OAuth round trip.
export function parseOAuthRedirectToken() {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (!hash || !hash.includes('access_token')) return null;
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const accessToken = params.get('access_token');
  if (!accessToken) return null;
  // Clean the token out of the URL bar.
  window.history.replaceState(null, '', window.location.pathname);
  return accessToken;
}

// Fetches the minimal channel stats needed for the diagnostic screen.
// Requires the youtube.readonly and yt-analytics.readonly scopes.
export async function fetchYouTubeChannelData(accessToken) {
  const headers = { Authorization: `Bearer ${accessToken}` };

  const channelRes = await fetch(
    'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true',
    { headers }
  );
  if (!channelRes.ok) throw new Error('Failed to fetch channel data');
  const channelJson = await channelRes.json();
  const channel = channelJson.items?.[0];
  if (!channel) throw new Error('No channel found for this account');

  const handle = '@' + (channel.snippet?.customUrl || channel.snippet?.title || 'channelkamu').replace(/^@/, '');
  const subscribers = Number(channel.statistics?.subscriberCount || 0);
  const videoCount = Number(channel.statistics?.videoCount || 0);

  // Watch time requires the YouTube Analytics API (separate endpoint).
  // estimatedMinutesWatched over the trailing 365 days, converted to hours.
  let watchHours = 0;
  try {
    const end = new Date().toISOString().slice(0, 10);
    const start = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const analyticsRes = await fetch(
      `https://youtubeanalytics.googleapis.com/v2/reports?ids=channel%3D%3DMINE&startDate=${start}&endDate=${end}&metrics=estimatedMinutesWatched`,
      { headers }
    );
    if (analyticsRes.ok) {
      const analyticsJson = await analyticsRes.json();
      const minutes = analyticsJson.rows?.[0]?.[0] || 0;
      watchHours = Math.round(minutes / 60);
    }
  } catch (err) {
    console.warn('YouTube Analytics fetch failed, watchHours defaults to 0:', err);
  }

  return { handle, subscribers, watchHours, videoCount };
}
