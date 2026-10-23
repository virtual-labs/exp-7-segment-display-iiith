import { setCoordinates, fillInputDots, fillColor, objectDisappear, objectAppear, setColor, unsetColor, calculateAnd, calculateXor } from "./animation-utility.js";

'use strict';

window.appendInputA = appendInputA;
window.appendInputB = appendInputB;
window.appendInputC = appendInputC;
window.appendInputD = appendInputD;
window.simulationStatus = simulationStatus;
window.restartCircuit = restartCircuit;
window.setSpeed = setSpeed;



// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
const sidePanels = document.getElementsByClassName("v-datalist-container");
// Distance of working area from top
const circuitBoardTop = circuitBoard.offsetTop;
// Full height of window
const windowHeight = window.innerHeight;
const width = window.innerWidth;

const svg = document.querySelector(".svg");
const svgns = "http://www.w3.org/2000/svg";

const EMPTY = "";
// stroing the necessary div elements in const
const status = document.getElementById("play-or-pause");
const observ = document.getElementById("observations");
const speed = document.getElementById("speed");

// global varaibles declared here
const objects = [
    document.getElementById("inputa"),
    document.getElementById("inputb"),
    document.getElementById("inputc"),
    document.getElementById("inputd")
];
const textInput = [
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text"),
    document.createElementNS(svgns, "text")
];
const textOutput = [
    document.createElementNS(svgns, "text")
];
const dots = [
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle"),
    document.createElementNS(svgns, "circle")
];
// 4 dots emerge from A B C D respectively



// decide help to decide the speed
let decide = false;
// circuitStarted is initialised to 0 which depicts that demo hasn't started whereas circuitStarted 1 depicts that the demo has started.
let circuitStarted = false;


// function to take care of width
function demoWidth() {
    if (width < 1024) {
        circuitBoard.style.height = "600px";
    } else {
        circuitBoard.style.height = `${windowHeight - circuitBoardTop - 20}px`;
    }
    sidePanels[0].style.height = circuitBoard.style.height;
}

// function to initialise the input text i.e. either 0/1 that gets displayed after user click on them
function textIOInit() {
    for (const text of textInput) {
        text.textContent = 2;
    }
}


// function to mark the output coordinates
function outputCoordinates() {
    setCoordinates(730, 420, textOutput[0]);
    gsap.set(textOutput[0], {
        fontSize: 120,
        fill: "rgb(233, 9, 9)"
    });
    svg.append(textOutput[0]);
}

// function to mark the input dots
function inputDots() {
    for (const dot of dots) {
        fillInputDots(dot, 20, 550, 15, "#FF0000");
        svg.append(dot);
    }
}

// function to disappear the input dots
function inputDotDisappear() {
    for (const dot of dots) {
        objectDisappear(dot);
    }
}

// function to appear the input dots
function inputDotVisible() {
    for (const dot of dots) {
        objectAppear(dot);
    }
}
// function to disappear the output text
function outputDisappear() {
    for (const text of textOutput) {
        objectDisappear(text);
    }
}
// function to appear the output text
function outputVisible() {
    for (const text of textOutput) {
        objectAppear(text);
    }
}
// function to diappear the input text
function inputTextDisappear() {
    for (const text of textInput) {
        objectDisappear(text);
    }
}

function clearObservation() {
    observ.innerHTML = EMPTY;
}
function allDisappear() {
    inputDotDisappear();
    outputDisappear();
    inputTextDisappear();
    for (const object of objects) {
        fillColor(object, "#008000");
    }
}

// returns true if the inputs can be changed; a finished simulation is rewound so that new inputs can be tried
function inputsEditable() {
    if (timeline.progress() === 1) {
        rewind();
    }
    if (timeline.progress() !== 0) {
        observ.innerHTML = "Inputs cannot be changed while the simulation is running. Please click on Reset to change them.";
        return false;
    }
    return true;
}

// colours the dot of every input as per the value of that input
function inputDotColours() {
    for (let i = 0; i < 4; i++) {
        setter(textInput[i].textContent, dots[i]);
    }
}

// sets all the inputs to 0 so that the simulation can be started right away
function initInputs() {
    textIOInit();
    appendInputA();
    appendInputB();
    appendInputC();
    appendInputD();
}

// toggles the value of an input bit between 0 and 1
function toggleInput(index, coordinateX, coordinateY) {
    if (!inputsEditable()) {
        return;
    }
    if (textInput[index].textContent !== "0") {
        changeto0(coordinateX, coordinateY, index, index);
    }
    else {
        changeto1(coordinateX, coordinateY, index, index);
    }
    setter(textInput[index].textContent, dots[index]);
}

function appendInputA() {
    toggleInput(0, 16, 24);
}
function appendInputB() {
    toggleInput(1, 16, 374);
}
function appendInputC() {
    toggleInput(2, 16, 414);
}
function appendInputD() {
    toggleInput(3, 16, 764);
}

function changeto1(coordinateX, coordinateY, object, textObject) {
    textInput[textObject].textContent = 1;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX, coordinateY, textInput[textObject]);
    fillColor(objects[object], "#29e");
    clearObservation();
    objectAppear(textInput[textObject]);
}

function changeto0(coordinateX, coordinateY, object, textObject) {
    textInput[textObject].textContent = 0;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX, coordinateY, textInput[textObject]);
    fillColor(objects[object], "#eeeb22");
    clearObservation();
    objectAppear(textInput[textObject]);
}


function partialDotDisappear() {
    for (let i = 1; i < 4; i++) {
        objectDisappear(dots[i]);
    }
}



// value of the BCD input (A is the most significant bit)
function bcdValue() {
    let value = 0;
    for (let i = 0; i < 4; i++) {
        value += parseInt(textInput[i].textContent) * Math.pow(2, 3 - i);
    }
    return value;
}

function outputSetter() {
    inputDotDisappear();
    textOutput[0].textContent = bcdValue();
}

// segments that are ON for the digits 0 to 9
const DIGIT_SEGMENTS = ["abcdef", "bc", "abdeg", "abcdg", "bcfg", "acdfg", "acdefg", "abc", "abcdefg", "abcdfg"];

function display() {
    decide = false;
    status.innerHTML = "Start";
    const value = bcdValue();
    const bits = textInput.map(text => text.textContent).join("");
    observ.innerHTML = `Simulation has finished.<br>BCD input ABCD = ${bits}, so the display shows the digit ${value}.<br>Segments ${DIGIT_SEGMENTS[value].split("").join(", ")} are ON.<br>Click on an input to change it and then click on Start to simulate again.`;
}

// takes the timeline back to the beginning while keeping the selected input values
function rewind() {
    timeline.seek(0);
    timeline.pause();
    inputDotDisappear();
    inputDotColours();
    outputDisappear();
    decide = false;
    status.innerHTML = "Start";
}

function setter(value, component) {
    if (value === "1") {
        unsetColor(component);
    }
    else if (value === "0") {
        setColor(component);
    }
}

function setSpeed(speed) {
    timeline.timeScale(parseInt(speed));
    if (circuitStarted) {
        observ.innerHTML = `${speed}x speed`;
    }
}

function restartCircuit() {
    if (circuitStarted) {
        circuitStarted = false;
    }
    timeline.seek(0);
    timeline.pause();
    allDisappear();
    initInputs();
    decide = false;
    status.innerHTML = "Start";
    observ.innerHTML = "Successfully restored";
    speed.selectedIndex = 0;
    timeline.timeScale(1);
}

function simulationStatus() {
    if (!decide) {
        startCircuit();
    }
    else if (decide) {
        stopCircuit();
    }
}
function stopCircuit() {
    if (timeline.time() !== 0 && timeline.progress() !== 1) {
        timeline.pause();
        observ.innerHTML = "Simulation has been Paused. Please click on the 'Start' button to Resume.";
        decide = false;
        status.innerHTML = "Start";
    }
}
function startCircuit() {
    if (timeline.progress() === 1) {
        rewind();
    }
    if (bcdValue() > 9) {
        observ.innerHTML = "The value is greater than 9. Set the inputs to a valid BCD digit (0000 to 1001) and click on Start again.";
        return;
    }
    if (timeline.progress() !== 1) {
        if (!circuitStarted) {
            circuitStarted = true;
        }
        timeline.play();
        timeline.timeScale(parseInt(speed.value));
        observ.innerHTML = "Simulation has started.";
        decide = true;
        status.innerHTML = "Pause";
    }
}



// all the execution begin here
let timeline = gsap.timeline({ repeat: 0, repeatDelay: 0 });
gsap.registerPlugin(MotionPathPlugin);
demoWidth();
// calling all the functions that are going to initialise 
textIOInit();
outputCoordinates();
inputDots();
outputDisappear();

timeline.add(inputDotVisible, 0);
timeline.add(partialDotDisappear, 10);
timeline.add(outputSetter, 10);
timeline.add(outputVisible, 10);
timeline.eventCallback("onComplete", display);

timeline.to(dots[0], {
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
timeline.to(dots[1], {
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
timeline.to(dots[2], {
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
timeline.to(dots[3], {
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


timeline.pause();
inputDotDisappear();
initInputs();