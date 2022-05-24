const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

fs.readFile(path.join(__dirname, 'text.txt'), (err, data) => {
  process.stdout.write(data);
});