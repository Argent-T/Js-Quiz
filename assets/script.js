// VARIABLES////////////////////////////////////
var timeEl = document.querySelector(".time");
var startBox = document.querySelector("#start-box");
var questBox = document.querySelector("#question-box");
var question = document.querySelector("#question");
var choices = document.querySelector("#choices");
var resultsBox = document.querySelector("#results-box");
var scoreTitle = document.querySelector("#scoretitle");
var scores = document.querySelector("#scores");
var startBtn = document.querySelector("#startbtn");
var scoreBtn = document.querySelector("#scorebtn");

init()
function init(){
questBox.style.visibility = "hidden";
resultsBox.style.display = "none";
}

// START BUTTON/////////////////////////////////
startBtn.addEventListener("click", function () {
    setTime()
    startBox.style.display = "none";
    renderdummyChoices()
});


// QUESTIONS//////////////////////////////////
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },

]


// CHOICES BUILDER///////////////////////////
function renderChoices() {
    choices.innerHTML = "";
  

    // render new li for each option
    for (var i = 0; i < questions.choices.length; i++){

    var option = questions.choices[i];

    var li = document.createElement("li");
    li.textContent = option;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "select";

    li.appendChild(button);
    choices.appendChild(li)
    }

}



var dummychoices = ["strings", "booleans", "alerts", "numbers"]
// testingCHOICES BUILDER///////////////////////////


function renderdummyChoices() {
    choices.innerHTML = "";
    questBox.style.visibility = "visible";
   
    // render new li for each option
    for (var i = 0; i < dummychoices.length; i++){

    var option = dummychoices[i];

    var li = document.createElement("li");
    li.textContent = option;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "select";

    li.appendChild(button);
    choices.appendChild(li)
    }

}







// TIMER////////////////////////////////////////
var secondsLeft = 75;
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}
