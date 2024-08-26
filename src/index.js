import { fetchData } from './partials/data-fetch';


document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();
  const {elements} = e.target
  fetchData(elements[0].value)
});

