/**
 * main.js
 * 
 * Main entry point for all site JavaScript.
 * Imports and initializes all controller modules.
 */

// Import controller modules
import { initNav } from './nav.controller.js';
import { initTheme } from './theme.controller.js';
import { initFab } from './fab.controller.js';
import { initScrollReveal } from './scroll-reveal.controller.js';

// Wait for the DOM to be fully loaded before initializing scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all imported components
    initNav();
    initTheme();
    initFab();
    initScrollReveal();
    
    console.log("All components initialized.");
});