// ==========================================
// HOW WE WORK
// ==========================================

function initHowWeWork() {

    const section = document.querySelector(".how-work");

    if (!section) return;

    const cards = section.querySelectorAll(".step-card");
    const line = section.querySelector(".timeline-line");

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            // Animate timeline
            if (line) {

                line.style.transform = "scaleX(1)";

            }

            // Reveal cards
            cards.forEach((card, index) => {

                setTimeout(() => {

                    card.classList.add("show");

                }, index * 180);

            });

            observer.unobserve(section);

        });

    }, {
        threshold: 0.3
    });

    observer.observe(section);

}

document.addEventListener("DOMContentLoaded", initHowWeWork);console.log("How We Work initialized");