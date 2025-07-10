// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .step, .pricing-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Button click handlers
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Get Started') || this.textContent.includes('Start')) {
                e.preventDefault();
                showModal('Get Started', 'Ready to transform your development workflow? Sign up for your free account today!');
            }
        });
    });

    const demoButtons = document.querySelectorAll('.btn-secondary');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Demo')) {
                e.preventDefault();
                showModal('Watch Demo', 'Experience the power of AI-assisted coding with our interactive demo.');
            }
        });
    });

    // Contact buttons
    const contactButtons = document.querySelectorAll('.btn-outline');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Contact')) {
                e.preventDefault();
                showModal('Contact Sales', 'Get in touch with our sales team to discuss enterprise solutions.');
            }
        });
    });

    // Code window typing animation
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;
    
    function typeCodeLine() {
        if (currentLine < codeLines.length) {
            codeLines[currentLine].style.opacity = '0';
            codeLines[currentLine].style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                codeLines[currentLine].style.transition = 'all 0.5s ease';
                codeLines[currentLine].style.opacity = '1';
                codeLines[currentLine].style.transform = 'translateX(0)';
                currentLine++;
                
                setTimeout(typeCodeLine, 800);
            }, 200);
        } else {
            // Reset animation
            setTimeout(() => {
                currentLine = 0;
                codeLines.forEach(line => {
                    line.style.opacity = '0';
                    line.style.transform = 'translateX(-20px)';
                });
                setTimeout(typeCodeLine, 1000);
            }, 3000);
        }
    }

    // Start code animation after page load
    setTimeout(typeCodeLine, 2000);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const codeWindow = document.querySelector('.code-window');
        
        if (hero && codeWindow) {
            const rate = scrolled * -0.5;
            codeWindow.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${rate}px)`;
        }
    });

    // Form validation (if forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Modal functionality
    function showModal(title, content) {
        // Create modal if it doesn't exist
        let modal = document.getElementById('modal');
        if (!modal) {
            modal = createModal();
        }
        
        const modalTitle = modal.querySelector('.modal-title');
        const modalContent = modal.querySelector('.modal-content');
        
        modalTitle.textContent = title;
        modalContent.innerHTML = `
            <p>${content}</p>
            <form class="modal-form">
                <input type="email" placeholder="Enter your email" required>
                <button type="submit" class="btn btn-primary">Get Started</button>
            </form>
        `;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Handle form submission
        const form = modal.querySelector('.modal-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                alert(`Thank you! We'll send more information to ${email}`);
                closeModal();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-header">
                    <h3 class="modal-title"></h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-content"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        return modal;
    }

    function closeModal() {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const codeWindow = document.querySelector('.code-window');
        
        if (hero && codeWindow && scrolled < window.innerHeight) {
            const rate = scrolled * -0.3;
            codeWindow.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${rate}px)`;
        }
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);
});

// Add CSS for modal and mobile menu
const additionalCSS = `
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10000;
    justify-content: center;
    align-items: center;
}

.modal-dialog {
    background: white;
    border-radius: 12px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
}

.modal-title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
}

.modal-close {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    color: #333;
}

.modal-body {
    padding: 1.5rem;
}

.modal-form {
    margin-top: 1.5rem;
}

.modal-form input {
    width: 100%;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    margin-bottom: 1rem;
}

.modal-form input:focus {
    outline: none;
    border-color: #667eea;
}

.modal-form button {
    width: 100%;
}

@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 70px;
        left: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: white;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: left 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .nav-menu.active {
        left: 0;
    }
    
    .nav-menu li {
        margin: 1rem 0;
    }
    
    .nav-menu a {
        font-size: 1.2rem;
    }
}

.header.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);