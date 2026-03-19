// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initNavbar();
    initVisitorInfo();
    initTyped();
    initAOS();
    initProjectData();
    initGallery();
    initHamburger();
    initThemeToggle();
    initSmoothScroll();
    initMenuClose();
    handleMobileResize();
});

// ===== LOADER =====
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2000);
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
    
    setInterval(() => {
        const now = new Date();
        visitorTime.textContent = now.toLocaleTimeString();
    }, 1000);
    
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
                'research nanotechnology',
                'design embedded systems',
                'develop ML models',
                'work on biomedical devices',
                'explore electronics',
                'am a robotics instructor'
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
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-in-out',
            disable: window.innerWidth < 768
        });
    }
}

// ===== PROJECT DATA =====
function initProjectData() {
    const projects = [
        {
            title: 'Autonomous Outdoor Trash-Collecting Robot',
            description: 'Real-time multi-class waste detection, sorting, and GPS-guided disposal system.',
            tech: ['YOLOv11', 'Raspberry Pi', 'GPS', 'Computer Vision'],
            icon: 'fa-robot',
            hasCode: false,
            hasDemo: false
        },
        {
            title: 'Plant Nutrient Deficiency Detection System',
            description: 'System using Python, OpenCV, Arduino and GSM for detecting and alerting plant nutrient deficiencies.',
            tech: ['OpenCV', 'Arduino', 'GSM', 'Python'],
            icon: 'fa-leaf',
            hasCode: false,
            hasDemo: false
        },
        {
            title: 'Remote Weather Telemetry Using LoRa',
            description: 'Long-range weather monitoring system with custom data encryption using LoRa communication.',
            tech: ['LoRa', 'Arduino', 'Encryption', 'Sensors'],
            icon: 'fa-cloud-sun',
            hasCode: false,
            hasDemo: false
        },
        {
            title: 'Mars Rover Navigation System',
            description: 'Autonomous navigation system for Mars rover simulation using Python, OpenCV and machine learning.',
            tech: ['Python', 'OpenCV', 'Machine Learning', 'Navigation'],
            icon: 'fa-rocket',
            hasCode: false,
            hasDemo: false
        },
        {
            title: 'Autonomous Firefighting Robot',
            description: 'Arduino-based robot with flame sensors and motor controllers for autonomous fire detection and extinguishing.',
            tech: ['Arduino', 'Flame Sensors', 'Motor Control', 'C++'],
            icon: 'fa-fire-extinguisher',
            hasCode: false,
            hasDemo: false
        },
        {
            title: 'Advanced Line Following Robot',
            description: 'High-speed line following robot with PID control and multiple sensor fusion.',
            tech: ['Arduino', 'IR Sensors', 'PID', 'C++'],
            icon: 'fa-arrows-alt',
            hasCode: false,
            hasDemo: false
        },
        {
            title: 'Maze Solving Robot',
            description: 'Autonomous robot capable of solving unknown mazes using advanced algorithms.',
            tech: ['Arduino', 'Sensors', 'Algorithms', 'C++'],
            icon: 'fa-square',
            hasCode: false,
            hasDemo: false
        },
        {
            title: 'IR Sensor People Counter',
            description: 'Automated people counting system using IR sensors for room occupancy monitoring.',
            tech: ['Arduino', 'IR Sensors', 'Display', 'C++'],
            icon: 'fa-users',
            hasCode: false,
            hasDemo: false
        }
    ];
    
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', (index % 4) * 100);
        
        let linksHTML = '';
        if (project.hasCode || project.hasDemo) {
            linksHTML = '<div class="card-links active">';
            if (project.hasCode) {
                linksHTML += '<a href="#" class="card-link"><i class="fab fa-github"></i> Code</a>';
            }
            if (project.hasDemo) {
                linksHTML += '<a href="#" class="card-link"><i class="fas fa-external-link-alt"></i> Demo</a>';
            }
            linksHTML += '</div>';
        } else {
            linksHTML = '<div class="card-links"></div>';
        }
        
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
                ${linksHTML}
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// ===== GALLERY WITH INFINITE SLIDESHOW =====
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    let galleryItems = [];
    let loadedCount = 0;
    let currentPage = 0;
    const itemsPerPage = window.innerWidth < 768 ? 2 : 4;
    
    let slideshowInterval = null;
    const slideshowDelay = 3000;
    
    const galleryContainer = document.querySelector('.gallery-container');
    
    let navContainer = document.querySelector('.gallery-navigation');
    if (!navContainer) {
        navContainer = document.createElement('div');
        navContainer.className = 'gallery-navigation';
        navContainer.innerHTML = `
            <button class="gallery-nav-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
            <div class="gallery-dots"></div>
            <button class="gallery-nav-btn next-btn"><i class="fas fa-chevron-right"></i></button>
        `;
        galleryContainer.appendChild(navContainer);
    }
    
    const prevBtn = navContainer.querySelector('.prev-btn');
    const nextBtn = navContainer.querySelector('.next-btn');
    const dotsContainer = navContainer.querySelector('.gallery-dots');
    
    dotsContainer.innerHTML = '';
    
    function startSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        slideshowInterval = setInterval(() => {
            const totalPages = Math.ceil(loadedCount / itemsPerPage);
            if (totalPages > 1) {
                const nextPage = (currentPage + 1) % totalPages;
                goToPage(nextPage);
            }
        }, slideshowDelay);
    }
    
    function stopSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
    }
    
    function loadImages() {
        let promises = [];
        const maxImages = 50;
        
        for (let i = 1; i <= maxImages; i++) {
            imageExtensions.forEach(ext => {
                const imagePath = `G_${i}.${ext}`;
                
                const promise = new Promise((resolve) => {
                    const img = new Image();
                    img.onload = function() {
                        resolve({
                            path: imagePath,
                            caption: `Event ${i}`,
                            exists: true
                        });
                    };
                    img.onerror = function() {
                        resolve({
                            path: imagePath,
                            exists: false
                        });
                    };
                    img.src = imagePath;
                });
                
                promises.push(promise);
            });
        }
        
        Promise.all(promises).then(results => {
            galleryItems = results.filter(item => item.exists);
            loadedCount = galleryItems.length;
            
            if (loadedCount === 0) {
                galleryGrid.innerHTML = `
                    <div class="no-gallery" style="grid-column: 1/-1; text-align: center; padding: 50px;">
                        <i class="fas fa-images" style="font-size: 3rem; color: var(--gray); margin-bottom: 20px;"></i>
                        <p style="color: var(--gray);">Gallery images will appear here. Add images with G_ prefix (e.g., G_1.jpg, G_2.jpg) to your folder.</p>
                    </div>
                `;
                navContainer.style.display = 'none';
            } else {
                navContainer.style.display = 'flex';
                
                const totalPages = Math.ceil(loadedCount / itemsPerPage);
                for (let i = 0; i < totalPages; i++) {
                    const dot = document.createElement('button');
                    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
                    dot.addEventListener('click', () => {
                        stopSlideshow();
                        goToPage(i);
                        startSlideshow();
                    });
                    dotsContainer.appendChild(dot);
                }
                
                goToPage(0);
                
                if (totalPages > 1) {
                    startSlideshow();
                }
                
                prevBtn.disabled = false;
                nextBtn.disabled = false;
            }
        });
    }
    
    function goToPage(pageIndex) {
        const totalPages = Math.ceil(loadedCount / itemsPerPage);
        
        if (pageIndex < 0) {
            pageIndex = totalPages - 1;
        } else if (pageIndex >= totalPages) {
            pageIndex = 0;
        }
        
        currentPage = pageIndex;
        const start = currentPage * itemsPerPage;
        const end = Math.min(start + itemsPerPage, loadedCount);
        const pageItems = galleryItems.slice(start, end);
        
        galleryGrid.innerHTML = '';
        
        pageItems.forEach((item, index) => {
            addGalleryItem(item.path, item.caption, index + (currentPage * itemsPerPage));
        });
        
        const dots = dotsContainer.querySelectorAll('.gallery-dot');
        dots.forEach((dot, index) => {
            if (index === currentPage) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        prevBtn.disabled = false;
        nextBtn.disabled = false;
        
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
    
    function addGalleryItem(imagePath, caption, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-aos', 'zoom-in');
        item.setAttribute('data-aos-delay', (index % 4) * 100);
        
        item.innerHTML = `
            <a href="${imagePath}" data-lightbox="engineering-gallery" data-title="${caption}">
                <img src="${imagePath}" alt="${caption}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </a>
        `;
        
        galleryGrid.appendChild(item);
    }
    
    prevBtn.addEventListener('click', () => {
        stopSlideshow();
        goToPage(currentPage - 1);
        startSlideshow();
    });
    
    nextBtn.addEventListener('click', () => {
        stopSlideshow();
        goToPage(currentPage + 1);
        startSlideshow();
    });
    
    galleryContainer.addEventListener('mouseenter', stopSlideshow);
    galleryContainer.addEventListener('mouseleave', () => {
        const totalPages = Math.ceil(loadedCount / itemsPerPage);
        if (totalPages > 1) {
            startSlideshow();
        }
    });
    
    loadImages();
}

// ===== HAMBURGER MENU =====
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuClose = document.querySelector('.menu-close');
    const body = document.body;
    
    if (!hamburger || !navMenu) return;
    
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
    }
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        if (navMenu.classList.contains('active')) {
            const blogLink = document.querySelector('.blog-link');
            if (blogLink) {
                blogLink.style.display = 'flex';
            }
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target) &&
            menuClose && !menuClose.contains(e.target)) {
            closeMenu();
        }
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
        document.body.style.overflow = '';
    });
}

// ===== HANDLE MOBILE RESIZE =====
function handleMobileResize() {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            document.body.style.overflow = '';
        }
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
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
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
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
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
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
                border-left: 4px solid #2A7B9B;
                border-radius: 5px;
                box-shadow: var(--shadow);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 9999;
                transform: translateX(120%);
                transition: transform 0.3s ease;
                color: var(--light);
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                border-left-color: #57C785;
            }
            .notification-error {
                border-left-color: #ef4444;
            }
            .notification-info {
                border-left-color: #2A7B9B;
            }
            .notification i {
                font-size: 1.2rem;
            }
            .notification-success i {
                color: #57C785;
            }
            .notification-error i {
                color: #ef4444;
            }
            .notification-info i {
                color: #2A7B9B;
            }
            
            body.light-theme .notification {
                background: var(--dark-light);
                border-left-color: #00C6FB;
            }
            body.light-theme .notification-info i {
                color: #00C6FB;
            }
            
            @media (max-width: 768px) {
                .notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    padding: 12px 20px;
                    font-size: 0.9rem;
                }
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
