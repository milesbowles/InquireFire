module.exports = function(sequelize, DataTypes){
    var Inquiry = sequelize.define("Inquiry", {
        q: {
            type: DataTypes.STRING
        },
        answered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        subcategory: {
            type: DataTypes.STRING
        },
        round: {
            type: DataTypes.INTEGER
        }
    },{
        timestamps: false
    });
    return Inquiry;
};