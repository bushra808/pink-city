let xValue = 0,
    yValue = 0;

let rotateDegree = 0;

function update(cursorPosition){
    const parallax_el = document.querySelectorAll(".parallax");
    parallax_el.forEach((el) => {
        let speedX= el.dataset.speedx;
        let speedY= el.dataset.speedy;
        let speedZ= el.dataset.speedz;
        let speedrotate= el.dataset.rotation;
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        
        let zValue=cursorPosition-parseFloat(getComputedStyle(el).left) * isInLeft* 0.1;

        el.style.transform = `perspective(3500px) translateZ(${
            zValue * speedZ
        }px) rotateY(${rotateDegree * speedrotate}deg) translateX(calc(-50% + ${
            -xValue * speedX
        }px)) translateY(calc(-50% + ${
            yValue * speedY
        }px))`;
    });
}

update(0);

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    rotateDegree=xValue/(window.innerWidth / 2) *15;
    update(e.clientX);
});


/*GSAP ANIMATION*/

let timeline = gsap.timeline();

parallax_el.forEach(el => {
    timeline.from(
        el,
        {
            top: `${el.offsetHeight / 2 + el.dataset.distance}px`,
            duration: 6,
        },
        "1"
    );
});