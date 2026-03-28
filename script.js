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
                    el.innerText = target + (el.getAttribute('data-target') == '30' ? '+' : '');
                }
            };
            updateCount();
        });
    }

    // 5. Roster Momčadi (Stvarni podaci sa Semafora)
    const teamGrid = document.getElementById('team-grid');

    const players = [
        // --- VRATARI ---
        { id: 1, name: "Ivan Vidmar", position: "Vratar", category: "golmani", number: 1, photo: 'ivan-vidmar.jpg' },
        { id: 2, name: "Igor Bošnjak", position: "Vratar", category: "strijelci", number: 8, photo: 'igor-bosnjak.jpg', goals: 2 },
        { id: 3, name: "Igor Matoković", position: "Vratar", category: "golmani", number: 12, photo: 'igor-matokovic.jpg' },
        { id: 4, name: "Željko Vidmar", position: "Vratar", category: "golmani", number: 16, photo: 'zeljko-vidmar.jpg' },

        // --- BRANIČI ---
        { id: 5, name: "Marijan Baričević", position: "Branič", category: "obranbeni", number: 2, photo: 'marijan-baricevic.jpg' },
        { id: 6, name: "Ivan Blagojević", position: "Branič", category: "strijelci", number: 4, photo: 'ivan-blagojevic.jpg', goals: 4 },
        { id: 7, name: "Dalibor Bardač", position: "Branič", category: "strijelci", number: 5, photo: 'dalibor-bardac.jpg', goals: 1 },
        { id: 8, name: "Filip Bobinac", position: "Branič", category: "strijelci", number: 6, photo: 'filip-bobinac.jpg', goals: 1 },
        { id: 9, name: "Marko Njerš", position: "Branič", category: "obranbeni", number: 7, photo: 'marko-njers.jpg' },
        { id: 10, name: "Ivica Pavić", position: "Branič", category: "obranbeni", number: 10, photo: 'ivica-pavic.jpg' },
        { id: 11, name: "Nikola Majić", position: "Branič", category: "obranbeni", number: 13, photo: 'nikola-majic.jpg' },
        { id: 12, name: "Marko Ninić", position: "Branič", category: "obranbeni", number: 14, photo: 'marko-ninic.jpg' },

        // --- VEZNJACI ---
        { id: 14, name: "Ivan Abramović", position: "Vezni", category: "vezni", number: 7, photo: 'ivan-abramovic.jpg' },
        { id: 16, name: "Antonio Miličević", position: "Vezni", category: "strijelci", number: 7, photo: 'antonio-milicevic.jpg', goals: 4 },
        { id: 17, name: "Matej Kukić", position: "Vezni", category: "strijelci", number: 9, photo: 'matej-kukic.jpg', goals: 3 },
        { id: 18, name: "Antonio Arbanas", position: "Vezni", category: "vezni", number: 11, photo: 'antonio-arbanas.jpg' },
        { id: 19, name: "Josip Knežević", position: "Vezni", category: "vezni", number: 13, photo: 'josip-knezevic.jpg' },
        { id: 20, name: "Borna Botički", position: "Vezni", category: "vezni", number: 14, photo: 'borna-boticki.jpg' },
        { id: 22, name: "Željko Metlar", position: "Vezni", category: "strijelci", number: 17, photo: 'zeljko-metlar.jpg', goals: 1 },
        { id: 23, name: "Robert Radivojević", position: "Vezni", category: "vezni", number: 17, photo: 'robert-radivojevic.jpg' },

        // --- NAPADAČI ---
        { id: 24, name: "Kristijan Lovrić", position: "Napadač", category: "strijelci", number: 23, photo: 'kristijan-lovric.jpg', goals: 1 },
        { id: 25, name: "Josip Obradović", position: "Napadač", category: "napadaci", number: 2, photo: 'josip-obradovic.jpg' },
        { id: 26, name: "Mateo Krpan", position: "Napadač", category: "napadaci", number: 3, photo: 'mateo-krpan.jpg' },
        { id: 27, name: "Dominik Ribičić", position: "Napadač", category: "napadaci", number: 3, photo: 'dominik-ribicic.jpg' },
        { id: 28, name: "Dejan Šestak", position: "Napadač", category: "napadaci", number: 6, photo: 'dejan-sestak.jpg' },
        { id: 29, name: "Gabrijel Klobučar", position: "Napadač", category: "napadaci", number: 14, photo: 'gabrijel-klobucar.jpg' },
        { id: 30, name: "Marko Ivčetić", position: "Napadač", category: "napadaci", number: 16, photo: 'marko-ivcetic.jpg' },
        { id: 31, name: "Leo Jug", position: "Napadač", category: "napadaci", number: 20, photo: 'leo-jug.jpg' }
    ];

    // --- OVU FUNKCIJU ZAMIJENI U SVOJEM SCRIPT.JS ---

    function renderPlayers(filterCategory = 'all') {
        if (!teamGrid) return;
        teamGrid.innerHTML = '';

        const filtered = filterCategory === 'all'
            ? players
            : players.filter(p => p.category === filterCategory);

        // Helper za deklinaciju riječi "gol"
        const getGolLabel = (count) => {
            if (count % 10 === 1 && count % 100 !== 11) return "Gol";
            if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "Gola";
            return "Golova";
        };

        filtered.forEach((player, index) => {
            const delay = (index % 4) * 0.1;

            // Definiraj putanju do slike
            const photoPath = player.photo ? `images/igraci/${player.photo}` : 'images/omladinac.jpg';

            const goalsHtml = player.goals ? `
                <div class="player-goals-badge">
                    <span class="goals-count">${player.goals}</span>
                    <span class="goals-label">${getGolLabel(player.goals)}</span>
                </div>
            ` : '';

            const html = `
            <div class="player-card scroll-animate visible" style="transition-delay: ${delay}s">
                <div class="player-photo">
                    <img src="${photoPath}" alt="${player.name}" class="player-img">
                    <div class="player-number">${player.number}</div>
                    ${goalsHtml}
                </div>
                <div class="player-info">
                    <h3 class="player-name">${player.name}</h3>
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

    // 7. (Galerija uklonjena)

    // 8. (Forma se sada šalje direktno preko FormSubmit.co servisa)

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