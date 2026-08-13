# First Design — Recording UI/UX (Sebelum Redesign v2)

Dokumen ini mencatat desain front-end **yang sedang berjalan sebelum redesign "Midnight Marigold"**, sebagai arsip pembanding dan sumber keputusan. Dibuat: 2026-08-13.

---

## 1. Meta

| Item | Nilai |
|---|---|
| Nama arah desain | "Terminal Alive — Steel & Tungsten" |
| Mode | Dark-only (html class `dark`; `:root` dan `.dark` bernilai identik) |
| Palet | Baja kelam + tungsten hangat + kobalt dingin |
| Tipografi | 2 font aktif: JetBrains Mono (display + data), Geist Sans (body); Geist_Mono dihapus |
| Deploy terakhir | commit `fc346e4` → https://portofolio-nine-beryl-74.vercel.app |
| Alasan penggantian | Feedback owner (8/2026): tema terminal dianggap gimmick/hacky, palet kusam/dingin, monospace berlebihan, layout baris-baris sempit kurang presensial |

## 2. Design System

### 2.1 Palet (`src/app/globals.css`, `:root` = `.dark`)

| Token | Nilai | Peran |
|---|---|---|
| `--background` | `#151a20` | baja kelam |
| `--foreground` | `#d9dee6` | perak |
| `--card` / `--popover` | `#1b2129` | surface |
| `--secondary` / `--muted` | `#1e252e` | surface redup |
| `--accent` | `#1f2630` | hover surface |
| `--muted-foreground` | `#7c8591` | teks meta |
| `--primary` | `#e4a64e` | tungsten — aksi, prompt, cursor |
| `--primary-foreground` | `#1c1308` | teks di atas primary |
| `--link` | `#5c86c0` | kobalt — link, tag |
| `--live` | `#86a873` | sage — status available |
| `--destructive` | `#c0553b` | karat — error |
| `--border` | `rgb(217 222 230 / 12%)` | hairline |
| `--ring` | `rgb(228 166 78 / 60%)` | focus ring |
| `--radius` | `0.5rem` | sudut membulat |

### 2.2 Tipografi

- Display & seluruh heading: **JetBrains Mono** (`--font-heading`), bold, `font-mono text-[10px]` untuk label.
- Body: **Geist Sans** (`--font-sans`).
- Data kecil (tanggal, tag, command, meta): **JetBrains Mono**.
- Skala: H1 3xl–5xl `tracking-tight`, section title xl–2xl, body 14–16px.

### 2.3 Motion

- Typing command: 45ms per karakter, sekali saat load (komponen `TypingCommand`).
- Cursor blok `█` berkedip: `@keyframes terminal-blink` 1.1s `step-end` infinite (class `.cursor-blink`).
- Keduanya nonaktif saat `prefers-reduced-motion: reduce`.

## 3. Bahasa terminal per halaman (pola desain yang dibuang)

| Halaman | Pola saat first design |
|---|---|
| **Home** | `TypingCommand` `whoami` + cursor blink; CTA "Browse projects"/"Contact"; section `ls feature/` (rows: `✦`/`–`, tanggal `YYYY-MM-DD`, stack, judul); `tail -n 3 ~/blog` (`[date] judul #tag`); tanpa status card di halaman |
| **/projects** | `ls -la ~/projects`; tabel kolom: perm `drwx`/`r--r` + tanggal + stack + nama; header kolom uppercase mono |
| **/blog** | `ls ~/blog`; rows `[YYYY-MM-DD] judul #tag` |
| **/blog/tag** | `grep -r "<tag>" ~/blog` |
| **/about** | Gaya `man`: `NAME(1)` — `STACK(2)` — `HISTORY(3)`; tahun mono |
| **/contact** | `ssh contact@achmad-ridho`; form "Send message" |
| **/projects/[slug]** | `cat ~/projects/<slug>`; meta `~/projects/<slug>` |
| **/blog/[slug]** | `cat ~/blog/<slug>.md` |
| **Navbar** | Brand `~/achmad-ridho`; marker `›` halaman aktif; pill "Contact" |
| **Footer** | `TerminalStatus`: `● available · cwd ~/achmad-ridho · local HH:MM:SS` (jam berjalan client) |

## 4. Struktur & signature

- Container publik: `max-w-4xl`, `px-4 py-16`, gap 8–16.
- Konten berbentuk **tabel/baris**: `flex flex-col divide-y rounded-lg border bg-card`, row `flex-wrap px-4 py-3`, hover `bg-accent`.
- Signature: **prompt hidup + cursor blok berkedip** (satu-satunya elemen yang "diingat") — kini dibuang permanen.
- Komponen yang merealisasikan bahasa ini (semua akan dihapus pada v2): `typing-command.tsx`, `prompt-line.tsx`, `terminal-status.tsx`.
- Komponen yang sudah dihapus pada v1.5 (diganti baris): `project-card.tsx`, `post-card.tsx`.

## 5. Copy & PRD

- Copy publik **English** beraksen command (whoami, ls, cat, man, grep, ssh).
- UI admin **Bahasa Indonesia** (tidak tersentuh oleh redesign).
- PRD §4.5 asli menetapkan dark + hijau `#00FF9C` + JetBrains Mono heading + Geist body; implementasi **menyimpang** menjadi Steel & Tungsten (keputusan 8/2026), yang kemudian juga ditolak owner → memicu redesign v2 "Midnight Marigold".

---

*Dokumen ini arsip. Update desain terbaru berada di PRD.md §4.5.*
