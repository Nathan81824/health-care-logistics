/*====================================
        CONTACT FORM
=====================================*/

function initContactForm() {

    const contactForm = document.querySelector(".contact-form-card form");

    if (!contactForm) return;

    const contactButton = contactForm.querySelector(".contact-btn");

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const fullName = contactForm.querySelector('input[type="text"]');
        const email = contactForm.querySelector('input[type="email"]');
        const phone = contactForm.querySelector('input[type="tel"]');
        const service = contactForm.querySelector("select");
        const message = contactForm.querySelector("textarea");

        if (
            fullName.value.trim() === "" ||
            email.value.trim() === "" ||
            message.value.trim() === ""
        ) {

            alert("Please fill in all required fields.");

            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.value)) {

            alert("Please enter a valid email address.");

            return;

        }

        contactButton.disabled = true;

        contactButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Sending...
        `;

        setTimeout(() => {

            alert("Thank you! Your message has been sent successfully.");

            contactForm.reset();

            contactButton.disabled = false;

            contactButton.innerHTML = `
                Send Message
                <i class="fa-solid fa-paper-plane"></i>
            `;

        }, 2000);

    });


    /*=========================
        INPUT ANIMATION
    =========================*/

    const inputs = contactForm.querySelectorAll(
        "input, textarea, select"
    );

    inputs.forEach(input => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add("active");

        });

        input.addEventListener("blur", () => {

            if (input.value.trim() === "") {

                input.parentElement.classList.remove("active");

            }

        });

    });


    /*=========================
        INFO CARD HOVER
    =========================*/

    document.querySelectorAll(".info-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateX(10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateX(0)";

        });

    });

}