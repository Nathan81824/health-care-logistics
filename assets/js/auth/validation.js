/*=====================================
            VALIDATION JS
=====================================*/


/*=====================================
            EMAIL VALIDATION
=====================================*/


function isValidEmail(email){


    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    return emailPattern.test(email);


}







/*=====================================
            PASSWORD VALIDATION
=====================================*/


function isValidPassword(password){


    return password.length >= 6;


}







/*=====================================
            REQUIRED FIELD CHECK
=====================================*/


function hasValue(value){


    return value.trim().length > 0;


}







/*=====================================
            REGISTER VALIDATION
=====================================*/


function validateRegister(
    name,
    email,
    password
){



    if(
        !hasValue(name) ||
        !hasValue(email) ||
        !hasValue(password)
    ){


        return {

            valid:false,

            message:
            "Please complete all fields."

        };


    }





    if(
        !isValidEmail(email)
    ){


        return {

            valid:false,

            message:
            "Please enter a valid email address."

        };


    }





    if(
        !isValidPassword(password)
    ){


        return {

            valid:false,

            message:
            "Password must be at least 6 characters."

        };


    }





    return {


        valid:true,

        message:
        "Valid"

    };



}







/*=====================================
            LOGIN VALIDATION
=====================================*/


function validateLogin(
    email,
    password
){



    if(
        !hasValue(email) ||
        !hasValue(password)
    ){


        return {

            valid:false,

            message:
            "Please enter email and password."

        };


    }





    if(
        !isValidEmail(email)
    ){


        return {

            valid:false,

            message:
            "Invalid email format."

        };


    }





    return {


        valid:true,

        message:
        "Valid"


    };



}