# Readyline — experiment prototype

Riset perilaku kreator terhadap produk "monetization readiness tracker".
Bukan layanan komersial aktif — lihat catatan etika di bagian bawah.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env.local   # lalu isi nilai yang relevan
npm run dev
```

Tanpa mengisi `.env.local`, app tetap berjalan penuh dalam **mode demo**:
connect YouTube memunculkan data contoh setelah animasi loading, TikTok/
Instagram/Facebook tetap manual-input seperti biasa, dan semua event
eksperimen hanya tercatat ke `console.log`.

## Mengaktifkan data YouTube real

1. Di Google Cloud Console, project yang sudah Anda punya: aktifkan
   **YouTube Data API v3** dan **YouTube Analytics API**.
2. Di **Credentials**, tambahkan domain Vercel Anda (misal
   `https://readyline.vercel.app`) sebagai *Authorized JavaScript origin*
   dan *Authorized redirect URI*.
3. Set di `.env.local` / Vercel project settings:
   ```
   VITE_USE_REAL_OAUTH=true
   VITE_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
   ```

## Mengaktifkan Supabase (auth + event logging)

1. Buat project di [supabase.com](https://supabase.com).
2. **Auth > Providers** → aktifkan Google, isi client ID + secret yang
   sama dengan GCP project di atas.
3. **Auth > URL Configuration** → tambahkan URL Vercel Anda sebagai
   Redirect URL.
4. **Table editor** → buat tabel `experiment_events`:

   | kolom | tipe | default |
   |---|---|---|
   | id | uuid | `gen_random_uuid()`, primary key |
   | created_at | timestamptz | `now()` |
   | session_id | text | — |
   | name | text | — |
   | payload | jsonb | — |

5. Set di `.env.local` / Vercel project settings:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxx
   ```

## Deploy ke Vercel

```bash
npm i -g vercel   # jika belum ada
vercel
```

Atau hubungkan repo ini langsung lewat dashboard Vercel — framework
preset **Vite** akan terdeteksi otomatis. Jangan lupa isi environment
variables yang sama seperti `.env.local` di **Project Settings > 
Environment Variables**.

## Struktur folder

```
src/
  lib/            # config, design tokens, format helpers, Supabase, Google OAuth
  hooks/          # useSectionTracking (Intersection Observer dwell-time)
  components/     # UI kecil yang dipakai lintas screen
  screens/        # satu file per layar utama
    marketing/     # sub-section dari landing page (Hero, FAQ, dll)
```

## Catatan etika & kejujuran produk

Tool ini sengaja dirancang dengan batasan berikut, jangan dihapus saat
dikembangkan lebih lanjut:

- Tidak pernah mengklaim bisa mengubah subscriber/followers/watch time
  akun nyata. Semua paket hanya mempercepat *proses verifikasi internal*,
  bukan metrik resmi platform.
- Disclosure ("belum ada transaksi nyata, ini riset") selalu muncul
  setelah klik pilih paket — posisinya sengaja diletakkan setelah klik,
  bukan sebelum, supaya reaksi harga/urgensi yang terekam tetap otentik,
  tapi pengguna tetap diberi tahu sebelum mengira sudah membayar apa pun.
- Facebook ditandai eksplisit sebagai program invite-only tanpa
  threshold publik resmi — jangan ubah ini jadi angka pasti tanpa
  sumber resmi dari Meta.
- FAQ menyebut eksplisit bahwa keputusan monetisasi akhir ada di tangan
  algoritma/kebijakan platform, bukan di tangan Readyline.
