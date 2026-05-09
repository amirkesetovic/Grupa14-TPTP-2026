// Skripta
// Trenutno upravlja light mode toggle ali planiram dodati accessibility koji trebamo
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

});
