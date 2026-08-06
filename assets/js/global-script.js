/*=====================================
        GLOBAL SCRIPT LOADER
=====================================*/


const globalScripts = [


    // =========================
    // CORE
    // =========================


    "assets/js/core/helpers.js",

    "assets/js/core/utilities.js",

    "assets/js/core/loader.js",

    "assets/js/core/animations.js",

    "assets/js/core/observer.js",

    "assets/js/core/scroll.js",

    "assets/js/core/scrollBar.js",

    "assets/js/core/scrollReveal.js",

    "assets/js/core/main.js",




    // =========================
    // GLOBAL UTILITIES
    // =========================


    "assets/js/utilities.js"


];






/*=====================================
        LOAD GLOBAL SCRIPTS
=====================================*/


globalScripts.forEach(src=>{


    const script =
    document.createElement("script");


    script.src = src;


    script.defer = true;


    document.body.appendChild(script);


});