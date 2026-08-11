/*=====================================*
* POPUP JS
*=====================================*/


/*=====================================*
* POPUP TIMER
*=====================================*/

let popupTimer = null;


/*=====================================*
* SHOW POPUP
*=====================================*/

function showPopup(
    title,
    message,
    type = "success"
) {

    const popup =
        document.getElementById(
            "authPopup"
        );


    const popupTitle =
        document.getElementById(
            "popupTitle"
        );


    const popupMessage =
        document.getElementById(
            "popupMessage"
        );


    const popupIcon =
        document.querySelector(
            ".popup-icon i"
        );


    /*=================================
            CHECK ELEMENTS
    =================================*/

    if (
        !popup ||
        !popupTitle ||
        !popupMessage
    ) {

        console.log(
            "Popup elements missing"
        );

        return;

    }


    /*=================================
            SET CONTENT
    =================================*/

    popupTitle.textContent =
        title || "Notification";


    popupMessage.textContent =
        message || "";


    /*=================================
            RESET TYPE
    =================================*/

    popup.classList.remove(
        "error"
    );


    /*=================================
            ERROR POPUP
    =================================*/

    if (
        type === "error"
    ) {

        popup.classList.add(
            "error"
        );


        if (popupIcon) {

            popupIcon.className =
                "fa-solid fa-xmark";

        }

    }


    /*=================================
            SUCCESS POPUP
    =================================*/

    else {

        if (popupIcon) {

            popupIcon.className =
                "fa-solid fa-check";

        }

    }


    /*=================================
            SHOW POPUP
    =================================*/

    popup.classList.add(
        "show"
    );


    /*=================================
            CLEAR OLD TIMER
    =================================*/

    if (popupTimer) {

        clearTimeout(
            popupTimer
        );

    }


    /*=================================
            AUTO CLOSE
    =================================*/

    popupTimer =
        setTimeout(
            () => {

                popup.classList.remove(
                    "show"
                );

                popupTimer = null;

            },
            4000
        );

}


/*=====================================*
* SUCCESS POPUP
*=====================================*/

function showSuccess(
    message
) {

    showPopup(
        "Success",
        message,
        "success"
    );

}


/*=====================================*
* ERROR POPUP
*=====================================*/

function showError(
    message
) {

    showPopup(
        "Error",
        message,
        "error"
    );

}


/*=====================================*
* WELCOME POPUP
*=====================================*/

function showWelcomePopup() {

    /*=================================
            GET USER
    =================================*/

    if (
        typeof getUser !== "function"
    ) {

        console.log(
            "getUser() is not available"
        );

        return;

    }


    const user =
        getUser();


    /*=================================
            NO USER
    =================================*/

    if (!user) {

        return;

    }


    /*=================================
            SHOW WELCOME
    =================================*/

    showPopup(

        "Welcome",

        `Welcome back ${user.name}`,

        "success"

    );

}


/*=====================================*
* INIT WELCOME
*=====================================*/

function initWelcomePopup() {

    setTimeout(
        () => {

            showWelcomePopup();

        },
        800
    );

}


/*=====================================*
* EXPORT
*=====================================*/

window.showPopup =
    showPopup;


window.showSuccess =
    showSuccess;


window.showError =
    showError;


window.showWelcomePopup =
    showWelcomePopup;


window.initWelcomePopup =
    initWelcomePopup;


/*=====================================*
* READY
*=====================================*/

console.log(
    "✅ Popup system loaded"
);