class Slider {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.prevBtn = document.querySelector(".btn-prev");
    this.nextBtn = document.querySelector(".btn-next");

    this.currentSlide = 0;
    this.maxSlide = this.slides.length -1;

    this.setEventListeners();
    this.checkSLides();
  }

  moveSlides() {
    this.slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - this.currentSlide)}%)`;
    });
    this.checkSLides()
  }
  checkSLides(){
    this.currentSlide === this.maxSlide ? this.nextBtn.style.display = "none" : this.nextBtn.style.display = "block";
    this.currentSlide === 0 ? this.prevBtn.style.display = "none" : this.prevBtn.style.display = "block";
  }
  nextSlide() {
    this.currentSlide++;
    this.moveSlides();
  }

  prevSlide() {
    this.currentSlide--;
    this.moveSlides();
  }

  setEventListeners() {
    this.nextBtn.addEventListener("click", this.nextSlide.bind(this));
    this.prevBtn.addEventListener("click", this.prevSlide.bind(this));
  }
}

export default Slider;