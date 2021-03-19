// ----- page set up -----
// create references to relevant HTML ids
var headerEl = document.querySelector("header");
var titleEl = document.querySelector("#title");
var timeEl = document.querySelector("#time-remaining");
var questionEl = document.querySelector("#question");
var highScoresEl = document.querySelector("#high-scores");
var scoreInputEl = document.querySelector("#score-input");
var startEl = document.querySelector("#start-button");
var choicesEl = document.querySelector("#choices");

// create array of high scores and pull existing data from localStorage
var highScores = localStorage.getItem("highScores");

if (!highScores) {
	highScores = [];
} else {
	highScores = JSON.parse(highScores);
}

// declare time variable starting at 60 seconds
var timeRemaining = 60;

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
		question: "Which of the following is NOT a data type in JavaScript?",
		a: "string",
		b: "object",
		c: "int",
		d: "number",
		correct: 3,
	},
	{
		question: "Which of the following is NOT a loop type in JavaScript?",
		a: "for",
		b: "else",
		c: "since",
		d: "if",
		correct: 3,
	},
	{
		question:
			"Which type of variables can be accessed anywhere in the JavaScript file?",
		a: "Local variables",
		b: "Scoped variables",
		c: "Global variables",
		d: "All of the above",
		correct: 3,
	},
	{
		question:
			"Which of the following is NOT a method that can be called from the document object?",
		a: "createElement()",
		b: "Math()",
		c: "prompt()",
		d: "alert()",
		correct: 2,
	},
	{
		question: "Which method will return the length of an array?",
		a: "array.length",
		b: "length(array)",
		c: "array[length]",
		d: "array.length()",
		correct: 1,
	},
	{
		question: "Which two parameters does the setInterval method require?",
		a: "function, function",
		b: "function, time in milliseconds",
		c: "function, time in seconds",
		d: "time in milliseconds, function",
		correct: 2,
	},
	{
		question: "What is the file extension for a JavaScript file?",
		a: ".javascript",
		b: ".java",
		c: ".script",
		d: ".js",
		correct: 4,
	},
	{
		question:
			"Where should a JavaScript file preferably be linked in an HTML file?",
		a: "In the <head> element",
		b: "At the end of the <body> element",
		c: "At the beginning of the <body> element",
		d: "The JavaScript file will link automatically",
		correct: 2,
	},
	{
		question: "Which quote type is used to contain a string?",
		a: "Single quotes ('')",
		b: 'Double quotes ("")',
		c: "Either single OR double quotes",
		d: "A string is not contained by quotes",
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
		listItemEl.className = "btn btn-secondary";

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
		timeRemaining -= 10;
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
	submitEl.className = "score-btn btn btn-primary";
	submitEl.textContent = "Submit";

	scoreInputEl.appendChild(formEl);
	scoreInputEl.appendChild(submitEl);

	// add a listener for the submit button being clicked
	submitEl.addEventListener("click", function () {
		// get the player's name from the form element
		var playerName = formEl.value;

		// push the player's name and the score to localStorage
		recordScore(playerName);

		// remove the submit button and form
		submitEl.remove();
		formEl.remove();

		// show the high scores
		showHighScores();
	});
};

// function that records the user high score
var recordScore = function (playerName) {
	// push the player name and score to the highScores array as an object
	highScores.push({
		name: playerName,
		score: score,
	});

	// push the highScores array (in JSON) to localStorage
	localStorage.setItem("highScores", JSON.stringify(highScores));
};

// function that shows high scores
var showHighScores = function () {
	// change the content of the h2 element
	question.textContent = "High Scores";

	// declare and populate an array with the top 5 scores
	var topScores = highScores;

	// sort the topScores array in descending order
	topScores.sort(function (a, b) {
		return b.score - a.score;
	});

	// slice the topScores array to include only the top 5 scores
	topScores = topScores.slice(0, 5);

	// insert table onto DOM
	createHighScoreTable(topScores);
};

// function that inserts a table of high scores
var createHighScoreTable = function (topScores) {
	// create the table header and append to table element
	var tableHeaderEl = document.createElement("thead");
	var tableHeaderRowEl = document.createElement("tr");
	tableHeaderRowEl.innerHTML =
		"<th scope='col'>#</th> <th scope='col'>Player Name</th> <th scope='col'>Score</th>";
	tableHeaderEl.appendChild(tableHeaderRowEl);
	highScoresEl.appendChild(tableHeaderEl);

	// create table body element
	var tableBodyEl = document.createElement("tbody");
	// create a row for each of the highscores
	for (var i = 0; i < topScores.length; i++) {
		// create a tr and td elements
		var tableEl = document.createElement("tr");
		var tableIndexEl = document.createElement("th");
		tableIndexEl.setAttribute("scope", "row");
		var tableNameEl = document.createElement("td");
		var tableScoreEl = document.createElement("td");

		tableIndexEl.textContent = (i + 1).toString();
		tableNameEl.textContent = topScores[i].name;
		tableScoreEl.textContent = topScores[i].score;

		tableEl.appendChild(tableIndexEl);
		tableEl.appendChild(tableNameEl);
		tableEl.appendChild(tableScoreEl);

		tableBodyEl.appendChild(tableEl);
	}

	highScoresEl.appendChild(tableBodyEl);
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
