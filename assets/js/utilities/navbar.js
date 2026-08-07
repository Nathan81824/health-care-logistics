/*=====================================
            NAVBAR
=====================================*/

function initNavbar(){

    console.log("✅ Navbar initialized");


    loadNavbarUser();


    setupProfileDropdown();


    setupMobileMenu();


    setupThemeToggle();


    setupNotifications();


    setupLogout();


    setActiveLink();


    showWelcomeToast();


}

/*=====================================
        LOAD NAVBAR USER
=====================================*/

function loadNavbarUser(){


    const user = getUser();



    const username =
        document.getElementById(
            "navUsername"
        );


    const avatar =
        document.getElementById(
            "navUserInitial"
        );



    if(!user){


        if(username){

            username.textContent =
            "Guest";

        }


        if(avatar){

            avatar.textContent =
            "G";

        }


        return;

    }





    if(username){

        username.textContent =
        user.name;

    }





    if(avatar){

        avatar.textContent =
        user.name
        .charAt(0)
        .toUpperCase();

    }


}

/*=====================================
        WELCOME POPUP
=====================================*/


function showWelcomeToast(){


    const user =
        getUser();



    const toast =
        document.getElementById(
            "welcomeToast"
        );


    const title =
        document.getElementById(
            "welcomeTitle"
        );


    const text =
        document.getElementById(
            "welcomeText"
        );



    if(!toast || !user){

        return;

    }





    title.textContent =
    "Welcome Back 👋";



    text.textContent =
    `Good to see you, ${user.name}`;




    toast.classList.add(
        "show"
    );




    setTimeout(()=>{


        toast.classList.remove(
            "show"
        );


    },4000);



}

/*=====================================
        PROFILE DROPDOWN
=====================================*/

function setupProfileDropdown() {

    const profile = document.querySelector(".profile");
    const profileCard = document.getElementById("profileCard");
    const dropdown = document.querySelector(".profile-dropdown");
    const chevron = document.getElementById("profileChevron");

    if (!profile || !profileCard || !dropdown) return;

    profileCard.addEventListener("click", function (e) {

        e.stopPropagation();

        const opened = profile.classList.toggle("active");

        if (chevron) {

            chevron.style.transition = ".3s";

            chevron.style.transform =
                opened
                    ? "rotate(180deg)"
                    : "rotate(0deg)";

            chevron.style.color =
                opened
                    ? "#20b8ff"
                    : "#ffffff";

        }

    });

    dropdown.addEventListener("click", function (e) {

        e.stopPropagation();

    });

    document.addEventListener("click", function () {

        profile.classList.remove("active");

        if (chevron) {

            chevron.style.transform = "rotate(0deg)";
            chevron.style.color = "#ffffff";

        }

    });

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            profile.classList.remove("active");

            if (chevron) {

                chevron.style.transform = "rotate(0deg)";
                chevron.style.color = "#ffffff";

            }

        }

    });

}


/*=====================================
        MOBILE MENU
=====================================*/

function setupMobileMenu() {

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", function () {

        menuBtn.classList.toggle("active");
        navLinks.classList.toggle("active");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", function () {

            menuBtn.classList.remove("active");
            navLinks.classList.remove("active");

        });

    });

}


/*=====================================
        THEME
=====================================*/

function setupThemeToggle() {

    const button = document.querySelector(".theme-toggle");

    if (!button) return;

    const icon = button.querySelector("i");

    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark-mode");
        icon.className = "fa-solid fa-sun";

    }

    button.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const dark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );

        icon.className =
            dark
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

    });

}


/*=====================================
        NOTIFICATIONS
=====================================*/

function setupNotifications() {

    const btn =
        document.querySelector(".notification-btn");

    if (!btn) return;

    btn.addEventListener("click", function () {

        alert("No new notifications.");

    });

}


/*=====================================
            LOGOUT
=====================================*/

function setupLogout() {

    const logoutBtn =
        document.getElementById("navLogout");

    if (!logoutBtn) return;

    logoutBtn.addEventListener("click", function (e) {

        e.preventDefault();

        const popup =
            document.getElementById("logoutPopup");

        if (popup) {

            popup.classList.add("show");

        }

    });

}

/*=====================================
        ACTIVE LINK
=====================================*/

function setActiveLink() {

    const current =
        window.location.pathname
            .split("/")
            .pop();

    document.querySelectorAll(".nav-links a")
        .forEach(link => {

            const page =
                link.getAttribute("href")
                    .split("/")
                    .pop();

            if (page === current) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

}


/*=====================================
            EXPORT
=====================================*/

window.initNavbar = initNavbar;