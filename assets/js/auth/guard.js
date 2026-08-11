/*=====================================*
* AUTH GUARD JS
*=====================================*/


/*=====================================*
* AUTH GUARD
*=====================================*/

function authGuard() {

    console.log(
        "🔐 Auth guard running"
    );


    /*=====================================
    PROTECTED PAGES
    =====================================*/

    const protectedPages = [

        "dashboard.html"

    ];


    /*=====================================
    GET CURRENT PAGE
    =====================================*/

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    /*=====================================
    CHECK IF PAGE IS PROTECTED
    =====================================*/

    if (
        !protectedPages.includes(
            currentPage
        )
    ) {

        return true;

    }


    /*=====================================
    CHECK LOGIN STATUS
    =====================================*/

    const loggedIn =
        localStorage.getItem(
            "isLoggedIn"
        );


    /*=====================================
    REDIRECT IF NOT LOGGED IN
    =====================================*/

    if (
        loggedIn !== "true"
    ) {

        const insidePages =
            window.location.pathname
                .toLowerCase()
                .includes("/pages/");


        const loginPage =
            insidePages
                ? "../index.html"
                : "index.html";


        console.log(
            "🔒 Access denied. Redirecting to login."
        );


        window.location.href =
            loginPage;


        return false;

    }


    /*=====================================
    ACCESS GRANTED
    =====================================*/

    console.log(
        "✅ Authentication verified"
    );


    return true;

}


/*=====================================*
* START AUTH GUARD
*=====================================*/

function startAuthGuard() {

    authGuard();

}


/*=====================================*
* DOM READY
*=====================================*/

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startAuthGuard,
        {
            once: true
        }
    );

} else {

    startAuthGuard();

}


/*=====================================*
* EXPORT
*=====================================*/

window.authGuard =
    authGuard;

window.startAuthGuard =
    startAuthGuard;