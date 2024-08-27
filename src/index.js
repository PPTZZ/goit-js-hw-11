import { fetchData } from './partials/data-fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');


gallery.addEventListener('click', e => {
  e.preventDefault();
  if(e.target.nodeName != 'IMG'){
    return
  }
  let imgGallery = new SimpleLightbox('.gallery a');
  imgGallery.on('closed.simplelightbox', () => {
    imgGallery.refresh();
  });
});

document.querySelector('.search-form').addEventListener('submit', e => {
  e.preventDefault();
  const { elements } = e.target;
  const options = {
    params: elements[0].value,
    perPage: 3,
    page: 1,
  };
  fetchData(options).then(data => {
    const { total, totalHits, hits } = data;
    hits.forEach(({largeImageURL, previewURL,likes,views,comments,downloads}=obj)=>{
      const card =`<a href="${largeImageURL}" class="gallery__link">
                      <div class="card">
                        <img class="card__img" src="${previewURL}" />
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
      gallery.insertAdjacentHTML('beforeend', card)
    })
  });
});



