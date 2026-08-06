/*=====================================
            AUTH CONTROLLER
=====================================*/


function initAuth(){


    console.log("Auth system started");



    /*=====================================
            AUTO LOGIN CHECK
    =====================================*/


    if(
        isLoggedIn()
    ){

        window.location.href =
        "pages/home.html";


        return;

    }





    /*=====================================
            ELEMENTS
    =====================================*/


    const loginForm =
    document.getElementById(
        "loginForm"
    );


    const registerForm =
    document.getElementById(
        "registerForm"
    );


    const loginPanel =
    document.querySelector(
        ".login-panel"
    );


    const registerPanel =
    document.querySelector(
        ".register-panel"
    );


    const showRegister =
    document.getElementById(
        "showRegister"
    );


    const showLogin =
    document.getElementById(
        "showLogin"
    );





    /*=====================================
            SWITCH TO REGISTER
    =====================================*/


    if(showRegister){


        showRegister.addEventListener(
            "click",
            ()=>{


                loginForm.classList.remove(
                    "active"
                );


                registerForm.classList.add(
                    "active"
                );



                loginPanel.classList.add(
                    "hide"
                );


                registerPanel.classList.add(
                    "active"
                );


            }
        );


    }







    /*=====================================
            SWITCH TO LOGIN
    =====================================*/


    if(showLogin){


        showLogin.addEventListener(
            "click",
            ()=>{


                registerForm.classList.remove(
                    "active"
                );


                loginForm.classList.add(
                    "active"
                );



                registerPanel.classList.remove(
                    "active"
                );


                loginPanel.classList.remove(
                    "hide"
                );


            }
        );


    }






    /*=====================================
            START MODULES
    =====================================*/


    setupPasswordToggle();


    setupLogin();


    setupRegister();


}







/*=====================================
        START WHEN PAGE LOADS
=====================================*/


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


        initAuth();


    }
);