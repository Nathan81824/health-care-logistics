/*====================================
            BASE PATH
=====================================*/

const basePath =
    window.location.pathname.toLowerCase().includes("/pages/")
        ? "../"
        : "";


/*====================================
            LOAD SECTION
=====================================*/

function loadSection(file, containerId, callback = null) {

    const container = document.getElementById(containerId);

    if (!container) return;

    fetch(file)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    `Failed to load ${file} (HTTP ${response.status})`
                );

            }

            return response.text();

        })

        .then(html => {

            container.innerHTML = html;

            if (typeof callback === "function") {

                callback();

            }

        })

        .catch(error => console.error(error));

}


/*====================================
            PAGE LOAD
=====================================*/

document.addEventListener("DOMContentLoaded", () => {



    /*=========================
            NAVBAR
    =========================*/

    loadSection(

        `${basePath}components/navbar.html`,

        "header-container",

        () => {

            if (typeof initProfile === "function") {

                initProfile();

            }

        }

    );



    /*=========================
            HOME PAGE
    =========================*/

    loadSection(

        `${basePath}components/home/hero.html`,

        "hero-container"

    );



    loadSection(

        `${basePath}components/home/services.html`,

        "services-container"

    );



    loadSection(

        `${basePath}components/home/why-choose-us.html`,

        "why-choose-us-container"

    );



    loadSection(

        `${basePath}components/home/how-it-works.html`,

        "how-it-works-container"

    );



    loadSection(

        `${basePath}components/home/operations.html`,

        "operations-container"

    );



    loadSection(

        `${basePath}components/home/industries.html`,

        "industries-container"

    );



    loadSection(

        `${basePath}components/home/testimonials.html`,

        "testimonials-container"

    );



    loadSection(

        `${basePath}components/home/cta.html`,

        "cta-container",

        () => {

            const logo1 = document.getElementById("logo1");

            const logo2 = document.getElementById("logo2");

            if (logo1) {

                logo1.textContent = "Healthcare Logistics";

            }

            if (logo2) {

                logo2.textContent = "Healthcare Logistics";

            }

            if (typeof initHome === "function") {

                initHome();

            }

        }

    );

        /*=========================
            ABOUT PAGE
    =========================*/

    loadSection(

        `${basePath}components/about/hero.html`,

        "about-hero-container"

    );



    loadSection(

        `${basePath}components/about/our-story.html`,

        "about-our-story-container"

    );



    loadSection(

        `${basePath}components/about/vision.html`,

        "about-vision-container"

    );



    loadSection(

        `${basePath}components/about/stats.html`,

        "about-stats-container"

    );



    loadSection(

        `${basePath}components/about/values.html`,

        "about-values-container"

    );



    loadSection(

        `${basePath}components/about/team.html`,

        "about-team-container",

        () => {

            if (typeof initAbout === "function") {

                initAbout();

            }

        }

    );



    /*=========================
            SERVICES PAGE
    =========================*/

    loadSection(

        `${basePath}components/services/hero.html`,

        "services-hero-container"

    );



    loadSection(

        `${basePath}components/services/overview.html`,

        "overview-container"

    );



    loadSection(

        `${basePath}components/services/core-services.html`,

        "core-services-container"

    );



    loadSection(

        `${basePath}components/services/process.html`,

        "process-container"

    );



    loadSection(

        `${basePath}components/services/faq.html`,

        "faq-container",

        () => {

            if (typeof initServices === "function") {

                initServices();

            }

        }

    );



    /*=========================
        INDUSTRIES PAGE
    =========================*/

    loadSection(

        `${basePath}components/industries-we-serve/hero.html`,

        "industries-hero-container"

    );



    loadSection(

        `${basePath}components/industries-we-serve/industries-overview.html`,

        "industries-overview-container"

    );



    loadSection(

        `${basePath}components/industries-we-serve/hospital.html`,

        "hospital-container"

    );



    loadSection(

        `${basePath}components/industries-we-serve/labotories.html`,

        "labotories-container"

    );



    loadSection(

        `${basePath}components/industries-we-serve/pharmacies.html`,

        "pharmacies-container"

    );



    loadSection(

        `${basePath}components/industries-we-serve/pharmaceutical-companies.html`,

        "pharmaceutical-companies-container"

    );



    loadSection(

        `${basePath}components/industries-we-serve/blood-bank.html`,

        "blood-bank-container"

    );



    loadSection(

        `${basePath}components/industries-we-serve/medical-suppliers.html`,

        "medical-suppliers-container",

        () => {

            if (typeof initIndustries === "function") {

                initIndustries();

            }

        }

    );

        /*=========================
            HIPAA PAGE
    =========================*/

    loadSection(

        `${basePath}components/hipaa/what-is-hipaa.html`,

        "what-is-hipaa-container"

    );



    loadSection(

        `${basePath}components/hipaa/our-commitments.html`,

        "hipaa-commitment-container"

    );



    loadSection(

        `${basePath}components/hipaa/hipaa-process.html`,

        "hipaa-process-container",

        () => {

            if (typeof initHipaa === "function") {

                initHipaa();

            }

        }

    );



    /*=========================
            CONTACT PAGE
    =========================*/

    loadSection(

        `${basePath}components/contact/hero.html`,

        "contact-hero-container"

    );



    loadSection(

        `${basePath}components/contact/contact-form.html`,

        "contact-form-container"

    );



    loadSection(

        `${basePath}components/contact/service-coverage.html`,

        "service-coverage-container"

    );



    loadSection(

        `${basePath}components/contact/map.html`,

        "map-container",

        () => {

            if (typeof initContact === "function") {

                initContact();

            }

        }

    );



    /*=========================
            AUTH PAGE
    =========================*/

    loadSection(

        `${basePath}components/auth/auth.html`,

        "auth-container",

        () => {

            if (typeof initAuth === "function") {

                initAuth();

            }

        }

    );



    /*=========================
            FOOTER
    =========================*/

    loadSection(

        `${basePath}components/footer.html`,

        "footer-container"

    );



    /*=========================
            WHATSAPP
    =========================*/

    loadSection(

        `${basePath}components/whatsapp-button.html`,

        "whatsapp-container",

        () => {

            if (typeof initWhatsAppWidget === "function") {

                initWhatsAppWidget();

            }

        }

    );


});