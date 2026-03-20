/* =============================================
   BONZERO - Shared JavaScript
   Common Functions & Utilities
   ============================================= */

/* ------- NAVBAR SCROLL EFFECT ------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ------- SMOOTH SCROLL ------- */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToFeatured() {
    scrollToElement('featured');
}

/* ------- PARTICLE BURST EFFECT ------- */
function createProductBurst(event) {
    event.preventDefault();
    const button = event.target;
    const card = button.closest('.card-3d');
    if (!card) return;

    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.className = 'particle';
        particle.style.left = rect.left - card.getBoundingClientRect().left + button.offsetWidth / 2 + 'px';
        particle.style.top = rect.top - card.getBoundingClientRect().top + button.offsetHeight / 2 + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = '#3d5a42';
        particle.style.animation = 'particleBurst 0.8s ease-out forwards';

        card.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }

    // Button feedback
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#10b981';
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1500);
}

/* ------- NEWSLETTER SUBMISSION ------- */
function setupNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = form.querySelector('button');
        const originalText = button.textContent;
        const message = document.getElementById('newsletter-message');

        button.textContent = 'Subscribed! ✓';
        button.style.background = '#10b981';
        if (message) {
            message.style.opacity = '1';
            message.style.transition = 'opacity 0.3s ease';
        }

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            form.reset();
            if (message) {
                message.style.opacity = '0';
            }
        }, 2500);
    });
}

/* ------- INTERSECTION OBSERVER FOR ANIMATIONS ------- */
function setupScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, idx) => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.card-3d').forEach((el) => observer.observe(el));
}

/* ------- FORM VALIDATION ------- */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setupFormValidation() {
    const inputs = document.querySelectorAll('input[type="email"], input[type="text"], textarea');
    inputs.forEach((input) => {
        input.addEventListener('blur', () => {
            if (input.type === 'email') {
                if (input.value && validateEmail(input.value)) {
                    input.classList.remove('error');
                    input.classList.add('valid');
                } else if (input.value) {
                    input.classList.remove('valid');
                    input.classList.add('error');
                } else {
                    input.classList.remove('valid', 'error');
                }
            } else if (input.value) {
                input.classList.remove('error');
                input.classList.add('valid');
            } else {
                input.classList.remove('valid', 'error');
            }
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
            }
        });
    });
}

/* ------- WHATSAPP REDIRECT ------- */
function redirectToWhatsApp(phoneNumber, message = '') {
    // Remove + and spaces from phone number for consistency
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

function buyNowWhatsApp(event, phoneNumber, productName, productPrice = '') {
    event.preventDefault();
    const message = productPrice 
        ? `Hi! 👋 I'm interested in:\n\n📦 Product: ${productName}\n💰 Price: ${productPrice}\n\nCan you tell me more details?`
        : `Hi! I'm interested in: ${productName}`;
    redirectToWhatsApp(phoneNumber, message);
}

function sendWhatsAppMessage(event, phoneNumber, messageText) {
    event.preventDefault();
    redirectToWhatsApp(phoneNumber, messageText);
}

/* ------- INITIALIZATION ------- */
function initializePage() {
    initNavbar();
    setupNewsletter();
    setupScrollAnimations();
    setupFormValidation();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
