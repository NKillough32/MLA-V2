const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '..', 'static', 'js', 'data', 'coreConditions.js');
if (!fs.existsSync(p)) {
  console.error('File not found:', p);
  process.exit(2);
}

let s = fs.readFileSync(p, 'utf8');

// Remove UTF-8 BOM if present
s = s.replace(/^\uFEFF/, '');

// Normalize common “smart” quotes to ASCII
s = s.replace(/[\u2018\u2019\u201A\u201B]/g, "'")
     .replace(/[\u201C\u201D\u201E\u201F]/g, '"');

// Remove other non-printable / non-UTF8-friendly control characters
// Keep common whitespace and printable Unicode (preserve accents etc.) by removing C0 controls except tab/newline/carriage-return
s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');

fs.writeFileSync(p, s, 'utf8');
console.log('Cleaned:', p);
