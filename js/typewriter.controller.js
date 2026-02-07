/**
 * typewriter.controller.js
 * 
 * Antigravity-style typewriter animation with Aurora Energy cursor
 * - Warm-up: Cursor breathes (opacity pulse)
 * - Stream: Characters appear, cursor stays stable
 * - Vanish: Cursor fades out after completion
 */

const TYPEWRITER_TEXT = 'STEVE WANG';
const WARMUP_DURATION = 600; // ~3 rapid blinks before typing
const MIN_CHAR_DELAY = 50;
const MAX_CHAR_DELAY = 120;
const CURSOR_FADE_DURATION = 600;

export function initTypewriter() {
    const textEl = document.getElementById('typewriter-text');
    const cursorEl = document.getElementById('typewriter-cursor');

    if (!textEl || !cursorEl) {
        return; // Not on home page
    }

    // Reset state
    textEl.textContent = '';
    cursorEl.className = 'ag-typewriter-cursor';
    cursorEl.style.opacity = '';

    // Start with breathing animation
    cursorEl.classList.add('is-breathing');

    let charIndex = 0;

    // Phase 1: Warm-up Breathe
    function warmUp() {
        return new Promise(resolve => {
            setTimeout(() => {
                cursorEl.classList.remove('is-breathing');
                cursorEl.classList.add('is-typing');
                resolve();
            }, WARMUP_DURATION);
        });
    }

    // Phase 2: Typing Stream (stable cursor, no distortion)
    function typeNextChar() {
        if (charIndex < TYPEWRITER_TEXT.length) {
            textEl.textContent += TYPEWRITER_TEXT[charIndex];
            charIndex++;

            const delay = Math.random() * (MAX_CHAR_DELAY - MIN_CHAR_DELAY) + MIN_CHAR_DELAY;
            setTimeout(typeNextChar, delay);
        } else {
            vanishCursor();
        }
    }

    // Phase 3: Cursor Vanish
    function vanishCursor() {
        cursorEl.classList.remove('is-typing');
        cursorEl.style.transition = `opacity ${CURSOR_FADE_DURATION}ms ease-out`;
        cursorEl.style.opacity = '0';
    }

    // Start the sequence
    warmUp().then(typeNextChar);
}
