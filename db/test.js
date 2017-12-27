var db = require("../models");
// db.Inquiry.create({
//     q: "Inertia is the..",
//     subcategory: "physics",
//     round: 1
// }).then(function(dbInquiry){
//     dbInquiry
// });
// db.sequelize.sync().then(function(){
//     console.log("redy");
// });

// db.Choice.create({
//     c1: "weight of object",
//     c2: "momentum of object",
//     c3: "resistance to movement",
//     c4: "distance from earth to moon",
//     ans: "resistance to movement",
//     InquiryId: 21
// }).then(function(dbChoice){
//     console.log(dbChoice);
// });



// db.Inquiry.findAll({}).then(function(dbInquiry){
//    console.log(dbInquiry);
// }); 

db.Choice.findAll({}).then(function(dbChoice){
    console.log(dbChoice);
});


// db.sequelize.sync().then(function(){
//     console.log("ready");
// });


// db.Choice.findAll({
//     include: [db.Inquiry]
// }).then(function(dbInquiry){
//         console.log(dbInquiry);
// });