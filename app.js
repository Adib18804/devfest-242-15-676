/* ═══════════════════════════════════════════════════════════
   TENDER PACKAGE BUILDER — app.js
   Complete production implementation — vanilla JS, no framework
═══════════════════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────── */
const LS_KEY    = 'tender-builder-v1';
const MAX_FILES = 30;
const MAX_BYTES = 50 * 1024 * 1024; // 50 MB

/* ─────────────────────────────────────────────────────────
   i18n
───────────────────────────────────────────────────────── */
const I18N = {
  en: {
    appName:'Tender Package Builder', appSub:'Meghna Tech Solutions Ltd.',
    langBtn:'বাংলা',
    tenderTitle:'Tender Details', tenderSub:'Loaded from requirements.json',
    notLoaded:'Not Loaded',
    emptyJsonTitle:'Load a requirements.json to begin',
    emptyJsonSub:'Drag & drop the file or click Browse below',
    dropJsonLabel:'Drop requirements.json here', dropJsonSub:'or click to browse — JSON only',
    fTenderId:'Tender ID', fDeadline:'Submission Deadline',
    fTitle:'Title', fEntity:'Procuring Entity', fBidder:'Bidder',
    checkTitle:'Document Checklist', checkSub:'Match PDFs to each requirement',
    checkEmpty:'No requirements loaded', checkEmptySub:'Load requirements.json first',
    uploadTitle:'Upload PDF Files', uploadSub:'Up to 30 files · 50 MB total',
    noFiles:'No files',
    pdfDropLabel:'Drop PDF files here', pdfDropSub:'or click to browse · multiple files allowed',
    filesTitle:'Uploaded Files', filesSub:'Review and match each file',
    filesEmpty:'No files uploaded yet', filesEmptySub:'Use the dropzone above to add PDFs',
    totalPages:'total pages',
    statusTitle:'Status Summary',
    statReady:'Ready', statMissing:'Missing', statExpiry:'Expiry Issues', statOptional:'Optional',
    progressLabel:'Completion',
    blockTitle:'Blocking Issues', blockSub:'Resolve before generating',
    btnGenerate:'⚡  Generate Package', btnDownload:'⬇  Download PDF',
    btnAutoMatch:'🔗  Auto-match Files', btnCsv:'📊  Export Checklist CSV',
    btnExport:'💾  Export Project', btnImport:'📂  Import Project',
    btnReset:'🗑  Reset Everything',
    btnRemove:'Remove', matchPlaceholder:'Match a file…', expiryLabel:'Expiry date',
    sOk:'OK', sMissing:'Missing', sExpiryNeeded:'Expiry Needed',
    sExpired:'Expired', sNotProvided:'Not Provided',
    mandatory:'Mandatory', optional:'Optional',
    pages:'pages', page:'page', dupe:'Duplicate', unmatched:'Unmatched',
    generating:'Generating…',
    sealTitle:'Seal / Signature (optional)',
    sealDrop:'Upload seal PNG/JPG', sealDropSub:'overlaid bottom-right on selected pages',
    sealPages:'Apply to pages:',
    tJsonOk:'requirements.json loaded', tJsonErr:'Invalid JSON file',
    tPdfAdded:'PDF files added', tPdfErr:'Could not read PDF',
    tDupe:'Duplicate file skipped',
    tGenStart:'Generating PDF package…', tGenOk:'Package ready!', tGenErr:'PDF generation failed',
    tReset:'All data cleared', tCsvOk:'CSV exported',
    tAutoOk:'Auto-match applied', tAutoNone:'No matches found',
    tImportOk:'Project imported', tImportErr:'Import failed',
    disabledTip:'Fix all blocking issues first',
    copy:'© 2026 · All rights reserved',
  },
  bn: {
    appName:'টেন্ডার প্যাকেজ বিল্ডার', appSub:'মেঘনা টেক সলিউশন্স লিমিটেড',
    langBtn:'English',
    tenderTitle:'টেন্ডার বিবরণ', tenderSub:'requirements.json থেকে লোড',
    notLoaded:'লোড হয়নি',
    emptyJsonTitle:'শুরু করতে requirements.json লোড করুন',
    emptyJsonSub:'ফাইল ড্রপ করুন অথবা নিচে ক্লিক করুন',
    dropJsonLabel:'এখানে requirements.json ড্রপ করুন', dropJsonSub:'অথবা ক্লিক করুন — শুধু JSON',
    fTenderId:'টেন্ডার আইডি', fDeadline:'জমার শেষ তারিখ',
    fTitle:'শিরোনাম', fEntity:'ক্রয়কারী সংস্থা', fBidder:'দরদাতা',
    checkTitle:'দলিল তালিকা', checkSub:'প্রতিটিতে PDF মেলান',
    checkEmpty:'কোনো প্রয়োজনীয়তা লোড হয়নি', checkEmptySub:'প্রথমে requirements.json লোড করুন',
    uploadTitle:'PDF আপলোড', uploadSub:'সর্বোচ্চ ৩০টি · মোট ৫০ এমবি',
    noFiles:'কোনো ফাইল নেই',
    pdfDropLabel:'এখানে PDF ড্রপ করুন', pdfDropSub:'অথবা ক্লিক করুন · একাধিক ফাইল',
    filesTitle:'আপলোড করা ফাইল', filesSub:'প্রতিটি ফাইল পর্যালোচনা করুন',
    filesEmpty:'কোনো ফাইল নেই', filesEmptySub:'উপরের ড্রপজোন ব্যবহার করুন',
    totalPages:'পৃষ্ঠা মোট',
    statusTitle:'স্ট্যাটাস সারসংক্ষেপ',
    statReady:'প্রস্তুত', statMissing:'অনুপস্থিত', statExpiry:'মেয়াদ সমস্যা', statOptional:'ঐচ্ছিক',
    progressLabel:'অগ্রগতি',
    blockTitle:'বাধাদানকারী সমস্যা', blockSub:'তৈরির আগে সমাধান করুন',
    btnGenerate:'⚡  প্যাকেজ তৈরি করুন', btnDownload:'⬇  PDF ডাউনলোড',
    btnAutoMatch:'🔗  স্বয়ংক্রিয় মিলান', btnCsv:'📊  CSV রপ্তানি',
    btnExport:'💾  প্রজেক্ট রপ্তানি', btnImport:'📂  প্রজেক্ট আমদানি',
    btnReset:'🗑  সব মুছুন',
    btnRemove:'সরান', matchPlaceholder:'ফাইল মেলান…', expiryLabel:'মেয়াদ শেষ তারিখ',
    sOk:'ঠিক আছে', sMissing:'অনুপস্থিত', sExpiryNeeded:'মেয়াদ প্রয়োজন',
    sExpired:'মেয়াদ শেষ', sNotProvided:'প্রদান করা হয়নি',
    mandatory:'বাধ্যতামূলক', optional:'ঐচ্ছিক',
    pages:'পৃষ্ঠা', page:'পৃষ্ঠা', dupe:'ডুপ্লিকেট', unmatched:'মেলানো হয়নি',
    generating:'তৈরি হচ্ছে…',
    sealTitle:'সীল / স্বাক্ষর (ঐচ্ছিক)',
    sealDrop:'সীল PNG/JPG আপলোড', sealDropSub:'নির্বাচিত পৃষ্ঠায় নিচে-ডানে',
    sealPages:'পৃষ্ঠাসমূহে প্রয়োগ:',
    tJsonOk:'requirements.json লোড হয়েছে', tJsonErr:'অবৈধ JSON ফাইল',
    tPdfAdded:'PDF যোগ হয়েছে', tPdfErr:'PDF পড়া সম্ভব হয়নি',
    tDupe:'ডুপ্লিকেট ফাইল বাদ',
    tGenStart:'PDF তৈরি হচ্ছে…', tGenOk:'প্যাকেজ প্রস্তুত!', tGenErr:'PDF তৈরি ব্যর্থ',
    tReset:'সব মুছে গেছে', tCsvOk:'CSV রপ্তানি হয়েছে',
    tAutoOk:'স্বয়ংক্রিয় মিলান সম্পন্ন', tAutoNone:'কোনো মিল পাওয়া যায়নি',
    tImportOk:'প্রজেক্ট আমদানি হয়েছে', tImportErr:'আমদানি ব্যর্থ',
    disabledTip:'প্রথমে সব বাধাদানকারী সমস্যা সমাধান করুন',
    copy:'© ২০২৬ · সর্বস্বত্ব সংরক্ষিত',
  }
};

let LANG  = 'en';
let THEME = 'dark';
const t = k => I18N[LANG]?.[k] ?? I18N.en[k] ?? k;

/* ─────────────────────────────────────────────────────────
   STATE
───────────────────────────────────────────────────────── */
const STATE = {
  tender:       null,
  requirements: [],
  files:        [],   // { id, name, size, pages, hash, arrayBuffer, isDupe }
  matches:      {},   // reqId → fileId
  expiries:     {},   // reqId → 'YYYY-MM-DD'
  seal:         null, // { dataUrl, pages: number[] }
};

/* ─────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────── */
const q  = sel => document.querySelector(sel);
const qq = sel => [...document.querySelectorAll(sel)];

const esc = s => String(s)
  .replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const fmtBytes = b => b < 1024 ? b+' B'
  : b < 1048576 ? (b/1024).toFixed(1)+' KB'
  : (b/1048576).toFixed(1)+' MB';

const readLS  = () => { try { return JSON.parse(localStorage.getItem(LS_KEY)||'{}'); } catch { return {}; } };
const writeLS = v => { try { localStorage.setItem(LS_KEY, JSON.stringify(v)); } catch {} };

function dl(url, name) {
  const a = Object.assign(document.createElement('a'), { href:url, download:name });
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}

/* ─────────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────────── */
function toast(type, title, msg = '', dur = 4000) {
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const wrap = q('#toast-wrap');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.setAttribute('role','alert');
  el.innerHTML = `
    <span class="toast-icon">${icons[type]||'ℹ️'}</span>
    <div class="toast-body">
      <div class="toast-title">${esc(title)}</div>
      ${msg ? `<div class="toast-message">${esc(msg)}</div>` : ''}
    </div>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    el.addEventListener('animationend', () => el.remove(), { once:true });
  }, dur);
}

/* ─────────────────────────────────────────────────────────
   SHA-256
───────────────────────────────────────────────────────── */
async function sha256(buf) {
  const h = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2,'0')).join('');
}

/* ─────────────────────────────────────────────────────────
   DROPZONE HELPER
───────────────────────────────────────────────────────── */
function setupDz(zone, input, handler) {
  zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', e => { if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over'); });
  zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag-over'); handler(e.dataTransfer.files); });
  input.addEventListener('change', () => { if (input.files.length) handler(input.files); input.value = ''; });
  zone.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') { e.preventDefault(); input.click(); } });
}

/* ─────────────────────────────────────────────────────────
   THEME & LANGUAGE
───────────────────────────────────────────────────────── */
function applyTheme(th) {
  THEME = th;
  document.documentElement.setAttribute('data-theme', th);
  const icon = q('#theme-icon');
  if (icon) icon.textContent = th === 'dark' ? '☀️' : '🌙';
  persistPrefs();
}

function applyLanguage(lang) {
  LANG = lang;
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  const lbl = q('#lang-label');
  if (lbl) lbl.textContent = t('langBtn');
  qq('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  renderDocList();
  renderFileList();
  updateStatus();
  persistPrefs();
}

function persistPrefs() {
  const s = readLS(); s.theme = THEME; s.lang = LANG; writeLS(s);
}

function autoSave() {
  writeLS({
    theme: THEME, lang: LANG,
    tender:       STATE.tender,
    requirements: STATE.requirements,
    filesMeta:    STATE.files.map(({ id,name,size,pages,hash,isDupe }) => ({ id,name,size,pages,hash,isDupe })),
    matches:      STATE.matches,
    expiries:     STATE.expiries,
    sealPages:    STATE.seal?.pages ?? [],
    v: 2,
  });
}

/* ─────────────────────────────────────────────────────────
   LOAD requirements.json
───────────────────────────────────────────────────────── */
function loadRequirements(json) {
  if (!json?.tender || !Array.isArray(json.requirements))
    throw new Error('Missing tender or requirements array');
  const td = json.tender;
  if (!td.tender_id) throw new Error('Missing tender_id');

  STATE.tender = {
    tender_id:          String(td.tender_id).trim(),
    title:              String(td.title || '').trim(),
    procuring_entity:   String(td.procuring_entity || '').trim(),
    bidder:             String(td.bidder || '').trim(),
    submission_deadline:String(td.submission_deadline || '').trim(),
  };
  STATE.requirements = [...json.requirements].sort((a,b) => (a.order||0)-(b.order||0));

  renderTenderDetails();
  renderDocList();
  updateStatus();
  autoSave();
  toast('success', t('tJsonOk'),
    `${STATE.requirements.length} requirements · deadline ${STATE.tender.submission_deadline}`);
}

function renderTenderDetails() {
  if (!STATE.tender) return;
  q('#tender-empty').classList.add('hidden');
  q('#tender-grid').classList.remove('hidden');
  q('#f-tender-id').textContent = STATE.tender.tender_id;
  q('#f-deadline').textContent  = STATE.tender.submission_deadline;
  q('#f-title').textContent     = STATE.tender.title;
  q('#f-entity').textContent    = STATE.tender.procuring_entity;
  q('#f-bidder').textContent    = STATE.tender.bidder;
  const b = q('#tender-badge');
  b.textContent = STATE.tender.tender_id;
  b.className = 'badge badge-accent no-dot';
}

async function handleJsonFiles(files) {
  const f = [...files].find(f => f.name.endsWith('.json'));
  if (!f) { toast('error', t('tJsonErr'), 'Must be a .json file'); return; }
  try { loadRequirements(JSON.parse(await f.text())); }
  catch (e) { toast('error', t('tJsonErr'), e.message); }
}

/* ─────────────────────────────────────────────────────────
   UPLOAD PDFs
───────────────────────────────────────────────────────── */
async function handlePdfFiles(files) {
  const pdfs = [...files].filter(f => f.name.toLowerCase().endsWith('.pdf'));
  if (!pdfs.length) { toast('warning', 'No PDF files', 'Only .pdf accepted'); return; }

  const curSz = STATE.files.reduce((s,f) => s+f.size, 0);
  const newSz = pdfs.reduce((s,f) => s+f.size, 0);
  if (STATE.files.length + pdfs.length > MAX_FILES)
    return toast('warning', `Max ${MAX_FILES} files`);
  if (curSz + newSz > MAX_BYTES)
    return toast('warning', 'Total > 50 MB');

  let added = 0, dupes = 0;
  for (const file of pdfs) {
    try {
      const ab   = await file.arrayBuffer();
      const hash = await sha256(ab);

      if (STATE.files.some(f => f.hash === hash)) {
        const existing = STATE.files.find(f => f.hash === hash);
        if (existing) existing.isDupe = true;
        dupes++; continue;
      }

      // page count — safe fallback
      let pages = '?';
      try {
        const pdf = await pdfjsLib.getDocument({ data: ab.slice(0) }).promise;
        pages = pdf.numPages;
      } catch { /* corrupt / password-protected — keep '?' */ }

      STATE.files.push({
        id: crypto.randomUUID(), name: file.name,
        size: file.size, pages, hash, arrayBuffer: ab, isDupe: false
      });
      added++;
    } catch { toast('error', t('tPdfErr'), file.name); }
  }

  if (dupes > 0) toast('warning', t('tDupe'), `${dupes} duplicate(s) skipped`);
  if (added > 0) toast('success', t('tPdfAdded'), `${added} file(s) added`);

  recomputeDupes();
  renderFileList();
  renderDocList();
  updateStatus();
  updateSealPages();
  autoSave();
}

function recomputeDupes() {
  const seen = {};
  STATE.files.forEach(f => {
    if (seen[f.hash]) { f.isDupe = true; seen[f.hash].isDupe = true; }
    else              { seen[f.hash] = f; f.isDupe = false; }
  });
}

function removeFile(id) {
  Object.keys(STATE.matches).forEach(rid => {
    if (STATE.matches[rid] === id) delete STATE.matches[rid];
  });
  STATE.files = STATE.files.filter(f => f.id !== id);
  recomputeDupes();
  renderFileList();
  renderDocList();
  updateStatus();
  updateSealPages();
  autoSave();
}

function renderFileList() {
  const files  = STATE.files;
  const badge  = q('#upload-badge');
  const fBadge = q('#files-badge');
  const empty  = q('#files-empty');
  const list   = q('#file-list');

  badge.textContent = files.length
    ? `${files.length} file${files.length!==1?'s':''}` : t('noFiles');
  badge.className   = files.length ? 'badge badge-accent no-dot' : 'badge badge-neutral no-dot';

  const totPg = files.reduce((s,f) => s+(typeof f.pages==='number'?f.pages:0), 0);
  fBadge.textContent = `${totPg} ${t('totalPages')}`;

  if (!files.length) {
    empty.classList.remove('hidden'); list.classList.add('hidden'); return;
  }
  empty.classList.add('hidden'); list.classList.remove('hidden');
  list.innerHTML = '';

  files.forEach(f => {
    const mReq = STATE.requirements.find(r => STATE.matches[r.id] === f.id);
    const row  = document.createElement('div');
    row.className = `file-row${f.isDupe ? ' is-dupe' : ''}`;
    row.setAttribute('role','listitem');
    row.innerHTML = `
      <div class="file-pdf-icon">PDF</div>
      <div class="file-info">
        <div class="file-name" title="${esc(f.name)}">${esc(f.name)}</div>
        <div class="file-meta">
          <span class="pg-count">${f.pages} ${t(f.pages===1?'page':'pages')}</span>
          <span style="color:var(--border-strong)">·</span>
          <span>${fmtBytes(f.size)}</span>
          ${f.isDupe ? `<span class="badge badge-warn no-dot" style="margin-left:2px">${t('dupe')}</span>` : ''}
          ${mReq
            ? `<span class="chip" title="${esc(mReq.title_en)}">📎 ${esc(LANG==='bn'?mReq.title_bn:mReq.title_en)}</span>`
            : `<span class="text-subtle" style="font-size:11px">${t('unmatched')}</span>`}
        </div>
      </div>
      <div class="file-actions">
        <button class="btn btn-ghost btn-xs" data-remove="${f.id}"
          aria-label="${t('btnRemove')} ${esc(f.name)}">✕</button>
      </div>`;
    list.appendChild(row);
  });

  list.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeFile(btn.dataset.remove));
  });
}

/* ─────────────────────────────────────────────────────────
   DOCUMENT LIST + MATCH + EXPIRY
───────────────────────────────────────────────────────── */
function renderDocList() {
  const { requirements, files, matches, expiries } = STATE;
  const cBadge = q('#check-badge');
  const empty  = q('#check-empty');
  const scroll = q('#check-scroll');
  const list   = q('#doc-list');

  if (!requirements.length) {
    empty.classList.remove('hidden'); scroll.classList.add('hidden');
    cBadge.textContent = '0 / 0';
    cBadge.className = 'badge badge-neutral no-dot';
    return;
  }
  empty.classList.add('hidden'); scroll.classList.remove('hidden');

  const okCnt = requirements.filter(r => docStatus(r) === 'ok').length;
  cBadge.textContent = `${okCnt} / ${requirements.length}`;
  cBadge.className = okCnt === requirements.length
    ? 'badge badge-ok no-dot' : 'badge badge-neutral no-dot';

  list.innerHTML = '';
  requirements.forEach((req, i) => {
    const status    = docStatus(req);
    const matchedFid = matches[req.id];
    const matchedF   = matchedFid ? files.find(f => f.id === matchedFid) : null;
    const titleMain = LANG==='bn' ? req.title_bn : req.title_en;
    const titleAlt  = LANG==='bn' ? req.title_en : req.title_bn;

    const opts = files.map(f => {
      const usedElsewhere = Object.entries(matches)
        .some(([rid, fid]) => fid === f.id && rid !== req.id);
      const disable = (usedElsewhere || f.isDupe) && f.id !== matchedFid;
      return `<option value="${f.id}" ${f.id===matchedFid?'selected':''} ${disable?'disabled':''}>${esc(f.name)} (${f.pages}p)</option>`;
    }).join('');

    const row = document.createElement('div');
    row.className = `doc-row s-${status}`;
    row.setAttribute('role','listitem');
    row.style.animationDelay = `${i*25}ms`;
    row.innerHTML = `
      <div class="doc-num">${String(req.order).padStart(2,'0')}</div>
      <div class="doc-body">
        <div class="doc-title-primary" title="${esc(titleMain)}">${esc(titleMain)}</div>
        <div class="doc-title-secondary">${esc(titleAlt)}</div>
        <div class="doc-tags" style="margin-top:6px">
          <span class="tag ${req.mandatory?'tag-mandatory':'tag-optional'}">${req.mandatory?t('mandatory'):t('optional')}</span>
          ${badgeHtml(status)}
          ${matchedF ? `<span class="chip" title="${esc(matchedF.name)}">📎 ${esc(matchedF.name)}</span>` : ''}
        </div>
        <div class="doc-controls">
          <div class="doc-controls-row">
            <select class="select" data-req="${req.id}"
              aria-label="${t('matchPlaceholder')} ${esc(req.title_en)}">
              <option value="">${t('matchPlaceholder')}</option>
              ${opts}
            </select>
            ${req.has_expiry && matchedF ? `
              <input type="date" class="input" data-expiry="${req.id}"
                value="${expiries[req.id]||''}"
                aria-label="${t('expiryLabel')} – ${esc(req.title_en)}"
                title="${t('expiryLabel')}" />` : ''}
          </div>
        </div>
      </div>`;
    list.appendChild(row);
  });

  // event delegation
  list.querySelectorAll('select[data-req]').forEach(sel => {
    sel.addEventListener('change', () => {
      const rid = sel.dataset.req;
      if (sel.value) STATE.matches[rid] = sel.value;
      else delete STATE.matches[rid];
      renderDocList(); renderFileList(); updateStatus(); autoSave();
    });
  });
  list.querySelectorAll('input[data-expiry]').forEach(inp => {
    inp.addEventListener('change', () => {
      const rid = inp.dataset.expiry;
      if (inp.value) STATE.expiries[rid] = inp.value;
      else delete STATE.expiries[rid];
      renderDocList(); updateStatus(); autoSave();
    });
  });
}

function badgeHtml(status) {
  const map = {
    ok:             ['badge-ok',          'sOk'],
    missing:        ['badge-missing',     'sMissing'],
    'expiry-needed':['badge-expiry',      'sExpiryNeeded'],
    expired:        ['badge-expired',     'sExpired'],
    'not-provided': ['badge-not-provided','sNotProvided'],
  };
  const [cls, key] = map[status] || ['badge-neutral','sNotProvided'];
  return `<span class="badge ${cls}">${t(key)}</span>`;
}

/* ─────────────────────────────────────────────────────────
   STATUS ENGINE
───────────────────────────────────────────────────────── */
function docStatus(req) {
  const fid  = STATE.matches[req.id];
  const file = fid ? STATE.files.find(f => f.id === fid) : null;
  if (!file) return req.mandatory ? 'missing' : 'not-provided';
  if (req.has_expiry) {
    const exp = STATE.expiries[req.id];
    const dl  = STATE.tender?.submission_deadline;
    if (!exp)         return 'expiry-needed';
    if (dl && exp<dl) return 'expired';
  }
  return 'ok';
}

function updateStatus() {
  if (!STATE.requirements.length) { _setStats(0,0,0,0,0,[]); return; }

  let ok=0, miss=0, exp=0, opt=0;
  const blocking = [];

  STATE.requirements.forEach(req => {
    const s = docStatus(req);
    const title = LANG==='bn' ? req.title_bn : req.title_en;
    if      (s==='ok')             ok++;
    else if (s==='missing')        { miss++; blocking.push({ title, reason:t('sMissing') }); }
    else if (s==='expiry-needed')  { exp++;  blocking.push({ title, reason:t('sExpiryNeeded') }); }
    else if (s==='expired')        { exp++;  blocking.push({ title, reason:t('sExpired') }); }
    else if (s==='not-provided')   opt++;
  });

  const total = STATE.requirements.length;
  const pct   = Math.round(ok/total*100);
  _setStats(ok, miss, exp, opt, pct, blocking);

  const canGen = blocking.length===0 && !!STATE.tender;
  const btn = q('#btn-generate');
  btn.disabled = !canGen;
  btn.toggleAttribute('aria-disabled', !canGen);
  btn.title = canGen ? '' : t('disabledTip');
}

function _setStats(ok, miss, exp, opt, pct, blocking) {
  q('#stat-ready').textContent    = ok;
  q('#stat-missing').textContent  = miss;
  q('#stat-expiry').textContent   = exp;
  q('#stat-optional').textContent = opt;

  const fill = q('#progress-fill');
  fill.style.width = pct+'%';
  fill.className   = 'progress-fill' + (pct===100?'' : miss>0?' red':' orange');
  q('#progress-fill').closest('[role="progressbar"]')?.setAttribute('aria-valuenow', pct);
  q('#progress-pct').textContent = pct+'%';

  const card = q('#block-card');
  if (!blocking.length) { card.classList.add('hidden'); return; }
  card.classList.remove('hidden');
  q('#block-badge').textContent = blocking.length;
  const pl = q('#problem-list');
  pl.innerHTML = '';
  blocking.forEach(({ title, reason }) => {
    const el = document.createElement('div');
    el.className = 'problem-item'; el.setAttribute('role','listitem');
    el.innerHTML = `<span class="problem-dot"></span><span><strong>${esc(title)}</strong> — ${esc(reason)}</span>`;
    pl.appendChild(el);
  });
}

/* ─────────────────────────────────────────────────────────
   GENERATE PDF
───────────────────────────────────────────────────────── */
async function generatePackage() {
  const btn = q('#btn-generate');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> ${t('generating')}`;
  toast('info', t('tGenStart'), '', 90000);

  try {
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const doc   = await PDFDocument.create();
    const fontR = await doc.embedFont(StandardFonts.Helvetica);
    const fontB = await doc.embedFont(StandardFonts.HelveticaBold);

    // docs to include
    const included = STATE.requirements
      .filter(r => docStatus(r) !== 'not-provided')
      .map(r => ({ req:r, file: STATE.files.find(f => f.id===STATE.matches[r.id]) }))
      .filter(i => i.file);

    // 1. Cover page
    const coverPg = doc.addPage([595.28, 841.89]);
    await buildCoverPage(coverPg, doc, fontR, fontB, included, rgb);

    // 2. Index page (content filled after embedding)
    const indexPg = doc.addPage([595.28, 841.89]);

    // 3. Embed source PDFs, track start pages
    let curPg = 3; // cover=1, index=2
    const startPages = [];
    for (const { file } of included) {
      try {
        const src   = await PDFDocument.load(file.arrayBuffer, { ignoreEncryption:true });
        const idxs  = src.getPageIndices();
        const pages = await doc.copyPages(src, idxs);
        startPages.push(curPg);
        pages.forEach(p => doc.addPage(p));
        curPg += idxs.length;
      } catch (e) {
        startPages.push(null);
        toast('warning', 'Skipped corrupt PDF', file.name);
      }
    }

    // Fill index now that start pages are known
    buildIndexPage(indexPg, fontR, fontB, included, startPages, rgb);

    // 4. Seal overlay (Bonus 2)
    if (STATE.seal?.dataUrl && STATE.seal.pages?.length) {
      await applySeal(doc, rgb);
    }

    // 5. Footer on every page
    const total = doc.getPageCount();
    const tid   = STATE.tender.tender_id;
    doc.getPages().forEach((pg, i) => addFooter(pg, fontR, tid, i+1, total, rgb));

    const bytes    = await doc.save();
    const url      = URL.createObjectURL(new Blob([bytes], { type:'application/pdf' }));
    const filename = `${tid}_Package.pdf`;

    const dlBtn = q('#btn-download');
    dlBtn.href = url; dlBtn.download = filename;
    dlBtn.textContent = `⬇  ${filename}`;
    dlBtn.classList.remove('hidden');

    // dismiss gen toast
    qq('#toast-wrap .toast.info').forEach(el => el.remove());
    toast('success', t('tGenOk'), filename);

  } catch (e) {
    console.error('[TPB] Generate error:', e);
    qq('#toast-wrap .toast.info').forEach(el => el.remove());
    toast('error', t('tGenErr'), e.message);
  } finally {
    btn.disabled = false;
    btn.removeAttribute('aria-disabled');
    btn.innerHTML = t('btnGenerate');
    updateStatus();
  }
}

/* ── Cover Page ─────────────────────────────────────────── */
async function buildCoverPage(page, doc, fontR, fontB, included, rgb) {
  const { width, height } = page.getSize();
  const m = 58;

  // Company logo
  const lx=m, ly=height-m-84;
  let logoOk = false;
  try {
    const resp = await fetch('company_logo.png');
    if (resp.ok) {
      const buf = await resp.arrayBuffer();
      const img = await doc.embedPng(new Uint8Array(buf));
      page.drawImage(img, { x:lx, y:ly, width:84, height:84 });
      logoOk = true;
    }
  } catch {}
  if (!logoOk) {
    // teal rounded-ish rect fallback
    [[lx+8,ly,68,84],[lx,ly+8,84,68],[lx+4,ly+4,76,76]].forEach(
      ([x,y,w,h]) => page.drawRectangle({ x,y, width:w, height:h, color:rgb(.12,.31,.41) }));
    page.drawText('MT', { x:lx+24, y:ly+30, size:30, font:fontB, color:rgb(1,1,1) });
  }

  // Header text right of logo
  page.drawText('Meghna Tech Solutions Ltd.', {
    x:m+96, y:ly+60, size:13, font:fontB, color:rgb(.12,.31,.41)
  });
  page.drawText('Tender Package Builder', {
    x:m+96, y:ly+42, size:10, font:fontR, color:rgb(.5,.52,.58)
  });
  page.drawText(`Generated: ${new Date().toISOString().slice(0,10)}`, {
    x:m+96, y:ly+26, size:9, font:fontR, color:rgb(.6,.62,.68)
  });

  // Accent divider
  const divY = ly - 16;
  page.drawRectangle({ x:m, y:divY, width:width-m*2, height:2.5, color:rgb(.12,.31,.41) });

  // Title
  let y = divY - 42;
  page.drawText('TENDER SUBMISSION PACKAGE', {
    x:m, y, size:21, font:fontB, color:rgb(.07,.09,.14)
  });
  y -= 26;

  // Tender title (simple word-wrap)
  const words = STATE.tender.title.split(' ');
  let line = '';
  for (const w of words) {
    const test = line ? line+' '+w : w;
    if (test.length > 62) {
      page.drawText(line, { x:m, y, size:13, font:fontR, color:rgb(.33,.39,.50) });
      y -= 18; line = w;
    } else line = test;
  }
  if (line) { page.drawText(line, { x:m, y, size:13, font:fontR, color:rgb(.33,.39,.50) }); y -= 18; }

  y -= 18;
  // Info rows
  [
    ['Tender ID',           STATE.tender.tender_id],
    ['Procuring Entity',    STATE.tender.procuring_entity],
    ['Bidder',              STATE.tender.bidder],
    ['Submission Deadline', STATE.tender.submission_deadline],
  ].forEach(([lbl, val]) => {
    page.drawText(lbl+':', { x:m, y, size:9, font:fontB, color:rgb(.5,.52,.58) });
    // truncate long values
    const v = String(val).length > 60 ? String(val).slice(0,58)+'…' : String(val);
    page.drawText(v, { x:m+160, y, size:10, font:fontR, color:rgb(.07,.09,.14) });
    y -= 22;
  });

  y -= 14;
  page.drawRectangle({ x:m, y:y+12, width:width-m*2, height:.7, color:rgb(.82,.86,.90) });
  page.drawText('INCLUDED DOCUMENTS', { x:m, y, size:9, font:fontB, color:rgb(.50,.52,.58) });
  y -= 22;

  included.forEach((item, i) => {
    if (y < 75) return;
    page.drawText(`${String(i+1).padStart(2,'0')}.  ${item.req.title_en}`,
      { x:m, y, size:10, font:fontR, color:rgb(.15,.18,.26) });
    y -= 15;
    // Bonus 5: attempt Bangla subtitle
    try {
      page.drawText(item.req.title_bn, { x:m+22, y, size:8, font:fontR, color:rgb(.55,.58,.65) });
    } catch {}
    y -= 14;
  });
}

/* ── Index Page ─────────────────────────────────────────── */
function buildIndexPage(page, fontR, fontB, included, startPages, rgb) {
  const { width, height } = page.getSize();
  const m = 58;
  let y = height - 70;

  page.drawText(LANG==='bn' ? 'সূচিপত্র' : 'INDEX', {
    x:m, y, size:22, font:fontB, color:rgb(.07,.09,.14)
  });
  y -= 30;

  // Column headers
  page.drawRectangle({ x:m-4, y:y-5, width:width-m*2+8, height:22, color:rgb(.93,.95,.98) });
  const cols = [m, m+28, m+264, m+360];
  [['#'],[`Document Title`],['Start Page'],['Pages']].forEach((_,ci) => {
    const hdr = ['#','Document Title','Start Page','Pages'][ci];
    page.drawText(hdr, { x:cols[ci], y, size:9, font:fontB, color:rgb(.40,.45,.52) });
  });
  y -= 24;

  included.forEach(({ req, file }, i) => {
    if (y < 58) return;
    page.drawRectangle({
      x:m-4, y:y-5, width:width-m*2+8, height:19,
      color: i%2===0 ? rgb(.98,.99,1) : rgb(1,1,1)
    });
    page.drawText(String(i+1),   { x:cols[0], y, size:9, font:fontR, color:rgb(.40,.45,.52) });
    const title = req.title_en.length>44 ? req.title_en.slice(0,42)+'…' : req.title_en;
    page.drawText(title,         { x:cols[1], y, size:9, font:fontR, color:rgb(.15,.18,.26) });
    page.drawText(String(startPages[i]||'—'), { x:cols[2], y, size:9, font:fontB, color:rgb(.12,.31,.41) });
    page.drawText(file ? String(file.pages) : '?', { x:cols[3], y, size:9, font:fontR, color:rgb(.40,.45,.52) });
    y -= 20;
  });
}

/* ── Footer ─────────────────────────────────────────────── */
function addFooter(page, font, tid, num, total, rgb) {
  const { width } = page.getSize();
  const text = `${tid}  |  Page ${num} of ${total}`;
  const approxW = text.length * 4.3;
  page.drawText(text, {
    x: Math.max(40, (width-approxW)/2), y:16,
    size:8, font, color:rgb(.58,.62,.68)
  });
}

/* ── Seal ───────────────────────────────────────────────── */
async function applySeal(doc, rgb) {
  try {
    const resp = await fetch(STATE.seal.dataUrl);
    const buf  = await resp.arrayBuffer();
    let img;
    try      { img = await doc.embedPng(new Uint8Array(buf)); }
    catch    { img = await doc.embedJpg(new Uint8Array(buf)); }
    const pages = doc.getPages();
    STATE.seal.pages.forEach(idx => {
      const pg = pages[idx]; if (!pg) return;
      const { width } = pg.getSize();
      pg.drawImage(img, { x:width-105, y:22, width:80, height:80, opacity:.85 });
    });
  } catch { /* seal optional */ }
}

/* ─────────────────────────────────────────────────────────
   SEAL UI
───────────────────────────────────────────────────────── */
function setupSealUI() {
  const input = q('#seal-input');
  if (!input) return;
  q('#seal-dz')?.addEventListener('keydown', e => {
    if (e.key==='Enter'||e.key===' ') { e.preventDefault(); input.click(); }
  });
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = e => {
      STATE.seal = { dataUrl: e.target.result, pages: [] };
      const prev = q('#seal-preview');
      prev.src = e.target.result;
      prev.classList.remove('hidden');
      updateSealPages();
      autoSave();
    };
    reader.readAsDataURL(file);
    input.value = '';
  });
}

function updateSealPages() {
  const wrap = q('#seal-page-wrap');
  if (!wrap || !STATE.seal) return;
  wrap.innerHTML = '';

  const included = STATE.requirements
    .filter(r => docStatus(r) !== 'not-provided')
    .map(r => ({ req:r, file: STATE.files.find(f => f.id===STATE.matches[r.id]) }))
    .filter(i => i.file);

  if (!included.length) {
    wrap.innerHTML = `<span class="text-subtle text-xs">Match files first to select seal pages</span>`;
    return;
  }

  const lbl0 = document.createElement('label');
  lbl0.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-subtle);margin-bottom:8px;font-weight:600';
  lbl0.textContent = t('sealPages');
  wrap.appendChild(lbl0);

  let pgIdx = 2; // 0=cover,1=index
  included.forEach(({ req, file }) => {
    const pages = typeof file.pages==='number' ? file.pages : 1;
    for (let p=0; p<pages; p++) {
      const idx   = pgIdx++;
      const label = `${LANG==='bn'?req.title_bn:req.title_en} – p.${p+1}`;
      const lbl   = document.createElement('label');
      lbl.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;cursor:pointer;padding:2px 0';
      lbl.innerHTML = `<input type="checkbox" value="${idx}"
        ${STATE.seal?.pages?.includes(idx)?'checked':''}
        style="accent-color:var(--accent);cursor:pointer"> ${esc(label)}`;
      lbl.querySelector('input').addEventListener('change', e => {
        if (!STATE.seal) return;
        if (e.target.checked) STATE.seal.pages.push(idx);
        else STATE.seal.pages = STATE.seal.pages.filter(x => x!==idx);
        autoSave();
      });
      wrap.appendChild(lbl);
    }
  });
}

/* ─────────────────────────────────────────────────────────
   EXPORT CSV (Bonus 3)
───────────────────────────────────────────────────────── */
function exportCsv() {
  const BOM  = '\uFEFF';
  const hdrs = ['ID','Title EN','Title BN','File Name','Pages','Expiry','Status'];
  const rows = STATE.requirements.map(req => {
    const f = STATE.files.find(x => x.id===STATE.matches[req.id]);
    return [req.id, req.title_en, req.title_bn,
      f?.name||'', f?.pages||'',
      STATE.expiries[req.id]||'', docStatus(req)]
      .map(v => `"${String(v).replace(/"/g,'""')}"`).join(',');
  });
  dl(URL.createObjectURL(new Blob([BOM+[hdrs.join(','),...rows].join('\r\n')],
    {type:'text/csv;charset=utf-8;'})), 'checklist.csv');
  toast('success', t('tCsvOk'));
}

/* ─────────────────────────────────────────────────────────
   EXPORT / IMPORT PROJECT (Bonus 4)
───────────────────────────────────────────────────────── */
function exportProject() {
  const snap = {
    theme:THEME, lang:LANG,
    tender:STATE.tender, requirements:STATE.requirements,
    filesMeta: STATE.files.map(({id,name,size,pages,hash,isDupe})=>({id,name,size,pages,hash,isDupe})),
    matches:STATE.matches, expiries:STATE.expiries,
    sealPages: STATE.seal?.pages||[], v:2
  };
  dl(URL.createObjectURL(new Blob([JSON.stringify(snap,null,2)],{type:'application/json'})),
    `tpb-${STATE.tender?.tender_id||'draft'}.json`);
}

async function importProject(file) {
  if (!file) return;
  try {
    const snap = JSON.parse(await file.text());
    if (!snap?.tender) throw new Error('Not a valid TPB project file');
    STATE.tender       = snap.tender;
    STATE.requirements = snap.requirements||[];
    STATE.matches      = snap.matches     ||{};
    STATE.expiries     = snap.expiries    ||{};
    if (snap.lang)  applyLanguage(snap.lang);
    if (snap.theme) applyTheme(snap.theme);
    renderTenderDetails();
    renderDocList();
    renderFileList();
    updateStatus();
    toast('success', t('tImportOk'), snap.tender.tender_id);
  } catch (e) { toast('error', t('tImportErr'), e.message); }
}

/* ─────────────────────────────────────────────────────────
   AUTO-MATCH (Bonus 6)
───────────────────────────────────────────────────────── */
function autoMatch() {
  if (!STATE.files.length||!STATE.requirements.length) {
    toast('warning', t('tAutoNone'), 'Upload files and load JSON first'); return;
  }
  const norm  = s => s.toLowerCase().replace(/\.(pdf|png|jpg)$/i,'').replace(/[_\-\s.]+/g,' ').trim();
  const toks  = s => norm(s).split(' ').filter(Boolean);
  const score = (fn, title) => {
    const ft=toks(fn), rt=toks(title);
    return rt.reduce((sum,r) => sum + ft.reduce((s,f) =>
      s+(f===r?3:(f.includes(r)||r.includes(f))?1:0),0),0);
  };

  const suggestions = {};
  const used = new Set(Object.values(STATE.matches));

  STATE.requirements.forEach(req => {
    if (STATE.matches[req.id]) return;
    let best=null, best_s=0;
    STATE.files.forEach(f => {
      if (used.has(f.id)||f.isDupe) return;
      const s = Math.max(score(f.name,req.title_en), score(f.name,req.title_bn));
      if (s>best_s) { best_s=s; best=f; }
    });
    if (best && best_s>0) { suggestions[req.id]=best.id; used.add(best.id); }
  });

  const n = Object.keys(suggestions).length;
  if (!n) { toast('info', t('tAutoNone')); return; }
  if (confirm(`Suggested ${n} match${n!==1?'es':''}. Apply?`)) {
    Object.assign(STATE.matches, suggestions);
    renderDocList(); renderFileList(); updateStatus(); autoSave();
    toast('success', t('tAutoOk'), `${n} files matched`);
  }
}

/* ─────────────────────────────────────────────────────────
   RESET
───────────────────────────────────────────────────────── */
function resetAll() {
  if (!confirm('Reset everything? This cannot be undone.')) return;
  Object.assign(STATE, { tender:null, requirements:[], files:[], matches:{}, expiries:{}, seal:null });
  q('#tender-empty').classList.remove('hidden');
  q('#tender-grid').classList.add('hidden');
  const tb = q('#tender-badge');
  tb.textContent = t('notLoaded'); tb.className = 'badge badge-neutral no-dot';
  q('#btn-download').classList.add('hidden');
  const prev = q('#seal-preview');
  if (prev) { prev.src=''; prev.classList.add('hidden'); }
  const spw = q('#seal-page-wrap');
  if (spw) spw.innerHTML = '';
  STATE.seal = null;
  renderDocList(); renderFileList(); updateStatus();
  writeLS({ theme:THEME, lang:LANG });
  toast('info', t('tReset'));
}

/* ─────────────────────────────────────────────────────────
   BOOT
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // pdfjs worker
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.0/build/pdf.worker.min.js';
  }

  // Theme & Language toggles
  q('#btn-theme').addEventListener('click', () => applyTheme(THEME==='dark'?'light':'dark'));
  q('#btn-lang') .addEventListener('click', () => applyLanguage(LANG==='en'?'bn':'en'));

  // Dropzones
  setupDz(q('#json-dz'), q('#json-input'), handleJsonFiles);
  setupDz(q('#pdf-dz'),  q('#pdf-input'),  handlePdfFiles);

  // Seal
  setupSealUI();
  setupDz(q('#seal-dz'), q('#seal-input'), () => {}); // keyboard handled in setupSealUI

  // Sidebar buttons
  q('#btn-generate')  .addEventListener('click', generatePackage);
  q('#btn-automatch') .addEventListener('click', autoMatch);
  q('#btn-csv')       .addEventListener('click', exportCsv);
  q('#btn-export')    .addEventListener('click', exportProject);
  q('#btn-reset')     .addEventListener('click', resetAll);
  q('#btn-import')    .addEventListener('click', () => q('#import-input').click());
  q('#import-input')  .addEventListener('change', e => {
    importProject(e.target.files[0]);
    e.target.value = '';
  });

  // Restore saved state
  const snap = readLS();
  if (snap.theme) applyTheme(snap.theme);  else applyTheme('dark');
  if (snap.lang)  applyLanguage(snap.lang); else applyLanguage('en');

  if (snap.tender && Array.isArray(snap.requirements) && snap.requirements.length) {
    STATE.tender       = snap.tender;
    STATE.requirements = snap.requirements;
    STATE.matches      = snap.matches  || {};
    STATE.expiries     = snap.expiries || {};
    renderTenderDetails();
    renderDocList();
    updateStatus();
    if (snap.filesMeta?.length) {
      toast('info', 'Previous session restored',
        'Re-upload your PDF files to re-enable generation', 6000);
    }
  }
});
