/*=====================================
            NAVBAR
=====================================*/

function initNavbar() {

    initNavbarScroll();

    initActiveLinks();

    initMobileMenu();

    initProfileMenu();

}


/*=====================================
        HEADER SCROLL
=====================================*/

function initNavbarScroll() {

    const header = document.querySelector(".header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/*=====================================
        ACTIVE LINKS
=====================================*/

function initActiveLinks() {

    const links = document.querySelectorAll(".nav__link");

    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        if (href.includes(currentPage)) {

            links.forEach(item => item.classList.remove("active"));

            link.classList.add("active");

        }

    });

}


/*=====================================
        MOBILE MENU
=====================================*/

function initMobileMenu() {

    const openBtn = document.getElementById("Menu-open");

    const closeBtn = document.getElementById("Menu-close");

    const panel = document.querySelector(".mobile-panel");

    if (!openBtn || !closeBtn || !panel) return;

    openBtn.addEventListener("click", () => {

        panel.classList.add("active");

        openBtn.style.display = "none";

        closeBtn.style.display = "flex";

        document.body.style.overflow = "hidden";

    });

    closeBtn.addEventListener("click", () => {

        panel.classList.remove("active");

        openBtn.style.display = "flex";

        closeBtn.style.display = "none";

        document.body.style.overflow = "";

    });

}


/*=====================================
        PROFILE MENU
=====================================*/

function initProfileMenu() {

    const profile = document.querySelector(".header__profile");

    const button = document.querySelector(".profile-btn");

    if (!profile || !button) return;

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        profile.classList.toggle("active");

    });

    document.addEventListener("click", () => {

        profile.classList.remove("active");

    });

}


/*=====================================
        PROFILE
=====================================*/

function initProfile() {

    const avatar = document.getElementById("profile-avatar");

    const name = document.getElementById("profile-name");

    const username =

        localStorage.getItem("username") ||

        localStorage.getItem("fullname") ||

        "Guest";

    if (name) {

        name.textContent = username;

    }

    if (avatar) {

        avatar.textContent = username.charAt(0).toUpperCase();

    }

}


/*=====================================
        LOGOUT
=====================================*/

function initLogout() {

    const logout = document.getElementById("logout");

    if (!logout) return;

    logout.addEventListener("click", (e) => {

        e.preventDefault();

        localStorage.removeItem("username");

        localStorage.removeItem("fullname");

        localStorage.removeItem("email");

        window.location.href = "/index.html";

    });

}