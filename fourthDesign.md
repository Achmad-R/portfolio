# Fourth Design — Recording UI/UX (Sebelum Perbaikan Anti-Slop)

Dokumen ini mencatat desain front-end **yang sedang berjalan sebelum perbaikan audit anti-slop (skill design-taste-frontend, 2026-08-19)**, sebagai arsip pembanding dan sumber keputusan. Dibuat: 2026-08-19.

---

## 1. Meta

| Item | Nilai |
|---|---|
| Nama arah desain | "Figma — Editorial Monochrome + Pastel Color Blocks" (implementasi `DESIGN-figma.md`, Redesign v4) |
| Mode | Light + dark via toggle (persist localStorage `theme` + preferensi sistem; default mengikuti sistem) |
| Palet | Monokrom hitam-putih (chrome) + 7 pastel color block (lime, lilac, cream, mint, pink, coral, navy) |
| Tipografi | 2 font aktif: Inter variable (320–700) menggantikan figmaSans; JetBrains Mono menggantikan figmaMono |
| Radius | sm 6px / md 8px / lg 24px / xl–4xl 32px / pill (`rounded-full`); `--radius: 8px` |
| Deploy terakhir | https://portofolio-nine-beryl-74.vercel.app |
| Alasan perbaikan | Audit anti-slop menemukan: em-dash (`—`) pada copy publik & metadata, eyebrow hero menyebut kota "Jakarta, ID", badge "Featured" overlay di atas gambar kartu proyek |

## 2. Design System

### 2.1 Palet (`src/app/globals.css`, `:root` = light, `.dark` = dark)

| Token | Nilai light | Nilai dark | Peran |
|---|---|---|---|
| `--background` | `#ffffff` | `#0d0d0d` | canvas |
| `--foreground` | `#000000` | `#f2f2f2` | teks default |
| `--primary` | `#000000` | `#ffffff` | CTA utama / surface terpilih |
| `--primary-foreground` | `#ffffff` | `#000000` | teks di atas primary |
| `--ink` | `#000000` | `#f2f2f2` | headline & teks tegas |
| `--muted` | `#f7f7f5` | `#1a1a1a` | surface redup |
| `--muted-foreground` | `#6f6f6f` | `#a3a3a3` | teks meta / sekunder |
| `--accent` | `#f1f1f1` | `#1f1f1f` | hover surface |
| `--surface-soft` | `#f7f7f5` | `#141414` | tile kartu |
| `--live` | `#1ea64a` | `#4ade80` | status available (dot) |
| `--border` | `#e6e6e6` | `rgb(242 242 242 / 12%)` | hairline |
| `--input` | `#d1d1d1` | `rgb(242 242 242 / 25%)` | border input |
| `--destructive` | `#d70000` | `#ff6b6b` | error |
| `--block-lime` | `#dceeb1` | `#dceeb1` | color block (Stack, CTA) |
| `--block-lilac` | `#c5b0f4` | `#c5b0f4` | color block (cadangan) |
| `--block-cream` | `#f4ecd6` | `#f4ecd6` | color block (cadangan) |
| `--block-pink` | `#efd4d4` | `#efd4d4` | color block (cadangan) |
| `--block-mint` | `#c8e6cd` | `#c8e6cd` | color block (cadangan) |
| `--block-coral` | `#f3c9b6` | `#f3c9b6` | color block (CTA "Have a project in mind?") |
| `--block-navy` | `#1f1d3d` | `#1f1d3d` | color block gelap (Timeline) |
| `--block-fg` | `#211922` | `#211922` | teks di atas block terang |
| `--block-fg-inverse` | `#ffffff` | `#ffffff` | teks di atas block gelap |

Catatan: block pastel identik di kedua mode (tidak diadaptasi). `::selection` hitam-putih / putih-hitam. Tanpa shadow pada block — warna adalah depth device.

### 2.2 Tipografi

| Peran | Kelas | Padanan figmaSans |
|---|---|---|
| H1 hero (home) | `text-6xl sm:text-7xl lg:text-[80px] font-[340] leading-[1.05] tracking-[-1.72px]` | display-xl 86px/340/1.00/-1.72px |
| H1 halaman (About/Projects/Blog/Contact/detail) | `text-5xl sm:text-6xl font-[340] leading-[1.1] tracking-[-0.96px]` | display-lg 64px/340/1.10/-0.96px |
| Judul section | `text-[26px] font-[540] leading-[1.35] tracking-[-0.26px]` | headline 26px/540/1.35/-0.26px |
| Body besar (hero subtext, about intro) | `text-lg sm:text-xl font-[330] leading-[1.45]` | body-lg 20px/330/1.40 |
| Body meta | `text-base text-muted-foreground leading-relaxed` | body 18px/320 |
| Eyebrow / label mono | `font-mono text-[11px] uppercase tracking-[0.54px] text-muted-foreground` | figmaMono eyebrow |
| Caption mono | `font-mono text-xs uppercase tracking-[0.54px]` | figmaMono caption |
| Button | `text-sm font-bold` | button 20px/480 (disederhanakan) |

Inter dimuat via `next/font/google` (variable), JetBrains Mono juga variable. Teks utama selalu `text-ink` (hitam penuh); hierarki dibawa oleh weight, bukan opacity. Konvensi `gap-7` di hero, `gap-24` antar section.

### 2.3 Radius & Shape

- Pill (`rounded-full`) untuk SEMUA tombol & CTA — tidak ada tombol kotak.
- `rounded-[24px]` untuk kartu besar & color block.
- `rounded-md` (8px) untuk kartu proyek, cover image kecil.
- `rounded-sm` (6px) untuk badge, chips, tag.
- Badge `rounded-sm h-6 text-xs font-semibold`; variant: default (bg-muted), secondary (bg-ink text-background), outline (border-border).

## 3. Komponen

| Komponen | Spesifikasi |
|---|---|
| Navbar | Sticky `top-0 z-50`, `bg-background border-b`, `h-14`, `max-w-6xl`; logo kiri; link Home/About/Projects/Blog/Contact (`md:flex`, gap-7, underline aktive via `after:`); toggle theme lingkaran `size-10 bg-surface-soft`; CTA pill "Contact" `bg-primary`; mobile hamburger → dropdown `max-h-72` |
| Button (ui/button) | `rounded-full h-10 px-5 text-sm font-bold whitespace-nowrap`; `active:translate-y-px`; focus `ring-3 ring-ring/50`; variant default (bg-primary), outline (border-input), secondary, ghost, destructive, link |
| ProjectCard | `bg-surface-soft rounded-md p-4`; cover `aspect-video rounded-md` object-cover + scale 1.02 on hover; **badge "Featured" overlay** `absolute left-2.5 top-2.5 bg-ink text-background` (pojok kiri-atas gambar); baris mono tanggal; judul `text-lg font-semibold`; deskripsi `text-sm line-clamp-2`; tag tech `rounded-sm bg-muted` (max 4) |
| PostRow | Baris `px-6 py-5` dalam kontainer `divide-y border rounded-[24px]`; mono tanggal `w-24`; judul semibold truncate; tag `#tag text-xs` |
| ContactForm | Label di atas input (`gap-2`), error `text-xs text-destructive` di bawah; honeypot tersembunyi; success "Message sent — I'll get back to you soon." (`text-success-deep`); error "Something went wrong. Try again in a few minutes." + detail |
| Pagination | Pill `border-input` Prev/Next + indikator mono `{current} / {total}` |
| Footer | `border-t bg-background px-8 py-16`; grid 4 kolom (Explore / Connect / Stack / brand+ikon); baris bawah `© {tahun} {nama}` + tagline, `text-xs` |
| Markdown | `prose dark:prose-invert`, heading `text-ink`, link `text-ink-soft` tanpa underline |

## 4. Layout per Halaman

| Halaman | Pola |
|---|---|
| `/` | `max-w-6xl py-16 sm:py-24 gap-24`. Hero: grid `lg:grid-cols-[1.4fr_1fr]` — kiri: eyebrow mono **"Fullstack developer · Jakarta, ID"** + H1 nama + subtext + 2 pill CTA ("View projects" primary, "Contact" outline); kanan: kartu "Now" `rounded-[24px] border p-8` dengan dot hijau "Available", baris MapPin **"Based in Jakarta — remote-friendly, open to full-time roles and freelance projects."**, baris email, link "More about me". Lalu: Featured projects (grid 3 kolom ProjectCard) → Stack (`bg-block-lime rounded-[24px] p-12`, chip `bg-white/80 rounded-sm`) → Latest posts (list `border rounded-[24px] divide-y`) → Timeline (`bg-block-navy p-12 text-block-fg-inverse`, grid `sm:grid-cols-[100px_1fr]`) → CTA (`bg-block-coral p-12`, pill "Start a conversation" `bg-block-fg text-white`) |
| `/about` | `max-w-3xl py-16 sm:py-24 gap-14`. H1 "About" + intro 2 paragraf ("Hi, I'm Achmad Ridho — Fullstack Developer...") → Stack (Badge outline) → Timeline (sama dengan home) |
| `/projects` | `max-w-6xl`. Header `max-w-2xl` (H1 + "A selection of things I've built — from fullstack applications to APIs and tooling.") → grid 3 kolom ProjectCard; empty state "No projects published yet." |
| `/projects/[slug]` | `max-w-3xl py-16 gap-8`. Back link "All projects" → header: baris mono tanggal + Badge "Featured" → H1 judul → shortDescription → tag tech outline → pill "Live demo" (primary) + "Source code" (outline) → cover `aspect-video rounded-[24px] border` → konten Markdown |
| `/blog` | `max-w-4xl`. Header (H1 "Blog" + deskripsi) → list `border rounded-[24px] divide-y` → Pagination |
| `/blog/[slug]` | `max-w-3xl`. Back link "All posts" → header: mono tanggal + badge `#tag` → H1 → excerpt → cover → Markdown |
| `/contact` | `max-w-2xl`. Header (H1 "Contact" + "Have a project in mind, or just want to say hi? Fill out the form below and I'll get back to you at {email}.") → ContactForm |
| Admin (`/admin/*`) | Bahasa Indonesia; sidebar; heading "Dashboard/Blog/…" sans; tabel `surface-card`; tombol pill; title tab: "Dashboard — Admin" dst. |

## 5. Motion & Interaksi

- Minimal & halus: `transition-colors` / `transition-opacity` pada hover link, kartu, tombol.
- Hero home: `animate-in fade-in duration-500` + `slide-in-from-bottom-3 delay-150` (tw-animate-css).
- Tombol: `active:translate-y-px` (tekan fisik), hover `hover:opacity-90` pada primary.
- `@media (prefers-reduced-motion: reduce)` global di `globals.css` (durasi 0.01ms).
- Tidak ada GSAP, ScrollTrigger, parallax, atau marquee.

## 6. Catatan Arsip (kondisi SEBELUM perbaikan)

Poin-poin spesifik yang akan diubah oleh perbaikan anti-slop (arsip ini menjadi referensi untuk revert):

1. **Em-dash (`—`) pada copy publik & metadata**, antara lain:
   - Home hero: "I build fast, maintainable web applications — clean architecture, ..."
   - Home/About timeline: "Fell in love with the full stack — from REST APIs and databases ..."
   - Home kartu Now: "Based in Jakarta — remote-friendly, open to full-time roles ..."
   - About intro: "Hi, I'm Achmad Ridho — Fullstack Developer. ..."
   - Projects intro: "A selection of things I've built — from fullstack applications ..."
   - Contact success: "Message sent — I'll get back to you soon."
   - Template metadata: `%s — Achmad Ridho` (layout, about, feed.xml, seluruh title admin)
2. **Eyebrow hero menyebut kota**: "Fullstack developer · Jakarta, ID"
3. **Badge "Featured" overlay di gambar** ProjectCard (pojok kiri-atas, `bg-ink`)
4. Kode komentar di `api/contact/route.ts` & `contact-form.tsx` juga memakai em-dash (tidak tampil ke user).

## 7. Referensi

- `DESIGN-figma.md` — sistem desain target (sumber palet, tipografi, komponen).
- `thirdDesign.md` — arsip desain sebelumnya (Pinterest).
- `PRD.md` §4.5 — spesifikasi produk.
- `src/app/globals.css` — sumber token warna & radius.
- `src/app/page.tsx`, `src/components/*` — implementasi aktual.

*Dokumen ini arsip kondisi saat ini (2026-08-19). Perubahan setelah tanggal ini tercatat sebagai perbaikan anti-slop dan dapat direfer balik ke dokumen ini.*
