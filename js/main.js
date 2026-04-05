/**
 * Scan Pro - Main Entry Point
 * Initializes all modules and animations
 */

import { initScrollAnimations, initParallax, initButtonEffects } from './animations.js';
import { initNavigation, initMobileMenu, initSmoothScroll } from './navigation.js';

/**
 * Initialize application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Scan Pro - Initializing...');

    // Initialize all modules
    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
    initButtonEffects();
    initScrollProgress();
    initActiveNavigation();
    initTouchFeedback();

    console.log('Scan Pro - Ready!');
});

/**
 * Scroll progress indicator
 */
function initScrollProgress() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!scrollIndicator) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress(scrollIndicator);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Show indicator after scroll
    if (window.pageYOffset > 50) {
        scrollIndicator.classList.add('visible');
    }
}

function updateScrollProgress(indicator) {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    indicator.style.setProperty('--scroll-progress', `${scrollPercent}%`);

    // Show/hide based on scroll position
    if (scrollTop > 100) {
        indicator.classList.add('visible');
    } else {
        indicator.classList.remove('visible');
    }
}

/**
 * Active navigation highlighting
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navItems = document.querySelectorAll('.nav-item[data-nav]');

    if (!sections.length || !navItems.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav(sections, navItems);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateActiveNav(sections, navItems);
}

function updateActiveNav(sections, navItems) {
    const scrollPosition = window.pageYOffset + window.innerHeight / 3;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        const navId = item.getAttribute('data-nav');
        if (navId === currentSection) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Enhanced touch feedback for mobile
 */
function initTouchFeedback() {
    // Check if touch device
    if (!('ontouchstart' in window)) return;

    const interactiveElements = document.querySelectorAll('a, button, .service-card, .pickup-card');

    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.opacity = '0.8';
        }, { passive: true });

        element.addEventListener('touchend', () => {
            element.style.opacity = '1';
        }, { passive: true });
    });

    // Prevent double-tap zoom on buttons
    document.querySelectorAll('button, .nav-item').forEach(button => {
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            button.click();
        }, { passive: false });
    });
}

/**
 * Hide/show navbar on scroll (mobile)
 */
let lastScrollY = window.pageYOffset;

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const bottomNav = document.querySelector('.mobile-bottom-nav');

    if (!navbar || !bottomNav) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScrollY = window.pageYOffset;

                // Show bottom nav when scrolling up, hide when scrolling down
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    bottomNav.style.transform = 'translateY(100%)';
                } else {
                    bottomNav.style.transform = 'translateY(0)';
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}