/*==================================================*
                    DASHBOARD TOPBAR
                        topbar.js
*
* PURPOSE:
*
* - Initialize dashboard topbar
* - Load logged-in user
* - Profile dropdown
* - Theme toggle
* - Notifications
* - Mobile menu
* - Logout
*
* IMPORTANT:
*
* This file controls ONLY the dashboard topbar.
*
* Main website navbar logic belongs to:
* navbar.js
*
* Logout confirmation is handled by the
* modern logout popup.
*==================================================*/


/*==================================================*
                    INITIALIZE TOPBAR
*==================================================*/

function initTopbar() {

    console.log(
        "✅ Dashboard topbar initialized"
    );


    /*==============================================
                    LOAD USER
    ==============================================*/

    loadTopbarUser();


    /*==============================================
                    PROFILE
    ==============================================*/

    setupTopbarProfile();


    /*==============================================
                    THEME
    ==============================================*/

    setupTopbarTheme();


    /*==============================================
                    NOTIFICATIONS
    ==============================================*/

    setupTopbarNotifications();


    /*==============================================
                    MOBILE MENU
    ==============================================*/

    setupTopbarMenu();


    /*==============================================
                    LOGOUT
    ==============================================*/

    setupTopbarLogout();

}


/*==================================================*
                LOAD TOPBAR USER
*==================================================*/

function loadTopbarUser() {

    let user = null;


    /*==============================================
                    GET USER
    ==============================================*/

    if (
        typeof getUser ===
        "function"
    ) {

        try {

            user = getUser();

        }
        catch (error) {

            console.error(
                "❌ Failed to get user:",
                error
            );

        }

    }


    /*
        Fallback to localStorage.
    */

    if (!user) {

        try {

            const storedUser =
                localStorage.getItem(
                    "user"
                );


            if (storedUser) {

                user =
                    JSON.parse(
                        storedUser
                    );

            }

        }
        catch (error) {

            console.error(
                "❌ Failed to read stored user:",
                error
            );

        }

    }


    /*==============================================
                    ELEMENTS
    ==============================================*/

    const username =
        document.getElementById(
            "topbarUsername"
        );


    const initial =
        document.getElementById(
            "topbarInitial"
        );


    const email =
        document.getElementById(
            "topbarEmail"
        );


    /*==============================================
                    GUEST
    ==============================================*/

    if (!user) {

        if (username) {

            username.textContent =
                "Guest";

        }


        if (initial) {

            initial.textContent =
                "G";

        }


        if (email) {

            email.textContent =
                "Please sign in";

        }


        return;

    }


    /*==============================================
                    USER DATA
    ==============================================*/

    const name =
        String(
            user.name ||
            "User"
        );


    const userEmail =
        String(
            user.email ||
            ""
        );


    const userInitial =
        name
            .charAt(0)
            .toUpperCase();


    /*==============================================
                    USERNAME
    ==============================================*/

    if (username) {

        username.textContent =
            name.length > 14
                ? name.slice(0, 14) + "..."
                : name;

    }


    /*==============================================
                    INITIAL
    ==============================================*/

    if (initial) {

        initial.textContent =
            userInitial;

    }


    /*==============================================
                    EMAIL
    ==============================================*/

    if (email) {

        email.textContent =
            userEmail;

    }

}


/*==================================================*
                PROFILE DROPDOWN
*==================================================*/

function setupTopbarProfile() {

    const profile =
        document.querySelector(
            ".dashboard-topbar .profile"
        );


    if (!profile) {

        console.warn(
            "⚠️ Topbar profile not found"
        );

        return;

    }


    const profileCard =
        profile.querySelector(
            ".profile-card"
        );


    const dropdown =
        profile.querySelector(
            ".profile-dropdown"
        );


    const chevron =
        profile.querySelector(
            ".profile-arrow i"
        );


    if (
        !profileCard ||
        !dropdown
    ) {

        console.warn(
            "⚠️ Topbar profile elements missing"
        );

        return;

    }


    /*==============================================
                PREVENT DUPLICATES
    ==============================================*/

    if (
        profileCard.dataset.ready ===
        "true"
    ) {

        return;

    }


    profileCard.dataset.ready =
        "true";


    /*==============================================
                    OPEN
    ==============================================*/

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


    /*==============================================
                DROPDOWN CLICK
    ==============================================*/

    dropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    /*==============================================
                    OUTSIDE
    ==============================================*/

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


    /*==============================================
                    ESCAPE
    ==============================================*/

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


    /*==============================================
                CLOSE FUNCTION
    ==============================================*/

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
                    THEME TOGGLE
*==================================================*/

function setupTopbarTheme() {

    const button =
        document.querySelector(
            ".dashboard-topbar .theme-toggle"
        );


    if (!button) {

        console.warn(
            "⚠️ Topbar theme button not found"
        );

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


    /*==============================================
                APPLY SAVED THEME
    ==============================================*/

    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    applyTheme(
        savedTheme === "dark"
    );


    /*==============================================
                    TOGGLE
    ==============================================*/

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


    /*==============================================
                APPLY THEME FUNCTION
    ==============================================*/

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
                NOTIFICATION SYSTEM
*==================================================*/

function setupTopbarNotifications() {

    const notificationWrapper =
        document.querySelector(
            ".dashboard-topbar .notification-wrapper"
        );


    if (!notificationWrapper) {

        console.warn(
            "⚠️ Topbar notification wrapper not found"
        );

        return;

    }


    const button =
        notificationWrapper.querySelector(
            ".notification-btn"
        );


    const dropdown =
        notificationWrapper.querySelector(
            ".notification-dropdown"
        );


    const closeButton =
        notificationWrapper.querySelector(
            ".close-notification"
        );


    if (
        !button ||
        !dropdown
    ) {

        console.warn(
            "⚠️ Notification elements missing"
        );

        return;

    }


    /*==============================================
                PREVENT DUPLICATES
    ==============================================*/

    if (
        button.dataset.notificationReady ===
        "true"
    ) {

        return;

    }


    button.dataset.notificationReady =
        "true";


    /*==============================================
                    OPEN
    ==============================================*/

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                notificationWrapper.classList.toggle(
                    "active"
                );


            button.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            dropdown.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );


            /*
                Close profile when
                notifications open.
            */

            const profile =
                document.querySelector(
                    ".dashboard-topbar .profile"
                );


            if (profile) {

                profile.classList.remove(
                    "active"
                );

            }

        }
    );


    /*==============================================
                    CLOSE BUTTON
    ==============================================*/

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                closeNotifications();

            }
        );

    }


    /*==============================================
                    OUTSIDE CLICK
    ==============================================*/

    dropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !notificationWrapper.contains(
                    event.target
                )
            ) {

                closeNotifications();

            }

        }
    );


    /*==============================================
                    ESCAPE
    ==============================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeNotifications();

            }

        }
    );


    /*==============================================
                CLOSE FUNCTION
    ==============================================*/

    function closeNotifications() {

        notificationWrapper.classList.remove(
            "active"
        );


        button.setAttribute(
            "aria-expanded",
            "false"
        );


        dropdown.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /*
        Connect your existing
        notification UI.
    */

    if (
        typeof setupNotificationUI ===
        "function"
    ) {

        setupNotificationUI();

    }

}


/*==================================================*
                    MOBILE MENU
*==================================================*/

function setupTopbarMenu() {

    const menuButton =
        document.querySelector(
            ".dashboard-topbar .menu-toggle"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (!menuButton) {

        return;

    }


    if (
        menuButton.dataset.menuReady ===
        "true"
    ) {

        return;

    }


    menuButton.dataset.menuReady =
        "true";


    /*==============================================
                    CLICK
    ==============================================*/

    menuButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            menuButton.classList.toggle(
                "active"
            );


            /*
                Support both possible
                sidebar class systems.
            */

            if (sidebar) {

                sidebar.classList.toggle(
                    "active"
                );

            }


            document.body.classList.toggle(
                "sidebar-open"
            );

        }
    );


    /*==============================================
                    ESCAPE
    ==============================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                menuButton.classList.remove(
                    "active"
                );


                if (sidebar) {

                    sidebar.classList.remove(
                        "active"
                    );

                }


                document.body.classList.remove(
                    "sidebar-open"
                );

            }

        }
    );

}


/*==================================================*
                    LOGOUT
*==================================================*/

function setupTopbarLogout() {

    const logoutButton =
        document.getElementById(
            "logoutTopbar"
        );


    if (!logoutButton) {

        console.warn(
            "⚠️ Topbar logout button not found"
        );

        return;

    }


    if (
        logoutButton.dataset.topbarLogoutReady ===
        "true"
    ) {

        return;

    }


    logoutButton.dataset.topbarLogoutReady =
        "true";


    logoutButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            /*
                Close profile dropdown
                before opening logout.
            */

            const profile =
                document.querySelector(
                    ".dashboard-topbar .profile"
                );


            if (profile) {

                profile.classList.remove(
                    "active"
                );

            }


            /*======================================
                    USE MODERN POPUP
            ======================================*/

            if (
                typeof openDashboardLogoutPopup ===
                "function"
            ) {

                openDashboardLogoutPopup();

                return;

            }


            /*
                Fallback if dashboard.js
                hasn't loaded yet.
            */

            const popup =
                document.getElementById(
                    "logoutPopup"
                );


            if (popup) {

                popup.classList.add(
                    "show"
                );


                document.body.classList.add(
                    "logout-popup-open"
                );

                return;

            }


            console.warn(
                "⚠️ Modern logout popup not found"
            );

        }
    );

}


/*==================================================*
                REFRESH TOPBAR USER
*
* Useful after login/logout without
* reloading the entire page.
*==================================================*/

function refreshTopbarUser() {

    loadTopbarUser();

}


/*==================================================*
                CLOSE ALL TOPBAR MENUS
*==================================================*/

function closeAllTopbarMenus() {

    /*==============================================
                    PROFILE
    ==============================================*/

    const profile =
        document.querySelector(
            ".dashboard-topbar .profile"
        );


    if (profile) {

        profile.classList.remove(
            "active"
        );


        const card =
            profile.querySelector(
                ".profile-card"
            );


        if (card) {

            card.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }


    /*==============================================
                    NOTIFICATIONS
    ==============================================*/

    const notifications =
        document.querySelector(
            ".dashboard-topbar .notification-wrapper"
        );


    if (notifications) {

        notifications.classList.remove(
            "active"
        );


        const button =
            notifications.querySelector(
                ".notification-btn"
            );


        const dropdown =
            notifications.querySelector(
                ".notification-dropdown"
            );


        if (button) {

            button.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        if (dropdown) {

            dropdown.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }

}


/*==================================================*
                    EXPORTS
*==================================================*/

window.initTopbar =
    initTopbar;


window.loadTopbarUser =
    loadTopbarUser;


window.refreshTopbarUser =
    refreshTopbarUser;


window.closeAllTopbarMenus =
    closeAllTopbarMenus;


/*==================================================*
                    READY
*==================================================*/

console.log(
    "✅ Topbar JS loaded"
);