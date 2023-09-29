'use strict';

const nameElement = document.getElementById('username');
const username = localStorage.getItem('userName');
nameElement.textContent = username;
const nextBtn = document.querySelector('#next');
const labelProgress = document.querySelector('#label-progress');
const progressIndicatior = document.querySelector('#quiz-progress');
const scoreElement = document.querySelector('#score');

const questionElement = document.querySelector('#question');
const options = Array.from(document.querySelectorAll('.options'));

const questionBank = JSON.parse(localStorage.getItem('quizQuestions'));
console.log(questionBank);

let currentQuizIndex = 0;
let correctAnswer = null;
let clickable = false;
let score = 0;

// insert correct answer at a random index in options array
function randomInsert(value, arr) {
  const randomIndex = Math.floor(Math.random() * 4);
  arr.splice(randomIndex, 0, value);
  return randomIndex;
}

function startQuiz() {
  // remove correct and incorrect classes
  clearAnswer();

  // current quiz
  const quiz = questionBank[currentQuizIndex];

  // choices array
  const choices = [...quiz.incorrect_answers];

  //
  correctAnswer = randomInsert(quiz.correct_answer, choices);

  questionElement.innerHTML = quiz.question;

  // display choices
  options.forEach((option) => {
    const currentQuestion = choices[option.dataset.index];
    option.innerHTML = currentQuestion;
  });

  // update question status
  labelProgress.textContent = `${currentQuizIndex + 1}/ 10`;
  progressIndicatior.value = currentQuizIndex + 1;
  clickable = true;
  nextBtn.disabled = true;
}

options.forEach((option) => {
  option.addEventListener('click', () => {
    // user should only choose once
    if (!clickable) return;
    validateChoice(option);
    showCorrectAnswer();
    clickable = false;

    nextBtn.disabled = false;
    scoreElement.innerText = score;
  });
});

startQuiz();

// change background color of correct option to green
function showCorrectAnswer() {
  options[correctAnswer].parentElement.classList.add('correct');
}

//
function validateChoice(option) {
  const isCorrect = correctAnswer == option.dataset.index;
  const show = isCorrect ? 'correct' : 'incorrect';
  score = isCorrect ? score + 10 : score;
  option.parentElement.classList.add(show);
}

nextBtn.addEventListener('click', () => {
  currentQuizIndex++;
  if (currentQuizIndex <= 9) {
    startQuiz();
  } else {
    window.location.assign(`./score.html?score=${score}`);
  }
  if (currentQuizIndex === 9) {
    nextBtn.innerText = 'finish';
  }
});

function clearAnswer() {
  options.forEach((option) => {
    option.parentElement.classList.remove('correct');
    option.parentElement.classList.remove('incorrect');
  });
}
