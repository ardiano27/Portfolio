document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Persona Toggle Logic ---
    const personaToggle = document.getElementById('personaToggle');
    const mainHeroImage = document.getElementById('mainHeroImage');
    const blurBg = document.querySelector('.blur-bg');
    const devTools = document.querySelector('.dev-tools');
    const designTools = document.querySelector('.design-tools');

    // Path ke gambar personamu
    const developerImage = 'assets/images/formal.png'; // Ganti dengan path foto formal.jpg
    const designerImage = 'assets/images/graphic.png'; // Ganti dengan path foto himaaa.jpg

    // Set state awal (Developer)
    let isDeveloper = true;
    mainHeroImage.src = developerImage;
    blurBg.style.backgroundImage = `url('${developerImage}')`;

    personaToggle.addEventListener('change', function() {
        if (this.checked) {
            // Switch to Designer Persona
            isDeveloper = false;
            changePersona(designerImage, devTools, designTools);
        } else {
            // Switch back to Developer Persona
            isDeveloper = true;
            changePersona(developerImage, designTools, devTools);
        }
    });

    function changePersona(imagePath, toolsToHide, toolsToShow) {
        // Efek fade out sederhana sebelum ganti gambar
        mainHeroImage.style.opacity = 0;
        
        setTimeout(() => {
            mainHeroImage.src = imagePath;
            // Ubah juga gambar untuk efek blur background
            blurBg.style.backgroundImage = `url('${imagePath}')`;
            mainHeroImage.style.opacity = 1;

            // Toggle visibility tools
            toolsToHide.classList.remove('active');
            toolsToShow.classList.add('active');
        }, 300); // Sesuaikan dengan durasi transisi CSS
    }


    // --- 2. Works Section Data & Modal Logic ---
    
    // Data Proyek (Simulasi Database) - GANTI ISINYA DENGAN PROYEKMU
    const projectsData = [
        {
            id: 1,
            title: "FinFlow System",
            category: "Full Stack Development",
            description: "A comprehensive expense tracking platform built for startups to manage tight budgets. Features real-time dashboards, multi-user roles, and automated reporting capabilities. Built with MERN Stack.",
            imageFull: "assets/works/work1-full.jpg", // Gambar dokumentasi lengkap
            githubLink: "https://github.com/username/finflow-repo"
        },
        {
            id: 2,
            title: "LaunchPad Builder",
            category: "UI/UX & Frontend",
            description: "An intuitive drag-and-drop website builder designed for non-technical founders. Focused on creating high-converting landing pages with pre-built accessible components. Built using React and Tailwind CSS.",
            imageFull: "assets/works/work2-full.jpg", // Gambar dokumentasi lengkap
            githubLink: "https://github.com/username/launchpad-repo"
        }
        // Tambahkan data proyek lainnya di sini sesuai dengan jumlah card di HTML
    ];

    const workCards = document.querySelectorAll('.work-card');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBodyContent');
    const closeModal = document.querySelector('.close-modal');

    // Fungsi membuka modal
    workCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = parseInt(card.getAttribute('data-id'));
            const project = projectsData.find(p => p.id === projectId);

            if (project) {
                // Isi konten modal
                modalBody.innerHTML = `
                    <div class="modal-project-details">
                        <h2>${project.title}</h2>
                        <p class="modal-meta">${project.category}</p>
                        <img src="${project.imageFull}" alt="${project.title} Documentation">
                        <p>${project.description}</p>
                        <a href="${project.githubLink}" target="_blank" class="btn-github">
                            <i class="fa-brands fa-github"></i> View on GitHub
                        </a>
                    </div>
                `;
                // Tampilkan modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Stop scroll body di belakang
            }
        });
    });

    // Fungsi menutup modal
    function closeProjectModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Kembalikan scroll body
        setTimeout(() => {
             modalBody.innerHTML = ''; // Bersihkan konten setelah animasi selesai
        }, 300);
    }

    closeModal.addEventListener('click', closeProjectModal);

    // Tutup modal jika klik di luar konten (di overlay gelap)
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeProjectModal();
        }
    });
});