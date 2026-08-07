/*=====================================
        PASSWORD TOGGLE JS
=====================================*/


function setupPasswordToggle(){


    console.log("✅ Password toggle initialized");



    const buttons =
        document.querySelectorAll(
            ".toggle-password"
        );



    if(!buttons.length){

        console.log(
            "No password buttons found"
        );

        return;

    }





    buttons.forEach(button => {



        button.addEventListener(
            "click",
            function(){



                const input =
                    this.parentElement.querySelector(
                        "input"
                    );



                const icon =
                    this.querySelector("i");



                if(!input || !icon){

                    return;

                }




                if(input.type === "password"){


                    input.type = "text";



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


                }


                else{


                    input.type = "password";



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


                }



            }
        );



    });



}





window.setupPasswordToggle =
setupPasswordToggle;