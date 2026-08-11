/*=====================================*
        NAVBAR
*=====================================*/

function initNavbar() {

    console.log("✅ Navbar initialized");

    loadNavbarUser();

    setupProfileDropdown();

    setupMobileMenu();

    setupThemeToggle();

    /*
        Notification UI is handled by
        notification-ui.js.
    */

    if (
        typeof setupNotificationUI ===
        "function"
    ) {

        setupNotificationUI();

    }

    setupLogout();

    updateNavbarAuth();

    setActiveLink();

    showWelcomeToast();

}


/*=====================================*
        LOAD NAVBAR USER
*=====================================*/

function loadNavbarUser() {

    /*
        Get user safely.
    */

    let user = null;


    if (
        typeof getUser ===
        "function"
    ) {

        user = getUser();

    }


    const username =
        document.getElementById(
            "navUsername"
        );

    const avatar =
        document.getElementById(
            "navUserInitial"
        );

    const dropdownUsername =
        document.getElementById(
            "dropdownUsername"
        );

    const dropdownEmail =
        document.getElementById(
            "dropdownEmail"
        );

    const dropdownAvatar =
        document.getElementById(
            "dropdownUserInitial"
        );


    /*=================================
            GUEST
    =================================*/

    if (!user) {

        if (username) {

            username.textContent =
                "Guest";

        }


        if (avatar) {

            avatar.textContent =
                "G";

        }


        if (dropdownUsername) {

            dropdownUsername.textContent =
                "Guest";

        }


        if (dropdownEmail) {

            dropdownEmail.textContent =
                "Please sign in";

        }


        if (dropdownAvatar) {

            dropdownAvatar.textContent =
                "G";

        }


        return;

    }


    /*=================================
            LOGGED IN USER
    =================================*/

    const name =
        user.name || "User";


    const email =
        user.email || "";


    if (username) {

        username.textContent =
            name.length > 9
                ? name.slice(0, 9) + "..."
                : name;

    }


    if (avatar) {

        avatar.textContent =
            name
                .charAt(0)
                .toUpperCase();

    }


    if (dropdownUsername) {

        dropdownUsername.textContent =
            name;

    }


    if (dropdownEmail) {

        dropdownEmail.textContent =
            email;

    }


    if (dropdownAvatar) {

        dropdownAvatar.textContent =
            name
                .charAt(0)
                .toUpperCase();

    }

}


/*=====================================*
        WELCOME TOAST
*=====================================*/

function showWelcomeToast() {

    let user = null;


    if (
        typeof getUser ===
        "function"
    ) {

        user = getUser();

    }


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


    /*
        Do not show toast for guests.
    */

    if (
        !toast ||
        !user ||
        !title ||
        !text
    ) {

        return;

    }


    const name =
        user.name || "User";


    title.textContent =
        "Welcome Back 👋";


    text.textContent =
        `Good to see you, ${name}`;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        4000
    );

}


/*=====================================*
        PROFILE DROPDOWN
*=====================================*/

function setupProfileDropdown() {

    const profileCard =
        document.getElementById(
            "profileCard"
        );


    const profileDropdown =
        document.getElementById(
            "profileDropdown"
        );


    const chevron =
        document.getElementById(
            "profileChevron"
        );


    /*=================================
            CHECK ELEMENTS
    =================================*/

    if (
        !profileCard ||
        !profileDropdown
    ) {

        console.warn(
            "⚠️ Profile elements not found"
        );

        return;

    }


    /*
        Find profile wrapper.
    */

    const profile =
        profileCard.closest(
            ".profile"
        );


    if (!profile) {

        console.warn(
            "⚠️ .profile wrapper not found"
        );

        return;

    }


    /*
        Prevent duplicate listeners.
    */

    if (
        profileCard.dataset.profileReady ===
        "true"
    ) {

        return;

    }


    profileCard.dataset.profileReady =
        "true";


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


            if (chevron) {

                chevron.style.transform =
                    isOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)";

            }


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

                closeProfileDropdown();

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

                closeProfileDropdown();

            }

        }
    );


    function closeProfileDropdown() {

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


    console.log(
        "✅ Profile dropdown initialized"
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


    /*
        Prevent duplicate listeners.
    */

    if (
        menuBtn.dataset.mobileReady ===
        "true"
    ) {

        return;

    }


    menuBtn.dataset.mobileReady =
        "true";


    /*=================================
            OPEN / CLOSE
    =================================*/

    menuBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            menuBtn.classList.toggle(
                "active"
            );


            navLinks.classList.toggle(
                "active"
            );

        }
    );


    /*=================================
            CLOSE AFTER LINK CLICK
    =================================*/

    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
            link => {

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

            }
        );

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


    /*
        Prevent duplicate listeners.
    */

    if (
        button.dataset.themeReady ===
        "true"
    ) {

        return;

    }


    button.dataset.themeReady =
        "true";


    const icon =
        button.querySelector(
            "i"
        );


    /*=================================
            LOAD SAVED THEME
    =================================*/

    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );


        if (icon) {

            icon.className =
                "fa-solid fa-sun";

        }

    }
    else {

        document.body.classList.remove(
            "dark-mode"
        );


        if (icon) {

            icon.className =
                "fa-solid fa-moon";

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


    /*
        Prevent duplicate listeners.
    */

    if (
        logoutBtn.dataset.logoutReady ===
        "true"
    ) {

        return;

    }


    logoutBtn.dataset.logoutReady =
        "true";


    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const loggedIn =
                localStorage.getItem(
                    "isLoggedIn"
                ) === "true";


            /*=================================
                    GUEST
            =================================*/

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


            /*=================================
                    SHOW LOGOUT POPUP
            =================================*/

            const popup =
                document.getElementById(
                    "logoutPopup"
                );


            if (popup) {

                popup.classList.add(
                    "show"
                );

            }

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
        .forEach(
            link => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {

                    return;

                }


                /*
                    Ignore hash links.
                */

                if (
                    href === "#" ||
                    href.startsWith(
                        "javascript:"
                    )
                ) {

                    return;

                }


                const page =
                    href
                        .split("/")
                        .pop();


                if (
                    page === current
                ) {

                    link.classList.add(
                        "active"
                    );

                }
                else {

                    link.classList.remove(
                        "active"
                    );

                }

            }
        );

}


/*=====================================*
        EXPORT
*=====================================*/

window.initNavbar =
    initNavbar;