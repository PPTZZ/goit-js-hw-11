import axios from 'axios';

const KEY = '45639968-4ab0c3e34d3afa9a12b28af2f';
const ENDPOINT = 'https://pixabay.com/api/';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

// Grtting data
export const fetchData = async ({ params, perPage, page }) => {
  try {
    const { data } = await axios.get(
      `${ENDPOINT}?key=${KEY}&q=${params}&${searchParams}&per_page=${perPage}&page=${page}`
    );
    return data;
  } catch (error) {
    return error;
  }
};


// function for populating the gallery
export const generateGallery = (data, container, array) => {
  if (data === undefined) {
    throw new Error(
      "We're sorry, but you've reached the end of search results."
    );
  }
  data.forEach(
    ({ largeImageURL, likes, views, comments, downloads, webformatURL }) => {
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
      container.insertAdjacentHTML('beforeend', card);
      array.elements.push(card);
    }
  );
};
