/*==================================================*
 * HOW IT WORKS
 *==================================================*/


function initHowItWorks() {

    console.log(
        "✅ How It Works initialized."
    );


    /*==================================================
     * GET SECTION
     *==================================================*/

    const section =
        document.querySelector(
            ".how-it-works"
        );


    if (!section) {

        console.warn(
            "⚠️ How It Works section not found."
        );

        return;

    }


    /*==================================================
     * GET SLIDES
     *==================================================*/

    const slides =
        section.querySelectorAll(
            ".process-slide"
        );


    console.log(
        "How It Works slides found:",
        slides.length
    );


    if (!slides.length) {

        console.warn(
            "⚠️ No How It Works slides found."
        );

        return;

    }


    /*==================================================
     * PREVENT DUPLICATE INITIALIZATION
     *==================================================*/

    if (
        section.dataset.howItWorksReady ===
        "true"
    ) {

        console.log(
            "⚠️ How It Works already initialized."
        );

        return;

    }


    section.dataset.howItWorksReady =
        "true";


    /*==================================================
     * STATE
     *==================================================*/

    let currentSlide = 0;

    let sliderTimer = null;

    let sectionVisible = false;

    let isAnimating = false;


    /*==================================================
     * RESET ALL SLIDES
     *==================================================*/

    function resetSlides() {

        slides.forEach(
            function (slide, index) {

                slide.classList.remove(
                    "active",
                    "slide-in",
                    "slide-out"
                );


                if (
                    index === 0
                ) {

                    slide.classList.add(
                        "active"
                    );

                }

            }
        );


        currentSlide = 0;

        isAnimating = false;

    }


    /*==================================================
     * RESET CARDS
     *==================================================*/

    function resetCards() {

        slides.forEach(
            function (slide) {

                const cards =
                    slide.querySelectorAll(
                        ".process-card"
                    );


                cards.forEach(
                    function (card) {

                        card.style.transitionDelay =
                            "0s";

                    }
                );

            }
        );

    }


    /*==================================================
     * SHOW SLIDE
     *==================================================*/

    function showSlide(
        nextIndex
    ) {

        if (
            !sectionVisible
        ) {

            return;

        }


        if (
            isAnimating
        ) {

            return;

        }


        if (
            slides.length <= 1
        ) {

            return;

        }


        if (
            nextIndex < 0
        ) {

            nextIndex =
                slides.length - 1;

        }


        if (
            nextIndex >=
            slides.length
        ) {

            nextIndex = 0;

        }


        const current =
            slides[currentSlide];


        const next =
            slides[nextIndex];


        if (
            current === next
        ) {

            return;

        }


        isAnimating = true;


        /*==================================================
         * PREPARE NEXT SLIDE
         *==================================================*/

        next.classList.remove(
            "active",
            "slide-out"
        );


        next.classList.add(
            "slide-in"
        );


        /*
            Force browser to recognize
            the starting position before
            animation begins.
        */

        void next.offsetWidth;


        /*==================================================
         * CURRENT SLIDE GOES UP
         *==================================================*/

        current.classList.remove(
            "slide-in"
        );


        current.classList.add(
            "slide-out"
        );


        /*==================================================
         * NEXT SLIDE COMES FROM BELOW
         *==================================================*/

        next.classList.add(
            "active"
        );


        next.classList.remove(
            "slide-in"
        );


        currentSlide =
            nextIndex;


        /*==================================================
         * FINISH ANIMATION
         *==================================================*/

        setTimeout(
            function () {

                current.classList.remove(
                    "active",
                    "slide-out"
                );


                next.classList.remove(
                    "slide-out"
                );


                next.classList.add(
                    "active"
                );


                isAnimating =
                    false;

            },
            1100
        );

    }


    /*==================================================
     * START SLIDER
     *==================================================*/

    function startSlider() {

        stopSlider();


        if (
            slides.length <= 1
        ) {

            return;

        }


        if (
            !sectionVisible
        ) {

            return;

        }


        sliderTimer =
            setInterval(
                function () {

                    if (
                        sectionVisible &&
                        !isAnimating
                    ) {

                        const nextIndex =
                            (
                                currentSlide +
                                1
                            ) %
                            slides.length;


                        showSlide(
                            nextIndex
                        );

                    }

                },
                6000
            );


        console.log(
            "▶️ How It Works slider started."
        );

    }


    /*==================================================
     * STOP SLIDER
     *==================================================*/

    function stopSlider() {

        if (
            sliderTimer
        ) {

            clearInterval(
                sliderTimer
            );

            sliderTimer =
                null;

        }

    }


    /*==================================================
     * RESET WHEN SECTION LEAVES
     *==================================================*/

    function resetSection() {

        stopSlider();


        section.classList.remove(
            "how-it-works-visible"
        );


        slides.forEach(
            function (slide) {

                slide.classList.remove(
                    "active",
                    "slide-in",
                    "slide-out"
                );

            }
        );


        currentSlide = 0;

        isAnimating = false;


        /*
            Reset the first slide,
            but keep it hidden until
            the section enters again.
        */

        if (
            slides[0]
        ) {

            slides[0].classList.add(
                "active"
            );

        }


        console.log(
            "⬆️ How It Works left viewport."
        );

    }


    /*==================================================
     * SECTION ENTER ANIMATION
     *==================================================*/

    function revealSection() {

        if (
            sectionVisible
        ) {

            return;

        }


        sectionVisible =
            true;


        section.classList.add(
            "how-it-works-visible"
        );


        /*
            Reset to first slide
            every time the section
            comes back into view.
        */

        slides.forEach(
            function (slide, index) {

                slide.classList.remove(
                    "active",
                    "slide-in",
                    "slide-out"
                );


                if (
                    index === 0
                ) {

                    slide.classList.add(
                        "active"
                    );

                }

            }
        );


        currentSlide = 0;


        /*
            Give the browser one frame
            before starting the slider.
        */

        requestAnimationFrame(
            function () {

                requestAnimationFrame(
                    function () {

                        startSlider();

                    }
                );

            }
        );


        console.log(
            "⬇️ How It Works entered viewport."
        );

    }


    /*==================================================
     * INTERSECTION OBSERVER
     *==================================================*/

    if (
        typeof IntersectionObserver ===
        "undefined"
    ) {

        console.warn(
            "⚠️ IntersectionObserver unavailable."
        );


        sectionVisible =
            true;


        section.classList.add(
            "how-it-works-visible"
        );


        startSlider();


        return;

    }


    /*==================================================
     * CREATE OBSERVER
     *==================================================*/

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            revealSection();

                        }

                        else {

                            resetSection();

                        }

                    }
                );

            },
            {
                threshold: 0.25
            }
        );


    /*==================================================
     * START OBSERVING
     *==================================================*/

    observer.observe(
        section
    );


    /*==================================================
     * STORE OBSERVER
     *==================================================*/

    section.howItWorksObserver =
        observer;


    window.howItWorksObserver =
        observer;


    /*==================================================
     * CLEANUP
     *==================================================*/

    window.addEventListener(
        "beforeunload",
        function () {

            stopSlider();

            observer.disconnect();

        },
        {
            once: true
        }
    );


    /*==================================================
     * FINAL LOG
     *==================================================*/

    console.log(
        "✅ How It Works animation started."
    );

}


/*==================================================*
 * EXPORT
 *==================================================*/

window.initHowItWorks =
    initHowItWorks;