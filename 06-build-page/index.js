const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

const dist = path.join(__dirname, 'project-dist');
fs.mkdir(dist, () => {
  fsp.readFile(path.join(__dirname, 'template.html')).then(async data => {
    let value = data.toString();

    const matches = value.matchAll(/{{(.+)}}/g);
    for (let [match, name] of matches) {
      await fsp.readFile(path.join(__dirname, 'components', name + '.html')).then(data => {
        value = value.replaceAll(match, data.toString());
      });
    }

    await fsp.writeFile(path.join(dist, 'index.html'), value);
  });

  const styles = path.join(__dirname, 'styles');
  fs.readdir(styles, (err, files) => {
    const writer = fs.createWriteStream(path.join(dist, 'style.css'), {flags: 'w+'});
    files.filter(file => path.extname(file) === '.css')
      .forEach(file => {
        fs.readFile(path.join(styles, file), (err, data) => {
          writer.write(data);
        });
      });
  });

  const assets = path.join(__dirname, 'assets');
  const assetsDist = path.join(dist, 'assets');
  function readdir(dir = '') {
    const absolute = path.join(assets, dir);
    const absoluteDist = path.join(assetsDist, dir);

    fs.mkdir(absoluteDist, () => {
      fs.readdir(absolute, {withFileTypes: true},
        (err, files) => {
          for (let file of files) {
            const relative = path.join(dir, file.name);
            if (file.isDirectory())
              readdir(relative);
            else
              fs.copyFile(path.join(absolute, file.name), path.join(absoluteDist, file.name),
                fs.constants.COPYFILE_FICLONE, () => {});
          }
        });
    });
  }

  readdir();
});
