/*==========================================================
    FOOTER
==========================================================*/

function initFooter() {

    console.log("✅ Footer initialized.");

    initFooterYear();

    initNewsletter();

    initFooterBackTop();

    initFooterNavigation();

}


/*==========================================================
    FOOTER YEAR
==========================================================*/

function initFooterYear() {

    const yearElement =
        document.getElementById("footerYear");

    if (!yearElement) {

        return;

    }

    yearElement.textContent =
        new Date().getFullYear();

}


/*==========================================================
    AUTH CHECK
==========================================================*/

function footerUserIsLoggedIn() {

    /*
        Use the existing authentication
        system from the project.
    */

    if (
        typeof window.isUserLoggedIn ===
        "function"
    ) {

        return window.isUserLoggedIn();

    }

    /*
        Fallback to your existing AUTH_KEY.
    */

    return (
        localStorage.getItem("isLoggedIn") ===
        "true"
    );

}


/*==========================================================
    GUEST NOTIFICATION
==========================================================*/

function showFooterGuestMessage() {

    const title =
        "Sign in required";

    const message =
        "Please sign in to continue.";

    /*
        Existing notification system.
    */

    if (
        typeof window.showNotification ===
        "function"
    ) {

        window.showNotification(
            title,
            message
        );

        return;

    }


    /*
        Custom event fallback.
    */

    window.dispatchEvent(
        new CustomEvent(
            "footer:guest",
            {
                detail: {
                    title:title,
                    message:message
                }
            }
        )
    );

}


/*==========================================================
    NEWSLETTER
==========================================================*/

function initNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );

    const emailInput =
        document.getElementById(
            "newsletterEmail"
        );

    const subscribed =
        document.getElementById(
            "newsletterSubscribed"
        );

    const unsubscribeBtn =
        document.getElementById(
            "unsubscribeBtn"
        );

    const bell =
        document.getElementById(
            "newsletterBell"
        );


    if (
        !form ||
        !emailInput ||
        !subscribed ||
        !unsubscribeBtn
    ) {

        return;

    }


    if (
        form.dataset.initialized ===
        "true"
    ) {

        return;

    }


    form.dataset.initialized =
        "true";


    const savedEmail =
        localStorage.getItem(
            "idokoNewsletterEmail"
        );


    if (savedEmail) {

        showSubscribedState(
            form,
            subscribed,
            savedEmail,
            bell
        );

    }


    /*======================================================
        SUBSCRIBE
    ======================================================*/

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                emailInput.value.trim();


            if (!email) {

                emailInput.focus();

                return;

            }


            if (
                !emailInput.checkValidity()
            ) {

                emailInput.reportValidity();

                return;

            }


            localStorage.setItem(
                "idokoNewsletterEmail",
                email
            );


            showSubscribedState(
                form,
                subscribed,
                email,
                bell
            );


            sendFooterNotification(
                "Subscription successful",
                "You are now subscribed to IDOKO LEGACY updates."
            );

        }
    );


    /*======================================================
        UNSUBSCRIBE
    ======================================================*/

    unsubscribeBtn.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "idokoNewsletterEmail"
            );


            showSubscribeState(
                form,
                subscribed,
                emailInput,
                bell
            );


            sendFooterNotification(
                "Unsubscribed",
                "You have been removed from our newsletter."
            );

        }
    );

}


/*==========================================================
    SHOW SUBSCRIBED
==========================================================*/

function showSubscribedState(
    form,
    subscribed,
    email,
    bell
) {

    if (
        !form ||
        !subscribed
    ) {

        return;

    }


    form.style.display =
        "none";


    subscribed.classList.add(
        "show"
    );


    subscribed.setAttribute(
        "aria-hidden",
        "false"
    );


    if (bell) {

        bell.classList.add(
            "show"
        );

        bell.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    const emailInput =
        document.getElementById(
            "newsletterEmail"
        );


    if (
        emailInput &&
        email
    ) {

        emailInput.value =
            email;

    }

}


/*==========================================================
    SHOW SUBSCRIBE
==========================================================*/

function showSubscribeState(
    form,
    subscribed,
    emailInput,
    bell
) {

    if (
        !form ||
        !subscribed
    ) {

        return;

    }


    subscribed.classList.remove(
        "show"
    );


    subscribed.setAttribute(
        "aria-hidden",
        "true"
    );


    if (bell) {

        bell.classList.remove(
            "show"
        );

        bell.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    form.style.display =
        "flex";


    if (emailInput) {

        emailInput.value =
            "";

    }

}


/*==========================================================
    FOOTER NOTIFICATION
==========================================================*/

function sendFooterNotification(
    title,
    message
) {

    window.dispatchEvent(
        new CustomEvent(
            "footer:notification",
            {
                detail: {
                    title:title,
                    message:message
                }
            }
        )
    );


    if (
        typeof window.showNotification ===
        "function"
    ) {

        window.showNotification(
            title,
            message
        );

    }

}


/*==========================================================
    BACK TO TOP
==========================================================*/

function initFooterBackTop() {

    const backTop =
        document.getElementById(
            "footerBackTop"
        );

    const panel =
        document.getElementById(
            "footerNavigationPanel"
        );


    if (!backTop) {

        return;

    }


    if (
        backTop.dataset.initialized ===
        "true"
    ) {

        updateBackTopVisibility(
            backTop
        );

        return;

    }


    backTop.dataset.initialized =
        "true";


    /*======================================================
        INITIAL STATE
    ======================================================*/

    updateBackTopVisibility(
        backTop
    );


    /*======================================================
        SCROLL
    ======================================================*/

    window.addEventListener(
        "scroll",
        function() {

            updateBackTopVisibility(
                backTop
            );

        },
        {
            passive:true
        }
    );


    /*======================================================
        HOVER BUTTON
    ======================================================*/

    backTop.addEventListener(
        "mouseenter",
        function() {

            /*
                NEVER show the panel when
                the button itself isn't visible.
            */

            if (
                !backTop.classList.contains(
                    "show"
                )
            ) {

                return;

            }


            openFooterNavigation();

        }
    );


    /*======================================================
        LEAVE BUTTON
    ======================================================*/

    backTop.addEventListener(
        "mouseleave",
        function() {

            /*
                Give the user a small amount
                of time to move into the panel.
            */

            setTimeout(
                function() {

                    if (
                        panel &&
                        !panel.matches(":hover")
                    ) {

                        closeFooterNavigation();

                    }

                },
                120
            );

        }
    );


    /*======================================================
        CLICK
    ======================================================*/

    backTop.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            /*
                If panel is already open,
                clicking the button takes
                the user directly to the top.
            */

            closeFooterNavigation();

            footerScrollToTop();

        }
    );

}


/*==========================================================
    UPDATE BACK TO TOP VISIBILITY
==========================================================*/

function updateBackTopVisibility(
    backTop
) {

    if (!backTop) {

        return;

    }


    const scrollPosition =
        window.scrollY ||
        window.pageYOffset ||
        0;


    /*
        Only show after scrolling down.
    */

    if (
        scrollPosition > 350
    ) {

        backTop.classList.add(
            "show"
        );

    }
    else {

        backTop.classList.remove(
            "show"
        );

        closeFooterNavigation();

    }

}


/*==========================================================
    FOOTER NAVIGATION
==========================================================*/

function initFooterNavigation() {

    const panel =
        document.getElementById(
            "footerNavigationPanel"
        );

    const closeButton =
        document.getElementById(
            "footerNavigationClose"
        );


    if (!panel) {

        return;

    }


    if (
        panel.dataset.initialized ===
        "true"
    ) {

        return;

    }


    panel.dataset.initialized =
        "true";


    /*======================================================
        CLOSE BUTTON
    ======================================================*/

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function() {

                closeFooterNavigation();

            }
        );

    }


    /*======================================================
        PANEL HOVER
    ======================================================*/

    panel.addEventListener(
        "mouseleave",
        function() {

            closeFooterNavigation();

        }
    );


    /*======================================================
        NAVIGATION LINKS
    ======================================================*/

    const links =
        panel.querySelectorAll(
            ".footer-navigation-link"
        );


    links.forEach(
        function(link) {

            link.addEventListener(
                "click",
                function(event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    if (
                        !href.startsWith("#")
                    ) {

                        return;

                    }


                    event.preventDefault();


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {

                        console.warn(
                            "Footer target not found:",
                            href
                        );

                        return;

                    }


                    closeFooterNavigation();


                    /*
                        Wait for the panel to
                        begin closing before
                        scrolling.
                    */

                    setTimeout(
                        function() {

                            scrollToFooterSection(
                                target
                            );

                        },
                        150
                    );

                }
            );

        }
    );

}


/*==========================================================
    OPEN NAVIGATION
==========================================================*/

function openFooterNavigation() {

    const panel =
        document.getElementById(
            "footerNavigationPanel"
        );

    const backTop =
        document.getElementById(
            "footerBackTop"
        );


    /*
        NEVER open the panel when
        the back-top button isn't visible.
    */

    if (
        !panel ||
        !backTop ||
        !backTop.classList.contains(
            "show"
        )
    ) {

        return;

    }


    panel.classList.add(
        "show"
    );


    panel.setAttribute(
        "aria-hidden",
        "false"
    );


    backTop.setAttribute(
        "aria-expanded",
        "true"
    );

}


/*==========================================================
    CLOSE NAVIGATION
==========================================================*/

function closeFooterNavigation() {

    const panel =
        document.getElementById(
            "footerNavigationPanel"
        );

    const backTop =
        document.getElementById(
            "footerBackTop"
        );


    if (panel) {

        panel.classList.remove(
            "show"
        );

        panel.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (backTop) {

        backTop.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/*==========================================================
    SCROLL TO TOP
==========================================================*/

function footerScrollToTop() {

    closeFooterNavigation();


    window.scrollTo({

        top:0,

        left:0,

        behavior:"smooth"

    });

}


/*==========================================================
    SCROLL TO FOOTER SECTION
==========================================================*/

function scrollToFooterSection(
    target
) {

    if (!target) {

        return;

    }


    const navbar =
        document.querySelector(
            ".navbar"
        );


    let offset = 0;


    /*
        Account for your fixed navbar.
    */

    if (navbar) {

        offset =
            navbar.offsetHeight + 15;

    }


    const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;


    window.scrollTo({

        top:Math.max(
            0,
            targetPosition
        ),

        left:0,

        behavior:"smooth"

    });

}


/*==========================================================
    FOOTER INTERNAL LINKS
==========================================================*/

function initFooterInternalLinks() {

    const footer =
        document.querySelector(
            ".site-footer"
        );


    if (!footer) {

        return;

    }


    const links =
        footer.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        function(link) {

            /*
                Don't initialize the same
                link twice.
            */

            if (
                link.dataset.footerScrollInitialized ===
                "true"
            ) {

                return;

            }


            link.dataset.footerScrollInitialized =
                "true";


            link.addEventListener(
                "click",
                function(event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    closeFooterNavigation();


                    scrollToFooterSection(
                        target
                    );

                }
            );

        }
    );

}


/*==========================================================
    ESCAPE KEY
==========================================================*/

function initFooterEscape() {

    if (
        document.body.dataset.footerEscapeInitialized ===
        "true"
    ) {

        return;

    }


    document.body.dataset.footerEscapeInitialized =
        "true";


    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeFooterNavigation();

            }

        }
    );

}


/*==========================================================
    INITIALIZE FOOTER
==========================================================*/

function startFooter() {

    initFooter();

    initFooterInternalLinks();

    initFooterEscape();

}


/*
    If your component loader calls
    initFooter(), this remains safe.
*/

window.initFooter =
    initFooter;

window.initNewsletter =
    initNewsletter;

window.initFooterBackTop =
    initFooterBackTop;

window.initFooterNavigation =
    initFooterNavigation;

window.openFooterNavigation =
    openFooterNavigation;

window.closeFooterNavigation =
    closeFooterNavigation;

window.footerScrollToTop =
    footerScrollToTop;

window.scrollToFooterSection =
    scrollToFooterSection;


/*
    Start immediately if the footer
    already exists on the page.
*/

if (
    document.querySelector(
        ".site-footer"
    )
) {

    startFooter();

}