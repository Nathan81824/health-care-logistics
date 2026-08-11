/*=====================================*
* REGISTER JS
*=====================================*/


/*=====================================*
* SETUP REGISTER
*=====================================*/

function setupRegister() {

    console.log(
        "✅ Register initialized"
    );


    /*=================================
            GET REGISTER FORM
    =================================*/

    const form =
        document.getElementById(
            "registerForm"
        );


    if (!form) {

        console.log(
            "Register form not found"
        );

        return;

    }


    /*=================================
            PREVENT DUPLICATE LISTENER
    =================================*/

    if (
        form.dataset.registerReady ===
        "true"
    ) {

        return;

    }


    form.dataset.registerReady =
        "true";


    /*=================================
            FORM SUBMIT
    =================================*/

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            /*=================================
                    GET FORM VALUES
            =================================*/

            const nameInput =
                document.getElementById(
                    "registerName"
                );


            const emailInput =
                document.getElementById(
                    "registerEmail"
                );


            const passwordInput =
                document.getElementById(
                    "registerPassword"
                );


            const confirmPasswordInput =
                document.getElementById(
                    "confirmPassword"
                );


            /*=================================
                    CHECK INPUTS
            =================================*/

            if (
                !nameInput ||
                !emailInput ||
                !passwordInput
            ) {

                showPopup(
                    "Error",
                    "Registration form is incomplete.",
                    "error"
                );

                return;

            }


            /*=================================
                    GET VALUES
            =================================*/

            const name =
                nameInput.value.trim();


            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            const confirmPassword =
                confirmPasswordInput
                    ? confirmPasswordInput.value
                    : "";


            /*=================================
                    VALIDATE REGISTER
            =================================*/

            if (
                typeof validateRegister !==
                "function"
            ) {

                console.error(
                    "validateRegister() is not available."
                );

                showPopup(
                    "Error",
                    "Registration validation is unavailable.",
                    "error"
                );

                return;

            }


            const result =
                validateRegister({

                    name: name,

                    email: email,

                    password: password,

                    confirmPassword:
                        confirmPassword

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
                    "Please check your information.",

                    "error"

                );

                return;

            }


            /*=================================
                    CREATE USER
            =================================*/

            const user = {

                name: name,

                email: email,

                password: password

            };


            /*=================================
                    SAVE USER
            =================================*/

            if (
                typeof saveUser !==
                "function"
            ) {

                console.error(
                    "saveUser() is not available."
                );

                showPopup(
                    "Error",
                    "Unable to create your account.",
                    "error"
                );

                return;

            }


            saveUser(
                user
            );


            /*=================================
                    LOGIN STATUS
            =================================*/

            if (
                typeof setLoginStatus ===
                "function"
            ) {

                setLoginStatus();

            }


            /*=================================
                    ADD NOTIFICATION
            =================================*/

            if (
                typeof addNotification ===
                "function"
            ) {

                addNotification(

                    "success",

                    "Account Created",

                    "Welcome to IDOKO LEGACY!"

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

                    "Success",

                    "Account created successfully.",

                    "success"

                );

            }


            /*=================================
                    RESET FORM
            =================================*/

            form.reset();


            /*=================================
                    SWITCH TO LOGIN
            =================================*/

            setTimeout(
                () => {

                    const showLogin =
                        document.getElementById(
                            "showLogin"
                        );


                    if (showLogin) {

                        showLogin.click();

                    }

                },
                1500
            );

        }
    );

}


/*=====================================*
* EXPORT
*=====================================*/

window.setupRegister =
    setupRegister;


/*=====================================*
* READY
*=====================================*/

console.log(
    "✅ Register system loaded"
);