# TenderKit

**Participant:** Mohammad Adib Abtahi  
**Registration number:** 242-15-676  
**Live website:** https://adib18804.github.io/devfest-242-15-676/

TenderKit helps office staff match tender requirements to local PDF files, check expiry dates and duplicates, and create a correctly ordered submission package.

## Run locally

Open `index.html` in the latest Google Chrome. No server or account is needed. The app uses pdf-lib from jsDelivr to read and combine PDFs, so PDF processing needs an internet connection. All tender files are processed in the browser and are not uploaded to this app or a participant-controlled backend.

## Features

- Load tender details and ordered requirements from `requirements.json`.
- Upload up to 30 PDFs and 50 MB total, inspect page counts, remove files, and match each file to at most one requirement.
- Detect exact duplicate content with SHA-256 and prevent duplicate copies from satisfying different requirements.
- Check missing required files and expiry dates against the submission deadline; optional unmatched documents do not block generation.
- Switch the interface between Bangla and English.
- Generate a combined PDF with an English cover, included-document list, original page order, and page-number footer.
- Suggest matches based on filenames.

## Contest deliverables

- `output/T-2026-0417_Package.pdf` is generated from the provided sample pack.
- `screenshots/status-checklist.png` shows the checklist with sample statuses.
- The deployment workflow publishes the static app to GitHub Pages after pushes to `main`.

## Known limitations

- The package-generation library is loaded from jsDelivr; PDF functions need internet access.
- Expiry dates must be entered by the user; the app does not extract dates from document text or OCR.
- Password-protected, damaged, or unsupported PDFs show an error and must be replaced.

## AI use

AI tool: OpenAI Codex.  
Most useful prompt: “Build a browser-only, bilingual tender-package builder from requirements.json. Match uploaded PDFs to requirements, detect exact duplicate files, validate expiry dates against the submission deadline, and generate an ordered combined PDF with an English cover page and page-number footer.”

## License

MIT. See [LICENSE](LICENSE).
