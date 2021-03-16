// ----- page set up -----
// create references to relevant HTML ids
var headerEl = document.querySelector("header");
var titleEl = document.querySelector("#title");
var timeEl = document.querySelector("#time-remaining");
var questionEl = document.querySelector("#question");
var scoreInputEl = document.querySelector("#score-input");
var startEl = document.querySelector("#start-button");
var choicesEl = document.querySelector("#choices");

// ----- create array of questions for quiz -----
// TO DO: SHUFFLE THIS ARRAY SO THE ORDER IS DIFFERENT EVERY TIME
var questions = [
	{
		question: "Arrays in JavaScript can be used to store which data types?",
		a: "Strings",
		b: "Numbers",
		c: "Booleans",
		d: "All of the above",
		correct: 4,
	},
	{
		question: "Which of the following is not a data type in JavaScript?",
		a: "string",
		b: "object",
		c: "int",
		d: "number",
		correct: 3,
	},
	{
		question: "Arrays in JavaScript can be used to store which data types?",
		a: "Strings",
		b: "Numbers",
		c: "Booleans",
		d: "All of the above",
		correct: 4,
	},
	{
		question: "Which of the following is not a data type in JavaScript?",
		a: "string",
		b: "object",
		c: "int",
		d: "number",
		correct: 3,
	},
];

// create a counter that tracks the current position in the questions array
var questionCounter = 0;

// create a counter that tracks the user score (correct answer: +1 score)
var score = 0;

// ----- functions that manipulate the DOM -----

// function that displays the first question and replaces the existing screen text
var createQuestionEl = function (questionObj) {
	// --- perform for each of the 4 options ---
	// create array of only the options
	var options = [questionObj.a, questionObj.b, questionObj.c, questionObj.d];

	// create a list item for each of the 4 options
	for (var i = 0; i < options.length; i++) {
		// create list item
		var listItemEl = document.createElement("li");
		listItemEl.className = "answer-option";

		// add the answer id (the array index + 1) as a custom attribute
		listItemEl.setAttribute("answer-id", i + 1);

		// add the question content
		listItemEl.textContent = options[i];

		// append the list item to the unordered list
		choicesEl.appendChild(listItemEl);
	}

	// remove the page header and the start button from the DOM
	titleEl.remove();
	startEl.remove();

	// replace the h2 element content with the question
	questionEl.textContent = questionObj.question;
};

// function that compares the clicked response to the correct answer
var checkCorrect = function (id, questionObj) {
	console.log(questionObj.correct);
	if (id === questionObj.correct) {
		// increase score by 1 for the correct answer
		score++;
		alert("You've picked the correct response!");
	} else {
		alert("That's the wrong answer!");
	}
};

// function that replaces the current question with the next question
var replaceQuestion = function (questionObj) {
	// declare local variables for each relevant element
	var a = document.querySelector("[answer-id='1']");
	var b = document.querySelector("[answer-id='2']");
	var c = document.querySelector("[answer-id='3']");
	var d = document.querySelector("[answer-id='4']");

	// replace the question text
	questionEl.textContent = questionObj.question;

	// replace the answer options text
	a.textContent = questionObj.a;
	b.textContent = questionObj.b;
	c.textContent = questionObj.c;
	d.textContent = questionObj.d;
};

// timer function that counts down 1 minute
var countdown = function () {
	// declare time variable starting at 60 seconds
	var timeRemaining = 60;

	var timeInterval = setInterval(function () {
		// check if the quiz has already been ended by all questions being answered
		if (questionCounter < questions.length) {
			// check if the quiz time has expired
			if (timeRemaining > 1) {
				timeRemaining--;
				timeEl.textContent = timeRemaining + "s";
			} else {
				clearInterval(timeInterval);
				timeEl.textContent = "0s";
				endGame();
			}
		} else {
			clearInterval(timeInterval);
			timeEl.textContent = "0s";
		}
	}, 1000);
};

// game-end function that opens the high score recording page
var endGame = function () {
	// alert the user that the game is over and tell them their score
	alert(`The quiz is over! Your score was ${score}`);

	// remove the header section and ul from the DOM
	headerEl.remove();
	choicesEl.remove();

	// replace the h2 element content with a score saving prompt
	questionEl.textContent =
		"The game is over! Please enter your name to record your score.";

	// create a form element and submit button for the player to record their name
	var formEl = document.createElement("input");
	var submitEl = document.createElement("button");
	submitEl.setAttribute("type", "submit");
	submitEl.textContent = "Submit";

	scoreInputEl.appendChild(formEl);
	scoreInputEl.appendChild(submitEl);
};

// ----- click to initiate quiz -----
startEl.addEventListener("click", function () {
	// start the timer
	countdown();

	// display the first quiz question
	createQuestionEl(questions[0]);
});

// ----- click to listen for quiz responses -----
choicesEl.addEventListener("click", function (event) {
	// get the user response to a question and save as int
	var id = parseInt(event.target.getAttribute("answer-id"));

	// check that the response is correct with the checkCorrect function
	checkCorrect(id, questions[questionCounter]);

	// increase the question counter to the next array iteration
	questionCounter++;

	// if there are remaining questions in the array, display the next question
	if (questionCounter < questions.length) {
		replaceQuestion(questions[questionCounter]);
	} // if there are no remaining questions in the array, end the quiz
	else {
		endGame();
	}
});
