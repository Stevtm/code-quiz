// create references to relevant HTML ids
var highScoresEl = document.querySelector("#high-scores");

// pull high scores from localStorage and store them in an array
var highScores = JSON.parse(localStorage.getItem("highScores"));

// function that shows high scores
var showHighScores = function () {
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

// function that generates the leaderboard
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

// if there are highscores in local storage, show them
if (highScores) {
	showHighScores();
}
// if there are no highscores in local storage, show a message
else {
	highScoresEl.innerHTML =
		"<h2>There are no high scores yet! Take the quiz to see what score you get!";
}
