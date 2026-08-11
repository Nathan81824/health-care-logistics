/*=====================================*
* STORAGE JS
*=====================================*/


/*=====================================*
* SAVE USER
*=====================================*/

function saveUser(user) {

    try {

        if (
            !user ||
            typeof user !== "object"
        ) {

            console.error(
                "❌ Invalid user data."
            );

            return false;

        }


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        return true;

    }

    catch (error) {

        console.error(
            "❌ Failed to save user:",
            error
        );

        return false;

    }

}


/*=====================================*
* GET USER
*=====================================*/

function getUser() {

    try {

        const user =
            localStorage.getItem(
                "user"
            );


        if (!user) {

            return null;

        }


        const parsedUser =
            JSON.parse(user);


        return (
            parsedUser &&
            typeof parsedUser === "object"
        )
            ? parsedUser
            : null;

    }

    catch (error) {

        console.error(
            "❌ Failed to read user:",
            error
        );


        return null;

    }

}


/*=====================================*
* LOGIN STATUS
*=====================================*/

function setLoginStatus() {

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

}


/*=====================================*
* CHECK LOGIN
*=====================================*/

function isLoggedIn() {

    return (
        localStorage.getItem(
            "isLoggedIn"
        ) === "true"
    );

}


/*=====================================*
* LOGOUT
*=====================================*/

function logout() {

    /*=================================
            REMOVE USER
    =================================*/

    localStorage.removeItem(
        "user"
    );


    /*=================================
            REMOVE LOGIN STATUS
    =================================*/

    localStorage.removeItem(
        "isLoggedIn"
    );


    /*=================================
            FIND CURRENT LOCATION
    =================================*/

    const insidePages =
        window.location.pathname
            .toLowerCase()
            .includes("/pages/");


    /*=================================
            REDIRECT
    =================================*/

    window.location.href =
        insidePages
            ? "../index.html"
            : "index.html";

}


/*=====================================*
* CLEAR STORAGE
*=====================================*/

function clearStorage() {

    localStorage.clear();

}


/*=====================================*
* EXPORT
*=====================================*/

window.saveUser =
    saveUser;


window.getUser =
    getUser;


window.setLoginStatus =
    setLoginStatus;


window.isLoggedIn =
    isLoggedIn;


window.logout =
    logout;


window.clearStorage =
    clearStorage;


/*=====================================*
* READY
*=====================================*/

console.log(
    "✅ Storage system loaded"
);