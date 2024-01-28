// DOM elements
const instructionElement = document.querySelector(".instruction");
const startButton = document.getElementById("start-btn");
const timerContainer = document.getElementById("timercontainer");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

// Styling for the instruction element
instructionElement.style.fontSize = "18px";
instructionElement.style.fontWeight = "bold";
instructionElement.style.marginBottom = "20px";

// Event listener for the start button
startButton.addEventListener("click", startQuiz);

// Quiz questions
const questions = [
  {
    question: "JavaScript is the programming language of the _____",
    choices: ["Desktop", "Mobile", "Web", "Server"],
    correctAnswer: 2,
  },
  {
    question: "In which HTML element do we put the JavaScript code?",
    choices: [
      "<javascript>...</javascript>",
      "<script>...</script>",
      "<js>...</js>",
      "<css>...</css>",
    ],
    correctAnswer: 1,
  },
  {
    question: "Which symbol is used separate JavaScript statements?",
    choices: ["Comma (,)", "Colon (:)", "Hyphen (_)", "Semicolon (;)"],
    correctAnswer: 3,
  },
  {
    question: "JavaScript ignores?",
    choices: ["newlines", "tabs", "spaces", "All of the above"],
    correctAnswer: 3,
  },
  {
    question: "In JavaScript, single line comment begins with ___",
    choices: ["#", "/*", "$", "//"],
    correctAnswer: 3,
  },
  {
    question: " In JavaScript, multi-line comments start with __ and end with ___",
    choices: ["/* and */", "<!—and -->", "## and ##", "// and //"],
    correctAnswer: 0,
  },
  {
    question: "Which JavaScript keyword is used to declare a variable?",
    choices: ["Var", "var", "Let", "All of the above"],
    correctAnswer: 1,
  },
  {
    question: "The const keyword is used to define a ______",
    choices: ["Function scopes variable", "Block scoped variable", "Constant", "Constant with no initial value"],
    correctAnswer: 2,
  },
  {
    question: "Which is the correct syntax to declare a constant in JavaScript?",
    choices: ["const constant_name;", "constant_name const;", "constant_name const = value;", "const constant_name = value;"],
    correctAnswer: 3,
  },
  {
    question: "What is the default value of an uninitialized variable?",
    choices: ["0", "undefined", "null", "NaN"],
    correctAnswer: 1,
  },
];

// DOM elements related to the quiz interface
const container = document.querySelector(".container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const timerElement = document.getElementById("time");

// Quiz state variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 300;
let timerInterval;


function loadQuestion() {
  const questionObj = questions[currentQuestion];
  questionElement.textContent = questionObj.question;

  choicesElement.innerHTML = "";
  for (let i = 0; i < questionObj.choices.length; i++) {
    const li = document.createElement("li");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "choice";
    radio.value = i;

    li.appendChild(radio);
    li.appendChild(document.createTextNode(questionObj.choices[i]));

    // Set data-correct-answer attribute to indicate the correct choice
    if (i === questionObj.correctAnswer) {
      li.setAttribute("data-correct-answer", "true");
    }

    choicesElement.appendChild(li);
  }

  // Show the submit button after loading the question
  submitButton.classList.remove("d-none");
}




function loadNextQuestion() {
  const selectOption = document.querySelector("input[name='choice']:checked");

  if (selectOption) {
    const selectedAnswer = parseInt(selectOption.value);
    const correctAnswer = selectOption.parentElement.getAttribute("data-correct-answer") === "true";

    // Remove existing classes to reset styles
    document.querySelectorAll("li").forEach((choice) => {
      choice.classList.remove("selected", "correct", "incorrect");
    });

    // Add classes based on the correctness of the selected answer
    selectOption.parentElement.classList.add("selected");

    if (correctAnswer) {
      selectOption.parentElement.classList.add("correct");
    } else {
      selectOption.parentElement.classList.add("incorrect");
      document.querySelector("li[data-correct-answer='true']").classList.add("correct");
    }

    // Increment the score if the answer is correct
    if (correctAnswer) {
      score++;
    }

    // Move to the next question or show the final score
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(() => {
        loadQuestion();
        showButtons(); // Show buttons after loading a new question
      }, currentQuestion === questions.length - 1 ? 900 : 1000); // Less delay on the last question
    } else {
      hideButtons(); // Hide buttons when showing the final score
      showScore();
    }
  }
}

function checkAnswer() {
  const selectOption = document.querySelector("input[name='choice']:checked");

  if (selectOption) {
    const correctAnswer = selectOption.parentElement.getAttribute("data-correct-answer") === "true";

    // Remove existing classes to reset styles
    document.querySelectorAll("li").forEach((choice) => {
      choice.classList.remove("selected", "correct", "incorrect");
    });

    // Add classes based on the correctness of the selected answer
    selectOption.parentElement.classList.add("selected");

    if (correctAnswer) {
      selectOption.parentElement.classList.add("correct");
      score++;
    } else {
      selectOption.parentElement.classList.add("incorrect");
      document.querySelector("li[data-correct-answer='true']").classList.add("correct");
    }

    // Move to the next question or show the final score
    if (currentQuestion === questions.length - 1) {
      showScore();
    } else {
      loadNextQuestion();
    }
  }
}


// Function to start the quiz
function startQuiz() {
  instructionElement.style.display = "none";
  timerContainer.style.display = "block";
  startButton.style.display = "none";
  loadQuestion();
  submitButton.style.display = "block"; // Explicitly show the submit button on the first question
  console.log("Submit button displayed");
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to display the final score
function showScore() {
    clearInterval(timerInterval);
    questionElement.style.display = "none";
    choicesElement.style.display = "none";
    submitButton.style.display = "none";
    scoreElement.textContent = `Your score: ${score} out of ${questions.length}`;
    scoreElement.style.display = "block";
    restartButton.style.display = "block";
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 300;
    loadQuestion();
    restartButton.style.display = "none";
    questionElement.style.display = "block";
    choicesElement.style.display = "block";
    submitButton.style.display = "block";
    scoreElement.style.display = "none";
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerElement.textContent = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
        showScore();
    } else {
        timeLeft--;
    }
}


// Event listeners for the submit and restart buttons
submitButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartQuiz);