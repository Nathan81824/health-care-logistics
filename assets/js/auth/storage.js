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

    const user =
        localStorage.getItem("user");


    return user
        ? JSON.parse(user)
        : null;

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
        localStorage.getItem("isLoggedIn")
        ===
        "true"
    );

}



/*=====================================
            LOGOUT
=====================================*/

function logout(){

    localStorage.removeItem("user");

    localStorage.removeItem("isLoggedIn");


    const insidePages =
        window.location.pathname.includes("/pages/");


    window.location.href =
        insidePages
        ? "../index.html"
        : "index.html";

}



/*=====================================
            CLEAR STORAGE
=====================================*/

function clearStorage(){

    localStorage.clear();

}