// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all functionality
    initSmoothScrolling();
    initFAQToggles();
    initCountdownTimer();
    initScrollAnimations();
    initMobileMenu();
    initNavbarScroll();
    initCTAButtons();
    initParallaxEffects();
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FAQ Toggle Functionality
function initFAQToggles() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Countdown Timer
function initCountdownTimer() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7); // 7 days from now
    countdownDate.setHours(23, 59, 59, 999); // End of that day
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            // Update countdown display
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        } else {
            // Countdown ended
            const countdownTimer = document.querySelector('.countdown-timer');
            if (countdownTimer) {
                countdownTimer.innerHTML = '<span style="color: var(--accent-color); font-weight: 600;">Limited Time Offer Expired!</span>';
            }
        }
    }
    
    // Update countdown immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .feature-card, .problem-card, .testimonial-card, .step');
    
    // Add animate-on-scroll class to elements that should animate
    animatedElements.forEach(element => {
        if (!element.classList.contains('animate-on-scroll')) {
            element.classList.add('animate-on-scroll');
        }
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// CTA Button Interactions
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Handle different CTA actions
            if (this.textContent.includes('Pre-Order') || this.textContent.includes('Secure Your AIMCUT')) {
                handlePreOrder();
            } else if (this.textContent.includes('Demo') || this.textContent.includes('Schedule')) {
                handleDemoRequest();
            } else if (this.textContent.includes('Contact Sales')) {
                handleContactSales();
            }
        });
    });
    
    // Add ripple animation to CSS
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Handle Pre-Order Action
function handlePreOrder() {
    // In a real application, this would integrate with an e-commerce platform
    showModal('Pre-Order AIMCUT', 
        'Thank you for your interest in AIMCUT! Our team will contact you within 24 hours to complete your pre-order and provide delivery details.',
        'Contact Information Required'
    );
}

// Handle Demo Request
function handleDemoRequest() {
    showModal('Schedule a Demo', 
        'Excellent! We\'d love to show you AIMCUT in action. Please provide your contact information and preferred time, and we\'ll schedule a personalized demonstration.',
        'Demo Scheduling'
    );
}

// Handle Contact Sales
function handleContactSales() {
    showModal('Contact Sales Team', 
        'Our enterprise sales team is ready to discuss custom solutions for your business. We\'ll contact you within 4 hours to discuss your specific needs.',
        'Enterprise Solutions'
    );
}

// Show Modal Function
function showModal(title, message, subtitle) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('cta-modal');
    if (!modal) {
        modal = createModal();
    }
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-subtitle').textContent = subtitle;
    modal.querySelector('.modal-message').textContent = message;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Create Modal Element
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'cta-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h3 class="modal-title"></h3>
            <p class="modal-subtitle"></p>
            <p class="modal-message"></p>
            <form class="modal-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="tel" placeholder="Phone Number" required>
                <textarea placeholder="Additional Information (Optional)"></textarea>
                <button type="submit" class="cta-btn primary-cta">Submit Request</button>
            </form>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            transform: translateY(-20px);
            transition: transform 0.3s ease;
        }
        
        .modal.active .modal-content {
            transform: translateY(0);
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-secondary);
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: var(--background-secondary);
            color: var(--text-primary);
        }
        
        .modal-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--primary-color);
        }
        
        .modal-subtitle {
            font-size: 0.875rem;
            color: var(--text-secondary);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .modal-message {
            margin-bottom: 2rem;
            line-height: 1.6;
            color: var(--text-secondary);
        }
        
        .modal-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .modal-form input,
        .modal-form textarea {
            padding: 1rem;
            border: 2px solid var(--border-color);
            border-radius: 0.5rem;
            font-family: inherit;
            transition: border-color 0.3s ease;
        }
        
        .modal-form input:focus,
        .modal-form textarea:focus {
            outline: none;
            border-color: var(--primary-color);
        }
        
        .modal-form textarea {
            resize: vertical;
            min-height: 100px;
        }
    `;
    
    if (!document.querySelector('#modal-styles')) {
        style.id = 'modal-styles';
        document.head.appendChild(style);
    }
    
    // Add event listeners
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-form').addEventListener('submit', handleFormSubmit);
    
    document.body.appendChild(modal);
    return modal;
}

// Close Modal Function
function closeModal() {
    const modal = document.getElementById('cta-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    // In a real application, this would send data to a server
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show success message
    const modal = document.getElementById('cta-modal');
    modal.querySelector('.modal-content').innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; color: var(--secondary-color); margin-bottom: 1rem;">✓</div>
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Request Submitted Successfully!</h3>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">
                Thank you for your interest in AIMCUT. Our team will contact you within 24 hours.
            </p>
            <button onclick="closeModal()" class="cta-btn primary-cta">Close</button>
        </div>
    `;
    
    // Auto-close after 3 seconds
    setTimeout(closeModal, 3000);
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax to hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${rate * 0.1}px)`;
        }
        
        // Apply parallax to floating badge
        const floatingBadge = document.querySelector('.floating-badge');
        if (floatingBadge) {
            floatingBadge.style.transform = `translateY(${rate * 0.05}px)`;
        }
    });
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.5s ease';
                this.style.opacity = '1';
            });
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll events are now throttled
}, 16)); // ~60fps

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add smooth reveal animation for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
        const suffix = stat.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 20);
    });
}

// Trigger stats animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
});

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Add CSS for mobile menu
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-links.active {
            transform: translateX(0);
        }
        
        .nav-links a {
            margin-bottom: 1rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
            width: 100%;
        }
        
        .nav-cta {
            margin-top: 1rem;
        }
    }
`;

// Add mobile menu styles if not already present
if (!document.querySelector('#mobile-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'mobile-menu-styles';
    style.textContent = mobileMenuStyles;
    document.head.appendChild(style);
}