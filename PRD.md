# PRD: Portfolio + Custom CMS (Achmad Ridho)

**Versi**: 1.0 | **Status**: Approved | **Tanggal**: 2026-08-11
**Sumber keputusan**: Sesi grilling 3 round (Q1–Q15), disetujui penuh oleh user.

---

## 1. Executive Summary

**Problem Statement**: Developer (Achmad Ridho) membutuhkan portfolio online profesional untuk menampilkan karya dan tulisan, dikelola sendiri (self-managed) tanpa ketergantungan pada platform CMS pihak ketiga — bisa di-update isinya kapan saja via admin panel, tanpa deploy ulang.

**Proposed Solution**: Single-codebase aplikasi fullstack — Next.js 16 (App Router, TypeScript) dengan admin panel custom terhadap Postgres (Supabase), autentikasi single-admin, storage gambar via Supabase Storage, ISR + on-demand revalidation sehingga konten yang diedit di admin tampil instan di situs publik, dan deploy ke Vercel.

**Success Criteria** (terukur, diverifikasi saat release):

| Metrik | Target |
|---|---|
| `npm run lint` + `npm run build` | 0 error, 0 warning memblokir |
| Perubahan konten via admin → tampil di situs publik | ≤ 1 detik (setelah klik Save, via `revalidatePath`) |
| Halaman non-admin (`/admin/*` selain `/login`) diakses tanpa login | 100% diredirect ke `/admin/login` |
| Form contact (honeypot + throttle) | Spam diprediksi ≥ 95% tertahan; notifikasi email terkirim < 60 detik |
| Lighthouse Performance & Accessibility (halaman publik) | ≥ 90 |
| Cache ISR detail project/post | Revalidate sukses tanpa full rebuild (build time ≤ 60 dtk di Vercel) |

---

## 2. User Experience & Functionality

### 2.1 Personas

| Persona | Kebutuhan |
|---|---|
| **P1. Recruiter / Hiring Manager** | Menilai skill via karya nyata (projects + kode), kontak cepat |
| **P2. Developer peer** | Membaca tulisan teknis (blog), menjelajah RSS |
| **P3. Achmad Ridho (Admin)** | Login sekali, kelola seluruh konten tanpa menyentuh kode |

### 2.2 User Stories & Acceptance Criteria

- **S1 — Melihat home**: Sebagai pengunjung, saya ingin melihat hero (nama + tagline + CTA), featured projects (3), dan latest posts (3) dalam satu halaman, sehingga saya bisa menilai profil dalam sekali scroll.
  - **AC**: Home punya 3 section berurutan (Hero → Featured Projects → Latest Posts); featured projects = `featured=true` terbaru; skip project saat belum ada data.
- **S2 — Detail project**: Sebagai pengunjung, saya ingin membuka `/projects/[slug]` berisi deskripsi penuh, tech stack, link live & repo, sehingga saya bisa mengevaluasi karya.
  - **AC**: Halaman diper-render dengan ISR; slug unik; link live/repo tampil hanya jika diisi.
- **S3 — Blog + pagination + tags**: Sebagai pengunjung, saya ingin membaca `/blog` dengan paginasi (6/halaman) dan filter tag, sehingga navigasi tulisan mudah.
  - **AC**: `/blog?page=N` valid; `/blog/tag/[tag]` memfilter dengan paginasi yang sama; post unpublished TIDAK pernah muncul.
- **S4 — RSS**: Sebagai pembaca RSS, saya ingin subscribe `/feed.xml` berisi 10 postingan terbaru.
  - **AC**: XML valid (RFC 4287 Atom atau RSS 2.0), items = published posts terbaru max 10.
- **S5 — Contact**: Sebagai pengunjung, saya ingin mengirim pesan (nama + email + subjek + isi) sehingga saya bisa dihubungi.
  - **AC**: Wajib isi semua field; honeypot field tersembunyi (kosong = manusia); throttle 1 pesan/IP/5 menit; pesan tersimpan di tabel `Message`; notifikasi email terkirim ke `achmad.ridho.st@gmail.com` via Resend (sender `onboarding@resend.dev`); sukses ≠ mengungkap detail error (tampilkan pesan generik).
- **S6 — Login admin**: Sebagai admin, saya ingin login `/admin/login` dengan email + password, sehingga hanya saya yang bisa mengelola konten.
  - **AC**: Credentials provider Auth.js v5, JWT session; semua `/admin/*` kecuali `/admin/login` diblokir `proxy.ts` (redirect ke login); bcrypt hash dibandingkan aman.
- **S7 — CRUD Project**: Sebagai admin, saya ingin membuat/mengedit/menghapus project (termasuk upload cover image) agar portfolio up-to-date.
  - **AC**: Form: title, slug (auto dari title, editable, validasi unik), shortDescription, content, liveUrl, repoUrl, cover upload (drag/click → Supabase Storage → URL tersimpan), techStack (tag input), featured toggle, published toggle; preview thumbnail; delete menghapus image dari Storage; mutasi memicu revalidation.
- **S8 — CRUD Blog Post**: Sebagai admin, saya ingin menulis post markdown dengan preview live, tags, dan cover image.
  - **AC**: Editor = textarea + panel preview react-markdown (GFM + sanitize); 2 kolom (source | preview); toggle published; mutasi memicu revalidation.
- **S9 — Messages**: Sebagai admin, saya ingin melihat inbox dengan read/unread dan menghapus pesan.
  - **AC**: Dashboard menampilkan badge unread; daftar pesan dengan toggle read; delete dengan konfirmasi.
- **S10 — Dashboard**: Sebagai admin, saya ingin melihat ringkasan (jumlah projects/posts/messages + pesan terbaru) di `/admin`.
  - **AC**: Statistik real-time dari DB; 5 pesan terbaru yang belum dibaca ditampilkan.

### 2.3 Non-Goals (di luar scope v1)

- Tidak ada multi-user/login pihak ketiga (Google/GitHub OAuth).
- Tidak ada fitur komentar, search internal, atau analytics terintegrasi.
- Tidak ada manajemen halaman statis (About content = dummy hardcoded + `site.ts`).
- Tidak ada fitur ganti password di UI admin (password awal = env `ADMIN_PASSWORD`).
- Tidak ada webhook/API publik; semua mutasi hanya via admin session.
- Tidak ada test otomatis (unit/E2E) — verifikasi via lint, build, dan test alur manual.

---

## 3. AI System Requirements

**Tidak applicable** — produk ini bukan sistem AI. (Disertakan hanya untuk kelengkapan struktur PRD.)

---

## 4. Technical Specifications

### 4.1 Architecture Overview

```
[Browser] ── public pages (ISR, fetch via Prisma server-side)
    │
    ├── /admin/*  → proxy.ts guard (JWT session check)
    │                └── Server Actions / Route Handlers (CRUD)
    │                     ├── Prisma → Supabase Postgres
    │                     └── Supabase Storage (service_role) → public URL
    │                     └── revalidatePath (list, [slug], home, feed)
    ├── /api/contact → honeypot + throttle check → Prisma insert → Resend email
    └── /feed.xml → query published posts → XML response
```

- **Runtime**: Node.js server components; `proxy.ts` = edge-compatible (hanya baca cookie, tanpa Prisma).
- **Rendering**: Detail pages = `export const revalidate = 3600` (ISR) + `revalidatePath` on-demand; halaman list = dynamic (prisma query) — semua halaman statis di-build, mutasi admin memicu revalidasi instan.

### 4.2 Integration Points

| Integrasi | Detail |
|---|---|
| **Supabase Postgres** | `DATABASE_URL` = pooler (port 6543, `?pgbouncer=true&connection_limit=1`); `DIRECT_URL` = direct (port 5432) untuk `prisma migrate` |
| **Prisma ORM** | Schema: `User`, `Project`, `BlogPost`, `Message`; seed idempotent membaca `ADMIN_PASSWORD` env (kosong → generate + print sekali) |
| **Supabase Storage** | Bucket `covers` PUBLIC + RLS policy `public read`; upload/remove via `SUPABASE_SERVICE_ROLE_KEY` di server; `remotePatterns` host `<project-ref>.supabase.co` di `next.config.ts` |
| **Auth.js v5** | Credentials + JWT strategy; tanpa Prisma adapter (`authorize()` query `User` langsung); env `AUTH_SECRET`, `AUTH_TRUST_HOST=true` di Vercel |
| **Resend** | Kirim notifikasi contact; sender `onboarding@resend.dev` (v1, tanpa domain) → `achmad.ridho.st@gmail.com` |
| **RSS** | Route `app/feed.xml/route.ts` → RSS 2.0, 10 published posts terbaru |
| **SEO** | `app/sitemap.ts`, `app/robots.ts`, metadata + OG per halaman; base URL dari `NEXT_PUBLIC_SITE_URL` (fallback `<deployment>.vercel.app`) |

### 4.3 Schema Database (Prisma)

```prisma
model User      { id String @id @default(cuid())  email String @unique  passwordHash String  createdAt/updatedAt }
model Project   { id, title, slug @unique, shortDescription, content, liveUrl?, repoUrl?, coverImageUrl, techStack String[], featured Boolean @default(false), published Boolean @default(false), timestamps }
model BlogPost  { id, title, slug @unique, excerpt, content, coverImageUrl?, tags String[], published Boolean @default(false), timestamps }
model Message   { id, name, email, subject, message, isRead Boolean @default(false), createdAt }
```

### 4.4 Security & Privacy

- **Auth**: bcrypt hash (cost ≥ 10); JWT session HttpOnly; `AUTH_SECRET` acak (min. 32 char).
- **Admin guard**: `proxy.ts` matcher `/admin/:path*` kecuali `/admin/login` + layout-level session check (defense in depth).
- **Markdown**: `rehype-sanitize` (allowlist `rehype-sanitize` default) + `remark-gfm` — mencegah XSS via konten admin.
- **Storage**: kunci service_role TIDAK pernah diakses client; hanya upload/delete di server.
- **Throttle contact**: 1 pesan per IP per 5 menit (diperiksa di DB sebelum insert).
- **Env vars**: seluruh secret di `.env` (tidak di-commit; `.env.example` disediakan), di-set manual di dashboard Vercel.
- **Data**: message email disimpan hanya untuk keperluan balasan; tidak ada data PII lain.

### 4.5 Desain UI

- Tailwind v4 + shadcn/ui; sistem desain **"Pinterest"** (mengikuti `DESIGN-pinterest.md`): CTA merah `#E60023` (pressed `#CC001F`) sebagai satu-satunya aksen jenuh, chrome cream/light (`canvas #FFFFFF`, `surface-soft #FBFBF9`, `surface-card #F6F6F3`), teks `body #33332E`, radius **16px** (dominan) / **32px** (kartu besar, modal) / **pill**, tanpa shadow pada kartu, masonry pin grid 8px gutter.
- **Mode light + dark via toggle** (persist localStorage + preferensi sistem; default light). Dark: adaptasi hangat token (bg `#1A1817`, card `#242120`, teks `#F5F5F3`), merah CTA tetap `#E60023`.
- Tipografi: **Inter** (400/500/600/700) sebagai substitusi Pin Sans di semua peran teks; **tanpa serif & tanpa monospace** pada chrome (mono hanya dipertahankan untuk blok kode dalam konten markdown).
- Fokus input: double-ring (border 2px ink + outline 4px `#435EE5`); feedback form: pill sukses `#C7F0DA`/`#103C25`, error `#9E0A0A` (inline, tanpa toast lib).
- Konten publik **English**; UI admin **Bahasa Indonesia**.
- Site identity terpusat di `src/lib/site.ts` (name: "Achmad Ridho", tagline: "Fullstack Developer", email: `achmad.ridho.st@gmail.com`).
- Riwayat desain sebelumnya: lihat `firstDesign.md` (Terminal Alive / Steel & Tungsten) dan `secondDesign.md` (Midnight Marigold), keduanya ditolak owner 8/2026.

---

## 5. Risks & Roadmap

### 5.1 Phased Rollout

| Fase | Scope | Kriteria selesai |
|---|---|---|
| **MVP (v1.0)** | Seluruh lingkup PRD ini | Lint + build hijau; test alur manual lulus (login → CRUD → cek publik → contact → email) |
| **v1.1 (est.)** | Domain kustom + sender Resend domain; fitur ganti password; analytics dasar | Domain aktif, email dari domain sendiri |
| **v2.0 (est.)** | Komentar blog, search, draf-preview publik (share link) | Sesuai kebutuhan setelah pemakaian nyata |

### 5.2 Technical Risks & Mitigation

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Supabase pooler timeout saat migrate | Migrasi gagal | `DIRECT_URL` port 5432 khusus Prisma; `connection_limit=1` untuk runtime |
| Login gagal di produksi Vercel (Auth.js) | Admin terkunci | `AUTH_TRUST_HOST=true` + `AUTH_SECRET` di-set sejak awal, dicek di checklist deploy |
| Gambar storage 404 di produksi | Cover image rusak | Bucket public + RLS read policy + `remotePatterns` diverifikasi saat verifikasi deploy |
| Stale cache setelah edit (ISR) | Konten lama tampil | `revalidatePath` untuk slug + list + home + feed di setiap mutasi |
| Next 16 API rename (`proxy` vs `middleware`, eslint CLI) | Bingung saat implementasi | Dipakai sejak scaffold; tidak mengikuti tutorial Next 15 mentah-mentah |
| Spam contact | Inbox kotor, email spam | Honeypot + throttle DB 1/IP/5 menit |
| `.vercel.app` subdomain tidak bisa jadi sender email Resend | Notifikasi gagal | Sender `onboarding@resend.dev` di v1 (tidak butuh verifikasi domain) |
| Quota free tier (ISR build minutes, email) | Keterlambatan ringan | Vercel free = 100GB bandwidth + build menit cukup untuk portfolio; Resend free 3.000 email/bulan |

---

*Dokumen ini adalah source of truth untuk implementasi. Perubahan scope harus melalui pembaruan dokumen + persetujuan.*