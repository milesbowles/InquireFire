var initQuestionsArr = $('#questions').html().split(';')
$('#questions').remove()
for (var i = 0; i < initQuestionsArr.length; i++) {
  initQuestionsArr[i] = initQuestionsArr[i].split(',')
}
var parsedQuestionsArr = []
for (var i = 0; i < initQuestionsArr.length; i++) {
  parsedQuestionsArr[i] = {}
  parsedQuestionsArr[i].q = initQuestionsArr[i][1]
  parsedQuestionsArr[i].options = [initQuestionsArr[i][3],initQuestionsArr[i][4],initQuestionsArr[i][5],initQuestionsArr[i][6]]
  for (var j = 0; j < parsedQuestionsArr[i].options.length; j++) {
    if (parsedQuestionsArr[i].options[j]===initQuestionsArr[i][7]) {
      parsedQuestionsArr[i].correctIndex = j
      parsedQuestionsArr[i].correctResponse = 'Good Job!'
      parsedQuestionsArr[i].incorrectResponse = 'The correct answer is '+initQuestionsArr[i][7]+'!'
    }
  }
}
$('#quiz').quiz({
    //resultsScreen: '#results-screen',
    //counter: false,
    //homeButton: '#custom-home',
    counterFormat: 'Question %current of %total',
    questions: parsedQuestionsArr
  });

//Code below is for local testing
//############################################################################


// $('#quiz').quiz({
//   //resultsScreen: '#results-screen',
//   //counter: false,
//   //homeButton: '#custom-home',
//   counterFormat: 'Question %current of %total',
//   questions: [
//     {
//       'q': 'Which of these is a chemical element?',
//       'options': [
//         'Carbon',
//         'Water',
//         'Table Salt',
//         'Air'

//       ],
//       'correctIndex': 0,
//       'correctResponse': 'Good job!',
//       'incorrectResponse': 'The correct answer is Carbon.'
//     },
//     {
//       'q': 'Which is a molecule?',
//       'options': [
//         'Carbon',
//         'Hydrogen',
//         'Water',
//         'Air'
//       ],
//       'correctIndex': 2,
//       'correctResponse': 'Correct! Water is made up of Hydrogen and Oxygen.',
//       'incorrectResponse': 'Oops.. The correct answer is water.'
//     }
//   ]
// });