/*=========================================*
* AUTH JS
* Controller
*=========================================*/


/*=========================================*
* INITIALIZE AUTH
*=========================================*/

function initAuth() {

    console.log(
        "✅ Auth initialized"
    );


    /*=====================================
    LOGIN / REGISTER PANELS
    =====================================*/

    setupAuthPanels();


    /*=====================================
    LOGIN SYSTEM
    =====================================*/

    if (
        typeof setupLogin ===
        "function"
    ) {

        setupLogin();

    }


    /*=====================================
    REGISTER SYSTEM
    =====================================*/

    if (
        typeof setupRegister ===
        "function"
    ) {

        setupRegister();

    }


    /*=====================================
    PASSWORD TOGGLE
    =====================================*/

    if (
        typeof setupPasswordToggle ===
        "function"
    ) {

        setupPasswordToggle();

    }

}


/*=========================================*
* LOGIN / REGISTER SWITCH
*=========================================*/

function setupAuthPanels() {

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


    /*=====================================
    CHECK AUTH FORMS
    =====================================*/

    if (
        !loginForm ||
        !registerForm
    ) {

        console.log(
            "Auth forms not found"
        );

        return;

    }


    /*=====================================
    SHOW REGISTER
    =====================================*/

    showRegister.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /*=========================
                HIDE LOGIN
                =========================*/

                loginForm.classList.remove(
                    "active"
                );


                /*=========================
                SHOW REGISTER
                =========================*/

                registerForm.classList.add(
                    "active"
                );


                /*=========================
                UPDATE PANELS
                =========================*/

                if (loginPanel) {

                    loginPanel.classList.add(
                        "hide"
                    );

                }


                if (registerPanel) {

                    registerPanel.classList.add(
                        "active"
                    );

                }

            }
        );

    });


    /*=====================================
    SHOW LOGIN
    =====================================*/

    showLogin.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /*=========================
                HIDE REGISTER
                =========================*/

                registerForm.classList.remove(
                    "active"
                );


                /*=========================
                SHOW LOGIN
                =========================*/

                loginForm.classList.add(
                    "active"
                );


                /*=========================
                UPDATE PANELS
                =========================*/

                if (registerPanel) {

                    registerPanel.classList.remove(
                        "active"
                    );

                }


                if (loginPanel) {

                    loginPanel.classList.remove(
                        "hide"
                    );

                }

            }
        );

    });

}


/*=========================================*
* EXPORT
*=========================================*/

window.initAuth =
    initAuth;


window.setupAuthPanels =
    setupAuthPanels;