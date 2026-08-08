/*==================================================*
        NOTIFICATION UI
*==================================================*/

let notificationUIStarted = false;


/*==================================================*
        CHECK LOGIN STATUS
*==================================================*/

function isUserLoggedIn() {

    return (
        localStorage.getItem("isLoggedIn") === "true"
    );

}


/*==================================================*
        UPDATE NOTIFICATION UI
*==================================================*/

function updateNotificationUI() {

    const loggedIn = isUserLoggedIn();


    /*
        GUEST MODE
    */

    if (!loggedIn) {

        document
            .querySelectorAll(".notification-count")
            .forEach(badge => {

                badge.textContent = "";

                badge.classList.remove("show");

            });


        document
            .querySelectorAll(".notification-dot")
            .forEach(dot => {

                dot.classList.remove("show");
                dot.classList.remove("active");

            });


        renderNotifications();

        return;

    }


    /*
        LOGGED-IN USER
    */

    if (
        typeof getNotifications !== "function"
    ) {

        return;

    }


    const notifications =
        getNotifications();


    const unread =
        notifications.filter(
            notification =>
                !notification.read
        );


    const count =
        unread.length;


    /*
        UPDATE NUMBER
    */

    document
        .querySelectorAll(".notification-count")
        .forEach(badge => {

            if (count > 0) {

                badge.textContent =
                    count > 9
                        ? "9+"
                        : count;

                badge.classList.add("show");

            } else {

                badge.textContent = "";

                badge.classList.remove("show");

            }

        });


    /*
        UPDATE DOT
    */

    document
        .querySelectorAll(".notification-dot")
        .forEach(dot => {

            dot.classList.toggle(
                "show",
                count > 0
            );

        });


    renderNotifications();

}


/*==================================================*
        RENDER NOTIFICATIONS
*==================================================*/

function renderNotifications() {

    const lists =
        document.querySelectorAll(
            "#notificationList"
        );


    if (!lists.length) {

        return;

    }


    const loggedIn =
        isUserLoggedIn();


    /*
        GUEST MODE
    */

    if (!loggedIn) {

        lists.forEach(list => {

            list.innerHTML = `

                <div class="notification-login-message">

                    <div class="notification-login-icon">

                        <i class="fa-solid fa-lock"></i>

                    </div>

                    <h4>
                        Please sign in to continue
                    </h4>

                    <p>
                        Sign in to view your notifications.
                    </p>

                    <a
                        href="../index.html"
                        class="notification-login-btn">

                        <i class="fa-solid fa-right-to-bracket"></i>

                        Sign In

                    </a>

                </div>

            `;

        });

        return;

    }


    /*
        GET NOTIFICATIONS
    */

    if (
        typeof getNotifications !== "function"
    ) {

        return;

    }


    const notifications =
        getNotifications();


    lists.forEach(list => {

        /*
            EMPTY
        */

        if (notifications.length === 0) {

            list.innerHTML = `

                <div class="empty-notification">

                    <i class="fa-regular fa-bell"></i>

                    <h4>
                        No notifications
                    </h4>

                    <p>
                        You're all caught up.
                    </p>

                </div>

            `;

            return;

        }


        /*
            CLEAR LIST
        */

        list.innerHTML = "";


        /*
            CREATE NOTIFICATIONS
        */

        notifications.forEach(
            notification => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "notification-item";


                if (notification.read) {

                    item.classList.add(
                        "read"
                    );

                }


                item.innerHTML = `

                    <div class="notification-content">

                        <h4>
                            ${notification.title}
                        </h4>

                        <p>
                            ${notification.message}
                        </p>

                        <small>
                            ${notification.time}
                        </small>

                    </div>


                    <button
                        type="button"
                        class="delete-notification"
                        aria-label="Delete notification"
                        title="Delete notification">

                        <i class="fa-solid fa-xmark"></i>

                    </button>

                `;


                /*
                    MARK AS READ
                */

                item
                    .querySelector(
                        ".notification-content"
                    )
                    ?.addEventListener(
                        "click",
                        function () {

                            if (
                                typeof markNotificationRead ===
                                "function"
                            ) {

                                markNotificationRead(
                                    notification.id
                                );

                            }

                            updateNotificationUI();

                        }
                    );


                /*
                    DELETE INDIVIDUAL
                */

                const deleteButton =
                    item.querySelector(
                        ".delete-notification"
                    );


                if (deleteButton) {

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

                }


                list.appendChild(item);

            }
        );

    });

}


/*==================================================*
        DELETE ONE NOTIFICATION
*==================================================*/

function deleteNotification(id) {

    if (!isUserLoggedIn()) {

        return;

    }


    if (
        typeof getNotifications !== "function"
    ) {

        return;

    }


    const notifications =
        getNotifications();


    const updated =
        notifications.filter(
            notification =>
                notification.id !== id
        );


    localStorage.setItem(
        "notifications",
        JSON.stringify(updated)
    );


    updateNotificationUI();

}


/*==================================================*
        DELETE ALL NOTIFICATIONS
*==================================================*/

function deleteAllNotifications() {

    if (!isUserLoggedIn()) {

        return;

    }


    localStorage.setItem(
        "notifications",
        JSON.stringify([])
    );


    updateNotificationUI();

}


/*==================================================*
        NOTIFICATION DROPDOWNS
*==================================================*/

function setupNotificationDropdowns() {

    /*
        TOP BELL
    */

    const notificationButton =
        document.querySelector(
            ".notification-btn"
        );


    const topDropdown =
        document.querySelector(
            ".notification-wrapper .notification-dropdown"
        );


    const topClose =
        topDropdown?.querySelector(
            ".close-notification"
        );


    /*
        OPEN TOP NOTIFICATIONS
    */

    if (
        notificationButton &&
        topDropdown
    ) {

        notificationButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                topDropdown.classList.toggle(
                    "active"
                );

            }
        );


        /*
            X BUTTON
        */

        if (topClose) {

            topClose.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    topDropdown.classList.remove(
                        "active"
                    );

                }
            );

        }


        /*
            DON'T CLOSE INSIDE
        */

        topDropdown.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /*
        DELETE ALL BUTTON
    */

    document.addEventListener(
        "click",
        function (event) {

            const deleteAllButton =
                event.target.closest(
                    ".delete-all-notifications"
                );


            if (!deleteAllButton) {

                return;

            }


            event.preventDefault();

            event.stopPropagation();


            deleteAllNotifications();

        }
    );


    /*
        CLOSE OUTSIDE
    */

    document.addEventListener(
        "click",
        function (event) {

            if (
                topDropdown &&
                notificationButton &&
                !topDropdown.contains(
                    event.target
                ) &&
                !notificationButton.contains(
                    event.target
                )
            ) {

                topDropdown.classList.remove(
                    "active"
                );

            }

        }
    );


    /*
        ESC
    */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Escape"
            ) {

                return;

            }


            topDropdown?.classList.remove(
                "active"
            );

        }
    );

}


/*==================================================*
        START NOTIFICATION UI
*==================================================*/

function setupNotificationUI() {

    if (notificationUIStarted) {

        return;

    }


    notificationUIStarted = true;


    updateNotificationUI();


    setupNotificationDropdowns();

}


/*==================================================*
        EXPORT
*==================================================*/

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