document.addEventListener('DOMContentLoaded', () => {

    // 1. Loader Animation
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1500);

    // 2. Sticky Navbar & Mobile Menu
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const countUpElements = document.querySelectorAll('.stat-number[data-target]');
    let hasCounted = false;

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger Count Up kada statistikca postane vidljiva
                if (entry.target.classList.contains('about-stats') || entry.target.closest('.about-stats')) {
                    if (!hasCounted) {
                        startCountUp();
                        hasCounted = true;
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    if (document.querySelector('.about-stats')) {
        observer.observe(document.querySelector('.about-stats'));
    }

    // 4. Count Up Animation
    function startCountUp() {
        countUpElements.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'));
            const duration = 2000; // ms
            const step = Math.max(1, Math.floor(target / (duration / 16)));
            let current = 0;

            const updateCount = () => {
                current += step;
                if (current < target) {
                    el.innerText = current;
                    requestAnimationFrame(updateCount);
                } else {
                    el.innerText = target + (el.getAttribute('data-target') == '120' ? '+' : '');
                }
            };
            updateCount();
        });
    }

    // 5. Roster Momčadi (Stvarni podaci sa Semafora)
    const teamGrid = document.getElementById('team-grid');

    const players = [
        // --- VRATARI ---
        { id: 1, name: "Ivan Vidmar", position: "Vratar", category: "golmani", number: 1 },
        { id: 2, name: "Igor Bošnjak", position: "Vratar", category: "golmani", number: 8 },
        { id: 3, name: "Igor Matoković", position: "Vratar", category: "golmani", number: 12 },
        { id: 4, name: "Željko Vidmar", position: "Vratar", category: "golmani", number: 16 },

        // --- BRANIČI ---
        { id: 5, name: "Marijan Baričević", position: "Branič", category: "obranbeni", number: 2 },
        { id: 6, name: "Ivan Blagojević", position: "Branič", category: "obranbeni", number: 4, photo: 'ivan-blagojevic.jpg' },
        { id: 7, name: "Dalibor Bardač", position: "Branič", category: "obranbeni", number: 5 },
        { id: 8, name: "Filip Bobinac", position: "Branič", category: "obranbeni", number: 6 },
        { id: 9, name: "Marko Njerš", position: "Branič", category: "obranbeni", number: 7 },
        { id: 10, name: "Ivica Pavić", position: "Branič", category: "obranbeni", number: 10 },
        { id: 11, name: "Nikola Majić", position: "Branič", category: "obranbeni", number: 13 },
        { id: 12, name: "Marko Ninić", position: "Branič", category: "obranbeni", number: 14 },
        { id: 13, name: "Leon Krpan", position: "Branič", category: "obranbeni", number: 16 },

        // --- VEZNJACI ---
        { id: 14, name: "Ivan Abramović", position: "Vezni", category: "vezni", number: 7 },
        { id: 15, name: "Alen Jelčić", position: "Vezni", category: "vezni", number: 7 },
        { id: 16, name: "Antonio Miličević", position: "Vezni", category: "vezni", number: 7 },
        { id: 17, name: "Matej Kukić", position: "Vezni", category: "vezni", number: 9 },
        { id: 18, name: "Antonio Arbanas", position: "Vezni", category: "vezni", number: 11 },
        { id: 19, name: "Josip Knežević", position: "Vezni", category: "vezni", number: 13 },
        { id: 20, name: "Borna Botički", position: "Vezni", category: "vezni", number: 14 },
        { id: 21, name: "Zvonko Radman", position: "Vezni", category: "vezni", number: 14 },
        { id: 22, name: "Željko Metlar", position: "Vezni", category: "vezni", number: 17 },
        { id: 23, name: "Robert Radivojević", position: "Vezni", category: "vezni", number: 17 },

        // --- NAPADAČI ---
        { id: 24, name: "Kristijan Lovrić", position: "Napadač", category: "napadaci", number: 23 },
        { id: 25, name: "Josip Obradović", position: "Napadač", category: "napadaci", number: 2 },
        { id: 26, name: "Mateo Krpan", position: "Napadač", category: "napadaci", number: 3, photo: 'mateo-krpan.jpg' },
        { id: 27, name: "Dominik Ribičić", position: "Napadač", category: "napadaci", number: 3 },
        { id: 28, name: "Dejan Šestak", position: "Napadač", category: "napadaci", number: 6 },
        { id: 29, name: "Gabrijel Klobučar", position: "Napadač", category: "napadaci", number: 14 },
        { id: 30, name: "Marko Ivčetić", position: "Napadač", category: "napadaci", number: 16 },
        { id: 31, name: "Leo Jug", position: "Napadač", category: "napadaci", number: 20 }
    ];

    // --- OVU FUNKCIJU ZAMIJENI U SVOJEM SCRIPT.JS ---

    function renderPlayers(filterCategory = 'all') {
        if (!teamGrid) return;
        teamGrid.innerHTML = '';

        const filtered = filterCategory === 'all'
            ? players
            : players.filter(p => p.category === filterCategory);

        filtered.forEach((player, index) => {
            const delay = (index % 4) * 0.1;

            // Definiraj putanju do slike. Ako igrač nema sliku, koristi placeholder.
            const photoPath = player.photo ? `images/igraci/${player.photo}` : 'images/omladinac.jpg';

            const html = `
            <div class="player-card scroll-animate visible" style="transition-delay: ${delay}s">
                <div class="player-photo">
                    <img src="${photoPath}" alt="${player.name}" class="player-img">
                    <div class="player-number">${player.number}</div>
                </div>
                <div class="player-info">
                    <h3 class="player-name">${player.name}</h3>
                    <div class="player-position">${player.position}</div>
                </div>
            </div>
        `;
            teamGrid.insertAdjacentHTML('beforeend', html);
        });
    }
    // Inicijalizacija igrača pri učitavanju
    renderPlayers();

    // 6. Filtriranje Momčadi
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderPlayers(filter);
        });
    });

    // 7. Generiranje Galerije i Lightbox
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        for (let i = 1; i <= 8; i++) {
            const html = `
                <div class="gallery-item scroll-animate" style="transition-delay: ${(i % 4) * 0.1}s">
                    <svg viewBox="0 0 100 100" width="50" height="50" fill="none" stroke="var(--col-text-muted)" stroke-width="2">
                        <rect x="10" y="20" width="80" height="60" rx="5" />
                        <circle cx="35" cy="45" r="10" />
                        <path d="M10 80 L50 40 L90 80" />
                    </svg>
                    <div class="gallery-overlay">
                        <svg class="zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            <line x1="11" y1="8" x2="11" y2="14"></line>
                            <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                    </div>
                </div>
            `;
            galleryGrid.insertAdjacentHTML('beforeend', html);
        }
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 8. Contact Form Prevent Default
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Šalje se...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerText = 'Poslano! Hvala vam.';
                btn.style.backgroundColor = '#2ecc71';
                btn.style.color = 'white';
                btn.style.opacity = '1';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 3000);
            }, 1000);
        });
    }

    // 9. Countdown Timer — Sljedeća utakmica (29.03.2026.)
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');

    if (cdDays && cdHours && cdMins && cdSecs) {
        const matchDate = new Date('2026-03-29T16:00:00+01:00');

        function updateCountdown() {
            const now = new Date();
            const diff = matchDate - now;

            if (diff <= 0) {
                cdDays.textContent = '0';
                cdHours.textContent = '0';
                cdMins.textContent = '0';
                cdSecs.textContent = '0';
                document.querySelector('.next-match-label').textContent = 'Utakmica je počela!';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            cdDays.textContent = days;
            cdHours.textContent = String(hours).padStart(2, '0');
            cdMins.textContent = String(mins).padStart(2, '0');
            cdSecs.textContent = String(secs).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});