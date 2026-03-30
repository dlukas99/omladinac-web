<div align="center">

# NK Omladinac Čaglin

<img src="images/omladinac.jpg" alt="NK Omladinac Logo" width="180">

Službena web stranica nogometnog kluba **NK Omladinac Čaglin**.

[Posjeti stranicu](https://dlukas99.github.io/omladinac-web/)

</div>

---

### Ključne funkcionalnosti:
- **Automatizacija** — Ljestvica, rezultati i raspored sinkronizirani s HNS-om.
- **Momčad** — Dinamički pregled igrača, njihovih fotografija i statistike golova.
- **Interaktivnost** — Odbrojavanje do iduće utakmice, Google Maps integracija i kontakt.
- **Responzivnost** — Optimizirano za sve uređaje (mobiteli, tableti, računala).

---

### Tehnički uvid (Development):
Projekt je fokusiran na automatizaciju procesa koji se inače rade ručno:
1. **Data Workflow** — Razvijena je Python skripta (`osvjezi_podatke.py`) koja strukturira podatke s HNS Semafora u lokalni JSON, omogućujući ažurnost bez ručnog unosa.
2. **Frontend Arhitektura** — Sav UI je izgrađen koristeći **Vanilla JS i CSS**. To osigurava minimalno vrijeme učitavanja i visoke performanse bez dodatnih frameworka.
3. **Dynamic Rendering** — Logika na klijentskoj strani automatski računa ljestvicu, iduću utakmicu i sortira strijelce u realnom vremenu.

---

**Autor:** [Domagoj Lukas](https://github.com/dlukas99)

---
> [!NOTE]
> Podaci o ljestvici i rezultatima su vlasništvo Hrvatskog nogometnog saveza.
