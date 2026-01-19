
   
        // Initialize Particles.js Background
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#0066ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#0066ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });

        // Custom Cursor
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Interactive cursor effects
        document.querySelectorAll('a, button, .team-card, .destination-card, .value-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                follower.style.transform = 'scale(1.3)';
                follower.style.borderColor = 'rgba(0, 204, 255, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
                follower.style.borderColor = 'rgba(0, 204, 255, 0.2)';
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active nav link based on scroll position
            updateActiveNavLink();
        });

        // Mobile menu functionality
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        const mobileOverlay = document.getElementById('mobileOverlay');
        
        function openMobileMenu() {
            mobileNav.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMobileMenu() {
            mobileNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMenuBtn.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Privacy modal functionality
        const privacyModal = document.getElementById('privacyModal');
        const mobilePrivacyBtn = document.getElementById('mobile-privacy-btn');
        const footerPrivacyBtn = document.getElementById('footer-privacy-btn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        
        function openPrivacyModal() {
            privacyModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeMobileMenu(); // Close mobile menu if open
        }
        
        function closePrivacyModal() {
            privacyModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        mobilePrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openPrivacyModal();
        });
        
        footerPrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openPrivacyModal();
        });
        
        closeModalBtn.addEventListener('click', closePrivacyModal);
        
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) {
                closePrivacyModal();
            }
        });

        // Update active navigation link based on scroll position
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    // Update desktop nav
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                    
                    // Update mobile nav
                    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Card hover animations
        document.querySelectorAll('.value-card, .destination-card, .team-card, .testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Image hover effect for destination cards
        document.querySelectorAll('.destination-image img').forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
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

        // Observe cards for animation
        document.querySelectorAll('.value-card, .destination-card, .team-card, .step, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Initialize
        updateActiveNavLink();
   