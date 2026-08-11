/*=====================================*
* PASSWORD TOGGLE JS
*=====================================*/


/*=====================================*
* SETUP PASSWORD TOGGLE
*=====================================*/

function setupPasswordToggle() {

    console.log(
        "✅ Password toggle initialized"
    );


    /*=====================================
    FIND TOGGLE BUTTONS
    =====================================*/

    const buttons =
        document.querySelectorAll(
            ".toggle-password"
        );


    if (!buttons.length) {

        console.log(
            "No password buttons found"
        );

        return;

    }


    /*=====================================
    INITIALIZE BUTTONS
    =====================================*/

    buttons.forEach(button => {


        /*=================================
        PREVENT DUPLICATE LISTENER
        =================================*/

        if (
            button.dataset.passwordReady ===
            "true"
        ) {

            return;

        }


        button.dataset.passwordReady =
            "true";


        /*=================================
        CLICK
        =================================*/

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                /*=============================
                FIND INPUT
                =============================*/

                const input =
                    this.parentElement
                        ?.querySelector(
                            "input"
                        );


                /*=============================
                FIND ICON
                =============================*/

                const icon =
                    this.querySelector(
                        "i"
                    );


                if (
                    !input ||
                    !icon
                ) {

                    return;

                }


                /*=================================
                SHOW PASSWORD
                =================================*/

                if (
                    input.type ===
                    "password"
                ) {

                    input.type =
                        "text";


                    icon.classList.remove(
                        "fa-eye"
                    );


                    icon.classList.add(
                        "fa-eye-slash"
                    );


                    this.setAttribute(
                        "aria-label",
                        "Hide password"
                    );


                    this.setAttribute(
                        "title",
                        "Hide password"
                    );


                    input.focus();

                }


                /*=================================
                HIDE PASSWORD
                =================================*/

                else {

                    input.type =
                        "password";


                    icon.classList.remove(
                        "fa-eye-slash"
                    );


                    icon.classList.add(
                        "fa-eye"
                    );


                    this.setAttribute(
                        "aria-label",
                        "Show password"
                    );


                    this.setAttribute(
                        "title",
                        "Show password"
                    );


                    input.focus();

                }

            }
        );

    });

}


/*=====================================*
* EXPORT
*=====================================*/

window.setupPasswordToggle =
    setupPasswordToggle;