// ===================================
// JAPANESE MINIMALIST INTERACTIVE
// ===================================

class ZenSite {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.init();
    }

    init() {
        this.setupLoadingStates();
        this.setupCursor();
        this.setupCursorTrail();
        this.setupSakuraPetals();
        this.setupBambooInteraction();
        this.setupMenu();
        this.setupMagneticElements();
        this.setupDraggableShapes();
        this.setupParallax();
        this.setupTextScramble();
        this.setupExpandableCards();
        this.setupCounters();
        this.setupScrollAnimations();
        this.setupScrollProgress();
        this.setupSmoothScroll();
        this.setupAccessibility();
        this.updateCursor();
    }

    // ===================================
    // LOADING STATES & PERFORMANCE
    // ===================================

    setupLoadingStates() {
        // Add loading class to body initially
        document.body.classList.add('loading');
        
        // Remove loading state when everything is ready
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
            this.animatePageIn();
        });

        // Preload critical resources
        this.preloadResources();
    }

    animatePageIn() {
        const elements = document.querySelectorAll('.hero, .philosophy, .work-section, .about, .services, .contact');
        elements.forEach((el, index) => {
            el.classList.add('page-transition');
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }

    preloadResources() {
        // Preload fonts
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            link.rel = 'preload';
            link.as = 'style';
        });
    }

    // ===================================
    // SCROLL PROGRESS INDICATOR
    // ===================================

    setupScrollProgress() {
        const progressBar = document.getElementById('scroll-progress-bar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // ===================================
    // ACCESSIBILITY ENHANCEMENTS
    // ===================================

    setupAccessibility() {
        // Skip to main content link
        this.addSkipLink();
        
        // Enhanced keyboard navigation
        this.setupKeyboardNavigation();
        
        // Screen reader announcements
        this.setupScreenReaderSupport();
        
        // Reduced motion support
        this.setupReducedMotion();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupKeyboardNavigation() {
        // Enhanced arrow key navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Section navigation with arrow keys
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateToNextSection();
            }
            if (e.ctrlKey && e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateToPreviousSection();
            }
        });
    }

    navigateToNextSection() {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        const nextIndex = (currentIndex + 1) % sections.length;
        sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
    }

    navigateToPreviousSection() {
        const sections = document.querySelectorAll('section[id]');
        const currentSection = this.getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
        sections[prevIndex].scrollIntoView({ behavior: 'smooth' });
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = sections[0];
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                currentSection = section;
            }
        });
        
        return currentSection;
    }

    setupScreenReaderSupport() {
        // Add ARIA labels to interactive elements
        const interactiveElements = document.querySelectorAll('[data-draggable], [data-magnetic], [data-expandable]');
        interactiveElements.forEach(el => {
            if (!el.getAttribute('aria-label')) {
                el.setAttribute('aria-label', 'Interactive element');
            }
        });

        // Announce section changes
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.querySelector('h1, h2')?.textContent || 'Section';
                    this.announceToScreenReader(`Now viewing ${sectionName}`);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            document.documentElement.style.setProperty('--transition-fast', '0s');
            document.documentElement.style.setProperty('--transition-base', '0s');
            document.documentElement.style.setProperty('--transition-slow', '0s');
            
            // Disable specific animations
            const animatedElements = document.querySelectorAll('[style*="animation"]');
            animatedElements.forEach(el => {
                el.style.animation = 'none';
            });
        }
    }

    // ===================================
    // CUSTOM CURSOR
    // ===================================

    setupCursor() {
        const cursor = document.querySelector('.cursor');

        if (!cursor || window.innerWidth < 968) return;

        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, [data-draggable], [data-magnetic], [data-expandable], .bamboo-stem');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Click effect - shuriken spin faster
        document.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        });

        document.addEventListener('mouseup', () => {
            setTimeout(() => {
                cursor.classList.remove('active');
            }, 200);
        });
    }

    updateCursor() {
        const cursor = document.querySelector('.cursor');
        
        if (!cursor) return;

        // Smooth cursor movement with slight delay for shuriken
        const speed = 0.25;
        this.currentX += (this.mouseX - this.currentX) * speed;
        this.currentY += (this.mouseY - this.currentY) * speed;

        cursor.style.left = this.currentX + 'px';
        cursor.style.top = this.currentY + 'px';

        requestAnimationFrame(() => this.updateCursor());
    }

    // ===================================
    // CURSOR TRAIL
    // ===================================

    setupCursorTrail() {
        const canvas = document.getElementById('cursor-trail');
        if (!canvas || window.innerWidth < 968) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const points = [];
        const maxPoints = 20;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        document.addEventListener('mousemove', (e) => {
            points.push({ x: e.clientX, y: e.clientY, age: 0 });
            if (points.length > maxPoints) points.shift();
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            points.forEach((point, index) => {
                point.age++;
                const alpha = 1 - (point.age / maxPoints);
                const size = 3 * (1 - (point.age / maxPoints));

                // Draw shuriken-like trail
                ctx.save();
                ctx.translate(point.x, point.y);
                ctx.rotate(Math.PI / 4);
                
                ctx.beginPath();
                ctx.moveTo(0, -size);
                ctx.lineTo(-size/2, 0);
                ctx.lineTo(0, size);
                ctx.lineTo(size/2, 0);
                ctx.closePath();
                
                ctx.fillStyle = `rgba(192, 192, 192, ${alpha * 0.15})`;
                ctx.fill();
                
                ctx.restore();
            });

            // Remove old points
            while (points.length > 0 && points[0].age > maxPoints) {
                points.shift();
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    // ===================================
    // SAKURA PETALS ANIMATION
    // ===================================

    setupSakuraPetals() {
        const canvas = document.getElementById('sakura-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const petals = [];
        const petalCount = 4;

        // Sakura petal class
        class SakuraPetal {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -20;
                this.size = Math.random() * 8 + 6;
                this.speed = Math.random() * 0.8 + 0.5;
                this.opacity = Math.random() * 0.7 + 0.4;
                this.swing = Math.random() * 2 - 1;
                this.swingSpeed = Math.random() * 0.02 + 0.01;
                this.rotation = Math.random() * 360;
                this.rotationSpeed = Math.random() * 2 - 1;
            }

            update() {
                this.y += this.speed;
                this.x += Math.sin(this.y * this.swingSpeed) * this.swing;
                this.rotation += this.rotationSpeed;

                if (this.y > canvas.height + 20) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate((this.rotation * Math.PI) / 180);
                ctx.globalAlpha = this.opacity;

                // Draw sakura petal shape
                ctx.beginPath();
                
                // Five petals
                for (let i = 0; i < 5; i++) {
                    const angle = (i * Math.PI * 2) / 5;
                    const x = Math.cos(angle) * this.size;
                    const y = Math.sin(angle) * this.size;
                    
                    if (i === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        const cpx = Math.cos(angle - Math.PI / 5) * (this.size * 0.5);
                        const cpy = Math.sin(angle - Math.PI / 5) * (this.size * 0.5);
                        ctx.quadraticCurveTo(cpx, cpy, x, y);
                    }
                }
                
                ctx.closePath();
                
                // Gradient for sakura color - more vibrant
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
                gradient.addColorStop(0, '#ff9ec7');
                gradient.addColorStop(0.5, '#ffb3d1');
                gradient.addColorStop(1, '#ff6b9d');
                
                ctx.fillStyle = gradient;
                ctx.fill();

                // Add center detail - more visible
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = '#ffc0cb';
                ctx.fill();

                ctx.restore();
            }
        }

        // Create petals
        for (let i = 0; i < petalCount; i++) {
            petals.push(new SakuraPetal());
        }

        // Animation loop
        const animatePetals = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            petals.forEach(petal => {
                petal.update();
                petal.draw();
            });

            requestAnimationFrame(animatePetals);
        };

        animatePetals();

        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ===================================
    // BAMBOO INTERACTION
    // ===================================

    setupBambooInteraction() {
        const bambooStems = document.querySelectorAll('.bamboo-stem');
        
        bambooStems.forEach((stem, index) => {
            stem.addEventListener('mouseenter', () => {
                // Create subtle rustling effect - add fewer, smaller leaves
                for (let i = 0; i < 2; i++) {
                    const leaf = document.createElement('div');
                    leaf.innerHTML = '🍃';
                    leaf.style.position = 'fixed';
                    leaf.style.fontSize = '8px';
                    leaf.style.pointerEvents = 'none';
                    leaf.style.zIndex = '9997';
                    leaf.style.opacity = '0.6';
                    
                    const rect = stem.getBoundingClientRect();
                    leaf.style.left = rect.left + Math.random() * 10 - 5 + 'px';
                    leaf.style.top = rect.top + Math.random() * rect.height + 'px';
                    
                    document.body.appendChild(leaf);
                    
                    let x = parseFloat(leaf.style.left);
                    let y = parseFloat(leaf.style.top);
                    let opacity = 0.6;
                    let rotation = 0;
                    const vx = (Math.random() - 0.5) * 0.5;
                    const vy = Math.random() * 0.5 + 0.3;
                    
                    const animateLeaf = () => {
                        x += vx;
                        y += vy;
                        opacity -= 0.01;
                        rotation += 2;
                        
                        leaf.style.left = x + 'px';
                        leaf.style.top = y + 'px';
                        leaf.style.opacity = opacity;
                        leaf.style.transform = `rotate(${rotation}deg)`;
                        
                        if (opacity > 0) {
                            requestAnimationFrame(animateLeaf);
                        } else {
                            leaf.remove();
                        }
                    };
                    
                    setTimeout(() => animateLeaf(), i * 100);
                }
                
                // Subtle sway animation on hover
                stem.style.animation = 'none';
                setTimeout(() => {
                    stem.style.animation = `sway 1s ease-in-out`;
                }, 10);
            });
        });
    }

    // ===================================
    // MENU TOGGLE
    // ===================================

    setupMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const overlay = document.querySelector('.menu-overlay');
        const menuLinks = document.querySelectorAll('.menu-link');

        if (!toggle || !overlay) return;

        const closeMenu = () => {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
        };

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                closeMenu();
                
                setTimeout(() => {
                    document.querySelector(target)?.scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 500);
            });
        });
    }

    // ===================================
    // MAGNETIC ELEMENTS
    // ===================================

    setupMagneticElements() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.3;
                    const moveY = y * strength * 0.3;
                    
                    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ===================================
    // DRAGGABLE SHAPES
    // ===================================

    setupDraggableShapes() {
        const shapes = document.querySelectorAll('[data-draggable]');
        
        shapes.forEach(shape => {
            let isDragging = false;
            let currentX;
            let currentY;
            let initialX;
            let initialY;

            shape.addEventListener('mousedown', (e) => {
                isDragging = true;
                const rect = shape.getBoundingClientRect();
                initialX = e.clientX - rect.left;
                initialY = e.clientY - rect.top;
                shape.style.cursor = 'grabbing';
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;

                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                shape.style.left = currentX + 'px';
                shape.style.top = currentY + 'px';
                shape.style.right = 'auto';
                shape.style.bottom = 'auto';
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
                shape.style.cursor = 'none';
            });

            // Special interaction for sakura flower
            if (shape.classList.contains('shape-sakura')) {
                shape.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Create sakura burst effect
                    for (let i = 0; i < 8; i++) {
                        const petal = document.createElement('div');
                        petal.innerHTML = '🌸';
                        petal.style.position = 'fixed';
                        petal.style.fontSize = '16px';
                        petal.style.pointerEvents = 'none';
                        petal.style.zIndex = '9997';
                        petal.style.left = e.clientX + 'px';
                        petal.style.top = e.clientY + 'px';
                        
                        const angle = (i * 45) * (Math.PI / 180);
                        const velocity = 80;
                        const vx = Math.cos(angle) * velocity;
                        const vy = Math.sin(angle) * velocity;
                        
                        document.body.appendChild(petal);
                        
                        let x = e.clientX;
                        let y = e.clientY;
                        let opacity = 1;
                        let rotation = 0;
                        let scale = 1;
                        
                        const animatePetal = () => {
                            x += vx * 0.016;
                            y += vy * 0.016 + 1;
                            opacity -= 0.015;
                            rotation += 8;
                            scale -= 0.01;
                            
                            petal.style.left = x + 'px';
                            petal.style.top = y + 'px';
                            petal.style.opacity = opacity;
                            petal.style.transform = `rotate(${rotation}deg) scale(${scale})`;
                            
                            if (opacity > 0 && scale > 0) {
                                requestAnimationFrame(animatePetal);
                            } else {
                                petal.remove();
                            }
                        };
                        
                        setTimeout(() => animatePetal(), i * 30);
                    }
                });
            }
        });
    }

    // ===================================
    // PARALLAX SCROLL
    // ===================================

    setupParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ===================================
    // TEXT SCRAMBLE EFFECT
    // ===================================

    setupTextScramble() {
        const scrambleElements = document.querySelectorAll('[data-scramble]');
        
        scrambleElements.forEach(el => {
            const originalText = el.textContent;
            const japaneseText = el.getAttribute('data-japanese');
            
            // Japanese characters for transition effect
            const japaneseChars = '創造鼓舞変革空間美学侘寂間禅静和心道芸術魂力技';
            let interval;
            let isHovering = false;

            el.addEventListener('mouseenter', () => {
                if (isHovering) return;
                isHovering = true;
                
                let iteration = 0;
                clearInterval(interval);
                
                // Phase 1: Scroll through random Japanese characters
                interval = setInterval(() => {
                    el.textContent = originalText
                        .split('')
                        .map((letter, index) => {
                            if (index < iteration) {
                                return japaneseText[index] || letter;
                            }
                            return japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
                        })
                        .join('');
                    
                    if (iteration >= originalText.length) {
                        clearInterval(interval);
                        // Final reveal of Japanese text
                        el.textContent = japaneseText;
                    }
                    
                    iteration += 1 / 2;
                }, 40);
            });

            el.addEventListener('mouseleave', () => {
                isHovering = false;
                let iteration = 0;
                clearInterval(interval);
                
                // Phase 2: Scroll back through Japanese characters to English
                interval = setInterval(() => {
                    el.textContent = japaneseText
                        .split('')
                        .map((letter, index) => {
                            if (index < iteration) {
                                return originalText[index] || letter;
                            }
                            return japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
                        })
                        .join('');
                    
                    if (iteration >= japaneseText.length) {
                        clearInterval(interval);
                        // Final reveal of English text
                        el.textContent = originalText;
                    }
                    
                    iteration += 1 / 2;
                }, 40);
            });
        });
    }

    // ===================================
    // EXPANDABLE CARDS
    // ===================================

    setupExpandableCards() {
        const cards = document.querySelectorAll('[data-expandable]');
        
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const isExpanded = card.classList.contains('expanded');
                
                // Close all other cards
                cards.forEach(c => c.classList.remove('expanded'));
                
                // Toggle current card
                if (!isExpanded) {
                    card.classList.add('expanded');
                }
            });
        });

        // Horizontal scroll for work section
        const workSlider = document.querySelector('.work-slider');
        if (workSlider) {
            let isDown = false;
            let startX;
            let scrollLeft;

            workSlider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - workSlider.offsetLeft;
                scrollLeft = workSlider.scrollLeft;
            });

            workSlider.addEventListener('mouseleave', () => {
                isDown = false;
            });

            workSlider.addEventListener('mouseup', () => {
                isDown = false;
            });

            workSlider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - workSlider.offsetLeft;
                const walk = (x - startX) * 2;
                workSlider.scrollLeft = scrollLeft - walk;
            });
        }
    }

    // ===================================
    // COUNTER ANIMATIONS
    // ===================================

    setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ===================================
    // SCROLL ANIMATIONS
    // ===================================

    setupScrollAnimations() {
        const animateElements = document.querySelectorAll('.fade-in, .section-title, .body-text, .service-item, .work-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // ===================================
    // SMOOTH SCROLL
    // ===================================

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    }
}

// ===================================
// ADDITIONAL INTERACTIONS
// ===================================

// Sakura Burst on Click
document.addEventListener('click', (e) => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.border = '1px solid rgba(255, 192, 203, 0.5)';
    ripple.style.left = e.clientX - 10 + 'px';
    ripple.style.top = e.clientY - 10 + 'px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.zIndex = '9997';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);

    // Create sakura burst
    for (let i = 0; i < 6; i++) {
        const petal = document.createElement('div');
        petal.innerHTML = '🌸';
        petal.style.position = 'fixed';
        petal.style.left = e.clientX + 'px';
        petal.style.top = e.clientY + 'px';
        petal.style.pointerEvents = 'none';
        petal.style.fontSize = '12px';
        petal.style.zIndex = '9997';
        
        const angle = (i * 60) * (Math.PI / 180);
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        petal.style.animation = 'none';
        document.body.appendChild(petal);
        
        let x = e.clientX;
        let y = e.clientY;
        let opacity = 1;
        let rotation = 0;
        
        const animate = () => {
            x += vx * 0.016;
            y += vy * 0.016 + 2;
            opacity -= 0.02;
            rotation += 5;
            
            petal.style.left = x + 'px';
            petal.style.top = y + 'px';
            petal.style.opacity = opacity;
            petal.style.transform = `rotate(${rotation}deg)`;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                petal.remove();
            }
        };
        
        animate();
    }
});

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// ENSO INTERACTION
// ===================================

const enso = document.querySelector('.enso circle');
if (enso) {
    document.addEventListener('mousemove', (e) => {
        const mousePercent = e.clientX / window.innerWidth;
        const dashOffset = 50 + (mousePercent * 100);
        enso.style.strokeDashoffset = dashOffset;
    });
}

// ===================================
// SCROLL PROGRESS
// ===================================

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Can be used for a progress indicator if needed
    document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
});

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', (e) => {
    // Close menu with Escape
    if (e.key === 'Escape') {
        const toggle = document.querySelector('.nav-toggle');
        const overlay = document.querySelector('.menu-overlay');
        
        if (overlay?.classList.contains('active')) {
            toggle?.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
    
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
});

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

// Debounce function for resize events
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

// Handle resize
window.addEventListener('resize', debounce(() => {
    const canvas = document.getElementById('cursor-trail');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}, 250));

// ===================================
// LAZY LOADING IMAGES
// ===================================

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// TOUCH SUPPORT FOR MOBILE
// ===================================

if ('ontouchstart' in window) {
    // Disable draggable on mobile
    document.querySelectorAll('[data-draggable]').forEach(shape => {
        shape.style.display = 'none';
    });
    
    // Simplify interactions for touch devices
    document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.style.transform = 'none';
    });
}

// ===================================
// INITIALIZE
// ===================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ZenSite();
    });
} else {
    new ZenSite();
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// Console message
console.log('%c禅 Zen Studio', 'font-size: 24px; font-weight: bold;');
console.log('%cMinimalist. Interactive. Meaningful.', 'font-size: 12px; color: #8a8a8a;');
