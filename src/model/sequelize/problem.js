module.exports = function(Sequelize, sequelize) {
  return sequelize.define(
    'Problem',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      resolved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      memo: {
        type: Sequelize.TEXT
      }
    },
    {
      indexes: [
        {
          fields: ['user_id']
        }
      ]
    }
  )
}
