  // Hero slider logic
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.hero-nav .prev');
  const nextBtn = document.querySelector('.hero-nav .next');
  let currentSlide = 0;
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  function prevSlideFunc() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlideFunc);
  // Auto slide every 6 seconds
  setInterval(nextSlide, 6000);

  // Scroll controls for product rows (optional)
  // Could add later if requested