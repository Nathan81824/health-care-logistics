/*=====================================*
 * TESTIMONIALS
 *=====================================*/

function initTestimonials() {

    console.log(
        "✅ Testimonials initialized."
    );


    /*=====================================
     * ELEMENTS
     *=====================================*/

    const carousel =
        document.querySelector(
            ".testimonials-carousel"
        );

    const track =
        document.querySelector(
            ".testimonials-track"
        );

    const cards =
        document.querySelectorAll(
            ".testimonial-card"
        );

    const prevBtn =
        document.querySelector(
            ".testimonial-prev"
        );

    const nextBtn =
        document.querySelector(
            ".testimonial-next"
        );

    const dots =
        document.querySelectorAll(
            ".testimonial-dot"
        );

    const progressBar =
        document.querySelector(
            ".testimonials-progress-bar"
        );


    /*=====================================
     * CHECK ELEMENTS
     *=====================================*/

    if (
        !carousel ||
        !track ||
        cards.length === 0
    ) {

        console.warn(
            "⚠️ Testimonials elements not found."
        );

        return;

    }


    /*=====================================
     * SETTINGS
     *=====================================*/

    let currentIndex = 0;

    const totalSlides =
        cards.length;

    const autoSlideTime = 5000;

    let autoSlide = null;

    let touchStartX = 0;

    let touchEndX = 0;


    /*=====================================
     * UPDATE SLIDER
     *=====================================*/

    function updateSlider() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;


        /*=================================
         * ACTIVE CARD
         *=================================*/

        cards.forEach(
            function (card, index) {

                card.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );


        /*=================================
         * ACTIVE DOT
         *=================================*/

        dots.forEach(
            function (dot, index) {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );


        /*=================================
         * RESET PROGRESS
         *=================================*/

        if (progressBar) {

            progressBar.classList.remove(
                "animate"
            );

            void progressBar.offsetWidth;

            progressBar.classList.add(
                "animate"
            );

        }

    }


    /*=====================================
     * NEXT
     *=====================================*/

    function nextSlide() {

        currentIndex++;

        if (
            currentIndex >= totalSlides
        ) {

            currentIndex = 0;

        }

        updateSlider();

    }


    /*=====================================
     * PREVIOUS
     *=====================================*/

    function previousSlide() {

        currentIndex--;

        if (
            currentIndex < 0
        ) {

            currentIndex =
                totalSlides - 1;

        }

        updateSlider();

    }


    /*=====================================
     * START AUTO SLIDE
     *=====================================*/

    function startAutoSlide() {

        stopAutoSlide();


        autoSlide =
            setInterval(
                function () {

                    nextSlide();

                },
                autoSlideTime
            );

    }


    /*=====================================
     * STOP AUTO SLIDE
     *=====================================*/

    function stopAutoSlide() {

        if (autoSlide) {

            clearInterval(
                autoSlide
            );

            autoSlide = null;

        }

    }


    /*=====================================
     * NEXT BUTTON
     *=====================================*/

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            function () {

                nextSlide();

                startAutoSlide();

            }
        );

    }


    /*=====================================
     * PREVIOUS BUTTON
     *=====================================*/

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            function () {

                previousSlide();

                startAutoSlide();

            }
        );

    }


    /*=====================================
     * DOT NAVIGATION
     *=====================================*/

    dots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    currentIndex =
                        index;

                    updateSlider();

                    startAutoSlide();

                }
            );

        }
    );


    /*=====================================
     * PAUSE ON HOVER
     *=====================================*/

    carousel.addEventListener(
        "mouseenter",
        function () {

            stopAutoSlide();

        }
    );


    carousel.addEventListener(
        "mouseleave",
        function () {

            startAutoSlide();

        }
    );


    /*=====================================
     * TOUCH START
     *=====================================*/

    track.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

            stopAutoSlide();

        },
        {
            passive: true
        }
    );


    /*=====================================
     * TOUCH END
     *=====================================*/

    track.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;


            handleSwipe();

            startAutoSlide();

        },
        {
            passive: true
        }
    );


    /*=====================================
     * SWIPE
     *=====================================*/

    function handleSwipe() {

        const swipeDistance =
            touchStartX -
            touchEndX;


        if (
            Math.abs(
                swipeDistance
            ) < 50
        ) {

            return;

        }


        if (
            swipeDistance > 0
        ) {

            nextSlide();

        }
        else {

            previousSlide();

        }

    }


    /*=====================================
     * KEYBOARD
     *=====================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "ArrowRight"
            ) {

                nextSlide();

                startAutoSlide();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousSlide();

                startAutoSlide();

            }

        }
    );


    /*=====================================
     * INITIAL STATE
     *=====================================*/

    updateSlider();

    startAutoSlide();


    /*=====================================
     * REVEAL
     *=====================================*/

    if (
        typeof IntersectionObserver !==
        "undefined"
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "testimonials-visible"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .15
                }
            );


        observer.observe(
            carousel
        );

    }
    else {

        carousel.classList.add(
            "testimonials-visible"
        );

    }


    /*=====================================
     * VISIBILITY
     *
     * Stop autoplay when tab is hidden.
     *=====================================*/

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.hidden
            ) {

                stopAutoSlide();

            }
            else {

                startAutoSlide();

            }

        }
    );

}


/*=====================================*
 * EXPORT
 *=====================================*/

window.initTestimonials =
    initTestimonials;