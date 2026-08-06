/*=====================================
            REGISTER JS
=====================================*/


function setupRegister(){


    const registerForm =
    document.getElementById(
        "registerForm"
    );




    if(!registerForm){


        console.log(
            "Register form not found"
        );


        return;


    }







    registerForm.addEventListener(
        "submit",
        (e)=>{


            e.preventDefault();





            /*==============================
                GET VALUES
            ==============================*/


            const name =
            document.getElementById(
                "registerName"
            ).value.trim();




            const email =
            document.getElementById(
                "registerEmail"
            ).value.trim();




            const password =
            document.getElementById(
                "registerPassword"
            ).value;









            /*==============================
                VALIDATE INPUT
            ==============================*/


            const validation =
            validateRegister(
                name,
                email,
                password
            );





            if(!validation.valid){


                showPopup(
                    validation.message,
                    "error"
                );


                return;


            }









            /*==============================
                CHECK EXISTING USER
            ==============================*/


            const existingUser =
            getUser();





            if(
                existingUser &&
                existingUser.email === email
            ){


                showPopup(
                    "Account already exists.",
                    "error"
                );


                return;


            }









            /*==============================
                SAVE ACCOUNT
            ==============================*/


            const user = {


                name:name,


                email:email,


                password:password



            };







            saveUser(user);








            showPopup(
                "Account created successfully."
            );









            registerForm.reset();








            /*==============================
                RETURN TO LOGIN
            ==============================*/


            setTimeout(()=>{


                const loginForm =
                document.getElementById(
                    "loginForm"
                );


                const loginPanel =
                document.querySelector(
                    ".login-panel"
                );


                const registerPanel =
                document.querySelector(
                    ".register-panel"
                );




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



            },1000);




        }

    );



}