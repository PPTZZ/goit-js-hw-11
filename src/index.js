import { fetchData } from './partials/data-fetch';


let input


document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();
  console.log(input);
});
