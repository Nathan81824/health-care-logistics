/*====================================
            CONTACT
=====================================*/

function initContact() {

    initContactHero();

    initContactForm();

    initContactFAQ();

    initServiceCoverage();

    initContactMap();

}


/*====================================
        CONTACT HERO
=====================================*/

function initContactHero() {

    const hero = document.querySelector(".contact-hero");

    if (!hero) return;

    hero.classList.add("loaded");

}


/*====================================
        CONTACT FORM
=====================================*/

function initContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const phone = form.querySelector("#phone");
        const service = form.querySelector("#service");
        const message = form.querySelector("#message");

        if (
            !name.value.trim() ||
            !email.value.trim() ||
            !phone.value.trim() ||
            !service.value ||
            !message.value.trim()
        ) {

            alert("Please fill in all required fields.");

            return;

        }

        alert("Thank you! Your message has been sent successfully.");

        form.reset();

    });

}


/*====================================
            FAQ
=====================================*/

function initContactFAQ() {

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


/*====================================
        SERVICE COVERAGE
=====================================*/

function initServiceCoverage() {

    const cards = document.querySelectorAll(".coverage-card");

    if (!cards.length) return;

    cards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.15}s`;

    });

}


/*====================================
        GOOGLE MAP
=====================================*/

function initContactMap() {

    const iframe = document.querySelector(".contact-map iframe");

    if (!iframe) return;

    iframe.setAttribute(
        "loading",
        "lazy"
    );

}