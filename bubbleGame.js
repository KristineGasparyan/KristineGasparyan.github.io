
let  score = 0;
var tmeo;
console.log("init");
function drawCircle(imgID=0) {

    var div = document.getElementById("div");
    var img = document.createElement("img");
    img.src = "crc1.png";
    img.className = "img";
    img.id = imgID;
  
    img.addEventListener('click', function() {
         deleteImg(img.id);
         score+=10;
         checkScore();
    })

    img.style.bottom = "0px";
    img.style.position = "absolute";
    div.appendChild(img);

    var pos = div.offsetWidth-img.clientWidth;
    var randomPos = Math.floor(Math.random()*pos);
    img.style.left = randomPos + 10 + 'px';
    
    tmeo =  setTimeout(function() {
            drawCircle(++imgID);
          }, countSec);
          moveUp(imgID);
 

    if(imgID >= 50 || seconds == 0) {
        clearTimeout(tmeo);
        return;
        
    }   
}

let seconds;

function startGame() {
    seconds = 20;
    drawCircle();
    calculateTime();
    let button = document.getElementById("butt");
    button.style.display = 'none';
    let scoreInfo = document.getElementById('scoreDiv');
    score = 0;
    scoreInfo.innerHTML = "Score - " + score;
}



function moveUp(imgID) {
 
    var move = document.getElementById(imgID);
    if(move) {
    move.style.bottom = parseInt(move.style.bottom) + 1 + 'px';
    if(imgID >= 50) {
        if( parseInt( move.style.bottom ) >= 600 ){
        checkGame();
        }
    }        
    if( parseInt( move.style.bottom ) < 600 ) {
       let tme0 = setTimeout( function() {
     moveUp( imgID ); } , speed);
      
    } else {
        deleteImg(imgID);
        return;
        }
    }
}

function deleteImg(imgID) {
    let img = document.getElementById(imgID);
    img.parentNode.removeChild(img);

}

function checkGame() {
    let timer = document.getElementById("timer");
    if(score < 150) {
        timer.innerHTML = "GAME OVER";
        
    } else {
        timer.innerHTML = "YOU WON!";
    }

    let button = document.getElementById("butt");
    button.style.display = 'block';
    button.style.height = '180px';
    button.style.width = '180px';
    button.innerHTML = "PLAY AGAIN";
   

}

function checkScore() {
    let scoreInfo = document.getElementById('scoreDiv');
    scoreInfo.innerHTML = 'Score - ' + score;
    
}

function calculateTime() {

    let timerInfo = document.getElementById('timer');
    let tminf = setInterval(() => {
    timerInfo.innerHTML = --seconds;
      if(seconds == 0) {
        checkGame();
        clearInterval(tminf);
        storeResult();
        usDiv.innerHTML = "";
        showScores();
    }
    }, 1000);
    
}

 var usDiv = document.createElement("div");
 usDiv.id = "usersDiv";

 function drawGame() {
    document.body.appendChild(usDiv);
    var scoreD = document.createElement("div");
    scoreD.id = "scoreDiv";
    var timerD = document.createElement("div");
    timerD.id = "timer";
    document.body.appendChild(scoreD);
    document.body.appendChild(timerD);

    var title = document.createElement("div");
    title.className = "intro";
    title.innerHTML = "Pop as many bubbles as you can!";
    document.body.appendChild(title);

    var gameDiv = document.createElement("div");
    gameDiv.id = "div";
    var stGameBut = document.createElement("button");
    stGameBut.id = "butt";
    stGameBut.innerHTML = "PLAY";
    stGameBut.onclick = startGame;
    gameDiv.appendChild(stGameBut);
    document.body.appendChild(gameDiv);
    var levelDiv = document.getElementById("levelDiv");
    levelDiv.style.display = "none";
}

let speed;
let countSec;
function changeSpeed(sp,sec) {
    speed = sp;
    countSec = sec;

}

function showLogin() {
    var form = document.createElement("div");
    form.id = "form";
    
    var input = document.createElement("input");
    input.type = "text";
    input.id = "input";
    input.placeholder = "Enter your name...";
  
    var storeButton = document.createElement("button");
    storeButton.id = "store";
    storeButton.innerHTML = "Save";
    storeButton.onclick = drawLoggedInUserName;

    form.appendChild(input);
    form.appendChild(storeButton);
    document.body.appendChild(form);
    var logBut = document.getElementById("logButton");
    logBut.style.display = "none";
}

var user;
function drawLoggedInUserName() {
    var form = document.getElementById("form").style.display = "none";
    user = document.getElementById("input").value;
    var d = document.createElement("div");
    document.body.appendChild(d);
    d.id = "d";
    d.innerHTML = "Welcome "+ user + " " + "!";
}
 
function ifLoggedIn() {
    if(user != null) {
        drawGame();
    } else {
        alert ("Please, log in to play!\r\nOr if you have already done that, find your name :)");       
    }
}

function storeResult() {
    window.localStorage.setItem(user, score);
}

function showScores(key) {
    var p = document.createElement("p");
    p.id = "players";
    p.innerHTML = "PLAYERS";
    usDiv.appendChild(p);
    var ul = document.createElement("ul");
    ul.id = "ul";
    usDiv.appendChild(ul);
    for(var i=0, len=localStorage.length; i<len; i++) {
        var li = document.createElement("li");
        li.id = "li";
        ul.appendChild(li);
        var key = localStorage.key(i);
        var value = localStorage[key];
        li.innerHTML = key + ' : ' + value;
    }
}
// function deleteScores() {
//     var ul = document.getElementById("ul");
//     x = ul.getElementsByTagName("li");
//     for(var i=0; i < x.length ; i++) {
//         ul.removeChild(x[i]);
//     }

// }