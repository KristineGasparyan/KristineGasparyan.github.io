var size;
var sequent;
function createTable(){
	var butt = document.getElementById("a");
	butt.href = "XO.html";

	var levDiv = document.getElementById("levelDiv");
	levDiv.style.display = "none";

	size = document.getElementById("input").value;


	var turn = document.createElement("div");
	turn.id = "turn1";
	document.body.appendChild(turn);
	turn.innerHTML = "TIC TAC TOE";

	var table = document.createElement("table");
	table.id = "tbl";
	document.body.appendChild(table);

	var startGame = document.createElement("button");
	startGame.id = "startGame";
	document.body.appendChild(startGame);
	startGame.innerHTML = "REPLAY";
	startGame.onclick = clearMatrix;

	for (var i=0; i<size; i++){
		var row = document.createElement("tr");
		for(var j=0;j<size;j++){
			var cell = document.createElement("td");
			row.appendChild(cell);
			var button = document.createElement("button");
			cell.appendChild(button);
			button.className = "button";
			button.onclick = onButtonClick;
			if(size==5) {
				button.style.height = "110px";
				button.style.width = "110px";
				button.style.fontSize = "40px";
			} 
			if(size==6) {
				button.style.height = "100px";
				button.style.width = "100px";
				button.style.fontSize = "35px";
			}
			if(size==7) {
				button.style.height = "90px";
				button.style.width = "90px";
				button.style.fontSize = "30px";
			}
			if(size==8) {
				button.style.height = "80px";
				button.style.width = "80px";
				button.style.fontSize = "25px";
			}
		table.appendChild(row);
	}
}

}

var lastClick = "O";

function onButtonClick(){	
	var turnButt = document.getElementById("turn1");
	if(this.innerHTML != ""){
		return;
	}
	if(lastClick == "X") {
		this.innerHTML = "O";
		lastClick = "O";
		turnButt.innerHTML = "X TURN NOW";
	}
	else{
		this.innerHTML = "X";
		lastClick = "X";
		turnButt.innerHTML = "O TURN NOW";
	}
	checkGame();
	
}

function changeStyle() {
	var turnButt = document.getElementById("turn1");
			turnButt.style.fontSize = "30px";
			turnButt.style.color = "#FFA07A";
}

function checkGame(){
	var matrix = getMatrix();
	var turnButt = document.getElementById("turn1");
	var winner = checkVerticals(matrix);

	console.log("vert winner="+winner);

	if(winner != null){
		turnButt.innerHTML = winner + " "+  " WON CONGRAT";
		changeStyle();
		return;
	}
	var winner = checkHorizontals(matrix);

	console.log("hor winner="+winner);

	if(winner != null){
		turnButt.innerHTML = winner + " " + "WON CONGRAT";
		changeStyle();
		return;
	}
	winner = checkDiagonals1(matrix);

	console.log("diag1 winner="+winner);

	if(winner != null) {
		turnButt.innerHTML = winner + " " + "WON" + " " + "CONGRATS";
		changeStyle();
		return;
	}
	winner = checkDiagonals2(matrix);

	console.log("diag2 winner="+winner);

	if(winner != null) {
		turnButt.innerHTML = winner + " " + "WON" + " " + "CONGRATS";
		changeStyle();
		return;
	}

	winner = isMatrixFull(matrix);

	console.log("full winner="+winner);

	if(winner){
		turnButt.innerHTML = "DRAW";
		turnButt.style.fontSize = "30px";
		turnButt.style.color = "#FFA07A";
	}
}

function getMatrix() {
	var table = document.getElementById("tbl");
	var matrix = [];
	var rows = table.getElementsByTagName("tr");

	for (var i=0; i<rows.length; i++){
		var buttons = rows[i].getElementsByTagName("button");
		matrix[i] = [];

		for(var j=0;j<buttons.length;j++){
			matrix[i][j] = buttons[j].innerHTML;
		}
	}
	return matrix;
}

function checkSequent() {
	sequent = document.getElementById("sequentSize").value;
	size = document.getElementById("input").value;
	if(sequent > size) {
		alert("The sequent size can't be bigger than box size!");
		document.getElementById("input").value = '';
		document.getElementById("sequentSize").value = '';
	} else if(size > 8 ) {
		alert("Max value of a box size can be - 8");
		document.getElementById("input").value = '';
		document.getElementById("sequentSize").value = '';
	}
	else {
		createTable();
	}

}

 
function checkHorizontals(matrix) {
	for(var i=0;i<matrix.length;i++) {
		var prev = "";
		var countOfSequent = 1;
		for(var j=0;j<matrix[i].length;j++) {
			var curr = matrix[i][j];
			if (curr == ""){
				prev = "";
				continue;
				
			}
			if(prev == ""){
				prev = curr;
				countOfSequent = 1;
				continue;
			}
			if (prev == curr) {
				countOfSequent++;
				if(countOfSequent == sequent) {
					return curr;
				}
			}
			else{
				countOfSequent = 1;
				prev = "";
			}
		}
	}
	return null;
  }


function  checkVerticals(matrix) {
	for(var i=0;i<matrix.length;i++) {
		var prev = "";
		countOfSequent = 1;
		for(var j=0;j<matrix.length;j++){
			var curr = matrix[j][i];
			if (curr == ""){
				prev ="";
				continue;
			}
			if(prev == ""){
				prev = curr;
				countOfSequent = 1;
				continue;
			}
			if (prev == curr) {
				countOfSequent++;
				if(countOfSequent == sequent) {
					return curr;
				}
			}
			else{
				countOfSequent = 1;
				prev = "";
			}
		}
	}
	return null;
}

function checkDiagonals1(matrix) {
	var prev = "";
	countOfSequent = 1;
	for(var i=0;i<size;i++) {
		var curr = matrix[i][i];
		if (curr == ""){
			prev="";
			continue;
		}
		if(prev == ""){
			prev = curr;
			countOfSequent = 1;
			continue;
		}
		if (prev == curr) {
			countOfSequent++;
			if(countOfSequent == sequent) {
				return curr;
			} else {
				continue;
			}
		}
	}
	return null;
}
// function checkDiagonals1() {
// 	var prev = "";
// 	countOfSequent = 1;
// 	for(var i=size-1;i<size;i--) {
// 		for(var j=0;j<size;j++) {
// 			var curr = matrix[i][j];
// 			if (curr == ""){
// 				prev="";
// 				continue;
// 			}
// 			if(prev == ""){
// 				prev = curr;
// 				countOfSequent = 1;
// 				continue;
// 			}
// 			if (prev == curr) {
// 				countOfSequent++;
// 				if(countOfSequent == sequent) {
// 					return curr;
// 				} else {
// 					continue;
// 				}
// 			}
// 			i--;
// 		}
// 	}

// return null;
// }

function checkDiagonals2(matrix){

	var prev = "";
	countOfSequent = 1;
	for (var i = 0; i < size; i++)  
    { 
		
        { 	var curr = matrix[i][size-i-1];
			if (curr == ""){
				prev="";
				continue;
			}
			if(prev == ""){
				prev = curr;
				countOfSequent = 1;
				continue;
			}
			if (prev == curr) {
				countOfSequent++;
				if(countOfSequent == sequent) {
					return curr;
				} else {
					continue;
				}
			}
		}
	}
	return null;
}

function isMatrixFull(matrix){
		for(var i=0;i<matrix.length;i++) {
			for(var j=0;j<matrix.length;j++){
				if(matrix[i][j] == ""){
					return false;
				}
			}
		}
		return true;	
}

function clearMatrix(){
	var trn = document.getElementById("turn1");
	var table = document.getElementById("tbl");
	console.log(table);
	var rows = table.getElementsByTagName("tr");

	for(var i=0;i<rows.length;i++) {
		var buttons = rows[i].getElementsByTagName("button");
		for(var j=0;j<buttons.length;j++){
			buttons[j].innerHTML = "";
		}
	}

	trn.innerHTML = "TIC TAC TOE";
	trn.style.fontSize = "26px";
	trn.style.color = "#FAEBD7";
}