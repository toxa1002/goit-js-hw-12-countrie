import './sass/main.scss';
import markupCountry from './templates/countryMarkup.hbs'
import countryList from './templates/countryList.hbs'
import API from './js/fetchCountries.js'
import getRefs from './js/refs.js'
import { debounce } from "debounce";
import pnotify from './js/pnotify.js';

const refs = getRefs();

refs.input.addEventListener('input', debounce(e => {
  onInputValue(e);
}, 500))

function onInputValue (e){
  OnResetStyleCountryDiv()
  e.preventDefault();
  const value = e.target.value;
  if (!value) {
    clearMarkup();
    return;
  }
  searchCountry(value);
}

function searchCountry (value){

  API.fetchingRequest(value).then(country => {
    if(!country) {
      return;
    } else if (country.length > 10) {
      clearMarkup();
      const message = 'Слишком много совпадений, введите более точные данные'
      pnotify({
        title: 'Ошибка',
        text: message,
        delay:1000,
      });
    } else if (country.length >= 2 && country.length <= 10) {
      createCountryListMarkup(country);
    } else if (country.length === 1) {
      onStyleCountryDiv();
      createMarkup(country);
    } else {
      pnotify({
        title: 'Ошибка',
        text: 'Некорректный запрос или такой страны нет в списке',
        delay: 1000,
      });
    }
  }).catch(error => {
    onError();
  })
}

function onError(){
  pnotify({
    title: 'Критическая ошибка',
    text: 'Что-то пошло не так.',
    delay: 500,
  });
}

function createMarkup (country){
  const markup = markupCountry(country);
  refs.markup.innerHTML = markup;
}

function createCountryListMarkup(list){
  const markup = countryList(list);
  refs.markup.innerHTML = markup;
}

function clearMarkup(){
  refs.markup.innerHTML = '';
}
function onStyleCountryDiv (){
  refs.markupCountry.classList.add('opacity');
}
function OnResetStyleCountryDiv(){
  refs.markupCountry.classList.remove('opacity');
}