/*=====================================*
* LOGIN JS
*=====================================*/


/*=====================================*
* SETUP LOGIN
*=====================================*/

function setupLogin() {

    console.log(
        "✅ Login initialized"
    );


    /*=====================================
    GET LOGIN FORM
    =====================================*/

    const form =
        document.getElementById(
            "loginForm"
        );


    if (!form) {

        console.log(
            "Login form not found"
        );

        return;

    }


    /*=====================================
    PREVENT DUPLICATE LISTENER
    =====================================*/

    if (
        form.dataset.loginReady ===
        "true"
    ) {

        return;

    }


    form.dataset.loginReady =
        "true";


    /*=====================================
    LOGIN SUBMIT
    =====================================*/

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /*=================================
            GET EMAIL
            =================================*/

            const emailInput =
                document.getElementById(
                    "loginEmail"
                );


            /*=================================
            GET PASSWORD
            =================================*/

            const passwordInput =
                document.getElementById(
                    "loginPassword"
                );


            if (
                !emailInput ||
                !passwordInput
            ) {

                showPopup(
                    "Error",
                    "Login fields could not be found.",
                    "error"
                );

                return;

            }


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            /*=================================
            VALIDATE LOGIN INPUT
            =================================*/

            if (
                typeof validateLogin !==
                "function"
            ) {

                console.error(
                    "validateLogin() is not available."
                );


                showPopup(
                    "Error",
                    "Login validation is unavailable.",
                    "error"
                );

                return;

            }


            const result =
                validateLogin({

                    email: email,

                    password: password

                });


            /*=================================
            VALIDATION FAILED
            =================================*/

            if (
                !result ||
                !result.valid
            ) {

                showPopup(

                    "Error",

                    result?.message ||
                        "Please enter valid login details.",

                    "error"

                );

                return;

            }


            /*=================================
            GET STORED USER
            =================================*/

            if (
                typeof getUser !==
                "function"
            ) {

                console.error(
                    "getUser() is not available."
                );


                showPopup(
                    "Error",
                    "User account data could not be loaded.",
                    "error"
                );

                return;

            }


            const user =
                getUser();


            /*=================================
            CHECK ACCOUNT
            =================================*/

            if (!user) {

                showPopup(

                    "Error",

                    "No account found. Please create an account first.",

                    "error"

                );

                return;

            }


            /*=================================
            CHECK EMAIL AND PASSWORD
            =================================*/

            if (
                user.email !== email ||
                user.password !== password
            ) {

                showPopup(

                    "Login Failed",

                    "Incorrect email or password.",

                    "error"

                );

                return;

            }


            /*=================================
            LOGIN SUCCESS
            =================================*/

            if (
                typeof setLoginStatus ===
                "function"
            ) {

                setLoginStatus();

            }
            else {

                /*
                    Fallback so the
                    auth guard still works.
                */

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

            }


            /*=================================
            LOGIN NOTIFICATION
            =================================*/

            if (
                typeof addNotification ===
                "function"
            ) {

                addNotification(

                    "success",

                    "Login Successful",

                    `Welcome back, ${user.name}!`

                );

            }


            /*=================================
            SUCCESS POPUP
            =================================*/

            if (
                typeof showPopup ===
                "function"
            ) {

                showPopup(

                    "Welcome Back",

                    `Welcome back ${user.name}`,

                    "success"

                );

            }


            /*=================================
            RESET FORM
            =================================*/

            form.reset();


            /*=================================
            REDIRECT TO DASHBOARD
            =================================*/

            setTimeout(() => {

                const insidePages =
                    window.location.pathname
                        .toLowerCase()
                        .includes(
                            "/pages/"
                        );


                window.location.href =
                    insidePages
                        ? "dashboard.html"
                        : "pages/dashboard.html";


            }, 1500);

        }
    );

}


/*=====================================*
* EXPORT
*=====================================*/

window.setupLogin =
    setupLogin;