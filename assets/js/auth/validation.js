/*=====================================
        AUTH VALIDATION JS
=====================================*/


/*=====================================
        EMAIL VALIDATION
=====================================*/


function validateEmail(email){


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(email);


}





/*=====================================
        PASSWORD VALIDATION
=====================================*/


function validatePassword(password){


    return password.length >= 6;


}





/*=====================================
        REQUIRED FIELD
=====================================*/


function validateRequired(value){


    return value.trim() !== "";


}





/*=====================================
        REGISTER VALIDATION
=====================================*/


function validateRegister(data){



    if(!validateRequired(data.name)){


        return {

            valid:false,

            message:
            "Please enter your full name."

        };


    }





    if(!validateEmail(data.email)){


        return {

            valid:false,

            message:
            "Please enter a valid email address."

        };


    }





    if(!validatePassword(data.password)){


        return {

            valid:false,

            message:
            "Password must be at least 6 characters."

        };


    }





    if(
        data.password !==
        data.confirmPassword
    ){


        return {

            valid:false,

            message:
            "Passwords do not match."

        };


    }





    return {

        valid:true,

        message:
        "Validation successful."

    };


}





/*=====================================
        LOGIN VALIDATION
=====================================*/


function validateLogin(data){



    if(!validateEmail(data.email)){


        return {

            valid:false,

            message:
            "Invalid email address."

        };


    }





    if(!validateRequired(data.password)){


        return {

            valid:false,

            message:
            "Please enter your password."

        };


    }





    return {


        valid:true,

        message:
        "Validation successful."


    };


}





/*=====================================
            EXPORT
=====================================*/


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