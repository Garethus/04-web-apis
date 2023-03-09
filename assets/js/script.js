var headerEl = document.getElementById("header");
var startEl = document.getElementById("start-page");
var questionPageEl = document.getElementById("question-page");
var scorePageEl = document.getElementById("score-page");
var viewScoreEl = document.getElementById("viewScore");
var timeLeftEl = document.getElementById("timeLeft");
var startButtonEl = document.getElementById("startButton");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var finalScoreEl = document.getElementById("finalScore");
var submitEl = document.getElementById("submit");
var highScorePageEl = document.getElementById("highScore-page");
var clearHighScoreEl = document.getElementById("clearHighScore");
var goBackButtonEl = document.getElementById("goBackButton");
var scoreListEl = document.getElementById("scoreList");
var listEl = document.querySelectorAll("list");



var questionsArray = [
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        choices: ["title", "scr", "longdesc", "alt"],
        answer: "alt"
    },
    {
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        choices: ["At the end of the document", "In the head section", "In the body section"],
        answer: "In the head section"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        choices: ["style", "font", "styles", "class"],
        answer: "style"
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choices: ["The head section", "The body section", "Both the head and the body section are correct"],
        answer: "The body section"
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function:myFunction()", "function myFunction()"],
        answer: "function myFunction()"
    }
]




function startQuiz() {
    var secondsLeft = 75;
    var i = 0;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeLeftEl.textContent = secondsLeft;

        // if(secondsLeft === 0) {
        //     // Stops execution of action at set interval
        //     clearInterval(timerInterval);
        //     // Calls function to create and append image
        //     sendMessage();
        // }

    }, 1000);


    function displayQuestion() {

        questionEl.textContent = questionsArray[i].question;
        choicesEl.textContent = " ";
        for (var n = 0; n < questionsArray[i].choices.length; n++) {
            var choice = questionsArray[i].choices[n];
            var choiceNode = document.createElement('button');
            choiceNode.setAttribute("class", "choices");
            choiceNode.setAttribute("value", choice);
            choiceNode.textContent = n + 1 + '. ' + choice;
            choicesEl.appendChild(choiceNode);
        }
    }

    function verifyAnswer(event) {
        var buttonEl = event.target;
        if (buttonEl.value !== questionsArray[i].answer) {
            secondsLeft -= 15;
            timeLeftEl.textContent = secondsLeft;
        }
        if (secondsLeft <= 0) {
            secondsLeft = 0;
            timeLeftEl.textContent = secondsLeft;
            gameOver();
        } else {
            i++;
            if (i < questionsArray.length) {
                displayQuestion();


            } else {
                gameOver();
            }
        }
        console.log(i);
    }

    function gameOver() {
        clearInterval(timerInterval);
        questionPageEl.style.display = "none";
        scorePageEl.style.display = "block";
        finalScoreEl.textContent = secondsLeft;
        finalScoreEl.setAttribute("value", secondsLeft);
        window.secondsLeft = secondsLeft;
    }

    startEl.style.display = "none";
    questionPageEl.style.display = "block";
    displayQuestion();
    choicesEl.addEventListener("click", verifyAnswer);

}



function saveScore(event) {
    event.preventDefault();
    var initialInput = document.getElementById("initials");

    if (initialInput.value.trim() !== "") {


        var scoreList =
            JSON.parse(window.localStorage.getItem('scoreList')) || [];

        var quizTakers = {
            score: secondsLeft,
            initial: initialInput.value.trim(),
        };

        scoreList.push(quizTakers);
        window.localStorage.setItem("scoreList", JSON.stringify(scoreList));
        displayHighScore();
    }
}
function displayHighScore() {
    var newScoreList = JSON.parse(window.localStorage.getItem('scoreList')) || [];
    newScoreList.sort(function (a, b) {
        return b.score - a.score;
    });

    for (var h = 0; h < newScoreList.length; h += 1) {
        var liTag = document.createElement('li');
        liTag.textContent = newScoreList[h].initial + ' - ' + newScoreList[h].score;
        var olEl = document.getElementById('scoreList');
        olEl.appendChild(liTag);
    }
    headerEl.style.display = "none";
    startEl.style.display = "none";
    scorePageEl.style.display = "none";
    highScorePageEl.style.display = "block";
}

startButtonEl.addEventListener("click", startQuiz);
submitEl.addEventListener("click", saveScore);
clearHighScoreEl.addEventListener("click", function () {
    window.localStorage.clear();
    scoreListEl.remove();
    headerEl.style.display = "none";
    scorePageEl.style.display = "none";
    highScorePageEl.style.display = "block";
});
goBackButtonEl.addEventListener("click", function () {
    window.location.reload();
    headerEl.style.display = "flex";
    headerEl.style.flexWrap = "wrap";
    startEl.style.display = "block";
    highScorePageEl.style.display = "none";
});
viewScoreEl.addEventListener("click", displayHighScore);