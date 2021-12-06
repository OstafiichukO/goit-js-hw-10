import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';

import Notiflix from 'notiflix';
import countryListMarkup from './hbs/countryList.hbs';
import countryCardMarkup from './hbs/countryCard.hbs';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

function onResolve(value) {
  let countryData = value;
    countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
  if (countryData.length > 10) Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  if (countryData.length > 1 && countryData.length <= 10) {
    const list = countryData.map(el => countryListMarkup(el)).join('');
    countryListEl.insertAdjacentHTML('beforeend', list);
    return;
  };
  if (countryData.length === 1) {
    const card = countryData.map(el => {
      return countryCardMarkup(el)}).join('');
    countryInfoEl.insertAdjacentHTML('beforeend', card);
    return;
  };
}

inputEl.addEventListener('input', debounce(() => {
  let inputElVal = inputEl.value;
  let countryName = inputElVal.trim();
  if (countryName === '') return;
  if (countryName !== inputElVal.trimLeft()) return;

  fetchCountries(countryName)
    .then(onResolve)
      // .catch не работает
    .catch(err => Notiflix.Notify.failure('Oops, there is no country with that name'))
}, DEBOUNCE_DELAY));