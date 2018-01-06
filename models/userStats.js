module.exports = function(sequelize, DataTypes) {
    var Stats = sequelize.define("UserStats", {
      userId: {
        type: DataTypes.INTEGER
      },
      category: {
        type: DataTypes.STRING
      },
      gamesWon: {
        type: DataTypes.INTEGER
      },
      gamesPlayed: {
        type: DataTypes.INTEGER
      },
      perfectGames: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: false
    }
    );
    return Stats;
  };