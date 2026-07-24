/* ==========================================
        NAVBAR JS
========================================== */

function initNavbar() {

    console.log("Navbar initialized");

    loadNavbarUser();
    initProfileDropdown();
    initNavbarLogout();
    initMobileMenu();
    initThemeToggle();
    initNotifications();
    activeNavLink();

}

/* ==========================================
        LOAD USER DATA
========================================== */

function loadNavbarUser() {

    const user = JSON.parse(localStorage.getItem("user"));

    const username = document.getElementById("navUsername");
    const initial = document.getElementById("navUserInitial");

    if (!user) {

        if (username) username.textContent = "Guest";
        if (initial) initial.textContent = "G";

        return;
    }

    const name = user.name || "Guest";

    if (username) {
        username.textContent = name;
    }

    if (initial) {
        initial.textContent = name.charAt(0).toUpperCase();
    }

}

/* ==========================================
        PROFILE DROPDOWN
========================================== */

function initProfileDropdown() {

    const profileCard = document.querySelector(".profile-card");
    const dropdown = document.querySelector(".profile-dropdown");

    if (!profileCard || !dropdown) return;

    profileCard.addEventListener("click", function (e) {

        e.stopPropagation();
        dropdown.classList.toggle("show");

    });

    dropdown.addEventListener("click", function (e) {

        e.stopPropagation();

    });

    document.addEventListener("click", function () {

        dropdown.classList.remove("show");

    });

}

/* ==========================================
        LOGOUT
========================================== */

function initNavbarLogout() {

    const logout = document.getElementById("navLogout");

    if (!logout) return;

    logout.addEventListener("click", function (e) {

        e.preventDefault();

        const confirmLogout = confirm(
            "Are you sure you want to log out?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("user");

        // Remove any saved settings if needed
        // localStorage.removeItem("theme");

        const isInsidePages = window.location.pathname.includes("/pages/");

        window.location.href = isInsidePages
            ? "../index.html"
            : "index.html";

    });

}

/* ==========================================
        MOBILE MENU
========================================== */

function initMobileMenu() {

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", function () {

        menuBtn.classList.toggle("open");
        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");
            menuBtn.classList.remove("open");

        });

    });

}

/* ==========================================
        DARK MODE
========================================== */

function initThemeToggle() {

    const themeBtn = document.querySelector(".theme-toggle");

    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        if (icon) {
            icon.className = "fa-solid fa-sun";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (icon) {
            icon.className = "fa-solid fa-moon";
        }

    }

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const dark = document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );

        if (icon) {

            icon.className = dark
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

        }

    });

}

/* ==========================================
        NOTIFICATIONS
========================================== */

function initNotifications() {

    const btn = document.querySelector(".notification-btn");

    if (!btn) return;

    btn.addEventListener("click", function () {

        console.log("Notification button clicked");

        alert("You have no new notifications.");

    });

}

/* ==========================================
        ACTIVE NAV LINK
========================================== */

function activeNavLink() {

    const currentPage = window.location.pathname.split("/").pop();

    const links = document.querySelectorAll(".nav-links a");

    links.forEach(link => {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (currentPage === linkPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}

/* ==========================================
        EXPORT
========================================== */

window.initNavbar = initNavbar;