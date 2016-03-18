import fs from 'fs';

fs.readdirSync(__dirname + '/routes').forEach((filename) => {
  if (/\.js$/.test(filename)) {
    const name = filename.substr(0, filename.lastIndexOf('.'));
    exports.__defineGetter__(name, function() {
      return require('./routes/' + name)
    });
  }
});
