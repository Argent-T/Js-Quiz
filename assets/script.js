var timeEl = document.querySelector(".time");
var questBox = document.querySelector("#question-box");
var question = document.querySelector("#question");
var answer = document.querySelector("#answers");
var results = document.querySelector("#results-box");
var scoreTitle = document.querySelector("#scoretitle");
var scores = document.querySelector("#scores");
var startbtn = document.querySelector("#startbtn");


startbtn.addEventListener("click", function(){
    setTime()

});











var secondsLeft = 76;
function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft ;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}
