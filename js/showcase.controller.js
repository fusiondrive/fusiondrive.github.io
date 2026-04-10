/**
 * CABSFlight Showcase — GSAP ScrollTrigger Controller
 *
 * Layout:  Flexbox "podium" — 3 phones side-by-side, center elevated.
 * Anim:    Asymmetric bottom-to-center push with:
 *            • center-first stagger (manual timeline offsets)
 *            • per-phone randomised ease
 *            • scroll-scrubbed (scrub: 1) — phones follow scroll
 *
 * Trigger: tight scroll interval from "top 80%" to "center 45%"
 *          on #phones-wrap. No pin, no sticky — pure scrub.
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
     * scrub 模式下 duration 只决定时间轴内各 tween 的
     * 相对权重，不再对应真实秒数。统一用 0.5 保持均匀，
     * 差异化靠 ease 和 stagger offset 体现。
     * ───────────────────────────────────────────────────── */
    const cfgC = { dur: 0.5, ease: randomEase() };  // center
    const cfgL = { dur: 0.5, ease: randomEase() };  // left
    const cfgR = { dur: 0.5, ease: randomEase() };  // right

    /* ─────────────────────────────────────────────────────
     * SCROLL-SCRUBBED TIMELINE
     *
     *  ① scrub: 1          — 手机跟随滚轮进度，1s 平滑缓冲
     *  ② start: "top 80%"  — 容器顶部到达视口 80% 时开始
     *  ③ end: "center 45%"  — 容器中点到达视口 45% 时完成
     *     → 紧凑触发区间，不拖沓
     *  ④ 无 pin / toggleActions — 不会产生粘滞或空白
     * ───────────────────────────────────────────────────── */
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#phones-wrap',
            start: 'top 80%',
            end: 'center 45%',
            scrub: 1,
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
     * LEFT PHONE — offset 0.10 after center in timeline units
     */
    tl.to(pL, {
        y: podium.sideY,
        opacity: 1,
        scale: 1,
        duration: cfgL.dur,
        ease: cfgL.ease,
    }, 0.10);

    /*
     * RIGHT PHONE — same offset as left
     */
    tl.to(pR, {
        y: podium.sideY,
        opacity: 1,
        scale: 1,
        duration: cfgR.dur,
        ease: cfgR.ease,
    }, 0.10);

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
