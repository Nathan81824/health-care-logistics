/*=====================================
            AUTH JS
=====================================*/


function initAuth(){


    console.log("Auth initialized");



    const container =
    document.querySelector(".auth-container");



    if(!container){

        console.log("Auth container not found");

        return;

    }




    /*=====================================
            ELEMENTS
    =====================================*/


    const showRegister =
    document.getElementById("showRegister");


    const showLogin =
    document.getElementById("showLogin");


    const registerForm =
    document.getElementById("registerForm");


    const loginForm =
    document.getElementById("loginForm");





    /*=====================================
            SWITCH TO REGISTER
    =====================================*/


    if(showRegister){


        showRegister.onclick = (e)=>{


            e.preventDefault();


            console.log("Opening register");


            container.classList.add(
                "register-mode"
            );


        };


    }






    /*=====================================
            SWITCH TO LOGIN
    =====================================*/


    if(showLogin){


        showLogin.onclick = (e)=>{


            e.preventDefault();


            console.log("Opening login");


            container.classList.remove(
                "register-mode"
            );


        };


    }







    /*=====================================
            PASSWORD TOGGLE
    =====================================*/


    const toggles =
    document.querySelectorAll(
        ".toggle-password"
    );



    toggles.forEach(toggle=>{


        toggle.onclick = ()=>{


            const input =
            toggle.parentElement.querySelector(
                "input"
            );



            if(!input) return;




            if(input.type === "password"){


                input.type="text";


                toggle.innerHTML =
                `
                <i class="fa-solid fa-eye-slash"></i>
                `;


            }

            else{


                input.type="password";


                toggle.innerHTML =
                `
                <i class="fa-solid fa-eye"></i>
                `;


            }


        };


    });







    /*=====================================
            CREATE ACCOUNT
    =====================================*/


    if(registerForm){


        registerForm.onsubmit = (e)=>{


            e.preventDefault();




            const user = {


                name:
                document.getElementById(
                    "registerName"
                ).value,


                email:
                document.getElementById(
                    "registerEmail"
                ).value,


                password:
                document.getElementById(
                    "registerPassword"
                ).value



            };





            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );





            alert(
                "Account created successfully. Please sign in."
            );





            // return to login

            container.classList.remove(
                "register-mode"
            );





            registerForm.reset();



        };


    }









    /*=====================================
            LOGIN
    =====================================*/


    if(loginForm){


        loginForm.onsubmit = (e)=>{


            e.preventDefault();





            const savedUser =

            JSON.parse(
                localStorage.getItem("user")
            );





            const email =
            document.getElementById(
                "loginEmail"
            ).value;




            const password =
            document.getElementById(
                "loginPassword"
            ).value;







            if(
                savedUser &&
                email === savedUser.email &&
                password === savedUser.password
            ){



                alert(
                    "Login successful"
                );



                window.location.href =
                "pages/dashboard.html";



            }


            else{


                alert(
                    "Invalid email or password"
                );


            }



        };


    }



}




/*=====================================
        GLOBAL ACCESS
=====================================*/


window.initAuth = initAuth;