/*=====================================
        LOGIN JS
=====================================*/


function setupLogin(){


    console.log(
        "✅ Login initialized"
    );



    const form =
        document.getElementById(
            "loginForm"
        );



    if(!form){

        console.log(
            "Login form not found"
        );

        return;

    }





    form.addEventListener(
        "submit",
        function(e){


            e.preventDefault();





            const email =
                document
                .getElementById(
                    "loginEmail"
                )
                .value
                .trim();





            const password =
                document
                .getElementById(
                    "loginPassword"
                )
                .value;







            const result =
                validateLogin({

                    email:email,

                    password:password

                });







            if(!result.valid){


                showPopup(

                    "Error",

                    result.message,

                    "error"

                );


                return;

            }








            const user =
                getUser();








            if(!user){


                showPopup(

                    "Error",

                    "No account found. Please create an account first.",

                    "error"

                );


                return;

            }








            if(
                user.email !== email ||
                user.password !== password
            ){


                showPopup(

                    "Login Failed",

                    "Incorrect email or password.",

                    "error"

                );


                return;

            }








setLoginStatus();



addNotification(

    "success",

    "Login Successful",

    `Welcome back, ${user.name}!`

);


showPopup(

    "Welcome Back",

    `Welcome back ${user.name}`,

    "success"

);







            form.reset();








            setTimeout(()=>{



                const insidePages =
                    window.location.pathname.includes(
                        "/pages/"
                    );



                window.location.href =
                    insidePages
                    ? "dashboard.html"
                    : "pages/dashboard.html";



            },1500);







        }
    );



}





/*=====================================
            EXPORT
=====================================*/


window.setupLogin =
setupLogin;