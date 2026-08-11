/*=====================================*
 * CONTACT
 *=====================================*/

function initContact() {

    console.log("Contact initialized.");


    initContactHero();

    initContactForm();

    initContactFAQ();

    initServiceCoverage();

    initContactMap();

}


/*=====================================*
 * CONTACT HERO
 *=====================================*/

function initContactHero() {

    const hero =
        document.querySelector(
            ".contact-hero"
        );


    if (!hero) return;


    hero.classList.add(
        "loaded"
    );

}


/*=====================================*
 * CONTACT FORM
 *=====================================*/

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    /*
        Prevent duplicate
        submit listeners.
    */

    if (
        form.dataset.initialized ===
        "true"
    ) {

        return;

    }


    form.dataset.initialized =
        "true";


    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            /*=====================================
             * FORM FIELDS
             *=====================================*/

            const name =
                form.querySelector(
                    "#name"
                );


            const email =
                form.querySelector(
                    "#email"
                );


            const phone =
                form.querySelector(
                    "#phone"
                );


            const service =
                form.querySelector(
                    "#service"
                );


            const message =
                form.querySelector(
                    "#message"
                );


            /*=====================================
             * CHECK FIELDS EXIST
             *=====================================*/

            if (
                !name ||
                !email ||
                !phone ||
                !service ||
                !message
            ) {

                console.error(
                    "❌ Contact form fields are missing."
                );

                return;

            }


            /*=====================================
             * REQUIRED FIELD VALIDATION
             *=====================================*/

            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !phone.value.trim() ||
                !service.value ||
                !message.value.trim()
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            /*=====================================
             * EMAIL VALIDATION
             *=====================================*/

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (
                !emailPattern.test(
                    email.value.trim()
                )
            ) {

                alert(
                    "Please enter a valid email address."
                );

                email.focus();

                return;

            }


            /*=====================================
             * PHONE VALIDATION
             *=====================================*/

            const phonePattern =
                /^[0-9+\-\s()]{7,20}$/;


            if (
                !phonePattern.test(
                    phone.value.trim()
                )
            ) {

                alert(
                    "Please enter a valid phone number."
                );

                phone.focus();

                return;

            }


            /*=====================================
             * SUBMIT BUTTON
             *=====================================*/

            const submitButton =
                form.querySelector(
                    'button[type="submit"], .contact-btn'
                );


            if (submitButton) {

                submitButton.disabled =
                    true;


                submitButton.dataset.originalText =
                    submitButton.innerHTML;


                submitButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Sending...
                `;

            }


            /*=====================================
             * SIMULATED SUBMISSION
             *=====================================*/

            setTimeout(() => {


                alert(
                    "Thank you! Your message has been sent successfully."
                );


                /*=====================================
                 * RESET FORM
                 *=====================================*/

                form.reset();


                /*=====================================
                 * RESET BUTTON
                 *=====================================*/

                if (submitButton) {

                    submitButton.disabled =
                        false;


                    submitButton.innerHTML =
                        submitButton.dataset
                            .originalText ||
                        `
                            Send Message
                            <i class="fa-solid fa-paper-plane"></i>
                        `;

                }


            }, 1500);

        }
    );

}


/*=====================================*
 * CONTACT FAQ
 *=====================================*/

function initContactFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    if (!faqItems.length) return;


    faqItems.forEach(item => {


        /*
            Prevent duplicate
            initialization.
        */

        if (
            item.dataset.faqInitialized ===
            "true"
        ) {

            return;

        }


        item.dataset.faqInitialized =
            "true";


        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) return;


        question.addEventListener(
            "click",
            () => {


                faqItems.forEach(
                    faq => {

                        if (
                            faq !== item
                        ) {

                            faq.classList.remove(
                                "active"
                            );

                        }

                    }
                );


                item.classList.toggle(
                    "active"
                );

            }
        );

    });

}


/*=====================================*
 * SERVICE COVERAGE
 *=====================================*/

function initServiceCoverage() {

    const cards =
        document.querySelectorAll(
            ".coverage-card"
        );


    if (!cards.length) return;


    cards.forEach(
        (card, index) => {


            card.style.transitionDelay =
                `${index * 0.15}s`;


            /*
                Add reveal observer
                if supported.
            */

            if (
                "IntersectionObserver"
                in window
            ) {

                if (
                    card.dataset.coverageInitialized ===
                    "true"
                ) {

                    return;

                }


                card.dataset.coverageInitialized =
                    "true";


                const observer =
                    new IntersectionObserver(
                        (entries) => {

                            entries.forEach(
                                entry => {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        entry.target.classList.add(
                                            "show"
                                        );


                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.2
                        }
                    );


                observer.observe(
                    card
                );

            }

        }
    );

}


/*=====================================*
 * GOOGLE MAP
 *=====================================*/

function initContactMap() {

    const iframe =
        document.querySelector(
            ".contact-map iframe"
        );


    if (!iframe) return;


    iframe.setAttribute(
        "loading",
        "lazy"
    );


    iframe.setAttribute(
        "title",
        "Contact location map"
    );


    iframe.setAttribute(
        "referrerpolicy",
        "no-referrer-when-downgrade"
    );

}


/*=====================================*
 * EXPORT
 *=====================================*/

window.initContact =
    initContact;


window.initContactHero =
    initContactHero;


window.initContactForm =
    initContactForm;


window.initContactFAQ =
    initContactFAQ;


window.initServiceCoverage =
    initServiceCoverage;


window.initContactMap =
    initContactMap;