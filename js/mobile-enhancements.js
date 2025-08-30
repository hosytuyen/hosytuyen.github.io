// Mobile Enhancements for Personal Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
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

    // Add touch-friendly hover effects for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.social-links a').forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.1)';
                this.style.backgroundColor = '#e0e0e0';
            });
            
            link.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '#f5f5f5';
            });
        });
    }

    // Improve mobile navigation experience
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            // Add visual feedback for swipe gestures
            if (diff > 0) {
                // Swipe up
                document.body.style.backgroundColor = '#f8f8f8';
                setTimeout(() => {
                    document.body.style.backgroundColor = '#f1f1f1';
                }, 200);
            } else {
                // Swipe down
                document.body.style.backgroundColor = '#f0f0f0';
                setTimeout(() => {
                    document.body.style.backgroundColor = '#f1f1f1';
                }, 200);
            }
        }
    }

    // Optimize images for mobile
    function optimizeImagesForMobile() {
        const images = document.querySelectorAll('img');
        const isMobile = window.innerWidth <= 767;
        
        images.forEach(img => {
            if (isMobile) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                
                // Add lazy loading for better performance
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            }
        });
    }

    // Call image optimization on load and resize
    optimizeImagesForMobile();
    window.addEventListener('resize', optimizeImagesForMobile);

    // Add mobile-friendly focus indicators
    document.querySelectorAll('a, button, [tabindex]').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #2196f3';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Improve mobile scrolling performance
    let ticking = false;
    
    function updateScroll() {
        // Add scroll-based animations or effects here if needed
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Add mobile-friendly loading states
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Add a subtle animation for mobile
        if (window.innerWidth <= 767) {
            const posts = document.querySelectorAll('.post');
            posts.forEach((post, index) => {
                setTimeout(() => {
                    post.style.opacity = '0';
                    post.style.transform = 'translateY(20px)';
                    post.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        post.style.opacity = '1';
                        post.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            });
        }
    });

    // Handle orientation change for mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layouts after orientation change
            optimizeImagesForMobile();
            
            // Trigger a resize event to update CSS
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });

    // Add mobile-friendly error handling
    window.addEventListener('error', function(e) {
        console.log('Error occurred:', e.error);
        // You can add user-friendly error messages here
    });

    // Improve mobile accessibility
    if (window.innerWidth <= 767) {
        // Increase touch targets for mobile
        document.querySelectorAll('.social-links a').forEach(link => {
            link.style.minWidth = '44px';
            link.style.minHeight = '44px';
        });
        
        // Add better focus management for mobile
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }
});

// Add CSS for mobile enhancements
const mobileStyles = `
    .keyboard-navigation a:focus,
    .keyboard-navigation button:focus {
        outline: 2px solid #2196f3 !important;
        outline-offset: 2px !important;
    }
    
    .loaded .post {
        opacity: 1;
        transform: translateY(0);
    }
    
    @media (max-width: 767px) {
        .social-links a:active {
            transform: scale(0.95);
        }
        
        .post-content a:focus {
            background-color: rgba(33, 150, 243, 0.1);
            border-radius: 4px;
        }
    }
`;

// Inject mobile styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileStyles;
document.head.appendChild(styleSheet);
