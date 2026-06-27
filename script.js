// =========================================
// MENU MOVIL
// =========================================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

// =========================================
// CERRAR MENU AL HACER CLICK
// =========================================

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});

// =========================================
// HEADER SCROLL
// =========================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

// =========================================
// REVEAL ANIMATION
// =========================================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    reveals.forEach(element => {

        const windowHeight = window.innerHeight;

        const revealTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

// =========================================
// SCROLL SUAVE
// =========================================

const smoothScrollLinks =
    document.querySelectorAll('a[href^="#"]');

function easeInOutQuad(t, b, c, d) {

    t /= d / 2;

    if (t < 1) return c / 2 * t * t + b;

    t--;

    return -c / 2 * (t * (t - 2) - 1) + b;

}

function smoothScrollTo(target) {

    const header = document.querySelector(".header");

    const headerOffset = header
        ? header.offsetHeight + 10
        : 90;

    const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;

    const startPosition = window.pageYOffset;

    const distance = targetPosition - startPosition;

    const duration = 700;

    let startTime = null;

    function animation(currentTime) {

        if (startTime === null) startTime = currentTime;

        const timeElapsed = currentTime - startTime;

        const nextScroll = easeInOutQuad(
            timeElapsed,
            startPosition,
            distance,
            duration
        );

        window.scrollTo(0, nextScroll);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }

    }

    requestAnimationFrame(animation);

}

smoothScrollLinks.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (!href || href === "#") return;

        const target =
            document.querySelector(href);

        if (!target) return;

        e.preventDefault();

        smoothScrollTo(target);

    });

});

// =========================================
// ANIMACION HERO
// =========================================

window.addEventListener("load", () => {

    const heroText =
        document.querySelector(".hero-text");

    const heroImage =
        document.querySelector(".hero-image");

    if (heroText) {

        heroText.style.opacity = "0";
        heroText.style.transform =
            "translateY(40px)";

        setTimeout(() => {

            heroText.style.transition =
                "all 1s ease";

            heroText.style.opacity = "1";

            heroText.style.transform =
                "translateY(0)";

        }, 200);

    }

    if (heroImage) {

        heroImage.style.opacity = "0";

        heroImage.style.transform =
            "translateY(40px)";

        setTimeout(() => {

            heroImage.style.transition =
                "all 1s ease";

            heroImage.style.opacity = "1";

            heroImage.style.transform =
                "translateY(0)";

        }, 500);

    }

});

/*=========================================
PROYECTOS
=========================================*/

const projects = [

    {
        title: "Patitas Felices",
        image: "imgs/proyecto2.jpeg",
        description: "Patitas Felices es una fundación dedicada a rescatar y proteger animales en situación de abandono. Nuestro sitio web fue desarrollado para dar visibilidad a nuestra labor y conectar a animales rescatados con personas dispuestas a brindarles el hogar que merecen, ya sea a través de la adopción, el voluntariado o las donaciones.",
        tech: [
            "HTML",
            "CSS",
            
        ],
        github: "https://github.com/dv1563927-star/Patitas-Felices"
    },

    {
        title: "Rutas Seguras Kids",
        image: "imgs/proyecto3.jpeg",
        description: "Rutas Seguras Kids es una aplicación frontend desarrollada con JavaScript Vanilla, HTML y CSS que gestiona de forma dinámica la logística de rutas escolares y estudiantes. Destaca por el uso de Web Components nativos, manipulación avanzada del DOM y el consumo asíncrono de APIs externas para mostrar alertas climáticas en tiempo real, todo construido sin frameworks para garantizar un código limpio y eficiente.",
        tech: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        github: "https://github.com/Santiagomita-26/Proyecto-JavaScript"
    },

    {
        title: "Herramientas fix",
        image: "imgs/proyecto1.jpeg",
        description: "Un pequeño programa que se encarga de llevar el control de prestamos en una comunidad existiendo un perfi de usuario tanto como de administrador para llevar todos los registros , llevando una permanencia de datos en archivos .json emulando una base de datos .",
        tech: [
            "Python",
            
        ],
        github: "https://github.com/Santiagomita-26/Proyecto-Python"
    }

];

let currentProject = 0;


/*=========================================
ELEMENTOS
=========================================*/

const leftCard = document.querySelector(".project-card.left");
const centerCard = document.querySelector(".project-card.center");
const rightCard = document.querySelector(".project-card.right");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");


/*=========================================
LLENAR TARJETA LATERAL
=========================================*/

function fillSideCard(card, project){

    card.querySelector("img").src = project.image;
    card.querySelector("img").alt = project.title;

    card.querySelector("h3").textContent = project.title;

}


/*=========================================
LLENAR TARJETA PRINCIPAL
=========================================*/

function fillCenterCard(project){

    centerCard.querySelector("img").src = project.image;
    centerCard.querySelector("img").alt = project.title;

    centerCard.querySelector("h3").textContent = project.title;

    centerCard.querySelector("p").textContent = project.description;

    const techContainer = centerCard.querySelector(".project-tech");

    techContainer.innerHTML = "";

    project.tech.forEach(tech=>{

        const span = document.createElement("span");

        span.textContent = tech;

        techContainer.appendChild(span);

    });

    centerCard
        .querySelector(".project-actions a")
        .href = project.github;

}


/*=========================================
RENDER
=========================================*/

function renderProjects(){

    const leftIndex =
        (currentProject - 1 + projects.length) % projects.length;

    const rightIndex =
        (currentProject + 1) % projects.length;

    fillSideCard(
        leftCard,
        projects[leftIndex]
    );

    fillCenterCard(
        projects[currentProject]
    );

    fillSideCard(
        rightCard,
        projects[rightIndex]
    );

}


/*=========================================
BOTONES
=========================================*/

function transitionProjects() {

    const carouselTrack = document.querySelector(".carousel-track");

    carouselTrack.style.opacity = "0";

    carouselTrack.style.transition = "opacity .3s ease";

    setTimeout(() => {

        renderProjects();

        carouselTrack.style.opacity = "1";

    }, 150);

}

nextBtn.addEventListener("click",()=>{

    currentProject++;

    if(currentProject >= projects.length){

        currentProject = 0;

    }

    transitionProjects();

});



prevBtn.addEventListener("click",()=>{

    currentProject--;

    if(currentProject < 0){

        currentProject = projects.length - 1;

    }

    transitionProjects();

});


/*=========================================
INICIO
=========================================*/

renderProjects();
