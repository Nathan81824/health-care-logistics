/*=====================================
            HERO
=====================================*/


function initHero(){

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

        return;

    }



    let currentSlide = 0;

    let autoPlay;



    dotsContainer.innerHTML = "";



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



    function nextSlide(){

        showSlide(currentSlide + 1);

    }



    function prevSlide(){

        showSlide(currentSlide - 1);

    }



    function startAutoPlay(){

        stopAutoPlay();

        autoPlay = setInterval(nextSlide,5000);

    }



    function stopAutoPlay(){

        clearInterval(autoPlay);

    }



    function restartAutoPlay(){

        startAutoPlay();

    }




    nextBtn.addEventListener("click",()=>{


        nextSlide();

        restartAutoPlay();


    });



    prevBtn.addEventListener("click",()=>{


        prevSlide();

        restartAutoPlay();


    });



    hero.addEventListener("mouseenter",()=>{

        stopAutoPlay();

    });



    hero.addEventListener("mouseleave",()=>{

        startAutoPlay();

    });



    showSlide(0);

    startAutoPlay();


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



    const words = [

        "Healthcare Logistics",

        "Medical Transportation",

        "Reliable Delivery"

    ];



    let index = 0;



    setInterval(()=>{


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

function createDots(){

    dotsContainer.innerHTML = "";

    slides.forEach((slide,index)=>{

        const dot=document.createElement("button");

        dot.className="dot";

        dotsContainer.appendChild(dot);

    });

}