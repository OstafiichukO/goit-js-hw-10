import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryListMarkup from './hbs/countryList.hbs';
import countryCardMarkup from './hbs/countryCard.hbs';

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

function onInputEl(e) {
  const countryName = e.target.value.trim().toLowerCase();

  if (countryName == '') {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
  } else {
    fetchCountries(countryName)
      .then(onResolve)
      .catch(err => Notify.failure('Oops, there is no country with that name'));
  }
}

function onResolve(value) {
  const Counrties = value.map(el => countryListMarkup(el)).join('');
  const CounrtiesInfo = value.map(el => countryCardMarkup(el)).join('');

  if (value.length > 1 && value.length <= 10) {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = Counrties;
    return;
  }
  if (value.length === 1) {
    countryListEl.innerHTML = Counrties;
    countryInfoEl.innerHTML = CounrtiesInfo;
    document.querySelector('.country-list__flag').classList.add('country-list__flag--card');
    document.querySelector('.country-list__name').classList.add('country-list__name--card');
    return;
  }
  Notify.info('Too many matches found. Please enter a more specific name.');
}

inputEl.addEventListener('input', debounce(onInputEl, DEBOUNCE_DELAY));
