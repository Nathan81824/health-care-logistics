/*=====================================*
 * FOOTER
 *=====================================*/

function initFooter() {

    console.log(
        "✅ Footer initialized."
    );


    initFooterReveal();

    initFooterYear();

    initBackToTop();

    initFooterNewsletter();

}


/*=====================================*
 * FOOTER REVEAL
 *=====================================*/

function initFooterReveal() {

    const footer =
        document.querySelector(
            ".site-footer"
        );


    /*=====================================
            NO FOOTER
    =====================================*/

    if (!footer) {

        return;

    }


    /*=====================================
            PREVENT DUPLICATE OBSERVER
    =====================================*/

    if (
        footer.dataset.revealInitialized ===
        "true"
    ) {

        return;

    }


    footer.dataset.revealInitialized =
        "true";


    /*=====================================
            CHECK OBSERVER SUPPORT
    =====================================*/

    if (
        typeof IntersectionObserver ===
        "undefined"
    ) {

        footer.classList.add(
            "show"
        );

        return;

    }


    /*=====================================
            CREATE OBSERVER
    =====================================*/

    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                        }
                        else {

                            entry.target.classList.remove(
                                "show"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    /*=====================================
            OBSERVE FOOTER
    =====================================*/

    observer.observe(
        footer
    );


    window.footerRevealObserver =
        observer;

}


/*=====================================*
 * FOOTER YEAR
 *=====================================*/

function initFooterYear() {

    const yearElement =
        document.getElementById(
            "footer-year"
        );


    /*=====================================
            NO YEAR ELEMENT
    =====================================*/

    if (!yearElement) {

        return;

    }


    yearElement.textContent =
        new Date().getFullYear();

}


/*=====================================*
 * BACK TO TOP
 *=====================================*/

function initBackToTop() {

    const backToTop =
        document.getElementById(
            "footer-back-to-top"
        );


    /*=====================================
            NO BUTTON
    =====================================*/

    if (!backToTop) {

        return;

    }


    /*=====================================
            PREVENT DUPLICATE EVENTS
    =====================================*/

    if (
        backToTop.dataset.initialized ===
        "true"
    ) {

        return;

    }


    backToTop.dataset.initialized =
        "true";


    /*=====================================
            SCROLL HANDLER
    =====================================*/

    function handleScroll() {

        if (
            window.scrollY >
            450
        ) {

            backToTop.classList.add(
                "show"
            );

        }
        else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    /*=====================================
            INITIAL CHECK
    =====================================*/

    handleScroll();


    /*=====================================
            LISTEN FOR SCROLL
    =====================================*/

    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /*=====================================
            CLICK
    =====================================*/

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/*=====================================*
 * NEWSLETTER
 *=====================================*/

function initFooterNewsletter() {

    const form =
        document.getElementById(
            "footer-newsletter-form"
        );


    const emailInput =
        document.getElementById(
            "footer-email"
        );


    const message =
        document.getElementById(
            "footer-form-message"
        );


    /*=====================================
            CHECK ELEMENTS
    =====================================*/

    if (
        !form ||
        !emailInput ||
        !message
    ) {

        return;

    }


    /*=====================================
            PREVENT DUPLICATE EVENTS
    =====================================*/

    if (
        form.dataset.initialized ===
        "true"
    ) {

        return;

    }


    form.dataset.initialized =
        "true";


    /*=====================================
            SUBMIT
    =====================================*/

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();


            /*=================================
                    EMPTY EMAIL
            =================================*/

            if (!email) {

                message.textContent =
                    "Please enter your email address.";

                message.style.color =
                    "#f87171";

                emailInput.focus();

                return;

            }


            /*=================================
                    EMAIL VALIDATION
            =================================*/

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email
                )
            ) {

                message.textContent =
                    "Please enter a valid email address.";

                message.style.color =
                    "#f87171";

                emailInput.focus();

                return;

            }


            /*=================================
                    SUCCESS
            =================================*/

            message.textContent =
                "Thanks! You're subscribed.";

            message.style.color =
                "#20aeea";


            /*=================================
                    CLEAR INPUT
            =================================*/

            emailInput.value = "";


            /*=================================
                    CLEAR MESSAGE
                    AFTER DELAY
            =================================*/

            setTimeout(
                function () {

                    message.textContent =
                        "";

                },
                4000
            );

        }
    );

}


/*=====================================*
 * RESIZE
 *=====================================*/

if (
    !window.footerResizeBound
) {

    window.addEventListener(
        "resize",
        function () {

            /*
                Footer does not require
                a new observer on resize.

                IntersectionObserver and
                CSS handle responsiveness.
            */

        }
    );


    window.footerResizeBound =
        true;

}


/*=====================================*
 * EXPORT
 *=====================================*/

window.initFooter =
    initFooter;

window.initFooterReveal =
    initFooterReveal;

window.initFooterYear =
    initFooterYear;

window.initBackToTop =
    initBackToTop;

window.initFooterNewsletter =
    initFooterNewsletter;

