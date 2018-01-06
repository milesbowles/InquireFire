var db = require("../models");
var QuestionsAnswers = require("../db/questions.js");

/**This function will populate the Questions table */
function createQuestions(QuestionsAnswers){
    for (var i = 0; i < QuestionsAnswers.length; i++){
        db.Inquiry.create({
            q: QuestionsAnswers[i].q,
            answered: false,
            subcategory: QuestionsAnswers[i].subcategory,
            round: QuestionsAnswers[i].round,
        }).then(function(dbInquiry){
            console.log("yep");
        });
        db.sequelize.sync().then(function(){
            console.log("ready");
        });
    }
};
/**This function will populate the Answers table */
function createAnswers(QuestionsAnswers){
    for (var i = 0; i < QuestionsAnswers.length; i++){
        db.Choice.create({
            c1: QuestionsAnswers[i].c1,
            c2: QuestionsAnswers[i].c2,
            c3: QuestionsAnswers[i].c3,
            c4: QuestionsAnswers[i].c4,
            ans: QuestionsAnswers[i].ans
        }).then(function(dbChoice){
            console.log("ready");
        });
        db.sequelize.sync().then(function(){
            console.log("ready");
        });
    }
};
//createQuestions(QuestionsAnswers);

createAnswers(QuestionsAnswers);

// db.Inquiry.findAll({}).then(function(dbInquiry){
//     for (var i = 0; i < dbInquiry.length; i++){
//         console.log(dbInquiry[i].id + " " + dbInquiry[i].q + " " + dbInquiry[i].round);            
//     }
// });

// db.Choice.findAll({}).then(function(dbChoice){
//     for (var i = 0; i < dbChoice.length; i++){
//         console.log(dbChoice[i].id + " " + dbChoice[i].c1 + ", " + dbChoice[i].c2 + ", " + dbChoice[i].c3 + ", " + dbChoice[i].c4 + "... " + dbChoice[i].ans + " " + dbChoice[i].InquiryId);
//     }
// });

// db.Choice.update({
//     InquiryId: 10
// }, {
//     where: {
//         id: 10
//     }
// }).then(function(dbChoice){
//     console.log("ready");
// });