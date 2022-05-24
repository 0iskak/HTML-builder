const fs = require('node:fs');
const path = require('node:path');

const dir = path.join(__dirname, 'styles');
const writer = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), {flags: 'w+'});

fs.readdir(dir, (err, files) =>
  files.filter(file => path.extname(file) === '.css')
    .forEach(file => {
      fs.readFile(path.join(dir, file), (err, data) => {
        writer.write(data);
      });
    })
);