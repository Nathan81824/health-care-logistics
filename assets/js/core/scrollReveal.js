function initScrollReveal(){


const revealElements =
document.querySelectorAll("[data-reveal]");


if(!revealElements.length) return;



const observer = new IntersectionObserver(
(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("revealed");


}


});


},
{
threshold:0.15
}

);



revealElements.forEach(element=>{

observer.observe(element);

});


}