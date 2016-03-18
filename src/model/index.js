import fs from 'fs';
import Sequelize from 'sequelize';
import config from '../../config/db.json';
export const sequelize = new Sequelize(config.db, config.user, config.password, {
  timezone: "+09:00"
})

fs.readdirSync(__dirname + '/sequelize').forEach(function(filename) {
  if (/\.js$/.test(filename)) {
    var name = filename.substr(0, filename.lastIndexOf('.'));
    var Model = require('./sequelize/' + name)(Sequelize, sequelize)
    exports.__defineGetter__(name, function() {
      return Model
    });
  }
});

sequelize.sync()
