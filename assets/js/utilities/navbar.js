/*=====================================*
        NAVBAR
*=====================================*/

function initNavbar(){

    console.log("✅ Navbar initialized");


    loadNavbarUser();

    setupProfileDropdown();

    setupMobileMenu();

    setupThemeToggle();

    setupNotifications();

    if(typeof setupNotificationUI === "function"){

        setupNotificationUI();

    }

    setupLogout();

    updateNavbarAuth();

    setActiveLink();

    showWelcomeToast();

}



/*=====================================*
        LOAD NAVBAR USER
*=====================================*/

function loadNavbarUser(){

    const user = 
    typeof getUser === "function"
    ? getUser()
    : null;


    const username =
    document.getElementById("navUsername");


    const avatar =
    document.getElementById("navUserInitial");


    const dropdownUsername =
    document.getElementById("dropdownUsername");


    const dropdownEmail =
    document.getElementById("dropdownEmail");


    const dropdownAvatar =
    document.getElementById("dropdownUserInitial");



    if(!user){

        if(username)
        username.textContent="Guest";


        if(avatar)
        avatar.textContent="G";


        if(dropdownUsername)
        dropdownUsername.textContent="Guest";


        if(dropdownEmail)
        dropdownEmail.textContent="Please sign in";


        if(dropdownAvatar)
        dropdownAvatar.textContent="G";


        return;

    }



    if(username)
    username.textContent =
    user.name.length > 9
    ? user.name.slice(0,9)+"..."
    : user.name;



    if(avatar)
    avatar.textContent =
    user.name.charAt(0).toUpperCase();



    if(dropdownUsername)
    dropdownUsername.textContent =
    user.name;



    if(dropdownEmail)
    dropdownEmail.textContent =
    user.email;



    if(dropdownAvatar)
    dropdownAvatar.textContent =
    user.name.charAt(0).toUpperCase();

}



/*=====================================*
        WELCOME TOAST
*=====================================*/

function showWelcomeToast(){

    const user =
    typeof getUser === "function"
    ? getUser()
    : null;


    const toast =
    document.getElementById("welcomeToast");


    const title =
    document.getElementById("welcomeTitle");


    const text =
    document.getElementById("welcomeText");



    if(!toast || !user)
    return;



    if(title)
    title.textContent="Welcome Back 👋";


    if(text)
    text.textContent=
    `Good to see you, ${user.name}`;



    toast.classList.add("show");



    setTimeout(()=>{

        toast.classList.remove("show");

    },4000);

}



/*=====================================*
        PROFILE DROPDOWN
*=====================================*/

function setupProfileDropdown(){

    const profile =
    document.querySelector(".profile");


    const profileCard =
    document.getElementById("profileCard");


    const dropdown =
    document.querySelector(".profile-dropdown");


    const chevron =
    document.getElementById("profileChevron");



    if(!profile || !profileCard || !dropdown)
    return;



    profileCard.addEventListener(
        "click",
        function(e){

            e.stopPropagation();


            const opened =
            profile.classList.toggle("active");



            if(chevron){

                chevron.style.transform =
                opened
                ? "rotate(180deg)"
                : "rotate(0deg)";


                chevron.style.color =
                opened
                ? "#20b8ff"
                : "#fff";

            }

        }
    );



    dropdown.addEventListener(
        "click",
        e=>e.stopPropagation()
    );



    document.addEventListener(
        "click",
        ()=>{

            profile.classList.remove("active");


            if(chevron){

                chevron.style.transform=
                "rotate(0deg)";

                chevron.style.color=
                "#fff";

            }

        }
    );


}



/*=====================================*
        MOBILE MENU
*=====================================*/

function setupMobileMenu(){

    const menuBtn =
    document.querySelector(".menu-btn");


    const navLinks =
    document.querySelector(".nav-links");



    if(!menuBtn || !navLinks)
    return;



    menuBtn.addEventListener(
        "click",
        ()=>{

            menuBtn.classList.toggle("active");

            navLinks.classList.toggle("active");

        }
    );



    document
    .querySelectorAll(".nav-links a")
    .forEach(link=>{

        link.addEventListener(
            "click",
            ()=>{

                menuBtn.classList.remove("active");

                navLinks.classList.remove("active");

            }
        );

    });

}



/*=====================================*
        THEME
*=====================================*/

function setupThemeToggle(){

    const button =
    document.querySelector(".theme-toggle");


    if(!button)
    return;


    const icon =
    button.querySelector("i");



    if(localStorage.getItem("theme")==="light"){

        document.body.classList.add("light-mode");

        if(icon)
        icon.className="fa-solid fa-sun";

    }



    button.addEventListener(
        "click",
        ()=>{


            document.body.classList.toggle(
                "light-mode"
            );



            const light =
            document.body.classList.contains(
                "light-mode"
            );



            localStorage.setItem(
                "theme",
                light
                ? "light"
                : "dark"
            );



            if(icon){

                icon.className =
                light
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";

            }


        }
    );

}



/*=====================================*
        NOTIFICATION DROPDOWN
*=====================================*/

function setupNotifications(){

    const button =
    document.querySelector(
        ".notification-btn"
    );


    const dropdown =
    document.querySelector(
        ".notification-dropdown"
    );



    if(!button || !dropdown)
    return;



    button.addEventListener(
        "click",
        e=>{

            e.stopPropagation();


            dropdown.classList.toggle(
                "active"
            );

        }
    );



    dropdown.addEventListener(
        "click",
        e=>{

            e.stopPropagation();

        }
    );



    document.addEventListener(
        "click",
        ()=>{

            dropdown.classList.remove(
                "active"
            );

        }
    );

}



/*=====================================*
        LOGOUT
*=====================================*/

function setupLogout(){

    const logoutBtn =
    document.getElementById("navLogout");


    if(!logoutBtn)
    return;



    logoutBtn.addEventListener(
        "click",
        e=>{

            e.preventDefault();


            document
            .getElementById("logoutPopup")
            ?.classList.add("show");


        }
    );

}



/*=====================================*
        AUTH DISPLAY
*=====================================*/

function updateNavbarAuth(){

    const loggedIn =
    localStorage.getItem("isLoggedIn")==="true";


    document
    .getElementById("loginLink")
    ?.classList.toggle(
        "hidden",
        loggedIn
    );


    document
    .getElementById("createAccountLink")
    ?.classList.toggle(
        "hidden",
        loggedIn
    );


    document
    .getElementById("dashboardLink")
    ?.classList.toggle(
        "hidden",
        !loggedIn
    );


    document
    .getElementById("shipmentsLink")
    ?.classList.toggle(
        "hidden",
        !loggedIn
    );


    document
    .getElementById("historyLink")
    ?.classList.toggle(
        "hidden",
        !loggedIn
    );


    document
    .getElementById("navLogout")
    ?.classList.toggle(
        "hidden",
        !loggedIn
    );

}



/*=====================================*
        ACTIVE LINK
*=====================================*/

function setActiveLink(){

    const current =
    window.location.pathname
    .split("/")
    .pop();



    document
    .querySelectorAll(".nav-links a")
    .forEach(link=>{


        const href =
        link.getAttribute("href");


        if(!href)
        return;



        const page =
        href.split("/").pop();



        link.classList.toggle(
            "active",
            page===current
        );


    });

}



/*=====================================*
        START
*=====================================*/

document.addEventListener(
    "DOMContentLoaded",
    initNavbar
);



window.initNavbar =
initNavbar;