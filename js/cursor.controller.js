/**
 * cursor.controller.js
 * 
 * Custom "Agent" cursor implementation
 * - 6px white dot follows mouse strictly
 * - 32px ring follows with lerp delay
 * - Ring expands on interactive element hover
 */

export function initCursor() {
    // Don't init on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        return;
    }

    // Create cursor elements
    const dot = document.createElement('div');
    dot.className = 'ag-cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.className = 'ag-cursor-ring';
    document.body.appendChild(ring);

    // Mouse position tracking
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    // Lerp factor for ring (lower = more lag)
    const lerpFactor = 0.15;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
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

    // Hover state for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .ag-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.classList.add('is-hovering');
        });

        el.addEventListener('mouseleave', () => {
            ring.classList.remove('is-hovering');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
}
