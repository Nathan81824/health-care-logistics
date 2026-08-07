/*=====================================
            MAIN
=====================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initApplication();

    }
);


/*=====================================
        APPLICATION
=====================================*/

function initApplication() {


    /*==============================
            CORE
    ==============================*/


    if(typeof initLoader === "function"){

        initLoader();

    }


    if(typeof initDarkMode === "function"){

        initDarkMode();

    }



    if(typeof initScrollReveal === "function"){

        initScrollReveal();

    }



    if(typeof initNavbarScroll === "function"){

        initNavbarScroll();

    }



    /*==============================
            NAVBAR
    ==============================*/


    if(typeof initNavbar === "function"){

        initNavbar();

    }



    if(typeof initProfile === "function"){

        initProfile();

    }



    if(typeof initLogout === "function"){

        initLogout();

    }



    /*==============================
            AUTH
    ==============================*/


    if(typeof initAuth === "function"){

        initAuth();

    }



    /*==============================
            PAGES
    ==============================*/


    if(typeof initHome === "function"){

        initHome();

    }


    if(typeof initAbout === "function"){

        initAbout();

    }


    if(typeof initServices === "function"){

        initServices();

    }


    if(typeof initIndustries === "function"){

        initIndustries();

    }


    if(typeof initHipaa === "function"){

        initHipaa();

    }


    if(typeof initContact === "function"){

        initContact();

    }


    if(typeof initDashboard === "function"){

        initDashboard();

    }


}



/*=====================================
        NAVBAR SCROLL EFFECT
=====================================*/


/*=====================================
        NAVBAR SCROLL COLOR
=====================================*/

function initNavbarScroll(){


    const header =
        document.querySelector(
            ".header"
        );


    if(!header){

        console.log(
            "Navbar not loaded yet"
        );

        return;

    }



    function checkScroll(){


        if(window.scrollY > 50){


            header.classList.add(
                "scrolled"
            );


        }else{


            header.classList.remove(
                "scrolled"
            );


        }


    }



    window.addEventListener(
        "scroll",
        checkScroll
    );


    // check immediately
    checkScroll();


}