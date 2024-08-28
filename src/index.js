import { Notify } from 'notiflix';
import { fetchData, generateGallery } from './partials/functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const topBtn = document.querySelector('.top-button')
const imgGallery = new SimpleLightbox('.gallery a');
let scrollValue ;

const options = {
  params: '',
  perPage: 40,
  page: 1,
};

const resetPage = page => {
  topBtn.classList.remove('visible')
  gallery.innerHTML = '';
  page = 1;
};

//  getting initial data
form.addEventListener('submit', e => {
  e.preventDefault();
  options.params = document.querySelector(
    '.search-form [name=searchQuery]'
  ).value;
  fetchData(options)
    .then(data => {
      resetPage(options.page);
      const { totalHits, hits } = data;
      if (totalHits === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notify.success(`Hooray! We found ${totalHits} images.`)
      generateGallery(hits,gallery,imgGallery);
    })
    .catch(err => Notify.failure(err.message))
    .finally(() => {
      imgGallery.refresh();
      form.reset();
    });
});


// Infinite Loading
window.addEventListener('scroll', e => {
  scrollValue = Math.round(window.scrollY); // getting scroll position
 if(scrollValue > 400){       //adding "top" button
  topBtn.classList.add('visible')
 } else{
  topBtn.classList.remove('visible')
 }
  if (                               // checink scroll position
    window.innerHeight + scrollValue >=
    document.body.offsetHeight
  ) {
    fetchData(options)    // adding more data
      .then(data => {
        const { totalHits, hits } = data;
        if (totalHits === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        generateGallery(hits,gallery,imgGallery);
      })
      .catch(err => Notify.failure(err.message))
      .finally(() => {
        imgGallery.refresh();
        options.page ++
      });
  }
});


//  "to top" btn functionality
topBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
})
