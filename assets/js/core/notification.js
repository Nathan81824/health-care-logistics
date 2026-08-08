/*=====================================*
 * NOTIFICATION SYSTEM
 *=====================================*/

const NOTIFICATION_KEY = "notifications";


/*=====================================*
 * GET NOTIFICATIONS
 *=====================================*/

function getNotifications(){

    return JSON.parse(
        localStorage.getItem(
            NOTIFICATION_KEY
        )
    ) || [];

}


/*=====================================*
 * SAVE NOTIFICATIONS
 *=====================================*/

function saveNotifications(notifications){

    localStorage.setItem(

        NOTIFICATION_KEY,

        JSON.stringify(
            notifications
        )

    );

}


/*=====================================*
 * ADD NOTIFICATION
 *=====================================*/

function addNotification(
    type,
    title,
    message
){

    const notifications =
        getNotifications();

    notifications.unshift({

        id: Date.now(),

        type: type,

        title: title,

        message: message,

        time: new Date().toLocaleString(),

        read: false

    });

    saveNotifications(
        notifications
    );

    updateNotificationUI();

}


/*=====================================*
 * DELETE NOTIFICATION
 *=====================================*/

function deleteNotification(id){

    const notifications =
        getNotifications().filter(

            notification =>

            notification.id !== id

        );

    saveNotifications(
        notifications
    );

    updateNotificationUI();

}


/*=====================================*
 * CLEAR NOTIFICATIONS
 *=====================================*/

function clearNotifications(){

    localStorage.removeItem(
        NOTIFICATION_KEY
    );

    updateNotificationUI();

}


/*=====================================*
 * MARK AS READ
 *=====================================*/

function markNotificationRead(id){

    const notifications =
        getNotifications();

    notifications.forEach(notification=>{

        if(
            notification.id === id
        ){

            notification.read = true;

        }

    });

    saveNotifications(
        notifications
    );

    updateNotificationUI();

}


/*=====================================*
 * GET UNREAD COUNT
 *=====================================*/

function getUnreadCount(){

    return getNotifications().filter(

        notification =>

        !notification.read

    ).length;

}


/*=====================================
        UPDATE UI
=====================================*/

function updateNotificationUI(){

    const count = getUnreadCount();


    // UPDATE ALL COUNTS
    document
    .querySelectorAll(".notification-count")
    .forEach(badge=>{


        if(count > 0){

            badge.textContent =
            count > 9 ? "9+" : count;


            badge.classList.add("show");

        }

        else{

            badge.textContent = "";

            badge.classList.remove("show");

        }


    });



    // UPDATE DOT

    const dot =
    document.querySelector(
        ".notification-dot"
    );


    if(dot){

        dot.classList.toggle(
            "show",
            count > 0
        );

    }



    // Render dropdown

    renderNotifications(
        "notificationList"
    );

}

/*=====================================*
 * RENDER NOTIFICATIONS
 *=====================================*/

function renderNotifications(containerId){

    const container =
        document.getElementById(
            containerId
        );

    if(!container){

        return;

    }


    const notifications =
        getNotifications();


    if(
        notifications.length === 0
    ){

        container.innerHTML = `

            <div class="empty-notification">

                <i class="fa-regular fa-bell"></i>

                <p>No notifications</p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    notifications.forEach(notification=>{

        const item =
            document.createElement(
                "div"
            );

        item.className =
            "notification-item";

        if(notification.read){

            item.classList.add(
                "read"
            );

        }

        item.innerHTML = `

            <div class="notification-content">

                <h5>
                    ${notification.title}
                </h5>

                <p>
                    ${notification.message}
                </p>

                <small>
                    ${notification.time}
                </small>

            </div>

        `;


        item.addEventListener(

            "click",

            function(){

                markNotificationRead(
                    notification.id
                );

            }

        );


        container.appendChild(
            item
        );

    });

}

/*=====================================
        NOTIFICATION DROPDOWN
=====================================*/

function setupNotificationDropdown(){


    const button =
        document.querySelector(
            ".notification-btn"
        );


    const dropdown =
        document.querySelector(
            ".notification-dropdown"
        );


    const closeButton =
        document.querySelector(
            ".close-notification"
        );



    if(!button || !dropdown){

        return;

    }



    // OPEN DROPDOWN

    button.addEventListener(
        "click",
        function(e){

            e.stopPropagation();


            dropdown.classList.toggle(
                "active"
            );


        }
    );



    // CLOSE WITH X

    if(closeButton){

        closeButton.addEventListener(
            "click",
            function(){

                dropdown.classList.remove(
                    "active"
                );

            }
        );

    }



    // CLOSE WHEN CLICKING OUTSIDE

    document.addEventListener(
        "click",
        function(e){


            if(
                !dropdown.contains(e.target) &&
                !button.contains(e.target)
            ){

                dropdown.classList.remove(
                    "active"
                );

            }


        }
    );



    // CLOSE WITH ESC KEY

    document.addEventListener(
        "keydown",
        function(e){


            if(e.key === "Escape"){


                dropdown.classList.remove(
                    "active"
                );


            }


        }
    );


}


/*=====================================*
 * INIT
 *=====================================*/

function setupNotificationUI(){

    updateNotificationUI();

}


/*=====================================*
 * EXPORT
 *=====================================*/

window.getNotifications =
getNotifications;

window.addNotification =
addNotification;

window.deleteNotification =
deleteNotification;

window.clearNotifications =
clearNotifications;

window.markNotificationRead =
markNotificationRead;

window.updateNotificationUI =
updateNotificationUI;

window.setupNotificationUI =
setupNotificationUI;