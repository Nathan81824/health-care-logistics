/*====================================
            CONTACT FAQ
=====================================*/

function initFAQ(){

    const faqItems = document.querySelectorAll(".faq-item");

    if(!faqItems.length) return;

    faqItems.forEach(item=>{

        const button = item.querySelector(".faq-question");

        button.addEventListener("click",()=>{

            const isActive = item.classList.contains("active");

            // Close every FAQ
            faqItems.forEach(faq=>{

                faq.classList.remove("active");

            });

            // Open the clicked one
            if(!isActive){

                item.classList.add("active");

            }

        });

    });

}


/*====================================
        FAQ ANIMATION
=====================================*/

function animateFAQ(){

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item,index)=>{

        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";

        setTimeout(()=>{

            item.style.transition = ".5s ease";

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        },index * 120);

    });

}


/*====================================
        INITIALIZE
=====================================*/

function initContactFAQ(){

    initFAQ();

    animateFAQ();

}