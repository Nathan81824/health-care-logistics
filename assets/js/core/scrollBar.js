/*=====================================*
        SCROLLBAR COLOR CHANGE
*=====================================*/

function initScrollbar() {

    /*=================================
            PREVENT DUPLICATE
            EVENT LISTENERS
    =================================*/

    if (window.scrollbarInitialized) {

        return;

    }


    window.scrollbarInitialized = true;


    /*=================================
            SCROLL EVENT
    =================================*/

    window.addEventListener(
        "scroll",
        function () {


            const scroll =
                window.scrollY;


            const height =
                document.documentElement.scrollHeight -
                window.innerHeight;


            /*=================================
                    PREVENT DIVISION BY ZERO
            =================================*/

            const progress =
                height > 0
                    ? scroll / height
                    : 0;


            const html =
                document.documentElement;


            /*=================================
                    REMOVE OLD COLORS
            =================================*/

            html.classList.remove(

                "scroll-blue",

                "scroll-cyan",

                "scroll-purple"

            );


            /*=================================
                    CHANGE COLOR
            =================================*/

            if (progress < 0.33) {

                html.classList.add(
                    "scroll-cyan"
                );

            }

            else if (progress < 0.66) {

                html.classList.add(
                    "scroll-blue"
                );

            }

            else {

                html.classList.add(
                    "scroll-purple"
                );

            }

        }

    );


    /*=================================
            SET INITIAL COLOR
    =================================*/

    const html =
        document.documentElement;


    html.classList.add(
        "scroll-cyan"
    );


    console.log(
        "✅ Scrollbar initialized"
    );

}


/*=====================================*
        EXPORT
*=====================================*/

window.initScrollbar =
    initScrollbar;