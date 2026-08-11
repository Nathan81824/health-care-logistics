/*=====================================*
* SERVICE COVERAGE
*=====================================*/

function initServiceCoverage() {

    animateCoverageItems();

    animateStatCards();

    initCoverageHover();

}


/*=====================================*
* COVERAGE ITEMS
*=====================================*/

function animateCoverageItems() {

    const items =
        document.querySelectorAll(
            ".coverage-item"
        );

    if (!items.length) return;


    items.forEach((item, index) => {

        /*=====================================
        INITIAL STATE
        =====================================*/

        item.style.opacity = "0";

        item.style.transform =
            "translateY(40px)";


        /*=====================================
        REVEAL ANIMATION
        =====================================*/

        setTimeout(() => {

            item.style.transition =
                "opacity .6s ease, transform .6s ease";

            item.style.opacity = "1";

            item.style.transform =
                "translateY(0)";

        }, index * 120);

    });

}


/*=====================================*
* FLOATING STAT CARDS
*=====================================*/

function animateStatCards() {

    const cards =
        document.querySelectorAll(
            ".stat-card"
        );

    if (!cards.length) return;


    cards.forEach((card, index) => {

        /*=====================================
        PREVENT DUPLICATE ANIMATION
        =====================================*/

        if (
            card.dataset.floatStarted ===
            "true"
        ) {

            return;

        }


        card.dataset.floatStarted =
            "true";


        let direction = 1;


        /*=====================================
        FLOAT ANIMATION
        =====================================*/

        const floatCard = () => {

            card.style.transform =
                `translateY(${direction * 6}px)`;

            direction *= -1;

        };


        const interval =
            setInterval(
                floatCard,
                1800 + (index * 200)
            );


        /*
            Store interval so it can
            be cleaned up later if needed.
        */

        card.dataset.floatInterval =
            interval;

    });

}


/*=====================================*
* COVERAGE HOVER
*=====================================*/

function initCoverageHover() {

    const items =
        document.querySelectorAll(
            ".coverage-item"
        );

    if (!items.length) return;


    items.forEach(item => {

        /*=====================================
        MOUSE ENTER
        =====================================*/

        item.addEventListener(
            "mouseenter",
            () => {

                item.style.transform =
                    "translateY(-8px) scale(1.02)";

            }
        );


        /*=====================================
        MOUSE LEAVE
        =====================================*/

        item.addEventListener(
            "mouseleave",
            () => {

                item.style.transform =
                    "translateY(0)";

            }
        );

    });

}


/*=====================================*
* EXPORT
*=====================================*/

window.initServiceCoverage =
    initServiceCoverage;

window.animateCoverageItems =
    animateCoverageItems;

window.animateStatCards =
    animateStatCards;

window.initCoverageHover =
    initCoverageHover;