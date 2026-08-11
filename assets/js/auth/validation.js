/*=====================================*
* AUTH VALIDATION JS
*=====================================*/


/*=====================================*
* EMAIL VALIDATION
*=====================================*/

function validateEmail(email) {

    if (
        typeof email !== "string"
    ) {

        return false;

    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email.trim()
    );

}


/*=====================================*
* PASSWORD VALIDATION
*=====================================*/

function validatePassword(password) {

    if (
        typeof password !== "string"
    ) {

        return false;

    }


    return (
        password.length >= 6
    );

}


/*=====================================*
* REQUIRED FIELD
*=====================================*/

function validateRequired(value) {

    if (
        typeof value !== "string"
    ) {

        return false;

    }


    return (
        value.trim() !== ""
    );

}


/*=====================================*
* REGISTER VALIDATION
*=====================================*/

function validateRegister(data) {

    if (
        !data ||
        typeof data !== "object"
    ) {

        return {

            valid: false,

            message:
                "Invalid registration data."

        };

    }


    /*=================================
            FULL NAME
    =================================*/

    if (
        !validateRequired(
            data.name
        )
    ) {

        return {

            valid: false,

            message:
                "Please enter your full name."

        };

    }


    /*=================================
            EMAIL
    =================================*/

    if (
        !validateEmail(
            data.email
        )
    ) {

        return {

            valid: false,

            message:
                "Please enter a valid email address."

        };

    }


    /*=================================
            PASSWORD
    =================================*/

    if (
        !validatePassword(
            data.password
        )
    ) {

        return {

            valid: false,

            message:
                "Password must be at least 6 characters."

        };

    }


    /*=================================
            CONFIRM PASSWORD
    =================================*/

    if (
        data.password !==
        data.confirmPassword
    ) {

        return {

            valid: false,

            message:
                "Passwords do not match."

        };

    }


    /*=================================
            SUCCESS
    =================================*/

    return {

        valid: true,

        message:
            "Validation successful."

    };

}


/*=====================================*
* LOGIN VALIDATION
*=====================================*/

function validateLogin(data) {

    if (
        !data ||
        typeof data !== "object"
    ) {

        return {

            valid: false,

            message:
                "Invalid login data."

        };

    }


    /*=================================
            EMAIL
    =================================*/

    if (
        !validateEmail(
            data.email
        )
    ) {

        return {

            valid: false,

            message:
                "Invalid email address."

        };

    }


    /*=================================
            PASSWORD
    =================================*/

    if (
        !validateRequired(
            data.password
        )
    ) {

        return {

            valid: false,

            message:
                "Please enter your password."

        };

    }


    /*=================================
            SUCCESS
    =================================*/

    return {

        valid: true,

        message:
            "Validation successful."

    };

}


/*=====================================*
* EXPORT
*=====================================*/

window.validateEmail =
    validateEmail;


window.validatePassword =
    validatePassword;


window.validateRequired =
    validateRequired;


window.validateRegister =
    validateRegister;


window.validateLogin =
    validateLogin;


/*=====================================*
* READY
*=====================================*/

console.log(
    "✅ Auth validation loaded"
);