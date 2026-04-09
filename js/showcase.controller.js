/**
 * CABSFlight Showcase — GSAP ScrollTrigger Controller
 *
 * Layout:  Flexbox "podium" — 3 phones side-by-side, center elevated.
 * Anim:    Asymmetric bottom-to-center push with:
 *            • center-first stagger (manual timeline offsets)
 *            • per-phone randomised duration & ease
 *            • trigger-once auto-play (NOT scrub-bound)
 *
 * Trigger: when the section scrolls into view (~60% of viewport),
 *          the timeline plays automatically in ~1 s.
 *          Scrolling back up reverses it.
 *
 * Relies on window.gsap & window.ScrollTrigger loaded via CDN.
 * Called by router.js after the home view is injected into the DOM.
 */

/* ── Helpers ───────────────────────────────────────────── */

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function randomEase() {
    const pool = [
        'power3.out',
        'power4.out',
        'back.out(1.0)',
        'back.out(1.4)',
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
     * INITIAL STATE
     * Push phones 420px below their podium resting position,
     * fully transparent, slightly scaled down.
     * Labels live inside each .ag-iphone, so they move
     * automatically with the parent's transform.
     * ───────────────────────────────────────────────────── */
    const INITIAL_Y = 420;

    gsap.set(pL, { y: podium.sideY + INITIAL_Y, opacity: 0, scale: 0.90 });
    gsap.set(pC, { y: 0            + INITIAL_Y, opacity: 0, scale: 0.90 });
    gsap.set(pR, { y: podium.sideY + INITIAL_Y, opacity: 0, scale: 0.90 });

    /* ─────────────────────────────────────────────────────
     * PER-PHONE RANDOMISED CONFIGS
     *
     * 【改动】duration 区间从 0.48-0.70 提升到 0.8-1.2 秒，
     * 因为去掉 scrub 后时长由真实秒数决定，需要稍长一些
     * 才能看起来干脆利落而非一闪而过。
     * ───────────────────────────────────────────────────── */
    const cfgC = { dur: rand(0.80, 0.95), ease: randomEase() };  // center (fastest)
    const cfgL = { dur: rand(0.95, 1.15), ease: randomEase() };  // left
    const cfgR = { dur: rand(0.95, 1.15), ease: randomEase() };  // right

    /* ─────────────────────────────────────────────────────
     * SCROLL-TRIGGERED AUTO-PLAY TIMELINE
     *
     * 【核心改动】
     *  ① 移除 scrub              — 不再绑定滚轮进度
     *  ② 移除 end / markers
     *  ③ 添加 toggleActions       — 滚入自动播放，滚回自动倒放
     *  ④ trigger 指向手机容器      — 确保标题已可见后才触发
     *  ⑤ start: "top 65%"        — 容器顶部到达视口 65% 处触发
     *                               （用户刚好看完标题和副标题）
     * ───────────────────────────────────────────────────── */
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#phones-wrap',          // 手机容器，而非整个 section
            start: 'top 65%',                 // 容器顶部到达视口 65% 处
            toggleActions: 'play none none reverse',
            //               ↑    ↑    ↑    ↑
            //          onEnter  onLeave  onEnterBack  onLeaveBack
            //          播放      不动      不动         倒放回去
        },
    });

    /*
     * CENTER PHONE — fires first (position 0)
     */
    tl.to(pC, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: cfgC.dur,
        ease: cfgC.ease,
    }, 0);

    /*
     * LEFT PHONE — 0.12s after center
     * 【改动】stagger 间隔从 0.08 增大到 0.12，
     * 配合更长的 duration 保持节奏感。
     */
    tl.to(pL, {
        y: podium.sideY,
        opacity: 1,
        scale: 1,
        duration: cfgL.dur,
        ease: cfgL.ease,
    }, 0.12);

    /*
     * RIGHT PHONE — same 0.12s stagger as left
     */
    tl.to(pR, {
        y: podium.sideY,
        opacity: 1,
        scale: 1,
        duration: cfgR.dur,
        ease: cfgR.ease,
    }, 0.12);

    /*
     * Labels now live inside each .ag-iphone container,
     * so they inherit the parent's transform automatically.
     * No separate tween needed.
     */

    /* ── Resize handler ── */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
    });
}
