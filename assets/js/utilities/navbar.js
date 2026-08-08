/*=====================================*
        NAVBAR
*=====================================*/

function initNavbar() {

    console.log("✅ Navbar initialized");

    loadNavbarUser();

    setupProfileDropdown();

    setupMobileMenu();

    setupThemeToggle();

    setupNotificationUI();

    setupLogout();

    updateNavbarAuth();

    setActiveLink();

    showWelcomeToast();

}


/*=====================================*
        LOAD NAVBAR USER
*=====================================*/

function loadNavbarUser() {

    const user = getUser();


    const username =
        document.getElementById("navUsername");

    const avatar =
        document.getElementById("navUserInitial");

    const dropdownUsername =
        document.getElementById("dropdownUsername");

    const dropdownEmail =
        document.getElementById("dropdownEmail");

    const dropdownAvatar =
        document.getElementById("dropdownUserInitial");


    /*=================================
            GUEST
    =================================*/

    if (!user) {

        if (username) {
            username.textContent = "Guest";
        }

        if (avatar) {
            avatar.textContent = "G";
        }

        if (dropdownUsername) {
            dropdownUsername.textContent = "Guest";
        }

        if (dropdownEmail) {
            dropdownEmail.textContent =
                "Please sign in";
        }

        if (dropdownAvatar) {
            dropdownAvatar.textContent = "G";
        }

        return;
    }


    /*=================================
            LOGGED IN USER
    =================================*/

    if (username) {

        username.textContent =
            user.name.length > 9
                ? user.name.slice(0, 9) + "..."
                : user.name;

    }


    if (avatar) {

        avatar.textContent =
            user.name
                .charAt(0)
                .toUpperCase();

    }


    if (dropdownUsername) {

        dropdownUsername.textContent =
            user.name;

    }


    if (dropdownEmail) {

        dropdownEmail.textContent =
            user.email;

    }


    if (dropdownAvatar) {

        dropdownAvatar.textContent =
            user.name
                .charAt(0)
                .toUpperCase();

    }

}


/*=====================================*
        WELCOME TOAST
*=====================================*/

function showWelcomeToast() {

    const user = getUser();


    const toast =
        document.getElementById(
            "welcomeToast"
        );

    const title =
        document.getElementById(
            "welcomeTitle"
        );

    const text =
        document.getElementById(
            "welcomeText"
        );


    if (
        !toast ||
        !user ||
        !title ||
        !text
    ) {

        return;

    }


    title.textContent =
        "Welcome Back 👋";


    text.textContent =
        `Good to see you, ${user.name}`;


    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 4000);

}

/*=====================================*
        PROFILE DROPDOWN
*=====================================*/

function setupProfileDropdown() {

    const profileCard =
        document.getElementById("profileCard");

    const profileDropdown =
        document.getElementById("profileDropdown");

    const chevron =
        document.getElementById("profileChevron");


    /*=================================
            CHECK ELEMENTS
    =================================*/

    if (!profileCard || !profileDropdown) {

        console.warn(
            "⚠️ Profile elements not found"
        );

        return;

    }


    /*
        GET THE PROFILE WRAPPER

        This is the parent containing
        both the button and dropdown.
    */

    const profile =
        profileCard.closest(".profile");


    if (!profile) {

        console.warn(
            "⚠️ .profile wrapper not found"
        );

        return;

    }


    /*=================================
            OPEN / CLOSE
    =================================*/

    profileCard.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                profile.classList.toggle(
                    "active"
                );


            /*=========================
                    CHEVRON
            =========================*/

            if (chevron) {

                chevron.style.transform =
                    isOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)";

            }


            /*=========================
                    ACCESSIBILITY
            =========================*/

            profileCard.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );

        }
    );


    /*=================================
        DON'T CLOSE INSIDE DROPDOWN
    =================================*/

    profileDropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    /*=================================
            CLOSE OUTSIDE
    =================================*/

    document.addEventListener(
        "click",
        function (event) {

            if (
                !profile.contains(
                    event.target
                )
            ) {

                profile.classList.remove(
                    "active"
                );


                profileCard.setAttribute(
                    "aria-expanded",
                    "false"
                );


                if (chevron) {

                    chevron.style.transform =
                        "rotate(0deg)";

                }

            }

        }
    );


    /*=================================
            CLOSE WITH ESC
    =================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                profile.classList.remove(
                    "active"
                );


                profileCard.setAttribute(
                    "aria-expanded",
                    "false"
                );


                if (chevron) {

                    chevron.style.transform =
                        "rotate(0deg)";

                }

            }

        }
    );


    console.log(
        "✅ Profile dropdown initialized"
    );

}

/*=====================================*
        NOTIFICATION DROPDOWNS
*=====================================*/

function setupNotificationDropdowns() {

    /*=================================
            TOP NAVBAR BELL
    =================================*/

    const notificationButton =
        document.querySelector(
            ".notification-btn"
        );


    const topDropdown =
        document.querySelector(
            ".notification-wrapper .notification-dropdown"
        );


    const topCloseButton =
        topDropdown
            ?.querySelector(
                ".close-notification"
            );


    /*=================================
            PROFILE NOTIFICATION
    =================================*/

    const profileNotificationLink =
        document.getElementById(
            "profileNotificationLink"
        );


    const profileDropdown =
        document.getElementById(
            "notificationDropdown"
        );


    const profileCloseButton =
        profileDropdown
            ?.querySelector(
                ".close-notification"
            );


    /*=================================
            TOP BELL CLICK
    =================================*/

    if (
        notificationButton &&
        topDropdown
    ) {

        notificationButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                /* Close profile notification */

                if (profileDropdown) {

                    profileDropdown.classList.remove(
                        "active"
                    );

                }


                /* Open top notification */

                topDropdown.classList.toggle(
                    "active"
                );

            }
        );


        /*=================================
                TOP X BUTTON
        =================================*/

        if (topCloseButton) {

            topCloseButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    topDropdown.classList.remove(
                        "active"
                    );

                }
            );

        }


        /*=================================
                KEEP TOP OPEN
        =================================*/

        topDropdown.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /*=================================
        PROFILE NOTIFICATION CLICK
    =================================*/

    if (
        profileNotificationLink &&
        profileDropdown
    ) {

        profileNotificationLink.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                /* Close top notification */

                if (topDropdown) {

                    topDropdown.classList.remove(
                        "active"
                    );

                }


                /* Open profile notification */

                profileDropdown.classList.toggle(
                    "active"
                );

            }
        );


        /*=================================
                PROFILE X BUTTON
        =================================*/

        if (profileCloseButton) {

            profileCloseButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    profileDropdown.classList.remove(
                        "active"
                    );

                }
            );

        }


        /*=================================
                KEEP PROFILE OPEN
        =================================*/

        profileDropdown.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /*=================================
            CLOSE OUTSIDE
    =================================*/

    document.addEventListener(
        "click",
        function (event) {

            /* TOP */

            if (
                topDropdown &&
                notificationButton &&
                !topDropdown.contains(
                    event.target
                ) &&
                !notificationButton.contains(
                    event.target
                )
            ) {

                topDropdown.classList.remove(
                    "active"
                );

            }


            /* PROFILE */

            if (
                profileDropdown &&
                profileNotificationLink &&
                !profileDropdown.contains(
                    event.target
                ) &&
                !profileNotificationLink.contains(
                    event.target
                )
            ) {

                profileDropdown.classList.remove(
                    "active"
                );

            }

        }
    );


    /*=================================
            ESCAPE
    =================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            if (topDropdown) {

                topDropdown.classList.remove(
                    "active"
                );

            }


            if (profileDropdown) {

                profileDropdown.classList.remove(
                    "active"
                );

            }

        }
    );

}


/*=====================================*
        MOBILE MENU
*=====================================*/

function setupMobileMenu() {

    const menuBtn =
        document.querySelector(
            ".menu-btn"
        );


    const navLinks =
        document.querySelector(
            ".nav-links"
        );


    if (
        !menuBtn ||
        !navLinks
    ) {

        return;

    }


    menuBtn.addEventListener(
        "click",
        function () {

            menuBtn.classList.toggle(
                "active"
            );

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    menuBtn.classList.remove(
                        "active"
                    );

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/*=====================================*
        THEME TOGGLE
*=====================================*/

function setupThemeToggle() {

    const button =
        document.querySelector(
            ".theme-toggle"
        );


    if (!button) {
        return;
    }


    const icon =
        button.querySelector("i");


    /*=================================
            LOAD SAVED THEME
    =================================*/

    if (
        localStorage.getItem(
            "theme"
        ) === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );


        if (icon) {

            icon.className =
                "fa-solid fa-sun";

        }

    }


    /*=================================
            TOGGLE
    =================================*/

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            document.body.classList.toggle(
                "dark-mode"
            );


            const dark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "theme",
                dark
                    ? "dark"
                    : "light"
            );


            if (icon) {

                icon.className =
                    dark
                        ? "fa-solid fa-sun"
                        : "fa-solid fa-moon";

            }

        }
    );

}


/*=====================================*
        LOGOUT
*=====================================*/

function setupLogout() {

    const logoutBtn =
        document.getElementById(
            "navLogout"
        );


    if (!logoutBtn) {
        return;
    }


    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const loggedIn =
                localStorage.getItem(
                    "isLoggedIn"
                ) === "true";


            if (!loggedIn) {

                if (
                    typeof showError ===
                    "function"
                ) {

                    showError(
                        "You're not logged in."
                    );

                }

                return;

            }


            document
                .getElementById(
                    "logoutPopup"
                )
                ?.classList.add(
                    "show"
                );

        }
    );

}


/*=====================================*
        UPDATE NAVBAR AUTH
*=====================================*/

function updateNavbarAuth() {

    const loggedIn =
        localStorage.getItem(
            "isLoggedIn"
        ) === "true";


    /*=================================
            GUEST LINKS
    =================================*/

    document
        .getElementById(
            "loginLink"
        )
        ?.classList.toggle(
            "hidden",
            loggedIn
        );


    document
        .getElementById(
            "createAccountLink"
        )
        ?.classList.toggle(
            "hidden",
            loggedIn
        );


    /*=================================
            USER LINKS
    =================================*/

    document
        .getElementById(
            "dashboardLink"
        )
        ?.classList.toggle(
            "hidden",
            !loggedIn
        );


    document
        .getElementById(
            "shipmentsLink"
        )
        ?.classList.toggle(
            "hidden",
            !loggedIn
        );


    document
        .getElementById(
            "historyLink"
        )
        ?.classList.toggle(
            "hidden",
            !loggedIn
        );


    document
        .getElementById(
            "navLogout"
        )
        ?.classList.toggle(
            "hidden",
            !loggedIn
        );

}


/*=====================================*
        ACTIVE NAV LINK
*=====================================*/

function setActiveLink() {

    const current =
        window.location.pathname
            .split("/")
            .pop();


    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(link => {

            const href =
                link.getAttribute(
                    "href"
                );


            if (!href) {
                return;
            }


            const page =
                href
                    .split("/")
                    .pop();


            if (page === current) {

                link.classList.add(
                    "active"
                );

            } else {

                link.classList.remove(
                    "active"
                );

            }

        });

}


/*=====================================*
        EXPORT
*=====================================*/

window.initNavbar =
    initNavbar;