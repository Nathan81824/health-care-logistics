/*=====================================
            AUTH GUARD JS
=====================================*/


function authGuard(){


    console.log(
        "🔐 Auth guard running"
    );



    const protectedPages = [

        "dashboard.html"

    ];





    const currentPage =
        window.location.pathname
        .split("/")
        .pop();






    // Check if page is protected

    if(
        protectedPages.includes(currentPage)
    ){



        const loggedIn =
            localStorage.getItem(
                "isLoggedIn"
            );





        if(loggedIn !== "true"){



            const insidePages =
                window.location.pathname.includes(
                    "/pages/"
                );





            window.location.href =
                insidePages
                ? "../index.html"
                : "index.html";




            return false;


        }



    }





    return true;


}







/*=====================================
            START GUARD
=====================================*/


document.addEventListener(
    "DOMContentLoaded",
    function(){


        authGuard();


    }
);







/*=====================================
            EXPORT
=====================================*/


window.authGuard =
authGuard;