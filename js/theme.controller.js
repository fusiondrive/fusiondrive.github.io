/**
 * theme.controller.js
 * 
 * Manages the random theme selection and dark mode responsiveness.
 */
export function initTheme() {
    const themes = ['default', 'ocean', 'forest', 'lemon'];
    const currentRandomTheme = themes[Math.floor(Math.random() * themes.length)];

    function applyTheme(themeName) {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const themeVariant = isDarkMode? `${themeName}-dark` : `${themeName}-light`;
        document.documentElement.setAttribute('data-theme', themeVariant);
        console.log(`Random theme applied: ${themeVariant}`);
    }

    applyTheme(currentRandomTheme);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        applyTheme(currentRandomTheme);
    });
}