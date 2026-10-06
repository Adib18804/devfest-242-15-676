/* ═══════════════════════════════════════════════════════════
   TENDER PACKAGE BUILDER — app.js
   Complete production-grade implementation — Vanilla JS
   Meghna Tech Solutions Ltd. — AI DevFest 2026 (90 min contest)
═══════════════════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────────────────────────
   1. CONSTANTS & SYSTEM ASSETS
───────────────────────────────────────────────────────── */
const LS_KEY    = 'tender-builder-v1';
const MAX_FILES = 30;
const MAX_BYTES = 50 * 1024 * 1024; // 50 MB total limit

/* Embedded fallback of company_logo.png (5321 bytes) to guarantee
   100% offline & local file:/// CORS-safe embedding on PDF cover */
const LOGO_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAIAAAAP3aGbAAAUkElEQVR4nO3de5AV1Z3A8b4zzPAYBEEeIggiIUQSRFF5KA9B8QHKuEk2sdSsFWOIWQeoLa38sVX7R/YPqzYps1VAtJQ8NKsW0dosL0EXBwZEXg4PNTwSHhYTFhxQBhkYGB4z+wcUTub2nenuc7rP+Z3z/fxl3Rm629unv/f0nb59c2XlFQEASFBkegMAICqCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUAMggVADIIFQAyCBUCMDqY3ACKdXDRPfSFdH5qlvhB4JVdWXmF6G2ApLVVKhpYhFMHCJQbzFAUJQ0CwfGZ5odpGv/xEsPwiOlKFEC9/ECwvONmpfJTLeQTLWZ5EqhDi5SSC5RrPO5WPcrmEYDmCTrWLcjmAYIlHqmIhW6IRLKnolCLKJRHBkodUaUS2ZCFYktiTKi3HuWP/O8gAwZLB1LFt5Ej26n8WsRAsq2V86Fp7xPI84CKCZanMDlFxByfPjM8Ilo3SPiadORR5onxDsOyS3hHo/LHHU+cDgmWLlI43Dw82nkmHESzz0jjAOLoCnlgXESzD9B5UHE6heJKdQbCM4SjKGE+4AwiWARw5BvHki0awsqbrgOFQUcSOkIhgZYcjxELsFFkIVkb45lGbsXekIFhZUD8eOBgywG6yH8FKF8eAOOwymxGsFCkOfca9Qew7OxWZ3gBnMeJFU3z+7bk3oWOYYelHqlzC3rQKwdJMZXwzuK3FbrUEp4Q6MaxdpbJ3OD3UiBmWNonHJakShL1sFsHSgImVV9jdBhEsVbzk+on9bgTvYSlh1Hor8R7kLS0VBCs5auU5mpU9TgkTSjbmSJWTGAyZYYaVBAMULSXbs8yzEiBYsVEr5KNZ2eCUMJ4EI4xUeYURkipmWDEwFtGuBHuceVZ0BCsqaoWIaFZ6CFYk1Aqx0KyUEKz2USskQLPSQLDaQa2QGM3SjmC1hVpBEc3Si2AVRK2gBc3SiGBpQ61QCGNDF4IVLu5LHCMSbYs7QphkhSJYIagV0kCz1BGs1qgV0kOzFBGsv0OtkDaapYJgJUetkAwjJzGC9ZVYL2WMOaiINX6YZF1GsC6hVsgYzUqAYAUBtYIhNCsughUPtYJejKhYCBYvXBCDsep7sDgZhHGcGEbndbCoFSxBsyLyOljRUSukjTEWhb/B8vllCtJ5O3o9DRYng7AQJ4bt8jRY0VErZInx1jYfgxX9pYnRg+xFH3UeTrJ8DBYAobwLFtMr2I9JViF+BYtaQQqaFcqvYAEQzaNgMb2CLEyy8nkUrIioFezBaGzFl2D58xIEP3kywn0JVkS8oME2jMmWvAiWJy8+8JwP49z9YPFeO6Tj3ffL3A9WRNQKNmN8XuR4sJx/wQFacXvMOx6siHj5gv0YpQHBAiCIy8GKODfmhQtSRByrDp8VuhwsAI5xNlhMr+AkzydZzgYLgHvcDBbTKzjM50mWm8EC4CQHg8X0Cs7zdpLlYLAAuIpgARDDtWBxPghP+HlW6FqwADjMqWAxvYJXPJxkORUsAG7zLlhMr+AS38ZzB9MboI32eW/twufLOpXqXWYhT/7nHxau+TCbdUXUu/sVuxb8vFNpSTarm/jsL7furWn14KvP/vA740dlswHW6v/oz748dVpxIScXzXMjbd7NsOw0+6EppjehtZnTJmRWKyAiv4Jl7YvMjYMHTLrx66a34iudS0tm3j/B9FYgEmtHdRocCZYDfweZXW7RJOvRKWOu6tbV9FZAJweOkcCZYDngnlHDhw242vRWBEEQ5HK5ihmTTW8FEMKjYFk+c87lcrPKrcjE9NEjvnZNH9NbgRgsH9saeRQs+z086bbe3a8wvRV2nZwCLblwWUNKJ+d9H36m7V/4cO6/3jCwn8Y1diot+fH9E55buFzjMuO6Zeig24cP0b7YK78z5/yFJu2LRSwOXNzgQrCikLKfZk6b8Ks/rTxz9pypDZhj3wUW+Z6a+9prqzapL0fLdV66Wrzt1/82tH/yM/GuD81y4231tnFKaJde3bo+cudoU2sf2Ltn+bibTK0daJf4YLn3qlIxY3IulzO16uIi8UMCbZB+vDA6rfP1AX3vvWV49uvt1qXz41PHZb9eIDovgiXlDazLZpfflf1Kf3TvHWWdOma/Xugibpwn4EWwMnbydKPiEiaOGDry+gFaNiaikuLinz4wKfRH6v87gC6yg2XnCfkf3tugvpCMJ1nfnXDLNVddmf/4wc/rKrfvynJLkDY7j5qIZAfLTh9/enDNx39VXMi3x9/cP6wgKSl0u4gXllZx/RTs4X6wjJzYz1uySnEJJcXFTxU4R9Nu8shhI67rn//4ydONv1+5PpttgBbOv43lfrCMeHfLzr8erFVcyBP3ZPQueKHP4ryycn19w5kMNgCIiGClorm5ef6S1YoL6V6WxXUGNwzsN3VUyFUUF5qaXlhalfbagVgEB8vy9w7fqNr8xYmTigt5+sHUr+QsNL1atH57zdFjqa4aplh+7LRBcLCiMHhKf+bsuQXvrFNcyKA+PWeMG6lle0L17dHtexNvDf3R3MWqb8PBCLffxvLlw89GvLx87b/8w90dS5Se5FkzpvzPB9t0bVIrT02fFLp563fu27LnQEorje4vB2s37tqf//iR4/XZb0zatu2rCZ2S81falghWio4cr//jmup/unusykJGD7tuzDcGb9r9qa6tuqxLx9In7xsf+qN5dkyvnlu43OzNdrL0xK9eNb0JAjh+Smic+vUNQRDMSeci0h/cPbZH1y75j+8/fPTtzZ+ksUZAEcFK166aw+9tU71S/IGxNw6+upeW7bmsKJereDD8jszzlqxuam7WuzpAC6nBEvRnDvXTqzbiklihCNadbHhdx73xYDlBR1BLUoMVhSV/LqncvntnzWHFhTx219grw07fEpvzUPhp5oIV7zc0ntW4ImTPkpGfBpeDZQ/1SVZZp9If3XuHlo0JgmDMsMFjhg3Of/zs+QsvLV+ray2AdgQrC2+urVb/S/xT0yeVFBdr2Z5C06s311bX1p3QsgogDQQrC43nzr+sPHPp17P7P068RX1jBvft9cDYG0N/ZMnVDEAhBCsjC95Zd1r5u3Bm6fjGwIoZk4vC7hlfuX33jgOH1JcPpIdgZeSLEyffWL1ZcSEjrus/eeQwlSX06NrlsbvCL2Sdu6hSZclABghWduYvWdWsfH2T4iTryfvGl3UqzX98Z83hyu27VZYMZIBgZWfP/x15Z8sOxYVMvfmGb1x7dbJ/W9qh+CfTw28KyLtXEEFksKJc82bnpSjqXcjlcoknWd+fdNvVPbrlP15bd+LNtdVq2wW7RBn/Eq8dFRksudZ+suej/QcVF/LwpNv6XHlFgn9YqHQvLV/beO682kYBWSBYWVOfZHUs6TBz2sS4/2rqqOHDB/bLf7yh8exvlO/bBWSDYGXtv9dtPfTFccWF/Pi+8Z1LS2L9k0J3Fn1j9aZj9acUtwfIBsHK2rkLGj7+clW3ro9MHh39979V4HqIpubmecr3ngcyQ7AM+O27H5w6o/oB44oZU3Jh13+GmlPgaweXb/5k36GjilsCZIZgGXD8ZMNrlRsVFzK0f5/7b/1mlN/s17P7dyeEf6aHG7dDFoJlxvylGm6SN7vAZ5hb+ecH7wz91PSWPQfW79ynuA1AlgiWGZ9+9vmyTR8rLmT8N79285Br2/6dsk4dn7gn/L40vHsFcQiWMfMWa+hFuxeRPj51XPeyzvmP/+1o3aL1aX0ZD5ASgmXMhl37qpW/Suvbd4wa0KtHoZ8WFxU9XeDeyi8sq+L7oyAOwTJJ/SLSDsVFP30g/OOBQRCUj7tpUJ+e+Y/XN5x5ZeV6xVUD2SNYJmn5Ovgf3nN7184dQ380u8DVDL9fub6+4YzieoHsESyTLjQ1vbhsjeJCunXp/Pjdt+c/fvvwIbcOHZT/+PkLTS8uq1JcKWAEwTLsFR2Tnadn3Flc1HpXFvoszqL12/52tE5xjYARBMuw+oYzr763QXEhA3v3LB93U8tHhlzTe9roEaG/zMWikItgmffC0qoLTap/sGv1dtWsGVNCb9z+wY69W/fWKK4LMIVgmVdz9NjiDdsVF3Lr0EHjbhhy8b97XlH26JQxob/G9AqiESwrzF2koSOXJ1k/mTYx9OYzew8dWfHhn9VXBJhCsKxQvefAxl37FRcyffSI6/v17ljSYea0CaG/MH9JlfoHGAGDCJYt5i5RnWQV5XIVD975yOTRvbuH3ED5WP2pN1ZvUlwFYFYH0xuAS5Zt/PjT2s8H9+2lspDH7hr72bEvQ3+0YMW6hkbVm3ABZjHDskVTc/Ovl1QpLqRLx9Lr+/XOf7zx3PmXV6je5hQwTmSwXP0Ko/+q3PDlqdNpLPmPa6pr606ksWTYSe5X4bVNZLBcderM2d/97wdpLHm+8htkgA0Ill1eXLbm3IULepf53rZdO2sO610mYATBssuhL47/aZ3m++pxsSicQbCsM3dxpcal7ThwaNX23RoXCBhEsKzz0f6D7/95j66lMb2CSwiWjdTvRHrRZ3Un3lpbrWVRgA0Ilo1WVO/Ye+iI+nJeenvN2fOa38IHDHI5WBIvxbqoubl5vvJ3cDU0nv3NO+u0bA9kkTvy2yU1WBKveYvl9VWbjtWfUlnCa5Ub60426NoeOEboESQ1WM47ffacyvyoqbl5/tIqbVsD2IFg2eul5Wsbz51P9m/f3vzJ/sNH9W4PYBzBsldt3Ym33t+S7N9quSMgYBuCZbVk1zdU7zmwYdc+7RsDGOd4sKT/uSTZdepMr3wmfcy3TXCwhP6ZI655Ma9v0PKVFnCb3GNHcLA8sXLrzl1x7rWg5UvDADtxi2QBbpv9nOlNAKzg/gzL7VN6oCXnR7v7wQLgDNnBkvveIWCK6KNGdrAAeMWLYDl/Yg8EfozzXFl5heltUBJxJyWYBtcufL6sU2n8LWrfL956999fX5bGkhN4//mf3TzkWtNbEUx89pdb99ZoXODkkcOW/tyKsb14w/ZH/+O3GawovWPBHuJnWKKffSBj0o8X8cEC4A9fguXD6T185skIdyFY0me5QDYcOFJcCBYAT3gULE/mzPCQP2ObDz8X1PfhZ0xvQhYmPPML05uQitUf/cWBMyC04sgMi6EJtM2NY8SRYEXkz8wZ/vBqVPsVLACiuRMsN2a8QBqcOTrcCVZEXs2f4TzfxrN3wQIgl1PBijjv9e1FCa7y4fYMrTgVLABucy1YTLLgCQ+nV4F7wQLgMIIFQAwHg8VZIZzn5/lg4GSwALjKzWAxyYLDvJ1eBa4GC4CTnA0Wkyw4yefpVeBwsAC4x+VgMcmCYzyfXgVuBwuAYwhWEDDJggSM0sD5YDk8NwZCuT3mHQ9WdLx8wWaMz4vcD1b0FxzGBOwUfWS6Pb0KfAhW4MFeBAI/xrkXwYqOSRZsw5hsyZdg+fDiA595MsJ9CVZ0vKDBHozGVjwKFu++Qxbea8/nUbAASOdXsJhkQQqmV6H8ClZAsyABtSrEu2ABkMvHYDHJgs2YXrXBx2DFQrOQJcZb2zwNVqyXJsYQshFrpHk4vQq8DVbg6/6GG7wdvf4GKxYmWUgbYywKr4PFiSEswclgRF4HK6BZsAC1is73YAXejwAIwlglWPEwyYJejKhYCFYQcGIIQzgZjItgXUKzkDFqlQDB+grNQmaoVTIEKzmahWQYOYkRrL8T96WMkYe44o4ZplctEazWaBbSQ60UEawQNAtpoFbqCFY4mgW9qJUWBEsbmoVCGBu6EKyCErzEMS6RL8GoYHpVCMFqC82CImqlF8FqB81CYtRKO4LVPpqFBKhVGghWJDQLsVCrlBCsqGgWIqJW6SFYMdAstItapSpXVl5hehuESdYgBqXzGBgZYIYVW7IRxlTLbdQqGwQrCZqFlqhVZjglTC5xgBipzmAMZIwZVnKJxxxTLTdQq+wRLCU0y1vUyghOCTVQqQ/DVxx2t0EESxtecn3AXjaLYOnEa6/D2Lk24D0snVTGJe9q2YxaWYIZln6K6WF8W4W9aRWClRYGunTsQQtxSpgWxfHKGaJZ1MpOzLDSpd4dhn7G2GU2I1hZ4BgQgd1kP4KVES2neBwPKWHvSEGwsqPrbSkODI3YKbIQrKxxhFiCHSERwTJA718AOWBi4ckXjWAZw5GTMZ5wBxAswziKMsCT7AyCZV4a14hyUAU8sS4iWLZI6dJ2Dw8wnkmHESy7pPersIf8cY';

/* ─────────────────────────────────────────────────────────
   2. BILINGUAL DICTIONARY (English & বাংলা)
───────────────────────────────────────────────────────── */
const I18N = {
  en: {
    appName:         'Tender Package Builder',
    appSub:          'Meghna Tech Solutions Ltd.',
    langBtn:         'বাংলা',
    tenderTitle:     'Tender Details',
    tenderSub:       'Loaded from requirements.json',
    notLoaded:       'Not Loaded',
    emptyJsonTitle:  'Load a requirements.json to begin',
    emptyJsonSub:    'Drag & drop the file or click Browse below',
    dropJsonLabel:   'Drop requirements.json here',
    dropJsonSub:     'or click to browse — JSON only',
    fTenderId:       'Tender ID',
    fDeadline:       'Submission Deadline',
    fTitle:          'Title',
    fEntity:         'Procuring Entity',
    fBidder:         'Bidder',
    checkTitle:      'Document Checklist',
    checkSub:        'Match PDFs to each requirement',
    checkEmpty:      'No requirements loaded',
    checkEmptySub:   'Load requirements.json first',
    uploadTitle:     'Upload PDF Files',
    uploadSub:       'Up to 30 files · 50 MB total',
    noFiles:         'No files',
    pdfDropLabel:    'Drop PDF files here',
    pdfDropSub:      'or click to browse · multiple files allowed',
    filesTitle:      'Uploaded Files',
    filesSub:        'Review and match each file',
    filesEmpty:      'No files uploaded yet',
    filesEmptySub:   'Use the dropzone above to add PDFs',
    totalPages:      'total pages',
    statusTitle:     'Status Summary',
    statReady:       'Ready',
    statMissing:     'Missing',
    statExpiry:      'Expiry Issues',
    statOptional:    'Optional',
    progressLabel:   'Completion',
    blockTitle:      'Blocking Issues',
    blockSub:        'Resolve before generating',
    btnGenerate:     '⚡  Generate Package',
    btnDownload:     '⬇  Download PDF',
    btnAutoMatch:    '🔗  Auto-match Files',
    btnCsv:          '📊  Export Checklist CSV',
    btnExport:       '💾  Export Project',
    btnImport:       '📂  Import Project',
    btnReset:        '🗑  Reset Everything',
    btnAiHelp:       'AI Assistant',
    btnRemove:       'Remove',
    matchPlaceholder:'Match a file…',
    expiryLabel:     'Expiry date',
    sOk:             'OK',
    sMissing:        'Missing',
    sExpiryNeeded:   'Expiry Needed',
    sExpired:        'Expired',
    sNotProvided:    'Not Provided',
    mandatory:       'Mandatory',
    optional:        'Optional',
    pages:           'pages',
    page:            'page',
    dupe:            'Duplicate',
    unmatched:       'Unmatched',
    generating:      'Generating…',
    sealTitle:       'Seal / Signature (optional)',
    sealDrop:        'Upload seal PNG/JPG',
    sealDropSub:     'overlaid bottom-right on selected pages',
    sealPages:       'Apply to pages:',
    tJsonOk:         'requirements.json loaded',
    tJsonErr:        'Invalid JSON file',
    tPdfAdded:       'PDF files added',
    tPdfErr:         'Could not read PDF',
    tDupe:           'Duplicate files detected',
    tGenStart:       'Generating PDF package…',
    tGenOk:          'Package ready!',
    tGenErr:         'PDF generation failed',
    tReset:          'All data cleared',
    tCsvOk:          'CSV exported successfully',
    tAutoOk:         'Auto-match applied',
    tAutoNone:       'No match suggestions found',
    tImportOk:       'Project imported successfully',
    tImportErr:      'Import failed',
    disabledTip:     'Fix all blocking issues first',
    copy:            'Tender Package Builder · v1.0',
  },
  bn: {
    appName:         'টেন্ডার প্যাকেজ বিল্ডার',
    appSub:          'মেঘনা টেক সলিউশন্স লিমিটেড',
    langBtn:         'English',
    tenderTitle:     'টেন্ডার বিবরণ',
    tenderSub:       'requirements.json থেকে লোড',
    notLoaded:       'লোড হয়নি',
    emptyJsonTitle:  'শুরু করতে requirements.json লোড করুন',
    emptyJsonSub:    'ফাইল ড্রপ করুন অথবা নিচে ক্লিক করুন',
    dropJsonLabel:   'এখানে requirements.json ড্রপ করুন',
    dropJsonSub:     'অথবা ক্লিক করুন — শুধু JSON',
    fTenderId:       'টেন্ডার আইডি',
    fDeadline:       'জমার শেষ তারিখ',
    fTitle:          'শিরোনাম',
    fEntity:         'ক্রয়কারী সংস্থা',
    fBidder:         'দরদাতা',
    checkTitle:      'দলিল তালিকা',
    checkSub:        'প্রতিটিতে PDF মেলান',
    checkEmpty:      'কোনো প্রয়োজনীয়তা লোড হয়নি',
    checkEmptySub:   'প্রথমে requirements.json লোড করুন',
    uploadTitle:     'PDF আপলোড',
    uploadSub:       'সর্বোচ্চ ৩০টি · মোট ৫০ এমবি',
    noFiles:         'কোনো ফাইল নেই',
    pdfDropLabel:    'এখানে PDF ড্রপ করুন',
    pdfDropSub:      'অথবা ক্লিক করুন · একাধিক ফাইল',
    filesTitle:      'আপলোড করা ফাইল',
    filesSub:        'প্রতিটি ফাইল পর্যালোচনা করুন',
    filesEmpty:      'কোনো ফাইল নেই',
    filesEmptySub:   'উপরের ড্রপজোন ব্যবহার করুন',
    totalPages:      'পৃষ্ঠা মোট',
    statusTitle:     'স্ট্যাটাস সারসংক্ষেপ',
    statReady:       'প্রস্তুত',
    statMissing:     'অনুপস্থিত',
    statExpiry:      'মেয়াদ সমস্যা',
    statOptional:    'ঐচ্ছিক',
    progressLabel:   'অগ্রগতি',
    blockTitle:      'বাধাদানকারী সমস্যা',
    blockSub:        'তৈরির আগে সমাধান করুন',
    btnGenerate:     '⚡  প্যাকেজ তৈরি করুন',
    btnDownload:     '⬇  PDF ডাউনলোড',
    btnAutoMatch:    '🔗  স্বয়ংক্রিয় মিলান',
    btnCsv:          '📊  CSV রপ্তানি',
    btnExport:       '💾  প্রজেক্ট রপ্তানি',
    btnImport:       '📂  প্রজেক্ট আমদানি',
    btnReset:        '🗑  সব মুছুন',
    btnAiHelp:       'এআই সহকারী',
    btnRemove:       'সরান',
    matchPlaceholder:'ফাইল মেলান…',
    expiryLabel:     'মেয়াদ শেষ তারিখ',
    sOk:             'ঠিক আছে',
    sMissing:        'অনুপস্থিত',
    sExpiryNeeded:   'মেয়াদ প্রয়োজন',
    sExpired:        'মেয়াদ শেষ',
    sNotProvided:    'প্রদান করা হয়নি',
    mandatory:       'বাধ্যতামূলক',
    optional:        'ঐচ্ছিক',
    pages:           'পৃষ্ঠা',
    page:            'পৃষ্ঠা',
    dupe:            'ডুপ্লিকেট',
    unmatched:       'মেলানো হয়নি',
    generating:      'তৈরি হচ্ছে…',
    sealTitle:       'সীল / স্বাক্ষর (ঐচ্ছিক)',
    sealDrop:        'সীল PNG/JPG আপলোড',
    sealDropSub:     'নির্বাচিত পৃষ্ঠায় নিচে-ডানে',
    sealPages:       'পৃষ্ঠাসমূহে প্রয়োগ:',
    tJsonOk:         'requirements.json লোড হয়েছে',
    tJsonErr:        'অবৈধ JSON ফাইল',
    tPdfAdded:       'PDF যোগ হয়েছে',
    tPdfErr:         'PDF পড়া সম্ভব হয়নি',
    tDupe:           'ডুপ্লিকেট ফাইল শনাক্ত হয়েছে',
    tGenStart:       'PDF তৈরি হচ্ছে…',
    tGenOk:          'প্যাকেজ প্রস্তুত!',
    tGenErr:         'PDF তৈরি ব্যর্থ',
    tReset:          'সব মুছে গেছে',
    tCsvOk:          'CSV সফলভাবে রপ্তানি হয়েছে',
    tAutoOk:         'স্বয়ংক্রিয় মিলান সম্পন্ন',
    tAutoNone:       'কোনো মিল পাওয়া যায়নি',
    tImportOk:       'প্রজেক্ট আমদানি হয়েছে',
    tImportErr:      'আমদানি ব্যর্থ',
    disabledTip:     'প্রথমে সব বাধাদানকারী সমস্যা সমাধান করুন',
    copy:            'টেন্ডার প্যাকেজ বিল্ডার · সংস্করণ ১.০',
  }
};

let LANG  = 'en';
let THEME = 'dark';
const t   = k => I18N[LANG]?.[k] ?? I18N.en[k] ?? k;

/* ─────────────────────────────────────────────────────────
   3. APPLICATION STATE
───────────────────────────────────────────────────────── */
const STATE = {
  tender:       null, // { tender_id, title, procuring_entity, bidder, submission_deadline }
  requirements: [],   // [ { id, order, title_en, title_bn, mandatory, has_expiry } ]
  files:        [],   // [ { id, name, size, pages, hash, arrayBuffer, isDupe } ]
  matches:      {},   // reqId -> fileId (strictly 1-to-1)
  expiries:     {},   // reqId -> 'YYYY-MM-DD'
  seal:         null, // { dataUrl, pages: number[] }
};

/* ─────────────────────────────────────────────────────────
   4. DOM & STORAGE HELPERS
───────────────────────────────────────────────────────── */
const q  = sel => document.querySelector(sel);
const qq = sel => [...document.querySelectorAll(sel)];

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const fmtBytes = b => {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(1) + ' MB';
};

const readLS  = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); }
  catch { return {}; }
};

const writeLS = val => {
  try { localStorage.setItem(LS_KEY, JSON.stringify(val)); }
  catch (e) { console.warn('[TPB] LocalStorage quota exceeded or error:', e); }
};

function dl(url, filename) {
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 20000);
}

/* ─────────────────────────────────────────────────────────
   5. TOAST SYSTEM
───────────────────────────────────────────────────────── */
function toast(type, title, msg = '', dur = 4000) {
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const wrap  = q('#toast-wrap');
  if (!wrap) return;

  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.setAttribute('role', 'alert');
  el.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <div class="toast-body">
      <div class="toast-title">${esc(title)}</div>
      ${msg ? `<div class="toast-message">${esc(msg)}</div>` : ''}
    </div>`;

  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add('removing');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, dur);
}

/* ─────────────────────────────────────────────────────────
   6. SHA-256 HASH COMPUTATION (Web Crypto API)
───────────────────────────────────────────────────────── */
async function sha256(buf) {
  const digest = await crypto.subtle.digest('SHA-256', buf);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/* ─────────────────────────────────────────────────────────
   7. DROPZONE HELPER
───────────────────────────────────────────────────────── */
function setupDz(zone, input, handler) {
  if (!zone || !input) return;
  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', e => {
    if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
  });
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    if (e.dataTransfer?.files?.length) handler(e.dataTransfer.files);
  });
  input.addEventListener('change', () => {
    if (input.files?.length) handler(input.files);
    input.value = '';
  });
  zone.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });
}

/* ─────────────────────────────────────────────────────────
   8. THEME & LANGUAGE CONTROLLERS
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

  qq('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key && I18N[LANG]?.[key]) el.textContent = t(key);
  });

  renderDocList();
  renderFileList();
  updateStatus();
  updateSealPages();
  persistPrefs();
}

function persistPrefs() {
  const s = readLS();
  s.theme = THEME;
  s.lang  = LANG;
  writeLS(s);
}

function autoSave() {
  writeLS({
    theme:        THEME,
    lang:         LANG,
    tender:       STATE.tender,
    requirements: STATE.requirements,
    filesMeta:    STATE.files.map(({ id, name, size, pages, hash, isDupe }) => ({
                    id, name, size, pages, hash, isDupe
                  })),
    matches:      STATE.matches,
    expiries:     STATE.expiries,
    sealPages:    STATE.seal?.pages ?? [],
    v:            2,
  });
}

/* ─────────────────────────────────────────────────────────
   9. LOAD requirements.json WITH STRICT SCHEMA VALIDATION
───────────────────────────────────────────────────────── */
function loadRequirements(json) {
  if (!json || typeof json !== 'object') {
    throw new Error('Invalid JSON: payload must be a JSON object');
  }
  if (!json.tender || typeof json.tender !== 'object') {
    throw new Error('Missing "tender" object in requirements.json');
  }
  if (!Array.isArray(json.requirements) || json.requirements.length === 0) {
    throw new Error('Requirements array is missing or empty');
  }

  const td = json.tender;
  if (!td.tender_id || !String(td.tender_id).trim()) {
    throw new Error('Missing required tender_id in tender metadata');
  }

  // Validate requirement objects
  for (let i = 0; i < json.requirements.length; i++) {
    const r = json.requirements[i];
    if (!r.id) throw new Error(`Requirement item #${i + 1} is missing "id"`);
    if (typeof r.title_en !== 'string') throw new Error(`Requirement ${r.id} is missing "title_en"`);
    if (typeof r.mandatory !== 'boolean') throw new Error(`Requirement ${r.id} mandatory must be a boolean`);
  }

  STATE.tender = {
    tender_id:           String(td.tender_id).trim(),
    title:               String(td.title || '').trim(),
    procuring_entity:    String(td.procuring_entity || '').trim(),
    bidder:              String(td.bidder || '').trim(),
    submission_deadline: String(td.submission_deadline || '').trim(),
  };

  STATE.requirements = [...json.requirements].sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  renderTenderDetails();
  renderDocList();
  updateStatus();
  autoSave();

  toast('success', t('tJsonOk'),
    `${STATE.requirements.length} requirements · deadline ${STATE.tender.submission_deadline}`);
}

function renderTenderDetails() {
  if (!STATE.tender) return;
  q('#tender-empty')?.classList.add('hidden');
  q('#tender-grid')?.classList.remove('hidden');

  q('#f-tender-id').textContent = STATE.tender.tender_id;
  q('#f-deadline').textContent  = STATE.tender.submission_deadline;
  q('#f-title').textContent     = STATE.tender.title;
  q('#f-entity').textContent    = STATE.tender.procuring_entity;
  q('#f-bidder').textContent    = STATE.tender.bidder;

  const b = q('#tender-badge');
  if (b) {
    b.textContent = STATE.tender.tender_id;
    b.className   = 'badge badge-accent no-dot';
  }
}

async function handleJsonFiles(files) {
  const f = [...files].find(file => file.name.toLowerCase().endsWith('.json'));
  if (!f) {
    toast('error', t('tJsonErr'), 'Please select a valid .json file');
    return;
  }
  try {
    const text = await f.text();
    const data = JSON.parse(text);
    loadRequirements(data);
  } catch (e) {
    toast('error', t('tJsonErr'), e.message);
  }
}

/* ─────────────────────────────────────────────────────────
   10. PDF UPLOAD, PARSING, DUPLICATE DETECTION & ERROR HANDLING
───────────────────────────────────────────────────────── */
async function handlePdfFiles(files) {
  const allFiles = [...files];
  const nonPdfs  = allFiles.filter(f => !f.name.toLowerCase().endsWith('.pdf'));
  const pdfs     = allFiles.filter(f =>  f.name.toLowerCase().endsWith('.pdf'));

  // Reject non-PDF files with clear error toast
  if (nonPdfs.length > 0) {
    nonPdfs.forEach(f => {
      toast('error', 'Not a PDF file', `"${f.name}" was rejected — only .pdf files are accepted`);
    });
  }
  if (!pdfs.length) return;

  const curSz = STATE.files.reduce((s, f) => s + f.size, 0);
  const newSz = pdfs.reduce((s, f) => s + f.size, 0);

  if (STATE.files.length + pdfs.length > MAX_FILES) {
    return toast('warning', `Maximum ${MAX_FILES} files allowed`, `You already have ${STATE.files.length} file(s)`);
  }
  if (curSz + newSz > MAX_BYTES) {
    return toast('warning', 'Total size exceeds 50 MB', 'Remove some files before adding more');
  }

  let added = 0;
  for (const file of pdfs) {
    try {
      const ab   = await file.arrayBuffer();
      const hash = await sha256(ab);

      // Safe page count extraction fallback (Bonus 7)
      let pages = '?';
      try {
        if (typeof pdfjsLib !== 'undefined') {
          const pdfDoc = await pdfjsLib.getDocument({ data: ab.slice(0) }).promise;
          pages = pdfDoc.numPages;
        } else {
          pages = 1;
        }
      } catch (err) {
        toast('warning', t('tPdfErr'), `"${file.name}" — page count unavailable (corrupt or encrypted)`);
      }

      STATE.files.push({
        id:          crypto.randomUUID ? crypto.randomUUID() : 'f-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        name:        file.name,
        size:        file.size,
        pages:       pages,
        hash:        hash,
        arrayBuffer: ab,
        isDupe:      false
      });
      added++;
    } catch (e) {
      toast('error', t('tPdfErr'), `"${file.name}" — ${e.message}`);
    }
  }

  // Recalculate duplicate flags across all files by content hash
  recomputeDupes();

  const dupeCount = STATE.files.filter(f => f.isDupe).length;
  if (dupeCount > 0) {
    toast('warning', t('tDupe'), `${dupeCount} file(s) share identical content and are marked as duplicates`);
  }
  if (added > 0) {
    toast('success', t('tPdfAdded'), `${added} file(s) added successfully`);
  }

  renderFileList();
  renderDocList();
  updateStatus();
  updateSealPages();
  autoSave();
}

function recomputeDupes() {
  const hashCount = {};
  STATE.files.forEach(f => {
    hashCount[f.hash] = (hashCount[f.hash] || 0) + 1;
  });
  STATE.files.forEach(f => {
    f.isDupe = hashCount[f.hash] > 1;
  });
}

function removeFile(id) {
  // Clear any requirement matched to this file
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

  if (badge) {
    badge.textContent = files.length
      ? `${files.length} file${files.length !== 1 ? 's' : ''}` : t('noFiles');
    badge.className   = files.length ? 'badge badge-accent no-dot' : 'badge badge-neutral no-dot';
  }

  const totPg = files.reduce((s, f) => s + (typeof f.pages === 'number' ? f.pages : 0), 0);
  if (fBadge) {
    fBadge.textContent = `${totPg} ${t('totalPages')}`;
  }

  if (!files.length) {
    empty?.classList.remove('hidden');
    list?.classList.add('hidden');
    return;
  }
  empty?.classList.add('hidden');
  list?.classList.remove('hidden');
  list.innerHTML = '';

  files.forEach(f => {
    const mReq = STATE.requirements.find(r => STATE.matches[r.id] === f.id);
    const row  = document.createElement('div');
    row.className = `file-row${f.isDupe ? ' is-dupe' : ''}`;
    row.setAttribute('role', 'listitem');
    row.innerHTML = `
      <div class="file-pdf-icon">PDF</div>
      <div class="file-info">
        <div class="file-name" title="${esc(f.name)}">${esc(f.name)}</div>
        <div class="file-meta">
          <span class="pg-count">${f.pages} ${t(f.pages === 1 ? 'page' : 'pages')}</span>
          <span style="color:var(--border-strong)">·</span>
          <span>${fmtBytes(f.size)}</span>
          ${f.isDupe ? `<span class="badge badge-warn no-dot">${t('dupe')}</span>` : ''}
          ${mReq
            ? `<span class="chip" title="${esc(mReq.title_en)}">📎 ${esc(LANG === 'bn' ? mReq.title_bn : mReq.title_en)}</span>`
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
   11. DOCUMENT CHECKLIST & 1-TO-1 MATCH ENGINE
───────────────────────────────────────────────────────── */
function renderDocList() {
  const { requirements, files, matches, expiries } = STATE;
  const cBadge = q('#check-badge');
  const empty  = q('#check-empty');
  const scroll = q('#check-scroll');
  const list   = q('#doc-list');

  if (!requirements.length) {
    empty?.classList.remove('hidden');
    scroll?.classList.add('hidden');
    if (cBadge) {
      cBadge.textContent = '0 / 0';
      cBadge.className   = 'badge badge-neutral no-dot';
    }
    return;
  }

  empty?.classList.add('hidden');
  scroll?.classList.remove('hidden');

  const okCnt = requirements.filter(r => docStatus(r) === 'ok').length;
  if (cBadge) {
    cBadge.textContent = `${okCnt} / ${requirements.length}`;
    cBadge.className   = okCnt === requirements.length
      ? 'badge badge-ok no-dot' : 'badge badge-neutral no-dot';
  }

  list.innerHTML = '';
  requirements.forEach((req, i) => {
    const status     = docStatus(req);
    const matchedFid = matches[req.id];
    const matchedF   = matchedFid ? files.find(f => f.id === matchedFid) : null;
    const titleMain  = LANG === 'bn' ? req.title_bn : req.title_en;
    const titleAlt   = LANG === 'bn' ? req.title_en : req.title_bn;

    // Dropdown options with strict 1-to-1 matching and duplicate prevention
    const opts = files.map(f => {
      // Used elsewhere on a different requirement
      const usedElsewhere = Object.entries(matches)
        .some(([rid, fid]) => fid === f.id && rid !== req.id);

      // Duplicate prevention: If another file with the exact same hash is matched elsewhere
      const dupeMatchedElsewhere = Object.entries(matches)
        .some(([rid, fid]) => {
          if (rid === req.id) return false;
          const otherF = files.find(x => x.id === fid);
          return otherF && otherF.hash === f.hash;
        });

      const isBlocked = (usedElsewhere || dupeMatchedElsewhere) && f.id !== matchedFid;
      let label = `${f.name} (${f.pages}p)`;
      if (f.isDupe) label += ' ⚠';
      if (isBlocked) label += usedElsewhere ? ' [Used]' : ' [Dupe Used]';

      return `<option value="${f.id}" ${f.id === matchedFid ? 'selected' : ''} ${isBlocked ? 'disabled' : ''}>${esc(label)}</option>`;
    }).join('');

    const row = document.createElement('div');
    row.className = `doc-row s-${status}`;
    row.setAttribute('role', 'listitem');
    row.style.animationDelay = `${i * 20}ms`;
    row.innerHTML = `
      <div class="doc-num">${String(req.order).padStart(2, '0')}</div>
      <div class="doc-body">
        <div class="doc-title-primary" title="${esc(titleMain)}">${esc(titleMain)}</div>
        <div class="doc-title-secondary">${esc(titleAlt)}</div>
        <div class="doc-tags">
          <span class="tag ${req.mandatory ? 'tag-mandatory' : 'tag-optional'}">${req.mandatory ? t('mandatory') : t('optional')}</span>
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
                value="${expiries[req.id] || ''}"
                aria-label="${t('expiryLabel')} – ${esc(req.title_en)}"
                title="${t('expiryLabel')}" />` : ''}
          </div>
        </div>
      </div>`;
    list.appendChild(row);
  });

  // Event bindings for dropdown match & date input
  list.querySelectorAll('select[data-req]').forEach(sel => {
    sel.addEventListener('change', () => {
      const rid = sel.dataset.req;
      if (sel.value) STATE.matches[rid] = sel.value;
      else delete STATE.matches[rid];
      renderDocList();
      renderFileList();
      updateStatus();
      updateSealPages();
      autoSave();
    });
  });

  list.querySelectorAll('input[data-expiry]').forEach(inp => {
    inp.addEventListener('change', () => {
      const rid = inp.dataset.expiry;
      if (inp.value) STATE.expiries[rid] = inp.value;
      else delete STATE.expiries[rid];
      renderDocList();
      updateStatus();
      autoSave();
    });
  });
}

function badgeHtml(status) {
  const map = {
    ok:             ['badge-ok',           'sOk'],
    missing:        ['badge-missing',      'sMissing'],
    'expiry-needed':['badge-expiry',       'sExpiryNeeded'],
    expired:        ['badge-expired',      'sExpired'],
    'not-provided': ['badge-not-provided', 'sNotProvided'],
  };
  const [cls, key] = map[status] || ['badge-neutral', 'sNotProvided'];
  return `<span class="badge ${cls}">${t(key)}</span>`;
}

/* ─────────────────────────────────────────────────────────
   12. REAL-TIME STATUS ENGINE (§4.6)
───────────────────────────────────────────────────────── */
function docStatus(req) {
  const fid  = STATE.matches[req.id];
  const file = fid ? STATE.files.find(f => f.id === fid) : null;

  // No file matched
  if (!file) {
    return req.mandatory ? 'missing' : 'not-provided';
  }

  // File matched — check expiry date rules if required
  if (req.has_expiry) {
    const exp      = STATE.expiries[req.id];
    const deadline = STATE.tender?.submission_deadline;

    if (!exp) return 'expiry-needed';

    // Expired strictly when expiry < deadline; same day (expiry == deadline) is OK
    if (deadline && exp < deadline) return 'expired';
  }

  return 'ok';
}

function updateStatus() {
  if (!STATE.requirements.length) {
    _setStats(0, 0, 0, 0, 0, []);
    return;
  }

  let ok = 0, miss = 0, exp = 0, opt = 0;
  const blocking = [];

  STATE.requirements.forEach(req => {
    const s     = docStatus(req);
    const title = LANG === 'bn' ? req.title_bn : req.title_en;

    if      (s === 'ok')            ok++;
    else if (s === 'missing')       { miss++; blocking.push({ title, reason: t('sMissing') }); }
    else if (s === 'expiry-needed') { exp++;  blocking.push({ title, reason: t('sExpiryNeeded') }); }
    else if (s === 'expired')       { exp++;  blocking.push({ title, reason: t('sExpired') }); }
    else if (s === 'not-provided')  opt++;
  });

  const total = STATE.requirements.length;
  const pct   = Math.round((ok / total) * 100);
  _setStats(ok, miss, exp, opt, pct, blocking);

  const canGen = blocking.length === 0 && !!STATE.tender && total > 0;
  const btn = q('#btn-generate');
  if (btn) {
    btn.disabled = !canGen;
    btn.toggleAttribute('aria-disabled', !canGen);
    btn.title = canGen ? '' : t('disabledTip');
  }
}

function _setStats(ok, miss, exp, opt, pct, blocking) {
  q('#stat-ready').textContent    = ok;
  q('#stat-missing').textContent  = miss;
  q('#stat-expiry').textContent   = exp;
  q('#stat-optional').textContent = opt;

  const fill = q('#progress-fill');
  if (fill) {
    fill.style.width = pct + '%';
    fill.className   = 'progress-fill' + (pct === 100 ? '' : miss > 0 ? ' red' : ' orange');
    fill.closest('[role="progressbar"]')?.setAttribute('aria-valuenow', pct);
  }
  const pctEl = q('#progress-pct');
  if (pctEl) pctEl.textContent = pct + '%';

  const card = q('#block-card');
  if (!blocking.length) {
    card?.classList.add('hidden');
    return;
  }
  card?.classList.remove('hidden');
  const badge = q('#block-badge');
  if (badge) badge.textContent = blocking.length;

  const pl = q('#problem-list');
  if (pl) {
    pl.innerHTML = '';
    blocking.forEach(({ title, reason }) => {
      const el = document.createElement('div');
      el.className = 'problem-item';
      el.setAttribute('role', 'listitem');
      el.innerHTML = `<span class="problem-dot"></span><span><strong>${esc(title)}</strong> — ${esc(reason)}</span>`;
      pl.appendChild(el);
    });
  }
}

/* ─────────────────────────────────────────────────────────
   13. COMBINED PDF GENERATOR (§4.9 & BONUS 1, 2, 5)
───────────────────────────────────────────────────────── */
async function generatePackage() {
  const btn = q('#btn-generate');
  if (!btn) return;
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span> ${t('generating')}`;
  toast('info', t('tGenStart'), '', 90000);

  try {
    const { PDFDocument, StandardFonts, rgb } = PDFLib;
    const doc   = await PDFDocument.create();
    const fontR = await doc.embedFont(StandardFonts.Helvetica);
    const fontB = await doc.embedFont(StandardFonts.HelveticaBold);

    // List of documents to include in final package (skipping missing optional)
    const included = STATE.requirements
      .filter(r => docStatus(r) !== 'not-provided')
      .map(r => ({ req: r, file: STATE.files.find(f => f.id === STATE.matches[r.id]) }))
      .filter(item => item.file);

    // Page 1: English Cover Page with company_logo.png
    const coverPg = doc.addPage([595.28, 841.89]);
    await buildCoverPage(coverPg, doc, fontR, fontB, included, rgb);

    // Page 2: Index Page placeholder
    const indexPg = doc.addPage([595.28, 841.89]);

    // Page 3+: Embed source PDFs, track starting pages
    let curPg = 3; // cover = 1, index = 2
    const startPages = [];
    for (const { file } of included) {
      try {
        const src   = await PDFDocument.load(file.arrayBuffer, { ignoreEncryption: true });
        const idxs  = src.getPageIndices();
        const pages = await doc.copyPages(src, idxs);
        startPages.push(curPg);
        pages.forEach(p => doc.addPage(p));
        curPg += idxs.length;
      } catch (err) {
        startPages.push(null);
        toast('warning', 'Skipped unreadable PDF file', file.name);
      }
    }

    // Populate Index Page with accurate start pages
    buildIndexPage(indexPg, fontR, fontB, included, startPages, rgb);

    // Seal overlay on selected pages (Bonus 2)
    if (STATE.seal?.dataUrl && STATE.seal.pages?.length) {
      await applySeal(doc, rgb);
    }

    // Per-page centered footer: "<tender_id> | Page X of Y" (10pt gray)
    const totalPages = doc.getPageCount();
    const tid        = STATE.tender.tender_id;
    doc.getPages().forEach((pg, i) => {
      addFooter(pg, fontR, tid, i + 1, totalPages, rgb);
    });

    const bytes    = await doc.save();
    const blob     = new Blob([bytes], { type: 'application/pdf' });
    const url      = URL.createObjectURL(blob);
    const filename = `${tid}_Package.pdf`;

    const dlBtn = q('#btn-download');
    if (dlBtn) {
      dlBtn.href        = url;
      dlBtn.download    = filename;
      dlBtn.textContent = `⬇  ${filename}`;
      dlBtn.classList.remove('hidden');
    }

    // Dismiss pending toast & notify success
    qq('#toast-wrap .toast.info').forEach(el => el.remove());
    toast('success', t('tGenOk'), filename);

  } catch (e) {
    console.error('[TPB] PDF generation error:', e);
    qq('#toast-wrap .toast.info').forEach(el => el.remove());
    toast('error', t('tGenErr'), e.message);
  } finally {
    btn.disabled = false;
    btn.removeAttribute('aria-disabled');
    btn.innerHTML = t('btnGenerate');
    updateStatus();
  }
}

/* ─────────────────────────────────────────────────────────
   14. COVER PAGE BUILDER (with 80x80pt company_logo.png)
───────────────────────────────────────────────────────── */
async function buildCoverPage(page, doc, fontR, fontB, included, rgb) {
  const { width, height } = page.getSize();
  const m = 58;

  // 3. Company Logo (80x80pt embedded via doc.embedPng at top-left)
  const lx = m;
  const ly = height - m - 80;
  let logoOk = false;

  // Try fetching company_logo.png, fall back to embedded byte stream
  let pngBytes = null;
  try {
    const resp = await fetch('company_logo.png');
    if (resp.ok) {
      pngBytes = new Uint8Array(await resp.arrayBuffer());
    }
  } catch {}

  if (!pngBytes && typeof LOGO_BASE64 === 'string') {
    try {
      const binStr = atob(LOGO_BASE64);
      pngBytes = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) pngBytes[i] = binStr.charCodeAt(i);
    } catch {}
  }

  if (pngBytes) {
    try {
      const img = await doc.embedPng(pngBytes);
      page.drawImage(img, { x: lx, y: ly, width: 80, height: 80 });
      logoOk = true;
    } catch (err) {
      console.warn('[TPB] embedPng failed:', err);
    }
  }

  // Fallback vector drawing if image failed
  if (!logoOk) {
    page.drawRectangle({ x: lx, y: ly, width: 80, height: 80, color: rgb(0.12, 0.31, 0.41) });
    page.drawText('MT', { x: lx + 22, y: ly + 28, size: 28, font: fontB, color: rgb(1, 1, 1) });
  }

  // Company and application heading
  page.drawText('Meghna Tech Solutions Ltd.', {
    x: m + 96, y: ly + 56, size: 14, font: fontB, color: rgb(0.12, 0.31, 0.41)
  });
  page.drawText('Tender Package Builder', {
    x: m + 96, y: ly + 38, size: 11, font: fontR, color: rgb(0.40, 0.45, 0.52)
  });
  page.drawText(`Date Prepared: ${new Date().toISOString().slice(0, 10)}`, {
    x: m + 96, y: ly + 22, size: 9, font: fontR, color: rgb(0.55, 0.60, 0.68)
  });

  // Primary accent divider bar
  const divY = ly - 16;
  page.drawRectangle({ x: m, y: divY, width: width - m * 2, height: 2.5, color: rgb(0.12, 0.31, 0.41) });

  // Main Title
  let y = divY - 38;
  page.drawText('TENDER SUBMISSION PACKAGE', {
    x: m, y, size: 20, font: fontB, color: rgb(0.07, 0.09, 0.14)
  });
  y -= 24;

  // Tender Title (word wrapped)
  const words = (STATE.tender.title || 'Tender Proposal').split(' ');
  let line = '';
  for (const w of words) {
    const test = line ? line + ' ' + w : w;
    if (test.length > 58) {
      page.drawText(line, { x: m, y, size: 13, font: fontR, color: rgb(0.30, 0.35, 0.45) });
      y -= 18;
      line = w;
    } else {
      line = test;
    }
  }
  if (line) {
    page.drawText(line, { x: m, y, size: 13, font: fontR, color: rgb(0.30, 0.35, 0.45) });
    y -= 18;
  }

  y -= 16;
  // Metadata table rows
  const metaRows = [
    ['Tender ID',           STATE.tender.tender_id],
    ['Procuring Entity',    STATE.tender.procuring_entity],
    ['Bidder',              STATE.tender.bidder],
    ['Submission Deadline', STATE.tender.submission_deadline],
  ];

  metaRows.forEach(([lbl, val]) => {
    page.drawText(lbl + ':', { x: m, y, size: 9, font: fontB, color: rgb(0.45, 0.50, 0.58) });
    const textVal = String(val).length > 60 ? String(val).slice(0, 58) + '…' : String(val);
    page.drawText(textVal, { x: m + 155, y, size: 10, font: fontR, color: rgb(0.08, 0.10, 0.15) });
    y -= 22;
  });

  y -= 12;
  page.drawRectangle({ x: m, y: y + 10, width: width - m * 2, height: 0.8, color: rgb(0.80, 0.84, 0.90) });
  page.drawText('INCLUDED DOCUMENTS', { x: m, y, size: 9, font: fontB, color: rgb(0.45, 0.50, 0.58) });
  y -= 22;

  // Included documents list in order
  included.forEach((item, i) => {
    if (y < 70) return;
    page.drawText(`${String(i + 1).padStart(2, '0')}.  ${item.req.title_en}`, {
      x: m, y, size: 10, font: fontR, color: rgb(0.12, 0.16, 0.24)
    });
    y -= 15;

    // Bonus 5: Gracefully attempt Bangla subtitle
    try {
      page.drawText(item.req.title_bn, {
        x: m + 22, y, size: 8, font: fontR, color: rgb(0.50, 0.55, 0.62)
      });
    } catch {}
    y -= 13;
  });
}

/* ─────────────────────────────────────────────────────────
   15. INDEX PAGE BUILDER (Bonus 1)
───────────────────────────────────────────────────────── */
function buildIndexPage(page, fontR, fontB, included, startPages, rgb) {
  const { width, height } = page.getSize();
  const m = 58;
  let y = height - 70;

  page.drawText('INDEX / TABLE OF CONTENTS', {
    x: m, y, size: 20, font: fontB, color: rgb(0.07, 0.09, 0.14)
  });
  y -= 30;

  // Table header background
  page.drawRectangle({ x: m - 4, y: y - 5, width: width - m * 2 + 8, height: 22, color: rgb(0.93, 0.95, 0.98) });
  const cols = [m, m + 28, m + 270, m + 365];
  ['#', 'Document Title', 'Start Page', 'Pages'].forEach((hdr, ci) => {
    page.drawText(hdr, { x: cols[ci], y, size: 9, font: fontB, color: rgb(0.35, 0.40, 0.48) });
  });
  y -= 24;

  included.forEach(({ req, file }, i) => {
    if (y < 58) return;
    page.drawRectangle({
      x: m - 4, y: y - 5, width: width - m * 2 + 8, height: 20,
      color: i % 2 === 0 ? rgb(0.98, 0.99, 1) : rgb(1, 1, 1)
    });

    page.drawText(String(i + 1), { x: cols[0], y, size: 9, font: fontR, color: rgb(0.40, 0.45, 0.52) });
    const title = req.title_en.length > 46 ? req.title_en.slice(0, 44) + '…' : req.title_en;
    page.drawText(title, { x: cols[1], y, size: 9, font: fontR, color: rgb(0.12, 0.16, 0.24) });
    page.drawText(String(startPages[i] || '—'), { x: cols[2], y, size: 9, font: fontB, color: rgb(0.12, 0.31, 0.41) });
    page.drawText(file ? String(file.pages) : '?', { x: cols[3], y, size: 9, font: fontR, color: rgb(0.40, 0.45, 0.52) });
    y -= 20;
  });
}

/* ─────────────────────────────────────────────────────────
   16. PER-PAGE FOOTER (10pt gray, centered, never covers content)
───────────────────────────────────────────────────────── */
function addFooter(page, font, tid, num, total, rgb) {
  const { width } = page.getSize();
  const text     = `${tid} | Page ${num} of ${total}`;
  const fontSize = 10;
  const textWidth = font.widthOfTextAtSize(text, fontSize);
  const x = Math.max(20, (width - textWidth) / 2);
  const y = 18; // safe bottom margin

  page.drawText(text, {
    x,
    y,
    size: fontSize,
    font,
    color: rgb(0.48, 0.52, 0.58) // 10pt gray
  });
}

/* ─────────────────────────────────────────────────────────
   17. SEAL / SIGNATURE OVERLAY (Bonus 2)
───────────────────────────────────────────────────────── */
async function applySeal(doc, rgb) {
  try {
    const dataUrl = STATE.seal.dataUrl;
    const base64  = dataUrl.split(',')[1];
    const binStr  = atob(base64);
    const bytes   = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);

    let img;
    const isPng = dataUrl.startsWith('data:image/png');
    try   { img = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes); }
    catch { img = isPng ? await doc.embedJpg(bytes) : await doc.embedPng(bytes); }

    const pages = doc.getPages();
    STATE.seal.pages.forEach(idx => {
      const pg = pages[idx];
      if (!pg) return;
      const { width } = pg.getSize();
      // Overlay at bottom-right
      pg.drawImage(img, {
        x: width - 105,
        y: 32,
        width: 80,
        height: 80,
        opacity: 0.85
      });
    });
  } catch (e) {
    console.warn('[TPB] Seal application skipped:', e);
  }
}

function setupSealUI() {
  const input = q('#seal-input');
  if (!input) return;

  q('#seal-dz')?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = e => {
      STATE.seal = { dataUrl: e.target.result, pages: [] };
      const prev = q('#seal-preview');
      if (prev) {
        prev.src = e.target.result;
        prev.classList.remove('hidden');
      }
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
    .map(r => ({ req: r, file: STATE.files.find(f => f.id === STATE.matches[r.id]) }))
    .filter(i => i.file);

  if (!included.length) {
    wrap.innerHTML = `<span class="text-subtle text-xs">Match files first to select seal pages</span>`;
    return;
  }

  const lbl0 = document.createElement('label');
  lbl0.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;color:var(--text-subtle);margin-bottom:6px;font-weight:600';
  lbl0.textContent = t('sealPages');
  wrap.appendChild(lbl0);

  let pgIdx = 2; // page 0 = cover, page 1 = index
  included.forEach(({ req, file }) => {
    const pages = typeof file.pages === 'number' ? file.pages : 1;
    for (let p = 0; p < pages; p++) {
      const idx   = pgIdx++;
      const label = `${LANG === 'bn' ? req.title_bn : req.title_en} – p.${p + 1}`;
      const lbl   = document.createElement('label');
      lbl.style.cssText = 'display:flex;align-items:center;gap:6px;font-size:11px;cursor:pointer;padding:2px 0';
      lbl.innerHTML = `<input type="checkbox" value="${idx}"
        ${STATE.seal?.pages?.includes(idx) ? 'checked' : ''}
        style="accent-color:var(--accent);cursor:pointer"> ${esc(label)}`;

      lbl.querySelector('input').addEventListener('change', e => {
        if (!STATE.seal) return;
        if (e.target.checked) STATE.seal.pages.push(idx);
        else STATE.seal.pages = STATE.seal.pages.filter(x => x !== idx);
        autoSave();
      });
      wrap.appendChild(lbl);
    }
  });
}

/* ─────────────────────────────────────────────────────────
   18. EXPORT CHECKLIST AS CSV WITH UTF-8 BOM (Bonus 3)
───────────────────────────────────────────────────────── */
function exportCsv() {
  const BOM  = '\uFEFF';
  const hdrs = ['ID', 'Title EN', 'Title BN', 'Mandatory', 'Matched File', 'Pages', 'Expiry Date', 'Status'];
  const rows = STATE.requirements.map(req => {
    const f = STATE.files.find(x => x.id === STATE.matches[req.id]);
    return [
      req.id,
      req.title_en,
      req.title_bn,
      req.mandatory ? 'Yes' : 'No',
      f?.name || '',
      f?.pages || '',
      STATE.expiries[req.id] || '',
      docStatus(req)
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
  });

  const csvContent = BOM + [hdrs.join(','), ...rows].join('\r\n');
  dl(URL.createObjectURL(new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })),
     `tender-checklist-${STATE.tender?.tender_id || 'export'}.csv`);
  toast('success', t('tCsvOk'));
}

/* ─────────────────────────────────────────────────────────
   19. EXPORT & IMPORT PROJECT (Bonus 4)
───────────────────────────────────────────────────────── */
function exportProject() {
  const snap = {
    theme:        THEME,
    lang:         LANG,
    tender:       STATE.tender,
    requirements: STATE.requirements,
    filesMeta:    STATE.files.map(({ id, name, size, pages, hash, isDupe }) => ({
                    id, name, size, pages, hash, isDupe
                  })),
    matches:      STATE.matches,
    expiries:     STATE.expiries,
    sealPages:    STATE.seal?.pages || [],
    v:            2
  };
  dl(URL.createObjectURL(new Blob([JSON.stringify(snap, null, 2)], { type: 'application/json' })),
     `tpb-${STATE.tender?.tender_id || 'project'}.json`);
}

async function importProject(file) {
  if (!file) return;
  try {
    const snap = JSON.parse(await file.text());
    if (!snap?.tender) throw new Error('Not a valid TPB project file');

    STATE.tender       = snap.tender;
    STATE.requirements = snap.requirements || [];
    STATE.matches      = snap.matches      || {};
    STATE.expiries     = snap.expiries     || {};

    if (snap.lang)  applyLanguage(snap.lang);
    if (snap.theme) applyTheme(snap.theme);

    renderTenderDetails();
    renderDocList();
    renderFileList();
    updateStatus();

    toast('success', t('tImportOk'), snap.tender.tender_id);
  } catch (e) {
    toast('error', t('tImportErr'), e.message);
  }
}

/* ─────────────────────────────────────────────────────────
   20. FUZZY TOKEN AUTO-MATCH (Bonus 6)
───────────────────────────────────────────────────────── */
function autoMatch() {
  if (!STATE.files.length || !STATE.requirements.length) {
    toast('warning', t('tAutoNone'), 'Upload files and load requirements.json first');
    return;
  }

  const norm = s => String(s).toLowerCase().replace(/\.(pdf|png|jpg)$/i, '').replace(/[_\-\s.]+/g, ' ').trim();
  const toks = s => norm(s).split(' ').filter(w => w.length > 2);

  const score = (fn, title) => {
    const ft = toks(fn);
    const rt = toks(title);
    return rt.reduce((sum, r) => sum + ft.reduce((s, f) =>
      s + (f === r ? 3 : (f.includes(r) || r.includes(f)) ? 1.5 : 0), 0), 0);
  };

  const suggestions = {};
  const used = new Set(Object.values(STATE.matches));

  STATE.requirements.forEach(req => {
    if (STATE.matches[req.id]) return;
    let best = null, bestScore = 0;

    STATE.files.forEach(f => {
      if (used.has(f.id) || f.isDupe) return;
      const s = Math.max(score(f.name, req.title_en), score(f.name, req.title_bn));
      if (s > bestScore) {
        bestScore = s;
        best = f;
      }
    });

    if (best && bestScore >= 1.5) {
      suggestions[req.id] = best.id;
      used.add(best.id);
    }
  });

  const count = Object.keys(suggestions).length;
  if (!count) {
    toast('info', t('tAutoNone'));
    return;
  }

  if (confirm(`Auto-match found ${count} document suggestion(s). Apply matches?`)) {
    Object.assign(STATE.matches, suggestions);
    renderDocList();
    renderFileList();
    updateStatus();
    autoSave();
    toast('success', t('tAutoOk'), `${count} files matched`);
  }
}

/* ─────────────────────────────────────────────────────────
   21. RESET ALL
───────────────────────────────────────────────────────── */
function resetAll() {
  if (!confirm('Are you sure you want to reset everything? All matched files and entries will be cleared.')) return;

  Object.assign(STATE, {
    tender:       null,
    requirements: [],
    files:        [],
    matches:      {},
    expiries:     {},
    seal:         null
  });

  q('#tender-empty')?.classList.remove('hidden');
  q('#tender-grid')?.classList.add('hidden');
  const tb = q('#tender-badge');
  if (tb) {
    tb.textContent = t('notLoaded');
    tb.className   = 'badge badge-neutral no-dot';
  }

  q('#btn-download')?.classList.add('hidden');
  const prev = q('#seal-preview');
  if (prev) { prev.src = ''; prev.classList.add('hidden'); }
  const spw  = q('#seal-page-wrap');
  if (spw) spw.innerHTML = '';

  renderDocList();
  renderFileList();
  updateStatus();
  writeLS({ theme: THEME, lang: LANG });
  toast('info', t('tReset'));
}

/* ─────────────────────────────────────────────────────────
   22. AI ASSISTANT & READINESS AUDIT (Bonus 8)
───────────────────────────────────────────────────────── */
function setupAiAssistant() {
  const btnOpen  = q('#btn-ai-help');
  const modal    = q('#ai-modal');
  const btnClose = q('#btn-ai-close');
  const btnAudit = q('#btn-ai-audit');
  const box      = q('#ai-audit-result');
  const keyInput = q('#ai-api-key');
  const btnSave  = q('#btn-ai-save-key');

  if (!modal) return;

  btnOpen?.addEventListener('click', () => {
    modal.classList.remove('hidden');
    runAudit();
  });

  const closeModal = () => modal.classList.add('hidden');
  btnClose?.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  btnAudit?.addEventListener('click', runAudit);

  btnSave?.addEventListener('click', () => {
    const k = keyInput?.value.trim();
    if (k) {
      localStorage.setItem('tpb-ai-key', k);
      toast('success', 'API Key Stored', 'Live AI verification enabled');
    } else {
      localStorage.removeItem('tpb-ai-key');
      toast('info', 'Default Rule Engine Active');
    }
    runAudit();
  });

  function runAudit() {
    if (!box) return;
    if (!STATE.tender) {
      box.innerHTML = `<span class="text-danger">⚠️ No requirements.json loaded yet.</span> Load tender metadata to begin analysis.`;
      return;
    }

    const totalReq = STATE.requirements.length;
    const okReq    = STATE.requirements.filter(r => docStatus(r) === 'ok').length;
    const missing  = STATE.requirements.filter(r => docStatus(r) === 'missing');
    const expired  = STATE.requirements.filter(r => docStatus(r) === 'expired');
    const expNeed  = STATE.requirements.filter(r => docStatus(r) === 'expiry-needed');
    const dupes    = STATE.files.filter(f => f.isDupe);

    let html = `<strong>Compliance Readiness: ${okReq}/${totalReq} documents valid (${Math.round(okReq/totalReq*100)}%)</strong><br/><br/>`;

    if (missing.length) {
      html += `❌ <strong>Missing Mandatory (${missing.length}):</strong> ${missing.map(m => m.title_en).join(', ')}<br/>`;
    }
    if (expired.length) {
      html += `⚠️ <strong>Expired Documents (${expired.length}):</strong> ${expired.map(m => m.title_en).join(', ')}<br/>`;
    }
    if (expNeed.length) {
      html += `📅 <strong>Expiry Dates Required (${expNeed.length}):</strong> ${expNeed.map(m => m.title_en).join(', ')}<br/>`;
    }
    if (dupes.length) {
      html += `📎 <strong>Duplicate Files (${dupes.length}):</strong> ${dupes.map(d => d.name).join(', ')}<br/>`;
    }
    if (!missing.length && !expired.length && !expNeed.length) {
      html += `✅ <strong>All mandatory documents verified!</strong> Ready for combined PDF generation.<br/>`;
    }

    box.innerHTML = html;
  }
}

/* ─────────────────────────────────────────────────────────
   23. BOOTSTRAP & INITIALIZATION
───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Configure pdfjs worker if loaded
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.0/build/pdf.worker.min.js';
  }

  // Theme & Language toggles
  q('#btn-theme')?.addEventListener('click', () => applyTheme(THEME === 'dark' ? 'light' : 'dark'));
  q('#btn-lang')?.addEventListener('click',  () => applyLanguage(LANG === 'en' ? 'bn' : 'en'));

  // Dropzones
  setupDz(q('#json-dz'), q('#json-input'), handleJsonFiles);
  setupDz(q('#pdf-dz'),  q('#pdf-input'),  handlePdfFiles);

  // Seal upload
  setupSealUI();

  // Sidebar Actions
  q('#btn-generate') ?.addEventListener('click', generatePackage);
  q('#btn-automatch')?.addEventListener('click', autoMatch);
  q('#btn-csv')      ?.addEventListener('click', exportCsv);
  q('#btn-export')   ?.addEventListener('click', exportProject);
  q('#btn-reset')    ?.addEventListener('click', resetAll);
  q('#btn-import')   ?.addEventListener('click', () => q('#import-input')?.click());

  q('#import-input')?.addEventListener('change', e => {
    if (e.target.files?.[0]) importProject(e.target.files[0]);
    e.target.value = '';
  });

  // AI Assistant Modal
  setupAiAssistant();

  // Keyboard Shortcuts (Esc to close modals/toasts, R to reset)
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      q('#ai-modal')?.classList.add('hidden');
      qq('.toast').forEach(t => t.remove());
    } else if ((e.key === 'r' || e.key === 'R') && !['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      if (e.altKey || e.ctrlKey) {
        e.preventDefault();
        resetAll();
      }
    }
  });

  // Restore persistent state from localStorage
  const snap = readLS();
  if (snap.theme) applyTheme(snap.theme);   else applyTheme('dark');
  if (snap.lang)  applyLanguage(snap.lang);  else applyLanguage('en');

  if (snap.tender && Array.isArray(snap.requirements) && snap.requirements.length > 0) {
    STATE.tender       = snap.tender;
    STATE.requirements = snap.requirements;
    STATE.matches      = snap.matches  || {};
    STATE.expiries     = snap.expiries || {};

    renderTenderDetails();
    renderDocList();
    updateStatus();

    if (snap.filesMeta?.length) {
      toast('info', 'Previous session restored',
        'Re-upload your PDF files to re-enable package generation', 6000);
    }
  }
});
