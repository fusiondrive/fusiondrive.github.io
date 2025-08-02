/**
 * fab.controller.js
 * 
 * Manages the visibility and behavior of the "Back to Top" Floating Action Button.
 */
export function initFab() {
    const fab = document.getElementById('back-to-top-fab');
    if (!fab) return;

    const scrollThreshold = 400;

    const checkVisibility = () => {
        if (window.scrollY > scrollThreshold) {
            fab.classList.remove('m3-fab--hidden');
        } else {
            fab.classList.add('m3-fab--hidden');
        }
    };

    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility();

    fab.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = fab.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
         
        if (targetElement) {
             targetElement.scrollIntoView({ behavior: 'smooth' });
        } else {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}