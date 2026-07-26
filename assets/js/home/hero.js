/*=====================================
            HERO
=====================================*/


function initHero(){


    console.log("Hero initialized");


    initHeroSlider();

    initHeroButtons();

    initHeroTyping();

    initHeroAnimations();


}





/*=====================================
        HERO SLIDER
=====================================*/


function initHeroSlider(){


    const slides = document.querySelectorAll(".slide");

    const dotsContainer = document.getElementById("dots");

    const nextBtn = document.getElementById("next");

    const prevBtn = document.getElementById("prev");

    const hero = document.querySelector(".hero");



    if(
        !slides.length ||
        !dotsContainer ||
        !nextBtn ||
        !prevBtn ||
        !hero
    ){

        console.log("Hero slider elements missing");

        return;

    }



    let currentSlide = 0;

    let autoPlay;



    dotsContainer.innerHTML = "";



    /*=========================
            CREATE DOTS
    =========================*/


    slides.forEach((slide,index)=>{


        const dot = document.createElement("span");


        dot.classList.add("dot");



        if(index === 0){

            dot.classList.add("active");

        }



        dot.addEventListener("click",()=>{


            showSlide(index);

            restartAutoPlay();


        });



        dotsContainer.appendChild(dot);


    });



    const dots = dotsContainer.querySelectorAll(".dot");





    /*=========================
            SHOW SLIDE
    =========================*/


    function showSlide(index){


        slides.forEach(slide=>{


            slide.classList.remove("active");


        });



        dots.forEach(dot=>{


            dot.classList.remove("active");


        });





        if(index >= slides.length){


            currentSlide = 0;


        }


        else if(index < 0){


            currentSlide = slides.length - 1;


        }


        else{


            currentSlide = index;


        }





        slides[currentSlide].classList.add("active");


        dots[currentSlide].classList.add("active");



    }





    /*=========================
            NEXT SLIDE
    =========================*/


    function nextSlide(){


        showSlide(currentSlide + 1);


    }





    /*=========================
            PREVIOUS SLIDE
    =========================*/


    function prevSlide(){


        showSlide(currentSlide - 1);


    }





    /*=========================
            AUTO PLAY
    =========================*/


    function startAutoPlay(){


        stopAutoPlay();



        autoPlay = setInterval(()=>{


            nextSlide();



        },5000);



    }





    function stopAutoPlay(){


        clearInterval(autoPlay);


    }





    function restartAutoPlay(){


        startAutoPlay();


    }





    /*=========================
            BUTTONS
    =========================*/


    nextBtn.addEventListener("click",()=>{


        nextSlide();


        restartAutoPlay();



    });





    prevBtn.addEventListener("click",()=>{


        prevSlide();


        restartAutoPlay();



    });







    /*=========================
            HOVER PAUSE
    =========================*/


    hero.addEventListener("mouseenter",()=>{


        stopAutoPlay();



    });




    hero.addEventListener("mouseleave",()=>{


        startAutoPlay();



    });







    /*=========================
            START SLIDER
    =========================*/


    showSlide(0);


    startAutoPlay();



    console.log("Hero slider started");


}








/*=====================================
        HERO BUTTONS
=====================================*/


function initHeroButtons(){


    const buttons = document.querySelectorAll(".hero .btn");



    if(!buttons.length) return;





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
        HERO TYPING
=====================================*/


function initHeroTyping(){


    const text = document.querySelector(".hero-typing");



    if(!text) return;





    if(window.heroTypingInterval){

        clearInterval(window.heroTypingInterval);

    }





    const words = [


        "Healthcare Logistics",


        "Medical Transportation",


        "Reliable Delivery"


    ];



    let index = 0;





    window.heroTypingInterval = setInterval(()=>{


        index++;



        if(index >= words.length){


            index = 0;


        }





        text.textContent = words[index];



    },3000);



}









/*=====================================
        HERO ANIMATIONS
=====================================*/


function initHeroAnimations(){


    const hero = document.querySelector(".hero");



    if(!hero) return;




    hero.classList.add("loaded");



}