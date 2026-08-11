/*=====================================*
* SCROLL JS
*=====================================*/


/*=====================================*
* APPLICATION STATE
*=====================================*/

let scrollSystemInitialized = false;


/*=====================================*
* INITIALIZE SCROLL SYSTEM
*=====================================*/

function initScroll() {

    /*
        Prevent duplicate initialization
    */

    if (scrollSystemInitialized) {

        return;

    }


    scrollSystemInitialized = true;


    console.log(
        "✅ Scroll system initialized"
    );


    /*
        Initialize navbar scroll
    */

    initNavbarScroll();

}


/*=====================================*
* NAVBAR SCROLL
*=====================================*/

function initNavbarScroll() {

    const navbar =
        document.querySelector(
            ".navbar"
        );


    /*
        Navbar may not exist yet because
        the loader inserts it dynamically.

        Do NOT throw an error.
    */

    if (!navbar) {

        return;

    }


    /*
        Prevent duplicate listeners
    */

    if (
        navbar.dataset.scrollReady ===
        "true"
    ) {

        return;

    }


    navbar.dataset.scrollReady =
        "true";


    /*=====================================
            SCROLL HANDLER
    =====================================*/

    function handleNavbarScroll() {

        if (
            window.scrollY > 50
        ) {

            navbar.classList.add(
                "scrolled"
            );

        }

        else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        {
            passive: true
        }
    );


    /*
        Run once immediately
    */

    handleNavbarScroll();


    console.log(
        "✅ Navbar scroll initialized"
    );

}


/*=====================================*
* REFRESH NAVBAR SCROLL
*=====================================*/

function refreshNavbarScroll() {

    /*
        Used after the loader dynamically
        inserts the navbar.
    */

    const navbar =
        document.querySelector(
            ".navbar"
        );


    if (!navbar) {

        return;

    }


    /*
        If already initialized,
        do nothing.
    */

    if (
        navbar.dataset.scrollReady ===
        "true"
    ) {

        return;

    }


    initNavbarScroll();

}


/*=====================================*
* SCROLL TO TOP
*=====================================*/

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/*=====================================*
* SCROLL TO ELEMENT
*=====================================*/

function scrollToElement(
    selector
) {

    const element =
        document.querySelector(
            selector
        );


    if (!element) {

        return;

    }


    element.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/*=====================================*
* EXPORT
*=====================================*/

window.initScroll =
    initScroll;


window.initNavbarScroll =
    initNavbarScroll;


window.refreshNavbarScroll =
    refreshNavbarScroll;


window.scrollToTop =
    scrollToTop;


window.scrollToElement =
    scrollToElement;