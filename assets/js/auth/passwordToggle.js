/*=====================================
        PASSWORD TOGGLE JS
=====================================*/


function setupPasswordToggle(){


    const toggleButtons =
    document.querySelectorAll(
        ".toggle-password"
    );





    if(toggleButtons.length === 0){

        console.log(
            "Password toggle buttons not found"
        );

        return;

    }







    toggleButtons.forEach(button=>{


        button.addEventListener(
            "click",
            ()=>{



                const input =
                button.parentElement.querySelector(
                    "input"
                );



                const icon =
                button.querySelector(
                    "i"
                );






                if(!input) return;







                if(
                    input.type === "password"
                ){


                    input.type = "text";



                    icon.classList.remove(
                        "fa-eye"
                    );


                    icon.classList.add(
                        "fa-eye-slash"
                    );



                    button.setAttribute(
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



                    button.setAttribute(
                        "aria-label",
                        "Show password"
                    );



                }




            }
        );



    });



}