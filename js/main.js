// ===================================
// JAPANESE MINIMALIST INTERACTIVE
// ===================================

class ZenSite {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
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
        this.setupContactForm();
        this.setupBackToTop();
        this.setupSectionNavigation();
        this.setupProjectFiltering();
    }

    // ===================================
    // THEME TOGGLE
    // ===================================

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add transition class
            document.documentElement.classList.add('theme-transitioning');
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update meta theme-color
            const metaThemeColor = document.querySelector('meta[name="theme-color"]');
            if (metaThemeColor) {
                metaThemeColor.setAttribute('content', newTheme === 'light' ? '#f5f5f0' : '#0a0a0a');
            }
            
            // Remove transition class after animation
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transitioning');
            }, 300);

            // Create theme change effect
            this.createThemeChangeEffect();
        });
    }

    createThemeChangeEffect() {
        // Create a subtle ripple effect from the theme toggle button
        const toggle = document.querySelector('.theme-toggle');
        if (!toggle) return;

        const rect = toggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--accent-color);
            opacity: 0.3;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%) scale(0);
            animation: theme-ripple 0.6s ease-out forwards;
        `;

        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // ===================================
    // LOADING STATES & PERFORMANCE
    // ===================================

    setupLoadingStates() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (!loadingScreen) return;

        // Simulate loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
        }, 200);

        // Remove loading screen when page is fully loaded
        window.addEventListener('load', () => {
            clearInterval(progressInterval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                this.animatePageIn();
                
                // Remove from DOM after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 500);
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

        // Auto-hide scroll hint after first scroll
        const scrollHint = document.querySelector('.scroll-hint');
        let hasScrolled = false;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            progressBar.style.width = scrollPercent + '%';

            // Hide scroll hint after scrolling
            if (!hasScrolled && scrollTop > 100 && scrollHint) {
                hasScrolled = true;
                scrollHint.style.opacity = '0';
                scrollHint.style.visibility = 'hidden';
            }
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

        // Direct cursor positioning - no interpolation
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    updateCursor() {
        // No longer needed - cursor now follows directly
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
        const maxPoints = 5; // Further reduced for better performance

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
                const size = 2 * (1 - (point.age / maxPoints)); // Smaller size

                // Draw subtle trail dots
                ctx.save();
                ctx.translate(point.x, point.y);
                
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                
                // Theme-aware color
                const theme = document.documentElement.getAttribute('data-theme');
                const color = theme === 'dark' ? '245, 245, 240' : '10, 10, 10';
                ctx.fillStyle = `rgba(${color}, ${alpha * 0.08})`; // Very subtle
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

        // Performance check - reduce petals on lower-end devices
        const isLowEnd = navigator.hardwareConcurrency <= 4 || window.innerWidth < 768;
        
        const petals = [];
        const petalCount = isLowEnd ? 1 : 2; // Further reduced for better performance

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
            // Ensure smooth transitions
            el.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 50;
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.15;
                    const moveY = y * strength * 0.15;
                    
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
        
        const easeOutQuad = (t) => t * (2 - t);
        
        const animateCounter = (counter, delay = 0) => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const startTime = performance.now() + delay;

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                
                if (elapsed < 0) {
                    requestAnimationFrame(updateCounter);
                    return;
                }
                
                if (elapsed < duration) {
                    const progress = elapsed / duration;
                    const easedProgress = easeOutQuad(progress);
                    const current = Math.floor(easedProgress * target);
                    counter.textContent = current + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            requestAnimationFrame(updateCounter);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const index = Array.from(counters).indexOf(entry.target);
                    animateCounter(entry.target, index * 100); // Stagger by 100ms
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

    // ===================================
    // CONTACT FORM VALIDATION
    // ===================================

    // ===================================
    // BACK TO TOP BUTTON
    // ===================================

    setupBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        // Show/hide on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Scroll to top on click
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // SECTION NAVIGATION DOTS
    // ===================================

    setupSectionNavigation() {
        const dots = document.querySelectorAll('.section-dot');
        const sections = document.querySelectorAll('section[id]');
        
        if (!dots.length || !sections.length) return;

        // Update active dot on scroll
        const updateActiveDot = () => {
            const scrollPosition = window.pageYOffset + window.innerHeight / 3;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    dots.forEach(dot => {
                        dot.classList.remove('active');
                        if (dot.getAttribute('data-section') === sectionId) {
                            dot.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', updateActiveDot);
        updateActiveDot(); // Initial call

        // Smooth scroll on dot click
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = dot.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===================================
    // CONTACT FORM VALIDATION
    // ===================================

    setupContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');
        const honeypotInput = form.querySelector('#website');
        const submitBtn = form.querySelector('.submit-btn');
        const formStatus = form.querySelector('.form-status');

        // Real-time validation
        const validateField = (field, validator) => {
            const errorSpan = field.parentElement.querySelector('.error-message');
            const error = validator(field.value);
            
            if (error) {
                errorSpan.textContent = error;
                field.setAttribute('aria-invalid', 'true');
                return false;
            } else {
                errorSpan.textContent = '';
                field.setAttribute('aria-invalid', 'false');
                return true;
            }
        };

        const validators = {
            name: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.trim().length < 2) return 'Name must be at least 2 characters';
                return '';
            },
            email: (value) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            },
            message: (value) => {
                if (!value.trim()) return 'Message is required';
                if (value.trim().length < 10) return 'Message must be at least 10 characters';
                return '';
            }
        };

        // Add blur event listeners for validation
        nameInput.addEventListener('blur', () => validateField(nameInput, validators.name));
        emailInput.addEventListener('blur', () => validateField(emailInput, validators.email));
        messageInput.addEventListener('blur', () => validateField(messageInput, validators.message));

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate all fields
            const isNameValid = validateField(nameInput, validators.name);
            const isEmailValid = validateField(emailInput, validators.email);
            const isMessageValid = validateField(messageInput, validators.message);

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                this.showFormStatus(formStatus, 'Please fix the errors above', 'error');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                // Submit form with honeypot protection
                await this.submitForm({
                    name: nameInput.value,
                    email: emailInput.value,
                    message: messageInput.value,
                    honeypot: honeypotInput.value
                });

                // Success
                this.showFormStatus(formStatus, 'Thank you! Your message has been sent successfully.', 'success');
                form.reset();
                
                // Create success effect
                this.createSuccessEffect(submitBtn);

            } catch (error) {
                // Error
                this.showFormStatus(formStatus, 'Oops! Something went wrong. Please try again.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }

    async submitForm(data) {
        try {
            const response = await fetch('/.netlify/functions/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    honeypot: '' // Honeypot field for spam protection
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Submission failed');
            }

            return result;
        } catch (error) {
            console.error('Form submission error:', error);
            throw error;
        }
    }

    showFormStatus(statusElement, message, type) {
        statusElement.textContent = message;
        statusElement.className = 'form-status show ' + type;
        
        setTimeout(() => {
            statusElement.classList.remove('show');
        }, 5000);
    }

    createSuccessEffect(button) {
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Create sakura burst for success
        for (let i = 0; i < 12; i++) {
            const petal = document.createElement('div');
            petal.innerHTML = '🌸';
            petal.style.position = 'fixed';
            petal.style.fontSize = '20px';
            petal.style.pointerEvents = 'none';
            petal.style.zIndex = '9999';
            petal.style.left = x + 'px';
            petal.style.top = y + 'px';
            
            const angle = (i * 30) * (Math.PI / 180);
            const velocity = 100 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            document.body.appendChild(petal);
            
            let px = x;
            let py = y;
            let opacity = 1;
            let rotation = 0;
            
            const animate = () => {
                px += vx * 0.016;
                py += vy * 0.016 + 2;
                opacity -= 0.015;
                rotation += 8;
                
                petal.style.left = px + 'px';
                petal.style.top = py + 'px';
                petal.style.opacity = opacity;
                petal.style.transform = `rotate(${rotation}deg)`;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    petal.remove();
                }
            };
            
            setTimeout(() => animate(), i * 20);
        }
    }

    // ===================================
    // PROJECT FILTERING
    // ===================================

    setupProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const workTiles = document.querySelectorAll('.work-tile');
        const workCount = document.querySelector('.work-count');

        if (!filterButtons.length || !workTiles.length) return;

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filter work tiles with animation
                workTiles.forEach((tile, index) => {
                    const category = tile.getAttribute('data-category');
                    const shouldShow = filter === 'all' || category === filter;

                    if (shouldShow) {
                        tile.style.display = 'block';
                        tile.style.opacity = '0';
                        tile.style.transform = 'translateY(20px)';
                        
                        // Staggered animation
                        setTimeout(() => {
                            tile.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                            tile.style.opacity = '1';
                            tile.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        tile.style.transition = 'all 0.3s ease';
                        tile.style.opacity = '0';
                        tile.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            tile.style.display = 'none';
                        }, 300);
                    }
                });

                // Update project count
                const visibleCount = Array.from(workTiles).filter(tile => {
                    const category = tile.getAttribute('data-category');
                    return filter === 'all' || category === filter;
                }).length;

                workCount.textContent = `${visibleCount} Project${visibleCount !== 1 ? 's' : ''}`;
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
    
    @keyframes success-ripple {
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
    
    @keyframes theme-ripple {
        to {
            transform: translate(-50%, -50%) scale(100);
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

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('ServiceWorker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Console message
console.log('%c禅 Zen Studio', 'font-size: 24px; font-weight: bold;');
console.log('%cMinimalist. Interactive. Meaningful.', 'font-size: 12px; color: #8a8a8a;');
