/*=====================================*
* CONTACT MAP
*=====================================*/

function initContactMap() {

    animateOfficeCard();

    initMapButton();

}


/*=====================================*
* OFFICE CARD ANIMATION
*=====================================*/

function animateOfficeCard() {

    const card =
        document.querySelector(".office-card");

    if (!card) return;


    /*=====================================
    INITIAL STATE
    =====================================*/

    card.style.opacity = "0";

    card.style.transform =
        "translateY(40px)";


    /*=====================================
    ANIMATE
    =====================================*/

    setTimeout(() => {

        card.style.transition =
            "opacity .7s ease, transform .7s ease";

        card.style.opacity = "1";

        card.style.transform =
            "translateY(0)";

    }, 300);

}


/*=====================================*
* GET DIRECTIONS BUTTON
*=====================================*/

function initMapButton() {

    const button =
        document.querySelector(".map-btn");

    if (!button) return;


    /*=====================================
    MOUSE ENTER
    =====================================*/

    button.addEventListener(
        "mouseenter",
        () => {

            button.style.transform =
                "translateY(-5px)";

        }
    );


    /*=====================================
    MOUSE LEAVE
    =====================================*/

    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

}


/*=====================================*
* PARALLAX EFFECT
*=====================================*/

function initMapParallax() {

    const section =
        document.querySelector(".contact-map");

    if (!section) return;


    const updateParallax = () => {

        const y =
            window.scrollY -
            section.offsetTop;


        if (
            y > -500 &&
            y < 500
        ) {

            section.style.backgroundPosition =
                `center ${y * 0.08}px`;

        }

    };


    window.addEventListener(
        "scroll",
        updateParallax,
        { passive: true }
    );


    /*=====================================
    INITIAL CHECK
    =====================================*/

    updateParallax();

}


/*=====================================*
* INITIALIZE
*=====================================*/

function initContactMapSection() {

    initContactMap();

    initMapParallax();

}


/*=====================================*
* EXPORT
*=====================================*/

window.initContactMap =
    initContactMap;

window.animateOfficeCard =
    animateOfficeCard;

window.initMapButton =
    initMapButton;

window.initMapParallax =
    initMapParallax;

window.initContactMapSection =
    initContactMapSection;