/*=====================================*
        HERO
*=====================================*/

function initHero() {

    console.log("Hero initialized");


    initHeroSlider();

    initHeroButtons();

    initHeroTyping();

    initHeroAnimations();

}


/*=====================================*
        HERO SLIDER
*=====================================*/

function initHeroSlider() {

    const hero =
        document.querySelector(".hero");


    if (!hero) {

        console.log(
            "⚠️ Hero element not found."
        );

        return;

    }


    const slides =
        hero.querySelectorAll(".slide");


    const dotsContainer =
        hero.querySelector("#dots");


    const nextBtn =
        hero.querySelector("#next");


    const prevBtn =
        hero.querySelector("#prev");


    /*=================================
            SAFETY CHECK
    =================================*/

    if (
        !slides.length ||
        !dotsContainer ||
        !nextBtn ||
        !prevBtn
    ) {

        console.log(
            "⚠️ Hero slider elements missing."
        );

        return;

    }


    /*=================================
        PREVENT DUPLICATE SLIDER
    =================================*/

    if (
        hero.dataset.sliderInitialized ===
        "true"
    ) {

        return;

    }


    hero.dataset.sliderInitialized =
        "true";


    let currentSlide = 0;

    let autoPlay = null;


    /*=================================
            CREATE DOTS
    =================================*/

    dotsContainer.innerHTML = "";


    slides.forEach(
        function (slide, index) {

            const dot =
                document.createElement(
                    "button"
                );


            dot.type =
                "button";


            dot.className =
                "dot";


            dot.setAttribute(
                "aria-label",
                `Go to slide ${index + 1}`
            );


            dot.setAttribute(
                "aria-current",
                index === 0
                    ? "true"
                    : "false"
            );


            if (
                index === 0
            ) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    showSlide(index);

                    restartAutoPlay();

                }
            );


            dotsContainer.appendChild(
                dot
            );

        }
    );


    const dots =
        dotsContainer.querySelectorAll(
            ".dot"
        );


    /*=================================
            SHOW SLIDE
    =================================*/

    function showSlide(index) {

        if (
            index >= slides.length
        ) {

            currentSlide = 0;

        }

        else if (
            index < 0
        ) {

            currentSlide =
                slides.length - 1;

        }

        else {

            currentSlide =
                index;

        }


        /*=================================
                UPDATE SLIDES
        =================================*/

        slides.forEach(
            function (slide, slideIndex) {

                slide.classList.toggle(
                    "active",
                    slideIndex === currentSlide
                );

            }
        );


        /*=================================
                UPDATE DOTS
        =================================*/

        dots.forEach(
            function (dot, dotIndex) {

                const active =
                    dotIndex ===
                    currentSlide;


                dot.classList.toggle(
                    "active",
                    active
                );


                dot.setAttribute(
                    "aria-current",
                    active
                        ? "true"
                        : "false"
                );

            }
        );

    }


    /*=================================
            NEXT SLIDE
    =================================*/

    function nextSlide() {

        showSlide(
            currentSlide + 1
        );

    }


    /*=================================
            PREVIOUS SLIDE
    =================================*/

    function previousSlide() {

        showSlide(
            currentSlide - 1
        );

    }


    /*=================================
            START AUTOPLAY
    =================================*/

    function startAutoPlay() {

        stopAutoPlay();


        autoPlay =
            setInterval(
                function () {

                    nextSlide();

                },
                5000
            );

    }


    /*=================================
            STOP AUTOPLAY
    =================================*/

    function stopAutoPlay() {

        if (
            autoPlay !== null
        ) {

            clearInterval(
                autoPlay
            );


            autoPlay =
                null;

        }

    }


    /*=================================
            RESTART AUTOPLAY
    =================================*/

    function restartAutoPlay() {

        startAutoPlay();

    }


    /*=================================
            NEXT BUTTON
    =================================*/

    nextBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            nextSlide();

            restartAutoPlay();

        }
    );


    /*=================================
            PREVIOUS BUTTON
    =================================*/

    prevBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            previousSlide();

            restartAutoPlay();

        }
    );


    /*=================================
            PAUSE ON HOVER
    =================================*/

    hero.addEventListener(
        "mouseenter",
        function () {

            stopAutoPlay();

        }
    );


    hero.addEventListener(
        "mouseleave",
        function () {

            startAutoPlay();

        }
    );


    /*=================================
            INITIAL SLIDE
    =================================*/

    showSlide(0);

    startAutoPlay();


    console.log(
        "✅ Hero slider started"
    );

}


/*=====================================*
        HERO BUTTONS
*=====================================*/

function initHeroButtons() {

    const hero =
        document.querySelector(
            ".hero"
        );


    if (!hero) {

        return;

    }


    const buttons =
        hero.querySelectorAll(
            ".btn"
        );


    if (!buttons.length) {

        return;

    }


    buttons.forEach(
        function (button) {

            /*=================================
                PREVENT DUPLICATE INITIALIZATION
            =================================*/

            if (
                button.dataset.heroReady ===
                "true"
            ) {

                return;

            }


            button.dataset.heroReady =
                "true";


            /*=================================
                    BUTTON CLICK
            =================================*/

            button.addEventListener(
                "click",
                function () {

                    /*=============================
                        PLAY CLICK SOUND
                    =============================*/

                    if (
                        typeof playSound ===
                        "function"
                    ) {

                        playSound("click");

                    }


                    /*=============================
                        CLICK ANIMATION
                    =============================*/

                    button.classList.add(
                        "clicked"
                    );


                    setTimeout(
                        function () {

                            button.classList.remove(
                                "clicked"
                            );

                        },
                        300
                    );

                }
            );

        }
    );

}


/*=====================================*
        HERO TYPING
*=====================================*/

function initHeroTyping() {

    const text =
        document.querySelector(
            ".hero-typing"
        );


    if (!text) {

        return;

    }


    /*=================================
            CLEAR OLD INTERVAL
    =================================*/

    if (
        window.heroTypingInterval
    ) {

        clearInterval(
            window.heroTypingInterval
        );

    }


    const words = [

        "Healthcare Logistics",

        "Medical Transportation",

        "Reliable Delivery"

    ];


    let index = 0;


    /*=================================
            INITIAL TEXT
    =================================*/

    text.textContent =
        words[0];


    /*=================================
            START ROTATION
    =================================*/

    window.heroTypingInterval =
        setInterval(
            function () {

                index++;


                if (
                    index >= words.length
                ) {

                    index = 0;

                }


                text.textContent =
                    words[index];

            },
            3000
        );

}


/*=====================================*
        HERO ANIMATIONS
*=====================================*/

function initHeroAnimations() {

    const hero =
        document.querySelector(
            ".hero"
        );


    if (!hero) {

        return;

    }


    hero.classList.add(
        "loaded"
    );


    console.log(
        "✅ Hero animations initialized"
    );

}


/*=====================================*
        EXPORT
*=====================================*/

window.initHero =
    initHero;

window.initHeroSlider =
    initHeroSlider;

window.initHeroButtons =
    initHeroButtons;

window.initHeroTyping =
    initHeroTyping;

window.initHeroAnimations =
    initHeroAnimations;