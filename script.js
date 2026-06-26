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

// =========================================
// EFECTO PARALLAX SUAVE HERO
// =========================================

const heroCard =
    document.querySelector(".hero-card");

window.addEventListener("mousemove", (e) => {

    if (!heroCard) return;

    const x =
        (window.innerWidth / 2 - e.clientX) / 40;

    const y =
        (window.innerHeight / 2 - e.clientY) / 40;

    heroCard.style.transform =
        `rotateY(${x}deg) rotateX(${-y}deg)`;

});

// =========================================
// RESETEAR PARALLAX
// =========================================

window.addEventListener("mouseleave", () => {

    if (!heroCard) return;

    heroCard.style.transform =
        "rotateY(0deg) rotateX(0deg)";

});


/*=========================================
PROYECTOS
=========================================*/

const projects = [

    {
        title: "Patitas Felices",
        image: "imgs/patitas.png",
        description: "Plataforma desarrollada para facilitar la adopción de animales rescatados mediante un sistema intuitivo de publicaciones y administración. El proyecto incluye autenticación, panel administrativo, gestión de mascotas y un diseño completamente responsive pensado para mejorar la experiencia del usuario.",
        tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python",
            "SQLite"
        ],
        github: "#"
    },

    {
        title: "Rutas Seguras Kids",
        image: "imgs/rutas.png",
        description: "Aplicación web orientada a optimizar la logística del transporte escolar mediante la planificación dinámica de rutas y seguimiento de estudiantes.",
        tech: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        github: "#"
    },

    {
        title: "CampusVerse",
        image: "imgs/campusverse.png",
        description: "Landing Page desarrollada para presentar una experiencia tecnológica moderna con un diseño atractivo y completamente responsive.",
        tech: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        github: "#"
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

nextBtn.addEventListener("click",()=>{

    currentProject++;

    if(currentProject >= projects.length){

        currentProject = 0;

    }

    renderProjects();

});



prevBtn.addEventListener("click",()=>{

    currentProject--;

    if(currentProject < 0){

        currentProject = projects.length - 1;

    }

    renderProjects();

});


/*=========================================
INICIO
=========================================*/

renderProjects();
