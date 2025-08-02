/**
 * nav.controller.js
 * 
 * Manages the active state for navigation links based on scroll position.
 */
export function initNav() {
    const navLinks = document.querySelectorAll('.m3-navigation-bar a');
    const sections = document.querySelectorAll('main > *[id]');

    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href matches the current section's ID
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}