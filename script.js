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