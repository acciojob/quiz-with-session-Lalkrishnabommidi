const questionsContainer = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreDisplay = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: "Delhi"
  },
  {
    question: "Which language is used for web development?",
    options: ["HTML", "Python", "C++", "Java"],
    answer: "HTML"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Google", "Apple"],
    answer: "Netscape"
  }
];

function displayQuestions() {
  questionsContainer.innerHTML = "";

  questions.forEach((item, index) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${item.question}`;
    questionDiv.appendChild(questionText);

    item.options.forEach(option => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = option;

      input.addEventListener("change", saveProgress);

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));

      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
  });

  loadProgress();
}

function saveProgress() {
  const progress = {};

  document
    .querySelectorAll('input[type="radio"]:checked')
    .forEach(input => {
      progress[input.name] = input.value;
    });

  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function loadProgress() {
  const savedProgress = sessionStorage.getItem("progress");

  if (!savedProgress) {
    return;
  }

  const progress = JSON.parse(savedProgress);

  Object.keys(progress).forEach(name => {
    const input = document.querySelector(
      `input[name="${name}"][value="${progress[name]}"]`
    );

    if (input) {
      input.checked = true;
    }
  });
}

function calculateScore() {
  let score = 0;

  questions.forEach((question, index) => {
    const selected = document.querySelector(
      `input[name="question-${index}"]:checked`
    );

    if (selected && selected.value === question.answer) {
      score++;
    }
  });

  scoreDisplay.textContent = `Your score is ${score} out of 5.`;

  localStorage.setItem("score", score);
}

function loadScore() {
  const savedScore = localStorage.getItem("score");

  if (savedScore !== null) {
    scoreDisplay.textContent = `Your score is ${savedScore} out of 5.`;
  }
}

submitButton.addEventListener("click", calculateScore);

displayQuestions();
loadScore();