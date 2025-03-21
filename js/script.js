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
