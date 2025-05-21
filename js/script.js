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

// Project carousel functionality
function initCarousels() {
  console.log('Initializing carousels...');
  // Initialize all project carousels
  const projectCarousels = document.querySelectorAll('.project-carousel');
  
  // Check if we found any carousels
  if (projectCarousels.length === 0) {
    console.error('No project carousels found!');
    return;
  }
  
  console.log('Found ' + projectCarousels.length + ' carousels');
  
  const modal = document.getElementById('image-modal');
  const closeModal = document.querySelector('.close-modal');
  const modalCarouselInner = document.querySelector('.modal .carousel-inner');
  const modalIndicators = document.querySelector('.modal .carousel-indicators');
  const modalPrevButton = document.querySelector('.modal .carousel-control.prev');
  const modalNextButton = document.querySelector('.modal .carousel-control.next');
  
  let currentModalIndex = 0;
  let currentModalSlides = [];
  
  // Set up each project carousel
  projectCarousels.forEach(carousel => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const indicators = carousel.querySelectorAll('.indicator');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const fullscreenBtn = carousel.querySelector('.fullscreen-btn');
    
    let currentIndex = 0;
    
    // Function to update active slide
    function showSlide(index) {
      // Remove active class from all slides and indicators
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and indicator
      slides[index].classList.add('active');
      indicators[index].classList.add('active');
      
      currentIndex = index;
    }
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = slides.length - 1;
      showSlide(newIndex);
    });
    
    nextBtn.addEventListener('click', () => {
      let newIndex = currentIndex + 1;
      if (newIndex >= slides.length) newIndex = 0;
      showSlide(newIndex);
    });
    
    // Add click events for indicators
    indicators.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Open fullscreen gallery modal
    fullscreenBtn.addEventListener('click', () => {
      openGalleryModal(carousel, currentIndex);
    });
  });
  
  // Function to open the gallery modal
  function openGalleryModal(carousel, startIndex) {
    // Get all slide images from this carousel
    const projectType = carousel.querySelector('.carousel-slide.active').dataset.project;
    const slides = carousel.querySelectorAll('.carousel-slide');
    
    // Clear previous modal content
    modalCarouselInner.innerHTML = '';
    modalIndicators.innerHTML = '';
    
    // Create carousel items in the modal
    slides.forEach((slide, index) => {
      // Create carousel item
      const carouselItem = document.createElement('div');
      carouselItem.className = index === startIndex ? 'carousel-item active' : 'carousel-item';
      
      // Create image
      const img = document.createElement('img');
      img.src = slide.src;
      img.alt = slide.alt;
      
      carouselItem.appendChild(img);
      modalCarouselInner.appendChild(carouselItem);
      
      // Create indicator
      const indicator = document.createElement('span');
      indicator.className = index === startIndex ? 'indicator active' : 'indicator';
      indicator.dataset.index = index;
      modalIndicators.appendChild(indicator);
    });
    
    // Store current modal slides for navigation
    currentModalSlides = Array.from(modalCarouselInner.querySelectorAll('.carousel-item'));
    currentModalIndex = startIndex;
    
    // Show the modal
    modal.style.display = 'block';
    
    // Update indicator click events
    updateModalIndicatorEvents();
  }
  
  // Update active slide in modal
  function updateModalSlide(index) {
    // Remove active class from all slides and indicators
    currentModalSlides.forEach(slide => slide.classList.remove('active'));
    modalIndicators.querySelectorAll('.indicator').forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and indicator
    currentModalSlides[index].classList.add('active');
    modalIndicators.querySelectorAll('.indicator')[index].classList.add('active');
    
    currentModalIndex = index;
  }
  
  // Modal next slide
  function nextModalSlide() {
    const newIndex = (currentModalIndex + 1) % currentModalSlides.length;
    updateModalSlide(newIndex);
  }
  
  // Modal previous slide
  function prevModalSlide() {
    const newIndex = (currentModalIndex - 1 + currentModalSlides.length) % currentModalSlides.length;
    updateModalSlide(newIndex);
  }
  
  // Update indicator click events in modal
  function updateModalIndicatorEvents() {
    modalIndicators.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        updateModalSlide(index);
      });
    });
  }
  
  // Modal navigation buttons
  modalNextButton.addEventListener('click', () => {
    nextModalSlide();
  });
  
  modalPrevButton.addEventListener('click', () => {
    prevModalSlide();
  });
  
  // Close modal
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Close modal when clicking outside the content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Keyboard navigation for modal
  document.addEventListener('keydown', (event) => {
    if (modal.style.display === 'block') {
      if (event.key === 'ArrowLeft') {
        prevModalSlide();
      } else if (event.key === 'ArrowRight') {
        nextModalSlide();
      } else if (event.key === 'Escape') {
        modal.style.display = 'none';
      }
    }
  });
}

// More robust carousel initialization
function initCarouselsWhenReady() {
  console.log('Attempting to initialize carousels...');
  try {
    if (document.querySelectorAll('.project-carousel').length > 0) {
      console.log('Found carousel elements, initializing...');
      initCarousels();
    } else {
      console.warn('No carousel elements found yet, trying again in 100ms...');
      setTimeout(initCarouselsWhenReady, 100);
    }
  } catch (error) {
    console.error('Error initializing carousels:', error);
  }
}

// Initialize carousels when the DOM is loaded
document.addEventListener('DOMContentLoaded', initCarouselsWhenReady);

// Backup initialization in case DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('Document already interactive or complete, initializing soon...');
  setTimeout(initCarouselsWhenReady, 100);
}
