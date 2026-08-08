/*=====================================
        REGISTER JS
=====================================*/


function setupRegister(){


    console.log(
        "✅ Register initialized"
    );



    const form =
        document.getElementById(
            "registerForm"
        );



    if(!form){

        console.log(
            "Register form not found"
        );

        return;

    }





    form.addEventListener(
        "submit",
        function(e){


            e.preventDefault();




            const name =
                document
                .getElementById(
                    "registerName"
                )
                .value
                .trim();




            const email =
                document
                .getElementById(
                    "registerEmail"
                )
                .value
                .trim();




            const password =
                document
                .getElementById(
                    "registerPassword"
                )
                .value;





            const confirmPassword =
                document
                .getElementById(
                    "confirmPassword"
                )
                ?.value;







            const result =
                validateRegister({

                    name:name,

                    email:email,

                    password:password,

                    confirmPassword:
                    confirmPassword


                });






            if(!result.valid){


                showPopup(

                    "Error",

                    result.message,

                    "error"

                );


                return;

            }





            const user = {


                name:name,

                email:email,

                password:password


            };






saveUser(user);



setLoginStatus();



addNotification(

    "success",

    "Account Created",

    "Welcome to IDOKO LEGACY!"

);





showPopup(

    "Success",

    "Account created successfully."

);






            form.reset();







            /* SWITCH TO LOGIN */

            setTimeout(()=>{



                const showLogin =
                    document.getElementById(
                        "showLogin"
                    );



                if(showLogin){

                    showLogin.click();

                }



            },1500);





        }
    );



}





/*=====================================
            EXPORT
=====================================*/


window.setupRegister =
setupRegister;