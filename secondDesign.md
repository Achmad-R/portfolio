# Second Design — Recording UI/UX (Sebelum Redesign v3)

Dokumen ini mencatat desain front-end **yang sedang berjalan sebelum redesign "Pinterest" (DESIGN-pinterest.md)**, sebagai arsip pembanding dan sumber keputusan. Dibuat: 2026-08-13.

---

## 1. Meta

| Item | Nilai |
|---|---|
| Nama arah desain | "Midnight Marigold — Modern Dev-Tools" |
| Mode | Dark-only (html class `dark`; `:root` dan `.dark` bernilai identik) |
| Palet | Midnight kelam + marigold hangat + kobalt + sage |
| Tipografi | 3 font aktif: Bricolage Grotesque (display), DM Sans (body), JetBrains Mono (data kecil) |
| Deploy terakhir | commit `4bac9e0` → https://portofolio-nine-beryl-74.vercel.app |
| Alasan penggantian | Owner memutuskan mengikuti sistem desain "Pinterest" (DESIGN-pinterest.md): CTA merah, chrome cream/light, masonry pin grid, radius 16/32/pill, Inter, tanpa shadow & tanpa monospace; plus mode light/dark via toggle |

## 2. Design System

### 2.1 Palet (`src/app/globals.css`, `:root` = `.dark`)

| Token | Nilai | Peran |
|---|---|---|
| `--background` | `#0b0e14` | midnight |
| `--foreground` | `#e6eaf2` | perak muda |
| `--card` / `--popover` | `#12161f` | surface |
| `--secondary` / `--muted` | `#1a202b` / `#161c26` | surface redup |
| `--accent` | `#1a212e` | hover surface |
| `--muted-foreground` | `#8a94a6` | teks meta |
| `--primary` | `#e8a33d` | marigold — CTA, aksen, dot aktif |
| `--primary-foreground` | `#1a1206` | teks di atas primary |
| `--link` | `#5c86c0` | kobalt — link |
| `--live` | `#86a873` | sage — status available |
| `--destructive` | `#d65a4a` | bata — error (translucent) |
| `--border` | `rgb(230 234 242 / 10%)` | hairline |
| `--input` | `rgb(230 234 242 / 14%)` | border input |
| `--ring` | `rgb(232 163 61 / 55%)` | focus ring marigold |
| `--radius` | `0.75rem` | sudut membulat |
| `--sidebar` | `#0e1219` | sidebar admin |

### 2.2 Tipografi

- Display & heading: **Bricolage Grotesque** (`--font-heading`), track ketat, `tracking-tighter` di H1 besar.
- Body: **DM Sans** (`--font-sans`).
- Data kecil (tanggal, tag, tahun, command, kode): **JetBrains Mono** (`--font-mono`) — `font-mono text-[10px]` untuk label tag.
- Skala: H1 hero 5xl–7xl bold `tracking-tighter`, section title xl–2xl, body 14–16px.

### 2.3 Signature & pola

- Hero home: grid `[1.4fr_1fr]`, nama besar + dot `.` marigold, animasi masuk `animate-in fade-in slide-in-from-bottom-3`, card "Now" (`bg-live` dot "Available").
- Kartu proyek: `rounded-lg border bg-card`, cover aspect-video, hover `-translate-y-0.5 border-primary/40`, badge tech `outline font-mono text-[10px]`, link "View project" + ArrowUpRight.
- Baris post: `divide-y rounded-xl border bg-card`, row `px-5 py-4 hover:bg-accent`, tanggal mono, `#tag` mono 10px.
- CTA band home: `rounded-xl border-primary/30 bg-primary/5 p-8` (amber tint).
- Admin: sidebar `bg-sidebar`, heading terminal `$ projects` / `~/admin`, checkbox & tombol `primary` marigold, tabel `rounded-lg border bg-card`.
- Feedback form: teks inline `text-primary` (sukses) / `text-destructive` (error) + `lastError` mono; tanpa toast system.
- Fokus: `focus-visible:ring-3 ring-ring/50` (marigold).

## 3. Bahasa visual per halaman

| Halaman | Pola saat second design |
|---|---|
| **Home** | Hero nama 7xl + dot marigold; aside "Now" (`● Available`); featured projects grid 2 kolom kartu border; "Latest posts" list card; CTA band amber |
| **/projects** | Grid kartu `rounded-lg border bg-card`, cover aspect-video, badge mono |
| **/blog** | PostRow: tanggal mono + judul + `#tag` mono; pagination bordered |
| **/about** | Lead + outline badges; timeline tahun `text-primary` mono |
| **/contact** | Form (name/email/subject/message) + feedback inline |
| **Detail** | `article max-w-3xl`, cover aspect-video `rounded-lg border`, CTA `rounded-md bg-primary` / outline; prose `prose-invert prose-headings:text-primary prose-a:text-primary` |
| **Navbar** | `sticky border-b bg-background/80 backdrop-blur`, CTA hand-rolled `rounded-lg bg-primary` |
| **Footer** | `border-t py-10`, link icon (RSS/GitHub/mail) muted |
| **Admin** | Sidebar `bg-sidebar` + heading `$ projects`; form `max-w-2xl`; markdown editor 2 pane; upload drag-drop dashed |

## 4. Struktur & catatan

- Container publik: `max-w-3xl` (teks) / `max-w-6xl` (nav) / `max-w-4xl` (blog list); `px-4 py-16 sm:py-24`.
- Konten berbasis kartu: `rounded-xl border bg-card ring-1 ring-foreground/10` (shadcn card).
- Hanya 1 file CSS (`globals.css`): token `@theme inline` + blok `:root`/`.dark` identik; tanpa class komponen kustom.
- Komponen UI shadcn "radix-nova": button (default marigold, h-8), input h-8 radius-lg, card `ring-1 ring-foreground/10`, badge pill `rounded-4xl`.
- Admin UI Bahasa Indonesia; publik English.

---

*Dokumen ini arsip. Update desain terbaru berada di PRD.md §4.5 & DESIGN-pinterest.md.*
