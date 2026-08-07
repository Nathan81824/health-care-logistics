/*=====================================
            POPUP JS
=====================================*/


/*=====================================
        SHOW POPUP
=====================================*/

function showPopup(
    title,
    message,
    type = "success"
){


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



    if(
        !popup ||
        !popupTitle ||
        !popupMessage
    ){

        console.log(
            "Popup elements missing"
        );

        return;

    }



    popupTitle.textContent =
        title;


    popupMessage.textContent =
        message;




    popup.classList.remove(
        "error"
    );




    if(type === "error"){


        popup.classList.add(
            "error"
        );


        if(popupIcon){

            popupIcon.className =
            "fa-solid fa-xmark";

        }


    }


    else{


        if(popupIcon){

            popupIcon.className =
            "fa-solid fa-check";

        }


    }




    popup.classList.add(
        "show"
    );





    setTimeout(()=>{


        popup.classList.remove(
            "show"
        );


    },4000);



}





/*=====================================
        SUCCESS POPUP
=====================================*/


function showSuccess(message){


    showPopup(
        "Success",
        message,
        "success"
    );


}





/*=====================================
        ERROR POPUP
=====================================*/


function showError(message){


    showPopup(
        "Error",
        message,
        "error"
    );


}





/*=====================================
        WELCOME POPUP
=====================================*/


function showWelcomePopup(){


    const user =
        getUser();



    if(!user){

        return;

    }



    showPopup(

        "Welcome",

        `Welcome back ${user.name}`,

        "success"

    );


}





/*=====================================
        INIT WELCOME
=====================================*/


function initWelcomePopup(){


    setTimeout(()=>{


        showWelcomePopup();


    },800);



}





/*=====================================
        EXPORT
=====================================*/


window.showPopup =
showPopup;


window.showSuccess =
showSuccess;


window.showError =
showError;


window.initWelcomePopup =
initWelcomePopup;