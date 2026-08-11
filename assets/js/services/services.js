/*====================================*
        SERVICES
*=====================================*/

function initServices() {

    console.log("✅ Services initialized");


    /*=====================================
            SERVICES HERO
    =====================================*/

    initServicesHero();


    /*=====================================
            OVERVIEW
    =====================================*/

    initOverview();


    /*=====================================
            CORE SERVICES
    =====================================*/

    initCoreServices();


    /*=====================================
            PROCESS
    =====================================*/

    initProcess();


    /*=====================================
            FAQ
    =====================================*/

    initFAQ();

}


/*====================================*
        SERVICES HERO
*=====================================*/

function initServicesHero() {

    /*
        Services hero JavaScript
        Add hero functionality here
        when needed.
    */

}


/*====================================*
        OVERVIEW
*=====================================*/

function initOverview() {

    /*
        Overview animation
        Add overview functionality here
        when needed.
    */

}


/*====================================*
        CORE SERVICES
*=====================================*/

function initCoreServices() {

    /*
        Core services functionality
        Add service-card functionality here
        when needed.
    */

}


/*====================================*
        PROCESS
*=====================================*/

function initProcess() {

    /*
        Timeline animation

        Process cards
    */

}


/*====================================*
        FAQ
*=====================================*/

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    /*
        No FAQ section on this page
    */

    if (!faqItems.length) {

        return;

    }


    faqItems.forEach(
        function (item) {

            const question =
                item.querySelector(
                    ".faq-question"
                );


            /*
                Make sure the question
                actually exists.
            */

            if (!question) {

                return;

            }


            question.addEventListener(
                "click",
                function () {


                    /*
                        Close all other FAQs
                    */

                    faqItems.forEach(
                        function (faq) {

                            if (
                                faq !== item
                            ) {

                                faq.classList.remove(
                                    "active"
                                );

                            }

                        }
                    );


                    /*
                        Toggle current FAQ
                    */

                    item.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );


    console.log(
        "✅ FAQ initialized"
    );

}


/*====================================*
        EXPORT
*=====================================*/

window.initServices =
    initServices;