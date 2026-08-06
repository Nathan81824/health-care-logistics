/*=====================================
            LOGIN JS
=====================================*/


function setupLogin(){


    const loginForm =
    document.getElementById(
        "loginForm"
    );



    if(!loginForm){

        console.log(
            "Login form not found"
        );

        return;

    }





    loginForm.addEventListener(
        "submit",
        (e)=>{


            e.preventDefault();





            const email =
            document.getElementById(
                "loginEmail"
            ).value.trim();




            const password =
            document.getElementById(
                "loginPassword"
            ).value;






            /*==============================
                GET SAVED USER
            ==============================*/


            const user =
            getUser();







            if(!user){


                showPopup(
                    "No account found. Please register first.",
                    "error"
                );


                return;


            }








            /*==============================
                CHECK DETAILS
            ==============================*/


            if(
                email === user.email &&
                password === user.password
            ){



                setLoginStatus();





                showPopup(
                    "Login successful."
                );





                setTimeout(()=>{


                    window.location.href =
                    "pages/home.html";



                },1200);



            }



            else{


                showPopup(
                    "Invalid email or password.",
                    "error"
                );


            }





        }
    );



}