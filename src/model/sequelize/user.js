module.exports = function(Sequelize, sequelize) {
  return sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mail: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    solt: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })
}
