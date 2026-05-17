// Dokumentacija AI alata izvršena. Sve ostalo je naučeno kroz 
// tutoriale, W3Schools, i puno situacija gdje stvari nisu funkcionisale.

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

            // Regularni izraz (RegEx) za osnovnu validaciju email adrese.
            //
            // U kosim crtama / / se stavlja izraz.
            // ^ označava početak stringa.
            // Kada je unutar uglastih zagrada [ ] i ^ na početku, to znači "ne sadrži".
            // [^\s@]+ znači "jedan ili više karaktera koji nisu razmak ili @"
            // @ je doslovni znak @.
            // \. je doslovna tačka (mora se escape-ovati sa \ jer tačka inače znači "bilo koji znak").
            // $ označava kraj stringa.

            // Dakle, ovaj RegEx nam govori da tražimo string koji počinje sa jednim ili više karaktera
            // koji nisu razmak ili @, zatim slijedi @, zatim opet jedan ili više karaktera koji nisu razmak
            // ili @, zatim tačka, i na kraju opet jedan ili više karaktera koji nisu razmak ili @.

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

        // SAKRIJ GLAVNI SADRŽAJ

        if (heroSlider) heroSlider.style.display = "none";

        if (filmGrid) filmGrid.style.display = "none";

        // PRIKAŽI SEKCIJU RECENZIJA

        if (recenzije) recenzije.classList.remove("hidden");

        // SAKRIJ SVE RECENZIJE

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

        if (heroSlider) heroSlider.style.display = "block";

        if (filmGrid) filmGrid.style.display = "grid";

        if (recenzije) recenzije.classList.add("hidden");

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

// ZATVARANJE MENIJA KLIKOM IZVAN NJEGA

document.addEventListener("click", (e) => {

    if (accessibilityBtn && accessibilityPanel) {

        const klikNaDugme =
            accessibilityBtn.contains(e.target);

        const klikUnutarPanela =
            accessibilityPanel.contains(e.target);

        if (
            !klikNaDugme &&
            !klikUnutarPanela
        ) {

            accessibilityPanel.classList.add("hidden");

        }
    }

});

// FONT SIZE

if (fontSlider) {

    // učitaj spremljenu vrijednost

    const savedFontSize =
        localStorage.getItem("fontSize");

    if (savedFontSize) {

        document.documentElement.style.fontSize =
            `${savedFontSize}px`;

        fontSlider.value = savedFontSize;

        if (fontValue) {
            fontValue.textContent =
                `${savedFontSize}px`;
        }

    }

    fontSlider.addEventListener("input", () => {

        const size = fontSlider.value;

        document.documentElement.style.fontSize =
            `${size}px`;

        if (fontValue) {
            fontValue.textContent =
                `${size}px`;
        }

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

const image = document.getElementById("kino-mapa");

const areas = document.querySelectorAll("area");

const svg = document.querySelector(".map-highlight");

const ORIGINAL_WIDTH = 530;
const ORIGINAL_HEIGHT = 340;

// Ovaj segment vecinom je potpomogao ChatGPT. Funkcija resizeMapAreas se poziva prilikom
// učitavanja stranice i prilikom promjene veličine prozora. Računa trenutne dimenzije slike
// i scale faktore, te prolazi kroz svaki area element i skalira njegove koordinate u skladu
// sa trenutnom veličinom slike. Za krugove se koristi poseban način skaliranja kako bi se očuvao
// njihov oblik. Nakon skaliranja, nove koordinate se postavljaju nazad u area elemente.

function resizeMapAreas() {

    if (!image) return;

    // Trenutna širina prikazane slike u browseru.
    const currentWidth = image.clientWidth;

    // Trenutna visina prikazane slike u browseru.
    const currentHeight = image.clientHeight;

    // Horizontalni scale faktor.
    // Npr. ako je original 530px,
    // a trenutno prikazana širina 265px,
    // scaleX će biti 0.5.
    const scaleX = currentWidth / ORIGINAL_WIDTH;

    // Vertikalni scale faktor.
    const scaleY = currentHeight / ORIGINAL_HEIGHT;


    // Prolazi kroz svaki <area> element.
    areas.forEach(area => {

        // Uzima originalne koordinate iz data-original atributa.
        // Primjer:
        // "100,50,200,150"
        //
        // split(",")
        // pretvara string u niz:
        // ["100", "50", "200", "150"]
        //
        // map(Number)
        // pretvara stringove u brojeve:
        // [100, 50, 200, 150]
        if (!area.dataset.original) return;

        const originalCoords = area
            .dataset.original
            .split(",")
            .map(Number);

        // Uzima shape atribut area elementa.
        // To može biti:
        // "poly"
        // "circle"
        // itd.
        const shape = area.shape;

        // Prazan niz u koji ćemo spremiti
        // nove skalirane koordinate.
        let scaledCoords = [];


        // Provjerava da li je shape krug.
        if (shape === "circle") {

            // Kreira nove skalirane koordinate za circle.
            scaledCoords = [

                // Skalira X koordinatu centra kruga.
                Math.round(originalCoords[0] * scaleX),

                // Skalira Y koordinatu centra kruga.
                Math.round(originalCoords[1] * scaleY),

                // Skalira radius kruga.
                //
                // Koristi se Math.min(scaleX, scaleY)
                // kako krug ne bi postao oval.
                Math.round(
                    originalCoords[2] *
                    Math.min(scaleX, scaleY)
                )
            ];

        } else {

            // Ako nije circle,
            // pretpostavlja se da je polygon.

            // Petlja ide kroz koordinate po 2 elementa:
            // x, y
            //
            // i += 2 znači:
            // 0 -> 2 -> 4 -> 6 ...
            for (let i = 0; i < originalCoords.length; i += 2) {

                // Skalira X koordinatu.
                scaledCoords.push(
                    Math.round(originalCoords[i] * scaleX)
                );

                // Skalira Y koordinatu.
                scaledCoords.push(
                    Math.round(originalCoords[i + 1] * scaleY)
                );
            }
        }

        // Pretvara niz koordinata nazad u string:
        // [100, 50, 200, 150]
        //
        // postaje:
        // "100,50,200,150"
        //
        // i postavlja ga kao nove coords.
        area.coords = scaledCoords.join(",");
    });
}



// Funkcija koja crta highlight preko SVG-a.
function drawHighlight(area) {

    if (!svg) return;

    // Briše prethodni highlight iz SVG-a.
    svg.innerHTML = "";

    // Uzima trenutne coords iz area elementa.
    //
    // area.coords je string:
    // "100,50,200,150"
    //
    // split i map pretvaraju ga u niz brojeva.
    const coords = area.coords
        .split(",")
        .map(Number);

    // Uzima tip shape-a.
    const shape = area.shape;



    // Ako je polygon.
    if (shape === "poly") {

        // Prazan string za SVG points atribut.
        let points = "";

        // Prolazi kroz koordinate po parovima.
        for (let i = 0; i < coords.length; i += 2) {

            // Dodaje tačku u format:
            // "x,y"
            //
            // Primjer:
            // "100,50 200,150 300,250"
            points +=
                `${coords[i]},${coords[i + 1]} `;
        }

        // Ubacuje polygon element u SVG.
        //
        // points atribut definiše oblik poligona.
        svg.innerHTML = `
            <polygon points="${points}" />
        `;
    }



    // Ako je shape circle.
    if (shape === "circle") {

        // Ubacuje SVG circle element.
        svg.innerHTML = `
            <circle
                cx="${coords[0]}"
                cy="${coords[1]}"
                r="${coords[2]}"
            />
        `;
    }
}



// Prolazi kroz sve area elemente.
areas.forEach(area => {

    // Kada miš uđe u area zonu.
    area.addEventListener("mouseenter", () => {

        // Crta highlight za taj area element.
        drawHighlight(area);
    });

    // Kada miš napusti area zonu.
    area.addEventListener("mouseleave", () => {

        // Briše highlight.
        if (svg) svg.innerHTML = "";
    });

});



// Kada se stranica potpuno učita.
window.addEventListener("load", resizeMapAreas);



// Kada se prozor promijeni veličina.
window.addEventListener("resize", () => {

    // Ponovno scale-a sve coords.
    resizeMapAreas();

    // Briše trenutni highlight
    // da ne ostane pogrešno pozicioniran.
    if (svg) svg.innerHTML = "";

});

    // SMOOTH SCROLL
    // Ovaj blok koda generisao je Gemini AI.

    // Selektujemo linkove iz sidebara i dugme "Nazad na vrh"
    const brzaNavigacijaLinkovi = document.querySelectorAll(".lijevi-sidebar ul li a[href^='#'], a[href='#vrh']");

    brzaNavigacijaLinkovi.forEach(link => { // Dodajemo event listener za klik na svaki link
        link.addEventListener("click", (e) => { // Kada se klikne na link
            // Sprečavamo instant skok pretraživača
            e.preventDefault();

            // Uzimamo id sekcije (npr. "#tabela")
            const ciljaniId = link.getAttribute("href");
            
            if (ciljaniId === "#") return; // Ako je href samo "#", ne radimo ništa

            const ciljanaSekcija = document.querySelector(ciljaniId);

            if (ciljanaSekcija) { // Ako sekcija postoji, proračunavamo poziciju do koje treba skrolovati
                const visinaHeadera = 80; 
                const pozicijaSekcije = ciljanaSekcija.getBoundingClientRect().top + window.scrollY;
                const konacnaPozicija = pozicijaSekcije - visinaHeadera - 10; 

                // Glatko skrolovanje do proračunate pozicije
                window.scrollTo({
                    top: konacnaPozicija,
                    behavior: "smooth"
                });
            }
        });
    });

    // COUNTDOWN
    // Blok koda prekopiran iz tutoriala i modifikovan sa Gemini AI-jem.


    const tajmerElement = document.getElementById("countdown-tadc");

    if (tajmerElement) {
        // Godina, Mjesec (pazi: 5 je Juni, jer brojanje kreće od 0=Januar), Dan, Sati, Minuti
        const datumPremijere = new Date(2026, 5, 4, 0, 0, 0).getTime();

        function ažurirajTajmer() { // Ova funkcija se poziva odmah i svakih 1000ms (1 sekund) da ažurira prikaz tajmera.
            const sada = new Date().getTime(); // Trenutno vrijeme u milisekundama.
            const razlika = datumPremijere - sada; // Koliko vremena je ostalo do premijere.

            if (razlika <= 0) { // Ako je vrijeme prošlo ili je sada, prikazujemo poruku da je film stigao u kina.
                tajmerElement.innerHTML = "STIGLO U KINA!";
                tajmerElement.style.color = "var(--primary)";
                return true; 
            }

            // Računamo koliko je dana, sati, minuta i sekundi ostalo.
            const dani = Math.floor(razlika / (1000 * 60 * 60 * 24));
            const sati = Math.floor((razlika % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minuti = Math.floor((razlika % (1000 * 60 * 60)) / (1000 * 60));
            const sekunde = Math.floor((razlika % (1000 * 60)) / 1000);

            const prikazDana = dani > 0 ? `${dani}d ` : "";
            const prikazSati = sati < 10 ? `0${sati}` : sati;
            const prikazMinuta = minuti < 10 ? `0${minuti}` : minuti;
            const prikazSekundi = sekunde < 10 ? `0${sekunde}` : sekunde;

            // Ažuriramo HTML element sa formatom "Xd XXh XXm XXs".
            tajmerElement.innerHTML = `${prikazDana}${prikazSati}h ${prikazMinuta}m ${prikazSekundi}s`;
            return false;
        }

        // Prvo odmah pozivamo funkciju da prikaže početno stanje tajmera.
        const done = ažurirajTajmer();

        // Ako tajmer još nije gotov, postavljamo interval da se funkcija poziva svakih 1000ms (1 sekund) kako bi se tajmer ažurirao.
        if (!done) {
            const intervalTajmera = setInterval(() => {
                const kraj = ažurirajTajmer();
                if (kraj) {
                    clearInterval(intervalTajmera);
                }
            }, 1000);
        }
    }

});
