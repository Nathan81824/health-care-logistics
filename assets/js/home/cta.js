/*=====================================
            CTA SECTION
=====================================*/


function initCTA(){


    const cta = document.querySelector(".cta");


    if(!cta) return;



    initCTAReveal();

    initCTAButtons();

    initCTACounter();

    initCTAGlow();


}



/*=====================================
        SCROLL REVEAL
=====================================*/


function initCTAReveal(){


    const content = document.querySelector(".cta-content");


    if(!content) return;



    const observer = new IntersectionObserver((entries)=>{


        entries.forEach(entry=>{


            if(entry.isIntersecting){


                content.classList.add("show");


                observer.unobserve(content);


            }


        });


    },{

        threshold:.25

    });



    observer.observe(content);


}





/*=====================================
        BUTTON EFFECT
=====================================*/


function initCTAButtons(){


    const buttons =
    document.querySelectorAll(".cta a");



    buttons.forEach(button=>{


        button.addEventListener("click",()=>{


            button.classList.add("clicked");



            setTimeout(()=>{


                button.classList.remove("clicked");


            },300);



        });


    });


}





/*=====================================
        COUNTER ANIMATION
=====================================*/


function initCTACounter(){


    const numbers =
    document.querySelectorAll(".cta-trust strong");



    if(!numbers.length) return;



    numbers.forEach(number=>{


        const text = number.textContent;


        number.style.opacity="0";



        setTimeout(()=>{


            number.style.transition=".8s ease";

            number.style.opacity="1";


        },500);



    });


}





/*=====================================
        MOVING GLOW
=====================================*/


function initCTAGlow(){


    const cta =
    document.querySelector(".cta");



    if(!cta) return;



    cta.addEventListener("mousemove",(e)=>{


        const rect =
        cta.getBoundingClientRect();



        const x =
        e.clientX - rect.left;



        const y =
        e.clientY - rect.top;



        cta.style.setProperty(
            "--mouse-x",
            `${x}px`
        );


        cta.style.setProperty(
            "--mouse-y",
            `${y}px`
        );



    });


}