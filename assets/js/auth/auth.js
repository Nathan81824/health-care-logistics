/*=========================================
        AUTH JS
        Controller
=========================================*/


function initAuth(){


    console.log(
        "✅ Auth initialized"
    );



    setupAuthPanels();



    // Start other auth systems

    if(typeof setupLogin === "function"){

        setupLogin();

    }



    if(typeof setupRegister === "function"){

        setupRegister();

    }



    if(typeof setupPasswordToggle === "function"){

        setupPasswordToggle();

    }



}







/*=========================================
        LOGIN REGISTER SWITCH
=========================================*/


function setupAuthPanels(){



    const showRegister =
        document.querySelectorAll(
            "#showRegister"
        );



    const showLogin =
        document.querySelectorAll(
            "#showLogin"
        );



    const loginForm =
        document.querySelector(
            ".login-form"
        );



    const registerForm =
        document.querySelector(
            ".register-form"
        );



    const loginPanel =
        document.querySelector(
            ".login-panel"
        );



    const registerPanel =
        document.querySelector(
            ".register-panel"
        );







    if(
        !loginForm ||
        !registerForm
    ){


        console.log(
            "Auth forms not found"
        );


        return;


    }









    showRegister.forEach(button=>{


        button.addEventListener(
            "click",
            function(e){


                e.preventDefault();





                loginForm.classList.remove(
                    "active"
                );


                registerForm.classList.add(
                    "active"
                );





                loginPanel?.classList.add(
                    "hide"
                );


                registerPanel?.classList.add(
                    "active"
                );



            }
        );


    });









    showLogin.forEach(button=>{


        button.addEventListener(
            "click",
            function(e){


                e.preventDefault();






                registerForm.classList.remove(
                    "active"
                );



                loginForm.classList.add(
                    "active"
                );








                registerPanel?.classList.remove(
                    "active"
                );



                loginPanel?.classList.remove(
                    "hide"
                );



            }
        );


    });



}








/*=====================================
        START AUTH
=====================================*/







/*=====================================
            EXPORT
=====================================*/


window.initAuth =
initAuth;