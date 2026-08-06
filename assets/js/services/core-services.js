/*=====================================
        CORE SERVICES
=====================================*/

function initCoreServices() {

    console.log("Core Services initialized.");

    updateServiceText();

    initServiceAnimation();

}


/*=====================================
        SERVICE TEXT
=====================================*/

function updateServiceText() {

    const texts = [
        document.getElementById("service1-text"),
        document.getElementById("service2-text"),
        document.getElementById("service3-text"),
        document.getElementById("service4-text"),
        document.getElementById("service5-text"),
        document.getElementById("service6-text")
    ];

    if (window.innerWidth > 430) {

        if (texts[0]) {
            texts[0].textContent =
                "Safe and reliable transportation of medical equipment, laboratory samples, pharmaceuticals, and healthcare supplies.";
        }

        if (texts[1]) {
            texts[1].textContent =
                "Temperature-controlled transportation for vaccines, blood products, medicines, and biological samples.";
        }

        if (texts[2]) {
            texts[2].textContent =
                "Efficient inventory storage, organization, monitoring, and distribution for healthcare facilities.";
        }

        if (texts[3]) {
            texts[3].textContent =
                "Immediate response logistics for urgent medical deliveries where every minute matters.";
        }

        if (texts[4]) {
            texts[4].textContent =
                "Monitor every shipment throughout its journey with accurate live updates and delivery notifications.";
        }

        if (texts[5]) {
            texts[5].textContent =
                "We follow strict healthcare standards to ensure confidentiality, security, and compliance in every delivery.";
        }

    } else {

        if (texts[0]) texts[0].textContent = "Medical transport.";
        if (texts[1]) texts[1].textContent = "Cold chain delivery.";
        if (texts[2]) texts[2].textContent = "Inventory management.";
        if (texts[3]) texts[3].textContent = "Emergency delivery.";
        if (texts[4]) texts[4].textContent = "Live tracking.";
        if (texts[5]) texts[5].textContent = "HIPAA compliant.";

    }

}


/*=====================================
        CARD ANIMATION
=====================================*/

function initServiceAnimation() {

    const cards = document.querySelectorAll(".service-card");

    console.log("Service cards found:", cards.length);

    if (!cards.length) return;

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

    cards.forEach(card => observer.observe(card));

}


/*=====================================
        RESIZE
=====================================*/

if (!window.coreServicesResizeBound) {

    window.addEventListener("resize", updateServiceText);

    window.coreServicesResizeBound = true;

}