class Slider {
    constructor() {
        this.slides = document.querySelectorAll(".slide");
        this.prevBtn = document.querySelector(".btn-prev");
        this.nextBtn = document.querySelector(".btn-next");
        
        this.currentSlide = 0;
        this.maxSlide = this.slides.length - 1;
        this.setEventListeners();
    }

    moveSlides() {
        this.slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${indx * 100}%)`;
          });
    }
    nextSlide() {
        if (this.currentSlide === this.maxSlide) {
            this.currentSlide = 0;
          } else {
            this.currentSlide++;
          }

          this.slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - this.currentSlide)}%)`;
          });
        
    }
    prevSlide() {
        if (this.currentSlide === 0) {
            this.currentSlide = this.maxSlide;
          } else {
            this.currentSlide--
          }
          this.slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - this.currentSlide)}%)`;
          });
    }
    setEventListeners() {
        this.nextBtn.addEventListener("click", this.nextSlide.bind(this))
        this.prevBtn.addEventListener("click", this.prevSlide.bind(this))
    }

}
export default Slider ;