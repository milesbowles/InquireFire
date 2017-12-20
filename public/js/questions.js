$('#quiz').quiz({
    //resultsScreen: '#results-screen',
    //counter: false,
    //homeButton: '#custom-home',
    counterFormat: 'Question %current of %total',
    questions: [
      {
        'q': 'Which of these is a chemical element?',
        'options': [
          'Carbon',
          'Water',
          'Table Salt',
          'Air'

        ],
        'correctIndex': 0,
        'correctResponse': 'Good job!',
        'incorrectResponse': 'The correct answer is Carbon.'
      },
      {
        'q': 'Which is a molecule?',
        'options': [
          'Carbon',
          'Hydrogen',
          'Water',
          'Air'
        ],
        'correctIndex': 2,
        'correctResponse': 'Correct! Water is made up of Hydrogen and Oxygen.',
        'incorrectResponse': 'Oops.. The correct answer is water.'
      }
    ]
  });