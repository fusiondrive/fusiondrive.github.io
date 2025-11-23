/**
 * Antigravity Particle Field
 * Grid-based particles that rotate to face the mouse (Compass effect)
 * and are repelled to create a concave depression.
 */

const canvas = document.getElementById('grass-canvas');
const ctx = canvas.getContext('2d');

// Force Z-Index to 0 to ensure visibility (overriding CSS -1 if needed)
canvas.style.zIndex = '0';

let width, height;
let particles = [];
// Mouse state
const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, isActive: false };

// Idle "Jellyfish" Target
const idleTarget = { x: 0, y: 0 };

// Configuration
const config = {
    spacing: 90,        // Sparser grid
    particleRadius: 2.5, // Dots radius

    // Physics
    springStiffness: 0.005, // Extremely soft spring for "jellyfish" feel
    friction: 0.90,        // Lower friction for floaty feel
    repulsionRadius: 200,  // Smaller interaction area (was 450)
    repulsionStrength: 1.5, // Softer repulsion

    // Visuals
    rotationSpeed: 0.05, // Slower rotation
    visibilityRadius: 0, // Set in resize

    // Breathing (Jellyfish Float)
    breatheSpeed: 0.001,
    breatheAmplitude: 20,

    // Darker Fallback colors
    colorPrimary: '#0d2617',   // Darker green
    colorSecondary: '#27472f'  // Darker secondary
};

class Particle {
    constructor(x, y) {
        this.homeX = x;
        this.homeY = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.angle = 0;
        this.targetAngle = 0;
        this.color = Math.random() > 0.5 ? config.colorPrimary : config.colorSecondary;
        this.opacity = 0; // Start with visible opacity
        this.phase = Math.random() * Math.PI * 2; // Random phase for breathing
    }

    update(time, target, isIdle) {
        // 1. Physics (Spring + Repulsion + Breathing)

        // Calculate "Home" with breathing offset
        const breatheOffsetX = Math.cos(time * config.breatheSpeed + this.phase) * config.breatheAmplitude;
        const breatheOffsetY = Math.sin(time * config.breatheSpeed + this.phase) * config.breatheAmplitude;

        const targetX = this.homeX + breatheOffsetX;
        const targetY = this.homeY + breatheOffsetY;

        // Spring to target
        const dx = targetX - this.x;
        const dy = targetY - this.y;

        this.vx += dx * config.springStiffness;
        this.vy += dy * config.springStiffness;

        // Repulsion from target (mouse or idle ghost)
        const mdx = this.x - target.x;
        const mdy = this.y - target.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (dist < config.repulsionRadius) {
            const force = (1 - dist / config.repulsionRadius) * config.repulsionStrength;
            const angle = Math.atan2(mdy, mdx);

            this.vx += Math.cos(angle) * force * 5;
            this.vy += Math.sin(angle) * force * 5;
        }

        // Apply friction
        this.vx *= config.friction;
        this.vy *= config.friction;

        // Move
        this.x += this.vx;
        this.y += this.vy;

        // 2. Rotation (Compass Effect)
        this.targetAngle = Math.atan2(mdy, mdx);

        // Smooth rotation
        let diff = this.targetAngle - this.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;

        this.angle += diff * config.rotationSpeed;

        // 3. Visibility (Spotlight)
        // Only visible near the target
        let targetOpacity = 0;

        if (dist < config.visibilityRadius) {
            // Calculate spotlight intensity
            const spotlight = 1 - (dist / config.visibilityRadius);
            // Cubic falloff for sharp spotlight
            targetOpacity = Math.pow(spotlight, 3);
        }

        // Smooth opacity transition
        this.opacity += (targetOpacity - this.opacity) * 0.1;
    }

    draw(ctx) {
        if (this.opacity <= 0.01) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(0, 0, config.particleRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

function getThemeColors() {
    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue('--md-sys-color-primary').trim();
    const secondary = styles.getPropertyValue('--md-sys-color-tertiary').trim();

    if (primary) config.colorPrimary = primary;
    if (secondary) config.colorSecondary = secondary;

    // Update existing particles
    particles.forEach(p => {
        p.color = Math.random() > 0.5 ? config.colorPrimary : config.colorSecondary;
    });
}

function init() {
    resize();
    // Fetch colors immediately
    getThemeColors();
    // Re-create particles to ensure they have the correct colors from the start
    createParticles();
    animate();
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Dynamic visibility radius (spotlight effect)
    config.visibilityRadius = Math.max(width, height) * 0.3;

    createParticles();
}

function createParticles() {
    particles = [];
    const cols = Math.ceil(width / config.spacing);
    const rows = Math.ceil(height / config.spacing);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Strict grid, no randomness in position
            const x = i * config.spacing + config.spacing / 2;
            const y = j * config.spacing + config.spacing / 2;
            particles.push(new Particle(x, y));
        }
    }
}

function animate(time) {
    ctx.clearRect(0, 0, width, height);

    // Determine target (Mouse or Idle Ghost)
    let target = mouse;
    let isIdle = !mouse.isActive;

    if (isIdle) {
        // "Jellyfish" wandering logic
        // Smooth sine wave motion for the idle spotlight
        const t = time * 0.0005;
        idleTarget.x = width / 2 + Math.cos(t) * (width * 0.3) + Math.sin(t * 2.1) * (width * 0.1);
        idleTarget.y = height / 2 + Math.sin(t * 1.3) * (height * 0.2) + Math.cos(t * 1.7) * (height * 0.1);
        target = idleTarget;
    }

    particles.forEach(p => {
        p.update(time || 0, target, isIdle);
        p.draw(ctx);
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
});

window.addEventListener('mouseleave', () => {
    mouse.isActive = false;
});

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class')) {
            // Small delay for theme switch is fine
            setTimeout(getThemeColors, 50);
        }
    });
});
observer.observe(document.documentElement, { attributes: true });

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    setTimeout(getThemeColors, 50);
});

// Wait for window load to ensure styles are ready
window.addEventListener('load', init);
