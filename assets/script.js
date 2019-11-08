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
var enterName = document.querySelector("#enter-name");
// SOUNDS//////////////////////////////////////////////
var wrongSound = document.getElementById("wrong");
wrongSound.volume = 0.3;
var correctSound = document.getElementById("correct");
correctSound.volume = 0.5;
var lowTime = document.getElementById("lowtime");



init()
function init() {
    questBox.style.visibility = "hidden";
    resultsBox.style.display = "none";
    questBox.style.display = "none";

}

// START BUTTON/////////////////////////////////
startBtn.addEventListener("click", function () {
    setTime()
    startBox.style.display = "none";
    renderChoices()
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
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<javascript>", "<scripting>", "<js>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["The <head> section", "The <body> section", "Either section"],
        answer: "Either section"
    },
    {
        title: "How do you write 'Hello World' in an alert box?",
        choices: ["msgBox('Hello World')", "alertBox('Hello World')", "alert('Hello World')", "msg('Hello World')"],
        answer: "alert('Hello World')"
    },

]
console.log(questions.length)





var q = -1;
var stop = 0
// CHOICES BUILDER///////////////////////////
function renderChoices() {

    if (stop < questions.length) {
        ended = false;
        choices.innerHTML = "";
        questBox.style.visibility = "visible";
        questBox.style.display = "inline";
        q++
        stop++
        // render title
        question.innerHTML = questions[q].title;
        // render new li for each option
        for (var i = 0; i < questions[q].choices.length; i++) {

            var option = questions[q].choices[i];

            var li = document.createElement("li");
            li.textContent = option;
            li.setAttribute("data-index", i);

            var button = document.createElement("button");
            button.textContent = "select";

            li.appendChild(button);
            choices.appendChild(li)
        }
    }

    else {
        ended = true
        name()

    }
    // else load complete screen


}


// CHOICE SELECT//////////////////////////////////////////////
questBox.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
        // Get its data-index value and remove the todo element from the list
        var index = element.parentElement.getAttribute("data-index");
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

}






// TIMER////////////////////////////////////////
var secondsLeft = (questions.length * 15);
var ended = false;
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Time: " + secondsLeft;
        if (secondsLeft <= 14) {
            lowTime.play();
        }

        if (ended === true) {
            clearInterval(timerInterval);
        }


        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }

    }, 1000);
}



