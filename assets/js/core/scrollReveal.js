/*=====================================*
        SCROLL REVEAL
*=====================================*/

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    /*=================================
            NO ELEMENTS
    =================================*/

    if (!revealElements.length) {

        return;

    }


    /*=================================
            INTERSECTION OBSERVER
    =================================*/

    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            /*
                                Stop observing once
                                the element is revealed.
                            */

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    /*=================================
            OBSERVE ELEMENTS
    =================================*/

    revealElements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/*=====================================*
        EXPORT
*=====================================*/

window.initScrollReveal =
    initScrollReveal;


/*=====================================*
        READY MESSAGE
*=====================================*/

console.log(
    "✅ Scroll Reveal JS loaded"
);