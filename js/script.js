// Smooth scrolling for navigation links
document.querySelectorAll('#navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: 'smooth'
    });
    
    // Update active link
    document.querySelectorAll('#navbar a').forEach(link => {
      link.classList.remove('current');
    });
    this.classList.add('current');
  });
});

// Update active navigation link on scroll
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('#navbar a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('current');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('current');
    }
  });
});

// Add animation to timeline items
const timelineItems = document.querySelectorAll('.timeline-item');

function checkTimelineItemsVisibility() {
  timelineItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    const itemBottom = item.getBoundingClientRect().bottom;
    const isVisible = (itemTop < window.innerHeight - 100) && (itemBottom > 0);
    
    if (isVisible) {
      item.classList.add('visible');
    }
  });
}

// Initial check
checkTimelineItemsVisibility();

// Check on scroll
window.addEventListener('scroll', checkTimelineItemsVisibility);

// Image Gallery and Carousel
document.addEventListener('DOMContentLoaded', function() {
  // Gallery Thumbnails
  const thumbnails = document.querySelectorAll('.thumbnail');
  const featuredImage = document.getElementById('featured-image');
  const modal = document.getElementById('image-modal');
  const closeModal = document.querySelector('.close-modal');
  const fullscreenBtn = document.querySelector('.fullscreen-btn');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-control.prev');
  const nextButton = document.querySelector('.carousel-control.next');
  const indicators = document.querySelectorAll('.indicator');
  
  let currentIndex = 0;
  let intervalId;
  
  // Update thumbnails and featured image
  function updateActiveImage(index) {
    // Update thumbnails
    thumbnails.forEach(thumb => {
      thumb.classList.remove('active');
    });
    thumbnails[index].classList.add('active');
    
    // Update featured image
    featuredImage.src = thumbnails[index].src;
    
    // Update carousel
    carouselItems.forEach(item => {
      item.classList.remove('active');
    });
    carouselItems[index].classList.add('active');
    
    // Update indicators
    indicators.forEach(ind => {
      ind.classList.remove('active');
    });
    indicators[index].classList.add('active');
    
    // Update current index
    currentIndex = index;
  }
  
  // Thumbnail click
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      updateActiveImage(index);
    });
  });
  
  // Open modal on fullscreen button click
  fullscreenBtn.addEventListener('click', function() {
    modal.style.display = 'block';
    startCarousel();
  });
  
  // Close modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    stopCarousel();
  });
  
  // Close modal when clicking outside the content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      stopCarousel();
    }
  });
  
  // Next slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % carouselItems.length;
    updateActiveImage(newIndex);
  }
  
  // Previous slide
  function prevSlide() {
    const newIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateActiveImage(newIndex);
  }
  
  // Navigation buttons
  nextButton.addEventListener('click', function() {
    nextSlide();
    resetCarouselTimer();
  });
  
  prevButton.addEventListener('click', function() {
    prevSlide();
    resetCarouselTimer();
  });
  
  // Indicators click
  indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      updateActiveImage(index);
      resetCarouselTimer();
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(event) {
    if (modal.style.display === 'block') {
      if (event.key === 'ArrowLeft') {
        prevSlide();
        resetCarouselTimer();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
        resetCarouselTimer();
      } else if (event.key === 'Escape') {
        modal.style.display = 'none';
        stopCarousel();
      }
    }
  });
  
  // Start auto rotation
  function startCarousel() {
    intervalId = setInterval(nextSlide, 4000);
  }
  
  // Stop auto rotation
  function stopCarousel() {
    clearInterval(intervalId);
  }
  
  // Reset timer when manually navigating
  function resetCarouselTimer() {
    stopCarousel();
    startCarousel();
  }
});
