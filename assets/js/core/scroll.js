/*=====================================
            MAIN
=====================================*/

document.addEventListener("DOMContentLoaded", () => {

    initApplication();

});


/*=====================================
        APPLICATION
=====================================*/

function initApplication() {

    /*==============================
            CORE
    ==============================*/

    if (typeof initLoader === "function") {

        initLoader();

    }

    if (typeof initDarkMode === "function") {

        initDarkMode();

    }


    /*==============================
            NAVBAR
    ==============================*/

    if (typeof initNavbar === "function") {

        initNavbar();

    }

    if (typeof initProfile === "function") {

        initProfile();

    }

    if (typeof initLogout === "function") {

        initLogout();

    }


    /*==============================
            AUTH
    ==============================*/

    if (typeof initAuth === "function") {

        initAuth();

    }


    /*==============================
            PAGES
    ==============================*/

    if (typeof initHome === "function") {

        initHome();

    }

    if (typeof initAbout === "function") {

        initAbout();

    }

    if (typeof initServices === "function") {

        initServices();

    }

    if (typeof initIndustries === "function") {

        initIndustries();

    }

    if (typeof initHipaa === "function") {

        initHipaa();

    }

    if (typeof initContact === "function") {

        initContact();

    }

    if (typeof initDashboard === "function") {

        initDashboard();

    }

}