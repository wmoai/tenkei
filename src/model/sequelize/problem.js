module.exports = function(Sequelize, sequelize) {
  return sequelize.define('Problem', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    resolved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue; false
    }
  })
}
