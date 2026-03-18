// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initMouseFollower();
    initNavbar();
    initVisitorInfo();
    initTyped();
    initAOS();
    initStatsCounter();
    initSkillProgress();
    initProjectFilter();
    initContactForm();
    initDownloadResume();
    initHamburger();
    initThemeToggle();
    initSmoothScroll();
    initProjectData();
    initMenuClose();
});

// ===== LOADER =====
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    });
}

// ===== MOUSE FOLLOWER =====
function initMouseFollower() {
    const follower = document.querySelector('.mouse-follower');
    
    if (!follower) return;
    
    document.addEventListener('mousemove', (e) => {
        follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .filter-btn, .social-icon');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
        });
    });
    
    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        follower.style.opacity = '0.5';
    });
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link highlighting
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== VISITOR INFO =====
function initVisitorInfo() {
    const visitorLocation = document.getElementById('visitorLocation');
    const visitorIP = document.getElementById('visitorIP');
    const visitorTime = document.getElementById('visitorTime');
    
    if (!visitorLocation || !visitorIP || !visitorTime) return;
    
    // Update clock
    setInterval(() => {
        const now = new Date();
        visitorTime.textContent = now.toLocaleTimeString();
    }, 1000);
    
    // Fetch IP and location
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            visitorIP.textContent = data.ip;
            return fetch(`https://ipapi.co/${data.ip}/json/`);
        })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                visitorLocation.textContent = `${data.city || 'Unknown'}, ${data.country_name || 'Unknown'}`;
            }
        })
        .catch(() => {
            visitorLocation.textContent = 'Location unavailable';
            visitorIP.textContent = 'Unable to detect';
        });
}

// ===== TYPED.JS =====
function initTyped() {
    if (typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: [
                'design embedded systems',
                'work with microcontrollers',
                'develop power electronics',
                'create PCB layouts',
                'research renewable energy'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
}

// ===== AOS =====
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'));
                
                let current = 0;
                const increment = targetValue / 50;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < targetValue) {
                        target.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = targetValue + '+';
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// ===== SKILL PROGRESS =====
function initSkillProgress() {
    const progressBars = document.querySelectorAll('.skill-progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width') || 0;
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// ===== PROJECT FILTER =====
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter projects
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        if (filter === 'all' || project.dataset.category === filter) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 10);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.8)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// ===== PROJECT DATA =====
function initProjectData() {
    const projects = [
        {
            category: 'embedded',
            icon: 'fa-microchip',
            title: 'Smart Home Energy Monitor',
            description: 'ESP32-based real-time energy monitoring system with IoT dashboard.',
            tech: ['ESP32', 'Arduino', 'Python', 'MQTT'],
            github: '#',
            demo: '#'
        },
        {
            category: 'power',
            icon: 'fa-bolt',
            title: 'Solar MPPT Charge Controller',
            description: '30A MPPT charge controller with maximum power point tracking algorithm.',
            tech: ['MOSFETs', 'PIC Microcontroller', 'C', 'LTspice'],
            github: '#',
            demo: '#'
        },
        {
            category: 'circuit',
            icon: 'fa-microchip',
            title: 'ECG Amplifier Circuit',
            description: 'Low-noise instrumentation amplifier for biomedical signal acquisition.',
            tech: ['Op-Amps', 'Filters', 'Altium', 'SPICE'],
            github: '#',
            demo: '#'
        },
        {
            category: 'research',
            icon: 'fa-chart-line',
            title: 'PV System Modeling',
            description: 'MATLAB/Simulink model of photovoltaic system with MPPT algorithms.',
            tech: ['MATLAB', 'Simulink', 'Power Electronics'],
            github: '#',
            demo: '#'
        }
    ];
    
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.category = project.category;
        card.setAttribute('data-aos', 'zoom-in-up');
        card.setAttribute('data-aos-delay', (index + 2) * 100);
        
        card.innerHTML = `
            <div class="card-media">
                <div class="media-overlay"></div>
                <i class="fas ${project.icon} project-icon"></i>
            </div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <div class="card-links">
                    <a href="${project.github}" class="card-link"><i class="fab fa-github"></i> Details</a>
                    <a href="${project.demo}" class="card-link"><i class="fas fa-external-link-alt"></i> Demo</a>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ===== DOWNLOAD RESUME =====
function initDownloadResume() {
    const downloadBtn = document.getElementById('download-resume');
    
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        
        setTimeout(() => {
            // Create resume content
            const resumeContent = `ASIF - ELECTRICAL & ELECTRONIC ENGINEER

CONTACT
=======
Name: Asif [Your Last Name]
Email: asif.eee@example.com
Phone: +880 1234-56789
Location: Dhaka, Bangladesh
University: BUET (Bangladesh University of Engineering and Technology)

EDUCATION
=========
B.Sc. in Electrical and Electronic Engineering | BUET (2021-2025)
- Current CGPA: 3.85/4.00
- Relevant Courses: Power Electronics, Embedded Systems, Digital Signal Processing, Control Systems

TECHNICAL SKILLS
===============
Programming: C/C++, Python, MATLAB, Verilog
Microcontrollers: Arduino, ESP32, STM32, Raspberry Pi
PCB Design: Altium Designer, KiCad, Eagle
Simulation: LTspice, PSpice, MATLAB/Simulink, Proteus
Power Electronics: DC-DC Converters, Inverters, Motor Drives, MPPT

PROJECTS
========
Smart Home Energy Monitor (2024)
- Designed ESP32-based energy monitoring system with current and voltage sensors
- Developed MQTT protocol for real-time data transmission to cloud dashboard
- Implemented alert system for abnormal power consumption

Solar MPPT Charge Controller (2023)
- Designed 30A MPPT charge controller using PIC microcontroller
- Implemented Perturb & Observe algorithm for maximum power tracking
- Achieved 95% efficiency in battery charging applications

ECG Amplifier Circuit (2023)
- Designed low-noise instrumentation amplifier for biomedical signals
- Implemented bandpass filters for noise reduction
- Created PCB layout in Altium Designer

RESEARCH
========
Efficient MPPT Algorithm for Solar PV Systems (2024)
- IEEE Transactions on Power Electronics (Under Review)

IoT-Based Smart Energy Meter (2023)
- International Conference on Electrical Engineering (ICEE 2023)

ACHIEVEMENTS
===========
- University Merit Scholarship (2022-2024)
- 1st Place - IEEE Hardware Hackathon (2023)
- Best Student Paper Award - ICEE 2023
- Dean's List Award (2021-2023)

CERTIFICATIONS
=============
- Embedded Systems Specialization - Coursera
- Power Electronics - NPTEL
- PCB Design with Altium - Udemy
- Raspberry Pi Certification

LANGUAGES
=========
Bengali (Native)
English (Fluent)`;
            
            const blob = new Blob([resumeContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Asif_EEE_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            
            setTimeout(() => {
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download CV';
            }, 2000);
            
            showNotification('CV downloaded successfully!', 'success');
        }, 1000);
    });
}

// ===== HAMBURGER MENU =====
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// ===== MENU CLOSE BUTTON =====
function initMenuClose() {
    const menuClose = document.querySelector('.menu-close');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuClose) return;
    
    menuClose.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        toggle.querySelector('i').className = 'fas fa-sun';
    }
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        const icon = toggle.querySelector('i');
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
            // Added inline style to force black text for this specific message
            showNotification('<span style="color: black;">Light mode activated</span>', 'info');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
            showNotification('Dark mode activated', 'info');
        }
    });
}


// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
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

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles if they don't exist
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                background: var(--dark-light);
                border-left: 4px solid var(--primary);
                border-radius: 5px;
                box-shadow: var(--shadow);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                color: white;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                border-left-color: #2ecc71;
            }
            .notification-error {
                border-left-color: #e74c3c;
            }
            .notification-info {
                border-left-color: var(--primary);
            }
            .notification i {
                font-size: 1.2rem;
            }
            .notification-success i {
                color: #2ecc71;
            }
            .notification-error i {
                color: #e74c3c;
            }
            .notification-info i {
                color: var(--primary);
            }
            
            /* Light theme styles */
            body.light-theme {
                --dark: #f5f5f5;
                --dark-light: #ffffff;
                --light: #333333;
                --gray: #666666;
                color: #333333;
            }
            
            body.light-theme .navbar.scrolled {
                background: rgba(255, 255, 255, 0.95);
            }
            
            body.light-theme .nav-link {
                color: #333333;
            }
            
            body.light-theme .nav-link:hover,
            body.light-theme .nav-link.active {
                color: var(--primary);
            }
            
            body.light-theme .theme-toggle {
                color: #333333;
            }
            
            body.light-theme .expertise-card,
            body.light-theme .project-card,
            body.light-theme .research-content,
            body.light-theme .achievement-card,
            body.light-theme .contact-form-container,
            body.light-theme .info-card {
                background: #ffffff;
                box-shadow: 0 5px 20px rgba(0,0,0,0.05);
            }
            
            body.light-theme .footer {
                background: #ffffff;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}