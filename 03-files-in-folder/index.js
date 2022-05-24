const fs = require('node:fs/promises');
const path = require('node:path');

const dir = path.join(__dirname, 'secret-folder');
fs.readdir(dir, {withFileTypes: true})
  .then((value) => value
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)
    .forEach(name => {
      const ext = path.extname(name);
      const base = path.basename(name, ext);
      fs.stat(path.join(dir, name))
        .then(value => {
          console.log([base, ext.substring(1), value.size + ' bytes'].join(' - '));
        });
    })
  );