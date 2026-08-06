/*=====================================
            POPUP JS
=====================================*/


function showPopup(
    message,
    type = "success"
){



    const popup =
    document.getElementById(
        "authPopup"
    );



    const title =
    document.getElementById(
        "popupTitle"
    );



    const popupMessage =
    document.getElementById(
        "popupMessage"
    );





    if(!popup){

        console.log(
            "Popup element not found"
        );

        return;

    }








    /*==============================
            MESSAGE
    ==============================*/


    popupMessage.textContent =
    message;






    /*==============================
            TYPE
    ==============================*/


    if(type === "error"){


        title.textContent =
        "Error";


        popup.classList.add(
            "error"
        );


    }


    else{


        title.textContent =
        "Success";


        popup.classList.remove(
            "error"
        );


    }







    /*==============================
            SHOW
    ==============================*/


    popup.classList.add(
        "show"
    );







    /*==============================
            HIDE
    ==============================*/


    setTimeout(()=>{


        popup.classList.remove(
            "show"
        );


    },3500);



}