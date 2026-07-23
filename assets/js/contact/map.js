/*====================================
        CONTACT MAP
=====================================*/

function initContactMap(){

    animateOfficeCard();

    initMapButton();

}


/*====================================
        OFFICE CARD ANIMATION
=====================================*/

function animateOfficeCard(){

    const card = document.querySelector(".office-card");

    if(!card) return;

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";

    setTimeout(()=>{

        card.style.transition =
            "opacity .7s ease, transform .7s ease";

        card.style.opacity = "1";
        card.style.transform = "translateY(0)";

    },300);

}


/*====================================
        GET DIRECTIONS BUTTON
=====================================*/

function initMapButton(){

    const button = document.querySelector(".map-btn");

    if(!button) return;

    button.addEventListener("mouseenter",()=>{

        button.style.transform = "translateY(-5px)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform = "";

    });

}


/*====================================
        PARALLAX EFFECT
=====================================*/

window.addEventListener("scroll",()=>{

    const section = document.querySelector(".contact-map");

    if(!section) return;

    const y = window.scrollY - section.offsetTop;

    if(y > -500 && y < 500){

        section.style.backgroundPosition =
            `center ${y * 0.08}px`;

    }

});