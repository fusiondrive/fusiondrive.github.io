/**
 * CABSFlight Showcase — GSAP ScrollTrigger Controller
 *
 * Layout:  Flexbox "podium" — 3 phones side-by-side, center elevated.
 * Anim:    Micro-interaction — subtle fade + small Y shift:
 *            • INITIAL_Y = 80px (not hundreds) → "materialise in place"
 *            • opacity 0→1 carries the visual weight
 *            • center-first stagger via manual timeline offsets
 *            • per-phone randomised ease for organic feel
 *            • scrub: 0.5 — tight, responsive finger-tracking
 *
 * Trigger: "top 80%" → "center 50%" on #phones-wrap.
 *          No pin. No sticky. No toggleActions.
 *
 * Relies on window.gsap & window.ScrollTrigger loaded via CDN.
 * Called by router.js after the home view is injected into the DOM.
 */

/* ── Helpers ───────────────────────────────────────────── */

function randomEase() {
    const pool = [
        'power2.out',
        'power3.out',
        'sine.out',
        'circ.out',
    ];
    return pool[Math.floor(Math.random() * pool.length)];
}

function getPodiumConfig() {
    const vw = window.innerWidth;
    if (vw <= 480) return { sideY: 28 };
    if (vw <= 768) return { sideY: 40 };
    return { sideY: 60 };
}

/* ── Main init ─────────────────────────────────────────── */

export function initShowcase() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) {
        console.warn('[Showcase] GSAP not loaded — skipping.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // SPA safety — kill previous instances
    ScrollTrigger.getAll().forEach(t => t.kill());

    const pL = document.getElementById('ph-left');
    const pC = document.getElementById('ph-center');
    const pR = document.getElementById('ph-right');

    if (!pL || !pC || !pR) return;

    const podium = getPodiumConfig();

    /* ─────────────────────────────────────────────────────
     * INITIAL STATE — Micro-interaction approach
     *
     * 只下移 80px + 全透明，不缩放。
     * 视觉效果：手机从"虚无"中原地浮现，
     * 而非从画面外飞入。
     * ───────────────────────────────────────────────────── */
    const INITIAL_Y = 80;

    gsap.set(pL, { y: podium.sideY + INITIAL_Y, opacity: 0 });
    gsap.set(pC, { y: 0            + INITIAL_Y, opacity: 0 });
    gsap.set(pR, { y: podium.sideY + INITIAL_Y, opacity: 0 });

    /* ─────────────────────────────────────────────────────
     * SCROLL-SCRUBBED TIMELINE
     *
     *  scrub: 0.5   — 比 1 更紧的跟手，移动端丝滑
     *  start/end    — 紧凑区间，80px 位移一划即完成
     *  无 pin / toggleActions / scale
     * ───────────────────────────────────────────────────── */
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#phones-wrap',
            start: 'top 80%',
            end:   'center 50%',
            scrub: 0.5,
        },
    });

    /* CENTER — position 0, 先浮现 */
    tl.to(pC, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: randomEase(),
    }, 0);

    /* LEFT — offset 0.08, 微微滞后 */
    tl.to(pL, {
        y: podium.sideY,
        opacity: 1,
        duration: 0.5,
        ease: randomEase(),
    }, 0.08);

    /* RIGHT — 与 LEFT 同步 */
    tl.to(pR, {
        y: podium.sideY,
        opacity: 1,
        duration: 0.5,
        ease: randomEase(),
    }, 0.08);

    /* ── Resize handler ── */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
    });
}
