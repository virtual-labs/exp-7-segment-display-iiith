// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");
// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;
if (width < 1024) {
  circuitBoard.style.height = 600 + "px";
} else {
  circuitBoard.style.height = windowHeight - circuitBoardTop - 20 + "px";
}
sidePanels[0].style.height = circuitBoard.style.height;

// Instruction box
const instructionBox = document.getElementsByClassName("instructions-box")[0];
instructionBox.addEventListener("click", (e) => {
  instructionBox.classList.toggle("expand");
});



const svg = document.querySelector(".svg");
const svgns = "http://www.w3.org/2000/svg";
gsap.registerPlugin(MotionPathPlugin);
let mainText = document.createElementNS(svgns, "text");
let input1Text = document.createElementNS(svgns, "text");
let input2Text = document.createElementNS(svgns, "text");
let input3Text = document.createElementNS(svgns, "text");
let input4Text = document.createElementNS(svgns, "text");
const OBSERV = document.getElementById("Observations");
const INPUT1 = document.getElementById("input1");
const INPUT2 = document.getElementById("input2");
const INPUT3 = document.getElementById("input3");
const INPUT4 = document.getElementById("input4");
const BUTTON = document.getElementById("play/pause");
const CONTROL = document.getElementsByClassName("Components");

let input1Dot = document.createElementNS(svgns, "circle");
gsap.set(input1Dot, {
    attr: { cx: 20, cy: 20, r: 15, fill: "#FF0000" }
});
let input2Dot = document.createElementNS(svgns, "circle");
gsap.set(input2Dot, {
    attr: { cx: 20, cy: 370, r: 15, fill: "#FF0000" }
});
let input3Dot = document.createElementNS(svgns, "circle");
gsap.set(input3Dot, {
    attr: { cx: 20, cy: 410, r: 15, fill: "#FF0000" }
});
let input4Dot = document.createElementNS(svgns, "circle");
gsap.set(input4Dot, {
    attr: { cx: 20, cy: 760, r: 15, fill: "#FF0000" }
});
svg.appendChild(input1Dot);
svg.appendChild(input2Dot);
svg.appendChild(input3Dot);
svg.appendChild(input4Dot);
function set(a) {
    gsap.set(a, {

        fill: "#eeeb22"
    });
}//output 0
function unset(a) {
    gsap.set(a, {

        fill: "#29e"
    });
}//output 1
function setter(a, b) {
    if (a == 1) {
        unset(b);

    }
    else if (a == 0) {
        set(b);
    }
}
function free() {
    OBSERV.innerHTML = "";
}
mainText.textContent = -1;
console.log(mainText);

svg.appendChild(mainText);
gsap.set(mainText, {
    fontSize: 120,
    fill: "#FFFFFF",
    x: 730,
    y: 420
});
function inputDisappear() {
    TweenLite.to(input1Dot, 0, { autoAlpha: 0 });
    TweenLite.to(input2Dot, 0, { autoAlpha: 0 });
    TweenLite.to(input3Dot, 0, { autoAlpha: 0 });
    TweenLite.to(input4Dot, 0, { autoAlpha: 0 });
}
function inputVisible() {
    TweenLite.to(input1Dot, 0, { autoAlpha: 1 });
    TweenLite.to(input2Dot, 0, { autoAlpha: 1 });
    TweenLite.to(input3Dot, 0, { autoAlpha: 1 });
    TweenLite.to(input4Dot, 0, { autoAlpha: 1 });

}
function mainDisappear() {
    TweenLite.to(mainText, 0, { autoAlpha: 0 });
}
function input1TextDisappear() {
    TweenLite.to(input1Text, 0, { autoAlpha: 0 });
}
function input2TextDisappear() {
    TweenLite.to(input2Text, 0, { autoAlpha: 0 });
}
function input3TextDisappear() {
    TweenLite.to(input3Text, 0, { autoAlpha: 0 });
}
function input4TextDisappear() {
    TweenLite.to(input4Text, 0, { autoAlpha: 0 });
}

function mainVisible() {
    TweenLite.to(mainText, 0, { autoAlpha: 1 });
}
function input1TextVisible() {
    TweenLite.to(input1Text, 0, { autoAlpha: 1 });
}
function input2TextVisible() {
    TweenLite.to(input2Text, 0, { autoAlpha: 1 });
}
function input3TextVisible() {
    TweenLite.to(input3Text, 0, { autoAlpha: 1 });
}
function input4TextVisible() {
    TweenLite.to(input4Text, 0, { autoAlpha: 1 });
}

input1Text.textContent = 2;
svg.appendChild(input1Text);
gsap.set(input1Text, {
    x: 16,
    y: 24
});
input2Text.textContent = 2;
svg.appendChild(input2Text);
gsap.set(input2Text, {
    x: 16,
    y: 374
});
input3Text.textContent = 2;
svg.appendChild(input3Text);
gsap.set(input3Text, {
    x: 16,
    y: 414
});
input4Text.textContent = 2;
svg.appendChild(input4Text);
gsap.set(input4Text, {
    x: 16,
    y: 764
});
function Clear() {
    input1TextDisappear();
    input2TextDisappear();
    input3TextDisappear();
    input4TextDisappear();
    input1Text.textContent = 2;
    input2Text.textContent = 2;
    input3Text.textContent = 2;
    input4Text.textContent = 2;
}
Clear();



function appendInput1() {
    if (input1Text.textContent != 0 && tl.progress() == 0) {
        input1TextDisappear();
        input1Text.textContent = 0;
        svg.appendChild(input1Text);
        gsap.set(input1Text, {
            x: 16,
            y: 24
        });

        gsap.set(INPUT1, {

            fill: "#eeeb22"
        });
        input1TextVisible();
        free();
        setter(input1Text.textContent, input1Dot);
        OBSERV.innerHTML = "Input1 is set to 0";
    }
    else if (input1Text.textContent != 1 && tl.progress() == 0) {
        appendInput1To1();
    }
}
function appendInput1To1() {
    input1TextDisappear();
    input1Text.textContent = 1;
    svg.appendChild(input1Text);
    gsap.set(input1Text, {
        x: 16,
        y: 24
    });
    gsap.set(INPUT1, {

        fill: "#29e"
    });
    input1TextVisible();
    free();
    setter(input1Text.textContent, input1Dot);
    OBSERV.innerHTML = "Input1 is set to 1";

}
function appendInput2() {
    if (input2Text.textContent != 0 && tl.progress() == 0) {
        input2TextDisappear();
        input2Text.textContent = 0;
        svg.appendChild(input2Text);
        gsap.set(input2Text, {
            x: 16,
            y: 374
        });
        gsap.set(INPUT2, {

            fill: "#eeeb22"
        });
        input2TextVisible();
        free();
        setter(input2Text.textContent, input2Dot);
        OBSERV.innerHTML = "Input2 is set to 0";

    }
    else if (input2Text.textContent != 1 && tl.progress() == 0) {
        appendInput2To1();
    }
}
function appendInput2To1() {
    input2TextDisappear();
    input2Text.textContent = 1;
    svg.appendChild(input2Text);
    gsap.set(input2Text, {
        x: 16,
        y: 374
    });
    gsap.set(INPUT2, {

        fill: "#29e"
    });
    input2TextVisible();
    free();
    setter(input2Text.textContent, input2Dot);
    OBSERV.innerHTML = "Input2 is set to 1";


}
function appendInput3() {
    if (input3Text.textContent != 0 && tl.progress() == 0) {
        input3TextDisappear();
        input3Text.textContent = 0;
        svg.appendChild(input3Text);
        gsap.set(input3Text, {
            x: 16,
            y: 414
        });
        gsap.set(INPUT3, {

            fill: "#eeeb22"
        });
        input3TextVisible();
        free();
        setter(input3Text.textContent, input3Dot);
        OBSERV.innerHTML = "Input3 is set to 0";

    }
    else if (input3Text.textContent != 1 && tl.progress() == 0) {
        appendInput3To1();
    }
}
function appendInput3To1() {
    input3TextDisappear();
    input3Text.textContent = 1;
    svg.appendChild(input3Text);
    gsap.set(input3Text, {
        x: 16,
        y: 414
    });
    gsap.set(INPUT3, {

        fill: "#29e"
    });
    input3TextVisible();
    free();
    setter(input3Text.textContent, input3Dot);
    OBSERV.innerHTML = "Input3 is set to 1";

}
function appendInput4() {
    if (input4Text.textContent != 0 && tl.progress() == 0) {
        input4TextDisappear();
        input4Text.textContent = 0;
        svg.appendChild(input4Text);
        gsap.set(input4Text, {
            x: 16,
            y: 764
        });
        gsap.set(INPUT4, {

            fill: "#eeeb22"
        });
        input4TextVisible();
        free();
        setter(input4Text.textContent, input4Dot);
        OBSERV.innerHTML = "Input4 is set to 0";
    }
    else if (input4Text.textContent != 1 && tl.progress() == 0) {
        appendInput4To1();
    }
}
function appendInput4To1() {
    input4TextDisappear();
    input4Text.textContent = 1;
    svg.appendChild(input4Text);
    gsap.set(input4Text, {
        x: 16,
        y: 764
    });
    gsap.set(INPUT4, {

        fill: "#29e"
    });
    input4TextVisible();
    free();
    setter(input4Text.textContent, input4Dot);
    OBSERV.innerHTML = "Input4 is set to 1";

}
inputDisappear();

function outputHandler() {

    if (input1Text.textContent == 2 || input2Text.textContent == 2 || input3Text.textContent == 2 || input4Text.textContent == 2) {
        OBSERV.innerHTML = "Please select the input properly";
    }
    else if (input1Text.textContent == 0 && input2Text.textContent == 0 && input3Text.textContent == 0 && input4Text.textContent == 0) {
        mainText.textContent = 0;
    }
    else if (input1Text.textContent == 0 && input2Text.textContent == 0 && input3Text.textContent == 0 && input4Text.textContent == 1) {

        mainText.textContent = 1;
    }
    else if (input1Text.textContent == 0 && input2Text.textContent == 0 && input3Text.textContent == 1 && input4Text.textContent == 0) {
        mainText.textContent = 2;
    }
    else if (input1Text.textContent == 0 && input2Text.textContent == 0 && input3Text.textContent == 1 && input4Text.textContent == 1) {
        mainText.textContent = 3;
    }
    else if (input1Text.textContent == 0 && input2Text.textContent == 1 && input3Text.textContent == 0 && input4Text.textContent == 0) {
        mainText.textContent = 4;
    }
    else if (input1Text.textContent == 0 && input2Text.textContent == 1 && input3Text.textContent == 0 && input4Text.textContent == 1) {
        mainText.textContent = 5;
    }
    else if (input1Text.textContent == 0 && input2Text.textContent == 1 && input3Text.textContent == 1 && input4Text.textContent == 0) {
        mainText.textContent = 6;
    }
    else if (input1Text.textContent == 0 && input2Text.textContent == 1 && input3Text.textContent == 1 && input4Text.textContent == 1) {
        mainText.textContent = 7;
    }
    else if (input1Text.textContent == 1 && input2Text.textContent == 0 && input3Text.textContent == 0 && input4Text.textContent == 0) {
        mainText.textContent = 8;
    }
    else if (input1Text.textContent == 1 && input2Text.textContent == 0 && input3Text.textContent == 0 && input4Text.textContent == 1) {
        mainText.textContent = 9;

    }
    else {
        OBSERV.innerHTML = "This value exceeds greater than 9. Try with a value smaller than 9.";
    }

}
mainDisappear();
let decide = 0;
function button() {
    if (decide == 0) {
        StartCircuit();

    }
    else if (decide == 1) {
        StopCircuit();

    }
}
function allDisappear() {
    mainDisappear();



    gsap.set(INPUT1, {

        fill: "#008000"
    });

    gsap.set(INPUT2, {

        fill: "#008000"
    });
    gsap.set(INPUT3, {

        fill: "#008000"
    });
    gsap.set(INPUT4, {

        fill: "#008000"
    });

}
function fourXspeed() {
    if (input1Text.textContent != 2 && input2Text.textContent != 2 && input3Text.textContent != 2 && input4Text.textContent != 2 && tl.progress() != 1 && tl.progress() != 0) {
        tl.resume();
        tl.timeScale(4);
        OBSERV.innerHTML = "4x speed";
        decide = 1;
        BUTTON.innerHTML = "Halt";
    }
}

function SetSpeed(speed) {
    if (speed == "1" &&tl.progress()) {
        StartCircuit();
    }
    else if (speed == "2") {
        doubleSpeed();
    }
    else if (speed == "4") {
        fourXspeed();
    }
    

}
function doubleSpeed() {
    if (input1Text.textContent != 2 && input2Text.textContent != 2 && input3Text.textContent != 2 && input4Text.textContent != 2 && tl.progress() != 1 && tl.progress() != 0) {
        tl.resume();
        tl.timeScale(2);
        OBSERV.innerHTML = "2x speed";
        decide = 1;
        BUTTON.innerHTML = "Halt";
        
    }
}
function batado() {
    OBSERV.innerHTML = "Simulation has finished. Press Restart to start again"
}
const SPEED = document.getElementById("speed");
function RestartCircuit() {
    tl.seek(0);
    tl.pause();
    Clear();
    mainDisappear();
    OBSERV.innerHTML = "Succesfully restored";
    mainText.textContent = -1;
    inputDisappear();
    allDisappear();
    decide = 0;
    BUTTON.innerHTML = "Start";
    SPEED.selectedIndex=0;
    
}
var tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });

function StopCircuit() {
    if (tl.time() != 0 && tl.progress() != 1) {
        tl.pause();
        OBSERV.innerHTML = "Simulation has been stopped."
        decide = 0;
        BUTTON.innerHTML = "Start";
        SPEED.selectedIndex=0;
    }
    else if (tl.progress() == 1) {
        OBSERV.innerHTML = "Please Restart the simulation"
    }
}

function StartCircuit() {
    if (input1Text.textContent == 2 || input2Text.textContent == 2 || input3Text.textContent == 2 || input4Text.textContent == 2) {
        OBSERV.innerHTML = "Please select the input correctly";
    }

    if (input1Text.textContent != 2 && input2Text.textContent != 2 && input3Text.textContent != 2 && input4Text.textContent != 2 && tl.progress() != 1) {
        outputHandler();
        if (OBSERV.innerHTML != "This value exceeds greater than 9. Try with a value smaller than 9.") {
            tl.play();
            tl.timeScale(1);
            OBSERV.innerHTML = "Simulation has started.";
            decide = 1;
            BUTTON.innerHTML = "Halt";
            SPEED.selectedIndex=0;

        }
    }

    else if (tl.progress() == 1) {
        OBSERV.innerHTML = "Please Restart the simulation";
    }
}


var tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });

tl.add(inputVisible, 0);
tl.add(inputDisappear, 10);
tl.add(mainVisible, 12);
tl.add(outputHandler, 10);
tl.add(batado, 12);
tl.to(input1Dot, {
    motionPath: {
        path: "#inputpath1",
        align: "#inputpath1",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
tl.to(input2Dot, {
    motionPath: {
        path: "#inputpath2",
        align: "#inputpath2",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
tl.to(input3Dot, {
    motionPath: {
        path: "#inputpath3",
        align: "#inputpath3",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
tl.to(input4Dot, {
    motionPath: {
        path: "#inputpath4",
        align: "#inputpath4",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
    },

    duration: 10,
    repeat: 0,
    repeatDelay: 3,
    yoyo: true,
    ease: "none",
    paused: false,

}, 0);
tl.pause();



