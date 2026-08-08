/*=====================================
        PROFILE DROPDOWN
=====================================*/


document.addEventListener(
    "DOMContentLoaded",
    function(){


        const profileCard =
            document.getElementById(
                "profileCard"
            );


        const profile =
            document.querySelector(
                ".profile"
            );


        const chevron =
            document.getElementById(
                "profileChevron"
            );



        if(profileCard && profile){


            profileCard.addEventListener(
                "click",
                function(e){

                    e.stopPropagation();


                    profile.classList.toggle(
                        "active"
                    );


                    if(chevron){

                        chevron.classList.toggle(
                            "rotate"
                        );

                    }

                }
            );



            document.addEventListener(
                "click",
                function(e){


                    if(
                        !profile.contains(
                            e.target
                        )
                    ){

                        profile.classList.remove(
                            "active"
                        );


                        if(chevron){

                            chevron.classList.remove(
                                "rotate"
                            );

                        }

                    }


                }
            );



            document.addEventListener(
                "keydown",
                function(e){

                    if(e.key==="Escape"){

                        profile.classList.remove(
                            "active"
                        );

                    }

                }
            );


        }


        setupQuickAccess();


    }
);





/*=====================================
        QUICK ACCESS MENU
=====================================*/


function setupQuickAccess(){


    const container =
        document.getElementById(
            "quickAccess"
        );



    if(!container){

        return;

    }



    const items = [


        {
            icon:
            "fa-solid fa-satellite-dish",

            text:
            "Live Tracking",

            link:
            "#"
        },


        {
            icon:
            "fa-solid fa-temperature-half",

            text:
            "Cold Chain Monitor",

            link:
            "#"
        },


        {
            icon:
            "fa-solid fa-robot",

            text:
            "AI Assistant",

            link:
            "#"
        },


        {
            icon:
            "fa-solid fa-map-location-dot",

            text:
            "Shipment Map",

            link:
            "#"
        },


        {
            icon:
            "fa-solid fa-headset",

            text:
            "Support Center",

            link:
            "#"
        },


        {
            icon:
            "fa-solid fa-user-gear",

            text:
            "Account Settings",

            link:
            "#"
        }


    ];





    container.innerHTML = `


        <div class="quick-access">


            <a
            href="#"
            class="quick-access-btn">


                <i class="fa-solid fa-bolt"></i>


                <span>
                    Quick Access
                </span>


                <i class="fa-solid fa-chevron-right"></i>


            </a>





            <div class="quick-menu">


                ${
                    items.map(item=>`


                    <a
                    href="${item.link}">


                        <i class="${item.icon}">
                        </i>


                        <span>
                            ${item.text}
                        </span>


                    </a>


                    `).join("")
                }


            </div>


        </div>


    `;



}







/*=====================================
        USER DATA
=====================================*/


function updateProfileUser(user){


    const initial =
        document.querySelectorAll(
            "#navUserInitial, #dropdownUserInitial"
        );


    const names =
        document.querySelectorAll(
            "#navUsername, #dropdownUsername"
        );


    const email =
        document.getElementById(
            "dropdownEmail"
        );



    if(user){


        const firstLetter =
            user.name
            .charAt(0)
            .toUpperCase();



        initial.forEach(
            item=>{

                item.textContent =
                firstLetter;

            }
        );



        names.forEach(
            item=>{

                item.textContent =
                user.name;

            }
        );



        if(email){

            email.textContent =
            user.email;

        }


    }


}





/*=====================================
        LOGOUT
=====================================*/


function logoutUser(){


    localStorage.removeItem(
        "user"
    );


    location.reload();


}



const logoutBtn =
document.getElementById(
    "navLogout"
);



if(logoutBtn){


    logoutBtn.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            logoutUser();

        }
    );


}






/*=====================================
        PROFILE CHEVRON ANIMATION
=====================================*/


const style =
document.createElement(
    "style"
);


style.textContent = `


.profile-arrow .rotate{

    transform:
    rotate(180deg);

}


`;



document.head.appendChild(
    style
);