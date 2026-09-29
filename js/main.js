/* =========================================
   SCOOTER OPENING
========================================= */

let rideStarted = false;



function startRide() {

    if (rideStarted) {
        return;
    }


    rideStarted = true;


    const scooter =
        document.getElementById(
            "scootyCouple"
        );


    const button =
        document.getElementById(
            "startButton"
        );


    const message =
        document.getElementById(
            "rideMessage"
        );


    button.style.opacity =
        "0";


    button.style.pointerEvents =
        "none";


    message.classList.add(
        "show"
    );


    let angle =
        90;


    let totalAngle =
        0;


    const speed =
        1.15;


    function ride() {

        totalAngle +=
            speed;


        angle =
            90 +
            totalAngle;


        const radians =
            angle *
            Math.PI /
            180;


        const radiusX =
            40;


        const radiusY =
            38;


        const x =
            50 +
            Math.cos(
                radians
            ) *
            radiusX;


        const y =
            50 +
            Math.sin(
                radians
            ) *
            radiusY;


        scooter.style.left =
            x +
            "%";


        scooter.style.top =
            y +
            "%";


        let rotation =
            angle +
            90;


        scooter.style.transform =
            "translate(-50%, -50%) " +
            "rotate(" +
            rotation +
            "deg)";


        /*
           Two complete rounds
        */

        if (
            totalAngle <
            360
        ) {

            requestAnimationFrame(
                ride
            );

        }

        else {

            finishRide();

        }

    }


    ride();

}



/* =========================================
   FINISH OPENING
========================================= */

function finishRide() {

    const opening =
        document.getElementById(
            "opening"
        );


    const website =
        document.getElementById(
            "website"
        );


    const message =
        document.getElementById(
            "rideMessage"
        );


    message.innerHTML =
        "OKAY... HERE WE GO!";


    setTimeout(
        function () {

            opening.style.opacity =
                "0";

        },
        500
    );


    setTimeout(
        function () {

            opening.style.display =
                "none";


            website.style.display =
                "block";


            window.scrollTo(
                0,
                0
            );


            activateVisibleReveals();


            updateCycleTarget();


            startCycleAnimation();

        },
        1300
    );

}



/* =========================================
   DATE REVEAL
========================================= */

function revealDate() {

    const newspaper =
        document.getElementById(
            "newsWrapper"
        );


    const date =
        document.getElementById(
            "dateReveal"
        );


    const intro =
        document.querySelector(
            ".news-intro"
        );


    if (
        newspaper.classList.contains(
            "open-news"
        )
    ) {

        return;

    }


    newspaper.classList.add(
        "open-news"
    );


    intro.style.opacity =
        "0";


    intro.style.transform =
        "translateY(-25px)";


    setTimeout(
        function () {

            newspaper.style.display =
                "none";


            intro.style.display =
                "none";


            date.classList.add(
                "show-date"
            );


            createConfetti();

        },
        800
    );

}



/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const section =
        document.querySelector(
            ".news-section"
        );


    const colors = [

        "#e89a9f",
        "#efc86e",
        "#a8c9b1",
        "#bca7d8",
        "#e8a47d"

    ];


    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.classList.add(
            "confetti"
        );


        piece.style.left =
            Math.random() *
            100 +
            "%";


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.animationDelay =
            Math.random() *
            0.8 +
            "s";


        piece.style.animationDuration =
            3 +
            Math.random() *
            2 +
            "s";


        section.appendChild(
            piece
        );


        setTimeout(
            function () {

                piece.remove();

            },
            5500
        );

    }

}



/* =========================================
   SCROLL REVEALS
========================================= */

const revealItems =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );


const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {

            threshold:
                0.15,

            rootMargin:
                "0px 0px -50px 0px"

        }

    );


revealItems.forEach(
    function (item) {

        revealObserver.observe(
            item
        );

    }
);



function activateVisibleReveals() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale"
        );


    elements.forEach(
        function (element) {

            const rect =
                element.getBoundingClientRect();


            if (
                rect.top <
                window.innerHeight
            ) {

                element.classList.add(
                    "visible"
                );

            }

        }
    );

}



/* =========================================
   WEDDING TOUR CYCLE
========================================= */

let targetProgress =
    0;


let currentProgress =
    0;


let cycleAnimationStarted =
    false;



function updateCycleTarget() {

    const journey =
        document.getElementById(
            "journey"
        );


    if (!journey) {

        return;

    }


    const rect =
        journey.getBoundingClientRect();


    const screenHeight =
        window.innerHeight;


    targetProgress =
        (
            screenHeight *
            0.55 -
            rect.top
        ) /
        rect.height;


    if (
        targetProgress < 0
    ) {

        targetProgress =
            0;

    }


    if (
        targetProgress > 1
    ) {

        targetProgress =
            1;

    }

}



/* =========================================
   DRAW CYCLE
========================================= */

function drawCycle() {

    const couple =
        document.getElementById(
            "travellingCouple"
        );


    const path =
        document.getElementById(
            "travelPath"
        );


    if (
        !couple ||
        !path
    ) {

        return;

    }


    currentProgress +=
        (
            targetProgress -
            currentProgress
        ) *
        0.055;


    const length =
        path.getTotalLength();


    const distance =
        length *
        currentProgress;


    const point =
        path.getPointAtLength(
            distance
        );


    const nextPoint =
        path.getPointAtLength(

            Math.min(
                length,
                distance + 5
            )

        );


    const angle =
        Math.atan2(

            nextPoint.y -
            point.y,

            nextPoint.x -
            point.x

        ) *

        180 /

        Math.PI;


    couple.style.left =
        (
            point.x /
            1000 *
            100
        ) +
        "%";


    couple.style.top =
        (
            point.y /
            2200 *
            100
        ) +
        "%";


    const safeAngle =
        Math.max(

            -13,

            Math.min(
                13,
                angle
            )

        );


    couple.style.transform =
        "translate(-50%, -50%) " +
        "rotate(" +
        safeAngle +
        "deg)";

}



/* =========================================
   CYCLE ANIMATION
========================================= */

function animateCycle() {

    drawCycle();


    requestAnimationFrame(
        animateCycle
    );

}



function startCycleAnimation() {

    if (
        cycleAnimationStarted
    ) {

        return;

    }


    cycleAnimationStarted =
        true;


    animateCycle();

}



/* =========================================
   RSVP
========================================= */

function submitRSVP(event) {

    event.preventDefault();


    const name =
        document.getElementById(
            "guestName"
        ).value.trim();


    const attendance =
        document.querySelector(
            'input[name="attendance"]:checked'
        );


    const guestCount =
        document.getElementById(
            "guestCount"
        ).value;


    const form =
        document.getElementById(
            "rsvpForm"
        );


    const success =
        document.getElementById(
            "rsvpSuccess"
        );


    if (
        name === "" ||
        !attendance
    ) {

        return;

    }


    form.style.display =
        "none";


    success.style.display =
        "block";


    if (
        attendance.value ===
        "no"
    ) {

        success.innerHTML =
            "<strong>We'll miss you, " +
            name +
            "!</strong>" +
            "<br><br>" +
            "Don't worry. We'll eat your share of the food.";

    }


    else if (
        attendance.value ===
        "maybe"
    ) {

        success.innerHTML =
            "<strong>Hmm... we'll take that as a maybe, " +
            name +
            ".</strong>" +
            "<br><br>" +
            "Go convince them. We'll wait.";

    }


    else if (
        attendance.value ===
        "food"
    ) {

        success.innerHTML =
            "<strong>We knew it, " +
            name +
            ".</strong>" +
            "<br><br>" +
            "You're coming for the food." +
            "<br>" +
            guestCount +
            " seat(s) claimed anyway.";

    }


    else {

        success.innerHTML =
            "<strong>YAY! You're coming, " +
            name +
            "!</strong>" +
            "<br><br>" +
            guestCount +
            " seat(s) officially claimed." +
            "<br>" +
            "See you at the wedding!";

    }

}



/* =========================================
   SCROLL
========================================= */

window.addEventListener(

    "scroll",

    updateCycleTarget,

    {
        passive:
            true
    }

);



/* =========================================
   RESIZE
========================================= */

window.addEventListener(

    "resize",

    updateCycleTarget

);



/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener(

    "load",

    function () {

        updateCycleTarget();

    }

);