// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const bookingModal = document.getElementById('bookingModal');
const trackingModal = document.getElementById('trackingModal');
const bookingForm = document.querySelector('.booking-form');
const trackingForm = document.querySelector('.tracking-form');
const contactForm = document.querySelector('.contact-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Modal Functions
function openBookingModal() {
    bookingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openTrackingModal() {
    trackingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeTrackingModal() {
    trackingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Hide tracking result when closing modal
    document.getElementById('tracking-result').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeBookingModal();
    }
    if (e.target === trackingModal) {
        closeTrackingModal();
    }
});

// Booking Form Handler
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const pickup = document.getElementById('pickup').value;
    const delivery = document.getElementById('delivery').value;
    const packageSize = document.getElementById('package-size').value;
    const deliveryType = document.getElementById('delivery-type').value;
    
    // Simulate form submission
    if (pickup && delivery && packageSize && deliveryType) {
        // Generate random tracking number
        const trackingNumber = 'QD' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Show success message
        showSuccessMessage(`Booking confirmed! Your tracking number is: ${trackingNumber}`);
        
        // Reset form
        bookingForm.reset();
        closeBookingModal();
    } else {
        showErrorMessage('Please fill in all required fields.');
    }
});

// Tracking Form Handler
trackingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const trackingNumber = document.getElementById('tracking-number').value;
    
    if (trackingNumber.length >= 6) {
        // Simulate tracking lookup
        showTrackingResult();
    } else {
        showErrorMessage('Please enter a valid tracking number.');
    }
});

// Contact Form Handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    if (name && email && message) {
        // Simulate form submission
        showSuccessMessage('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    } else {
        showErrorMessage('Please fill in all fields.');
    }
});

// Show tracking result
function showTrackingResult() {
    const trackingResult = document.getElementById('tracking-result');
    trackingResult.style.display = 'block';
    
    // Animate status items
    const statusItems = trackingResult.querySelectorAll('.status-item');
    statusItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        }, index * 200);
    });
}

// Success/Error Message Functions
function showSuccessMessage(message) {
    showToast(message, 'success');
}

function showErrorMessage(message) {
    showToast(message, 'error');
}

function showToast(message, type) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Pricing card interactions
document.querySelectorAll('.pricing-card button').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.pricing-card');
        const plan = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;
        
        showSuccessMessage(`You selected the ${plan} plan for ${price}. Contact us to get started!`);
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading states to forms
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Track Package button in navigation
document.querySelector('.track-btn').addEventListener('click', (e) => {
    e.preventDefault();
    openTrackingModal();
});

// Add keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (bookingModal.style.display === 'block') {
            closeBookingModal();
        }
        if (trackingModal.style.display === 'block') {
            closeTrackingModal();
        }
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            markFieldAsInvalid(input);
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            markFieldAsInvalid(input);
            isValid = false;
        } else {
            markFieldAsValid(input);
        }
    });
    
    return isValid;
}

function markFieldAsInvalid(field) {
    field.style.borderColor = '#ef4444';
    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
}

function markFieldAsValid(field) {
    field.style.borderColor = '#10b981';
    field.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
    
    // Reset after a short delay
    setTimeout(() => {
        field.style.borderColor = '#e2e8f0';
        field.style.boxShadow = 'none';
    }, 2000);
}

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    console.log('QuickDeliver website loaded successfully!');
    
    // Add any initialization code here
    // For example, load saved form data, check authentication, etc.
});