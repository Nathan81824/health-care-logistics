/*==================================================*
                    DASHBOARD TOPBAR
                        topbar.js

    PURPOSE:
    - Initialize dashboard topbar
    - Load logged-in user
    - Profile dropdown
    - Quick Access dropdown
    - Theme toggle
    - Notifications
    - Mobile menu
    - Logout

    IMPORTANT:
    This file controls ONLY the dashboard topbar.
*==================================================*/


/*==================================================*
                    INITIALIZE TOPBAR
*==================================================*/

function initTopbar() {

    console.log(
        "✅ Dashboard topbar initialized"
    );


    loadTopbarUser();

    setupTopbarProfile();

    setupTopbarTheme();

    setupTopbarNotifications();

    setupTopbarQuickAccess();

    setupTopbarMenu();

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
        typeof window.getUser ===
        "function"
    ) {

        try {

            user =
                window.getUser();

        }
        catch (error) {

            console.error(
                "❌ Failed to get user:",
                error
            );

        }

    }


    /*==============================================
                    FALLBACK STORAGE
    ==============================================*/

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


    const dropdownUsername =
        document.getElementById(
            "topbarDropdownUsername"
        );


    const dropdownInitial =
        document.getElementById(
            "topbarDropdownInitial"
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


        if (dropdownUsername) {

            dropdownUsername.textContent =
                "Guest";

        }


        if (dropdownInitial) {

            dropdownInitial.textContent =
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
                    TOPBAR USERNAME
    ==============================================*/

    if (username) {

        username.textContent =
            name.length > 14
                ? name.slice(0, 14) + "..."
                : name;

    }


    /*==============================================
                    TOPBAR INITIAL
    ==============================================*/

    if (initial) {

        initial.textContent =
            userInitial;

    }


    /*==============================================
                    DROPDOWN USERNAME
    ==============================================*/

    if (dropdownUsername) {

        dropdownUsername.textContent =
            name;

    }


    /*==============================================
                    DROPDOWN INITIAL
    ==============================================*/

    if (dropdownInitial) {

        dropdownInitial.textContent =
            userInitial;

    }


    /*==============================================
                    EMAIL
    ==============================================*/

    if (email) {

        email.textContent =
            userEmail ||
            "No email available";

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
                !profile.classList.contains(
                    "active"
                );


            closeTopbarNotification();


            closeTopbarQuickAccess();


            profile.classList.toggle(
                "active",
                isOpen
            );


            profileCard.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            dropdown.setAttribute(
                "aria-hidden",
                String(!isOpen)
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
                    OUTSIDE CLICK
    ==============================================*/

    document.addEventListener(
        "click",
        function (event) {

            if (
                !profile.contains(
                    event.target
                )
            ) {

                closeTopbarProfile();

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

                closeTopbarProfile();

            }

        }
    );

}


/*==================================================*
                CLOSE PROFILE
*==================================================*/

function closeTopbarProfile() {

    const profile =
        document.querySelector(
            ".dashboard-topbar .profile"
        );


    if (!profile) {

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


    profile.classList.remove(
        "active"
    );


    if (profileCard) {

        profileCard.setAttribute(
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


    if (chevron) {

        chevron.style.transform =
            "rotate(0deg)";

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


    applyTopbarTheme(
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


            applyTopbarTheme(
                dark
            );

        }
    );


    /*==============================================
                APPLY THEME
    ==============================================*/

    function applyTopbarTheme(dark) {

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

    const wrapper =
        document.querySelector(
            "#topbarNotificationWrapper"
        );


    if (!wrapper) {

        console.warn(
            "⚠️ Topbar notification wrapper not found"
        );

        return;

    }


    const button =
        wrapper.querySelector(
            ".notification-btn"
        );


    const dropdown =
        wrapper.querySelector(
            "#notificationDropdown"
        );


    const closeButton =
        wrapper.querySelector(
            ".close-notification"
        );


    if (
        !button ||
        !dropdown
    ) {

        console.warn(
            "⚠️ Topbar notification elements missing"
        );

        return;

    }


    /*==============================================
                PREVENT DUPLICATES
    ==============================================*/

    if (
        button.dataset.topbarNotificationReady ===
        "true"
    ) {

        /*
            Still refresh the UI if it
            has already been initialized.
        */

        if (
            typeof window.setupNotificationUI ===
            "function"
        ) {

            window.setupNotificationUI();

        }

        return;

    }


    button.dataset.topbarNotificationReady =
        "true";


    /*==============================================
                    INITIAL STATE
    ==============================================*/

    button.setAttribute(
        "aria-expanded",
        "false"
    );


    dropdown.setAttribute(
        "aria-hidden",
        "true"
    );


    /*==============================================
                    OPEN / CLOSE
    ==============================================*/

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                !wrapper.classList.contains(
                    "active"
                );


            /*==============================
                    CLOSE OTHER MENUS
            ==============================*/

            closeTopbarProfile();

            closeTopbarQuickAccess();


            /*==============================
                    TOGGLE
            ==============================*/

            wrapper.classList.toggle(
                "active",
                isOpen
            );


            button.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            dropdown.setAttribute(
                "aria-hidden",
                String(!isOpen)
            );


            /*==============================
                    SOUND
            ==============================*/

            if (
                isOpen &&
                typeof window.playSound ===
                "function"
            ) {

                window.playSound(
                    "click"
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


                closeTopbarNotification();

            }
        );

    }


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
                OUTSIDE CLICK
    ==============================================*/

    document.addEventListener(
        "click",
        function (event) {

            if (
                !wrapper.contains(
                    event.target
                )
            ) {

                closeTopbarNotification();

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

                closeTopbarNotification();

            }

        }
    );


    /*==============================================
                EXISTING NOTIFICATION UI
    ==============================================*/

    if (
        typeof window.setupNotificationUI ===
        "function"
    ) {

        window.setupNotificationUI();

    }

}

/*==================================================*
        OPEN NOTIFICATION DROPDOWN
*==================================================*/

function openTopbarNotification() {

    const wrapper =
        document.querySelector(
            "#topbarNotificationWrapper"
        );

    if (!wrapper) {
        return;
    }


    const button =
        wrapper.querySelector(
            ".notification-btn"
        );


    const dropdown =
        wrapper.querySelector(
            "#notificationDropdown"
        );


    if (!button || !dropdown) {
        return;
    }


    /* CLOSE OTHER MENUS */

    closeTopbarProfile();

    closeTopbarQuickAccess();


    /* OPEN DROPDOWN */

    dropdown.classList.add(
        "active"
    );


    button.setAttribute(
        "aria-expanded",
        "true"
    );


    dropdown.setAttribute(
        "aria-hidden",
        "false"
    );

}


/*==================================================*
        CLOSE NOTIFICATION DROPDOWN
*==================================================*/

function closeTopbarNotification() {

    const wrapper =
        document.querySelector(
            "#topbarNotificationWrapper"
        );


    if (!wrapper) {
        return;
    }


    const button =
        wrapper.querySelector(
            ".notification-btn"
        );


    const dropdown =
        wrapper.querySelector(
            "#notificationDropdown"
        );


    if (dropdown) {

        dropdown.classList.remove(
            "active"
        );

        dropdown.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (button) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}

/*==================================================*
                QUICK ACCESS
*==================================================*/

function setupTopbarQuickAccess() {

    const button =
        document.querySelector(
            "#quickAccessBtn"
        );


    const wrapper =
        document.querySelector(
            ".quick-access-wrapper"
        );


    if (
        !button ||
        !wrapper
    ) {

        return;

    }


    const menu =
        wrapper.querySelector(
            ".quick-menu"
        );


    if (!menu) {

        return;

    }


    if (
        button.dataset.quickReady ===
        "true"
    ) {

        return;

    }


    button.dataset.quickReady =
        "true";


    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                !wrapper.classList.contains(
                    "active"
                );


            closeTopbarProfile();

            closeTopbarNotification();


            wrapper.classList.toggle(
                "active",
                isOpen
            );


            button.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            if (
                isOpen &&
                typeof window.playSound ===
                "function"
            ) {

                window.playSound(
                    "click"
                );

            }

        }
    );


    menu.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

}


/*==================================================*
                CLOSE QUICK ACCESS
*==================================================*/

function closeTopbarQuickAccess() {

    const wrapper =
        document.querySelector(
            ".quick-access-wrapper"
        );


    if (!wrapper) {

        return;

    }


    const button =
        wrapper.querySelector(
            "#quickAccessBtn"
        );


    wrapper.classList.remove(
        "active"
    );


    if (button) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

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


            const isOpen =
                !menuButton.classList.contains(
                    "active"
                );


            menuButton.classList.toggle(
                "active",
                isOpen
            );


            if (sidebar) {

                sidebar.classList.toggle(
                    "active",
                    isOpen
                );

            }


            document.body.classList.toggle(
                "sidebar-open",
                isOpen
            );


            if (
                typeof window.playSound ===
                "function"
            ) {

                window.playSound(
                    "click"
                );

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


            closeTopbarProfile();

            closeTopbarNotification();

            closeTopbarQuickAccess();


            /*======================================
                    MODERN LOGOUT POPUP
            ======================================*/

            if (
                typeof window.openDashboardLogoutPopup ===
                "function"
            ) {

                window.openDashboardLogoutPopup();

                return;

            }


            /*======================================
                    FALLBACK
            ======================================*/

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
*==================================================*/

function refreshTopbarUser() {

    loadTopbarUser();

}


/*==================================================*
                CLOSE ALL TOPBAR MENUS
*==================================================*/

function closeAllTopbarMenus() {

    closeTopbarProfile();

    closeTopbarNotification();

    closeTopbarQuickAccess();


    const menuButton =
        document.querySelector(
            ".dashboard-topbar .menu-toggle"
        );


    const sidebar =
        document.getElementById(
            "sidebar"
        );


    if (menuButton) {

        menuButton.classList.remove(
            "active"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (sidebar) {

        sidebar.classList.remove(
            "active"
        );

    }


    document.body.classList.remove(
        "sidebar-open"
    );

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


window.closeTopbarProfile =
    closeTopbarProfile;


window.openTopbarNotification =
    openTopbarNotification;


window.closeTopbarNotification =
    closeTopbarNotification;


window.closeTopbarQuickAccess =
    closeTopbarQuickAccess;


window.closeAllTopbarMenus =
    closeAllTopbarMenus;


/*==================================================*
                    READY
==================================================*/

console.log(
    "✅ Topbar JS loaded"
);