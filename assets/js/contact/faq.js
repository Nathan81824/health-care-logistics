/*=====================================*
* CONTACT FAQ
*=====================================*/

function initFAQ() {

    const faqItems =
        document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;


    faqItems.forEach(item => {

        const button =
            item.querySelector(".faq-question");

        if (!button) return;


        button.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            /*=====================================
            CLOSE ALL FAQS
            =====================================*/

            faqItems.forEach(faq => {

                faq.classList.remove("active");

            });


            /*=====================================
            OPEN CLICKED FAQ
            =====================================*/

            if (!isActive) {

                item.classList.add("active");

            }

        });

    });

}


/*=====================================*
* FAQ ANIMATION
*=====================================*/

function animateFAQ() {

    const faqItems =
        document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;


    faqItems.forEach((item, index) => {

        item.style.opacity = "0";

        item.style.transform =
            "translateY(40px)";


        setTimeout(() => {

            item.style.transition =
                "opacity .5s ease, transform .5s ease";

            item.style.opacity = "1";

            item.style.transform =
                "translateY(0)";

        }, index * 120);

    });

}


/*=====================================*
* INITIALIZE FAQ
*=====================================*/

function initContactFAQ() {

    initFAQ();

    animateFAQ();

}


/*=====================================*
* EXPORT
*=====================================*/

window.initFAQ =
    initFAQ;

window.animateFAQ =
    animateFAQ;

window.initContactFAQ =
    initContactFAQ;