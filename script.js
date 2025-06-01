document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuOpenButton = document.getElementById('menu-open-button');
    const menuCloseButton = document.getElementById('menu-close-button');
    const body = document.body;

    if (menuOpenButton && menuCloseButton) {
        menuOpenButton.addEventListener('click', () => {
            body.classList.add('show-mobile-menu');
        });

        menuCloseButton.addEventListener('click', () => {
            body.classList.remove('show-mobile-menu');
        });
    }

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Image slideshow
    const slides = document.querySelectorAll('.slideshow-image');
    if (slides.length > 0) {
        let currentSlide = 0;
        
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            showSlide(currentSlide + 1);
        }
        
        // Initialize first slide
        showSlide(0);
        
        // Change slide every 3 seconds
        const slideInterval = setInterval(nextSlide, 3000);
        
        // Pause on hover
        const heroImageWrapper = document.querySelector('.hero-image-wrapper');
        if (heroImageWrapper) {
            heroImageWrapper.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            heroImageWrapper.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 3000);
            });
        }
    }

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

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.hero-details, .about-image-wrapper, .about-details, .service-item, .portfolio-item');
        
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
    const animatedElements = document.querySelectorAll('.hero-details, .about-image-wrapper, .about-details, .service-item, .portfolio-item');
    if (animatedElements.length > 0) {
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        if (document.querySelector('.hero-details')) {
            document.querySelector('.hero-details').style.transform = 'translateY(30px)';
        }
        if (document.querySelector('.about-image-wrapper')) {
            document.querySelector('.about-image-wrapper').style.transform = 'translateX(-50px)';
        }
        if (document.querySelector('.about-details')) {
            document.querySelector('.about-details').style.transform = 'translateX(50px)';
        }
        
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach((item, index) => {
            item.style.transform = `translateY(${20 * (index % 2 === 0 ? 1 : -1)}px)`;
            item.style.transitionDelay = `${index * 0.1}s`;
        });
        
        
    }
    
    // Initial animation check
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});
// Enhanced Tech Section Animation
function animateTechCards() {
    const techCards = document.querySelectorAll('.tech-card');
    const techSection = document.querySelector('.tech-section');
    
    if (!techSection) return;
    
    const sectionPosition = techSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
  
    if (sectionPosition < screenPosition) {
        techCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animated');
            }, index * 150);
        });
        
        // Animate stats counting
        animateStats();
        
        // Remove event listener after animation
        window.removeEventListener('scroll', animateTechCards);
    }
}

// Animate counting numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const duration = 2000; // Animation duration in ms
    const startTime = Date.now();
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const start = 0;
        
        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            
            stat.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                stat.textContent = target + '+'; // Add plus sign when done
            }
        };
        
        animate();
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', animateTechCards);
    animateTechCards(); // Check on load
});

// Show fade-in when section appears in viewport
const faders = document.querySelectorAll('.fade-in-section');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
// Platform Section Animation
function animatePlatformSection() {
    const platformSection = document.querySelector('.platform-section');
    if (!platformSection) return;
    
    // Reset initial state for animation
    const features = document.querySelectorAll('.feature-item');
    const platformVisual = document.querySelector('.platform-visual');
    
    features.forEach(feature => {
        feature.style.transform = 'translateX(-20px)';
        feature.style.opacity = '0';
        feature.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
    });
    
    if (platformVisual) {
        platformVisual.style.opacity = '0';
        platformVisual.style.transform = 'translateX(20px)';
        platformVisual.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate features one by one
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.style.transform = 'translateX(0)';
                        feature.style.opacity = '1';
                    }, index * 150);
                });
                
                // Animate platform visual
                if (platformVisual) {
                    setTimeout(() => {
                        platformVisual.style.transform = 'translateX(0)';
                        platformVisual.style.opacity = '1';
                    }, features.length * 150);
                }
                
                // Animate particles
                const particles = document.querySelectorAll('.platform-particle');
                particles.forEach(particle => {
                    particle.style.animationPlayState = 'running';
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(platformSection);
}

document.addEventListener('DOMContentLoaded', () => {
    animatePlatformSection();
    
    // Add hover effect for platform visual
    const platformVisual = document.querySelector('.platform-visual');
    if (platformVisual) {
        platformVisual.addEventListener('mouseenter', () => {
            platformVisual.classList.add('hover');
        });
        
        platformVisual.addEventListener('mouseleave', () => {
            platformVisual.classList.remove('hover');
        });
    }
});
