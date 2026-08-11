/*=====================================*
        PROFILE DROPDOWN
*=====================================*/


/*=====================================*
        GLOBAL START FLAG
*=====================================*/

window.profileDropdownStarted =
    window.profileDropdownStarted || false;


/*=====================================*
        INIT PROFILE DROPDOWN
*=====================================*/

function initProfileDropdown() {

    /*
        Find navbar elements AFTER
        the navbar has been loaded.
    */

    const profileCard =
        document.getElementById(
            "profileCard"
        );


    const profile =
        document.querySelector(
            ".profile"
        );


    const chevron =
        document.getElementById(
            "profileChevron"
        );


    /*
        Navbar is not loaded yet.
    */

    if (
        !profileCard ||
        !profile
    ) {

        return;

    }


    /*
        Prevent duplicate initialization.
    */

    if (
        profileCard.dataset.profileReady ===
        "true"
    ) {

        updateProfileFromStorage();

        return;

    }


    profileCard.dataset.profileReady =
        "true";


    /*=====================================*
            PROFILE CLICK
    *=====================================*/

    profileCard.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            profile.classList.toggle(
                "active"
            );


            if (chevron) {

                chevron.classList.toggle(
                    "rotate",
                    profile.classList.contains(
                        "active"
                    )
                );

            }

        }
    );


    /*=====================================*
            CLICK OUTSIDE
    *=====================================*/

    document.addEventListener(
        "click",
        function (event) {

            if (
                !profile.contains(
                    event.target
                )
            ) {

                closeProfileDropdown();

            }

        }
    );


    /*=====================================*
            ESCAPE KEY
    *=====================================*/

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeProfileDropdown();

            }

        }
    );


    /*=====================================*
            QUICK ACCESS
    *=====================================*/

    setupQuickAccess();


    /*=====================================*
            USER DATA
    *=====================================*/

    updateProfileFromStorage();


    /*=====================================*
            LOGOUT
    *=====================================*/

    setupLogoutButton();


    console.log(
        "✅ Profile dropdown initialized"
    );

}


/*=====================================*
        CLOSE PROFILE DROPDOWN
*=====================================*/

function closeProfileDropdown() {

    const profile =
        document.querySelector(
            ".profile"
        );


    const chevron =
        document.getElementById(
            "profileChevron"
        );


    if (profile) {

        profile.classList.remove(
            "active"
        );

    }


    if (chevron) {

        chevron.classList.remove(
            "rotate"
        );

    }

}


/*=====================================*
        QUICK ACCESS MENU
*=====================================*/

function setupQuickAccess() {

    const container =
        document.getElementById(
            "quickAccess"
        );


    /*
        Quick access isn't on
        every navbar/page.
    */

    if (!container) {

        return;

    }


    /*
        Prevent duplicate rendering.
    */

    if (
        container.dataset.quickAccessReady ===
        "true"
    ) {

        return;

    }


    container.dataset.quickAccessReady =
        "true";


    const items = [

        {
            icon:
                "fa-solid fa-satellite-dish",

            text:
                "Live Tracking",

            link:
                "#"

        },


        {
            icon:
                "fa-solid fa-temperature-half",

            text:
                "Cold Chain Monitor",

            link:
                "#"

        },


        {
            icon:
                "fa-solid fa-robot",

            text:
                "AI Assistant",

            link:
                "#"

        },


        {
            icon:
                "fa-solid fa-map-location-dot",

            text:
                "Shipment Map",

            link:
                "#"

        },


        {
            icon:
                "fa-solid fa-headset",

            text:
                "Support Center",

            link:
                "#"

        },


        {
            icon:
                "fa-solid fa-user-gear",

            text:
                "Account Settings",

            link:
                "#"

        }

    ];


    container.innerHTML = `

        <div class="quick-access">

            <a
                href="#"
                class="quick-access-btn">

                <i class="fa-solid fa-bolt"></i>

                <span>
                    Quick Access
                </span>

                <i class="fa-solid fa-chevron-right"></i>

            </a>


            <div class="quick-menu">

                ${

                    items.map(
                        item => `

                        <a
                            href="${item.link}">

                            <i
                                class="${item.icon}">
                            </i>

                            <span>
                                ${item.text}
                            </span>

                        </a>

                    `
                    ).join("")

                }

            </div>

        </div>

    `;

}


/*=====================================*
        UPDATE PROFILE USER
*=====================================*/

function updateProfileUser(
    user
) {

    const initials =
        document.querySelectorAll(
            "#navUserInitial, #dropdownUserInitial"
        );


    const names =
        document.querySelectorAll(
            "#navUsername, #dropdownUsername"
        );


    const email =
        document.getElementById(
            "dropdownEmail"
        );


    /*
        No user.
    */

    if (!user) {

        initials.forEach(
            item => {

                item.textContent =
                    "G";

            }
        );


        names.forEach(
            item => {

                item.textContent =
                    "Guest";

            }
        );


        if (email) {

            email.textContent =
                "";

        }


        return;

    }


    /*
        Get user's name safely.
    */

    const userName =
        user.name ||
        "User";


    const firstLetter =
        userName
            .charAt(0)
            .toUpperCase();


    /*=====================================*
            UPDATE INITIAL
    *=====================================*/

    initials.forEach(
        item => {

            item.textContent =
                firstLetter;

        }
    );


    /*=====================================*
            UPDATE NAME
    *=====================================*/

    names.forEach(
        item => {

            item.textContent =
                userName;

        }
    );


    /*=====================================*
            UPDATE EMAIL
    *=====================================*/

    if (email) {

        email.textContent =
            user.email || "";

    }

}


/*=====================================*
        UPDATE FROM STORAGE
*=====================================*/

function updateProfileFromStorage() {

    let user = null;


    try {

        const storedUser =
            localStorage.getItem(
                "user"
            );


        if (storedUser) {

            user =
                JSON.parse(
                    storedUser
                );

        }

    } catch (error) {

        console.error(
            "❌ Failed to read user data:",
            error
        );

    }


    updateProfileUser(
        user
    );

}


/*=====================================*
        LOGOUT
*=====================================*/

function logoutUser() {

    /*
        Remove stored user.
    */

    localStorage.removeItem(
        "user"
    );


    /*
        Remove login state too.
    */

    localStorage.removeItem(
        "isLoggedIn"
    );


    /*
        Close profile first.
    */

    closeProfileDropdown();


    /*
        Refresh page so every
        component sees guest mode.
    */

    window.location.reload();

}


/*=====================================*
        SETUP LOGOUT BUTTON
*=====================================*/

function setupLogoutButton() {

    const logoutBtn =
        document.getElementById(
            "navLogout"
        );


    /*
        Logout button may not exist
        on every page.
    */

    if (!logoutBtn) {

        return;

    }


    /*
        Prevent duplicate listener.
    */

    if (
        logoutBtn.dataset.logoutReady ===
        "true"
    ) {

        return;

    }


    logoutBtn.dataset.logoutReady =
        "true";


    logoutBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            event.stopPropagation();


            logoutUser();

        }
    );

}


/*=====================================*
        PROFILE CHEVRON ANIMATION
*=====================================*/

function addProfileChevronStyles() {

    /*
        Prevent duplicate style.
    */

    if (
        document.getElementById(
            "profileChevronStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "profileChevronStyles";


    style.textContent = `

        .profile-arrow .rotate {

            transform:
                rotate(180deg);

        }

    `;


    document.head.appendChild(
        style
    );

}


/*=====================================*
        EXPORT
*=====================================*/

window.initProfileDropdown =
    initProfileDropdown;


window.closeProfileDropdown =
    closeProfileDropdown;


window.setupQuickAccess =
    setupQuickAccess;


window.updateProfileUser =
    updateProfileUser;


window.updateProfileFromStorage =
    updateProfileFromStorage;


window.logoutUser =
    logoutUser;


window.setupLogoutButton =
    setupLogoutButton;


/*=====================================*
        ADD STYLES
*=====================================*/

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        addProfileChevronStyles
    );

} else {

    addProfileChevronStyles();

}


/*=====================================*
        WATCH DYNAMIC NAVBAR
*=====================================*/

function watchProfileNavbar() {

    /*
        Try immediately.
    */

    initProfileDropdown();


    /*
        Body must exist.
    */

    if (!document.body) {

        return;

    }


    /*
        Prevent multiple observers.
    */

    if (
        window.profileNavbarWatcher
    ) {

        return;

    }


    window.profileNavbarWatcher =
        true;


    const observer =
        new MutationObserver(
            function () {

                const profileCard =
                    document.getElementById(
                        "profileCard"
                    );


                if (
                    profileCard
                ) {

                    initProfileDropdown();

                }

            }
        );


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

}


/*=====================================*
        START
*=====================================*/

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        watchProfileNavbar
    );

} else {

    watchProfileNavbar();

}