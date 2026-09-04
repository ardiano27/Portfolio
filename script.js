document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Persona Toggle Logic & Dynamic Text ---
    const personaToggle = document.getElementById('personaToggle');
    const mainHeroImage = document.getElementById('mainHeroImage');
    const blurBg = document.querySelector('.blur-bg');
    const devTools = document.querySelector('.dev-tools');
    const designTools = document.querySelector('.design-tools');
    
    // Target Container Text
    const dynamicTextContainer = document.getElementById('dynamicDescription');

    const developerImage = 'assets/images/develop.webp';
    const designerImage = 'assets/images/graphic.webp';

    // Text Content sesuai request
    const devText = `<p class="subtitle">I'm <span class="highlight">Full Stack Developer</span>, crafting robust digital solutions with clean code and logical thinking.</p>`;
    const desText = `<p class="subtitle">I'm <span class="highlight">Data Analyst</span>, turning raw data into clear insights and decision-ready stories.</p>`;

    // Set state awal
    let isDeveloper = true;
    mainHeroImage.src = developerImage;
    blurBg.style.backgroundImage = `url('${developerImage}')`;

    personaToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to Analyst
            isDeveloper = false;
            changePersona(designerImage, devTools, designTools, desText);
        } else {
            // Switch to Developer
            isDeveloper = true;
            changePersona(developerImage, designTools, devTools, devText);
        }
    });

    function changePersona(imagePath, toolsToHide, toolsToShow, newTextHTML) {
        // 1. Fade out Image & Text
        mainHeroImage.style.opacity = 0;
        dynamicTextContainer.classList.add('fade-out');
        
        // 2. Wait transition
        setTimeout(() => {
            // Swap Image
            mainHeroImage.src = imagePath;
            blurBg.style.backgroundImage = `url('${imagePath}')`;
            
            // Swap Text
            dynamicTextContainer.innerHTML = newTextHTML;
            
            // Fade In Image & Text
            mainHeroImage.style.opacity = 1;
            dynamicTextContainer.classList.remove('fade-out');

            // Swap Tools
            toolsToHide.classList.remove('active');
            toolsToShow.classList.add('active');
        }, 300);
    }

    // --- 2. Time & Location Logic  ---
    function updateTime() {
        const timeDisplay = document.getElementById('liveTime');
        const now = new Date();
        
        // Format waktu: Jam:Menit AM/PM
        // Menggunakan 'en-US' agar format defaultnya 12-hour (AM/PM)
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        
        timeDisplay.textContent = timeString;
    }
    setInterval(updateTime, 1000); 
    updateTime();

    // --- 3. Works Section Data & New Modal Layout ---
    
    const projectsData = [
        {
            id: 1,
            title: "Smart Trash-Bean",
            role: "Full Stack Developer", // Role Pill text
            category: "Web Development",
            description: "Website for monitoring smart trash bins with IoT sensors, designed to help track organic and inorganic waste conditions through a clean real-time interface.",
            imageFull: "assets/works/winner.webp", 
            certificate: "assets/sertificates/sertif.webp", // Path sertifikat kamu
            githubLink: "https://github.com/ardiano27/Monitoring-TrashScan",
            modalTheme: "modal-theme-green"
        },
        {
            id: 2,
            title: "Konekin Website",
            role: "Full Stack Developer", // Role Pill text
            category: "Frontend Tooling",
            description: "A professional platform that connects creative workers and UMKM, built with a focused interface for showcasing services, profiles, and collaboration opportunities.",
            imageFull: "assets/works/konekin2.webp",
            certificate: null, // Kalau tidak ada sertifikat, set null
            githubLink: "https://github.com/ardiano27/Website-Konekin",
            modalTheme: "modal-theme-blue"
        },
        {
            id: 3,
            title: "PlantMoji Smart Farm",
            role: "AI, IoT & Gamification",
            category: "Smart Farming",
            description: "Turning smart farming into an interactive learning experience through AI, IoT, and gamification.",
            imageFull: "assets/images/PlantMoji.png",
            certificate: "assets/sertificates/1stPlace-images-0.jpg",
            githubLink: null,
            projectLink: "https://number-one-web.vercel.app/",
            modalTheme: "modal-theme-orange"
        }
    ];

    const workCards = document.querySelectorAll('.work-card[data-id]');
    const modal = document.getElementById('projectModal');
    const modalContent = document.querySelector('.modal-content');
    const modalBody = document.getElementById('modalBodyContent');
    const closeModal = document.querySelector('.close-modal');
    const modalThemeClasses = ['modal-theme-green', 'modal-theme-blue', 'modal-theme-orange'];
    let modalClearTimer;

    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.getAttribute('data-id'));
            const project = projectsData.find(p => p.id === projectId);

            if (project) {
                if (modalClearTimer) {
                    clearTimeout(modalClearTimer);
                    modalClearTimer = null;
                }
                modalContent.classList.remove(...modalThemeClasses);
                modalContent.classList.add(project.modalTheme);

                // Logic cek sertifikat: Tampilkan section sertifikat HANYA jika datanya ada
                const certHTML = project.certificate ? `
                    <div class="certificate-wrapper">
                        <h4>Contribution Certificate</h4>
                        <img src="${project.certificate}" class="certificate-img" alt="Certificate for ${project.title}" decoding="async">
                    </div>
                ` : '';

                const githubHTML = project.githubLink ? `
                    <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="btn-github">
                        <i class="fa-brands fa-github"></i> View Code on GitHub
                    </a>
                ` : '';

                const projectLinkHTML = project.projectLink ? `
                    <a href="${project.projectLink}" target="_blank" rel="noopener noreferrer" class="btn-github btn-project-link">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> View Documentation
                    </a>
                ` : '';

                const actionsHTML = githubHTML || projectLinkHTML ? `
                    <div class="project-actions">
                        ${githubHTML}
                        ${projectLinkHTML}
                    </div>
                ` : '';

                // New Modal Layout (TalentBridge Inspired)
                modalBody.innerHTML = `
                    <div class="modal-project-details">
                        <h2>${project.title}</h2>
                        <span class="role-pill">${project.role}</span>
                        
                        <p class="modal-description-text">${project.description}</p>

                        <div class="project-gallery" style="${!project.certificate ? 'grid-template-columns: 1fr;' : ''}">
                            <div class="project-main-view">
                                <img src="${project.imageFull}" class="main-project-img" alt="${project.title} Screenshot" decoding="async">
                            </div>
                            ${certHTML}
                        </div>

                        ${actionsHTML}
                    </div>
                `;
                
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeProjectModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        if (modalClearTimer) clearTimeout(modalClearTimer);
        modalClearTimer = setTimeout(() => {
            modalBody.innerHTML = '';
            modalContent.classList.remove(...modalThemeClasses);
            modalClearTimer = null;
        }, 300);
    }

    closeModal.addEventListener('click', closeProjectModal);
    window.addEventListener('click', (e) => {
        if (e.target == modal) closeProjectModal();
    });
// --- 4. Sneak Peek Image Viewer Logic ---
    const viewerModal = document.getElementById('imageViewer');
    const viewerImg = document.getElementById("img01");
    const peekImages = document.querySelectorAll('.peek-img');
    const closeViewer = document.querySelector('.close-viewer');

    // Tambahkan event click ke setiap gambar di marquee
    peekImages.forEach(img => {
        img.addEventListener('click', function() {
            viewerModal.style.display = "flex"; // Gunakan flex biar center vertikal
            viewerModal.style.alignItems = "center";
            viewerModal.style.justifyContent = "center";
            viewerImg.src = this.src; // Ambil source gambar yang diklik
        });
    });

    // Tutup Viewer
    closeViewer.onclick = function() { 
        viewerModal.style.display = "none"; 
    }

    // Tutup jika klik area kosong (overlay)
    viewerModal.onclick = function(e) {
        if(e.target === viewerModal) {
            viewerModal.style.display = "none";
        }
    }

    // ANIMATION ENGINE — Scroll Reveal, Parallax, Progress Bar
    // --- Scroll Progress Bar ---
    const progressBar = document.getElementById('scroll-progress');
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
    }

    // --- Sticky Nav ---
    const navEl = document.querySelector('nav');
    function updateNav() {
        navEl.classList.toggle('scrolled', window.scrollY > 60);
    }

    // --- Scroll Reveal with IntersectionObserver ---
    const revealEls = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    // --- Stagger groups: [data-stagger] children ---
    const staggerGroups = document.querySelectorAll('[data-stagger]');
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                Array.from(entry.target.children).forEach(child => {
                    child.classList.add('is-visible');
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    staggerGroups.forEach(group => staggerObserver.observe(group));

    // --- Smooth Scroll for nav links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = navEl.classList.contains('scrolled') ? navEl.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // --- Parallax on Hero elements ---
    const heroImgContainer = document.querySelector('.hero-image-container');
    const blurBgEl = document.querySelector('.blur-bg');
    const floatingEls = document.querySelectorAll('.floating-elements');

    function applyParallax() {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight * 1.5) {
            if (heroImgContainer) heroImgContainer.style.transform = `translateY(${scrollY * 0.12}px)`;
            if (blurBgEl) blurBgEl.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.07}px))`;
            floatingEls.forEach(el => {
                el.style.transform = `translateY(${scrollY * 0.18}px)`;
            });
        }
    }

    // --- Sneak peek scale on scroll enter ---
    const peekSection = document.querySelector('.sneak-peek-section');
    function applyPeekScale() {
        if (!peekSection) return;
        const rect = peekSection.getBoundingClientRect();
        const viewH = window.innerHeight;
        if (rect.top < viewH && rect.bottom > 0) {
            const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));
            peekSection.style.transform = `scale(${0.96 + progress * 0.04})`;
        }
    }

    // --- Unified rAF scroll handler ---
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateNav();
                applyParallax();
                applyPeekScale();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial call
    updateNav();
    updateScrollProgress();

});
