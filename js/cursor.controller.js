/**
 * cursor.controller.js
 *
 * "Antigravity Cursor" — Breathing particle field simulation
 * Ported from BreathDearMedusae (React Three Fiber) to vanilla Three.js
 *
 * Features:
 * - 5,500 instanced pill-shaped particles in a flowing grid
 * - Jellyfish halo breathing animation around mouse cursor
 * - Google-brand color cycling (blue/red/yellow) with GLSL shaders
 * - mix-blend-mode: exclusion on the canvas (CSS) for dual-theme support
 * - Wake-on-move: opacity 0 until first mousemove (prevents 0,0 ghost)
 * - SPA-safe: all listeners on window/document, survives route changes
 *
 * Camera & Coordinate System:
 * R3F defaults to PerspectiveCamera(fov=75) at z=5. This gives a viewport
 * of ~7.67 world units tall at z=0. The entire shader (halo radius 2.2,
 * rimWidth 1.8, gridWidth 40, etc.) is calibrated to that scale.
 * We replicate this EXACTLY to preserve visual fidelity.
 */

import * as THREE from 'https://esm.sh/three@0.182.0';

export function initCursor() {
    // Don't init on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
        return;
    }

    const canvas = document.getElementById('ag-cursor-canvas');
    if (!canvas) {
        console.warn('Cursor canvas not found');
        return;
    }

    // =========================================================================
    // Scene Setup
    // =========================================================================
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    const scene = new THREE.Scene();

    // =========================================================================
    // Camera — match R3F defaults EXACTLY
    // R3F default: PerspectiveCamera, fov=75, near=0.1, far=1000
    // Reference: <Canvas camera={{ position: [0, 0, 5] }}>
    // =========================================================================
    const FOV = 75;
    let aspect = window.innerWidth / window.innerHeight;

    const camera = new THREE.PerspectiveCamera(FOV, aspect, 0.1, 1000);
    camera.position.z = 5;

    // Calculate the visible world-space dimensions at z=0
    // This is exactly how R3F's useThree().viewport works
    function getViewport() {
        const vFov = (FOV * Math.PI) / 180;
        const height = 2 * Math.tan(vFov / 2) * camera.position.z;
        const width = height * aspect;
        return { width, height };
    }

    // =========================================================================
    // Geometry & Material (matches medusae.jsx exactly)
    // =========================================================================
    const countX = 100;
    const countY = 55;
    const count = countX * countY;

    const geometry = new THREE.PlaneGeometry(1, 1);

    const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: /* glsl */ `
            uniform float uTime;
            uniform vec2 uMouse;
            varying vec2 vUv;
            varying float vSize;
            varying vec2 vPos;

            attribute vec3 aOffset;
            attribute float aRandom;

            #define PI 3.14159265359

            // Simple noise for extra organic feel
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);

                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));

                return mix( mix(a, b, f.x), mix(c, d, f.x), f.y);
            }

            mat2 rotate2d(float _angle){
                return mat2(cos(_angle), sin(_angle),
                            -sin(_angle), cos(_angle));
            }

            void main() {
                vUv = uv;

                // --- 1. ALIVE FLOW (Base layer) ---
                vec3 pos = aOffset;

                float driftSpeed = uTime * 0.15;

                // Curl-like flowing motion
                float dx = sin(driftSpeed + pos.y * 0.5) + sin(driftSpeed * 0.5 + pos.y * 2.0);
                float dy = cos(driftSpeed + pos.x * 0.5) + cos(driftSpeed * 0.5 + pos.x * 2.0);

                pos.x += dx * 0.25;
                pos.y += dy * 0.25;

                // --- 2. THE JELLYFISH HALO (Smooth & Subtle) ---
                vec2 relToMouse = pos.xy - uMouse;
                float distFromMouse = length(relToMouse);
                float angleToMouse = atan(relToMouse.y, relToMouse.x);

                float shapeFactor = noise(vec2(angleToMouse * 2.0, uTime * 0.1));

                float breathCycle = sin(uTime * 0.8);
                float currentRadius = 2.2 + breathCycle * 0.3 + (shapeFactor * 0.5);

                float dist = distFromMouse;
                float rimWidth = 1.8;
                float rimInfluence = smoothstep(rimWidth, 0.0, abs(dist - currentRadius));

                // --- 3. WAVE MOVEMENT (Gentle Ripple) ---
                vec2 pushDir = normalize(relToMouse + vec2(0.0001, 0.0));
                float pushAmt = (breathCycle * 0.5 + 0.5) * 0.5;
                pos.xy += pushDir * pushAmt * rimInfluence;

                // 3D: Subtle Z float
                pos.z += rimInfluence * 0.3 * sin(uTime);

                // --- 4. SIZE & SCALE ---
                float baseSize = 0.012 + (sin(uTime + pos.x)*0.003);
                float activeSize = 0.055;
                float currentScale = baseSize + (rimInfluence * activeSize);

                float stretch = rimInfluence * 0.02;

                vec3 transformed = position;
                transformed.x *= (currentScale + stretch);
                transformed.y *= currentScale * 0.85;

                vSize = rimInfluence;
                vPos = pos.xy;

                // --- 5. ROTATION ---
                float targetAngle = angleToMouse;
                float finalAngle = targetAngle;
                transformed.xy = rotate2d(finalAngle) * transformed.xy;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + transformed, 1.0);
            }
        `,
        fragmentShader: /* glsl */ `
            uniform float uTime;
            varying vec2 vUv;
            varying float vSize;
            varying vec2 vPos;

            void main() {
                // Shape: "Rectangle with radius"
                vec2 center = vec2(0.5);
                vec2 pos = abs(vUv - center) * 2.0;

                float d = pow(pow(pos.x, 2.6) + pow(pos.y, 2.6), 1.0/2.6);
                float alpha = 1.0 - smoothstep(0.8, 1.0, d);

                if (alpha < 0.01) discard;

                // Google Brand Colors
                // Idle color is mid-gray so exclusion blend mode makes it
                // near-invisible against both #000 and #F9F9F9 backgrounds
                vec3 black = vec3(0.5, 0.5, 0.52);
                vec3 cBlue = vec3(0.26, 0.52, 0.96);
                vec3 cRed = vec3(0.92, 0.26, 0.21);
                vec3 cYellow = vec3(0.98, 0.73, 0.01);

                // --- Dynamic Color Shifting ---
                float t = uTime * 1.2;

                float p1 = sin(vPos.x * 0.8 + t);
                float p2 = sin(vPos.y * 0.8 + t * 0.8 + p1);

                vec3 activeColor = mix(cBlue, cRed, p1 * 0.5 + 0.5);
                activeColor = mix(activeColor, cYellow, p2 * 0.5 + 0.5);

                vec3 finalColor = mix(black, activeColor, smoothstep(0.1, 0.8, vSize));
                float finalAlpha = alpha * mix(0.4, 0.95, vSize);

                gl_FragColor = vec4(finalColor, finalAlpha);
            }
        `,
        transparent: true,
        depthWrite: false,
    });

    // =========================================================================
    // Instanced Mesh + Attributes (identical to medusae.jsx)
    // =========================================================================
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(mesh);

    const offsets = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const angles = new Float32Array(count);

    // Grid dimensions in world units — same as reference
    const gridWidth = 40;
    const gridHeight = 22;
    const jitter = 0.25;

    let idx = 0;
    for (let y = 0; y < countY; y++) {
        for (let x = 0; x < countX; x++) {
            const u = x / (countX - 1);
            const v = y / (countY - 1);

            let px = (u - 0.5) * gridWidth;
            let py = (v - 0.5) * gridHeight;

            px += (Math.random() - 0.5) * jitter;
            py += (Math.random() - 0.5) * jitter;

            offsets[idx * 3] = px;
            offsets[idx * 3 + 1] = py;
            offsets[idx * 3 + 2] = 0;

            randoms[idx] = Math.random();
            angles[idx] = Math.random() * Math.PI * 2;
            idx++;
        }
    }

    geometry.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
    geometry.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randoms, 1));
    geometry.setAttribute('aAngleOffset', new THREE.InstancedBufferAttribute(angles, 1));

    // =========================================================================
    // Mouse Tracking
    // =========================================================================
    let isAwake = false;
    let hovering = true;

    // Mouse in NDC (-1 to 1)
    let mouseNdcX = 0;
    let mouseNdcY = 0;

    // Smoothed mouse in world coords (the uniform target)
    const smoothMouse = { x: 0, y: 0 };

    // Drag factor — same as reference (0.055)
    const dragFactor = 0.055;

    function wakeCursor() {
        if (!isAwake) {
            isAwake = true;
            // Apply scroll-based opacity on first move
            const scrollOpacity = Math.max(0, 1 - (window.scrollY / (window.innerHeight * 0.7)));
            canvas.style.opacity = scrollOpacity;
        }
    }

    document.addEventListener('mousemove', (e) => {
        wakeCursor();
        // Screen to NDC (matches R3F's pointer)
        mouseNdcX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseNdcY = -((e.clientY / window.innerHeight) * 2 - 1);
    });

    document.addEventListener('mouseleave', () => {
        hovering = false;
        canvas.style.opacity = 0;
    });

    document.addEventListener('mouseenter', () => {
        hovering = true;
        if (isAwake) {
            const scrollOpacity = Math.max(0, 1 - (window.scrollY / (window.innerHeight * 0.7)));
            canvas.style.opacity = scrollOpacity;
        }
    });

    // =========================================================================
    // Resize Handler
    // =========================================================================
    function onResize() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        aspect = w / h;

        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);
        uniforms.uResolution.value.set(w, h);
    }

    window.addEventListener('resize', onResize);

    // =========================================================================
    // Scroll-Tied Opacity Fade — smooth fade out as user scrolls past hero
    // =========================================================================
    let isHeroVisible = true;
    let animationRunning = false;
    let heroOnRoute = true; // whether the current SPA route has a hero

    // Compute scroll opacity: 1 at top, fades to 0 over 70% of viewport height
    function getScrollOpacity() {
        const fadeDistance = window.innerHeight * 0.7;
        return Math.max(0, 1 - (window.scrollY / fadeDistance));
    }

    // Apply opacity and manage render loop
    function applyScrollOpacity() {
        if (!heroOnRoute) return;

        const scrollOpacity = getScrollOpacity();

        // Set canvas opacity directly (only if cursor is awake and mouse is on page)
        if (isAwake && hovering) {
            canvas.style.opacity = scrollOpacity;
        }

        // Manage render loop based on opacity
        if (scrollOpacity <= 0) {
            isHeroVisible = false;
            // Loop will self-pause on next frame via the gate check
        } else {
            const wasHidden = !isHeroVisible;
            isHeroVisible = true;
            // Re-kick the render loop if it was paused
            if (wasHidden && !animationRunning) {
                animationRunning = true;
                animate();
            }
        }
    }

    window.addEventListener('scroll', applyScrollOpacity, { passive: true });

    // Re-evaluate when SPA router swaps content in #app-view
    const appView = document.getElementById('app-view');
    if (appView) {
        const routeObserver = new MutationObserver(() => {
            const hero = document.querySelector('.ag-hero');
            if (hero) {
                heroOnRoute = true;
                // Reset scroll state for the new route
                applyScrollOpacity();
                if (!animationRunning) {
                    animationRunning = true;
                    animate();
                }
            } else {
                // No hero on this route (e.g. article pages)
                heroOnRoute = false;
                isHeroVisible = false;
                canvas.style.opacity = 0;
            }
        });
        routeObserver.observe(appView, { childList: true });
    }

    // =========================================================================
    // Animation Loop (pauses when scrolled past hero = zero GPU cost)
    // =========================================================================
    const clock = new THREE.Clock();

    function animate() {
        if (!isHeroVisible) {
            animationRunning = false;
            return;
        }

        requestAnimationFrame(animate);

        const elapsed = clock.getElapsedTime();
        uniforms.uTime.value = elapsed;

        const vp = getViewport();

        let targetX = 0;
        let targetY = 0;

        if (hovering) {
            targetX = (mouseNdcX * vp.width) / 2;
            targetY = (mouseNdcY * vp.height) / 2;
        }

        smoothMouse.x += (targetX - smoothMouse.x) * dragFactor;
        smoothMouse.y += (targetY - smoothMouse.y) * dragFactor;

        uniforms.uMouse.value.set(smoothMouse.x, smoothMouse.y);

        renderer.render(scene, camera);
    }

    animationRunning = true;
    animate();
}
