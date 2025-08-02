/**
 * scroll-reveal.controller.js
 * 
 * Manages the reveal-on-scroll animation for content sections.
 */
export function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => observer.observe(el));
}