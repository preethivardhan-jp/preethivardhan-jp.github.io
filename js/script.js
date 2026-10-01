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


    /* =====================================================
       OPEN MENU
    ===================================================== */

    function openMenu() {

        if (!menuToggle || !mobileMenu) return;

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

    function closeMenu(returnFocus = true) {

        if (!menuToggle || !mobileMenu) return;

        console.log("Closing mobile menu");

        mobileMenu.classList.remove("is-open");

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

        /*
         * Return focus to the hamburger only when
         * the drawer was explicitly closed.
         */
        if (returnFocus) {
            menuToggle.focus();
        }
    }


    /* =====================================================
       HAMBURGER BUTTON
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            openMenu
        );

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (menuClose) {

        menuClose.addEventListener(
            "click",
            function () {
                closeMenu(true);
            }
        );

    }


    /* =====================================================
       CLOSE WHEN NAVIGATION LINK IS CLICKED
    ===================================================== */

    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                /*
                 * Don't return focus to the hamburger
                 * when navigating to another section.
                 */
                closeMenu(false);

            }
        );

    });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileMenu &&
                mobileMenu.classList.contains("is-open")
            ) {

                closeMenu(true);

            }

        }
    );


    /* =====================================================
       RETURN TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");


    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 500) {

                backToTop.classList.add(
                    "is-visible"
                );

            } else {

                backToTop.classList.remove(
                    "is-visible"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        updateBackToTop();

    }

});
