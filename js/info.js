'use strict';
const nameInput = document.getElementById('name');
const showErrorElement = document.querySelector('.show-error');
const errorElement = document.querySelector('#error');
const submitBtn = document.getElementById('info-btn');

// validate user name
function validateSelection(value) {
  if (!value || value.length < 3) {
    showErrorElement.classList.remove('hidden');
    errorElement.textContent = 'name must be at least 3 characters!';
    return false;
  }
  showErrorElement.classList.add('hidden');
  return true;
}

submitBtn.addEventListener('click', () => {
  const name = nameInput.value;
  const isValid = validateSelection(name);
  if (!isValid) return;
  localStorage.setItem('userName', name);
  window.location.assign('./preQuiz.html');
});
