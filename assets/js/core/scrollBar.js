/*=====================================
        SCROLLBAR COLOR CHANGE
=====================================*/

function initScrollbar(){


    window.addEventListener("scroll",()=>{


        const scroll =
        window.scrollY;


        const height =
        document.documentElement.scrollHeight -
        window.innerHeight;


        const progress =
        scroll / height;



        const html =
        document.documentElement;



        html.classList.remove(
            "scroll-blue",
            "scroll-cyan",
            "scroll-purple"
        );



        if(progress < 0.33){


            html.classList.add(
                "scroll-cyan"
            );


        }


        else if(progress < 0.66){


            html.classList.add(
                "scroll-blue"
            );


        }


        else{


            html.classList.add(
                "scroll-purple"
            );


        }



    });


}



initScrollbar();