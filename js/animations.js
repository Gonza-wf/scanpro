/**
 * Animations Module
 * Handles scroll-triggered animations using Intersection Observer
 */

// Animation configuration
const ANIMATION_CONFIG = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

/**
 * Initialize all scroll-based animations
 */
export function initScrollAnimations() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Show all elements immediately
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('is-visible');
        });
        return;
    }

    const observer = createObserver();
    observeElements(observer);
}

/**
 * Create Intersection Observer instance
 */
function createObserver() {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add small delay for smoother effect
                requestAnimationFrame(() => {
                    entry.target.classList.add('is-visible');
                });
            }
        });
    }, ANIMATION_CONFIG);
}

/**
 * Observe all animatable elements
 */
function observeElements(observer) {
    // Elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });

    // Service cards
    document.querySelectorAll('.service-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Animate counter numbers
 */
export function animateCounter(element, target, duration = 2000) {
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

/**
 * Parallax effect for hero visual
 */
export function initParallax() {
    const heroVisual = document.querySelector('.hero-visual');

    if (!heroVisual) return;

    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.15;

                if (scrolled < window.innerHeight) {
                    heroVisual.style.transform = `translateY(${rate}px)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Button ripple effect
 */
export function initButtonEffects() {
    document.querySelectorAll('.btn-ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}