import { Notify } from 'notiflix';
import { fetchData } from './partials/functions';
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


form.addEventListener('submit', e => {
  e.preventDefault();
  options.params = document.querySelector(
    '.search-form [name=searchQuery]'
  ).value;
  fetchData(options)
    .then(data => {
      resetPage(options.page);
      const {total, totalHits, hits } = data;
      if (totalHits === 0) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      Notify.success(`Hooray! We found ${total} images.`)
      hits.forEach(
        ({
          largeImageURL,
          likes,
          views,
          comments,
          downloads,
          webformatURL,
        } = obj) => {
          const card = `<a href="${largeImageURL}" class="gallery__link">
                      <div class="card">
                        <img class="card__img" src="${webformatURL}" loading="lazy" />
                        <div class="card__text-box">
                          <div class="card__descr-box">
                            <h3 class="card__descr-title">Likes</h3>
                            <p class="card__descr">${likes}</p>
                            </div>
                          <div class="card__descr-box">
                            <h3 class="card__descr-title">Views</h3>
                            <p class="card__descr">${views}</p>
                          </div>
                          <div class="card__descr-box">
                            <h3 class="card__descr-title">Comments</h3>
                            <p class="card__descr">${comments}</p>
                          </div>
                          <div class="card__descr-box">
                            <h3 class="card__descr-title">Downloads</h3>
                            <p class="card__descr">${downloads}</p>
                          </div></div></div></a>`;
          gallery.insertAdjacentHTML('beforeend', card);
          imgGallery.elements.push(card);
        }
      );
    })
    .catch(err => Notify.failure(err.message))
    .finally(() => {
      imgGallery.refresh();
      form.reset();
    });
});

window.addEventListener('scroll', e => {
  scrollValue = Math.round(window.scrollY);
 if(scrollValue > 400){
  topBtn.classList.add('visible')
 } else{
  topBtn.classList.remove('visible')
 }
  if (
    window.innerHeight + scrollValue >=
    document.body.offsetHeight
  ) {
    fetchData(options)
      .then(data => {
        const { totalHits, hits } = data;
        if (totalHits === 0) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        hits.forEach(
          ({
            largeImageURL,
            likes,
            views,
            comments,
            downloads,
            webformatURL,
          } = obj) => {
            const card = `<a href="${largeImageURL}" class="gallery__link">
                      <div class="card">
                        <img class="card__img" src="${webformatURL}" loading="lazy" />
                        <div class="card__text-box">
                          <div class="card__descr-box">
                            <h3 class="card__descr-title">Likes</h3>
                            <p class="card__descr">${likes}</p>
                            </div>
                          <div class="card__descr-box">
                            <h3 class="card__descr-title">Views</h3>
                            <p class="card__descr">${views}</p>
                          </div>
                          <div class="card__descr-box">
                            <h3 class="card__descr-title">Comments</h3>
                            <p class="card__descr">${comments}</p>
                          </div>
                          <div class="card__descr-box">
                            <h3 class="card__descr-title">Downloads</h3>
                            <p class="card__descr">${downloads}</p>
                          </div></div></div></a>`;
            gallery.insertAdjacentHTML('beforeend', card);
            imgGallery.elements.push(card);
          }
        );
      })
      .catch(err => Notify.failure(err.message))
      .finally(() => {
        imgGallery.refresh();
        options.page ++
      });
  }
});

topBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
})
