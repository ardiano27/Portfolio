document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Persona Toggle Logic & Dynamic Text ---
    const personaToggle = document.getElementById('personaToggle');
    const mainHeroImage = document.getElementById('mainHeroImage');
    const blurBg = document.querySelector('.blur-bg');
    const devTools = document.querySelector('.dev-tools');
    const designTools = document.querySelector('.design-tools');
    
    // Target Container Text
    const dynamicTextContainer = document.getElementById('dynamicDescription');

    const developerImage = 'assets/images/develop.png';
    const designerImage = 'assets/images/graphic.png';

    // Text Content sesuai request
    const devText = `<p class="subtitle">I'm <span class="highlight">Full Stack Developer</span>, crafting robust digital solutions with clean code and logical thinking.</p>`;
    const desText = `<p class="subtitle">I'm <span class="highlight">Graphic Designer</span>, blending colors and shapes to tell compelling visual stories.</p>`;

    // Set state awal
    let isDeveloper = true;
    mainHeroImage.src = developerImage;
    blurBg.style.backgroundImage = `url('${developerImage}')`;

    personaToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to Designer
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

    // --- 2. Time & Location Logic ---
    function updateTime() {
        const timeDisplay = document.getElementById('liveTime');
        const now = new Date();
        // Format waktu: Jam:Menit (ex: 14:05)
        const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        timeDisplay.textContent = timeString;
    }
    setInterval(updateTime, 1000); // Update tiap detik
    updateTime(); // Run immediately

    // --- 3. Works Section Data & New Modal Layout ---
    
    // UPDATED DATA STRUCTURE (Added 'role' and 'certificate')
    const projectsData = [
        {
            id: 1,
            title: "Smart Trash-Bean",
            role: "Full Stack Developer", // Role Pill text
            category: "Web Development",
            description: "A comprehensive expense tracking platform built for startups to manage tight budgets. Features real-time dashboards, multi-user roles, and automated reporting capabilities. I was responsible for the entire backend architecture and frontend integration.",
            imageFull: "assets/works/winner.png", 
            certificate: "assets/sertificates/sertif.png", // Path sertifikat kamu
            githubLink: "https://github.com/ardiano27/Monitoring-TrashScan"
        },
        {
            id: 2,
            title: "Konekin Website",
            role: "Full Stack Developer", // Role Pill text
            category: "Frontend Tooling",
            description: "An intuitive drag-and-drop website builder designed for non-technical founders. My focus was on creating high-converting landing page components and ensuring accessibility compliance (WCAG 2.1).",
            imageFull: "assets/works/konekin2.png",
            certificate: null, // Kalau tidak ada sertifikat, set null
            githubLink: "https://github.com/ardiano27/Website-Konekin"
        }
    ];

    const workCards = document.querySelectorAll('.work-card');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBodyContent');
    const closeModal = document.querySelector('.close-modal');

    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.getAttribute('data-id'));
            const project = projectsData.find(p => p.id === projectId);

            if (project) {
                // Logic cek sertifikat: Tampilkan section sertifikat HANYA jika datanya ada
                const certHTML = project.certificate ? `
                    <div class="certificate-wrapper">
                        <h4>Contribution Certificate</h4>
                        <img src="${project.certificate}" class="certificate-img" alt="Certificate for ${project.title}">
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
                                <img src="${project.imageFull}" class="main-project-img" alt="${project.title} Screenshot">
                            </div>
                            ${certHTML}
                        </div>

                        <div class="text-center">
                            <a href="${project.githubLink}" target="_blank" class="btn-github">
                                <i class="fa-brands fa-github"></i> View Code on GitHub
                            </a>
                        </div>
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
        setTimeout(() => { modalBody.innerHTML = ''; }, 300);
    }

    closeModal.addEventListener('click', closeProjectModal);
    window.addEventListener('click', (e) => {
        if (e.target == modal) closeProjectModal();
    });
});