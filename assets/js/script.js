// ----- script set up -----
// create references to relevant HTML ids
var headerEl = document.querySelector("header");
var titleEl = document.querySelector("#title");
var timeEl = document.querySelector("#time-remaining");
var questionEl = document.querySelector("#question");
var highScoresEl = document.querySelector("#high-scores");
var scoreInputEl = document.querySelector("#score-input");
var startEl = document.querySelector("#start-button");
var choicesEl = document.querySelector("#choices");

// pull high scores from localStorage and store them in an array
var highScores = JSON.parse(localStorage.getItem("highScores"));

// if there is nothing in localstorage, create an empty array
if (!highScores) {
	highScores = [];
}

// declare time variable starting at 45 seconds
var timeRemaining = 45;

// declare counter that tracks the user score (correct answer: +1 score)
var score = 0;

// declare counter that tracks the current position in the questions array
var questionCounter = 0;

// ----- create array of randomized questions for quiz -----
// declare array with questions & answers (unshuffled)
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

// shuffle the array
questions = questions.sort(function () {
	return Math.random() - 0.5;
});

// ----- functions that execute when the quiz starts -----

// function that displays the first question and replaces the opening screen text
var createQuestionEl = function (questionObj) {
	// create array of only the options
	var options = [questionObj.a, questionObj.b, questionObj.c, questionObj.d];

	// --- create list item for each of the answer options ---
	for (var i = 0; i < options.length; i++) {
		// create list item and apply bootstrap styling
		var listItemEl = document.createElement("li");
		listItemEl.className = "btn btn-secondary";

		// add answer id (the array index + 1) as a custom attribute
		listItemEl.setAttribute("answer-id", i + 1);

		// add question content
		listItemEl.textContent = options[i];

		// append the list item to the unordered list
		choicesEl.appendChild(listItemEl);
	}

	// remove the start button from the DOM
	startEl.remove();

	// replace the h2 element content with the question
	questionEl.textContent = questionObj.question;
};

// timer function that counts down 45 seconds
var countdown = function () {
	var timeInterval = setInterval(function () {
		// check if the quiz has already been ended by all questions being answered
		if (questionCounter < questions.length) {
			// check if the quiz time has expired
			if (timeRemaining > 1) {
				// if the time has not expired, decrement the counter and update the DOM
				timeRemaining--;
				timeEl.textContent = timeRemaining + "s";
			} else {
				// if the time has expired, clear the interval and end the game
				alert("You ran out of time!");
				clearInterval(timeInterval);
				timeEl.textContent = "0s";
				endGame();
			}
		} else {
			// if the quiz has been ended by all questions being entered, the endGame function will be called by the choicesEl event listener. Clear the interval.
			clearInterval(timeInterval);
			timeEl.textContent = "0s";
		}
	}, 1000);
};

// click listener for quiz start
startEl.addEventListener("click", function () {
	// start the timer
	countdown();

	// display the first quiz question
	createQuestionEl(questions[0]);
});

// ----- functions that execute when the game is being played -----

// function that compares the clicked response to the correct answer
var checkCorrect = function (id, questionObj) {
	if (id === questionObj.correct) {
		// increase score by 1 for the correct answer
		score++;
		alert("You've picked the correct response!");
	} else {
		// decrese time remaining by 10s for wrong answer
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

// ----- click to listen for quiz responses -----
choicesEl.addEventListener("click", function (event) {
	var target = event.target;

	// if the click was not on one of the <li> elements, return from the function
	if (target.getAttribute("answer-id") === null) {
		return;
	}

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

// ----- functions that execute when the quiz is completed

// game-end function that opens the high score recording page
var endGame = function () {
	// alert the user that the game is over and tell them their score
	alert(`The quiz is over! Your score was ${score}`);

	// remove the header section and <ul> from the DOM
	headerEl.remove();
	choicesEl.remove();

	titleEl.style.marginTop = "78px";

	// replace the h2 element content with a score saving prompt
	questionEl.textContent =
		"The game is over! Please enter your name to record your score.";

	// create a form element and submit button for the player to record their name
	var formEl = document.createElement("input");
	var submitEl = document.createElement("button");
	submitEl.setAttribute("type", "submit");
	submitEl.className = "score-btn btn btn-primary";
	submitEl.textContent = "Submit";

	// append the form and submit button to the score input div
	scoreInputEl.appendChild(formEl);
	scoreInputEl.appendChild(submitEl);

	// push the player name and score to localStorage when the "submit" button is pressed
	submitEl.addEventListener("click", function () {
		getPlayerName(formEl, submitEl);
	});
};

// function that gets the player's name from the input field
var getPlayerName = function (formEl, buttonEl) {
	// get the player's name from the form
	var playerName = formEl.value;

	// check if the form is blank
	if (playerName === "") {
		alert("Please enter your name!");
	} else {
		// push the player's name and the score to localStorage
		recordScore(playerName);

		// remove the submit button and form
		buttonEl.remove();
		formEl.remove();

		// show the high scores
		showHighScores();
	}
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
	// create a row for each of the highscores and display #, name & score
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

		// append table elements to the table row
		tableEl.appendChild(tableIndexEl);
		tableEl.appendChild(tableNameEl);
		tableEl.appendChild(tableScoreEl);

		// append the table row to the table body
		tableBodyEl.appendChild(tableEl);
	}

	// append the entire table body to the table element
	highScoresEl.appendChild(tableBodyEl);
};

// function that shows high scores
var showHighScores = function () {
	// change the content of the h1 element and remove h2 element
	titleEl.textContent = "High Scores";
	questionEl.remove();

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
