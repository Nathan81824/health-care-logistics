/*=====================================*
* LOGOUT POPUP JS
*=====================================*/


/*=====================================*
* INITIALIZE LOGOUT POPUP
*=====================================*/

function initLogoutPopup() {

    /*=====================================
            GET POPUP ELEMENTS
    =====================================*/

    const popup =
        document.getElementById(
            "logoutPopup"
        );


    const overlay =
        document.getElementById(
            "logoutOverlay"
        );


    const cancelButton =
        document.getElementById(
            "cancelLogout"
        );


    const confirmButton =
        document.getElementById(
            "confirmLogout"
        );


    /*=====================================
            POPUP SAFETY CHECK
    =====================================*/

    if (
        !popup ||
        !cancelButton ||
        !confirmButton
    ) {

        console.warn(
            "⚠️ Logout popup HTML not found."
        );

        return;

    }


    /*=====================================
            PREVENT DUPLICATE SETUP
    =====================================*/

    if (
        popup.dataset.logoutReady ===
        "true"
    ) {

        return;

    }


    popup.dataset.logoutReady =
        "true";


    /*=====================================
            CLOSE POPUP
    =====================================*/

    function closePopup() {

        popup.classList.remove(
            "show"
        );

    }


    /*=====================================
            OPEN POPUP
    =====================================*/

    function openPopup(event) {

        if (event) {

            event.preventDefault();

            event.stopPropagation();

        }


        /*
            Only allow logout popup
            when user is logged in.
        */

        const loggedIn =
            localStorage.getItem(
                "isLoggedIn"
            ) === "true";


        if (!loggedIn) {

            return;

        }


        popup.classList.add(
            "show"
        );

    }


    /*=====================================
            LOGOUT LINK
    =====================================*/

    /*
        The navbar is loaded dynamically.
        Therefore we use event delegation
        instead of requiring #navLogout
        to already exist.
    */

    document.addEventListener(
        "click",
        function (event) {

            const logoutLink =
                event.target.closest(
                    "#navLogout"
                );


            if (!logoutLink) {

                return;

            }


            openPopup(event);

        }
    );


    /*=====================================
            CANCEL LOGOUT
    =====================================*/

    cancelButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            closePopup();

        }
    );


    /*=====================================
            OVERLAY CLICK
    =====================================*/

    if (overlay) {

        overlay.addEventListener(
            "click",
            function (event) {

                /*
                    Close only when the
                    overlay itself is clicked.
                */

                if (
                    event.target ===
                    overlay
                ) {

                    closePopup();

                }

            }
        );

    }


    /*=====================================
            ESCAPE KEY
    =====================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closePopup();

            }

        }
    );


    /*=====================================
            CONFIRM LOGOUT
    =====================================*/

    confirmButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            /*
                Check login state.
            */

            const loggedIn =
                localStorage.getItem(
                    "isLoggedIn"
                ) === "true";


            if (!loggedIn) {

                closePopup();

                return;

            }


            /*=================================
                    LOGOUT NOTIFICATION
            =================================*/

            if (
                typeof addNotification ===
                "function"
            ) {

                addNotification(

                    "info",

                    "Logged Out",

                    "You signed out successfully."

                );

            }


            /*=================================
                    REMOVE LOGIN DATA
            =================================*/

            localStorage.removeItem(
                "user"
            );


            localStorage.removeItem(
                "isLoggedIn"
            );


            /*=================================
                    CLOSE POPUP
            =================================*/

            closePopup();


            /*=================================
                    SUCCESS MESSAGE
            =================================*/

            if (
                typeof showSuccess ===
                "function"
            ) {

                showSuccess(
                    "Logged out successfully."
                );

            }


            /*=================================
                    REDIRECT
            =================================*/

            setTimeout(
                function () {

                    const insidePages =
                        window.location.pathname
                            .toLowerCase()
                            .includes(
                                "/pages/"
                            );


                    window.location.href =
                        insidePages
                            ? "../index.html"
                            : "index.html";

                },
                1000
            );

        }
    );


    /*=====================================
            READY
    =====================================*/

    console.log(
        "✅ Logout popup initialized"
    );

}


/*=====================================*
* EXPORT
*=====================================*/

window.initLogoutPopup =
    initLogoutPopup;