/*=====================================
            INDUSTRIES
=====================================*/

function initIndustries() {

    console.log("Industries initialized.");

    updateIndustryText();

    initIndustryAnimation();

}


/*=====================================
        INDUSTRY TEXT
=====================================*/

function updateIndustryText() {

    const texts = [

        document.getElementById("industry1-text"),
        document.getElementById("industry2-text"),
        document.getElementById("industry3-text"),
        document.getElementById("industry4-text"),
        document.getElementById("industry5-text"),
        document.getElementById("industry6-text")

    ];

    if (texts.some(text => !text)) return;

    if (window.innerWidth > 430) {

        texts[0].textContent =
            "Reliable logistics solutions for hospitals, clinics and healthcare providers.";

        texts[1].textContent =
            "Safe transportation of laboratory samples and diagnostic specimens.";

        texts[2].textContent =
            "Secure pharmaceutical distribution with real-time tracking.";

        texts[3].textContent =
            "Dependable logistics for medical manufacturers and suppliers.";

        texts[4].textContent =
            "Temperature-controlled delivery for vaccines and biologics.";

        texts[5].textContent =
            "Rapid emergency medical logistics whenever every second counts.";

    } else {

        texts[0].textContent = "Hospital logistics.";
        texts[1].textContent = "Laboratory transport.";
        texts[2].textContent = "Pharmacy delivery.";
        texts[3].textContent = "Medical suppliers.";
        texts[4].textContent = "Cold chain.";
        texts[5].textContent = "Emergency response.";

    }

}


/*=====================================
        INDUSTRY ANIMATION
=====================================*/

function initIndustryAnimation() {

    const cards = document.querySelectorAll(".industry-card");

    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            } else {

                entry.target.classList.remove("show");

            }

        });

    }, {

        threshold: 0.2

    });

    cards.forEach((card) => {

        observer.observe(card);

    });

}


/*=====================================
        RESIZE
=====================================*/

if (!window.industryResizeBound) {

    window.addEventListener("resize", updateIndustryText);

    window.industryResizeBound = true;

}