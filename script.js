document.addEventListener("DOMContentLoaded", function() {
    
    // --- Gestion de l'accordéon (inchangé) ---
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // --- NOUVEAU : Gestion de l'ombre du header au scroll ---
    const header = document.querySelector(".main-header");
    window.addEventListener("scroll", function() {
        // Si on a scrollé de plus de 50 pixels vers le bas
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Si l'élément est dans le champ de vision
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // Optionnel : si tu veux que l'animation se répète chaque fois
            // entry.target.classList.remove('visible');
        }
    });
});

// Sélectionne tous les éléments avec la classe 'hidden'
const hiddenElements = document.querySelectorAll('.hidden');
// Demande à l'observateur de surveiller chaque élément
hiddenElements.forEach((el) => observer.observe(el));

const backToTopButton = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) { // Le bouton apparaît après 300px de scroll
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
});

const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.main-nav a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Retire la classe 'active' de tous les liens
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Ajoute la classe 'active' au lien correspondant
            // entry.target.id correspond à l'id de la section ('about', 'projects'...)
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.main-nav a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, { rootMargin: '-50% 0px -50% 0px' }); // L'élément est considéré "actif" quand il est au milieu de l'écran

sections.forEach(section => navObserver.observe(section));