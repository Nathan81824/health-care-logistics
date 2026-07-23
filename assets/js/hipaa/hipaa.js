/*====================================
            HIPAA
=====================================*/

function initHipaa() {

    initWhatIsHipaa();

    initCommitmentTimeline();

    initHipaaProcess();

}


/*====================================
        WHAT IS HIPAA
=====================================*/

function initWhatIsHipaa() {

    const section = document.querySelector(".what-is-hipaa");

    if (!section) return;

    section.classList.add("loaded");

}


/*====================================
    COMMITMENT TIMELINE
=====================================*/

function initCommitmentTimeline() {

    const items = document.querySelectorAll(".timeline-item");

    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry, index) => {

            if (entry.isIntersecting) {

                setTimeout(() => {

                    entry.target.classList.add("show");

                }, index * 200);

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.2

    });

    items.forEach(item => {

        observer.observe(item);

    });

}


/*====================================
        HIPAA PROCESS
=====================================*/

function initHipaaProcess() {

    const processCards = document.querySelectorAll(".process-card");

    if (!processCards.length) return;

    processCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.15}s`;

    });

}