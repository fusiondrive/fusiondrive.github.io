/**
 * antigravity.main.js
 * 
 * Main entry point for Antigravity portfolio
 * Initializes all interactive components
 */

import { initCursor } from './cursor.controller.js';

// Initialize scroll reveal with IntersectionObserver
function initScrollReveal() {
    const elements = document.querySelectorAll('.ag-reveal');

    if (elements.length === 0) {
        console.warn('No .ag-reveal elements found');
        return;
    }

    console.log(`✦ Found ${elements.length} elements to reveal`);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Element visible:', entry.target);
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// Initialize navigation active state
function initNav() {
    const navLinks = document.querySelectorAll('.ag-nav a');
    const sections = document.querySelectorAll('section[id], header[id], footer[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-20% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
}

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initScrollReveal();
    initNav();

    console.log('✦ Antigravity initialized');
});
