/*==================================================*
                    DASHBOARD JS
*
* PURPOSE:
* - Initialize dashboard
* - Initialize sidebar
* - Load user information
* - Initialize dashboard logout
*
* COMPONENT LOADING:
* Handled by loader.js / loadDashboardPage()
*
* SIDEBAR:
* Handled by sidebar.js
*
* TOPBAR:
* Handled separately by top-bar.js
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


    /*==================================================
                    SIDEBAR
    ==================================================*/

    /*
        The sidebar is loaded by the dashboard
        component loader.

        initSidebar() is responsible for:

        - Navigation
        - Active blue state
        - Smooth scrolling
        - Scroll tracking
    */

    if (
        typeof initSidebar ===
        "function"
    ) {

        initSidebar();

    }


    /*==================================================
                    USER
    ==================================================*/

    loadUserProfile();


    /*==================================================
                    LOGOUT
    ==================================================*/

    initDashboardLogout();


    console.log(
        "✅ Dashboard initialized"
    );

}


/*==================================================*
                LOAD SIDEBAR USER
*==================================================*/

function loadUserProfile() {

    let user = null;


    /*==================================================
                    GET USER
    ==================================================*/

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



    /*==================================================
                    SIDEBAR ELEMENTS
    ==================================================*/

    const username =
        document.getElementById(
            "sidebarUsername"
        );


    const initial =
        document.getElementById(
            "sidebarInitial"
        );



    /*==================================================
                    GUEST STATE
    ==================================================*/

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



    /*==================================================
                    USER NAME
    ==================================================*/

    const name =
        String(
            user.name ||
            "User"
        ).trim();



    /*==================================================
                    DISPLAY NAME
    ==================================================*/

    if (username) {

        username.textContent =
            name || "User";

    }



    /*==================================================
                    USER INITIAL
    ==================================================*/

    if (initial) {

        initial.textContent =
            (
                name.charAt(0) ||
                "U"
            ).toUpperCase();

    }

}


/*==================================================*
                LOAD TOPBAR USER
*
* NOTE:
* top-bar.js is responsible for the
* topbar itself.
*
* This function remains as a compatibility
* helper for existing dashboard code.
*==================================================*/

function loadTopbarUser() {

    let user = null;


    /*==================================================
                    GET USER
    ==================================================*/

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



    /*==================================================
                    TOPBAR ELEMENTS
    ==================================================*/

    const username =
        document.getElementById(
            "topbarUsername"
        );


    const initial =
        document.getElementById(
            "topbarInitial"
        );



    /*==================================================
                    GUEST STATE
    ==================================================*/

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



    /*==================================================
                    USER NAME
    ==================================================*/

    const name =
        String(
            user.name ||
            "User"
        ).trim();



    /*==================================================
                    TOPBAR NAME
    ==================================================*/

    if (username) {

        username.textContent =
            name.length > 12
                ? name.slice(0, 12) + "..."
                : name || "User";

    }



    /*==================================================
                    TOPBAR INITIAL
    ==================================================*/

    if (initial) {

        initial.textContent =
            (
                name.charAt(0) ||
                "U"
            ).toUpperCase();

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


            /*------------------------------------------
                    PREVENT DUPLICATE LISTENERS
            ------------------------------------------*/

            if (
                button.dataset.dashboardLogoutReady ===
                "true"
            ) {

                return;

            }


            button.dataset.dashboardLogoutReady =
                "true";


            /*------------------------------------------
                    CLICK
            ------------------------------------------*/

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


    /*==================================================
            POPUP ALREADY EXISTS
    ==================================================*/

    if (popup) {

        popup.classList.add(
            "show"
        );


        document.body.classList.add(
            "logout-popup-open"
        );


        setupLogoutPopupButtons();


        return;

    }



    /*==================================================
            POPUP CONTAINER
    ==================================================*/

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



    /*==================================================
            FALLBACK
    ==================================================*/

    createModernLogoutPopup();

}


/*==================================================*
        CREATE MODERN LOGOUT POPUP
*==================================================*/

function createModernLogoutPopup() {

    /*==================================================
            PREVENT DUPLICATE POPUP
    ==================================================*/

    if (
        document.getElementById(
            "logoutPopup"
        )
    ) {

        return;

    }



    /*==================================================
            CREATE POPUP
    ==================================================*/

    const popup =
        document.createElement(
            "div"
        );


    popup.id =
        "logoutPopup";


    popup.className =
        "logout-popup";



    /*==================================================
            POPUP HTML
    ==================================================*/

    popup.innerHTML = `

        <div class="logout-popup-overlay"></div>


        <div
            class="logout-popup-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logoutPopupTitle"
        >


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
                    id="cancelLogout"
                >

                    Cancel

                </button>


                <button
                    type="button"
                    class="logout-confirm"
                    id="confirmLogout"
                >

                    Logout

                </button>

            </div>


        </div>

    `;



    /*==================================================
            ADD TO PAGE
    ==================================================*/

    document.body.appendChild(
        popup
    );



    /*==================================================
            SHOW POPUP
    ==================================================*/

    popup.classList.add(
        "show"
    );


    document.body.classList.add(
        "logout-popup-open"
    );



    /*==================================================
            INITIALIZE BUTTONS
    ==================================================*/

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



    /*==================================================
                    BUTTONS
    ==================================================*/

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



    /*==================================================
            PREVENT DUPLICATE INITIALIZATION
    ==================================================*/

    if (
        popup.dataset.popupReady ===
        "true"
    ) {

        return;

    }


    popup.dataset.popupReady =
        "true";



    /*==================================================
                    CANCEL
    ==================================================*/

    if (cancel) {

        cancel.addEventListener(
            "click",
            function () {

                closeLogoutPopup();

            }
        );

    }



    /*==================================================
                    OVERLAY
    ==================================================*/

    if (overlay) {

        overlay.addEventListener(
            "click",
            function () {

                closeLogoutPopup();

            }
        );

    }



    /*==================================================
                    CONFIRM
    ==================================================*/

    if (confirm) {

        confirm.addEventListener(
            "click",
            function () {

                performLogout();

            }
        );

    }



    /*==================================================
                    ESCAPE
    ==================================================*/

    if (
        !window.dashboardLogoutEscapeReady
    ) {

        window.dashboardLogoutEscapeReady =
            true;


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

    /*==================================================
            REMOVE AUTHENTICATION DATA
    ==================================================*/

    localStorage.removeItem(
        "user"
    );


    localStorage.removeItem(
        "isLoggedIn"
    );



    /*
        Notification storage is intentionally
        preserved.
    */



    /*==================================================
            CLOSE POPUP
    ==================================================*/

    closeLogoutPopup();



    /*==================================================
            REDIRECT TO LOGIN
    ==================================================*/

    window.location.href =
        "../index.html";

}


/*==================================================*
                    EXPORT
*==================================================*/

window.initDashboard =
    initDashboard;


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