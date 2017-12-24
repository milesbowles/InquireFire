module.exports = function(sequelize, DataTypes){
    var Choice = sequelize.define("Choice", {
        c1: {
            type:DataTypes.STRING
        },
        c2: {
            type:DataTypes.STRING
        },
        c3: {
            type:DataTypes.STRING
        },
        c4: {
            type:DataTypes.STRING
        },
        ans: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
    Choice.associate = function(models){
        Choice.belongsTo(models.Inquiry, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Choice;
};