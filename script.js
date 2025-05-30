// Mobile menu toggle
const menuOpenButton = document.getElementById('menu-open-button');
const menuCloseButton = document.getElementById('menu-close-button');
const body = document.body;

menuOpenButton.addEventListener('click', () => {
    body.classList.add('show-mobile-menu');
});

menuCloseButton.addEventListener('click', () => {
    body.classList.remove('show-mobile-menu');
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Image slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slideshow-image');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            body.classList.remove('show-mobile-menu');
        }
    });
});

// Animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.hero-details, .about-image-wrapper, .about-details, .service-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-details, .about-image-wrapper, .about-details, .service-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    document.querySelector('.hero-details').style.transform = 'translateY(30px)';
    document.querySelector('.about-image-wrapper').style.transform = 'translateX(-50px)';
    document.querySelector('.about-details').style.transform = 'translateX(50px)';
    
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach((item, index) => {
        item.style.transform = `translateY(${20 * (index % 2 === 0 ? 1 : -1)}px)`;
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Trigger initial animation check
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);