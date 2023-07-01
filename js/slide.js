class Slider {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.prevBtn = document.querySelector(".btn-prev");
    this.nextBtn = document.querySelector(".btn-next");

    this.currentSlide = 0;
    this.maxSlide = this.slides.length -1;

    this.touchStartX = 0;
    this.touchEndX = 0;

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

  handleTouchStart(event) {
    this.touchStartX = event.touches[0].clientX;

  }

  handleTouchMove(event) {
    this.touchEndX = event.touches[0].clientX;

  }

  handleTouchEnd() {

    const touchDiff = this.touchStartX - this.touchEndX;
    const swipeThreshold = 100;
    if (touchDiff > swipeThreshold && this.currentSlide < this.maxSlide) {
      this.nextSlide();
    } else if (touchDiff < -swipeThreshold && this.currentSlide > 0) {
      this.prevSlide();
    }
  }

  setEventListeners() {
    this.nextBtn.addEventListener("click", this.nextSlide.bind(this));
    this.prevBtn.addEventListener("click", this.prevSlide.bind(this));
    this.slides.forEach(slide => {
      slide.addEventListener("touchstart", this.handleTouchStart.bind(this), { passive: true });
      slide.addEventListener("touchmove", this.handleTouchMove.bind(this), { passive: true });
      slide.addEventListener("touchend", this.handleTouchEnd.bind(this), { passive: true });
    });
  }
}

export default Slider;