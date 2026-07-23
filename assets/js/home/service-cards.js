
/* =========================
   SERVICE CARD TEXT
========================= */

function updateServiceText() {

    const service1 = document.getElementById("service1-text");
    const service2 = document.getElementById("service2-text");
    const service3 = document.getElementById("service3-text");
    const service4 = document.getElementById("service4-text");
    const service5 = document.getElementById("service5-text");
    const service6 = document.getElementById("service6-text");

    if (
        !service1 ||
        !service2 ||
        !service3 ||
        !service4 ||
        !service5 ||
        !service6
    ) return;

    if (window.innerWidth > 430) {

        service1.textContent =
            "Reliable transportation of medical equipment, pharmaceuticals, and essential healthcare supplies with speed and care.";

        service2.textContent =
            "Temperature-controlled logistics that protect vaccines, laboratory samples, and other sensitive medical products.";

        service3.textContent =
            "Efficient inventory solutions that improve stock visibility, reduce waste, and keep healthcare facilities supplied.";

        service4.textContent =
            "Secure and compliant handling of medical information and sensitive healthcare shipments you can trust.";

        service5.textContent =
            "Fast emergency delivery services for critical medical supplies whenever urgent response is required.";

        service6.textContent =
            "Advanced real-time tracking that keeps you informed from pickup through safe and timely delivery.";

    } else {

        service1.textContent = "Safe medical transport.";
        service2.textContent = "Cold-chain delivery.";
        service3.textContent = "Inventory solutions.";
        service4.textContent = "Secure & compliant.";
        service5.textContent = "Emergency response.";
        service6.textContent = "Live shipment tracking.";

    }

}

/* =========================
   SERVICE CARD SCROLL REVEAL
========================= */

function initServiceAnimation() {

    const cards = document.querySelectorAll(
        ".service__card, .service__card-first, .service__card-last"
    );

    if (cards.length === 0) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));

}

/* =========================
   WAIT FOR SERVICES TO LOAD
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const waitForServices = setInterval(() => {

        const services = document.querySelector(".services");

        if (!services) return;

        clearInterval(waitForServices);

        updateServiceText();
        initServiceAnimation();

    }, 100);

});

/* =========================
   UPDATE TEXT ON RESIZE
========================= */

window.addEventListener("resize", updateServiceText);