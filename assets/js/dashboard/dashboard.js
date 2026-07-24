/* ==========================================
        DASHBOARD JS
========================================== */



function initDashboard(){


    console.log("Dashboard started");



    /* ===============================
            LOAD COMPONENTS
    =============================== */


    loadSection(
        "../components/dashboard/sidebar.html",
        "sidebar-container",
        ()=>{


            initSidebarActive();


            loadUserProfile();


            initLogout();


        }
    );






    loadSection(
        "../components/dashboard/topbar.html",
        "topbar-container"
    );






    loadSection(
        "../components/dashboard/overview.html",
        "overview-container"
    );



}









/* ==========================================
        SIDEBAR ACTIVE LINK
========================================== */


function initSidebarActive(){



    const links =

    document.querySelectorAll(
        ".nav-link"
    );




    links.forEach(link=>{



        link.addEventListener(
        "click",
        (e)=>{


            e.preventDefault();



            links.forEach(item=>{


                item.classList.remove(
                    "active"
                );


            });





            link.classList.add(
                "active"
            );



        });



    });



}









/* ==========================================
        LOAD USER PROFILE
========================================== */


function loadUserProfile(){



    const user =

    JSON.parse(
        localStorage.getItem("user")
    );





    const username =

    document.getElementById(
        "sidebarUsername"
    );




    const userInitial =

    document.getElementById(
        "userInitial"
    );






    if(user){



        // DISPLAY NAME

        if(username){


            username.textContent =
            user.name;


        }





        // DISPLAY FIRST LETTER


        if(userInitial){


            userInitial.textContent =

            user.name
            .charAt(0)
            .toUpperCase();



        }



    }
    else{


        console.log(
            "No user found"
        );


    }



}









/* ==========================================
        LOGOUT
========================================== */


function initLogout(){



    const logoutBtn =

    document.getElementById(
        "logoutBtn"
    );





    if(logoutBtn){



        logoutBtn.addEventListener(
        "click",
        ()=>{



            const confirmLogout =

            confirm(
                "Are you sure you want to logout?"
            );





            if(confirmLogout){



                localStorage.removeItem(
                    "user"
                );





                window.location.href =
                "../index.html";



            }



        });



    }



}









/* ==========================================
        EXPORT
========================================== */


window.initDashboard =
initDashboard;