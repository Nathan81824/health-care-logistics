/*==================================================*
                    NAVBAR JS
*
* PURPOSE:
* - Load navbar user
* - Profile dropdown
* - Mobile menu
* - Theme toggle
* - Notification UI
* - Authentication visibility
* - Active navigation link
* - Modern logout popup
* - Welcome toast
*
* IMPORTANT:
* Dashboard topbar is handled by topbar.js.
*==================================================*/


/*==================================================*
                    INITIALIZE NAVBAR
*==================================================*/

function initNavbar() {

    console.log("✅ Navbar initialized");


    /*===============================================
                    USER
    ===============================================*/

    loadNavbarUser();


    /*===============================================
                    PROFILE
    ===============================================*/

    setupProfileDropdown();


    /*===============================================
                    MOBILE MENU
    ===============================================*/

    setupMobileMenu();


    /*===============================================
                    THEME
    ===============================================*/

    setupThemeToggle();


    /*===============================================
                    NOTIFICATIONS
    ===============================================*/

    if (
        typeof setupNotificationUI ===
        "function"
    ) {

        setupNotificationUI();

    }


    /*===============================================
                    LOGOUT
    ===============================================*/

    setupNavbarLogout();


    /*===============================================
                    AUTH UI
    ===============================================*/

    updateNavbarAuth();


    /*===============================================
                    ACTIVE LINK
    ===============================================*/

    setActiveLink();


    /*===============================================
                    WELCOME TOAST
    ===============================================*/

    showWelcomeToast();

}


/*==================================================*
                LOAD NAVBAR USER
*==================================================*/

function loadNavbarUser() {

    let user = null;


    if (
        typeof getUser ===
        "function"
    ) {

        try {

            user = getUser();

        }
        catch (error) {

            console.error(
                "❌ Failed to get navbar user:",
                error
            );

        }

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


    /*===============================================
                        GUEST
    ===============================================*/

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


    /*===============================================
                    LOGGED IN
    ===============================================*/

    const name =
        String(
            user.name ||
            "User"
        );


    const email =
        String(
            user.email ||
            ""
        );


    const initial =
        name
            .charAt(0)
            .toUpperCase();


    if (username) {

        username.textContent =
            name.length > 12
                ? name.slice(0, 12) + "..."
                : name;

    }


    if (avatar) {

        avatar.textContent =
            initial;

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
            initial;

    }

}


/*==================================================*
                    WELCOME TOAST
*==================================================*/

function showWelcomeToast() {

    let user = null;


    if (
        typeof getUser ===
        "function"
    ) {

        try {

            user = getUser();

        }
        catch (error) {

            console.error(
                "❌ Failed to load welcome user:",
                error
            );

        }

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


    if (
        !toast ||
        !user ||
        !title ||
        !text
    ) {

        return;

    }


    const name =
        user.name ||
        "User";


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


/*==================================================*
                PROFILE DROPDOWN
*==================================================*/

function setupProfileDropdown() {

    const profileCard =
        document.getElementById(
            "profileCard"
        );


    const profileDropdown =
        document.getElementById(
            "profileDropdown"
        );


    if (
        !profileCard ||
        !profileDropdown
    ) {

        return;

    }


    const profile =
        profileCard.closest(
            ".profile"
        );


    if (!profile) {

        return;

    }


    const chevron =
        document.getElementById(
            "profileChevron"
        );


    if (
        profileCard.dataset.profileReady ===
        "true"
    ) {

        return;

    }


    profileCard.dataset.profileReady =
        "true";


    /*===============================================
                    OPEN / CLOSE
    ===============================================*/

    profileCard.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                profile.classList.toggle(
                    "active"
                );


            profileCard.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            if (chevron) {

                chevron.style.transform =
                    isOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)";

            }

        }
    );


    /*===============================================
                    INSIDE CLICK
    ===============================================*/

    profileDropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    /*===============================================
                    OUTSIDE CLICK
    ===============================================*/

    document.addEventListener(
        "click",
        function (event) {

            if (
                !profile.contains(
                    event.target
                )
            ) {

                closeProfile();

            }

        }
    );


    /*===============================================
                        ESCAPE
    ===============================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeProfile();

            }

        }
    );


    function closeProfile() {

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


/*==================================================*
                    MOBILE MENU
*==================================================*/

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


    if (
        menuBtn.dataset.mobileReady ===
        "true"
    ) {

        return;

    }


    menuBtn.dataset.mobileReady =
        "true";


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


    navLinks
        .querySelectorAll("a")
        .forEach(
            function (link) {

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


/*==================================================*
                    THEME TOGGLE
*==================================================*/

function setupThemeToggle() {

    const button =
        document.querySelector(
            ".theme-toggle"
        );


    if (!button) {

        return;

    }


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


    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    applyTheme(
        savedTheme === "dark"
    );


    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const dark =
                !document.body.classList.contains(
                    "dark-mode"
                );


            applyTheme(
                dark
            );

        }
    );


    function applyTheme(dark) {

        document.body.classList.toggle(
            "dark-mode",
            dark
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

}


/*==================================================*
                    LOGOUT
*==================================================*/

function setupNavbarLogout() {

    const logout =
        document.getElementById(
            "navLogout"
        );


    if (!logout) {

        return;

    }


    if (
        logout.dataset.logoutReady ===
        "true"
    ) {

        return;

    }


    logout.dataset.logoutReady =
        "true";


    logout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            openModernLogout();

        }
    );

}


/*==================================================*
                MODERN LOGOUT POPUP
*==================================================*/

function openModernLogout() {

    const popup =
        document.getElementById(
            "logoutPopup"
        );


    if (!popup) {

        console.warn(
            "⚠️ Logout popup not found"
        );

        return;

    }


    popup.classList.add(
        "show"
    );


    document.body.classList.add(
        "logout-popup-open"
    );

}


/*==================================================*
                UPDATE AUTH UI
*==================================================*/

function updateNavbarAuth() {

    const loggedIn =
        localStorage.getItem(
            "isLoggedIn"
        ) === "true";


    const guestLinks = [
        "loginLink",
        "createAccountLink"
    ];


    const userLinks = [
        "dashboardLink",
        "shipmentsLink",
        "historyLink",
        "navLogout"
    ];


    guestLinks.forEach(
        function (id) {

            document
                .getElementById(id)
                ?.classList.toggle(
                    "hidden",
                    loggedIn
                );

        }
    );


    userLinks.forEach(
        function (id) {

            document
                .getElementById(id)
                ?.classList.toggle(
                    "hidden",
                    !loggedIn
                );

        }
    );

}


/*==================================================*
                ACTIVE NAV LINK
*==================================================*/

function setActiveLink() {

    const current =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(
            ".nav-links a"
        )
        .forEach(
            function (link) {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (!href) {

                    return;

                }


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
                        .pop()
                        .toLowerCase();


                link.classList.toggle(
                    "active",
                    page === current
                );

            }
        );

}


/*==================================================*
                    EXPORT
*==================================================*/

window.initNavbar =
    initNavbar;


console.log(
    "✅ Navbar JS loaded"
);