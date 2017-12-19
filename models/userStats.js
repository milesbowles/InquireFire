module.exports = function(sequelize, DataTypes) {
    var Stats = sequelize.define("UserStats", {
      gamesWon: {
        type: DataTypes.INTEGER,
      },
      gamesPlayed: {
        type: DataTypes.INTEGER
      },
      highScoreMulti: {
        type: DataTypes.INTEGER
      },
      highScoreSingle: {
        type: DataTypes.INTEGER
      },
      categoryMulti: {
        type: DataTypes.STRING
      },
      categorySingle: {
          type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
    );
    return Stats;
  };