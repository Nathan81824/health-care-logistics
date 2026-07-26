/* ==========================================
            DASHBOARD JS
========================================== */

function initDashboard() {

    console.log("Dashboard Started");

    /* ==========================================
            LOAD SIDEBAR
    ========================================== */

    loadSection(
        "../components/dashboard/sidebar.html",
        "sidebar-container",
        () => {

            if (typeof initSidebar === "function") {
                initSidebar();
            }

            initSidebarActive();
            loadUserProfile();
            initLogout();

        }
    );



    /* ==========================================
            LOAD TOPBAR
    ========================================== */

    loadSection(
        "../components/dashboard/topbar.html",
        "topbar-container",
        () => {

            if (typeof initTopbar === "function") {
                initTopbar();
            }

            loadTopbarUser();

        }
    );



    /* ==========================================
            LOAD WELCOME
    ========================================== */

    loadSection(
        "../components/dashboard/welcome.html",
        "welcome-container",
        () => {

            if (typeof initWelcome === "function") {
                initWelcome();
            }

        }
    );



    /* ==========================================
            LOAD OVERVIEW
    ========================================== */

    loadSection(
        "../components/dashboard/overview.html",
        "overview-container",
        () => {

            if (typeof initOverview === "function") {
                initOverview();
            }

        }
    );

}





/* ==========================================
        SIDEBAR ACTIVE LINK
========================================== */

function initSidebarActive() {

    const links = document.querySelectorAll(".nav-link");

    links.forEach(link => {

        link.addEventListener("click", () => {

            links.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });

}





/* ==========================================
        LOAD SIDEBAR USER
========================================== */

function loadUserProfile() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const username = document.getElementById("sidebarUsername");
    const initial = document.getElementById("sidebarInitial");

    if (username) {
        username.textContent = user.name;
    }

    if (initial) {
        initial.textContent =
            user.name.charAt(0).toUpperCase();
    }

}





/* ==========================================
        LOAD TOPBAR USER
========================================== */

function loadTopbarUser() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const username = document.getElementById("topbarUsername");
    const initial = document.getElementById("topbarInitial");

    if (username) {
        username.textContent = user.name;
    }

    if (initial) {
        initial.textContent =
            user.name.charAt(0).toUpperCase();
    }

}





/* ==========================================
        LOGOUT
========================================== */

function initLogout() {

    const logoutButtons = document.querySelectorAll(
        "#logoutBtn, #logoutTopbar"
    );

    logoutButtons.forEach(button => {

        button.addEventListener("click", () => {

            const confirmLogout = confirm(
                "Are you sure you want to logout?"
            );

            if (!confirmLogout) return;

            localStorage.removeItem("user");

            window.location.href = "../index.html";

        });

    });

}





/* ==========================================
        EXPORT
========================================== */

window.initDashboard = initDashboard;