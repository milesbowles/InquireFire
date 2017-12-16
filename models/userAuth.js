module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("UserAuth", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    loggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    timestamps: false
  }
  );
  return User;
};