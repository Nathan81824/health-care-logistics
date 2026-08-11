/*=====================================*
 * CONTACT FORM
 *=====================================*/

function initContactForm() {

    console.log("Contact form initialized.");


    /*=====================================
     * CONTACT FORM
     *=====================================*/

    const contactForm =
        document.querySelector(
            ".contact-form-card form"
        );


    if (!contactForm) {

        console.log(
            "Contact form not found."
        );

        return;

    }


    /*=====================================
     * PREVENT DUPLICATE INITIALIZATION
     *=====================================*/

    if (
        contactForm.dataset.initialized ===
        "true"
    ) {

        return;

    }


    contactForm.dataset.initialized =
        "true";


    /*=====================================
     * CONTACT BUTTON
     *=====================================*/

    const contactButton =
        contactForm.querySelector(
            ".contact-btn"
        );


    /*=====================================
     * FORM SUBMIT
     *=====================================*/

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            /*=====================================
             * GET FORM FIELDS
             *=====================================*/

            const fullName =
                contactForm.querySelector(
                    'input[type="text"]'
                );


            const email =
                contactForm.querySelector(
                    'input[type="email"]'
                );


            const phone =
                contactForm.querySelector(
                    'input[type="tel"]'
                );


            const service =
                contactForm.querySelector(
                    "select"
                );


            const message =
                contactForm.querySelector(
                    "textarea"
                );


            /*=====================================
             * REQUIRED FIELD CHECK
             *=====================================*/

            if (
                !fullName ||
                !email ||
                !message
            ) {

                console.error(
                    "❌ Required contact form fields are missing."
                );

                return;

            }


            if (
                fullName.value.trim() === "" ||
                email.value.trim() === "" ||
                message.value.trim() === ""
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
             * DISABLE BUTTON
             *=====================================*/

            if (contactButton) {

                contactButton.disabled =
                    true;


                contactButton.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Sending...
                `;

            }


            /*=====================================
             * SEND MESSAGE
             *=====================================*/

            setTimeout(() => {


                alert(
                    "Thank you! Your message has been sent successfully."
                );


                /*=====================================
                 * RESET FORM
                 *=====================================*/

                contactForm.reset();


                /*=====================================
                 * RESET INPUT STATES
                 *=====================================*/

                contactForm
                    .querySelectorAll(
                        "input, textarea, select"
                    )
                    .forEach(input => {

                        if (
                            input.parentElement
                        ) {

                            input.parentElement
                                .classList
                                .remove(
                                    "active"
                                );

                        }

                    });


                /*=====================================
                 * RESET BUTTON
                 *=====================================*/

                if (contactButton) {

                    contactButton.disabled =
                        false;


                    contactButton.innerHTML = `
                        Send Message
                        <i class="fa-solid fa-paper-plane"></i>
                    `;

                }


            }, 2000);

        }
    );


    /*=====================================
     * INPUT ANIMATION
     *=====================================*/

    const inputs =
        contactForm.querySelectorAll(
            "input, textarea, select"
        );


    inputs.forEach(input => {


        input.addEventListener(
            "focus",
            () => {

                if (
                    input.parentElement
                ) {

                    input.parentElement
                        .classList
                        .add(
                            "active"
                        );

                }

            }
        );


        input.addEventListener(
            "blur",
            () => {

                if (
                    input.value.trim() === ""
                ) {

                    if (
                        input.parentElement
                    ) {

                        input.parentElement
                            .classList
                            .remove(
                                "active"
                            );

                    }

                }

            }
        );

    });


    /*=====================================
     * INFO CARD HOVER
     *=====================================*/

    const infoCards =
        document.querySelectorAll(
            ".info-card"
        );


    infoCards.forEach(card => {


        card.addEventListener(
            "mouseenter",
            () => {

                card.style.transform =
                    "translateX(10px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    console.log(
        "✅ Contact form ready."
    );

}


/*=====================================*
 * EXPORT
 *=====================================*/

window.initContactForm =
    initContactForm;