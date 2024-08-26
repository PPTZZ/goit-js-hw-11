import DataFetch from './partials/DataFetch';

const test = new DataFetch({
  selector: '[name=searchQuery]',
});

const form = new DataFetch({
    selector:'.search-form'
});

form.element.addEventListener('submit', e => {
    e.preventDefault();
    const input = test.element.value
    console.log(input);
    form
      .fetchData(input)
      .then(data => console.log(data))
      .catch(err => console.log(err));
  });
