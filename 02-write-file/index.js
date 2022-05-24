const fs = require('node:fs');
const process = require('node:process');
const path = require('node:path');

const writer = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
  flags: 'w+'
});

process.stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    process.exit();
  } else
    writer.write(chunk);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  process.stdout.write('Closing the application.');
});

process.stdout.write('Hi, waiting for input.\n');
