/*==================================================*
        NOTIFICATION UI
        notification-ui.js

        PURPOSE:
        - Update notification badges
        - Render notifications
        - Delete individual notifications
        - Delete all notifications
        - Mark notifications as read
        - Control navbar notification dropdown
        - Control dashboard topbar notification dropdown
        - Handle outside click
        - Handle Escape key
        - Smooth notification animations
        - Preserve automatic notification opening
        - Preserve notification sound system

        IMPORTANT:
        Notification storage/data logic belongs
        in notification.js.

        IMPORTANT:
        This file supports MULTIPLE notification
        wrappers on the same page.
*==================================================*/


/*==================================================*
                    UI STATE
*==================================================*/

let notificationUIStarted = false;


/*==================================================*
                    ANIMATION
*==================================================*/

const NOTIFICATION_SHOW_DELAY = 300;

const NOTIFICATION_EXIT_DURATION = 350;


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


    /*==============================================
                UPDATE ALL BADGES
    ==============================================*/

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


    /*==============================================
                    UPDATE DOTS
    ==============================================*/

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


    /*==============================================
                DELETE ALL BUTTONS
    ==============================================*/

    document
        .querySelectorAll(
            ".delete-all-notifications"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "show",
                    notifications.length > 0
                );

            }
        );


    /*==============================================
                    RENDER
    ==============================================*/

    renderNotifications();

}


/*==================================================*
                RENDER NOTIFICATIONS
*==================================================*/

function renderNotifications() {

    const lists =
        document.querySelectorAll(
            ".notification-list"
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
                    CLEAR LIST
            ========================================*/

            list.innerHTML = "";


            /*========================================
                    CREATE ITEMS
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


                    item.dataset.notificationId =
                        notification.id;


                    /*================================
                            READ STATE
                    =================================*/

                    if (
                        notification.read
                    ) {

                        item.classList.add(
                            "read"
                        );

                    }


                    /*================================
                        ENTER ANIMATION
                    =================================*/

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
                        function () {

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
        DELETE ONE NOTIFICATION
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


    if (
        item.dataset.deleting ===
        "true"
    ) {

        return;

    }


    item.dataset.deleting =
        "true";


    item.style.pointerEvents =
        "none";


    item.classList.remove(
        "notification-visible"
    );


    item.classList.add(
        "notification-exit"
    );


    setTimeout(
        function () {

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
            ".delete-all-notifications"
        );


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
            ".notification-list"
        );


    if (
        !lists.length
    ) {

        return;

    }


    const items = [];


    lists.forEach(
        list => {

            list
                .querySelectorAll(
                    ".notification-item"
                )
                .forEach(
                    item => {

                        if (
                            item.dataset.deleting !==
                            "true"
                        ) {

                            items.push(
                                item
                            );

                        }

                    }
                );

        }
    );


    /*==============================================
                NOTHING TO DELETE
    ==============================================*/

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


    /*==============================================
                START ANIMATION
    ==============================================*/

    items.forEach(
        (
            item,
            index
        ) => {

            item.dataset.deleting =
                "true";


            item.style.pointerEvents =
                "none";


            setTimeout(
                function () {

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


    const totalDuration =
        NOTIFICATION_EXIT_DURATION +
        (
            Math.max(
                0,
                items.length - 1
            ) * 45
        );


    setTimeout(
        function () {

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
        GET ALL NOTIFICATION WRAPPERS
*==================================================*/

function getNotificationWrappers() {

    return Array.from(
        document.querySelectorAll(
            ".notification-wrapper"
        )
    );

}


/*==================================================*
        GET ELEMENTS FOR ONE WRAPPER
*==================================================*/

function getNotificationElements(
    wrapper
) {

    if (
        !wrapper
    ) {

        return {
            wrapper: null,
            button: null,
            dropdown: null
        };

    }


    const button =
        wrapper.querySelector(
            ".notification-btn"
        );


    const dropdown =
        wrapper.querySelector(
            ".notification-dropdown"
        );


    return {
        wrapper,
        button,
        dropdown
    };

}


/*==================================================*
        SETUP ALL NOTIFICATION DROPDOWNS
*==================================================*/

function setupNotificationDropdowns() {

    const wrappers =
        getNotificationWrappers();


    if (
        !wrappers.length
    ) {

        console.warn(
            "⚠️ No notification wrappers found."
        );

        return false;

    }


    wrappers.forEach(
        wrapper => {

            setupSingleNotificationDropdown(
                wrapper
            );

        }
    );


    setupNotificationGlobalListeners();


    return true;

}


/*==================================================*
        SETUP ONE NOTIFICATION DROPDOWN
*==================================================*/

function setupSingleNotificationDropdown(
    wrapper
) {

    const {
        button,
        dropdown
    } =
        getNotificationElements(
            wrapper
        );


    if (
        !button ||
        !dropdown
    ) {

        console.warn(
            "⚠️ Notification elements missing in wrapper."
        );

        return;

    }


    /*==============================================
                BUTTON
    ==============================================*/

    if (
        button.dataset.notificationUIReady !==
        "true"
    ) {

        button.dataset.notificationUIReady =
            "true";


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    dropdown.classList.contains(
                        "active"
                    );


                /*
                    Close other notification
                    dropdowns first.
                */

                closeAllNotificationDropdowns(
                    wrapper
                );


                if (
                    isOpen
                ) {

                    closeNotificationDropdown(
                        wrapper
                    );

                }

                else {

                    openNotificationDropdown(
                        wrapper
                    );

                }

            }
        );

    }


    /*==============================================
                CLOSE BUTTON
    ==============================================*/

    const closeButton =
        dropdown.querySelector(
            ".close-notification"
        );


    if (
        closeButton &&
        closeButton.dataset.notificationCloseReady !==
        "true"
    ) {

        closeButton.dataset.notificationCloseReady =
            "true";


        closeButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                closeNotificationDropdown(
                    wrapper
                );

            }
        );

    }


    /*==============================================
                DROPDOWN CLICK
    ==============================================*/

    if (
        dropdown.dataset.notificationClickReady !==
        "true"
    ) {

        dropdown.dataset.notificationClickReady =
            "true";


        dropdown.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }


    /*==============================================
                DELETE ALL
    ==============================================*/

    const deleteAll =
        dropdown.querySelector(
            ".delete-all-notifications"
        );


    if (
        deleteAll &&
        deleteAll.dataset.deleteReady !==
        "true"
    ) {

        deleteAll.dataset.deleteReady =
            "true";


        deleteAll.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                animateDeleteAllNotifications();

            }
        );

    }

}


/*==================================================*
        GLOBAL OUTSIDE CLICK / ESCAPE
*==================================================*/

let notificationGlobalListenersReady =
    false;


function setupNotificationGlobalListeners() {

    if (
        notificationGlobalListenersReady
    ) {

        return;

    }


    notificationGlobalListenersReady =
        true;


    /*==============================================
                    OUTSIDE CLICK
    ==============================================*/

    document.addEventListener(
        "click",
        function (event) {

            const wrappers =
                getNotificationWrappers();


            wrappers.forEach(
                wrapper => {

                    if (
                        !wrapper.contains(
                            event.target
                        )
                    ) {

                        closeNotificationDropdown(
                            wrapper
                        );

                    }

                }
            );

        }
    );


    /*==============================================
                    ESCAPE
    ==============================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !==
                "Escape"
            ) {

                return;

            }


            closeAllNotificationDropdowns();

        }
    );

}


/*==================================================*
        OPEN NOTIFICATION DROPDOWN
*==================================================*/

function openNotificationDropdown(
    wrapper
) {

    /*
        If no wrapper was supplied,
        use the first available wrapper.
    */

    if (
        !wrapper
    ) {

        wrapper =
            getNotificationWrappers()[0];

    }


    const {
        button,
        dropdown
    } =
        getNotificationElements(
            wrapper
        );


    if (
        !wrapper ||
        !button ||
        !dropdown
    ) {

        console.warn(
            "⚠️ Notification dropdown elements not found."
        );

        return false;

    }


    /*==============================================
                CLOSE OTHER DROPDOWNS
    ==============================================*/

    closeAllNotificationDropdowns(
        wrapper
    );


    /*==============================================
                    OPEN
    ==============================================*/

    dropdown.classList.add(
        "active"
    );


    wrapper.classList.add(
        "active"
    );


    /*==============================================
                ACCESSIBILITY
    ==============================================*/

    button.setAttribute(
        "aria-expanded",
        "true"
    );


    dropdown.setAttribute(
        "aria-hidden",
        "false"
    );


    /*==============================================
                SCROLL TO FIRST
    ==============================================*/

    const firstNotification =
        dropdown.querySelector(
            ".notification-item"
        );


    if (
        firstNotification
    ) {

        firstNotification.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    return true;

}


/*==================================================*
        CLOSE ONE DROPDOWN
*==================================================*/

function closeNotificationDropdown(
    wrapper
) {

    if (
        !wrapper
    ) {

        wrapper =
            getNotificationWrappers()[0];

    }


    if (
        !wrapper
    ) {

        return;

    }


    const {
        button,
        dropdown
    } =
        getNotificationElements(
            wrapper
        );


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


    wrapper.classList.remove(
        "active"
    );


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
        CLOSE ALL DROPDOWNS
*==================================================*/

function closeAllNotificationDropdowns(
    exceptWrapper = null
) {

    const wrappers =
        getNotificationWrappers();


    wrappers.forEach(
        wrapper => {

            if (
                exceptWrapper &&
                wrapper === exceptWrapper
            ) {

                return;

            }


            closeNotificationDropdown(
                wrapper
            );

        }
    );

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
        AUTOMATIC OPEN
*
* IMPORTANT:
* This function is intentionally preserved.
*
* Your notification.js / sound system can call:
*
*     openNotificationDropdown()
*
* and the first available notification
* dropdown will open.
*
* If you want a specific wrapper to open,
* call:
*
*     openNotificationDropdown(wrapper)
*
*==================================================*/

function autoOpenNotificationDropdown() {

    const wrappers =
        getNotificationWrappers();


    if (
        !wrappers.length
    ) {

        return false;

    }


    /*
        Prefer a currently visible /
        available notification wrapper.
    */

    const wrapper =
        wrappers.find(
            item => {

                const button =
                    item.querySelector(
                        ".notification-btn"
                    );


                const dropdown =
                    item.querySelector(
                        ".notification-dropdown"
                    );


                return (
                    button &&
                    dropdown
                );

            }
        );


    if (
        !wrapper
    ) {

        return false;

    }


    return openNotificationDropdown(
        wrapper
    );

}


/*==================================================*
        START NOTIFICATION UI
*==================================================*/

function setupNotificationUI() {

    /*
        Update badges and notifications.
    */

    updateNotificationUI();


    /*
        Setup dropdowns.
    */

    setupNotificationDropdowns();


    /*
        Setup delete-all buttons.
    */

    setupDeleteAllNotifications();


    if (
        !notificationUIStarted
    ) {

        notificationUIStarted =
            true;


        console.log(
            "✅ Notification UI initialized"
        );

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


window.openNotificationDropdown =
    openNotificationDropdown;


window.closeNotificationDropdown =
    closeNotificationDropdown;


window.closeAllNotificationDropdowns =
    closeAllNotificationDropdowns;


window.autoOpenNotificationDropdown =
    autoOpenNotificationDropdown;


window.escapeNotificationHTML =
    escapeNotificationHTML;


/*==================================================*
                    LOADED
*==================================================*/

console.log(
    "✅ Notification UI loaded"
);