import Slider from "./slide.js";

function getGallery(key) {
  const API_KEY = 'Vsjek4agqqjVR5PVaeJrGbuTS7sPivIQpSCn_t6iMhk';
  const API_URL = 'https://api.unsplash.com/';
  const keyword = key;
  const url = `${API_URL}photos/random?client_id=${API_KEY}&count=30&query=${keyword}`;

  const main = document.querySelector('.main');
  main.classList.add('loading'); 
  return fetch(url)
    .then(response => checkStatusResponse(response))
    .then(data => {
       setTimeout(() => {
        main.classList.remove('loading'); 
      }, 2000); 
      changeBackgroundImage(data[1].urls.regular)
      addGallery(data)
      new Slider()
    })
    .catch(error => console.error('Error:', error))
    
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
    <a href="${imageDownloadLink}" target="_blank" rel="noopener noreferrer">
      <img src="${imageUrl}" alt="${imageAlt}" oncontextmenu="event.preventDefault()">
    </a>
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
  const header = document.querySelector(".header");
  console.log(header);
  header.classList.add("top");
}
function changeBackgroundImage(imageUrl) {
  const mainCard = document.querySelector('.main__card');
  const currentBackgroundImage = `url("img/bg3.jfif")`;
  imageUrl ? mainCard.style.backgroundImage = `url("${imageUrl}")` : currentBackgroundImage;
}


const form = document.querySelector('#search');
form.addEventListener('submit', filterGallery);

new Slider()