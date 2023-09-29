'use strict';
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const category = urlParams.get('category');
const difficulty = urlParams.get('difficulty');

const baseUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';

const questionBank = [];

async function fetchQuiz() {
  try {
    const res = await fetch(
      `${baseUrl}&category=${category}&difficulty=${difficulty}`
    );
    const data = await res.json();
    localStorage.setItem('quizQuestions', JSON.stringify(data?.results));
    window.location.assign('./quiz.html');
  } catch (error) {
    console.log(error);
  }
}

fetchQuiz();
