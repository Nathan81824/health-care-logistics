/*==================================================*
                    DASHBOARD JS
*
* PURPOSE:
* - Initialize dashboard
* - Load dashboard components
* - Initialize sidebar
* - Load user information
* - Initialize dashboard logout
*
* TOPBAR:
* Handled separately by topbar.js
*
* LOGOUT:
* Uses the modern logout popup.
*==================================================*/


/*==================================================*
                INITIALIZE DASHBOARD
*==================================================*/

function initDashboard() {

    console.log(
        "🚀 Dashboard started"
    );


    /*===============================================
                    CHECK LOADER
    ===============================================*/

    if (
        typeof loadSection !==
        "function"
    ) {

        console.error(
            "❌ loadSection() is not available."
        );

        return;

    }


    /*===============================================
                    SIDEBAR
    ===============================================*/

    loadSection(

        "../components/dashboard/sidebar.html",

        "sidebar-container",

        function () {

            console.log(
                "✅ Dashboard sidebar loaded"
            );


            /*-----------------------------------------
                    SIDEBAR INITIALIZATION
            -----------------------------------------*/

            if (
                typeof initSidebar ===
                "function"
            ) {

                initSidebar();

            }


            /*-----------------------------------------
                    ACTIVE LINK
            -----------------------------------------*/

            initSidebarActive();


            /*-----------------------------------------
                    USER
            -----------------------------------------*/

            loadUserProfile();


            /*-----------------------------------------
                    LOGOUT
            -----------------------------------------*/

            initDashboardLogout();

        }

    );


    /*===============================================
                    TOPBAR
    ===============================================*/

    loadSection(

        "../components/dashboard/topbar.html",

        "topbar-container",

        function () {

            console.log(
                "✅ Dashboard topbar loaded"
            );


            /*
                topbar.js owns:

                - profile
                - notifications
                - theme
                - menu
                - topbar user
            */

            if (
                typeof initTopbar ===
                "function"
            ) {

                initTopbar();

            }


            /*
                If topbar.js already loads
                the user, this function
                simply won't interfere.
            */

            loadTopbarUser();

        }

    );


    /*===============================================
                    WELCOME
    ===============================================*/

    loadSection(

        "../components/dashboard/welcome.html",

        "welcome-container",

        function () {

            console.log(
                "✅ Dashboard welcome loaded"
            );


            if (
                typeof initWelcome ===
                "function"
            ) {

                initWelcome();

            }

        }

    );


    /*===============================================
                    OVERVIEW
    ===============================================*/

    loadSection(

        "../components/dashboard/overview.html",

        "overview-container",

        function () {

            console.log(
                "✅ Dashboard overview loaded"
            );


            if (
                typeof initOverview ===
                "function"
            ) {

                initOverview();

            }

        }

    );


    /*===============================================
                    ANALYTICS
    ===============================================*/

    loadSection(

        "../components/dashboard/analytics.html",

        "analytics-container",

        function () {

            console.log(
                "✅ Dashboard analytics loaded"
            );


            if (
                typeof initAnalytics ===
                "function"
            ) {

                initAnalytics();

            }

        }

    );


    /*===============================================
                    SHIPMENTS
    ===============================================*/

    loadSection(

        "../components/dashboard/shipments.html",

        "shipments-container",

        function () {

            console.log(
                "✅ Dashboard shipments loaded"
            );


            if (
                typeof initShipments ===
                "function"
            ) {

                initShipments();

            }

        }

    );


    /*===============================================
                    ACTIVITY
    ===============================================*/

    loadSection(

        "../components/dashboard/activity.html",

        "activity-container",

        function () {

            console.log(
                "✅ Dashboard activity loaded"
            );


            if (
                typeof initActivity ===
                "function"
            ) {

                initActivity();

            }

        }

    );


    /*===============================================
                    FLEET
    ===============================================*/

    loadSection(

        "../components/dashboard/fleet.html",

        "fleet-container",

        function () {

            console.log(
                "✅ Dashboard fleet loaded"
            );


            if (
                typeof initFleet ===
                "function"
            ) {

                initFleet();

            }

        }

    );

}


/*==================================================*
                SIDEBAR ACTIVE LINK
*==================================================*/

function initSidebarActive() {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (!links.length) {

        return;

    }


    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    links.forEach(
        function (link) {

            const href =
                link.getAttribute(
                    "href"
                );


            /*
                Automatically activate
                current dashboard page.
            */

            if (href) {

                const page =
                    href
                        .split("/")
                        .pop()
                        .toLowerCase();


                if (
                    page === currentPage
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }


            /*-----------------------------------------
                        CLICK
            -----------------------------------------*/

            link.addEventListener(
                "click",
                function () {

                    links.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    link.classList.add(
                        "active"
                    );

                }
            );

        }
    );

}


/*==================================================*
                LOAD SIDEBAR USER
*==================================================*/

function loadUserProfile() {

    let user = null;


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
            "❌ Failed to load sidebar user:",
            error
        );

        return;

    }


    const username =
        document.getElementById(
            "sidebarUsername"
        );


    const initial =
        document.getElementById(
            "sidebarInitial"
        );


    /*
        Guest state.
    */

    if (!user) {

        if (username) {

            username.textContent =
                "Guest";

        }


        if (initial) {

            initial.textContent =
                "G";

        }


        return;

    }


    const name =
        String(
            user.name ||
            "User"
        );


    if (username) {

        username.textContent =
            name;

    }


    if (initial) {

        initial.textContent =
            name
                .charAt(0)
                .toUpperCase();

    }

}


/*==================================================*
                LOAD TOPBAR USER
*
* NOTE:
* topbar.js is responsible for the
* topbar itself. This function is kept
* as a compatibility helper.
*==================================================*/

function loadTopbarUser() {

    let user = null;


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
            "❌ Failed to load topbar user:",
            error
        );

        return;

    }


    const username =
        document.getElementById(
            "topbarUsername"
        );


    const initial =
        document.getElementById(
            "topbarInitial"
        );


    if (!user) {

        if (username) {

            username.textContent =
                "Guest";

        }


        if (initial) {

            initial.textContent =
                "G";

        }


        return;

    }


    const name =
        String(
            user.name ||
            "User"
        );


    if (username) {

        username.textContent =
            name.length > 12
                ? name.slice(0, 12) + "..."
                : name;

    }


    if (initial) {

        initial.textContent =
            name
                .charAt(0)
                .toUpperCase();

    }

}


/*==================================================*
                MODERN DASHBOARD LOGOUT
*==================================================*/

function initDashboardLogout() {

    const logoutButtons =
        document.querySelectorAll(
            "#logoutBtn, #logoutTopbar"
        );


    if (!logoutButtons.length) {

        return;

    }


    logoutButtons.forEach(
        function (button) {

            /*
                Prevent duplicate
                listeners.
            */

            if (
                button.dataset.dashboardLogoutReady ===
                "true"
            ) {

                return;

            }


            button.dataset.dashboardLogoutReady =
                "true";


            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    openDashboardLogoutPopup();

                }
            );

        }
    );

}


/*==================================================*
            OPEN MODERN LOGOUT POPUP
*==================================================*/

function openDashboardLogoutPopup() {

    const popup =
        document.getElementById(
            "logoutPopup"
        );


    /*
        If your logout popup has already
        been loaded, simply show it.
    */

    if (popup) {

        popup.classList.add(
            "show"
        );


        document.body.classList.add(
            "logout-popup-open"
        );


        return;

    }


    /*
        If it isn't loaded yet, try
        loading it automatically.
    */

    const container =
        document.getElementById(
            "logout-popup-container"
        );


    if (
        container &&
        typeof loadSection ===
        "function"
    ) {

        loadSection(

            "../components/logout-popup.html",

            "logout-popup-container",

            function () {

                const loadedPopup =
                    document.getElementById(
                        "logoutPopup"
                    );


                if (loadedPopup) {

                    loadedPopup.classList.add(
                        "show"
                    );

                }


                document.body.classList.add(
                    "logout-popup-open"
                );


                setupLogoutPopupButtons();

            }

        );

        return;

    }


    /*
        Last fallback:
        create the modern popup.
    */

    createModernLogoutPopup();

}


/*==================================================*
        CREATE MODERN LOGOUT POPUP
*==================================================*/

function createModernLogoutPopup() {

    if (
        document.getElementById(
            "logoutPopup"
        )
    ) {

        return;

    }


    const popup =
        document.createElement(
            "div"
        );


    popup.id =
        "logoutPopup";


    popup.className =
        "logout-popup";


    popup.innerHTML = `

        <div class="logout-popup-overlay"></div>

        <div
            class="logout-popup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logoutPopupTitle">


            <div class="logout-popup-icon">

                <i class="fa-solid fa-arrow-right-from-bracket"></i>

            </div>


            <div class="logout-popup-content">

                <h3 id="logoutPopupTitle">
                    Logout?
                </h3>

                <p>
                    Are you sure you want to log out of your account?
                </p>

            </div>


            <div class="logout-popup-actions">

                <button
                    type="button"
                    class="logout-cancel"
                    id="cancelLogout">

                    Cancel

                </button>


                <button
                    type="button"
                    class="logout-confirm"
                    id="confirmLogout">

                    Logout

                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        popup
    );


    popup.classList.add(
        "show"
    );


    document.body.classList.add(
        "logout-popup-open"
    );


    setupLogoutPopupButtons();

}


/*==================================================*
        LOGOUT POPUP BUTTONS
*==================================================*/

function setupLogoutPopupButtons() {

    const popup =
        document.getElementById(
            "logoutPopup"
        );


    if (!popup) {

        return;

    }


    const cancel =
        document.getElementById(
            "cancelLogout"
        );


    const confirm =
        document.getElementById(
            "confirmLogout"
        );


    const overlay =
        popup.querySelector(
            ".logout-popup-overlay"
        );


    if (
        popup.dataset.popupReady ===
        "true"
    ) {

        return;

    }


    popup.dataset.popupReady =
        "true";


    /*===============================================
                    CANCEL
    ===============================================*/

    if (cancel) {

        cancel.addEventListener(
            "click",
            function () {

                closeLogoutPopup();

            }
        );

    }


    /*===============================================
                    OVERLAY
    ===============================================*/

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeLogoutPopup();

            }
        );

    }


    /*===============================================
                    CONFIRM
    ===============================================*/

    if (confirm) {

        confirm.addEventListener(
            "click",
            function () {

                performLogout();

            }
        );

    }


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

                closeLogoutPopup();

            }

        }
    );

}


/*==================================================*
                CLOSE LOGOUT POPUP
*==================================================*/

function closeLogoutPopup() {

    const popup =
        document.getElementById(
            "logoutPopup"
        );


    if (!popup) {

        return;

    }


    popup.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "logout-popup-open"
    );

}


/*==================================================*
                    PERFORM LOGOUT
*==================================================*/

function performLogout() {

    /*
        Remove authentication data.
    */

    localStorage.removeItem(
        "user"
    );


    localStorage.removeItem(
        "isLoggedIn"
    );


    /*
        Keep notification storage.

        Notifications are NOT deleted
        here so your notification system
        remains independent.
    */


    closeLogoutPopup();


    /*
        Redirect to login page.
    */

    window.location.href =
        "../index.html";

}


/*==================================================*
                    EXPORT
*==================================================*/

window.initDashboard =
    initDashboard;

window.initSidebarActive =
    initSidebarActive;

window.loadUserProfile =
    loadUserProfile;

window.loadTopbarUser =
    loadTopbarUser;

window.initDashboardLogout =
    initDashboardLogout;

window.openDashboardLogoutPopup =
    openDashboardLogoutPopup;

window.closeLogoutPopup =
    closeLogoutPopup;

window.performLogout =
    performLogout;


/*==================================================*
                    READY
*==================================================*/

console.log(
    "✅ Dashboard JS loaded"
);