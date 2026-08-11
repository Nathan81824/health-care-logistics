/*=====================================*
* ABOUT
*=====================================*/


/*=====================================*
* ABOUT INITIALIZATION
*=====================================*/

function initAbout() {

    console.log(
        "About page initialized."
    );


    initAboutHero();

    initOurStory();

    initVision();

    initStats();

    initValues();

    initTeam();

}


/*=====================================*
* ABOUT HERO
*=====================================*/

function initAboutHero() {

    const hero =
        document.querySelector(
            ".about-hero"
        );


    if (!hero) {

        return;

    }


    hero.classList.add(
        "loaded"
    );

}


/*=====================================*
* OUR STORY
*=====================================*/

function initOurStory() {

    const section =
        document.querySelector(
            ".our-story"
        );


    if (!section) {

        return;

    }


    section.classList.add(
        "loaded"
    );

}


/*=====================================*
* VISION
*=====================================*/

function initVision() {

    const section =
        document.querySelector(
            ".vision-section"
        );


    if (!section) {

        return;

    }


    section.classList.add(
        "loaded"
    );

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


/*=====================================*
* VALUES
*=====================================*/

function initValues() {

    const cards =
        document.querySelectorAll(
            ".value-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 0.1}s`;

            card.classList.add(
                "loaded"
            );

        }
    );

}


/*=====================================*
* TEAM
*=====================================*/

function initTeam() {

    const cards =
        document.querySelectorAll(
            ".team-card"
        );


    if (!cards.length) {

        return;

    }


    cards.forEach(
        (card, index) => {

            card.style.transitionDelay =
                `${index * 0.1}s`;

            card.classList.add(
                "loaded"
            );

        }
    );

}


/*=====================================*
* EXPORT
*=====================================*/

window.initAbout =
    initAbout;


window.initAboutHero =
    initAboutHero;


window.initOurStory =
    initOurStory;


window.initVision =
    initVision;


window.initStats =
    initStats;


window.initValues =
    initValues;


window.initTeam =
    initTeam;


/*=====================================*
* READY
*=====================================*/

console.log(
    "✅ About system loaded"
);