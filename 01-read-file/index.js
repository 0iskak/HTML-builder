const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

fs.createReadStream(path.join(__dirname, 'text.txt')).pipe(process.stdout);