/*=====================================
            STORAGE JS
=====================================*/


/*=====================================
            SAVE USER
=====================================*/


function saveUser(user){


    localStorage.setItem(

        "user",

        JSON.stringify(user)

    );


}







/*=====================================
            GET USER
=====================================*/


function getUser(){


    return JSON.parse(

        localStorage.getItem(
            "user"
        )

    );


}







/*=====================================
            LOGIN STATUS
=====================================*/


function setLoginStatus(){


    localStorage.setItem(

        "isLoggedIn",

        "true"

    );


}







/*=====================================
            CHECK LOGIN
=====================================*/


function isLoggedIn(){


    return (

        localStorage.getItem(
            "isLoggedIn"
        )
        ===
        "true"

    );


}







/*=====================================
            LOGOUT
=====================================*/


function logout(){


    localStorage.removeItem(
        "isLoggedIn"
    );


    window.location.href =
    "../index.html";


}







/*=====================================
            CLEAR ALL DATA
=====================================*/


function clearStorage(){


    localStorage.clear();


}