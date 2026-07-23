/*====================================
        SERVICE COVERAGE
=====================================*/

function initServiceCoverage(){

    animateCoverageItems();

    animateStatCards();

}


/*====================================
        COVERAGE ITEMS
=====================================*/

function animateCoverageItems(){

    const items = document.querySelectorAll(".coverage-item");

    if(!items.length) return;

    items.forEach((item,index)=>{

        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";

        setTimeout(()=>{

            item.style.transition =
                "opacity .6s ease, transform .6s ease";

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        },index * 120);

    });

}


/*====================================
        FLOATING STATS
=====================================*/

function animateStatCards(){

    const cards = document.querySelectorAll(".stat-card");

    if(!cards.length) return;

    cards.forEach((card,index)=>{

        let direction = 1;

        setInterval(()=>{

            card.style.transform =
                `translateY(${direction * 6}px)`;

            direction *= -1;

        },1800 + (index * 200));

    });

}


/*====================================
        COVERAGE HOVER
=====================================*/

document.addEventListener("mouseover",(e)=>{

    const item = e.target.closest(".coverage-item");

    if(!item) return;

    item.style.transform = "translateY(-8px) scale(1.02)";

});

document.addEventListener("mouseout",(e)=>{

    const item = e.target.closest(".coverage-item");

    if(!item) return;

    item.style.transform = "";

});