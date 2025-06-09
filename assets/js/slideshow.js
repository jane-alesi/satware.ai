// Slideshow functionality for FAQ answers - OPTIMIZED VERSION

document.addEventListener('DOMContentLoaded', initSlideshows);
document.addEventListener('DOMContentSwap', initSlideshows);
document.addEventListener('mdContentChanged', initSlideshows);

// Track initialized slideshows to prevent double-initialization
const initializedSlideshows = new Set();

// Function to initialize all slideshows on the page
function initSlideshows() {
  const slideshows = document.querySelectorAll('.faq-slideshow');

  if (slideshows.length === 0) {
    return;
  }

  console.log('Slideshows found:', slideshows.length);

  slideshows.forEach((slideshow, slideshowIndex) => {
    // Create unique ID for this slideshow
    const slideshowId = `slideshow-${slideshowIndex}`;

    // Skip if already initialized
    if (initializedSlideshows.has(slideshowId)) {
      return;
    }

    slideshow.setAttribute('id', slideshowId);
    initializedSlideshows.add(slideshowId);

    // Get slideshow elements
    const container = slideshow.querySelector('.faq-slideshow-container');
    const slides = slideshow.querySelectorAll('.faq-slide');
    const prevBtn = slideshow.querySelector('button.faq-slideshow-prev');
    const nextBtn = slideshow.querySelector('button.faq-slideshow-next');
    const dotsContainer = slideshow.querySelector('.faq-slideshow-dots');

    console.log('Slideshow elements found:', {
      container: !!container,
      slides: slides.length,
      prevBtn: !!prevBtn,
      nextBtn: !!nextBtn,
      dotsContainer: !!dotsContainer
    });

    if (!container || slides.length === 0) {
      return;
    }

    // Current slide index
    let currentSlide = 0;

    // Function to go to a specific slide
    function goToSlide(index) {
      console.log(`goToSlide called for slideshow ${slideshowId} with index ${index}`);

      // Handle wrapping around
      if (index < 0) {
        index = slides.length - 1;
        console.log(`Wrapped to last slide: ${index}`);
      } else if (index >= slides.length) {
        index = 0;
        console.log(`Wrapped to first slide: ${index}`);
      }

      // Update current slide index
      const previousSlide = currentSlide;
      currentSlide = index;
      console.log(`Changing slide from ${previousSlide} to ${currentSlide}`);

      // Move the container to show the current slide (OPTIMIZED)
      const transformValue = `translateX(-${currentSlide * 100}%)`;
      console.log(`Setting transform to: ${transformValue}`);
      container.style.transform = transformValue;

      // Update active dot (OPTIMIZED)
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.faq-slideshow-dot');
        const activeDot = dotsContainer.querySelector('.faq-slideshow-dot.active');
        const newActiveDot = dots[currentSlide];

        if (activeDot && activeDot !== newActiveDot) {
          activeDot.classList.remove('active');
        }
        if (newActiveDot && !newActiveDot.classList.contains('active')) {
          newActiveDot.classList.add('active');
        }

        console.log(`Updated active dot to index ${currentSlide}`);
      }
    }

    // Create dots if they don't exist
    if (dotsContainer && dotsContainer.children.length === 0) {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'faq-slideshow-dot';
        if (i === 0) {
          dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    // FIXED: Only use addEventListener (remove onclick to prevent double execution)
    if (prevBtn) {
      console.log('Adding click event listener to prev button for slideshow', slideshowId);

      // Remove any existing handlers
      prevBtn.onclick = null;

      // Add single event listener
      prevBtn.addEventListener('click', (e) => {
        console.log('Prev button clicked for slideshow', slideshowId);
        e.stopPropagation();
        e.preventDefault();
        goToSlide(currentSlide - 1);
      }, { once: false, passive: false });

      prevBtn.style.cursor = 'pointer';
    }

    if (nextBtn) {
      console.log('Adding click event listener to next button for slideshow', slideshowId);

      // Remove any existing handlers
      nextBtn.onclick = null;

      // Add single event listener
      nextBtn.addEventListener('click', (e) => {
        console.log('Next button clicked for slideshow', slideshowId);
        e.stopPropagation();
        e.preventDefault();
        goToSlide(currentSlide + 1);
      }, { once: false, passive: false });

      nextBtn.style.cursor = 'pointer';
    }

    // Initialize the first slide
    goToSlide(0);

    // Add keyboard navigation when slideshow is in focus
    slideshow.tabIndex = 0;
    slideshow.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      }
    });

    // Add optimized swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    slideshow.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slideshow.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;

      if (touchEndX < touchStartX - swipeThreshold) {
        goToSlide(currentSlide + 1);
      } else if (touchEndX > touchStartX + swipeThreshold) {
        goToSlide(currentSlide - 1);
      }
    }
  });
}

// MutationObserver to detect when new slideshows are added to the DOM
// FIXED: Renamed to avoid conflicts and added throttling
const slideshowObserver = new MutationObserver((mutations) => {
  let hasRelevantMutation = false;

  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const node = mutation.addedNodes[i];
        if (node.nodeType === 1 && (node.classList?.contains('faq-slideshow') ||
            node.querySelector?.('.faq-slideshow'))) {
          hasRelevantMutation = true;
          break;
        }
      }
    }
  });

  if (hasRelevantMutation) {
    setTimeout(initSlideshows, 100);
  }
});

// Start observing the document
slideshowObserver.observe(document.body, {
  childList: true,
  subtree: true
});

// Additional event listener for dynamically loaded content
window.addEventListener('load', function() {
  setTimeout(initSlideshows, 500);
});

// For Material for MkDocs specific events
if (typeof document$.subscribe === 'function') {
  document$.subscribe(function() {
    setTimeout(initSlideshows, 100);
  });
}
