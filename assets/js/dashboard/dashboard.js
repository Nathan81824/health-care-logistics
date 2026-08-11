/*=====================================*
        DASHBOARD JS
*=====================================*/


/*=====================================*
        INITIALIZE DASHBOARD
*=====================================*/

function initDashboard() {

    console.log("✅ Dashboard started");


    /*=================================
            CHECK LOADER
    =================================*/

    if (typeof loadSection !== "function") {

        console.error(
            "❌ loadSection() is not available."
        );

        return;

    }


    /*=================================
            LOAD SIDEBAR
    =================================*/

    loadSection(

        "../components/dashboard/sidebar.html",

        "sidebar-container",

        function () {

            console.log(
                "✅ Dashboard sidebar loaded"
            );


            if (
                typeof initSidebar ===
                "function"
            ) {

                initSidebar();

            }


            initSidebarActive();

            loadUserProfile();

            initDashboardLogout();

        }

    );


    /*=================================
            LOAD TOPBAR
    =================================*/

    loadSection(

        "../components/dashboard/topbar.html",

        "topbar-container",

        function () {

            console.log(
                "✅ Dashboard topbar loaded"
            );


            if (
                typeof initTopbar ===
                "function"
            ) {

                initTopbar();

            }


            loadTopbarUser();

        }

    );


    /*=================================
            LOAD WELCOME
    =================================*/

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


    /*=================================
            LOAD OVERVIEW
    =================================*/

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

}


/*=====================================*
        SIDEBAR ACTIVE LINK
*=====================================*/

function initSidebarActive() {

    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (!links.length) {

        return;

    }


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {


                /*=========================
                        REMOVE ACTIVE
                =========================*/

                links.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                /*=========================
                        ADD ACTIVE
                =========================*/

                link.classList.add(
                    "active"
                );

            }
        );

    });

}


/*=====================================*
        LOAD SIDEBAR USER
*=====================================*/

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

    } catch (error) {

        console.error(
            "❌ Failed to load sidebar user:",
            error
        );

        return;

    }


    if (!user) {

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


    /*=================================
            USERNAME
    =================================*/

    if (username) {

        username.textContent =
            user.name || "User";

    }


    /*=================================
            INITIAL
    =================================*/

    if (initial) {

        initial.textContent =
            user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U";

    }

}


/*=====================================*
        LOAD TOPBAR USER
*=====================================*/

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

    } catch (error) {

        console.error(
            "❌ Failed to load topbar user:",
            error
        );

        return;

    }


    if (!user) {

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


    /*=================================
            USERNAME
    =================================*/

    if (username) {

        username.textContent =
            user.name || "User";

    }


    /*=================================
            INITIAL
    =================================*/

    if (initial) {

        initial.textContent =
            user.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U";

    }

}


/*=====================================*
        LOGOUT
*=====================================*/

function initDashboardLogout() {

    const logoutButtons =
        document.querySelectorAll(
            "#logoutBtn, #logoutTopbar"
        );


    if (!logoutButtons.length) {

        return;

    }


    /*
        PREVENT DUPLICATE
        EVENT LISTENERS
    */

    logoutButtons.forEach(
        function (button) {


            if (
                button.dataset.logoutReady ===
                "true"
            ) {

                return;

            }


            button.dataset.logoutReady =
                "true";


            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    /*=====================
                        CONFIRM LOGOUT
                    =====================*/

                    const confirmed =
                        window.confirm(
                            "Are you sure you want to logout?"
                        );


                    if (!confirmed) {

                        return;

                    }


                    /*=====================
                        CLEAR AUTH DATA
                    =====================*/

                    localStorage.removeItem(
                        "user"
                    );


                    localStorage.removeItem(
                        "isLoggedIn"
                    );


                    /*=====================
                        CLEAR NOTIFICATIONS
                    =====================*/

                    /*
                        Do not delete the
                        notification storage
                        unless that is what
                        you want.

                        Notifications remain
                        available for the
                        next login.
                    */


                    /*=====================
                        REDIRECT
                    =====================*/

                    window.location.href =
                        "../index.html";

                }
            );

        }
    );

}


/*=====================================*
        EXPORT
*=====================================*/

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


/*=====================================*
        READY MESSAGE
*=====================================*/

console.log(
    "✅ Dashboard JS loaded"
);