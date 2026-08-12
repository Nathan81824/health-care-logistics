/*====================================*
        FAQ
*=====================================*/

let faqInitialized = false;


/*====================================*
        INITIALIZE FAQ
*=====================================*/

function initFAQ() {

    /*
        Prevent duplicate initialization
    */

    if (faqInitialized) {

        return;

    }


    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    /*
        No FAQ items on this page
    */

    if (!faqItems.length) {

        console.log(
            "⚠️ No FAQ items found"
        );

        return;

    }


    console.log(
        `✅ FAQ initialized: ${faqItems.length} items`
    );


    /*=================================
            FAQ CLICK EVENTS
    =================================*/

    faqItems.forEach(
        function (item) {

            const question =
                item.querySelector(
                    ".faq-question"
                );


            if (!question) {

                return;

            }


            question.addEventListener(
                "click",
                function () {

                    /*
                        Check if this FAQ
                        is currently open
                    */

                    const isActive =
                        item.classList.contains(
                            "active"
                        );


                    /*=================================
                            CLOSE ALL
                    =================================*/

                    faqItems.forEach(
                        function (faq) {

                            faq.classList.remove(
                                "active"
                            );


                            const icon =
                                faq.querySelector(
                                    ".faq-question i"
                                );


                            if (icon) {

                                icon.classList.remove(
                                    "fa-minus"
                                );

                                icon.classList.add(
                                    "fa-plus"
                                );

                            }

                        }
                    );


                    /*=================================
                            OPEN CLICKED FAQ
                    =================================*/

                    if (!isActive) {

                        item.classList.add(
                            "active"
                        );


                        const currentIcon =
                            item.querySelector(
                                ".faq-question i"
                            );


                        if (currentIcon) {

                            currentIcon.classList.remove(
                                "fa-plus"
                            );

                            currentIcon.classList.add(
                                "fa-minus"
                            );

                        }

                    }

                }
            );

        }
    );


    /*=================================
            INITIAL OPEN FAQ
    =================================*/

    const firstActive =
        document.querySelector(
            ".faq-item.active"
        );


    if (firstActive) {

        const icon =
            firstActive.querySelector(
                ".faq-question i"
            );


        if (icon) {

            icon.classList.remove(
                "fa-plus"
            );

            icon.classList.add(
                "fa-minus"
            );

        }

    }


    faqInitialized = true;

}


/*====================================*
        EXPORT
*=====================================*/

window.initFAQ =
    initFAQ;