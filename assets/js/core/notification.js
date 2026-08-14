/*==================================================*
        NOTIFICATION SYSTEM
        notification.js

        PURPOSE:
        - Store notifications
        - Get notifications
        - Add notifications
        - Mark notifications as read
        - Delete notifications
        - Clear notifications
        - Calculate unread count
        - Play notification sound
        - Automatically open notification dropdown

        IMPORTANT:
        UI code belongs in notification-ui.js.

        DO NOT put:
        - updateNotificationUI()
        - renderNotifications()
        - setupNotificationUI()
        - setupNotificationDropdowns()
        - notificationUIStarted
        - notificationDropdownsStarted

        in this file.
*==================================================*/


/*==================================================*
        STORAGE KEY
*==================================================*/

const NOTIFICATION_STORAGE_KEY =
    "notifications";


/*==================================================*
        GET NOTIFICATIONS
*==================================================*/

function getNotifications() {

    try {

        const stored =
            localStorage.getItem(
                NOTIFICATION_STORAGE_KEY
            );


        if (!stored) {

            return [];

        }


        const notifications =
            JSON.parse(
                stored
            );


        if (
            !Array.isArray(
                notifications
            )
        ) {

            return [];

        }


        return notifications;


    }
    catch (error) {

        console.error(
            "❌ Failed to read notifications:",
            error
        );


        return [];

    }

}


/*==================================================*
        SAVE NOTIFICATIONS
*==================================================*/

function saveNotifications(
    notifications
) {

    try {

        /*
            Always store an array.
        */

        if (
            !Array.isArray(
                notifications
            )
        ) {

            notifications = [];

        }


        localStorage.setItem(

            NOTIFICATION_STORAGE_KEY,

            JSON.stringify(
                notifications
            )

        );


        return true;

    }
    catch (error) {

        console.error(
            "❌ Failed to save notifications:",
            error
        );


        return false;

    }

}


/*==================================================*
        ADD NOTIFICATION
*==================================================*/

function addNotification(
    type,
    title,
    message
) {

    const notifications =
        getNotifications();


    /*=====================================
     * CREATE NOTIFICATION
     *=====================================*/

    const newNotification = {

        id:
            Date.now(),

        type:
            type,

        title:
            title,

        message:
            message,

        time:
            new Date().toLocaleString(),

        read:
            false

    };


    /*=====================================
     * ADD TO TOP
     *=====================================*/

    notifications.unshift(
        newNotification
    );


    /*=====================================
     * SAVE NOTIFICATION
     *=====================================*/

    const saved =
        saveNotifications(
            notifications
        );


    /*
        Stop here if saving failed.
    */

    if (!saved) {

        return false;

    }


    /*=====================================
     * UPDATE NOTIFICATION UI
     *=====================================*/

    if (
        typeof window.updateNotificationUI ===
        "function"
    ) {

        window.updateNotificationUI();

    }


    /*=====================================
     * PLAY NOTIFICATION SOUND
     *=====================================*/

    if (
        typeof window.playSound ===
        "function"
    ) {

        window.playSound(
            "notification"
        );

    }


    /*=====================================
     * AUTOMATICALLY OPEN DROPDOWN
     *=====================================*/

    if (
        typeof window.openNotificationDropdown ===
        "function"
    ) {

        window.openNotificationDropdown();

    }


    /*=====================================
     * RETURN CREATED NOTIFICATION
     *=====================================*/

    return newNotification;

}


/*==================================================*
        REMOVE ONE NOTIFICATION
*==================================================*/

function removeNotification(
    notificationId
) {

    if (
        notificationId === undefined ||
        notificationId === null
    ) {

        return false;

    }


    /*
        Get notifications.
    */

    const notifications =
        getNotifications();


    /*
        Remove matching notification.
    */

    const updated =
        notifications.filter(
            notification =>

                String(
                    notification.id
                )
                !==
                String(
                    notificationId
                )
        );


    /*
        Nothing changed.
    */

    if (
        updated.length ===
        notifications.length
    ) {

        return false;

    }


    /*
        Save updated list.
    */

    const saved =
        saveNotifications(
            updated
        );


    /*
        Refresh UI.
    */

    if (
        saved &&
        typeof window.updateNotificationUI ===
        "function"
    ) {

        window.updateNotificationUI();

    }


    return saved;

}


/*==================================================*
        DELETE NOTIFICATION
*==================================================*

        Alias for removeNotification().
*==================================================*/

function deleteNotification(
    notificationId
) {

    return removeNotification(
        notificationId
    );

}


/*==================================================*
        DELETE ALL NOTIFICATIONS
*==================================================*/

function deleteAllNotifications() {

    /*
        Get current notifications.
    */

    const notifications =
        getNotifications();


    /*
        Nothing to delete.
    */

    if (
        notifications.length === 0
    ) {

        return false;

    }


    /*
        Clear notifications.
    */

    const saved =
        saveNotifications(
            []
        );


    /*
        Refresh UI.
    */

    if (
        saved &&
        typeof window.updateNotificationUI ===
        "function"
    ) {

        window.updateNotificationUI();

    }


    return saved;

}


/*==================================================*
        CLEAR NOTIFICATIONS
*==================================================*

        Alias for deleteAllNotifications().
*==================================================*/

function clearNotifications() {

    return deleteAllNotifications();

}


/*==================================================*
        MARK NOTIFICATION AS READ
*==================================================*/

function markNotificationRead(
    notificationId
) {

    if (
        notificationId === undefined ||
        notificationId === null
    ) {

        return false;

    }


    /*
        Get notifications.
    */

    const notifications =
        getNotifications();


    let changed =
        false;


    /*
        Update matching notification.
    */

    const updated =
        notifications.map(
            notification => {


                if (
                    String(
                        notification.id
                    )
                    ===
                    String(
                        notificationId
                    )
                ) {

                    /*
                        Only mark as changed
                        if it was unread.
                    */

                    if (
                        !notification.read
                    ) {

                        changed =
                            true;

                    }


                    return {

                        ...notification,

                        read:
                            true

                    };

                }


                return notification;

            }
        );


    /*
        Save only when
        something changed.
    */

    if (changed) {

        saveNotifications(
            updated
        );

    }


    /*
        Refresh UI.
    */

    if (
        typeof window.updateNotificationUI ===
        "function"
    ) {

        window.updateNotificationUI();

    }


    return changed;

}


/*==================================================*
        MARK ALL AS READ
*==================================================*/

function markAllNotificationsRead() {

    const notifications =
        getNotifications();


    /*
        Nothing to update.
    */

    if (
        notifications.length === 0
    ) {

        return false;

    }


    /*
        Check whether there
        are unread notifications.
    */

    const hasUnread =
        notifications.some(
            notification =>
                !notification.read
        );


    /*
        Already all read.
    */

    if (!hasUnread) {

        return false;

    }


    /*
        Mark everything as read.
    */

    const updated =
        notifications.map(
            notification => ({

                ...notification,

                read:
                    true

            })
        );


    const saved =
        saveNotifications(
            updated
        );


    /*
        Refresh UI.
    */

    if (
        saved &&
        typeof window.updateNotificationUI ===
        "function"
    ) {

        window.updateNotificationUI();

    }


    return saved;

}


/*==================================================*
        GET UNREAD COUNT
*==================================================*/

function getUnreadCount() {

    const notifications =
        getNotifications();


    return notifications.filter(
        notification =>
            !notification.read
    ).length;

}


/*==================================================*
        GET READ COUNT
*==================================================*/

function getReadCount() {

    const notifications =
        getNotifications();


    return notifications.filter(
        notification =>
            notification.read
    ).length;

}


/*==================================================*
        CHECK IF NOTIFICATION EXISTS
*==================================================*/

function notificationExists(
    notificationId
) {

    if (
        notificationId === undefined ||
        notificationId === null
    ) {

        return false;

    }


    const notifications =
        getNotifications();


    return notifications.some(
        notification =>

            String(
                notification.id
            )
            ===
            String(
                notificationId
            )
    );

}


/*==================================================*
        GET SINGLE NOTIFICATION
*==================================================*/

function getNotificationById(
    notificationId
) {

    if (
        notificationId === undefined ||
        notificationId === null
    ) {

        return null;

    }


    const notifications =
        getNotifications();


    const notification =
        notifications.find(
            notification =>

                String(
                    notification.id
                )
                ===
                String(
                    notificationId
                )
        );


    return notification || null;

}


/*==================================================*
        EXPORT TO WINDOW
*==================================================*/

window.getNotifications =
    getNotifications;


window.saveNotifications =
    saveNotifications;


window.addNotification =
    addNotification;


window.removeNotification =
    removeNotification;


window.deleteNotification =
    deleteNotification;


window.deleteAllNotifications =
    deleteAllNotifications;


window.clearNotifications =
    clearNotifications;


window.markNotificationRead =
    markNotificationRead;


window.markAllNotificationsRead =
    markAllNotificationsRead;


window.getUnreadCount =
    getUnreadCount;


window.getReadCount =
    getReadCount;


window.notificationExists =
    notificationExists;


window.getNotificationById =
    getNotificationById;


/*==================================================*
        READY MESSAGE
*==================================================*/

console.log(
    "✅ Notification system loaded"
);