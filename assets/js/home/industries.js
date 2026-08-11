/*=====================================*
        INDUSTRIES
*=====================================*/

function initIndustries() {

    console.log(
        "✅ Industries initialized."
    );


    updateIndustryText();

    initIndustryAnimation();

}


/*=====================================*
        INDUSTRY TEXT
*=====================================*/

function updateIndustryText() {

    const texts = [

        document.getElementById(
            "industry1-text"
        ),

        document.getElementById(
            "industry2-text"
        ),

        document.getElementById(
            "industry3-text"
        ),

        document.getElementById(
            "industry4-text"
        ),

        document.getElementById(
            "industry5-text"
        ),

        document.getElementById(
            "industry6-text"
        )

    ];


    /*=====================================
            DESKTOP / TABLET
    =====================================*/

    if (
        window.innerWidth > 430
    ) {

        if (texts[0]) {

            texts[0].textContent =
                "Reliable logistics solutions for hospitals, clinics, and healthcare providers.";

        }


        if (texts[1]) {

            texts[1].textContent =
                "Safe transportation of laboratory samples and diagnostic specimens.";

        }


        if (texts[2]) {

            texts[2].textContent =
                "Secure pharmaceutical distribution with real-time tracking.";

        }


        if (texts[3]) {

            texts[3].textContent =
                "Dependable logistics for medical manufacturers and suppliers.";

        }


        if (texts[4]) {

            texts[4].textContent =
                "Temperature-controlled delivery for vaccines and biologics.";

        }


        if (texts[5]) {

            texts[5].textContent =
                "Rapid emergency medical logistics whenever every second counts.";

        }

    }


    /*=====================================
            MOBILE
    =====================================*/

    else {

        if (texts[0]) {

            texts[0].textContent =
                "Hospital logistics.";

        }


        if (texts[1]) {

            texts[1].textContent =
                "Laboratory transport.";

        }


        if (texts[2]) {

            texts[2].textContent =
                "Pharmacy delivery.";

        }


        if (texts[3]) {

            texts[3].textContent =
                "Medical suppliers.";

        }


        if (texts[4]) {

            texts[4].textContent =
                "Cold chain.";

        }


        if (texts[5]) {

            texts[5].textContent =
                "Emergency response.";

        }

    }

}


/*=====================================*
        INDUSTRY ANIMATION
*=====================================*/

function initIndustryAnimation() {

    const cards =
        document.querySelectorAll(
            ".industries-card"
        );


    console.log(
        "Industry cards found:",
        cards.length
    );


    /*=====================================
            NO CARDS
    =====================================*/

    if (
        !cards.length
    ) {

        return;

    }


    /*=====================================
            OBSERVER SUPPORT
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

                card.classList.add(
                    "finished"
                );

            }
        );

        return;

    }


    /*=====================================
            PREVENT DUPLICATE OBSERVER
    =====================================*/

    if (
        window.industryObserver
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


                            setTimeout(
                                function () {

                                    entry.target.classList.add(
                                        "finished"
                                    );

                                },
                                700
                            );

                        }

                        else {

                            entry.target.classList.remove(
                                "show"
                            );

                            entry.target.classList.remove(
                                "finished"
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


    window.industryObserver =
        observer;

}


/*=====================================*
        RESIZE
*=====================================*/

if (
    !window.industryResizeBound
) {

    window.addEventListener(
        "resize",
        updateIndustryText
    );


    window.industryResizeBound =
        true;

}


/*=====================================*
        EXPORT
*=====================================*/

window.initIndustries =
    initIndustries;

window.updateIndustryText =
    updateIndustryText;

window.initIndustryAnimation =
    initIndustryAnimation;