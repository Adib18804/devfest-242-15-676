# Tender Package Builder

**Name:** Mohammad Adib Abtahi  
**Registration:** 242-15-676  
**Live site:** [https://adib18804.github.io/devfest-242-15-676/](https://adib18804.github.io/devfest-242-15-676/)  
**Repository:** [https://github.com/Adib18804/devfest-242-15-676](https://github.com/Adib18804/devfest-242-15-676)  

[https://screenshots/ss1.png](screenshots/ss1.png)  
[https://screenshots/ss2.png](screenshots/ss2.png)  

---

## What it is
Tender Package Builder (TPB) is a professional, browser-only web application designed for office staff to validate, organize, match, and compile fragmented PDF documents into one single, compliant, sequentially ordered tender submission package. It features real-time validation across 5 document statuses, SHA-256 duplicate detection, expiry date verification against submission deadlines, automated bilingual support (English & বাংলা), and generates an official PDF complete with an authentic cover page, table of contents index, seal overlay, and dynamic per-page footer numbering.

---

## Live demo
Access the production application directly in any modern browser:  
[https://adib18804.github.io/devfest-242-15-676/](https://adib18804.github.io/devfest-242-15-676/)

---

## Running locally

```bash
git clone https://github.com/Adib18804/devfest-242-15-676.git
cd devfest-242-15-676
# Just open index.html in Chrome — no build step needed
```

---

## How to use

| Action | User Interaction | Expected Result |
|---|---|---|
| **Load Tender Requirements** | Drag & drop or browse `requirements.json` onto the top card | Validates JSON schema; populates tender details (Tender ID, deadline, title, procuring entity, bidder) and orders checklist items |
| **Upload Source PDFs** | Drag & drop or browse multiple PDF files into upload zone | Files are validated, page counts extracted via PDF.js, and SHA-256 hashes generated |
| **Duplicate Detection** | Upload duplicate or renamed files with matching content | Files with identical content hash are marked with a `Duplicate` badge and blocked from matching different requirements |
| **Match Documents** | Select an uploaded PDF from each requirement's dropdown | Enforces strict 1-to-1 matching; matched files are displayed with interactive tags and can be changed/undone anytime |
| **Input Expiry Dates** | Pick dates for requirements marked `has_expiry: true` | Validates date against deadline; same-day or future dates pass (`OK`), past dates trigger `Expired` blocking error |
| **Auto-match Files** | Click `🔗 Auto-match Files` button in sidebar | Performs fuzzy token scoring between file names and English/Bengali titles, offering a confirmation dialog |
| **Apply Digital Seal** | Upload PNG seal and select specific pages in the checklist | Digitally overlays the seal image at the bottom-right of chosen pages |
| **Generate Combined PDF** | Click `⚡ Generate Package` once all blocking issues resolve | Generates an official PDF with Page 1 Cover (with 80x80pt company logo), Page 2 Index, merged documents, and per-page footer |
| **Download Output** | Click `⬇ Download PDF` | Downloads compiled package named `<tender_id>_Package.pdf` |

---

## Implemented features

### Main tasks (from problem statement)
- ☑ **4.1 Load requirements.json** — File picker + drag-and-drop with strict schema validation and clear descriptive errors.
- ☑ **4.2 Tender details & ordered document list** — Displays all tender metadata and checklist sorted strictly by `order`.
- ☑ **4.3 Multiple PDF upload & management** — Filename + page count display, individual file removal, and non-PDF rejection.
- ☑ **4.4 1-to-1 document matching** — Flexible 1-to-1 matching with instant change and undo capabilities.
- ☑ **4.5 Dynamic expiry date inputs** — Conditionally displayed only when `has_expiry: true` and a file is matched.
- ☑ **4.6 Real-time 5-state document status engine:**
  - *Missing* (mandatory, no file) → Blocks generation
  - *Expiry date needed* (has_expiry, file, no date) → Blocks generation
  - *Expired* (expiry < deadline) → Blocks generation
  - *Not provided* (optional, no file) → Does not block
  - *OK* (file + valid expiry, expiry == deadline is OK) → Passes
- ☑ **4.7 SHA-256 duplicate content detection** — Computes cryptographic hashes via Web Crypto API, flags duplicates, and prevents cross-matching.
- ☑ **4.8 Reactive generation blocker** — Generate button disabled while blocking problems exist, displaying an itemized issue tracker.
- ☑ **4.9 Complete combined PDF generation:**
  - Page 1: Official English cover page with `company_logo.png`, tender ID, title, procuring entity, bidder, submission deadline, generation date, and included documents list.
  - Page 2: Structured Index table of contents with accurate starting page numbers.
  - Document sequence: Embedded in exact requirement order (missing optional docs skipped).
  - Every page: Standardized centered footer `<tender_id> | Page X of Y` in 10pt gray without obscuring content.
- ☑ **4.10 Direct file download** — Generates and downloads `<tender_id>_Package.pdf`.
- ☑ **4.11 Bilingual UI toggle** — Instant toggle between English and বাংলা across all UI headers, labels, buttons, and document titles.
- ☑ **4.12 Persistent dark / light theme** — Elegant theme toggle persisted in `localStorage`.
- ☑ **4.13 Complete session persistence** — Automatically synchronizes state to `localStorage` under `tender-builder-v1`.

### Bonus tasks (from problem statement)
- ☑ **Bonus 1: Dynamic Index / TOC Page** — Automated table (# | Document Title | Start Page | Pages) inserted right after the cover.
- ☑ **Bonus 2: Digital Seal & Signature Overlay** — Upload seal PNG/JPG with multi-select checkboxes for overlay at bottom-right of selected pages.
- ☑ **Bonus 3: CSV Checklist Export** — Exports checklist with UTF-8 BOM (`\uFEFF`) to preserve flawless Bangla script rendering in Microsoft Excel.
- ☑ **Bonus 4: Project Save & Reopen** — Instant auto-saving plus full Export/Import Project as formatted JSON.
- ☑ **Bonus 5: Bangla Text in PDF Cover** — Gracefully attempts dual-language rendering with automatic standard font fallback.
- ☑ **Bonus 6: Fuzzy Token Auto-match** — Intelligent token matching comparing filename keywords against requirement titles with confirmation prompt.
- ☑ **Bonus 7: Resilient File Parsing** — Corrupt, encrypted, or password-protected PDFs trigger friendly warnings while safely keeping the file with a `?` page placeholder.
- ☑ **Bonus 8: AI Tender Assistant** — Interactive AI modal offering automated compliance readiness auditing and custom API key support.

### Extra features
- ☑ **Dark / Light theme persistence** — Smooth transition between curated dark (`#0a0e1a`) and light (`#f8fafc`) palettes.
- ☑ **Keyboard shortcuts** — `Esc` dismisses modals and notifications; `Alt+R` / `Ctrl+R` triggers project reset with confirmation.
- ☑ **Micro-animated toast system** — Accessible notifications with success, error, warning, and info visual feedback.
- ☑ **Fully responsive enterprise layout** — 2-column desktop view, collapsible sticky sidebar, and single-column mobile view.
- ☑ **Session restore notifications** — Informs users on reload and guides them to re-verify or re-upload files.

---

## Screenshots

| Header + Main UI | Document Statuses |
|---|---|
| [https://screenshots/ss1.png](screenshots/ss1.png) | [https://screenshots/ss2.png](screenshots/ss2.png) |

| Bangla UI | Generated PDF |
|---|---|
| [https://screenshots/ss3.png](screenshots/ss3.png) | [https://screenshots/ss4.png](screenshots/ss4.png) |

---

## Sample checks (from problem statement)

| Scenario | Action | Expected | Result |
|---|---|---|:---:|
| **All documents valid** | Match all files + valid expiries | Package generates cleanly | ✅ |
| **Expired trade license** | Match trade_license_2025.pdf | Status: Expired (Blocks generation) | ✅ |
| **Duplicate files** | Upload experience_cert.pdf + experience_cert (1).pdf | Marked duplicate, prevented cross-match | ✅ |
| **Missing mandatory** | Skip R01 (Trade License) | Generate disabled; listed in blocking issues | ✅ |
| **Optional missing** | Skip R06 (Audited Financial Statement), R07 | Generate remains enabled | ✅ |

---

## Tech

- **Vanilla HTML5 + CSS3 + Modern JavaScript (ES2022)** — 100% frontend, zero build steps, zero external frameworks.
- **pdf-lib (v1.17.1)** — In-browser PDF generation, vector rendering, image embedding, page merging, and footer stamping.
- **pdfjs-dist (v3.11.174)** — Client-side PDF parsing and page count extraction.
- **Web Crypto API** — Cryptographic SHA-256 content hashing for duplicate identification.
- **localStorage API** — Client-side state persistence across reloads (`tender-builder-v1`).
- **GitHub Pages** — Static deployment directly from GitHub repository.
- **Zero backend, zero external database, zero secrets.**

---

## Known problems

- **Bangla text in PDF cover:** Standard PDF fonts (WinAnsi encoding) do not natively embed Bengali Unicode glyphs; the app gracefully falls back to clear English titles with dual display in the browser UI.
- **Very large PDFs (> 10 MB each):** Client-side buffer extraction and merging in browser memory may take 2-4 seconds to process.
- **Seal placement:** Uses an enterprise-standard fixed bottom-right position (offset 32pt from bottom, 105pt from right margin).

---

## AI tools and best prompt

**AI tool used:** Google Antigravity + Claude (Anthropic)  
**Most useful prompt:**  
> "Build a production-quality Tender Package Builder web app. Frontend-only, vanilla HTML/CSS/JS in 3 files. Load requirements.json, upload PDFs with SHA-256 duplicate detection, match 1-to-1, track expiry dates with 5 real-time statuses, generate a combined PDF with cover page + index + per-page footer '<tender_id> | Page X of Y'. Include Bangla + English toggle, dark/light theme, CSV export, project save/restore, auto-match by filename, and safe handling of corrupt PDFs. Use company_logo.png in header, sidebar, and PDF cover."

---

## License

MIT — see [LICENSE](./LICENSE).
