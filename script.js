/**
 * Processwallah — Dynamic Interface Interactions
 * Optimized for performance, ease of expansion, and high UX standard.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE NAVIGATION TOGGLE
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('#mainNav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            
            // Toggle hamburger layout
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = mainNav.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            bars[1].style.opacity = mainNav.classList.contains('active') ? '0' : '1';
            bars[2].style.transform = mainNav.classList.contains('active') ? 'rotate(-45deg) translate(3px, -4px)' : 'none';
        });

        // Close mobile menu on link navigation
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const bars = mobileToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 2. STICKY HEADER SCROLL EFFECT
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
        }
    });

    // 3. SYSTEM PORTFOLIO MODAL DATA STORAGE & LOGIC
    const systemData = {
        'bom': {
            title: 'BOM Automation System',
            category: 'Google Workspace Architecture',
            problem: 'Manual calculation of complex structures was leading to costing errors and purchase order delay issues.',
            solution: 'Created a cascading multi-tier calculation platform using Google Sheets backed by clean script logic. The system references real-time component costings and warns engineers when current assembly exceeds margin limits.',
            outcomes: [
                'Reduced design-to-production estimation window by 80%',
                'Achieved raw material estimation variance beneath 1.5%',
                'Seamless workflow handoff directly to internal store buyers'
            ]
        },
        'work-order': {
            title: 'Work Order Management System',
            category: 'Web Application & APIs',
            problem: 'Floor managers had poor visibility of job queue distribution and order completion dates.',
            solution: 'Developed a robust tracking system configured specifically for assembly bays. Built simple forms so floor workers can report status without entering structural databases directly.',
            outcomes: [
                'Increased machinery operational duty cycle by 18%',
                'Minimized manual follow-up queries between office and workshop floor',
                'Integrated alert mechanics for immediate machinery breakdown flags'
            ]
        },
        'production': {
            title: 'Production Planning Dashboard',
            category: 'Performance Analytics',
            problem: 'Production schedules were adjusted on gut feeling without measuring actual resource load.',
            solution: 'Aggregated raw material levels, orders pipeline, and manpower availability into a visual operational planning interface.',
            outcomes: [
                'Enhanced sequence accuracy across production runs',
                'Enabled instant scheduling updates according to component shortages',
                'Eliminated bottleneck accumulations on standard machinery units'
            ]
        },
        'inspection': {
            title: 'Inspection Analytics Dashboard',
            category: 'Statistical Quality Control',
            problem: 'QC statistics were filed in paper formats, making high-level trend spotting impossible.',
            solution: 'Built an analytical layout showing structural product failures and vendor components issues immediately on receiving lines.',
            outcomes: [
                'Decreased repetitive manufacturing defect rates by 32%',
                'Created clear performance rating criteria for external parts suppliers',
                'Direct compliance report generation with executive standards'
            ]
        },
        'task': {
            title: 'Task Management System',
            category: 'Team Management Tool',
            problem: 'Critical floor maintenance and tool cleaning routines were missed between shifting squads.',
            solution: 'Structured a clear system highlighting essential tasks due, complete, and flagged for technical management attention.',
            outcomes: [
                'Established clear accountability markers across multiple work shifts',
                'Avoided major machine failure incidents due to standardized schedule checks',
                'Optimized handoff cycles between supervisor shifts'
            ]
        },
        'portal': {
            title: 'Client Portal',
            category: 'Interface Application',
            problem: 'Administrative employees spent hours daily updating clients about assembly phases.',
            solution: 'Built a light, secure external web page referencing active shop data directly. Clients can trace tracking codes securely.',
            outcomes: [
                'Cut customer service email burdens by roughly 65%',
                'Gained outstanding reviews regarding operational clarity',
                'Accelerated dispatch confirmation signatures'
            ]
        }
    };

    const modal = document.getElementById('detailsModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('modalCloseBtn');
    const cards = document.querySelectorAll('.system-card');

    const openModal = (id) => {
        const data = systemData[id];
        if (!data) return;

        modalContent.innerHTML = `
            <span class="modal-tech">${data.category}</span>
            <h3>${data.title}</h3>
            
            <h4>The Problem</h4>
            <p>${data.problem}</p>
            
            <h4>The Solution</h4>
            <p>${data.solution}</p>
            
            <h4>Key Outcomes</h4>
            <ul>
                ${data.outcomes.map(item => `<li>${item}</li>`).join('')}
            </ul>
        `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Unlock background scroll
    };

    cards.forEach(card => {
        const btn = card.querySelector('.view-details-btn');
        const id = card.getAttribute('data-system-id');
        if (btn) {
            btn.addEventListener('click', () => openModal(id));
        }
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal on background overlay click
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 4. PORTFOLIO GALLERY CATEGORY FILTERING
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Reset active button class
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});