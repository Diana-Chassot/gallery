import Slider from "./slide.js";
function getGallery(key = "code") {
  const API_KEY = 'Vsjek4agqqjVR5PVaeJrGbuTS7sPivIQpSCn_t6iMhk';
  const API_URL = 'https://api.unsplash.com/';
  const keyword = key;
  const url = `${API_URL}photos/random?client_id=${API_KEY}&count=30&query=${keyword}`;

  return fetch(url)
    .then(response => checkStatusResponse(response))
    .then(data => {
      addGallery(data)
    })
    .catch(error => console.error('Error:', error));
}

function checkStatusResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Error fetching image from Unsplash');
  }
}

function galleryTemplate(picture) {
  const URL_IMAGE_DEFAULT = "https://static.semrush.com/blog/uploads/files/7a/c4/7ac4acca6898c1bb4781b64dd751a8df/what-does-error-404-not-found-mean.svg";
  const imageUrl = picture.urls.regular || URL_IMAGE_DEFAULT;
  const imageAlt = picture.alt_description || "Image from Unsplash";
  const imageDownloadLink = picture.links.download;

  const img = `
  <div class="slide">
    <a href="${imageDownloadLink}" target="_blank">
      <img src="${imageUrl}" alt="${imageAlt}">
    </a>
    <span class="img-descr">${imageAlt}</span>
  </div>
  `;
  return img;

}
function addGallery(pictures) {
  const slider = document.querySelector(".slider");
  slider.innerHTML = "";

  let fragment = "";

  pictures.forEach((picture) => {
    const galleryItem = galleryTemplate(picture);
    fragment += galleryItem;
  })
  slider.insertAdjacentHTML("beforeend", fragment);
}
function filterGallery(e) {
  e.preventDefault();
  const filterInput = document.getElementById("search__input");
  const keyword = filterInput.value;
  if (keyword) {
    const title = document.querySelector(".title");
    title.textContent = keyword;
    getGallery(keyword);

  }

}
const form = document.querySelector('#search');
form.addEventListener('submit', filterGallery);

/* getGallery() */
new Slider()