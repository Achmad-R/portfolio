# Third Design — Recording UI/UX (Sebelum Redesign v4)

Dokumen ini mencatat desain front-end **yang sedang berjalan sebelum redesign "Figma" (DESIGN-figma.md)**, sebagai arsip pembanding dan sumber keputusan. Dibuat: 2026-08-13.

---

## 1. Meta

| Item | Nilai |
|---|---|
| Nama arah desain | "Pinterest — Discovery Chrome" |
| Mode | Light + dark via toggle (persist localStorage `theme` + preferensi sistem; default light) |
| Palet | Chrome cream hangat + satu merah jenuh `#E60023` (CTA) |
| Tipografi | 1 font aktif: Inter (400–700) menggantikan Pin Sans; tanpa serif & tanpa mono |
| Deploy terakhir | commit `3c4292f` → https://portofolio-nine-beryl-74.vercel.app |
| Alasan penggantian | Owner tidak suka hasil Pinterest; memilih sistem desain "Figma" (DESIGN-figma.md): monokrom hitam-putih, CTA pill, pastel color-block sections, mono eyebrow, tanpa masonry |

## 2. Design System

### 2.1 Palet (`src/app/globals.css`, :root = light, `.dark` = warm-dark)

| Token | Nilai light | Peran |
|---|---|---|
| `--primary` | `#e60023` | merah Pinterest — CTA, aksen satu-satunya yang jenuh |
| `--background` | `#ffffff` | canvas |
| `--surface-soft` | `#fbfbf9` | wash hero cream |
| `--surface-card` | `#f6f6f3` | pin card / tile cream |
| `--secondary-bg` | `#e5e5e0` | button secondary |
| `--ink` / `--body` | `#000000` / `#33332e` | teks |
| `--mute` | `#62625b` | teks meta |
| `--focus-outer` | `#435ee5` | ring fokus biru |
| `--success-pale/deep` | `#c7f0da` / `#103c25` | pill sukses contact |
| `--destructive` | `#9e0a0a` | error |
| Dark | bg `#1a1817`, card `#242120`, teks `#f5f5f3`, merah tetap `#e60023` | adaptasi hangat |

### 2.2 Radius & Tipografi

- Radius: sm 8px / md 16px (dominan) / lg–4xl 32px / pill; `--radius: 16px`
- Inter 400–700 semua peran; `::selection` merah-teks putih

## 3. Layout per Halaman

| Halaman | Pola saat third design |
|---|---|
| `/` | Hero wash cream 70px semibold + kartu "Now" surface-card; featured → **masonry pin grid** (columns 1/2/3, gap 8px, pin-card surface-card, overlay pill di gambar, aspek 4:5/1:1/3:4 siklus slug); latest posts surface-card + divider hairline; **CTA strip gelap `#262622`** |
| `/projects` | Grid masonry sama (ProjectCard) |
| `/projects/[slug]` | Eyebrow tanggal + Badge "Featured", h1 44px, cover rounded-md, tombol merah pill + outline |
| `/blog` | List surface-card + divider hairline |
| `/blog/[slug]` | Badge tag pill, cover rounded-md |
| `/contact` | Form kartu putih; **success = pill `#c7f0da`/`#103c25`**; error `#9e0a0a` + lastError |
| Admin | Sidebar putih token baru, heading "Dashboard/Blog/…" sans (tanpa `$`/mono), tabel surface-card, tombol merah |

## 4. Catatan

- Chrome (navbar/footer/UI kit) di-restyle penuh ke sistem Pinterest; konten markdown tetap prose light + link `ink-soft` tanpa underline.
- Arsitektur theme: `ThemeProvider` hand-rolled (`useSyncExternalStore`), script anti-flash di `<head>`, key localStorage `"theme"`.
- Admin **Bahasa Indonesia**; konten publik **English**.

*Dokumen ini arsip. Update desain terbaru berada di PRD.md §4.5 & DESIGN-figma.md.*
