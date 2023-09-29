'use strict';

const preQuizBtn = document.querySelector('#pre-quiz-btn');
const categoryElement = document.querySelector('#category');
const diffcultyLevelElement = document.querySelector('#difficulty');
const showErrorElement = document.querySelector('.show-error');
const errorElement = document.querySelector('#error');

// functions

// validate user selection
function validateSelection() {
  if (!categoryElement.value || !diffcultyLevelElement.value) {
    showErrorElement.classList.remove('hidden');
    errorElement.textContent = 'both fields are required!';
    return false;
  }
  showErrorElement.classList.add('hidden');
  return true;
}

preQuizBtn.addEventListener('click', () => {
  const isValid = validateSelection();
  if (!isValid) return;

  const category = categoryElement.value;
  const difficulty = diffcultyLevelElement.value;

  const url = `./fetch.html?category=${category}&difficulty=${difficulty}`;
  window.location.assign(url);
});

// clear previous quiz questions from local storage
localStorage.removeItem('quizQuestions');
