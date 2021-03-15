// ----- page set up -----
// create references to relevant HTML ids
var timeEl = document.querySelector("#time-remaining");
var choicesEl = document.querySelector("#choices");

// ----- create array of questions for quiz -----
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

// function that creates a list element for each quiz answer option
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
};

createQuestionEl(questions[0]);
