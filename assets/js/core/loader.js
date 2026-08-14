/*=====================================*
 * LOADER JS
 *=====================================*/


/*=====================================*
 * BASE PATH
 *=====================================*/

const basePath =
    window.location.pathname
        .toLowerCase()
        .includes("/pages/")
        ? "../"
        : "";


/*=====================================*
 * SOUND SYSTEM LOADER
 *=====================================*/

/*=====================================*
 * SOUND SYSTEM LOADER
 *=====================================*/

function loadSoundSystem() {

    return new Promise((resolve) => {

        if (window.soundSystemLoaded) {

            resolve();

            return;

        }


        const script =
            document.createElement("script");


        script.src =
            `${basePath}assets/js/sounds/sound.js`;


        script.onload = () => {

            window.soundSystemLoaded = true;

            console.log(
                "🔊 Sound system loaded"
            );

            resolve();

        };


        script.onerror = () => {

            console.error(
                "❌ Sound system failed to load:",
                script.src
            );

            resolve();

        };


        document.head.appendChild(script);

    });

}


/*=====================================*
 * LOADER STATE
 *=====================================*/

let loadedComponents = 0;

let totalComponents = 0;

let componentsLoading = false;

let componentsLoaded = false;

/*=====================================*
 * LOADER PROMISE
 *=====================================*/

let resolveComponentLoaderReady;

let rejectComponentLoaderReady;


window.componentLoaderReady =
    new Promise((resolve, reject) => {

        resolveComponentLoaderReady =
            resolve;

        rejectComponentLoaderReady =
            reject;

    });


/*=====================================*
 * LOAD SECTION
 *=====================================*/

function loadSection(
    file,
    containerId,
    callback = null
) {

    return new Promise((resolve) => {


        const container =
            document.getElementById(
                containerId
            );


        /*=====================================
         * CONTAINER NOT FOUND
         =====================================*/

        if (!container) {

            /*
                This is not an error.

                A component may simply not
                belong to the current page.
            */

            resolve(false);

            return;

        }


        /*=====================================
         * FETCH COMPONENT
         =====================================*/

        fetch(file)

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        `Failed to load ${file} (${response.status})`
                    );

                }


                return response.text();

            })


            .then(html => {


                /*=====================================
                 * INSERT HTML
                 =====================================*/

                container.innerHTML =
                    html;


                /*=====================================
                 * CALLBACK
                 =====================================*/

                if (
                    typeof callback ===
                    "function"
                ) {

                    try {

                        callback();

                    }
                    catch (error) {

                        console.error(
                            `❌ Component initialization error for ${containerId}:`,
                            error
                        );

                    }

                }


                /*=====================================
                 * SCROLL REVEAL REFRESH
                 =====================================*/

                if (
                    typeof initScrollReveal ===
                    "function"
                ) {

                    setTimeout(() => {

                        initScrollReveal();

                    }, 0);

                }


                resolve(true);

            })


            .catch(error => {

                console.error(
                    "❌ Component loading error:",
                    error
                );

                resolve(false);

            });

    });

}


/*=====================================*
 * REGISTER COMPONENT
 *=====================================*/

function registerComponent(
    file,
    containerId,
    callback = null
) {

    return loadSection(
        file,
        containerId,
        callback
    );

}


/*=====================================*
 * LOAD SHARED COMPONENTS
 *=====================================*/

function loadSharedComponents() {


    const promises = [];


    /*=====================================
     * NAVBAR
     *=====================================*/

    if (
        document.getElementById(
            "navbar-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/shared/navbar.html`,

                "navbar-container",

                () => {

                    if (
                        typeof initNavbar ===
                        "function"
                    ) {

                        initNavbar();

                    }

                }

            )

        );

    }


    /*=====================================
     * FOOTER
     *=====================================*/

    if (
        document.getElementById(
            "footer-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/shared/footer.html`,

                "footer-container",

                () => {

                    if (
                        typeof initFooter ===
                        "function"
                    ) {

                        initFooter();

                    }

                }

            )

        );

    }


    /*=====================================
     * LOGOUT POPUP
     *=====================================*/

    if (
        document.getElementById(
            "logout-popup-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/shared/logout-popup.html`,

                "logout-popup-container",

                () => {

                    if (
                        typeof initLogoutPopup ===
                        "function"
                    ) {

                        initLogoutPopup();

                    }

                }

            )

        );

    }


    /*=====================================
     * WHATSAPP
     *=====================================*/

    if (
        document.getElementById(
            "whatsapp-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/shared/whatsapp-button.html`,

                "whatsapp-container",

                () => {

                    if (
                        typeof initWhatsAppWidget ===
                        "function"
                    ) {

                        initWhatsAppWidget();

                    }

                }

            )

        );

    }


    return promises;

}


/*=====================================*
 * LOAD AUTH PAGE
 *=====================================*/

function loadAuthPage() {


    const promises = [];


    if (
        document.getElementById(
            "auth-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/auth/auth.html`,

                "auth-container",

                () => {

                    if (
                        typeof initAuth ===
                        "function"
                    ) {

                        initAuth();

                    }

                }

            )

        );

    }


    return promises;

}


/*=====================================*
 * LOAD HOME PAGE
 *=====================================*/

function loadHomePage() {


    const promises = [];


    /*=====================================
     * HERO
     *=====================================*/

    if (
        document.getElementById(
            "hero-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/hero.html`,

                "hero-container",

                () => {

                    if (
                        typeof initHero ===
                        "function"
                    ) {

                        initHero();

                    }

                }

            )

        );

    }


    /*=====================================
     * SERVICES
     *=====================================*/

    if (
        document.getElementById(
            "services-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/services.html`,

                "services-container",

                () => {

                    if (
                        typeof initHomeServices ===
                        "function"
                    ) {

                        initHomeServices();

                    }

                }

            )

        );

    }


    /*=====================================
     * WHY CHOOSE US
     *=====================================*/

    if (
        document.getElementById(
            "why-choose-us-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/why-choose-us.html`,

                "why-choose-us-container",

                () => {

                    if (
                        typeof initWhyChooseUs ===
                        "function"
                    ) {

                        initWhyChooseUs();

                    }

                }

            )

        );

    }


/*=====================================
 * HOW IT WORKS
 *=====================================*/

if (
    document.getElementById(
        "how-it-works-container"
    )
) {

    promises.push(

        registerComponent(

            `${basePath}components/home/how-it-works.html`,

            "how-it-works-container",

            () => {

                if (
                    typeof initHowItWorks ===
                    "function"
                ) {

                    initHowItWorks();

                }

            }

        )

    );

}


    /*=====================================
     * OPERATIONS
     *=====================================*/

    if (
        document.getElementById(
            "operations-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/operations.html`,

                "operations-container",

                () => {

                    if (
                        typeof initOperations ===
                        "function"
                    ) {

                        initOperations();

                    }

                }

            )

        );

    }


    /*=====================================
     * INDUSTRIES
     *=====================================*/

    if (
        document.getElementById(
            "industries-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/industries.html`,

                "industries-container",

                () => {

                    if (
                        typeof initIndustries ===
                        "function"
                    ) {

                        initIndustries();

                    }

                }

            )

        );

    }


    /*=====================================
     * TESTIMONIALS
     *=====================================*/

    if (
        document.getElementById(
            "testimonials-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/testimonials.html`,

                "testimonials-container",

                () => {

                    if (
                        typeof initTestimonials ===
                        "function"
                    ) {

                        initTestimonials();

                    }

                }

            )

        );

    }


    /*=====================================
     * CTA
     *=====================================*/

    if (
        document.getElementById(
            "cta-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/cta.html`,

                "cta-container",

                () => {

                    if (
                        typeof initCTA ===
                        "function"
                    ) {

                        initCTA();

                    }

                }

            )

        );

    }


    return promises;

}


/*=====================================*
 * LOAD ABOUT PAGE
 *=====================================*/

function loadAboutPage() {


    const promises = [];


    /*=====================================
     * ABOUT HERO
     *=====================================*/

    if (
        document.getElementById(
            "about-hero-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/about/hero.html`,

                "about-hero-container",

                () => {

                    if (
                        typeof initAboutHero ===
                        "function"
                    ) {

                        initAboutHero();

                    }

                }

            )

        );

    }


    /*=====================================
     * OUR STORY
     *=====================================*/

    if (
        document.getElementById(
            "about-our-story-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/about/our-story.html`,

                "about-our-story-container",

                () => {

                    if (
                        typeof initOurStory ===
                        "function"
                    ) {

                        initOurStory();

                    }

                }

            )

        );

    }


    /*=====================================
     * VISION
     *=====================================*/

    if (
        document.getElementById(
            "about-vision-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/about/vision.html`,

                "about-vision-container",

                () => {

                    if (
                        typeof initVision ===
                        "function"
                    ) {

                        initVision();

                    }

                }

            )

        );

    }


    /*=====================================
     * STATS
     *=====================================*/

    if (
        document.getElementById(
            "about-stats-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/about/stats.html`,

                "about-stats-container",

                () => {

                    if (
                        typeof initStats ===
                        "function"
                    ) {

                        initStats();

                    }

                }

            )

        );

    }


    /*=====================================
     * VALUES
     *=====================================*/

    if (
        document.getElementById(
            "about-values-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/about/values.html`,

                "about-values-container",

                () => {

                    if (
                        typeof initValues ===
                        "function"
                    ) {

                        initValues();

                    }

                }

            )

        );

    }


    /*=====================================
     * TEAM
     *=====================================*/

    if (
        document.getElementById(
            "about-team-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/about/team.html`,

                "about-team-container",

                () => {

                    if (
                        typeof initTeam ===
                        "function"
                    ) {

                        initTeam();

                    }

                }

            )

        );

    }


    /*=====================================
     * WHY CHOOSE US
     *=====================================*/

    if (
        document.getElementById(
            "why-choose-us-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/why-choose-us.html`,

                "why-choose-us-container",

                () => {

                    if (
                        typeof initWhyChooseUs ===
                        "function"
                    ) {

                        initWhyChooseUs();

                    }

                }

            )

        );

    }


    /*=====================================
     * TESTIMONIALS
     *=====================================*/

    if (
        document.getElementById(
            "testimonials-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/testimonials.html`,

                "testimonials-container",

                () => {

                    if (
                        typeof initTestimonials ===
                        "function"
                    ) {

                        initTestimonials();

                    }

                }

            )

        );

    }


    /*=====================================
     * CTA
     *=====================================*/

    if (
        document.getElementById(
            "cta-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/cta.html`,

                "cta-container",

                () => {

                    if (
                        typeof initCTA ===
                        "function"
                    ) {

                        initCTA();

                    }

                }

            )

        );

    }


    return promises;

}


/*=====================================*
 * LOAD SERVICES PAGE
 *=====================================*/

function loadServicesPage() {


    const promises = [];


    /*=====================================
     * SERVICES HERO
     *=====================================*/

    if (
        document.getElementById(
            "services-hero-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/services/hero.html`,

                "services-hero-container",

                () => {

                    if (
                        typeof initServicesHero ===
                        "function"
                    ) {

                        initServicesHero();

                    }

                }

            )

        );

    }


    /*=====================================
     * OVERVIEW
     *=====================================*/

    if (
        document.getElementById(
            "overview-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/services/overview.html`,

                "overview-container",

                () => {

                    if (
                        typeof initOverview ===
                        "function"
                    ) {

                        initOverview();

                    }

                }

            )

        );

    }


    /*=====================================
     * CORE SERVICES
     *=====================================*/

    if (
        document.getElementById(
            "core-services-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/services/core-services.html`,

                "core-services-container",

                () => {

                    if (
                        typeof initCoreServices ===
                        "function"
                    ) {

                        initCoreServices();

                    }

                }

            )

        );

    }


    /*=====================================
     * PROCESS
     *=====================================*/

    if (
        document.getElementById(
            "process-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/services/process.html`,

                "process-container",

                () => {

                    if (
                        typeof initProcess ===
                        "function"
                    ) {

                        initProcess();

                    }

                }

            )

        );

    }


    /*=====================================
     * WHY CHOOSE US
     *=====================================*/

    if (
        document.getElementById(
            "why-choose-us-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/why-choose-us.html`,

                "why-choose-us-container",

                () => {

                    if (
                        typeof initWhyChooseUs ===
                        "function"
                    ) {

                        initWhyChooseUs();

                    }

                }

            )

        );

    }


    /*=====================================
     * SERVICE ADVANTAGES
     *=====================================*/

    if (
        document.getElementById(
            "why-choose-services-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/services/why-choose-services.html`,

                "why-choose-services-container"

            )

        );

    }


    /*=====================================
     * INDUSTRIES
     *=====================================*/

    if (
        document.getElementById(
            "industries-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/industries.html`,

                "industries-container",

                () => {

                    if (
                        typeof initIndustries ===
                        "function"
                    ) {

                        initIndustries();

                    }

                }

            )

        );

    }


    /*=====================================
     * FAQ
     *=====================================*/

    if (
        document.getElementById(
            "faq-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/services/faq.html`,

                "faq-container",

                () => {

                    if (
                        typeof initFAQ ===
                        "function"
                    ) {

                        initFAQ();

                    }

                }

            )

        );

    }


    /*=====================================
     * TESTIMONIALS
     *=====================================*/

    if (
        document.getElementById(
            "testimonials-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/testimonials.html`,

                "testimonials-container",

                () => {

                    if (
                        typeof initTestimonials ===
                        "function"
                    ) {

                        initTestimonials();

                    }

                }

            )

        );

    }


    /*=====================================
     * CTA
     *=====================================*/

    if (
        document.getElementById(
            "cta-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/cta.html`,

                "cta-container",

                () => {

                    if (
                        typeof initCTA ===
                        "function"
                    ) {

                        initCTA();

                    }

                }

            )

        );

    }


    return promises;

}


/*=====================================*
 * LOAD INDUSTRIES PAGE
 *=====================================*/

function loadIndustriesPage() {


    const promises = [];


    /*=====================================
     * HERO
     *=====================================*/

    if (
        document.getElementById(
            "industries-hero-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/industries-we-serve/hero.html`,

                "industries-hero-container"

            )

        );

    }


    /*=====================================
     * OVERVIEW
     *=====================================*/

    if (
        document.getElementById(
            "industries-overview-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/industries-we-serve/industries-overview.html`,

                "industries-overview-container"

            )

        );

    }


    /*=====================================
     * HOSPITALS
     *=====================================*/

    if (
        document.getElementById(
            "hospital-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/industries-we-serve/hospital.html`,

                "hospital-container"

            )

        );

    }


    /*=====================================
     * LABORATORIES
     *=====================================*/

    if (
        document.getElementById(
            "labotories-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/industries-we-serve/labotories.html`,

                "labotories-container"

            )

        );

    }


    /*=====================================
     * PHARMACIES
     *=====================================*/

    if (
        document.getElementById(
            "pharmacies-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/industries-we-serve/pharmacies.html`,

                "pharmacies-container"

            )

        );

    }


    /*=====================================
     * PHARMACEUTICAL COMPANIES
     *=====================================*/

    if (
        document.getElementById(
            "pharmaceutical-companies-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/industries-we-serve/pharmaceutical-companies.html`,

                "pharmaceutical-companies-container"

            )

        );

    }


    /*=====================================
     * BLOOD BANKS
     *=====================================*/

    if (
        document.getElementById(
            "blood-bank-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/industries-we-serve/blood-bank.html`,

                "blood-bank-container"

            )

        );

    }


    /*=====================================
     * MEDICAL SUPPLIERS
     *=====================================*/

    if (
        document.getElementById(
            "medical-suppliers-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/industries-we-serve/medical-suppliers.html`,

                "medical-suppliers-container"

            )

        );

    }


    /*=====================================
     * WHY CHOOSE US
     *=====================================*/

    if (
        document.getElementById(
            "why-choose-us-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/why-choose-us.html`,

                "why-choose-us-container",

                () => {

                    if (
                        typeof initWhyChooseUs ===
                        "function"
                    ) {

                        initWhyChooseUs();

                    }

                }

            )

        );

    }


    /*=====================================
     * TESTIMONIALS
     *=====================================*/

    if (
        document.getElementById(
            "testimonials-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/testimonials.html`,

                "testimonials-container",

                () => {

                    if (
                        typeof initTestimonials ===
                        "function"
                    ) {

                        initTestimonials();

                    }

                }

            )

        );

    }


    /*=====================================
     * CTA
     *=====================================*/

    if (
        document.getElementById(
            "cta-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/cta.html`,

                "cta-container",

                () => {

                    if (
                        typeof initCTA ===
                        "function"
                    ) {

                        initCTA();

                    }

                }

            )

        );

    }


    return promises;

}


/*=====================================*
 * LOAD HIPAA PAGE
 *=====================================*/

function loadHipaaPage() {


    const promises = [];


    /*=====================================
     * HERO
     *=====================================*/

    if (
        document.getElementById(
            "hipaa-hero-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/hipaa/hero.html`,

                "hipaa-hero-container"

            )

        );

    }


    /*=====================================
     * WHAT IS HIPAA
     *=====================================*/

    if (
        document.getElementById(
            "what-is-hipaa-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/hipaa/what-is-hipaa.html`,

                "what-is-hipaa-container",

                () => {

                    if (
                        typeof initWhatIsHipaa ===
                        "function"
                    ) {

                        initWhatIsHipaa();

                    }

                }

            )

        );

    }


    /*=====================================
     * HIPAA COMMITMENT
     *=====================================*/

    if (
        document.getElementById(
            "hipaa-commitment-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/hipaa/our-commitments.html`,

                "hipaa-commitment-container",

                () => {

                    if (
                        typeof initCommitmentTimeline ===
                        "function"
                    ) {

                        initCommitmentTimeline();

                    }

                }

            )

        );

    }


    /*=====================================
     * HIPAA PROCESS
     *=====================================*/

    if (
        document.getElementById(
            "hipaa-process-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/hipaa/hipaa-process.html`,

                "hipaa-process-container",

                () => {

                    if (
                        typeof initHipaaProcess ===
                        "function"
                    ) {

                        initHipaaProcess();

                    }

                }

            )

        );

    }



    /*=====================================
     * CTA
     *=====================================*/

    if (
        document.getElementById(
            "cta-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/cta.html`,

                "cta-container",

                () => {

                    if (
                        typeof initCTA ===
                        "function"
                    ) {

                        initCTA();

                    }

                }

            )

        );

    }


    return promises;

}


/*=====================================*
 * LOAD CONTACT PAGE
 *=====================================*/

function loadContactPage() {


    const promises = [];


    /*=====================================
     * CONTACT HERO
     *=====================================*/

    if (
        document.getElementById(
            "contact-hero-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/contact/contactHero.html`,

                "contact-hero-container"

            )

        );

    }


    /*=====================================
     * CONTACT FORM
     *=====================================*/

    if (
        document.getElementById(
            "contact-form-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/contact/contactForm.html`,

                "contact-form-container",

                () => {

                    if (
                        typeof initContact ===
                        "function"
                    ) {

                        initContact();

                    }

                }

            )

        );

    }


    /*=====================================
     * MAP
     *=====================================*/

    if (
        document.getElementById(
            "map-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/contact/map.html`,

                "map-container"

            )

        );

    }


    /*=====================================
     * WHY CHOOSE US
     *=====================================*/

    if (
        document.getElementById(
            "why-choose-us-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/why-choose-us.html`,

                "why-choose-us-container",

                () => {

                    if (
                        typeof initWhyChooseUs ===
                        "function"
                    ) {

                        initWhyChooseUs();

                    }

                }

            )

        );

    }




    /*=====================================
     * SERVICE COVERAGE
     *=====================================*/

    if (
        document.getElementById(
            "service-coverage-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/contact/service-coverage.html`,

                "service-coverage-container"

            )

        );

    }


    /*=====================================
     * CTA
     *=====================================*/

    if (
        document.getElementById(
            "cta-container"
        )
    ) {

        promises.push(

            registerComponent(

                `${basePath}components/home/cta.html`,

                "cta-container",

                () => {

                    if (
                        typeof initCTA ===
                        "function"
                    ) {

                        initCTA();

                    }

                }

            )

        );

    }


    return promises;

}

/*==================================================*
                    DASHBOARD PAGE LOADER
*
* PURPOSE:
* - Register dashboard components
* - Load sidebar
* - Load topbar
* - Load overview
* - Load analytics
* - Load shipments
* - Load activity
* - Load fleet
* - Load inventory
* - Load hospitals
* - Load drivers
* - Load live tracking
* - Load reports
*
* NOTE:
* Settings is a separate page and is NOT loaded here.
*
* NOTE:
* Sidebar navigation/active state is handled
* separately by sidebar.js.
*==================================================*/


function loadDashboardPage() {


    /*==================================================
            COMPONENT PROMISES
    ==================================================*/

    const promises = [];



    /*==================================================
            SIDEBAR
    ==================================================*/

    const sidebarContainer =
        document.getElementById(
            "sidebar-container"
        );


    if (sidebarContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/sidebar.html`,

                "sidebar-container"

            )

        );

    }



    /*==================================================
            TOPBAR
    ==================================================*/

    const topbarContainer =
        document.getElementById(
            "topbar-container"
        );


    if (topbarContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/topbar.html`,

                "topbar-container"

            )

        );

    }



    /*==================================================
            OVERVIEW
    ==================================================*/

    const overviewContainer =
        document.getElementById(
            "overview-container"
        );


    if (overviewContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/overview.html`,

                "overview-container"

            )

        );

    }



    /*==================================================
            ANALYTICS
    ==================================================*/

    const analyticsContainer =
        document.getElementById(
            "analytics-container"
        );


    if (analyticsContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/analytics.html`,

                "analytics-container"

            )

        );

    }



    /*==================================================
            SHIPMENTS
    ==================================================*/

    const shipmentsContainer =
        document.getElementById(
            "shipments-container"
        );


    if (shipmentsContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/shipments.html`,

                "shipments-container"

            )

        );

    }



    /*==================================================
            ACTIVITY
    ==================================================*/

    const activityContainer =
        document.getElementById(
            "activity-container"
        );


    if (activityContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/activity.html`,

                "activity-container"

            )

        );

    }



    /*==================================================
            FLEET
    ==================================================*/

    const fleetContainer =
        document.getElementById(
            "fleet-container"
        );


    if (fleetContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/fleet.html`,

                "fleet-container"

            )

        );

    }



    /*==================================================
            INVENTORY
    ==================================================*/

    const inventoryContainer =
        document.getElementById(
            "inventory-container"
        );


    if (inventoryContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/inventory.html`,

                "inventory-container"

            )

        );

    }



    /*==================================================
            HOSPITALS
    ==================================================*/

    const hospitalsContainer =
        document.getElementById(
            "hospitals-container"
        );


    if (hospitalsContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/hospitals.html`,

                "hospitals-container"

            )

        );

    }



    /*==================================================
            DRIVERS
    ==================================================*/

    const driversContainer =
        document.getElementById(
            "drivers-container"
        );


    if (driversContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/drivers.html`,

                "drivers-container"

            )

        );

    }



    /*==================================================
            LIVE TRACKING
    ==================================================*/

    const trackingContainer =
        document.getElementById(
            "tracking-container"
        );


    if (trackingContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/tracking.html`,

                "tracking-container"

            )

        );

    }



    /*==================================================
            REPORTS
    ==================================================*/

    const reportsContainer =
        document.getElementById(
            "reports-container"
        );


    if (reportsContainer) {

        promises.push(

            registerComponent(

                `${basePath}components/dashboard/reports.html`,

                "reports-container"

            )

        );

    }



    /*==================================================
            RETURN ALL COMPONENT PROMISES
    ==================================================*/

    return promises;

}

/*=====================================*
 * LOAD CURRENT PAGE
 *=====================================*/

function loadCurrentPage() {


    const page =
        document.body.dataset.page ||
        "";


    console.log(
        "📦 Loading components for page:",
        page
    );


    let pagePromises = [];


    /*=====================================
     * AUTH
     *=====================================*/

    if (
        page === "auth"
    ) {

        pagePromises =
            loadAuthPage();

    }


    /*=====================================
     * HOME
     *=====================================*/

    else if (
        page === "home"
    ) {

        pagePromises =
            loadHomePage();

    }


    /*=====================================
     * ABOUT
     *=====================================*/

    else if (
        page === "about"
    ) {

        pagePromises =
            loadAboutPage();

    }


    /*=====================================
     * SERVICES
     *=====================================*/

    else if (
        page === "services"
    ) {

        pagePromises =
            loadServicesPage();

    }


    /*=====================================
     * INDUSTRIES
     *=====================================*/

    else if (
        page === "industries"
    ) {

        pagePromises =
            loadIndustriesPage();

    }


    /*=====================================
     * HIPAA
     *=====================================*/

    else if (
        page === "hipaa"
    ) {

        pagePromises =
            loadHipaaPage();

    }


    /*=====================================
     * CONTACT
     *=====================================*/

    else if (
        page === "contact"
    ) {

        pagePromises =
            loadContactPage();

    }


    /*=====================================
     * DASHBOARD
     *=====================================*/

    else if (
        page === "dashboard"
    ) {

        pagePromises =
            loadDashboardPage();

    }


    /*=====================================
     * UNKNOWN
     *=====================================*/

    else {

        console.warn(
            "⚠️ Unknown page:",
            page
        );

    }


    return Promise
        .all(pagePromises);

}


/*=====================================*
 * START LOADER
 *=====================================*/

function startComponentLoader() {


    if (
        componentsLoading
    ) {

        return window.componentLoaderReady;

    }


    componentsLoading =
        true;


    /*=====================================
     * LOAD ONLY CURRENT PAGE
     *=====================================*/

    loadCurrentPage()

        .then(() => {


            /*=====================================
             * LOAD SHARED COMPONENTS
             *=====================================*/

            return Promise.all(
                loadSharedComponents()
            );

        })


        .then(() => {


            /*=====================================
             * MARK COMPLETE
             *=====================================*/

            componentsLoaded =
                true;


            window.componentsLoaded =
                true;


            window.allComponentsLoaded =
                true;


            /*=====================================
             * GLOBAL COUNT
             *=====================================*/

            loadedComponents =
                totalComponents;


            /*=====================================
             * RESOLVE PROMISE
             *=====================================*/

            resolveComponentLoaderReady();


            /*=====================================
             * LOG
             *=====================================*/

            console.log(
                "✅ All components loaded"
            );

        })


        .catch(error => {


            console.error(
                "❌ Component loader failed:",
                error
            );


            /*
                Resolve instead of completely
                killing the application.

                This allows main.js to continue.
            */

            componentsLoaded =
                true;


            window.componentsLoaded =
                true;


            window.allComponentsLoaded =
                true;


            resolveComponentLoaderReady();

        });


    return window.componentLoaderReady;

}


/*=====================================*
 * DOM READY
 *=====================================*/

function initializeComponentLoader() {


    startComponentLoader();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(

        "DOMContentLoaded",

        initializeComponentLoader,

        {
            once: true
        }

    );

}
else {

    initializeComponentLoader();

}


/*=====================================*
 * EXPORT
 *=====================================*/

window.loadSection =
    loadSection;

window.registerComponent =
    registerComponent;

window.startComponentLoader =
    startComponentLoader;

window.componentLoaderReady =
    window.componentLoaderReady;