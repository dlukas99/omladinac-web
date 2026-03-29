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

    // 5. Roster Momčadi
    function renderPlayers(filterCategory = 'all') {
        if (!teamGrid) return;
        teamGrid.innerHTML = '';

        let filtered = filterCategory === 'all'
            ? [...players]
            : players.filter(p => p.category === filterCategory);

        if (filterCategory === 'strijelci') {
            filtered.sort((a, b) => (b.goals || 0) - (a.goals || 0));
        }

        const getGolLabel = (count) => {
            if (count % 10 === 1 && count % 100 !== 11) return "Gol";
            if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return "Gola";
            return "Golova";
        };

        filtered.forEach((player, index) => {
            const delay = (index % 4) * 0.1;
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

    // Inicijalno iscrtavanje (prazno dok JSON ne dođe, ili s hardkodiranim)
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

    // 11. Dinamičko učitavanje podataka s HNS Semafora
    async function loadClubData() {
        try {
            const response = await fetch('podaci.json');
            if (!response.ok) throw new Error('Podaci nisu dostupni');
            const data = await response.json();

            // A. Ljestvica
            const tableBody = document.getElementById('league-table-body');
            if (tableBody && data.ljestvica) {
                tableBody.innerHTML = '';
                data.ljestvica.forEach(row => {
                    const isOmladinac = row.klub.includes('Omladinac');
                    const tr = document.createElement('tr');
                    if (isOmladinac) tr.className = 'highlight-row';
                    tr.innerHTML = `
                        <td>${row.pozicija}</td>
                        <td>${isOmladinac ? '<b>' + row.klub + '</b>' : row.klub}</td>
                        <td>${row.utakmice}</td>
                        <td>${row.bodovi}</td>
                    `;
                    tableBody.appendChild(tr);
                });
            }

            // B. Zadnji Rezultati
            const resultsContainer = document.getElementById('results-container');
            if (resultsContainer && data.zadnji_rezultati) {
                resultsContainer.innerHTML = '';
                // Uzmi zadnjih 5
                data.zadnji_rezultati.slice(0, 5).forEach(res => {
                    const scoreArr = res.rezultat.split(':').map(s => parseInt(s.trim()));
                    const isHome = res.domacin.includes('Omladinac');
                    const omladinacScore = isHome ? scoreArr[0] : scoreArr[1];
                    const opponentScore = isHome ? scoreArr[1] : scoreArr[0];
                    
                    let resultType = 'draw';
                    if (omladinacScore > opponentScore) resultType = 'win';
                    else if (omladinacScore < opponentScore) resultType = 'loss';

                    const card = `
                        <div class="match-card result-${resultType}">
                            <div class="match-date">${res.datum} | ${res.kolo}</div>
                            <div class="match-teams">
                                <span class="team">${res.domacin}</span>
                                <span class="score ${resultType}-score">${res.rezultat}</span>
                                <span class="team text-right">${res.gost}</span>
                            </div>
                        </div>
                    `;
                    resultsContainer.insertAdjacentHTML('beforeend', card);
                });
            }

            // C. Raspored (Timeline)
            const timeline = document.getElementById('upcoming-timeline');
            if (timeline && data.raspored) {
                timeline.innerHTML = '';
                data.raspored.forEach((match, index) => {
                    const isHome = match.domacin.includes('Omladinac');
                    
                    const item = `
                    <div class="timeline-item">
                        <div class="timeline-dot"></div>
                        <div class="timeline-content">
                            <div class="match-time">${match.kolo} — ${match.datum} — ${match.vrijeme}</div>
                            <div class="match-teams-title">
                                <div class="timeline-team">
                                    <img src="" alt="" class="timeline-crest" data-club="${match.domacin}">
                                    <span>${match.domacin}</span>
                                </div>
                                <span class="vs">vs</span>
                                <div class="timeline-team">
                                    <img src="" alt="" class="timeline-crest" data-club="${match.gost}">
                                    <span>${match.gost}</span>
                                </div>
                            </div>
                            <div class="match-location">${isHome ? '📍 Stadion Tribalj Čaglin' : '📍 Gostovanje'}</div>
                            <span class="match-tag tag-${isHome ? 'home' : 'away'}">${isHome ? 'Domaća' : 'Gostujuća'}</span>
                        </div>
                    </div>
                    `;
                    timeline.insertAdjacentHTML('beforeend', item);
                });

                // D. Sljedeća utakmica (Prva iz rasporeda)
                if (data.raspored.length > 0) {
                    const next = data.raspored[0];
                    updateNextMatchCard(next);
                }
            }

            // E. Ažuriranje golova igrača iz HNS podataka
            if (data.igraci && players) {
                data.igraci.forEach(hnsPlayer => {
                    const localPlayer = players.find(p => hnsPlayer.ime.toLowerCase().includes(p.name.split(' ').pop().toLowerCase()));
                    if (localPlayer) {
                        localPlayer.goals = hnsPlayer.golovi;
                    }
                });
                renderPlayers(); // Ponovno iscrtaj s novim golovima
            }

            // Ponovno inicijaliziraj grbove za dinamički dodane elemente
            initOpponentCrests();

        } catch (error) {
            console.error('Greška pri učitavanju JSON-a:', error);
        }
    }

    function updateNextMatchCard(match) {
        const card = document.getElementById('next-match-card');
        if (!card) return;

        const isHome = match.domacin.includes('Omladinac');
        
        // Ažuriraj labelu kola
        card.querySelector('.next-match-label').textContent = `Sljedeća Utakmica — ${match.kolo}`;
        
        // Ažuriraj timove
        const teamsContainer = card.querySelector('.next-match-teams');
        teamsContainer.innerHTML = `
            <div class="next-match-team">
                <img src="" alt="" class="next-match-crest" data-club="${match.domacin}">
                <span>${match.domacin}</span>
            </div>
            <div class="next-match-vs">VS</div>
            <div class="next-match-team">
                <img src="" alt="" class="next-match-crest" data-club="${match.gost}">
                <span>${match.gost}</span>
            </div>
        `;

        // Ažuriraj info
        card.querySelector('.next-match-datetime').textContent = `📅 ${match.datum} — ${match.vrijeme}`;
        card.querySelector('.next-match-venue').textContent = isHome ? '📍 Stadion Tribalj Čaglin' : '📍 Gostovanje';
        
        const tag = card.querySelector('.match-tag');
        tag.className = `match-tag tag-${isHome ? 'home' : 'away'}`;
        tag.textContent = isHome ? 'Domaća' : 'Gostujuća';

        // Pokreni countdown
        const dateParts = match.datum.split('.');
        if (dateParts.length >= 3) {
            const day = dateParts[0].trim();
            const month = dateParts[1].trim();
            const year = dateParts[2].trim();
            const timeParts = match.vrijeme.split(':');
            const h = timeParts[0] || "16";
            const m = timeParts[1] || "00";
            
            const matchDateTime = new Date(`${year}-${month}-${day}T${h}:${m}:00`);
            startCountdown(matchDateTime);
        }
    }

    function startCountdown(matchDate) {
        const cdDays = document.getElementById('cd-days');
        const cdHours = document.getElementById('cd-hours');
        const cdMins = document.getElementById('cd-mins');
        const cdSecs = document.getElementById('cd-secs');

        function update() {
            const now = new Date();
            const diff = matchDate - now;

            if (diff <= 0) {
                if(cdDays) cdDays.textContent = '0';
                if(cdHours) cdHours.textContent = '00';
                if(cdMins) cdMins.textContent = '00';
                if(cdSecs) cdSecs.textContent = '00';
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            if(cdDays) cdDays.textContent = d;
            if(cdHours) cdHours.textContent = String(h).padStart(2, '0');
            if(cdMins) cdMins.textContent = String(m).padStart(2, '0');
            if(cdSecs) cdSecs.textContent = String(s).padStart(2, '0');
        }

        update();
        if (window.countdownInterval) clearInterval(window.countdownInterval);
        window.countdownInterval = setInterval(update, 1000);
    }

    // Pozovi učitavanje podataka
    loadClubData();

    // 10. Automatizacija grbova protivnika
    function initOpponentCrests() {
        const clubMap = {
            "NK Eminovci": "eminovci",
            "NK Graničar Bučje": "bucje",
            "NK Dinamo Badljevina": "badljevina",
            "NK Slavonija Prekopakra": "prekopakra",
            "NK Sulkovci": "sulkovci",
            "NK Parasan": "parasan",
            "HNK Dobrovac Dobrovac": "dobrovac",
            "HNK Dobrovac": "dobrovac",
            "NK BSK Biškupci": "biskupci",
            "NK Croatia Donja Obrijež": "obrijez",
            "NK Croatia D. Obrijež": "obrijez",
            "NK Ovčare": "ovcare",
            "NK Omladinac Čaglin": "omladinac",
            "NK Jovača Marina Selo": "jovaca"
        };

        const crestImages = document.querySelectorAll('img[data-club]');

        crestImages.forEach(img => {
            const clubName = img.getAttribute('data-club');
            if (!clubName) return;

            // Pronađi ključ u mapi (možda treba cleaning)
            let clubSlug = 'omladinac';
            if (clubMap[clubName]) {
                clubSlug = clubMap[clubName];
            } else {
                // Probaj naći partial match
                for (const key in clubMap) {
                    if (clubName.includes(key) || key.includes(clubName)) {
                        clubSlug = clubMap[key];
                        break;
                    }
                }
            }
            
            img.src = `images/grbovi/${clubSlug}.jpg`;
            img.alt = clubName;

            img.onerror = () => {
                img.src = 'images/omladinac.jpg';
                img.onerror = null;
            };
        });
    }
});