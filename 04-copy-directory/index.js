const path = require('node:path');
const fs = require('node:fs');

const dir = 'files';
const from = path.join(__dirname, dir);
const to = path.join(__dirname, dir + '-copy');

fs.rm(to, {recursive: true},() => {
  fs.mkdir(to, () => {
    fs.readdir(from, {withFileTypes: true}, (err, files) =>
      files.filter(file => file.isFile())
        .map(file => file.name)
        .forEach(name =>
          fs.copyFile(path.join(from, name), path.join(to, name), fs.constants.COPYFILE_FICLONE, () => {
          }))
    );
  });
});