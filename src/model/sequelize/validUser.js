module.exports = function(Sequelize, sequelize) {
  return sequelize.define('ValidUser', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
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
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    timestamps: false
  });
}
