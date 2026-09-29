document.addEventListener("DOMContentLoaded", () => {

    const portrait = document.querySelector(".portrait");

    if (!portrait) return;

    /*
     * Mobile portrait scroll interaction
     *
     * The portrait becomes more colourful as it
     * approaches the centre of the viewport.
     */

    function updatePortraitOnScroll() {

        const rect = portrait.getBoundingClientRect();

        const viewportHeight = window.innerHeight;

        // Centre point of the portrait
        const portraitCenter = rect.top + (rect.height / 2);

        // Centre point of the screen
        const viewportCenter = viewportHeight / 2;

        // Distance between portrait centre and viewport centre
        const distance = Math.abs(
            portraitCenter - viewportCenter
        );

        /*
         * Distance at which the effect starts.
         * Increase this value for a wider transition zone.
         */
        const transitionDistance = viewportHeight * 0.45;

        /*
         * Convert distance into a 0–1 value.
         *
         * 1 = portrait is at viewport centre
         * 0 = portrait is far from viewport centre
         */
        let progress =
            1 - (distance / transitionDistance);

        progress = Math.max(0, Math.min(1, progress));

        /*
         * Convert progress into grayscale.
         *
         * 1   = completely grayscale
         * 0   = full colour
         */
        const grayscale = 100 - (progress * 100);

        portrait.style.filter =
            `grayscale(${grayscale}%)`;
    }

    /*
     * Run only on touch/mobile devices.
     */
    if (window.matchMedia("(hover: none)").matches) {

        window.addEventListener(
            "scroll",
            updatePortraitOnScroll,
            { passive: true }
        );

        updatePortraitOnScroll();
    }

});