/**
 * Antigravity SPA - Router
 * Handles client-side routing with hash-based navigation
 */

import { pages } from './data.js';

// DOM reference
const appView = document.getElementById('app-view');

/**
 * Parse hash route and return page key
 * #/ or empty -> 'home'
 * #/project/imac-g4 -> 'imac-g4'
 */
function parseRoute() {
    const hash = window.location.hash || '#/';

    // Home route
    if (hash === '#/' || hash === '' || hash === '#') {
        return 'home';
    }

    // Project routes: #/project/imac-g4 -> imac-g4
    const projectMatch = hash.match(/^#\/project\/(.+)$/);
    if (projectMatch) {
        return projectMatch[1];
    }

    // Section anchors on home page
    if (hash.startsWith('#') && !hash.startsWith('#/')) {
        return 'home';
    }

    return 'home';
}

/**
 * Render the view based on current route
 */
function render() {
    const pageKey = parseRoute();
    const page = pages[pageKey];

    if (!page) {
        // 404 - default to home
        window.location.hash = '#/';
        return;
    }

    // Update document title
    document.title = page.title;

    // Fade out current content
    appView.style.opacity = '0';

    setTimeout(() => {
        // Inject new content
        appView.innerHTML = page.content;

        // Scroll to top for article views
        if (pageKey !== 'home') {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }

        // Re-attach internal link handlers
        attachLinkHandlers();

        // Trigger scroll reveal animations
        initScrollReveal();

        // Fade in new content
        requestAnimationFrame(() => {
            appView.style.opacity = '1';
        });
    }, 300);
}

/**
 * Attach click handlers to internal [data-link] links
 */
function attachLinkHandlers() {
    document.querySelectorAll('a[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            // Handle section anchors on home page
            if (href.startsWith('#') && !href.startsWith('#/')) {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }

            // Push to history and render
            window.location.hash = href;
        });
    });
}

/**
 * Initialize scroll reveal for dynamically loaded content
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.ag-reveal');

    if (reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/**
 * Initialize the router
 */
export function initRouter() {
    // Handle hash changes
    window.addEventListener('hashchange', render);

    // Handle popstate (back/forward)
    window.addEventListener('popstate', render);

    // Initial render
    render();
}
