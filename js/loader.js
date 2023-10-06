function addLoader() {
    const main = document.querySelector(".main");
    const loaderWrapper = document.createElement("div");
    const loader = document.createElement("div");
    loaderWrapper.classList.add("loader--wrapper");
    loader.classList.add("loader");
    main.appendChild(loaderWrapper);
    loaderWrapper.appendChild(loader);
}
function removeLoader() {
    const loader = document.querySelector(".loader--wrapper");
    loader.remove();
}

export {addLoader, removeLoader};

