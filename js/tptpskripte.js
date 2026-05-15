// Skripta
// Trenutno upravlja light mode toggle i slider, potrebno dodati accessibility features i optimizaciju za mobilne uređaje
// :3
// -Kesetovic

document.addEventListener("DOMContentLoaded", () => {

    const modeToggle = document.getElementById("mode-toggle");

    // Load saved theme
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");

        if (modeToggle) {
            modeToggle.checked = true;
        }
    }

    // Toggle light mode i sacuvati u local
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
    // =====================================
    // HERO SLIDER
    // =====================================

    const slides = document.querySelector(".slides");
    const slide = document.querySelectorAll(".slide");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const dotsContainer = document.querySelector(".dots");

    let currentIndex = 0;

    if (slides && slide.length > 0) {

        // Kreiranje tačkica
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
});
