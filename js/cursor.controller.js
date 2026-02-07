/**
 * cursor.controller.js
 * 
 * Custom "Agent" cursor implementation
 * - 6px white dot follows mouse strictly
 * - 32px ring follows with lerp delay
 * - Ring expands on interactive element hover
 * - "Wake on move" - cursor hidden until first interaction
 */

export function initCursor() {
    // Don't init on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        return;
    }

    // Get cursor elements from DOM (created in HTML shell)
    const dot = document.querySelector('.ag-cursor-dot');
    const ring = document.querySelector('.ag-cursor-ring');

    if (!dot || !ring) {
        console.warn('Cursor elements not found');
        return;
    }

    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isAwake = false;

    // Lerp factor for ring (lower = more lag)
    const lerpFactor = 0.15;

    // "Wake on Move" - show cursor on first interaction
    function wakeCursor(e) {
        if (!isAwake) {
            isAwake = true;

            // Set initial position to prevent jump from (0,0)
            mouseX = e.clientX;
            mouseY = e.clientY;
            ringX = mouseX;
            ringY = mouseY;

            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;

            // Fade in cursor
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        }
    }

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        wakeCursor(e);

        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows instantly
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
    });

    // Animation loop for ring lerp
    function animateRing() {
        ringX += (mouseX - ringX) * lerpFactor;
        ringY += (mouseY - ringY) * lerpFactor;

        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;

        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state for interactive elements (using event delegation for SPA)
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches('a, button, .ag-card, [data-link]')) {
            ring.classList.add('is-hovering');
        }
    }, true);

    document.addEventListener('mouseleave', (e) => {
        if (e.target.matches('a, button, .ag-card, [data-link]')) {
            ring.classList.remove('is-hovering');
        }
    }, true);

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        if (isAwake) {
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        }
    });
}
