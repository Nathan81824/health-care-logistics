/*=====================================*
* NOTIFICATION UI
*=====================================*/


function setupNotificationUI(){


    const badge =
        document.querySelector(
            ".notification-count"
        );


    const dot =
        document.querySelector(
            ".notification-dot"
        );


    const list =
        document.getElementById(
            "notificationList"
        );



    function renderNotifications(){


        const notifications =
            getNotifications();



        const unread =
            notifications.filter(
                item => !item.read
            );



        /* NUMBER BADGE */

        if(badge){

            if(unread.length > 0){

                badge.textContent =
                    unread.length > 9
                    ? "9+"
                    : unread.length;


                badge.classList.add(
                    "show"
                );

            }
            else{

                badge.classList.remove(
                    "show"
                );

            }

        }




        /* GREEN DOT */

        if(dot){

            if(unread.length > 0){

                dot.classList.add(
                    "active"
                );

            }
            else{

                dot.classList.remove(
                    "active"
                );

            }

        }




        /* DROPDOWN LIST */

        if(list){


            list.innerHTML = "";



            if(notifications.length === 0){


                list.innerHTML = `

                    <p class="empty-notification">

                        No notifications

                    </p>

                `;


                return;

            }





            notifications.forEach(
                notification => {


                    const item =
                    document.createElement(
                        "div"
                    );


                    item.className =
                        notification.read
                        ? "notification-item read"
                        : "notification-item";



                    item.innerHTML = `

                        <h4>
                            ${notification.title}
                        </h4>


                        <p>
                            ${notification.message}
                        </p>

                    `;



                    list.appendChild(
                        item
                    );


                }
            );


        }


    }




    renderNotifications();



    /* refresh every time */

    setInterval(
        renderNotifications,
        1000
    );


}



/*=====================================*
EXPORT
*=====================================*/

window.setupNotificationUI =
setupNotificationUI;