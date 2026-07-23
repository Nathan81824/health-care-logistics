/*====================================
            SERVICES
=====================================*/

function initServices() {

    initServicesHero();

    initOverview();

    initCoreServices();

    initProcess();

    initFAQ();

}


/*====================================
        SERVICES HERO
=====================================*/

function initServicesHero() {

    // Hero JavaScript

}


/*====================================
        OVERVIEW
=====================================*/

function initOverview() {

    // Overview Animation

}


/*====================================
        CORE SERVICES
=====================================*/

function initCoreServices() {

    // Service Cards

    // Hover Effects

}


/*====================================
        PROCESS
=====================================*/

function initProcess() {

    // Timeline Animation

    // Process Cards

}


/*====================================
            FAQ
=====================================*/

function initFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            faqItems.forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}