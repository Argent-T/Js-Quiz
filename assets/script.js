// VARIABLES////////////////////////////////////
var timeEl = document.querySelector(".time");
var startBox = document.querySelector("#start-box");
var questBox = document.querySelector("#question-box");
var question = document.querySelector("#question");
var choices = document.querySelector("#choices");
var resultsBox = document.querySelector("#results-box");
var scores = document.querySelector("#scores");
var plTime = document.querySelector("#times");
var startBtn = document.querySelector("#startbtn");
var scoreBtn = document.querySelector("#scorebtn");
var enterName = document.querySelector("#enter-name");
var playerName = document.querySelector("#playername");
// SOUNDS//////////////////////////////////////////////
var wrongSound = document.getElementById("wrong");
wrongSound.volume = 0.3;
var correctSound = document.getElementById("correct");
correctSound.volume = 0.5;
var lowTime = document.getElementById("lowtime");
// SCORES////////////////////////////////
var names = []
var times = []


init()
// name()

// START BUTTON/////////////////////////////////
startBtn.addEventListener("click", function () {
    setTime()
    startBox.style.display = "none";
    renderChoices()
    timeEl.className = "time";
    questBox.style.visibility = "visible";
    questBox.style.display = "inline";
});

console.log("question length " + questions.length)

var q = -1;
var stop = 0
// CHOICES BUILDER///////////////////////////
function renderChoices() {

    if (stop < questions.length) {
        ended = false;
        choices.innerHTML = "";

        q++
        stop++
        // render title
        question.innerHTML = questions[q].title;
        // render new li for each option
        for (var i = 0; i < questions[q].choices.length; i++) {

            var option = questions[q].choices[i];

            var li = document.createElement("li");
            li.textContent = option;


            var button = document.createElement("button");
            button.textContent = "select";

            li.appendChild(button);
            choices.appendChild(li)
        }
    }

    else {
        ended = true
        lowTime.pause();
        lowTime.currentTime = 0;
        questBox.style.display = "none";
        name()

    }

}


// CHOICE SELECT//////////////////////////////////////////////
questBox.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {

        // get parent element text and compare to question answer
        var choice = $(element.parentElement).clone().children().remove().end().text();
        if (choice == questions[q].answer) {
            correctSound.play();
            renderChoices()
            console.log("correct ")
        }
        else {
            secondsLeft = secondsLeft - 10;
            wrongSound.play();
            console.log("incorrect ")
        }

        console.log(choice)

    }
});




// SHOW NAME INPUT//////////////////////////////

function name() {
    enterName.style.display = "inline";
    questBox.style.visibility = "hidden";
    questBox.style.display = "none";
    resultsBox.style.display = "none";
    lowTime.pause();
    lowTime.currentTime = 0;

}

// TIMER////////////////////////////////////////
var secondsLeft = 0;
var ended = false;
function setTime() {
    secondsLeft = (questions.length * 15);
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 14) {
            lowTime.play();
            timeEl.className = "timepanic";
        }

        if (ended === true) {
            lowTime.pause();
            lowTime.currentTime = 0;
            clearInterval(timerInterval);
        }

        if (secondsLeft <= 0) {
            secondsLeft = 0;
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}


// SAVE NAMES AND TIMES//////////////////////////////////////////
var inputForm = document.querySelector("#inputname");
function storeNames() {
    localStorage.setItem("names", JSON.stringify(names));
}
function storetime() {
    localStorage.setItem("times", JSON.stringify(times));
}
inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var nametext = playerName.value.trim();

    if (nametext === "") {
        return;
    }
    names.push(nametext);
    playerName.value = "";
    times.push(secondsLeft);
    storeNames();
    storetime();
    enterName.style.display = "none";

    renderScores();
})

// DISPLAY SCORES////////////////////////
function renderScores() {
    scores.innerHTML = "";
    plTime.innerHTML = "";
    resultsBox.style.display = "inline";
    resultsBox.style.visibility = "visible"
    for (var i = 0; i < names.length; i++) {
        var name = names[i];
        var time = times[i];
        var lin = document.createElement("li");
        var liT = document.createElement("li");
        lin.textContent = "NAME: " + name;
        liT.textContent = " TIME: " + time;

        scores.appendChild(lin);
        plTime.appendChild(liT);
    }


}

// Initiation //////////////////////////////
function init() {
    startBox.style.display = "block";
    questBox.style.visibility = "hidden";
    resultsBox.style.display = "none";
    resultsBox.style.visibility = "hidden"
    questBox.style.display = "none";
    var storedNames = JSON.parse(localStorage.getItem("names"));
    var storedTimes = JSON.parse(localStorage.getItem("times"));
    if (storedNames !== null) {
        names = storedNames;
    }
    if (storedTimes !== null) {
        times = storedTimes;
    }
    console.log
}

// Buttons///////////////////////////
document.querySelector("#deletescores").addEventListener("click", function () {
    names = [];
    times = [];
    storeNames();
    storetime();
    renderScores();
    init();
    reset();
});

document.querySelector("#restart").addEventListener("click", function () {
    init();
    reset();
});

document.querySelector("#scorebtn").addEventListener("click", function () {
    renderScores();
    startBox.style.display = "none";

});

// Reset variables///////////////////
function reset() {
    q = -1;
    stop = 0
    secondsLeft = 0;
    timeEl.textContent = "Time: " + secondsLeft;
}