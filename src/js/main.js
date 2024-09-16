import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const my_api = '45998239-83277c8f1384b713dfba7e075';
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const images = document.querySelector('.images');
const loadingMessage = document.querySelector('.loading-message');
const loadMoreBtn = document.querySelector('.load-more-btn');

let page = 1;
const perPage = 20;
let lightbox;
let totalImages = 0;

async function fetchImages() {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: my_api,
        q: searchInput.value,
        image_type: 'photo',
        per_page: perPage,
        page: page,
      },
    });

    const data = response.data;
    totalImages += data.hits.length;
    console.log(totalImages);
    console.log(data.totalHits);
    if (data.hits.length === 0 && page === 1) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      loadMoreBtn.style.display = 'none';
      return;
    } else if (totalImages >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    } else {
      loadMoreBtn.style.display = 'block';
    }
    const markup = data.hits
      .map(image => {
        return `
        <li class="image">
            <a class="image-link" href="${image.largeImageURL}"><img class="img" src="${image.webformatURL}" alt="${image.tags}"></a>
            <div class="image-info">
              <p class="image-desc">
               <span class="desc title">Likes</span> 
               <span class="desc value">${image.likes}</span> 
              </p>
              <p class="image-desc">
               <span class="desc title">Views</span> 
               <span class="desc value">${image.views}</span> 
              </p>
              <p class="image-desc">
               <span class="desc title">Comments</span> 
               <span class="desc value">${image.comments}</span>
              </p>
              <p class="image-desc">
               <span class="desc title">Downloads</span> 
               <span class="desc value">${image.downloads}</span>
              </p>
            </div>
        </li>
        `;
      })
      .join('');

    images.insertAdjacentHTML('beforeend', markup);

    if (lightbox) {
      lightbox.destroy();
    }

    lightbox = new SimpleLightbox('.image a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
      backgroundColor: 'red',
    });

    lightbox.refresh();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `An error occurred: ${error.message}`,
      position: 'topRight',
      backgroundColor: 'red',
    });
  } finally {
    loadingMessage.style.display = 'none';
  }
}

searchBtn.addEventListener('click', async e => {
  e.preventDefault();
  searchInput.value = searchInput.value.trim();
  images.innerHTML = '';
  page = 1;
  totalImages = 0;
  loadingMessage.style.display = 'block';
  await fetchImages();
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  loadingMessage.style.display = 'block';
  await fetchImages();
});
