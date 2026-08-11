/*=====================================*
        SERVICES
*=====================================*/

function initHomeServices() {

    console.log(
        "✅ Home services initialized."
    );


    updateServiceText();

    initServiceAnimation();

}


/*=====================================*
        SERVICE CARD TEXT
*=====================================*/

function updateServiceText() {

    const texts = [

        document.getElementById(
            "service1-text"
        ),

        document.getElementById(
            "service2-text"
        ),

        document.getElementById(
            "service3-text"
        ),

        document.getElementById(
            "service4-text"
        ),

        document.getElementById(
            "service5-text"
        ),

        document.getElementById(
            "service6-text"
        )

    ];


    /*=====================================
            SAFETY CHECK
    =====================================*/

    if (
        texts.some(
            text => !text
        )
    ) {

        return;

    }


    /*=====================================
            DESKTOP / TABLET
    =====================================*/

    if (
        window.innerWidth > 430
    ) {

        texts[0].textContent =
            "Reliable transportation of medical equipment, pharmaceuticals, and essential healthcare supplies with speed and care.";


        texts[1].textContent =
            "Temperature-controlled logistics that protect vaccines, laboratory samples, and other sensitive medical products.";


        texts[2].textContent =
            "Efficient inventory solutions that improve stock visibility, reduce waste, and keep healthcare facilities supplied.";


        texts[3].textContent =
            "Secure and compliant handling of medical information and sensitive healthcare shipments you can trust.";


        texts[4].textContent =
            "Fast emergency delivery services for critical medical supplies whenever urgent response is required.";


        texts[5].textContent =
            "Advanced real-time tracking that keeps you informed from pickup through safe and timely delivery.";

    }


    /*=====================================
            SMALL MOBILE
    =====================================*/

    else {

        texts[0].textContent =
            "Safe medical transport.";


        texts[1].textContent =
            "Cold-chain delivery.";


        texts[2].textContent =
            "Inventory solutions.";


        texts[3].textContent =
            "Secure & compliant.";


        texts[4].textContent =
            "Emergency response.";


        texts[5].textContent =
            "Live shipment tracking.";

    }

}


/*=====================================*
        SERVICE CARD ANIMATION
*=====================================*/

function initServiceAnimation() {

    const cards =
        document.querySelectorAll(
            ".service__card, .service__card-first, .service__card-last"
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
            card => {

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
        window.homeServicesObserver
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


    window.homeServicesObserver =
        observer;

}


/*=====================================*
        RESIZE
*=====================================*/

if (
    !window.serviceResizeBound
) {

    window.addEventListener(
        "resize",
        updateServiceText
    );


    window.serviceResizeBound =
        true;

}


/*=====================================*
        EXPORT
*=====================================*/

window.initHomeServices =
    initHomeServices;

window.updateServiceText =
    updateServiceText;

window.initServiceAnimation =
    initServiceAnimation;