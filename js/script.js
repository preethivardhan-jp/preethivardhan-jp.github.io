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



    /* =====================================================
       OPEN MENU
    ===================================================== */

    function openMenu() {

        if (!menuToggle || !mobileMenu) return;

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



/* CERTIFICATION RIBBON — DESKTOP CSS ANIMATION, MOBILE AUTO-SCROLL + NATIVE SWIPE */
const ribbonTrack = document.querySelector(".ribbon-track");
const ribbonPrev = document.querySelector(".ribbon-prev");
const ribbonNext = document.querySelector(".ribbon-next");
const certificationRibbon = document.querySelector(".certification-ribbon");
const ribbonWindow = document.querySelector(".ribbon-window");
const mobileRibbon = window.matchMedia("(max-width: 800px), (hover: none)").matches;

if (ribbonTrack && ribbonPrev && ribbonNext && ribbonWindow) {
    if (mobileRibbon) {
        // Mobile uses native horizontal scrolling for touch, with a separate RAF loop for auto-scroll.
        ribbonTrack.style.animation = "none";
        ribbonTrack.style.transform = "none";
        ribbonWindow.classList.add("ribbon-native-scroll");

        let lastFrameTime = 0;
        let mobileScrollPaused = false;
        let resumeScrollTimer = null;
        const mobileSpeed = 24; // pixels per second

        function mobileAutoScroll(timestamp) {
            if (!ribbonWindow.isConnected) return;
            if (!lastFrameTime) lastFrameTime = timestamp;
            const delta = Math.min((timestamp - lastFrameTime) / 1000, 0.05);
            lastFrameTime = timestamp;

            if (!mobileScrollPaused && !document.hidden) {
                const halfWidth = ribbonTrack.scrollWidth / 2;
                if (halfWidth > 1) {
                    ribbonWindow.scrollLeft += mobileSpeed * delta;
                    if (ribbonWindow.scrollLeft >= halfWidth) {
                        ribbonWindow.scrollLeft -= halfWidth;
                    }
                }
            }
            requestAnimationFrame(mobileAutoScroll);
        }

        function pauseMobileAutoScroll() {
            mobileScrollPaused = true;
            if (resumeScrollTimer) clearTimeout(resumeScrollTimer);
        }
        function resumeMobileAutoScrollSoon() {
            if (resumeScrollTimer) clearTimeout(resumeScrollTimer);
            resumeScrollTimer = setTimeout(() => {
                mobileScrollPaused = false;
                lastFrameTime = 0;
            }, 500);
        }

        ribbonWindow.addEventListener("pointerdown", pauseMobileAutoScroll, { passive: true });
        window.addEventListener("pointerup", resumeMobileAutoScrollSoon, { passive: true });
        window.addEventListener("pointercancel", resumeMobileAutoScrollSoon, { passive: true });
        ribbonWindow.addEventListener("touchstart", pauseMobileAutoScroll, { passive: true });
        ribbonWindow.addEventListener("touchend", resumeMobileAutoScrollSoon, { passive: true });
        ribbonWindow.addEventListener("touchcancel", resumeMobileAutoScrollSoon, { passive: true });
        document.addEventListener("visibilitychange", () => { lastFrameTime = 0; });

        ribbonPrev.addEventListener("click", () => {
            pauseMobileAutoScroll();
            ribbonWindow.scrollBy({ left: -Math.max(220, ribbonWindow.clientWidth * 0.7), behavior: "smooth" });
            resumeMobileAutoScrollSoon();
        });
        ribbonNext.addEventListener("click", () => {
            pauseMobileAutoScroll();
            ribbonWindow.scrollBy({ left: Math.max(220, ribbonWindow.clientWidth * 0.7), behavior: "smooth" });
            resumeMobileAutoScrollSoon();
        });

        requestAnimationFrame(mobileAutoScroll);
    } else {
        ribbonPrev.addEventListener("click", () => {
            ribbonTrack.style.animationDirection = "reverse";
            ribbonTrack.style.animationPlayState = "running";
        });
        ribbonNext.addEventListener("click", () => {
            ribbonTrack.style.animationDirection = "normal";
            ribbonTrack.style.animationPlayState = "running";
        });
        certificationRibbon?.addEventListener("mouseleave", () => {
            if (!document.querySelector("#certificate-lightbox.is-open")) {
                ribbonTrack.style.removeProperty("animation-play-state");
            }
        });
    }
}

    /* =====================================================
       CERTIFICATE LIGHTBOX — CLICK / KEYBOARD / CLOSE
    ===================================================== */
    const certificateLightbox = document.querySelector("#certificate-lightbox");
    const lightboxImage = certificateLightbox?.querySelector(".certificate-lightbox-image");
    const lightboxCaption = certificateLightbox?.querySelector(".certificate-lightbox-caption");
    const lightboxClose = certificateLightbox?.querySelector(".certificate-lightbox-close");
    const certificates = document.querySelectorAll(".certification-ribbon .ribbon-group:not([aria-hidden='true']) .certificate-image");
    let previouslyFocusedCertificate = null;

    function openCertificate(image) {
        if (!certificateLightbox || !lightboxImage) return;
        previouslyFocusedCertificate = image;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "Certificate preview";
        if (lightboxCaption) lightboxCaption.textContent = image.alt || "Certificate";
        certificateLightbox.classList.add("is-open");
        certificateLightbox.setAttribute("aria-hidden", "false");
        if (ribbonTrack && !mobileRibbon) ribbonTrack.style.animationPlayState = "paused";
        document.body.style.overflow = "hidden";
        lightboxClose?.focus();
    }

function closeCertificate() {
    if (!certificateLightbox) return;

    certificateLightbox.classList.remove("is-open");
    certificateLightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (lightboxImage) {
        lightboxImage.src = "";
    }

    // Resume ribbon immediately after closing the preview
    if (ribbonTrack && !mobileRibbon) {
        ribbonTrack.style.animationPlayState = "running";
    }

    previouslyFocusedCertificate?.focus();
}

    certificates.forEach(function (image) {
        image.addEventListener("click", function () { openCertificate(image); });
        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openCertificate(image);
            }
        });
    });

    lightboxClose?.addEventListener("click", closeCertificate);
    certificateLightbox?.addEventListener("click", function (event) {
        if (event.target === certificateLightbox) closeCertificate();
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && certificateLightbox?.classList.contains("is-open")) {
            closeCertificate();
        }
    });


    /* PROJECT DETAILS + IMAGE GALLERY */
    const projectGallery = document.querySelector("#project-gallery");
    const galleryImage = projectGallery?.querySelector(".project-gallery-image");
    const galleryCaption = projectGallery?.querySelector(".project-gallery-caption");
    const galleryCount = projectGallery?.querySelector(".project-gallery-count");
    const galleryClose = projectGallery?.querySelector(".project-gallery-close");
    const galleryPrev = projectGallery?.querySelector(".project-gallery-prev");
    const galleryNext = projectGallery?.querySelector(".project-gallery-next");
    const zoomIn = projectGallery?.querySelector(".project-gallery-zoom-in");
    const zoomOut = projectGallery?.querySelector(".project-gallery-zoom-out");
    const zoomReset = projectGallery?.querySelector(".project-gallery-zoom-reset");
    const galleryTitle = projectGallery?.querySelector(".project-gallery-title");
    const galleryDescription = projectGallery?.querySelector(".project-gallery-description");
    const galleryEyebrow = projectGallery?.querySelector(".project-gallery-eyebrow");
    const galleryNumber = projectGallery?.querySelector(".project-gallery-number");
    const galleryMeta = projectGallery?.querySelector(".project-gallery-meta");
    const galleryEmpty = projectGallery?.querySelector(".project-gallery-empty");
    let activeImages = [], activeIndex = 0, zoom = 1, previousFocus = null;

    function applyZoom() {
        if (!galleryImage || !zoomReset) return;
        zoom = Math.max(1, Math.min(3, zoom));
        galleryImage.style.transform = `scale(${zoom})`;
        galleryImage.classList.toggle("is-zoomed", zoom > 1);
        zoomReset.textContent = `${Math.round(zoom * 100)}%`;
        if (zoomOut) zoomOut.disabled = zoom <= 1;
        if (zoomIn) zoomIn.disabled = zoom >= 3;
    }
    function updateGallery() {
        const image = activeImages[activeIndex], hasImage = Boolean(image);
        if (galleryImage) {
            galleryImage.hidden = !hasImage;
            if (hasImage) { galleryImage.src = image.currentSrc || image.src; galleryImage.alt = image.alt || galleryTitle.textContent; }
            else { galleryImage.removeAttribute("src"); galleryImage.alt = ""; }
        }
        if (galleryEmpty) galleryEmpty.hidden = hasImage;
        if (galleryCaption) galleryCaption.textContent = hasImage ? (image.alt || galleryTitle.textContent) : "";
        if (galleryCount) galleryCount.textContent = hasImage ? `${activeIndex + 1} / ${activeImages.length}` : "Project overview";
        zoom = 1; applyZoom();
        const multiple = activeImages.length > 1;
        if (galleryPrev) galleryPrev.hidden = !multiple;
        if (galleryNext) galleryNext.hidden = !multiple;
        [zoomIn, zoomOut, zoomReset].forEach(button => { if (button) button.disabled = !hasImage; });
    }
    function openProjectDetails(project, focusTarget) {
        if (!projectGallery || !project) return;
        previousFocus = focusTarget || document.activeElement;
        activeImages = Array.from(project.querySelectorAll(".project-image img")); activeIndex = 0;
        const content = project.querySelector(".project-content");
        const number = content?.querySelector(".project-number")?.textContent.trim() || "";
        const category = content?.querySelector(".project-category")?.textContent.trim() || "PROJECT DETAILS";
        const title = content?.querySelector("h3")?.innerText.replace(/\s+/g, " ").trim() || "Project";
        const description = content?.querySelector("p")?.innerText.trim() || "Project overview and design information.";
        galleryTitle.textContent = title; galleryDescription.textContent = description;
        galleryEyebrow.textContent = category; galleryNumber.textContent = number ? `PROJECT ${number}` : "PROJECT";
        galleryMeta.replaceChildren();
        content?.querySelectorAll(".project-meta > div").forEach(item => {
            const label = item.querySelector("span")?.textContent.trim() || "";
            const value = item.cloneNode(true); value.querySelector("span")?.remove();
            const wrap = document.createElement("div"); wrap.className = "project-gallery-meta-item";
            const labelNode = document.createElement("span"); labelNode.textContent = label;
            const valueNode = document.createElement("p"); valueNode.textContent = value.textContent.trim();
            wrap.append(labelNode, valueNode); galleryMeta.append(wrap);
        });
        updateGallery(); projectGallery.classList.add("is-open");
        projectGallery.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; galleryClose?.focus();
    }
    function closeGallery() {
        projectGallery?.classList.remove("is-open"); projectGallery?.setAttribute("aria-hidden", "true");
        document.body.style.overflow = ""; galleryImage?.removeAttribute("src"); previousFocus?.focus?.();
    }
    function moveGallery(direction) {
        if (activeImages.length < 2) return;
        activeIndex = (activeIndex + direction + activeImages.length) % activeImages.length; updateGallery();
    }
    document.querySelectorAll(".project .project-link").forEach(link => link.addEventListener("click", event => {
        event.preventDefault(); openProjectDetails(link.closest(".project"), link);
    }));
    document.querySelectorAll(".work-section .project-image img").forEach(image => {
        image.tabIndex = 0; image.setAttribute("role", "button"); image.setAttribute("aria-haspopup", "dialog");
        image.setAttribute("aria-label", `Open project details: ${image.alt || "Project image"}`);
        image.addEventListener("click", () => openProjectDetails(image.closest(".project"), image));
        image.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openProjectDetails(image.closest(".project"), image); } });
    });
    galleryPrev?.addEventListener("click", () => moveGallery(-1)); galleryNext?.addEventListener("click", () => moveGallery(1));
    galleryClose?.addEventListener("click", closeGallery);
    projectGallery?.addEventListener("click", event => { if (event.target === projectGallery) closeGallery(); });
    galleryImage?.addEventListener("click", () => { zoom = zoom > 1 ? 1 : 2; applyZoom(); });
    zoomIn?.addEventListener("click", () => { zoom += .5; applyZoom(); });
    zoomOut?.addEventListener("click", () => { zoom -= .5; applyZoom(); });
    zoomReset?.addEventListener("click", () => { zoom = 1; applyZoom(); });
    document.addEventListener("keydown", event => {
        if (!projectGallery?.classList.contains("is-open")) return;
        if (event.key === "Escape") closeGallery(); else if (event.key === "ArrowLeft") moveGallery(-1); else if (event.key === "ArrowRight") moveGallery(1);
    });

});
