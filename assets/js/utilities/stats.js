/*=====================================*
        STATS JS
        stats.js

        PURPOSE:
        - Animate statistic numbers
        - Start animation when stats
          enter the viewport
        - Prevent duplicate animations
        - Support values such as:
          1500+
          100+
          99.9%
*=====================================*/


/*=====================================*
        INITIALIZE STATS
*=====================================*/

function initStats() {

    console.log("📊 Stats initialized");


    /*=====================================
            FIND STAT NUMBERS
    =====================================*/

    const stats =
        document.querySelectorAll(
            ".stat-number"
        );


    /*=====================================
            SAFETY CHECK
    =====================================*/

    if (!stats.length) {

        console.log(
            "⚠️ No stat numbers found."
        );

        return;

    }


    /*=====================================
            PREVENT DUPLICATE SETUP
    =====================================*/

    stats.forEach(
        stat => {

            if (
                stat.dataset.statsReady ===
                "true"
            ) {

                return;

            }


            stat.dataset.statsReady =
                "true";

        }
    );


    /*=====================================
            ANIMATE NUMBER
    =====================================*/

    function animateNumber(
        element
    ) {

        /*=================================
                PREVENT REPEAT
        =================================*/

        if (
            element.dataset.animated ===
            "true"
        ) {

            return;

        }


        element.dataset.animated =
            "true";


        /*=================================
                GET ORIGINAL VALUE
        =================================*/

        const originalValue =
            element.dataset.target ||
            element.textContent.trim();


        /*=================================
                DETECT DECIMAL
        =================================*/

        const hasDecimal =
            originalValue.includes(
                "."
            );


        /*=================================
                EXTRACT NUMBER
        =================================*/

        const target =
            parseFloat(
                originalValue.replace(
                    /[^0-9.]/g,
                    ""
                )
            );


        /*=================================
                SAFETY CHECK
        =================================*/

        if (
            isNaN(target)
        ) {

            console.warn(
                "⚠️ Invalid stat value:",
                originalValue
            );

            return;

        }


        /*=================================
                DETECT SUFFIX
        =================================*/

        let suffix = "";


        if (
            originalValue.includes("%")
        ) {

            suffix = "%";

        }

        else if (
            originalValue.includes("+")
        ) {

            suffix = "+";

        }


        /*=================================
                ANIMATION SETTINGS
        =================================*/

        const duration =
            1500;


        const startValue =
            0;


        const startTime =
            performance.now();


        /*=================================
                UPDATE NUMBER
        =================================*/

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


            /*=================================
                    SMOOTH EASING
            =================================*/

            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                startValue +
                (
                    target -
                    startValue
                ) *
                easedProgress;


            /*=================================
                    FORMAT NUMBER
            =================================*/

            let displayValue;


            if (
                hasDecimal
            ) {

                displayValue =
                    currentValue.toFixed(
                        1
                    );

            }

            else {

                displayValue =
                    Math.floor(
                        currentValue
                    );

            }


            /*=================================
                    UPDATE ELEMENT
            =================================*/

            element.textContent =
                displayValue +
                suffix;


            /*=================================
                    CONTINUE
            =================================*/

            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    updateNumber
                );

            }

            else {

                /*
                    Make sure the final
                    value is exact.
                */

                element.textContent =
                    hasDecimal
                        ? target.toFixed(1) +
                          suffix
                        : target +
                          suffix;

            }

        }


        /*=================================
                START ANIMATION
        =================================*/

        requestAnimationFrame(
            updateNumber
        );

    }


    /*=====================================*
            INTERSECTION OBSERVER
    *=====================================*/

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                (
                    entries,
                    observerInstance
                ) => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const element =
                                entry.target;


                            animateNumber(
                                element
                            );


                            observerInstance.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold: 0.4
                }
            );


        /*=================================
                OBSERVE ALL STATS
        =================================*/

        stats.forEach(
            stat => {

                observer.observe(
                    stat
                );

            }
        );

    }

    else {

        /*
            Fallback for browsers
            without IntersectionObserver.
        */

        stats.forEach(
            stat => {

                animateNumber(
                    stat
                );

            }
        );

    }


    console.log(
        "✅ Stats animation ready"
    );

}


/*=====================================*
        EXPORT
*=====================================*/

window.initStats =
    initStats;


/*=====================================*
        LOADED
*=====================================*/

console.log(
    "✅ Stats JS loaded"
);