/*==================================================*
                    SIDEBAR JS
*
* PURPOSE:
* - Initialize sidebar
* - Change active navigation item
* - Scroll to dashboard sections
* - Handle mobile sidebar
*==================================================*/


/*==================================================*
                INITIALIZE SIDEBAR
*==================================================*/

function initSidebar() {

    console.log("✅ Sidebar initialized");


    const sidebar =
        document.querySelector(".sidebar");


    const links =
        document.querySelectorAll(
            ".sidebar-nav a"
        );


    if (!sidebar) {

        console.warn(
            "⚠️ Sidebar not found"
        );

        return;

    }


    if (!links.length) {

        console.warn(
            "⚠️ Sidebar navigation links not found"
        );

        return;

    }


    /*==================================================
            SIDEBAR NAVIGATION
    ==================================================*/

    links.forEach(function (link) {

        /*
            Prevent duplicate listeners.
        */

        if (
            link.dataset.sidebarReady === "true"
        ) {

            return;

        }


        link.dataset.sidebarReady = "true";


        link.addEventListener(
            "click",
            function (event) {

                const target =
                    link.getAttribute("href");


                /*
                    Ignore empty links.
                */

                if (
                    !target ||
                    target === "#"
                ) {

                    event.preventDefault();

                    setActiveSidebarLink(link);

                    return;

                }


                /*
                    Dashboard section link.
                    Example:

                    #overview-container
                    #analytics-container
                    #shipments-container
                */

                if (
                    target.startsWith("#")
                ) {

                    const section =
                        document.querySelector(
                            target
                        );


                    if (section) {

                        event.preventDefault();


                        setActiveSidebarLink(
                            link
                        );


                        scrollToDashboardSection(
                            section
                        );

                    }

                }

            }
        );

    });


    /*==================================================
            SET INITIAL ACTIVE LINK
    ==================================================*/

    setInitialSidebarLink();


    /*==================================================
            MOBILE SIDEBAR
    ==================================================*/

    initMobileSidebar();

}


/*==================================================*
                ACTIVE SIDEBAR LINK
*==================================================*/

function setActiveSidebarLink(
    activeLink
) {

    const links =
        document.querySelectorAll(
            ".sidebar-nav a"
        );


    links.forEach(function (link) {

        link.classList.remove(
            "active"
        );

        link.removeAttribute(
            "aria-current"
        );

    });


    if (activeLink) {

        activeLink.classList.add(
            "active"
        );

        activeLink.setAttribute(
            "aria-current",
            "page"
        );

    }

}


/*==================================================*
                INITIAL ACTIVE LINK
*==================================================*/

function setInitialSidebarLink() {

    const links =
        document.querySelectorAll(
            ".sidebar-nav a"
        );


    if (!links.length) {

        return;

    }


    /*
        Dashboard starts active.
    */

    const dashboardLink =
        Array.from(links).find(
            function (link) {

                const href =
                    link.getAttribute("href");


                return (
                    href ===
                    "#overview-container"
                );

            }
        );


    if (dashboardLink) {

        setActiveSidebarLink(
            dashboardLink
        );

    }

}


/*==================================================*
                SCROLL TO SECTION
*==================================================*/

function scrollToDashboardSection(
    section
) {

    if (!section) {

        return;

    }


    /*
        Account for the fixed topbar.
    */

    const topbar =
        document.querySelector(
            ".topbar"
        );


    const topbarHeight =
        topbar
            ? topbar.offsetHeight
            : 80;


    const extraSpace = 20;


    const sectionPosition =
        section.getBoundingClientRect().top +
        window.scrollY;


    const scrollPosition =
        sectionPosition -
        topbarHeight -
        extraSpace;


    window.scrollTo({

        top: Math.max(
            0,
            scrollPosition
        ),

        behavior: "smooth"

    });

}


/*==================================================*
                MOBILE SIDEBAR
*==================================================*/

function initMobileSidebar() {

    const sidebar =
        document.querySelector(
            ".sidebar"
        );


    const menuButton =
        document.querySelector(
            ".dashboard-menu-btn, .topbar-menu"
        );


    if (
        !sidebar ||
        !menuButton
    ) {

        return;

    }


    if (
        menuButton.dataset.sidebarMenuReady ===
        "true"
    ) {

        return;

    }


    menuButton.dataset.sidebarMenuReady =
        "true";


    menuButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            sidebar.classList.toggle(
                "show"
            );

        }
    );


    /*
        Close sidebar when clicking
        outside it on mobile.
    */

    document.addEventListener(
        "click",
        function (event) {

            if (
                window.innerWidth <= 768 &&
                sidebar.classList.contains("show")
            ) {

                if (
                    !sidebar.contains(event.target) &&
                    !menuButton.contains(event.target)
                ) {

                    sidebar.classList.remove(
                        "show"
                    );

                }

            }

        }
    );


    /*
        Close after selecting a section.
    */

    const links =
        sidebar.querySelectorAll(
            ".sidebar-nav a"
        );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    window.innerWidth <= 768
                ) {

                    sidebar.classList.remove(
                        "show"
                    );

                }

            }
        );

    });

}


/*==================================================*
                WINDOW RESIZE
*==================================================*/

window.addEventListener(
    "resize",
    function () {

        const sidebar =
            document.querySelector(
                ".sidebar"
            );


        if (
            !sidebar
        ) {

            return;

        }


        if (
            window.innerWidth > 768
        ) {

            sidebar.classList.remove(
                "show"
            );

        }

    }
);


/*==================================================*
                    EXPORT
*==================================================*/

window.initSidebar =
    initSidebar;

window.setActiveSidebarLink =
    setActiveSidebarLink;

window.scrollToDashboardSection =
    scrollToDashboardSection;


/*==================================================*
                    READY
*==================================================*/

console.log(
    "✅ Sidebar JS loaded"
);