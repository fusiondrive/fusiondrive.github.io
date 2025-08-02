/**
 * photo-wall.controller.js
 * 
 * Manages functionality for the "Teardown Journey" photo wall,
 * including lazy loading, keyboard navigation, and mouse wheel scrolling.
 */

// Handles the intersection observer callback for lazy loading images.
function handleImageIntersection(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        const image = entry.target;
        const imageUrl = image.getAttribute('data-src');

        if (imageUrl) {
            image.src = imageUrl;
            image.removeAttribute('data-src');
        }
        observer.unobserve(image);
    });
}

// Handles keyboard navigation (left/right arrows) for the gallery.
function handleKeyboardNavigation(event) {
    // Determine scroll amount based on new smaller item width + gap
    const scrollAmount = 120 + 16; 

    if (event.key === 'ArrowRight') {
        event.preventDefault();
        event.currentTarget.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        event.currentTarget.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Handles horizontal scrolling via the vertical mouse wheel.
function handleWheelScroll(event) {
    // If there's no vertical scroll, do nothing.
    if (event.deltaY === 0) return;

    // Prevent the default vertical scroll behavior.
    event.preventDefault();

    // Scroll the container horizontally instead.
    event.currentTarget.scrollLeft += event.deltaY;
}

// Main initialization function for the photo wall component.
export function initPhotoWall() {
    const photoWallContainer = document.querySelector('.photo-wall-container');
    if (!photoWallContainer) return;

    // --- 1. Initialize Lazy Loading ---
    const lazyImages = photoWallContainer.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 300px 300px 0px', // Pre-load images horizontally and vertically
            threshold: 0.01
        };
        const imageObserver = new IntersectionObserver(handleImageIntersection, observerOptions);
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // --- 2. Initialize Keyboard Navigation ---
    photoWallContainer.addEventListener('keydown', handleKeyboardNavigation);

    // --- 3. Initialize Mouse Wheel Scrolling ---
    photoWallContainer.addEventListener('wheel', handleWheelScroll);
}