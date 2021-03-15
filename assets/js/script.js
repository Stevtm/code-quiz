// ----- page set up -----
// create references to relevant HTML ids
var titleEl = document.querySelector("#title");
var timeEl = document.querySelector("#time-remaining");
var questionEl = document.querySelector("#question");
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
];

console.log(questions);

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

// ----- click to initiate quiz -----
startEl.addEventListener("click", function () {
	createQuestionEl(questions[0]);
});
