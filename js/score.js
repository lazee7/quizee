'use strict';

const scoreElement = document.querySelector('#score');
const nameElement = document.getElementById('username');
const username = localStorage.getItem('userName');
nameElement.textContent = username;

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const score = parseInt(urlParams.get('score'));
scoreElement.textContent = `${score} / 100`;
