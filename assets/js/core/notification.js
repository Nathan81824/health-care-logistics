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

/*=====================================*
        NAVBAR NOTIFICATION BUTTON
*=====================================*/

function setupNavbarNotification() {

    const button =
        document.querySelector(
            ".notification-btn"
        );

    const dropdown =
        document.querySelector(
            ".nav-right .notification-dropdown"
        );

    if (!button || !dropdown) {

        console.log("❌ Navbar notification not found");

        return;

    }


    /*=====================================
            OPEN / CLOSE
    =====================================*/

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();

            dropdown.classList.toggle(
                "active"
            );

        }
    );


    /*=====================================
            CLOSE BUTTON
    =====================================*/

    const closeButton =
        dropdown.querySelector(
            ".close-notification"
        );

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                dropdown.classList.remove(
                    "active"
                );

            }
        );

    }


    /*=====================================
            DON'T CLOSE INSIDE
    =====================================*/

    dropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    /*=====================================
            CLOSE OUTSIDE
    =====================================*/

    document.addEventListener(
        "click",
        function () {

            dropdown.classList.remove(
                "active"
            );

        }
    );


    /*=====================================
            ESCAPE
    =====================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                dropdown.classList.remove(
                    "active"
                );

            }

        }
    );


    console.log(
        "✅ Navbar notification initialized"
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

/*==================================================
        NOTIFICATION UI
==================================================*/

let notificationUIStarted = false;

let notificationDropdownsStarted = false;


/*==================================================
        GET NOTIFICATIONS SAFELY
==================================================*/

function getNotificationData() {

    if (typeof getNotifications === "function") {

        const notifications =
            getNotifications();

        return Array.isArray(notifications)
            ? notifications
            : [];

    }


    return [];

}


/*==================================================
        SAVE NOTIFICATIONS
==================================================*/

function saveNotificationData(
    notifications
) {

    localStorage.setItem(
        "notifications",
        JSON.stringify(
            notifications
        )
    );

}


/*==================================================
        UPDATE NOTIFICATION UI
==================================================*/

function updateNotificationUI() {

    const notifications =
        getNotificationData();


    const unread =
        notifications.filter(
            notification =>
                !notification.read
        );


    const count =
        unread.length;



    /*================================================
            UPDATE ALL BADGES
    =================================================*/

    document
        .querySelectorAll(
            ".notification-count"
        )
        .forEach(badge => {

            if (count > 0) {

                badge.textContent =
                    count > 9
                        ? "9+"
                        : count;


                badge.classList.add(
                    "show"
                );

            }
            else {

                badge.textContent = "";


                badge.classList.remove(
                    "show"
                );

            }

        });



    /*================================================
            UPDATE DOTS
    =================================================*/

    document
        .querySelectorAll(
            ".notification-dot"
        )
        .forEach(dot => {

            dot.classList.toggle(
                "show",
                count > 0
            );

        });



    /*================================================
            DELETE ALL BUTTON
    =================================================*/

    const deleteAllButton =
        document.getElementById(
            "deleteAllNotifications"
        );


    if (deleteAllButton) {

        deleteAllButton.classList.toggle(
            "show",
            notifications.length > 0
        );

    }



    /*================================================
            RENDER
    =================================================*/

    renderNotifications();

}



/*==================================================
        RENDER NOTIFICATIONS
==================================================*/

function renderNotifications() {

    const lists =
        document.querySelectorAll(
            "#notificationList"
        );


    if (!lists.length) {

        return;

    }


    const notifications =
        getNotificationData();



    lists.forEach(list => {


        /*============================================
                EMPTY STATE
        ============================================*/

        if (
            notifications.length === 0
        ) {

            list.innerHTML = `

                <div class="empty-notification">

                    <i class="fa-regular fa-bell"></i>

                    <p>
                        No notifications
                    </p>

                </div>

            `;


            return;

        }



        /*============================================
                CLEAR LIST
        ============================================*/

        list.innerHTML = "";



        /*============================================
                CREATE NOTIFICATIONS
        ============================================*/

        notifications.forEach(
            notification => {


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "notification-item";


                if (
                    notification.read
                ) {

                    item.classList.add(
                        "read"
                    );

                }



                /*====================================
                        NOTIFICATION CONTENT
                ====================================*/

                item.innerHTML = `

                    <div class="notification-content">

                        <h4>
                            ${escapeNotificationHTML(
                                notification.title
                            )}
                        </h4>

                        <p>
                            ${escapeNotificationHTML(
                                notification.message
                            )}
                        </p>

                        <small>
                            ${escapeNotificationHTML(
                                notification.time || ""
                            )}
                        </small>

                    </div>


                    <button
                        type="button"
                        class="notification-delete"
                        title="Delete notification"
                        aria-label="Delete notification">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                `;



                /*====================================
                        DELETE INDIVIDUAL
                ====================================*/

                const deleteButton =
                    item.querySelector(
                        ".notification-delete"
                    );


                deleteButton.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();


                        deleteNotification(
                            notification.id
                        );

                    }
                );



                /*====================================
                        MARK AS READ
                ====================================*/

                item.addEventListener(
                    "click",
                    function (event) {


                        /*
                            Don't mark as read
                            when clicking X
                        */

                        if (
                            event.target.closest(
                                ".notification-delete"
                            )
                        ) {

                            return;

                        }


                        if (
                            typeof markNotificationRead ===
                            "function"
                        ) {

                            markNotificationRead(
                                notification.id
                            );

                        }
                        else {

                            markNotificationAsReadFallback(
                                notification.id
                            );

                        }

                    }
                );


                list.appendChild(
                    item
                );

            }
        );

    });

}



/*==================================================
        DELETE ONE NOTIFICATION
==================================================*/

function deleteNotification(
    notificationId
) {

    if (
        notificationId === undefined ||
        notificationId === null
    ) {

        return;

    }


    const notifications =
        getNotificationData();


    const updated =
        notifications.filter(
            notification =>
                String(notification.id) !==
                String(notificationId)
        );


    saveNotificationData(
        updated
    );


    /*
        Immediately update
        everything
    */

    updateNotificationUI();

}



/*==================================================
        DELETE ALL NOTIFICATIONS
==================================================*/

function deleteAllNotifications() {

    const notifications =
        getNotificationData();


    if (
        notifications.length === 0
    ) {

        return;

    }


    /*
        Clear notifications
    */

    saveNotificationData([]);


    /*
        Immediately update UI
    */

    updateNotificationUI();

}



/*==================================================
        MARK AS READ FALLBACK
==================================================*/

function markNotificationAsReadFallback(
    notificationId
) {

    const notifications =
        getNotificationData();


    const updated =
        notifications.map(
            notification => {

                if (
                    String(notification.id) ===
                    String(notificationId)
                ) {

                    return {

                        ...notification,

                        read: true

                    };

                }


                return notification;

            }
        );


    saveNotificationData(
        updated
    );


    updateNotificationUI();

}



/*==================================================
        DELETE ALL BUTTON
==================================================*/

function setupDeleteAllNotifications() {

    const button =
        document.getElementById(
            "deleteAllNotifications"
        );


    if (!button) {

        return;

    }


    /*
        Prevent duplicate listeners
    */

    if (
        button.dataset.deleteReady ===
        "true"
    ) {

        return;

    }


    button.dataset.deleteReady =
        "true";


    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            deleteAllNotifications();

        }
    );

}



/*==================================================
        NOTIFICATION DROPDOWNS
==================================================*/

function setupNotificationDropdowns() {


    if (
        notificationDropdownsStarted
    ) {

        return;

    }


    notificationDropdownsStarted =
        true;



    /*================================================
            TOP BELL
    =================================================*/

    const button =
        document.querySelector(
            ".notification-btn"
        );


    const dropdown =
        document.querySelector(
            ".notification-wrapper .notification-dropdown"
        );


    if (
        !button ||
        !dropdown
    ) {

        return;

    }


    const closeButton =
        dropdown.querySelector(
            ".close-notification"
        );



    /*================================================
            OPEN BELL
    =================================================*/

    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            const opened =
                dropdown.classList.toggle(
                    "active"
                );


            button.setAttribute(
                "aria-expanded",
                opened
                    ? "true"
                    : "false"
            );


            dropdown.setAttribute(
                "aria-hidden",
                opened
                    ? "false"
                    : "true"
            );

        }
    );



    /*================================================
            CLOSE X
    =================================================*/

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                closeNotificationDropdown();

            }
        );

    }



    /*================================================
            KEEP OPEN INSIDE
    =================================================*/

    dropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );



    /*================================================
            CLOSE OUTSIDE
    =================================================*/

    document.addEventListener(
        "click",
        function (event) {

            if (
                !dropdown.contains(
                    event.target
                ) &&
                !button.contains(
                    event.target
                )
            ) {

                closeNotificationDropdown();

            }

        }
    );



    /*================================================
            ESCAPE
    =================================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
            ) {

                closeNotificationDropdown();

            }

        }
    );

}



/*==================================================
        CLOSE NOTIFICATION DROPDOWN
==================================================*/

function closeNotificationDropdown() {

    const dropdown =
        document.querySelector(
            ".notification-wrapper .notification-dropdown"
        );


    const button =
        document.querySelector(
            ".notification-btn"
        );


    if (dropdown) {

        dropdown.classList.remove(
            "active"
        );


        dropdown.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (button) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}



/*==================================================
        ESCAPE HTML
==================================================*/

function escapeNotificationHTML(
    value
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value == null
            ? ""
            : String(value);


    return div.innerHTML;

}



/*==================================================
        START NOTIFICATION UI
==================================================*/

function setupNotificationUI() {


    if (
        notificationUIStarted
    ) {

        return;

    }


    notificationUIStarted =
        true;


    updateNotificationUI();


    setupNotificationDropdowns();


    setupDeleteAllNotifications();

}



/*==================================================
        EXPORT
==================================================*/

window.updateNotificationUI =
    updateNotificationUI;


window.renderNotifications =
    renderNotifications;


window.deleteNotification =
    deleteNotification;


window.deleteAllNotifications =
    deleteAllNotifications;


window.setupNotificationUI =
    setupNotificationUI;


window.setupNotificationDropdowns =
    setupNotificationDropdowns;