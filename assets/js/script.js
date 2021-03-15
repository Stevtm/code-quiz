// ----- page set up -----
// create references to relevant HTML ids
var timeEl = document.querySelector("#time-remaining");
var choicesEl = document.querySelector("#choices");

// ----- create array of questions for quiz -----
var questions = [
	{
		question: "Arrays in JavaScript can be used to store which data types?",
		1: "Strings",
		2: "Numbers",
		3: "Booleans",
		4: "All of the above",
		correct: 4,
	},
	{
		question: "Which of the following is not a data type in JavaScript?",
		1: "string",
		2: "object",
		3: "int",
		4: "number",
		correct: 3,
	},
	{
		question: "",
		a1: "Strings",
		a2: "Numbers",
		a3: "Booleans",
		a4: "All of the above",
		correct: "a4",
	},
];
