/*=====================================
        AUTH SCRIPT LOADER
=====================================*/


const authScripts = [


    // =========================
    // AUTH STORAGE
    // =========================

    "assets/js/auth/storage.js",


    // =========================
    // VALIDATION
    // =========================

    "assets/js/auth/validation.js",


    // =========================
    // POPUP
    // =========================

    "assets/js/auth/popup.js",


    // =========================
    // PASSWORD TOGGLE
    // =========================

    "assets/js/auth/passwordToggle.js",


    // =========================
    // LOGIN
    // =========================

    "assets/js/auth/login.js",


    // =========================
    // REGISTER
    // =========================

    "assets/js/auth/register.js",


    // =========================
    // AUTH CONTROLLER
    // =========================

    "assets/js/auth/auth.js"


];





/*=====================================
        LOAD AUTH SCRIPTS
=====================================*/


authScripts.forEach(src => {


    const script =
    document.createElement("script");



    script.src = src;


    script.defer = true;



    document.body.appendChild(script);



});