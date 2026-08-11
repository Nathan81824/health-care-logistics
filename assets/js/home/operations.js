/*=====================================*
        OPERATIONS
*=====================================*/

function initOperations() {

    console.log(
        "✅ Operations initialized."
    );


    initOperationAnimation();

}


/*=====================================*
        OPERATION CARD ANIMATION
*=====================================*/

function initOperationAnimation() {

    const cards =
        document.querySelectorAll(
            ".operations-stat-card"
        );


    /*=====================================
            NO CARDS
    =====================================*/

    if (
        cards.length === 0
    ) {

        return;

    }


    /*=====================================
            CHECK OBSERVER SUPPORT
    =====================================*/

    if (
        typeof IntersectionObserver ===
        "undefined"
    ) {

        cards.forEach(
            function (card) {

                card.classList.add(
                    "show"
                );

            }
        );

        return;

    }


    /*=====================================
            PREVENT DUPLICATE OBSERVER
    =====================================*/

    if (
        window.operationsObserver
    ) {

        return;

    }


    /*=====================================
            CREATE OBSERVER
    =====================================*/

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                        }
                        else {

                            entry.target.classList.remove(
                                "show"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.2
            }
        );


    /*=====================================
            OBSERVE CARDS
    =====================================*/

    cards.forEach(
        function (card) {

            observer.observe(
                card
            );

        }
    );


    window.operationsObserver =
        observer;

}


/*=====================================*
        RESIZE
*=====================================*/

if (
    !window.operationsResizeBound
) {

    window.addEventListener(
        "resize",
        function () {

            /*
                We don't need to create
                another observer on resize.

                The existing IntersectionObserver
                automatically handles the cards.
            */

        }
    );


    window.operationsResizeBound =
        true;

}


/*=====================================*
        EXPORT
*=====================================*/

window.initOperations =
    initOperations;

window.initOperationAnimation =
    initOperationAnimation;