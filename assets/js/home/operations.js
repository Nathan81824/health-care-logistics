/*=====================================
            OPERATIONS
=====================================*/

function initOperations() {

    console.log("Operations initialized.");

    initOperationAnimation();

}


/*=====================================
        OPERATION CARD ANIMATION
=====================================*/

function initOperationAnimation() {

    const cards = document.querySelectorAll(".operations-stat-card");

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

if (!window.operationsResizeBound) {

    window.addEventListener("resize", () => {

        initOperationAnimation();

    });

    window.operationsResizeBound = true;

}