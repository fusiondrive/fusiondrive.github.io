/**
 * antigravity.main.js
 * 
 * Main entry point for Antigravity SPA
 * Initializes app shell components (cursor) and router
 */

import { initCursor } from './cursor.controller.js';
import { initRouter } from './router.js';

// Initialize navigation active state for home view sections
function initNavObserver() {
    const navLinks = document.querySelectorAll('.ag-nav a');
    const sections = document.querySelectorAll('section[id], header[id], footer[id]');

    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    // Only update active state for section links (not page links)
                    if (href && href.startsWith('#') && !href.startsWith('#/')) {
                        link.classList.toggle('active', href === `#${id}`);
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// DOM Ready - Initialize App Shell (once, never reloaded)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize persistent cursor
    initCursor();

    // Initialize SPA router
    initRouter();

    // Observe sections for nav active state
    initNavObserver();

    // Fade in body
    document.body.style.opacity = '1';

    console.log('✦ Antigravity SPA initialized');
});
