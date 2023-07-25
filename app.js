let xValue = 0,
    yValue = 0;

let rotateDegree = 0;

function update(cursorPosition) {
    const parallax_el = document.querySelectorAll(".parallax");
    parallax_el.forEach((el) => {
        let speedX = el.dataset.speedx;
        let speedY = el.dataset.speedy;
        let speedZ = el.dataset.speedz;
        let speedrotate = el.dataset.rotation;
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

        let zValue = cursorPosition - parseFloat(getComputedStyle(el).left) * isInLeft * 0.1;

        el.style.transform = `perspective(3500px) translateZ(${
            zValue * speedZ
        }px) rotateY(${rotateDegree * speedrotate}deg) translateX(calc(-50% + ${
            -xValue * speedX
        }px)) translateY(calc(-50% + ${
            yValue * speedY
        }px))`;
    });
}

function startParallax() {
    // Call the update function with 0 to initialize the parallax effect
    update(0);

    window.addEventListener("mousemove", (e) => {
        xValue = e.clientX - window.innerWidth / 2;
        yValue = e.clientY - window.innerHeight / 2;

        rotateDegree = (xValue / (window.innerWidth / 2)) * 15;
        update(e.clientX);
    });

    /* GSAP ANIMATION */
    window.addEventListener("load", () => {
        const parallax_el = document.querySelectorAll(".parallax");
        let timeline = gsap.timeline();
        parallax_el.forEach((el) => {
            timeline.from(
                el,
                {
                    top: `${el.offsetHeight / 2 + el.dataset.distance}px`,
                    duration: 6,
                },
                "1"
            );
        });
    });
}

// Wait for all images to load before starting the parallax effect and removing the loading screen
window.addEventListener("load", () => {
    const loadingScreen = document.querySelector(".loading-screen");

    // Check if all images are loaded
    const images = document.querySelectorAll("img");
    let loadedImages = 0;
    const totalImages = images.length;

    // Increment the loadedImages counter when an image is loaded
    function imageLoaded() {
        loadedImages++;
        // If all images are loaded, remove the loading screen and start the parallax effect
        if (loadedImages === totalImages) {
            loadingScreen.style.display = "none";
            // Start the parallax effect now that all images are loaded and the loading screen is hidden
            startParallax();
        }
    }

    // Attach the imageLoaded function to the "load" event of each image
    images.forEach((image) => {
        image.addEventListener("load", imageLoaded);
        // In case an image is already cached and doesn't fire the load event,
        // we'll consider it as loaded to ensure the loading screen is hidden.
        if (image.complete) {
            imageLoaded();
        }
    });
});
