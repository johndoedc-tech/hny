// Image collection - all your photos
const images = [
    'images/96053E3E-CF7F-4F80-9F31-EB4567B2F6B2.jpg',
    'images/att.4dzwAmY6HX-FNnswktr8arDleN31MqZlvimT-Ig--8Q.jpg',
    'images/att.7ZhYVhDJtztImFBWR_UzXtBUHJA0CS9ooFMJCl6DB48.jpg',
    'images/att.8n-3UtkHk-_lSR4lZxBIO6X3bUnowaVlj3UTePewmGA.jpg',
    'images/att.AFe74m_cruWdmTRwa6NoTwaA8_cYdaQeBnVMYtgeGMw.jpg',
    'images/att.b5c92P8QUy7Y1o0KjegO870mgTdGNnHyp8mxm152Nbk.jpg',
    'images/att.CeI9K1ADjmZPCtQmEdKASjVIWja2JYHqCskkv-KHM_I.jpg',
    'images/att.cSr7HE5jjsfJ_ZF2L8DA0HLd6NoCWR4HqvLKoB0SYR4.jpg',
    'images/att.E1x1OFAO3fSgT9ngWuc9tzitvzLlUb2SkgFbr8FLK6U.jpg',
    'images/att.ikG1vGmJ5seeouriE0HPBnttQEFFAy_4abmjjmUS_cs.jpg',
    'images/att.jfs8JPiXW91RynErIFS-PjjhKQOhYNgNqg5BKYfkPqI.jpg',
    'images/att.N6SWEge1HoQMPto0ACS58Ve0cbUIPCXWe5YXTqlnAnk.jpg',
    'images/att.VvzwXw0coH-UgcasyE0O3s-9-FEqI0X9G4MfYGIaoeo.jpg',
    'images/att.WFOujOepYnGqLgfYdn0DmIXwQH7EA00wgSeYYFyIbb8.jpg',
    'images/att.XIlMDR1fMg1ASnTqq9698GUojdqLTO6CZ7u7ZPJ8Iww.jpg',
    'images/att.Z1E0inuKc38PFfBMLp6Ucqj8I8vHTmiFTfkOUsoOolg.jpg',
    'images/IMG_6439.GIF',
    'images/IMG_8945.PNG',
    'images/IMG_8946.PNG',
    'images/IMG_8947.PNG',
    'images/IMG_8948.PNG',
    'images/IMG_8949.PNG',
    'images/IMG_8950.PNG',
    'images/IMG_8951.PNG',
    'images/IMG_8952.PNG',
    'images/IMG_8953.PNG'
    // Note: HEIC files may not display in browsers. Consider converting them to JPG/PNG
    // 'images/IMG_6708.HEIC',
    // 'images/IMG_7337.HEIC',
    // 'images/IMG_7796.HEIC',
];

// Frame styles to apply

// Frame styles to rotate through
const frameStyles = [
    'style-romantic',
    'style-polaroid', 
    'style-vintage',
    'style-heart',
    'style-rose',
    'style-dreamy',
    'style-lovenote'
];

let currentSlideIndex = 0;
let isPlaying = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    createFloatingHearts();
    loadGallery();
    initFireworks();
    createSparkles();
    initScrollAnimations();
});

// Countdown Timer
function initCountdown() {
    const newYear = new Date('January 1, 2026 00:00:00').getTime();
    
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = newYear - now;
        
        if (distance < 0) {
            clearInterval(countdown);
            celebrateNewYear();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// Celebrate when countdown ends
function celebrateNewYear() {
    const countdownEl = document.getElementById('countdown');
    countdownEl.innerHTML = '<div class="year-display">2026! 🎉</div>';
    
    // Burst of confetti
    for (let i = 0; i < 100; i++) {
        setTimeout(() => createConfetti(), i * 30);
    }
    
    // Intense fireworks
    triggerFireworksBurst();
}

// Create Floating Hearts
function createFloatingHearts() {
    const container = document.getElementById('hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '✨', '🌟'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }, 500);
}

// Load Gallery Images with Timeline Layout
function loadGallery() {
    const gallery = document.getElementById('galleryContainer');
    
    images.forEach((src, index) => {
        const style = frameStyles[index % frameStyles.length];
        
        // Create timeline item wrapper
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        const item = document.createElement('div');
        item.className = `gallery-item ${style} loading`;
        
        // Create photo frame container
        const photoFrame = document.createElement('div');
        photoFrame.className = 'photo-frame';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Memory ${index + 1}`;
        img.loading = 'lazy';
        
        photoFrame.appendChild(img);
        item.appendChild(photoFrame);
        timelineItem.appendChild(item);
        
        img.onload = () => {
            item.classList.remove('loading');
        };
        
        img.onerror = () => {
            timelineItem.style.display = 'none';
        };
        
        item.onclick = () => openLightbox(index);
        gallery.appendChild(timelineItem);
    });
    
    document.getElementById('totalSlides').textContent = images.length;
}

// Lightbox Functions
function openLightbox(index) {
    currentSlideIndex = index;
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    
    img.src = images[index];
    document.getElementById('currentSlide').textContent = index + 1;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= images.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = images.length - 1;
    
    const img = document.getElementById('lightboxImg');
    img.src = images[currentSlideIndex];
    document.getElementById('currentSlide').textContent = currentSlideIndex + 1;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') changeSlide(1);
    if (e.key === 'ArrowLeft') changeSlide(-1);
    if (e.key === 'Escape') closeLightbox();
});

// Envelope Animation
function openEnvelope() {
    document.querySelector('.envelope').classList.toggle('opened');
}

// Scroll to Gallery
function scrollToGallery() {
    document.getElementById('letter').scrollIntoView({ behavior: 'smooth' });
}

// Music Toggle
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicToggle');
    
    if (isPlaying) {
        music.pause();
        btn.classList.remove('playing');
        btn.textContent = '🎵';
    } else {
        music.play().catch(() => {
            // Autoplay might be blocked
            console.log('Please interact with the page first');
        });
        btn.classList.add('playing');
        btn.textContent = '🔊';
    }
    isPlaying = !isPlaying;
}

// Fireworks Canvas
function initFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    const particles = [];
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 8,
                y: (Math.random() - 0.5) * 8
            };
            this.alpha = 1;
            this.decay = 0.015 + Math.random() * 0.01;
            this.size = 2 + Math.random() * 2;
        }
        
        update() {
            this.velocity.y += 0.1; // gravity
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    function createFirework(x, y) {
        const colors = ['#ff6b9d', '#ffd700', '#ff69b4', '#00ffff', '#ff4444', '#44ff44', '#ffffff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(x, y, color));
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Random fireworks
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5
            );
        }
    }, 1500);
    
    // Store createFirework for burst
    window.createFirework = createFirework;
}

function triggerFireworksBurst() {
    const canvas = document.getElementById('fireworks');
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            window.createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.6
            );
        }, i * 100);
    }
}

// Confetti
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.width = (5 + Math.random() * 10) + 'px';
    confetti.style.height = (5 + Math.random() * 10) + 'px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
}

// Sparkles
function createSparkles() {
    const landing = document.querySelector('.landing');
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 1.5 + 's';
        landing.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1500);
    }, 200);
}

// Touch support for mobile swipe in lightbox
let touchStartX = 0;
let touchEndX = 0;

document.getElementById('lightbox').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.getElementById('lightbox').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next
        } else {
            changeSlide(-1); // Swipe right - previous
        }
    }
}

// Console love message
console.log('%c💕 Made with love for Stef 💕', 'font-size: 24px; color: #ff6b9d; font-weight: bold;');
console.log('%cHappy New Year 2026! 🎉', 'font-size: 18px; color: #ffd700;');

// ======================================
// SCROLL ANIMATIONS - Elegant & Smooth
// ======================================

function initScrollAnimations() {
    // Add scroll-animate class to elements
    const sectionTitle = document.querySelector('.gallery-section .section-title');
    const sectionSubtitle = document.querySelector('.gallery-section .section-subtitle');
    const envelope = document.querySelector('.envelope');
    const messageContent = document.querySelector('.message-content');
    
    if (sectionTitle) sectionTitle.classList.add('scroll-animate', 'fade-up');
    if (sectionSubtitle) sectionSubtitle.classList.add('scroll-animate', 'fade-up');
    if (envelope) envelope.classList.add('scroll-animate');
    if (messageContent) messageContent.classList.add('scroll-animate');
    
    // Set up Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Optional: unobserve after animation (for performance)
                // scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Observe gallery items separately for staggered effect
    observeGalleryItems();
}

function observeGalleryItems() {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    });
    
    // Observe each timeline item
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.classList.add('scroll-animate');
        galleryObserver.observe(item);
    });
}
