var QnA = require("./questionSet-up.js");
var mathQuestions = [
    {q: QnA("Which of these is a prime number?", "2", "4", "9", "12", "2")},
    {q: QnA("Which is a rational number?", "pi", "8/3", "e", "pi^2", "8/3")},
    {q: QnA("Which is an even number?", "1", "5", "7", "10", "10")}
];

module.exports = mathQuestions;