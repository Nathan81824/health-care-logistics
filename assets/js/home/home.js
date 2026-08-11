/*=====================================
            HOME PAGE
=====================================*/

function initHome() {

    console.log("Home page initialized.");

}
/*=====================================*
* STATS
*=====================================*/

function initStats() {

    const stats =
        document.querySelectorAll(
            ".stat-number"
        );


    if (!stats.length) {

        return;

    }


    /*=================================
            NUMBER ANIMATION
    =================================*/

    const animateNumber = (
        element
    ) => {

        const target =
            parseInt(
                element.dataset.target ||
                element.textContent.replace(
                    /\D/g,
                    ""
                ),
                10
            );


        if (
            isNaN(target)
        ) {

            return;

        }


        const duration = 1500;

        const startTime =
            performance.now();


        function updateNumber(
            currentTime
        ) {

            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const currentValue =
                Math.floor(
                    progress * target
                );


            element.textContent =
                currentValue;


            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    updateNumber
                );

            }
            else {

                element.textContent =
                    target;

            }

        }


        requestAnimationFrame(
            updateNumber
        );

    };


    /*=================================
            STATS OBSERVER
    =================================*/

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        const element =
                            entry.target;


                        if (
                            element.dataset.animated ===
                            "true"
                        ) {

                            return;

                        }


                        element.dataset.animated =
                            "true";


                        animateNumber(
                            element
                        );


                        observer.unobserve(
                            element
                        );

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    stats.forEach(
        stat => {

            observer.observe(
                stat
            );

        }
    );

}
