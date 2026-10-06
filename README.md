# Tender Package Builder

<div align="center">

<img src="company_logo.png" alt="Meghna Tech Solutions Ltd. logo" width="80" />

**Participant:** Mohammad Adib Abtahi  
**Registration number:** 242-15-676  
**Live website:** https://adib18804.github.io/devfest-242-15-676/

</div>

---

## Overview

**Tender Package Builder (TPB)** is a browser-only tool that helps office staff turn a set of PDF files into one complete, validated, ordered PDF package ready for tender submission.

Built for **Meghna Tech Solutions Ltd.**, the app is identified by the **TPB** logo — a blue-to-cyan gradient rounded square with "TPB" in white bold text — shown consistently in the app header and on every generated PDF cover page.

---

## Features

| Feature | Status |
|---|---|
| Load tender details + requirements from `requirements.json` | ✅ |
| Drag-and-drop or click-to-upload multiple PDFs | ✅ |
| Display filename + page count per uploaded file | ✅ |
| 1-to-1 document ↔ file matching, changeable anytime | ✅ |
| Expiry date entry for documents with `has_expiry: true` | ✅ |
| Real-time per-document status (OK / Missing / Expired / Expiry Needed / Not Provided) | ✅ |
| SHA-256 duplicate file detection | ✅ |
| Generate button disabled while blocking issues exist | ✅ |
| Generate combined PDF: cover page + index + documents + footer | ✅ |
| Cover page with **TPB logo**, tender ID, title, entity, bidder, deadline, date | ✅ |
| Footer on every page: `<tender_id> | Page X of Y` | ✅ |
| Download as `<tender_id>_Package.pdf` | ✅ |
| Index page (Bonus 1) | ✅ |
| Export checklist CSV with UTF-8 BOM (Bonus 3) | ✅ |
| Auto-save / Export Project / Import Project (Bonus 4) | ✅ |
| Fuzzy auto-match by filename (Bonus 6) | ✅ |
| Corrupt / password-protected PDF error handling (Bonus 7) | ✅ |
| Bilingual UI: English ↔ বাংলা | ✅ |
| Dark / Light theme toggle | ✅ |
| Fully responsive (desktop 2-column, mobile single-column) | ✅ |
| Accessible: keyboard navigation, ARIA labels, focus rings | ✅ |

---

## Logo

The **TPB** logo appears in two places:

1. **App header** (top-left) — a 40×40 px rounded square with a `linear-gradient(135deg, #3b82f6, #06b6d4)` background and "TPB" in white bold text, next to the app title.
2. **PDF cover page** — an 80×80 pt blue rounded rectangle drawn with `pdf-lib`, with "TPB" centered inside and "Meghna Tech Solutions Ltd." below. This makes every generated package look official.

No external image file is required. The logo is rendered in pure CSS (header) and pdf-lib vector drawing (PDF).

---

## Tech Stack

| Layer | Choice |
|---|---|
| Language | Vanilla HTML + CSS + JavaScript (ES2022) |
| PDF generation | [pdf-lib 1.17.1](https://pdf-lib.js.org/) via jsDelivr CDN |
| PDF reading (page count) | [pdfjs-dist 3.11.174](https://mozilla.github.io/pdf.js/) via jsDelivr CDN |
| Fonts | Inter + Hind Siliguri via Google Fonts |
| Persistence | `localStorage` key `tender-builder-v1` |
| Build | None — single `index.html`, open directly in Chrome |

---

## Run Locally

1. Clone or download this repository.
2. Open `index.html` in the latest **Google Chrome**.
3. No server, no account, no install step.

> PDF processing (page count + generation) requires an internet connection to load libraries from jsDelivr on first use. After that, fonts and scripts are cached by the browser.

---

## Usage

1. **Load `requirements.json`** — drag it onto the card or click *Browse*. The sample file is in `sample/requirements.json`.
2. **Upload PDF files** — drag multiple PDFs onto the upload dropzone.
3. **Match files** — use the dropdown on each requirement row to assign a PDF.
4. **Enter expiry dates** — for documents marked `has_expiry: true`, pick a date.
5. **Resolve blocking issues** — the sidebar lists anything that prevents generation.
6. **Generate** — click *Generate Package* to build the combined PDF.
7. **Download** — click *Download PDF* to save `<tender_id>_Package.pdf`.

---

## Contest Deliverables

- `output/T-2026-0417_Package.pdf` — generated from the provided sample pack.
- `screenshots/status-checklist.png` — checklist with sample statuses.
- The GitHub Actions workflow publishes the static app to GitHub Pages on every push to `main`.

---

## Known Limitations

- PDF libraries are loaded from jsDelivr; page-count reading and package generation require an internet connection on first load (subsequently cached).
- Expiry dates are entered manually; the app does not extract dates from document text or OCR.
- Password-protected or structurally damaged PDFs show an error toast and must be replaced with a valid copy.
- Bangla text in the generated PDF is approximated (pdf-lib Standard Fonts do not include Bengali glyphs); English titles are used as the primary label with Bangla shown where supported.

---

## AI Use

**AI tool:** Kiro (Anthropic Claude-based IDE assistant)  
**Most useful prompt:**  
> "Build a browser-only, bilingual tender-package builder. Single index.html, vanilla JS + CSS + pdf-lib + pdfjs. Load requirements.json, match uploaded PDFs, detect duplicates by SHA-256, validate expiry dates against the submission deadline, auto-save to localStorage, and generate an ordered combined PDF with a branded cover page and page-number footer."

---

## License

MIT. See [LICENSE](LICENSE).
