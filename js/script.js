document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       PORTRAIT — MOBILE SCROLL COLOUR EFFECT
    ===================================================== */

    const portrait = document.querySelector(".portrait");

    function updatePortraitOnScroll() {

        if (!portrait) return;

        const rect = portrait.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const portraitCenter =
            rect.top + (rect.height / 2);

        const viewportCenter =
            viewportHeight / 2;

        const distance =
            Math.abs(portraitCenter - viewportCenter);

        const transitionDistance =
            viewportHeight * 0.45;

        let progress =
            1 - (distance / transitionDistance);

        progress = Math.max(
            0,
            Math.min(1, progress)
        );

        const grayscale =
            100 - (progress * 100);

        portrait.style.filter =
            `grayscale(${grayscale}%)`;
    }


    if (
        portrait &&
        window.matchMedia("(hover: none)").matches
    ) {

        window.addEventListener(
            "scroll",
            updatePortraitOnScroll,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updatePortraitOnScroll
        );

        updatePortraitOnScroll();
    }


    /* =====================================================
       MOBILE NAVIGATION DRAWER
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const menuClose =
        document.querySelector(".mobile-menu-close");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav a");


    /* Debug check */

    console.log("Menu toggle:", menuToggle);
    console.log("Mobile menu:", mobileMenu);


    /* If either element is missing, stop */

    if (!menuToggle || !mobileMenu) {
        console.error(
            "Mobile menu elements were not found."
        );
        return;
    }


    /* =====================================================
       OPEN MENU
    ===================================================== */

    function openMenu() {

        console.log("Opening mobile menu");

        mobileMenu.classList.add("is-open");

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add(
            "menu-open"
        );
    }


    /* =====================================================
       CLOSE MENU
    ===================================================== */

    function closeMenu() {

        console.log("Closing mobile menu");

        mobileMenu.classList.remove(
            "is-open"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    }


    /* =====================================================
       HAMBURGER BUTTON
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        openMenu
    );


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (menuClose) {

        menuClose.addEventListener(
            "click",
            closeMenu
        );
    }


    /* =====================================================
       CLOSE WHEN NAVIGATION LINK IS CLICKED
    ===================================================== */

    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );

});