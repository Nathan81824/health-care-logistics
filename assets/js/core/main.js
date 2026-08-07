/*=====================================
            MAIN JS
=====================================*/

function startApplication() {
    initApplication();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startApplication);
} else {
    startApplication();
}


/*=====================================
        APPLICATION START
=====================================*/

function initApplication() {

    /*=====================================
                CORE
    =====================================*/

    if (typeof initLoader === "function") {
        initLoader();
    }

    if (typeof initScroll === "function") {
        initScroll();
    }

    if (typeof initScrollReveal === "function") {
        initScrollReveal();
    }


    /*=====================================
            PAGE DETECTION
    =====================================*/

    const page = document.body.dataset.page;


    switch (page) {

        case "auth":

            if (typeof initAuth === "function") {
                initAuth();
            }

            break;


        case "home":

            if (typeof initHome === "function") {
                initHome();
            }

            break;


        case "about":

            if (typeof initAbout === "function") {
                initAbout();
            }

            break;


        case "services":

            if (typeof initServices === "function") {
                initServices();
            }

            break;


        case "industries":

            if (typeof initIndustries === "function") {
                initIndustries();
            }

            break;


        case "hipaa":

            if (typeof initHipaa === "function") {
                initHipaa();
            }

            break;


        case "contact":

            if (typeof initContact === "function") {
                initContact();
            }

            break;


        case "dashboard":

            if (typeof initDashboard === "function") {
                initDashboard();
            }

            break;

    }

}