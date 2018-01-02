var db = require("../models");
/** To create a new element on the questions table */
// db.Inquiry.update({
//     q: "Assuming no air resistance, what is the final speed of an object dropped from 3 meters?",
//     subcategory: "physics",
//     round: 2
// }, {
//     where: {
//         id: 22
//     }
// }).then(function(dbInquiry){
//     dbInquiry
// });
// db.sequelize.sync().then(function(){
//     console.log("redy");
// });


/** To create a new element on the multiple choices table */
// db.Choice.update({
//     c1: "59 m/s",
//     c2: "7.7 m/s",
//     c3: "98 m/s",
//     c4: "none of the above",
//     ans: "7.7 m/s",
//     InquiryId: 22
// }, {
//     where: {
//         id: 22
//     }
// }).then(function(dbChoice){
//     console.log(dbChoice);
// });


//** Code to find the questions from the questions table */
db.Inquiry.findAll({}).then(function(dbInquiry){
   for (var i = 0; i < dbInquiry.length; i++){
       console.log(dbInquiry[i].id + " " + dbInquiry[i].q + " " + dbInquiry[i].round);
   }
}); 
/** Code to find the choices embedded in the multiple choices table */
// db.Choice.findAll({}).then(function(dbChoice){
//     for (var i = 0; i < dbChoice.length; i++){
//         console.log(dbChoice[i].id + ": " + dbChoice[i].c1 + ", " + dbChoice[i].c2 + ", " + dbChoice[i].c3 + ", " + dbChoice[i].c4 + ", " + dbChoice[i].ans);
//     }
// });


// db.sequelize.sync().then(function(){
//     console.log("ready");
// });


// db.Choice.findAll({
//     include: [db.Inquiry]
// }).then(function(dbInquiry){
//         console.log(dbInquiry);
// });