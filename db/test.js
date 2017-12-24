var db = require("../models");
// db.Inquiry.create({
//     q: "In nuclear equations, a helium particle is referred to as a(n) __",
//     subcategory: "chemistry",
//     round: 3
// }).then(function(dbInquiry){
//     dbInquiry
// });
// db.sequelize.sync().then(function(){
//     console.log("redy");
// });

db.Choice.create({
    c1: "positron",
    c2: "gamma particle",
    c3: "beta particle",
    c4: "alpha particle",
    ans: "alpha particle",
    InquiryId: 8
}).then(function(dbChoice){
    console.log(dbChoice);
});



// db.Inquiry.findAll({}).then(function(dbInquiry){
//    console.log(dbInquiry);
// }); 

// db.Choice.findAll({
    
// }).then(function(dbChoice){
//     console.log(dbChoice);
// });


// db.sequelize.sync().then(function(){
//     console.log("ready");
// });


// db.Inquiry.findAll({
//     include: [db.Choice]
// }).then(function(dbInquiry){
//     for (var i = 0; i < dbInquiry.length; i++){
//         for (var k = 0; k < dbInquiry[i].Choices.length; k++){
//             console.log(dbInquiry[i].Choices[k]);
//         }
//     }
// });