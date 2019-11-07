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

var wrongSound = document.getElementById("wrong");
var correctSound = document.getElementById("correct");



init()
function init() {
    questBox.style.visibility = "hidden";
    resultsBox.style.display = "none";

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

]
console.log(questions.length)


function storeAnswers() {
    for (i = 0; i < questions.length; i++) {
        localStorage.setItem("answers", JSON.stringify(questions.answer[i]));


    }
}


var q = -1;
// CHOICES BUILDER///////////////////////////
function renderChoices() {
    choices.innerHTML = "";
    questBox.style.visibility = "visible";
    q++
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
            alert("Correct");
        }
        else {
            secondsLeft = secondsLeft - 10;
            wrongSound.play();
        }

        console.log(choice)

    }
});




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




choices.addEventListener("click", function (event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
        // Get its data-index value and remove the todo element from the list
        var index = element.parentElement.getAttribute("data-index");
        //   todos.splice(index, 1);

        // Store updated todos in localStorage, re-render the list
        //   storeTodos();
        //   renderTodos();
    }
});