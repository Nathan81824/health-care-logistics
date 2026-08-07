/*=====================================
        LOGOUT POPUP JS
=====================================*/

function initLogoutPopup(){


    const popup =
        document.getElementById(
            "logoutPopup"
        );


    const overlay =
        document.getElementById(
            "logoutOverlay"
        );


    const logoutLink =
        document.getElementById(
            "navLogout"
        );


    const cancelButton =
        document.getElementById(
            "cancelLogout"
        );


    const confirmButton =
        document.getElementById(
            "confirmLogout"
        );



    if(
        !popup ||
        !logoutLink ||
        !cancelButton ||
        !confirmButton
    ){

        console.log(
            "Logout popup not found"
        );

        return;

    }



    /*=====================================
            OPEN POPUP
    =====================================*/

    logoutLink.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            popup.classList.add(
                "show"
            );

        }
    );



    /*=====================================
            CLOSE POPUP
    =====================================*/

    function closePopup(){

        popup.classList.remove(
            "show"
        );

    }



    cancelButton.addEventListener(
        "click",
        closePopup
    );



    overlay.addEventListener(
        "click",
        closePopup
    );



    document.addEventListener(
        "keydown",
        function(e){

            if(
                e.key === "Escape"
            ){

                closePopup();

            }

        }
    );



    /*=====================================
            CONFIRM LOGOUT
    =====================================*/

    confirmButton.addEventListener(
        "click",
        function(){


            localStorage.removeItem(
                "user"
            );


            localStorage.removeItem(
                "isLoggedIn"
            );


            closePopup();



            if(
                typeof showSuccess ===
                "function"
            ){

                showSuccess(
                    "Logged out successfully."
                );

            }



            setTimeout(()=>{


                const insidePages =
                    window.location.pathname.includes(
                        "/pages/"
                    );


                window.location.href =
                    insidePages
                    ? "../index.html"
                    : "index.html";


            },1000);


        }
    );


}



/*=====================================
        EXPORT
=====================================*/

window.initLogoutPopup =
initLogoutPopup;