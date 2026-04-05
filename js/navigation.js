/**
 * Navigation Module
 * Handles navbar scroll effects and mobile menu
 */

const SCROLL_THRESHOLD = 50;
let navbar = null;
let lastScrollY = 0;

/**
 * Initialize navigation scroll effects
 */
export function initNavigation() {
    navbar = document.querySelector('.navbar');

    if (!navbar) return;

    // Initial check
    handleScroll();

    // Scroll listener with throttling
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Handle navbar state on scroll
 */
function handleScroll() {
    const scrolled = window.pageYOffset;

    // Add/remove scrolled class
    if (scrolled > SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollY = scrolled;
}

/**
 * Initialize mobile menu
 */
export function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');

    if (!menuToggle || !mobileMenu) return;

    let isMenuOpen = false;

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        isMenuOpen = true;
        mobileMenu.classList.add('is-active');
        document.body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
    });

    // Close menu function
    const closeMenu = () => {
        isMenuOpen = false;
        mobileMenu.classList.remove('is-active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
    };

    // Close button
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }

    // Close on overlay click
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    // Close on menu link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    // Close on resize if window becomes large
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMenu();
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
export function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();

                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('is-active')) {
                    mobileMenu.classList.remove('is-active');
                    document.body.classList.remove('menu-open');
                }

                // Smooth scroll
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}