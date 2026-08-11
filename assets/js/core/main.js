/*=====================================*
 * MAIN JS
 * APPLICATION CONTROLLER
 *=====================================*/


/*=====================================*
 * APPLICATION STATE
 *=====================================*/

let applicationStarted = false;

let applicationInitializing = false;


/*=====================================*
 * START APPLICATION
 *=====================================*/

function startApplication() {

    /*
        Prevent duplicate startup
    */

    if (
        applicationStarted ||
        applicationInitializing
    ) {

        console.warn(
            "⚠️ Application startup already running."
        );

        return;

    }


    applicationInitializing = true;


    /*
        If loader provides a promise,
        wait for all components.
    */

    if (
        window.componentLoaderReady &&
        typeof window.componentLoaderReady.then ===
        "function"
    ) {

        window.componentLoaderReady
            .then(() => {

                initApplication();

            })
            .catch(error => {

                console.error(
                    "❌ Component loader failed:",
                    error
                );


                /*
                    Still attempt application
                    initialization.
                */

                initApplication();

            });

        return;

    }


    /*
        Fallback:
        wait for dynamically loaded components.
    */

    waitForComponents();

}


/*=====================================*
 * WAIT FOR COMPONENTS
 *=====================================*/

function waitForComponents() {

    let attempts = 0;

    const maxAttempts = 100;


    function checkComponents() {

        attempts++;


        /*
            Check whether loader has
            finished loading.
        */

        if (
            window.componentsLoaded === true ||
            window.allComponentsLoaded === true
        ) {

            initApplication();

            return;

        }


        /*
            Check dynamically loaded
            containers.
        */

        const authContainer =
            document.getElementById(
                "auth-container"
            );


        const navbarContainer =
            document.getElementById(
                "navbar-container"
            );


        const heroContainer =
            document.getElementById(
                "hero-container"
            );


        const hasAuth =
            authContainer &&
            authContainer.innerHTML.trim() !== "";


        const hasNavbar =
            navbarContainer &&
            navbarContainer.innerHTML.trim() !== "";


        const hasHero =
            heroContainer &&
            heroContainer.innerHTML.trim() !== "";


        if (
            hasAuth ||
            hasNavbar ||
            hasHero
        ) {

            initApplication();

            return;

        }


        /*
            Stop waiting after timeout.
        */

        if (
            attempts >= maxAttempts
        ) {

            console.warn(
                "⚠️ Component loading timeout. Initializing application anyway."
            );

            initApplication();

            return;

        }


        setTimeout(
            checkComponents,
            50
        );

    }


    checkComponents();

}


/*=====================================*
 * DOM READY
 *=====================================*/

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startApplication,
        {
            once: true
        }
    );

}

else {

    startApplication();

}


/*=====================================*
 * APPLICATION INITIALIZATION
 *=====================================*/

function initApplication() {


    /*
        Prevent duplicate initialization
    */

    if (
        applicationStarted
    ) {

        console.warn(
            "⚠️ Application already initialized."
        );

        return;

    }


    applicationStarted = true;

    applicationInitializing = false;


    /*=====================================*
     * CORE
     *=====================================*/


    /*
        Loader
    */

    if (
        typeof initLoader ===
        "function"
    ) {

        initLoader();

    }


    /*
        Scroll
    */

    if (
        typeof initScroll ===
        "function"
    ) {

        initScroll();

    }


    /*
        Scroll Reveal
    */

    if (
        typeof initScrollReveal ===
        "function"
    ) {

        initScrollReveal();

    }


    /*=====================================*
     * PAGE DETECTION
     *=====================================*/

    const page =
        document.body.dataset.page;


    console.log(
        "📄 Current page:",
        page
    );


    /*=====================================*
     * NAVBAR
     *=====================================*/

    /*
        Navbar itself is initialized
        by the navbar loader callback.

        Do not initialize it again here.
    */

    /*
        Navbar scroll is also initialized
        after navbar has been loaded.
    */


    /*=====================================*
     * NOTIFICATIONS
     *=====================================*/

    /*
        Do not run notification UI
        on authentication page.
    */

    if (
        page !== "auth" &&
        typeof setupNotificationUI ===
        "function"
    ) {

        setupNotificationUI();

    }


    /*=====================================*
     * PAGE INITIALIZATION
     *=====================================*/

    switch (page) {


        /*=================================*
         * AUTH
         *=================================*/

        case "auth":

            if (
                typeof initAuth ===
                "function"
            ) {

                initAuth();

            }

            break;


        /*=================================*
         * HOME
         *=================================*/

        case "home":

            if (
                typeof initHome ===
                "function"
            ) {

                initHome();

            }


            /*
                HOME STATS
            */

            if (
                typeof initStats ===
                "function"
            ) {

                initStats();

            }

            break;


        /*=================================*
         * ABOUT
         *=================================*/

        case "about":

            if (
                typeof initAbout ===
                "function"
            ) {

                initAbout();

            }


            /*
                ABOUT STATS
            */

            if (
                typeof initStats ===
                "function"
            ) {

                initStats();

            }

            break;


        /*=================================*
         * SERVICES
         *=================================*/

        case "services":

            if (
                typeof initServices ===
                "function"
            ) {

                initServices();

            }

            break;


        /*=================================*
         * INDUSTRIES
         *=================================*/

        case "industries":

            if (
                typeof initIndustries ===
                "function"
            ) {

                initIndustries();

            }

            break;


        /*=================================*
         * HIPAA
         *=================================*/

        case "hipaa":

            if (
                typeof initHipaa ===
                "function"
            ) {

                initHipaa();

            }

            break;


        /*=================================*
         * CONTACT
         *=================================*/

        case "contact":

            if (
                typeof initContact ===
                "function"
            ) {

                initContact();

            }

            break;


        /*=================================*
         * DASHBOARD
         *=================================*/

        case "dashboard":

            if (
                typeof initDashboard ===
                "function"
            ) {

                initDashboard();

            }

            break;


        /*=================================*
         * UNKNOWN PAGE
         *=================================*/

        default:

            console.warn(
                "⚠️ No page initializer found for:",
                page
            );

            break;

    }


    /*=====================================*
     * FINAL SCROLL REVEAL
     *=====================================*/

    if (
        typeof initScrollReveal ===
        "function"
    ) {

        setTimeout(
            () => {

                initScrollReveal();

            },
            100
        );

    }


    /*=====================================*
     * FINAL STATS CHECK
     *=====================================*/

    if (
        (
            page === "home" ||
            page === "about"
        ) &&
        typeof initStats ===
        "function"
    ) {

        setTimeout(
            () => {

                initStats();

            },
            150
        );

    }


    /*=====================================*
     * APPLICATION READY
     *=====================================*/

    console.log(
        "✅ Application initialized"
    );

}


/*=====================================*
 * EXPORT
 *=====================================*/

window.startApplication =
    startApplication;


window.initApplication =
    initApplication;