/*==================================================*
        HEALTH LOGISTICS
        SOUND SYSTEM
        sound.js

        PURPOSE:
        - Manage all website sound effects
        - Keep audio logic in one place
        - Support root pages and /pages/ pages
        - Prevent duplicate sound loading
*==================================================*/


/*==================================================*
        BASE PATH
*==================================================*/

const soundBasePath =
    window.location.pathname
        .toLowerCase()
        .includes("/pages/")
        ? "../"
        : "";


/*==================================================*
        SOUND FILES
*==================================================*/

const sounds = {

    click: new Audio(
        `${soundBasePath}assets/sounds/click.mp3`
    ),

    notification: new Audio(
        `${soundBasePath}assets/sounds/notification.mp3`
    )

};


/*==================================================*
        SOUND SETTINGS
*==================================================*/

const SOUND_VOLUME = 0.35;


/*==================================================*
        INITIALIZE SOUNDS
*==================================================*/

Object.values(sounds).forEach(
    function (sound) {

        sound.volume =
            SOUND_VOLUME;

        sound.preload =
            "auto";

    }
);


/*==================================================*
        PLAY SOUND
*==================================================*/

function playSound(type) {

    const sound =
        sounds[type];


    /*==============================================
            SOUND NOT FOUND
    ==============================================*/

    if (!sound) {

        console.warn(
            `⚠️ Sound "${type}" was not found.`
        );

        return;

    }


    /*==============================================
            RESET SOUND
    ==============================================*/

    sound.currentTime = 0;


    /*==============================================
            PLAY SOUND
    ==============================================*/

    const playPromise =
        sound.play();


    if (
        playPromise !== undefined
    ) {

        playPromise
            .then(() => {

                console.log(
                    `🔊 Playing sound: ${type}`
                );

            })
            .catch(error => {

                console.warn(
                    `⚠️ Could not play "${type}" sound:`,
                    error
                );

            });

    }

}


/*==================================================*
        STOP SOUND
*==================================================*/

function stopSound(type) {

    const sound =
        sounds[type];


    if (!sound) {

        console.warn(
            `⚠️ Cannot stop unknown sound: ${type}`
        );

        return;

    }


    sound.pause();

    sound.currentTime = 0;

}


/*==================================================*
        SET SOUND VOLUME
*==================================================*/

function setSoundVolume(volume) {

    const newVolume =
        Math.max(
            0,
            Math.min(1, Number(volume))
        );


    Object.values(sounds).forEach(
        function (sound) {

            sound.volume =
                newVolume;

        }
    );


    console.log(
        `🔊 Sound volume: ${newVolume}`
    );

}


/*==================================================*
        TEST SOUND
*==================================================*/

function testClickSound() {

    console.log(
        "🔊 Testing click sound..."
    );

    playSound("click");

}


/*==================================================*
        EXPORT
*==================================================*/

window.playSound =
    playSound;

window.stopSound =
    stopSound;

window.setSoundVolume =
    setSoundVolume;

window.testClickSound =
    testClickSound;


/*==================================================*
        DEBUG INFORMATION
*==================================================*/

console.log(
    "🔊 Sound system loaded"
);

console.log(
    "🎵 Click sound:",
    sounds.click.src
);

console.log(
    "🔔 Notification sound:",
    sounds.notification.src
);