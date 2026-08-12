/*==================================================*
        NOTIFICATION UI
        notification-ui.js

        PURPOSE:
        - Update notification badges
        - Render notifications
        - Delete individual notifications
        - Delete all notifications
        - Mark notifications as read
        - Control notification dropdown
        - Handle outside click
        - Handle Escape key
        - Smooth notification animations

        IMPORTANT:
        Notification storage/data logic belongs
        in notification.js.
*==================================================*/


/*==================================================*
        UI STATE
*==================================================*/

let notificationUIStarted = false;

let notificationDropdownListenersAttached = false;

let notificationGlobalListenersAttached = false;


/*==================================================*
        ANIMATION SETTINGS
*==================================================*/

const NOTIFICATION_SHOW_DELAY =
    300;

const NOTIFICATION_EXIT_DURATION =
    350;


/*==================================================*
        GET NOTIFICATIONS SAFELY
*==================================================*/

function getNotificationData() {

    if (
        typeof window.getNotifications !==
        "function"
    ) {

        return [];

    }


    try {

        const notifications =
            window.getNotifications();


        return Array.isArray(
            notifications
        )
            ? notifications
            : [];

    }

    catch (error) {

        console.error(
            "❌ Could not get notifications:",
            error
        );


        return [];

    }

}


/*==================================================*
        UPDATE NOTIFICATION UI
*==================================================*/

function updateNotificationUI() {

    const notifications =
        getNotificationData();


    const unreadCount =
        notifications.filter(
            notification =>
                !notification.read
        ).length;


    /*================================================
            UPDATE BADGES
    =================================================*/

    document
        .querySelectorAll(
            ".notification-count"
        )
        .forEach(
            badge => {

                if (
                    unreadCount > 0
                ) {

                    badge.textContent =
                        unreadCount > 9
                            ? "9+"
                            : String(
                                unreadCount
                            );


                    badge.classList.add(
                        "show"
                    );

                }

                else {

                    badge.textContent =
                        "";


                    badge.classList.remove(
                        "show"
                    );

                }

            }
        );


    /*================================================
            UPDATE DOTS
    =================================================*/

    document
        .querySelectorAll(
            ".notification-dot"
        )
        .forEach(
            dot => {

                dot.classList.toggle(
                    "show",
                    unreadCount > 0
                );

            }
        );


    /*================================================
            DELETE ALL BUTTONS
    =================================================*/

    document
        .querySelectorAll(
            "#deleteAllNotifications"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "show",
                    notifications.length > 0
                );

            }
        );


    /*================================================
            RENDER
    =================================================*/

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


    if (
        !lists.length
    ) {

        return;

    }


    const notifications =
        getNotificationData();


    lists.forEach(
        list => {

            /*========================================
                    EMPTY STATE
            ========================================*/

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


            /*========================================
                    CLEAR CURRENT LIST
            ========================================*/

            list.innerHTML =
                "";


            /*========================================
                    CREATE NOTIFICATIONS
            ========================================*/

            notifications.forEach(
                (
                    notification,
                    index
                ) => {

                    const item =
                        document.createElement(
                            "div"
                        );


                    item.className =
                        "notification-item";


                    /*
                        Store notification ID
                        directly on the element.
                    */

                    item.dataset.notificationId =
                        notification.id;


                    /*
                        Read state.
                    */

                    if (
                        notification.read
                    ) {

                        item.classList.add(
                            "read"
                        );

                    }


                    /*
                        Start hidden.

                        The CSS animation will
                        bring it into view.
                    */

                    item.classList.add(
                        "notification-enter"
                    );


                    /*================================
                            CONTENT
                    =================================*/

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


                    /*================================
                            DELETE BUTTON
                    =================================*/

                    const deleteButton =
                        item.querySelector(
                            ".notification-delete"
                        );


                    if (
                        deleteButton
                    ) {

                        deleteButton.addEventListener(
                            "click",
                            function (event) {

                                event.preventDefault();

                                event.stopPropagation();


                                animateDeleteNotification(
                                    item,
                                    notification.id
                                );

                            }
                        );

                    }


                    /*================================
                            MARK AS READ
                    =================================*/

                    item.addEventListener(
                        "click",
                        function (event) {

                            if (
                                event.target.closest(
                                    ".notification-delete"
                                )
                            ) {

                                return;

                            }


                            if (
                                notification.read
                            ) {

                                return;

                            }


                            if (
                                typeof window.markNotificationRead ===
                                "function"
                            ) {

                                window.markNotificationRead(
                                    notification.id
                                );

                            }

                        }
                    );


                    list.appendChild(
                        item
                    );


                    /*================================
                            ENTER ANIMATION
                    =================================*/

                    setTimeout(
                        function() {

                            /*
                                Make sure the item
                                still exists before
                                starting animation.
                            */

                            if (
                                item &&
                                item.isConnected
                            ) {

                                item.classList.remove(
                                    "notification-enter"
                                );

                                item.classList.add(
                                    "notification-visible"
                                );

                            }

                        },
                        NOTIFICATION_SHOW_DELAY +
                        (
                            index * 60
                        )
                    );

                }
            );

        }
    );

}


/*==================================================*
        ANIMATE DELETE NOTIFICATION
*==================================================*/

function animateDeleteNotification(
    item,
    notificationId
) {

    if (
        !item
    ) {

        return;

    }


    /*
        Prevent multiple clicks while
        the notification is leaving.
    */

    if (
        item.dataset.deleting ===
        "true"
    ) {

        return;

    }


    item.dataset.deleting =
        "true";


    /*
        Disable interaction.
    */

    item.style.pointerEvents =
        "none";


    /*
        Start exit animation.
    */

    item.classList.remove(
        "notification-visible"
    );


    item.classList.add(
        "notification-exit"
    );


    /*
        Wait for the animation to finish
        before deleting from storage.
    */

    setTimeout(
        function() {

            if (
                typeof window.deleteNotification ===
                "function"
            ) {

                window.deleteNotification(
                    notificationId
                );

            }

        },
        NOTIFICATION_EXIT_DURATION
    );

}


/*==================================================*
        DELETE ALL NOTIFICATIONS
*==================================================*/

function setupDeleteAllNotifications() {

    const buttons =
        document.querySelectorAll(
            "#deleteAllNotifications"
        );


    if (
        !buttons.length
    ) {

        return;

    }


    buttons.forEach(
        button => {

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


                    animateDeleteAllNotifications();

                }
            );

        }
    );

}


/*==================================================*
        ANIMATE DELETE ALL
*==================================================*/

function animateDeleteAllNotifications() {

    const lists =
        document.querySelectorAll(
            "#notificationList"
        );


    if (
        !lists.length
    ) {

        return;

    }


    const items =
        [];


    lists.forEach(
        list => {

            list
                .querySelectorAll(
                    ".notification-item"
                )
                .forEach(
                    item => {

                        if (
                            !item.dataset.deleting
                        ) {

                            items.push(
                                item
                            );

                        }

                    }
                );

        }
    );


    /*
        If there are no visible
        notification items, just clear.
    */

    if (
        !items.length
    ) {

        if (
            typeof window.deleteAllNotifications ===
            "function"
        ) {

            window.deleteAllNotifications();

        }

        return;

    }


    /*
        Prevent interaction.
    */

    items.forEach(
        (
            item,
            index
        ) => {

            item.dataset.deleting =
                "true";


            item.style.pointerEvents =
                "none";


            /*
                Slight stagger makes
                the delete feel smoother.
            */

            setTimeout(
                function() {

                    item.classList.remove(
                        "notification-visible"
                    );


                    item.classList.add(
                        "notification-exit"
                    );

                },
                index * 45
            );

        }
    );


    /*
        Wait until the last animation
        has finished.
    */

    const totalDuration =
        NOTIFICATION_EXIT_DURATION +
        (
            Math.max(
                0,
                items.length - 1
            ) * 45
        );


    setTimeout(
        function() {

            if (
                typeof window.deleteAllNotifications ===
                "function"
            ) {

                window.deleteAllNotifications();

            }

        },
        totalDuration
    );

}


/*==================================================*
        FIND NOTIFICATION ELEMENTS
*==================================================*/

function getNotificationElements() {

    const button =
        document.querySelector(
            ".notification-btn"
        );


    const dropdown =
        document.querySelector(
            ".notification-wrapper .notification-dropdown"
        );


    return {
        button,
        dropdown
    };

}


/*==================================================*
        SETUP NOTIFICATION DROPDOWN
*==================================================*/

function setupNotificationDropdowns() {

    const {
        button,
        dropdown
    } =
        getNotificationElements();


    if (
        !button ||
        !dropdown
    ) {

        return false;

    }


    /*================================================
            ATTACH BUTTON LISTENER
    =================================================*/

    if (
        button.dataset.notificationReady !==
        "true"
    ) {

        button.dataset.notificationReady =
            "true";


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    dropdown.classList.toggle(
                        "active"
                    );


                button.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                dropdown.setAttribute(
                    "aria-hidden",
                    isOpen
                        ? "false"
                        : "true"
                );

            }
        );

    }


    /*================================================
            CLOSE BUTTON
    =================================================*/

    const closeButton =
        dropdown.querySelector(
            ".close-notification"
        );


    if (
        closeButton &&
        closeButton.dataset.notificationReady !==
        "true"
    ) {

        closeButton.dataset.notificationReady =
            "true";


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
            STOP DROPDOWN CLICK PROPAGATION
    =================================================*/

    if (
        dropdown.dataset.notificationReady !==
        "true"
    ) {

        dropdown.dataset.notificationReady =
            "true";


        dropdown.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    notificationDropdownListenersAttached =
        true;


    setupNotificationGlobalListeners();


    return true;

}


/*==================================================*
        GLOBAL NOTIFICATION LISTENERS
*==================================================*/

function setupNotificationGlobalListeners() {

    if (
        notificationGlobalListenersAttached
    ) {

        return;

    }


    notificationGlobalListenersAttached =
        true;


    /*================================================
            OUTSIDE CLICK
    =================================================*/

    document.addEventListener(
        "click",
        function (event) {

            const {
                button,
                dropdown
            } =
                getNotificationElements();


            if (
                !button ||
                !dropdown
            ) {

                return;

            }


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
            ESCAPE KEY
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


/*==================================================*
        CLOSE DROPDOWN
*==================================================*/

function closeNotificationDropdown() {

    const {
        button,
        dropdown
    } =
        getNotificationElements();


    if (
        dropdown
    ) {

        dropdown.classList.remove(
            "active"
        );


        dropdown.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    if (
        button
    ) {

        button.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/*==================================================*
        ESCAPE HTML
*==================================================*/

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


/*==================================================*
        START NOTIFICATION UI
*==================================================*/

function setupNotificationUI() {

    /*
        Always refresh notification
        content.
    */

    updateNotificationUI();


    /*
        Re-check delete-all buttons.
    */

    setupDeleteAllNotifications();


    /*
        Try dropdown setup.
    */

    const dropdownReady =
        setupNotificationDropdowns();


    if (
        !notificationUIStarted
    ) {

        notificationUIStarted =
            true;


        console.log(
            "✅ Notification UI initialized"
        );

    }


    if (
        !dropdownReady
    ) {

        return;

    }

}


/*==================================================*
        EXPORTS
*==================================================*/

window.getNotificationData =
    getNotificationData;


window.updateNotificationUI =
    updateNotificationUI;


window.renderNotifications =
    renderNotifications;


window.setupDeleteAllNotifications =
    setupDeleteAllNotifications;


window.setupNotificationDropdowns =
    setupNotificationDropdowns;


window.setupNotificationUI =
    setupNotificationUI;


window.closeNotificationDropdown =
    closeNotificationDropdown;


window.escapeNotificationHTML =
    escapeNotificationHTML;


/*==================================================*
        LOADED
*==================================================*/

console.log(
    "✅ Notification UI loaded"
);
