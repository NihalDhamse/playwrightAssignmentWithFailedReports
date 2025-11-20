const fs = require('fs');
const path = require('path');


const OUT_DIR = path.join(__dirname, '..', 'artifacts');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });


module.exports = {
writeJson: (name, obj) => {
const p = path.join(OUT_DIR, name);
fs.writeFileSync(p, JSON.stringify(obj, null, 2));
return p;
},
readJson: (name) => {
const p = path.join(OUT_DIR, name);
return JSON.parse(fs.readFileSync(p, 'utf8'));
},
writeBinary: (name, buffer) => {
const p = path.join(OUT_DIR, name);
require('fs').writeFileSync(p, buffer);
return p;
},
OUT_DIR
};