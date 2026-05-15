// Skripta
// Trenutno upravlja light mode toggle i slider, potrebno dodati accessibility features i optimizaciju za mobilne uređaje
// :3
// -Kesetovic

// Zapoceta dokumentacija AI koda (potrebno dodati za validation form)

document.addEventListener("DOMContentLoaded", () => {  

    const modeToggle = document.getElementById("mode-toggle");

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");

        if (modeToggle) { // ChatGPT: Provjera da li element postoji prije nego što se pokuša 
                          // pristupiti njegovim svojstvima
            modeToggle.checked = true;
        }
    }

    // Sljedeći blok dodaje ChatGPT. Dodajemo detekciju promjene stanja toggle-a, te provjeravamo da li je
    // uključena svijetla tema. Ako jeste, dodajemo klasu "light-mode" na body element i spremamo odabranu
    // temu u localStorage.
    
    if (modeToggle) {

        modeToggle.addEventListener("change", () => {

            if (modeToggle.checked) {
                document.body.classList.add("light-mode");
                localStorage.setItem("theme", "light");
            } 
            else {
                document.body.classList.remove("light-mode");
                localStorage.setItem("theme", "dark");
            }


        });

    }

    const slides = document.querySelector(".slides");
    const slide = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    let currentIndex = 0;

    if (slides && slide.length > 0) {

        // Sintaksa funkcije naučena od ChatGPT-a.
        // Pozivom funkcije prvo pomjeramo slider uz pomoć slides.style.transform gdje
        // `translateX(-${currentIndex * 100}%)` znači da se slider pomjera ulijevo za 100%
        // širine po svakom indeksu. Zatim uklanjamo klasu "active" sa svih tačaka i
        // dodajemo je samo onoj koja odgovara trenutnom indeksu.

        
        function updateSlider() {

            slides.style.transform =
                `translateX(-${currentIndex * 100}%)`;

            dots.forEach(dot =>
                dot.classList.remove("active")
            );

            dots[currentIndex].classList.add("active");

        }

        // Sljedeći blok je napravljen pomoću ChatGPT-a. Za svaku sliku u slideru stvara tačku (dot)
        // ispod slidera, i dodaje event listener koji omogućava korisniku da klikom na tačku promijeni sliku.
        
        slide.forEach((_, index) => {

            const dot = document.createElement("div");
            dot.classList.add("dot");

            if (index === 0) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {

                currentIndex = index;
                updateSlider();

            });

            dotsContainer.appendChild(dot);

        });

        const dots = document.querySelectorAll(".dot");

        nextBtn.addEventListener("click", () => {

            currentIndex++;

            if (currentIndex >= slide.length) {
                currentIndex = 0;
            }

            updateSlider();

        });

        prevBtn.addEventListener("click", () => {

            currentIndex--;

            if (currentIndex < 0) {
                currentIndex = slide.length - 1;
            }

            updateSlider();

        });

        // Auto slide
        setInterval(() => {

            currentIndex++;

            if (currentIndex >= slide.length) {
                currentIndex = 0;
            }

            updateSlider();

        }, 5000);

    }
    const filterLinkovi = document.querySelectorAll("[data-filter]");
    const filmKartice = document.querySelectorAll(".film-kartica");

    let aktivniFilter = null;

    filterLinkovi.forEach(link => {

        link.addEventListener("click", (e) => {

            e.preventDefault();

            const kategorija = link.dataset.filter;

            // RESET FILTERA
            if (
                aktivniFilter === kategorija ||
                kategorija === "sve"
            ) {

                aktivniFilter = null;

                // ukloni aktivne klase
                filterLinkovi.forEach(l => {
                    l.classList.remove("aktivan-filter");
                });

                // prikazi sve filmove
                filmKartice.forEach(film => {
                    film.style.display = "flex";
                });

                return;
            }

            // ukloni prethodno aktivne filtere
            filterLinkovi.forEach(l => {
                l.classList.remove("aktivan-filter");
            });

            // dodaj aktivnu klasu samo ako nije "sve"
            if (kategorija !== "sve") {
                link.classList.add("aktivan-filter");
            }

            aktivniFilter = kategorija;

            // filtriranje filmova
            filmKartice.forEach(film => {

                const kategorije = film.dataset.kategorija.split(" ");

                if (kategorije.includes(kategorija)) {
                    film.style.display = "flex";
                } else {
                    film.style.display = "none";
                }

            });

        });

    });

// VALIDACIJA FORME

const forma = document.querySelector("#kontakt-forma");

if (forma) {

    const ime = document.querySelector("#ime");
    const prezime = document.querySelector("#prezime");
    const email = document.querySelector("#email");
    const telefon = document.querySelector("#telefon");
    const tema = document.querySelector("#tema");
    const poruka = document.querySelector("#poruka");

    const imeGreska = document.querySelector("#ime-greska");
    const prezimeGreska = document.querySelector("#prezime-greska");
    const emailGreska = document.querySelector("#email-greska");
    const telefonGreska = document.querySelector("#telefon-greska");
    const temaGreska = document.querySelector("#tema-greska");
    const porukaGreska = document.querySelector("#poruka-greska");

    const uspjesnaPoruka =
        document.querySelector("#uspjesna-poruka");

    forma.addEventListener("submit", (e) => {

        e.preventDefault();

        // RESET GREŠAKA

        imeGreska.textContent = "";
        prezimeGreska.textContent = "";
        emailGreska.textContent = "";
        telefonGreska.textContent = "";
        temaGreska.textContent = "";
        porukaGreska.textContent = "";
        uspjesnaPoruka.textContent = "";

        let validnaForma = true;

        // IME

        if (ime.value.trim() === "") {

            imeGreska.textContent =
                "Ime je obavezno.";

            validnaForma = false;

        }

        if (prezime.value.trim() === "") {

            prezimeGreska.textContent =
                "Prezime je obavezno.";

            validnaForma = false;

        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.value.trim() === "") {

            emailGreska.textContent =
                "Email je obavezan.";

            validnaForma = false;

        }
        else if (
            !emailRegex.test(email.value.trim())
        ) {

            emailGreska.textContent =
                "Unesite ispravan email.";

            validnaForma = false;

        }

        const telefonRegex =
            /^[0-9+\s-]+$/;

        if (telefon.value.trim() === "") {

            telefonGreska.textContent =
                "Telefon je obavezan.";

            validnaForma = false;

        }
        else if (
            !telefonRegex.test(telefon.value.trim())
        ) {

            telefonGreska.textContent =
                "Telefon nije validan.";

            validnaForma = false;

        }

        if (tema.value === "") {

            temaGreska.textContent =
                "Odaberite temu.";

            validnaForma = false;

        }

        if (poruka.value.trim() === "") {

            porukaGreska.textContent =
                "Poruka je obavezna.";

            validnaForma = false;

        }
        else if (
            poruka.value.trim().length < 10
        ) {

            porukaGreska.textContent =
                "Poruka mora imati barem 10 karaktera.";

            validnaForma = false;

        }

        if (validnaForma) {

            uspjesnaPoruka.textContent =
                "Forma uspješno poslana!";

            forma.reset();

        }

    });

}
    // =====================================
// RECENZIJE FILMOVA
// =====================================

const detaljiDugmad =
    document.querySelectorAll(".detalji-btn[data-film]");

const heroSlider =
    document.querySelector(".hero-slider");

const filmGrid =
    document.querySelector(".sadrzaj-filmova");

const recenzije =
    document.querySelector("#recenzije");

const sveRecenzije =
    document.querySelectorAll(".film-recenzija");

const nazadDugmad =
    document.querySelectorAll(".nazad-btn");

// OTVARANJE RECENZIJE

detaljiDugmad.forEach(dugme => {

    dugme.addEventListener("click", (e) => {

        e.preventDefault();

        const film =
            dugme.dataset.film;

        // SAKRI GLAVNI SADRŽAJ

        heroSlider.style.display = "none";

        filmGrid.style.display = "none";

        // PRIKAŽI SEKCIJU RECENZIJA

        recenzije.classList.remove("hidden");

        // SAKRI SVE RECENZIJE

        sveRecenzije.forEach(recenzija => {

            recenzija.classList.add("hidden");

        });

        // PRIKAŽI ODGOVARAJUĆU

        const aktivnaRecenzija =
            document.querySelector(
                `[data-recenzija="${film}"]`
            );

        if (aktivnaRecenzija) {

            aktivnaRecenzija.classList.remove("hidden");

        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

// POVRATAK

nazadDugmad.forEach(dugme => {

    dugme.addEventListener("click", () => {

        heroSlider.style.display = "block";

        filmGrid.style.display = "grid";

        recenzije.classList.add("hidden");

    });

});

// =====================================
// ACCESSIBILITY PANEL
// =====================================

const accessibilityBtn =
    document.querySelector("#accessibility");

const accessibilityPanel =
    document.querySelector("#accessibility-panel");

const fontSlider =
    document.querySelector("#font-size-slider");

const fontValue =
    document.querySelector("#font-size-value");

const contrastBtn =
    document.querySelector("#toggle-contrast");

const animationsBtn =
    document.querySelector("#toggle-animations");

// OTVARANJE MENIJA

if (accessibilityBtn && accessibilityPanel) {

    accessibilityBtn.addEventListener("click", (e) => {

        e.preventDefault();

        accessibilityPanel.classList.toggle("hidden");

    });

}

// FONT SIZE

if (fontSlider) {

    // učitaj spremljenu vrijednost

    const savedFontSize =
        localStorage.getItem("fontSize");

    if (savedFontSize) {

        document.documentElement.style.fontSize =
            `${savedFontSize}px`;

        fontSlider.value = savedFontSize;

        fontValue.textContent =
            `${savedFontSize}px`;

    }

    fontSlider.addEventListener("input", () => {

        const size = fontSlider.value;

        document.documentElement.style.fontSize =
            `${size}px`;

        fontValue.textContent =
            `${size}px`;

        localStorage.setItem("fontSize", size);

    });

}

// REDUCED MOTION

if (animationsBtn) {

    if (localStorage.getItem("motion") === "off") {

        document.body.classList.add("reduce-motion");

    }

    animationsBtn.addEventListener("click", () => {

        document.body.classList.toggle("reduce-motion");

        const reduced =
            document.body.classList.contains("reduce-motion");

        localStorage.setItem(
            "motion",
            reduced ? "off" : "on"
        );

    });

}

});
