// --- Script General de la Página ---
document.addEventListener('DOMContentLoaded', () => {
    // Loader logic
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500); // Small delay for a smoother transition
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Nav height adjusted
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for reveal-on-scroll animations
    const revealElements = document.querySelectorAll('.hero-content, .section-header, .event-card, .gifts-content, .polaroid-card, .form-container, .timeline-item');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For most elements, just reveal them
                if (!entry.target.classList.contains('timeline-item')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
                // For timeline items, the animation is handled by CSS
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        // Timeline items have their own animation, no need for this JS
        if (!el.classList.contains('timeline-item')) {
             el.style.opacity = '0';
             el.style.transform = 'translateY(40px)';
             el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        }
        revealObserver.observe(el);
    });
    
    // Confetti effect
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['--retro-coral', '--retro-teal', '--retro-gold', '--retro-red'];
    
    function createConfetti() {
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.background = `var(${randomColor})`;
            confetti.style.left = `${Math.random() * 100}vw`;
            const duration = Math.random() * 4 + 5; // 5 to 9 seconds
            confetti.style.animation = `fall ${duration}s linear`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.opacity = Math.random() * 0.5 + 0.5;
            confettiContainer.appendChild(confetti);

            setTimeout(() => confetti.remove(), duration * 1000);
        }
    }
    createConfetti();
    
    // RSVP Form Logic
    const nombreAcompananteField = document.getElementById('nombre-acompanante-field');
    document.querySelectorAll('input[name="acompanante"]').forEach(elem => {
        elem.addEventListener("change", function(event) {
            if (event.target.value === "si") {
                nombreAcompananteField.style.display = 'block';
            } else {
                nombreAcompananteField.style.display = 'none';
            }
        });
    });

    const alergiasDetallesField = document.getElementById('alergias-detalles-field');
     document.querySelectorAll('input[name="alergias"]').forEach(elem => {
        elem.addEventListener("change", function(event) {
            if (event.target.value === "si") {
               alergiasDetallesField.style.display = 'block';
            } else {
               alergiasDetallesField.style.display = 'none';
            }
        });
    });
    
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por confirmar! Hemos recibido tus respuestas. 🎉');
        rsvpForm.reset();
        nombreAcompananteField.style.display = 'none';
        alergiasDetallesField.style.display = 'none';
    });

    // Copy bank account number
    const copyBtn = document.getElementById('copy-account-btn');
    const accountEl = document.getElementById('account-number');
    if (copyBtn && accountEl) {
        copyBtn.addEventListener('click', () => {
            const text = accountEl.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                copyBtn.textContent = '¡Copiado!';
                setTimeout(() => { copyBtn.textContent = 'Copiar número'; }, 2000);
            });
        });
    }
});

// --- Script de la Galería de Fotos ---
let currentSlide = 0;
const totalSlides = 8;

function updateCarousel() {
    const frames = document.querySelectorAll('.photo-frame');
    const indicators = document.querySelectorAll('.indicator');
    
    frames.forEach((frame, index) => {
        frame.classList.remove('active', 'prev', 'next');
        
        if (index === currentSlide) {
            frame.classList.add('active');
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
            frame.classList.add('prev');
        } else if (index === (currentSlide + 1) % totalSlides) {
            frame.classList.add('next');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function moveCarousel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Auto-play carousel
setInterval(() => {
    moveCarousel(1);
}, 5000);

// Initialize carousel on load
document.addEventListener('DOMContentLoaded', updateCarousel);
