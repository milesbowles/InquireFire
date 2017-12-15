module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("UserAuth", {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    },
    loggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  return User;
};