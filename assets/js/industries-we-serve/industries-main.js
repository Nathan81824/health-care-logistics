/*====================================*
        INDUSTRIES
*=====================================*/

function initIndustries() {

    console.log("✅ Industries initialized");


    /*=================================
            INDUSTRY ITEMS
    =================================*/

    const industryItems =
        document.querySelectorAll(
            ".industry-item"
        );


    /*
        No industry items found
    */

    if (!industryItems.length) {

        console.log(
            "⚠️ No industry items found"
        );

        return;

    }


    /*=================================
            ALTERNATING LAYOUT
    =================================*/

    industryItems.forEach(
        function (item, index) {

            /*
                Even items
                Image on LEFT
            */

            if (index % 2 === 0) {

                item.classList.add(
                    "image-left"
                );

                item.classList.remove(
                    "image-right"
                );

            }


            /*
                Odd items
                Image on RIGHT
            */

            else {

                item.classList.add(
                    "image-right"
                );

                item.classList.remove(
                    "image-left"
                );

            }

        }
    );


    console.log(
        "✅ Industry layouts initialized"
    );

}


/*====================================*
        EXPORT
*=====================================*/

window.initIndustries =
    initIndustries;