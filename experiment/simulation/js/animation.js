import { setCoordinates,fillInputDots,fillColor,objectDisappear,objectAppear,setColor,unsetColor,calculateAnd,calculateXor} from "./animation-utility.js";

'use strict'

window.appendInputA = appendInputA;
window.appendInputB = appendInputB;
window.appendInputC = appendInputC;
window.appendInputD = appendInputD;
window.simulationStatus = simulationStatus;
window.restartCircuit = restartCircuit;
window.setSpeed=setSpeed;



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

const EMPTY="";
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
    for( const text of textInput){
        text.textContent = 2;
    }
}


// function to mark the output coordinates
function outputCoordinates() {
    setCoordinates(730,420,textOutput[0]);
    gsap.set(textOutput[0],{
        fontSize: 120,
        fill: "rgb(233, 9, 9)"
    });
    svg.append(textOutput[0]);
}

// function to mark the input dots
function inputDots() {
    for(const dot of dots){
        fillInputDots(dot,20,550,15,"#FF0000");
        svg.append(dot);
    }
}

// function to disappear the input dots
function inputDotDisappear() {
    for(const dot of dots){
        objectDisappear(dot);
    }
}

// function to appear the input dots
function inputDotVisible() {
    for(const dot of dots){
        objectAppear(dot);
    }
}
// function to disappear the output text
function outputDisappear() {
    for(const text of textOutput){
        objectDisappear(text);
    }
}
// function to appear the output text
function outputVisible() {
    for(const text of textOutput){
        objectAppear(text);
    }
}
// function to diappear the input text
function inputTextDisappear() {
    for(const text of textInput){
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
    for(const object of objects){
        fillColor(object,"#008000");
    }
}

function appendInputA() {
    if (textInput[0].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,24,0,0);
    }
    else if (textInput[0].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,24,0,0);
    }
    setter(textInput[0].textContent,dots[0]);
}
function appendInputB() {
    if (textInput[1].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,374,1,1);
    }
    else if (textInput[1].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,374,1,1);
    }
    setter(textInput[1].textContent,dots[1]);
}
function appendInputC() {
    if (textInput[2].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,414,2,2);
    }
    else if (textInput[2].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,414,2,2);
    }
    setter(textInput[2].textContent,dots[2]);
}
function appendInputD() {
    if (textInput[3].textContent !== "0" && timeline.progress() === 0) {
        changeto0(16,764,3,3);
    }
    else if (textInput[3].textContent !== "1" && timeline.progress() === 0) {
        changeto1(16,764,3,3);
    }
    setter(textInput[3].textContent,dots[3]);
}

function changeto1(coordinateX,coordinateY,object,textObject) {
    textInput[textObject].textContent = 1;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX,coordinateY,textInput[textObject]);
    fillColor(objects[object],"#29e");
    clearObservation();
    objectAppear(textInput[textObject]);
}

function changeto0(coordinateX,coordinateY,object,textObject) {
    textInput[textObject].textContent = 0;
    svg.appendChild(textInput[textObject]);
    setCoordinates(coordinateX,coordinateY,textInput[textObject]);
    fillColor(objects[object],"#eeeb22");
    clearObservation();
    objectAppear(textInput[textObject]);
}


function partialDotDisappear() {
    for(let i=1;i<4;i++){
        objectDisappear(dots[i]);
    }
}



function outputSetter(){
    inputDotDisappear();
    let ans = 0;
    for(let i=0;i<4;i++){
        ans += parseInt(textInput[i].textContent)*Math.pow(2,3-i);
    }
    if(ans>9){
        observ.innerHTML = "This value exceeds greater than 9. Try with a value smaller than 9.";
    }
    else{
        textOutput[0].textContent = ans;
    }
}

function display() {
    observ.innerHTML = "Simulation has finished. Press Restart to start again"
}

function reboot() {
    for(const text of textInput){
        text.textContent = 2;
    }
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
    if (circuitStarted) {
        timeline.timeScale(parseInt(speed));
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
    reboot();
    clearObservation();
    decide = false;
    status.innerHTML = "Start";
    observ.innerHTML = "Successfully restored";
    speed.selectedIndex = 0;
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
        observ.innerHTML = "Simulation has been stopped.";
        decide = false;
        status.innerHTML = "Start";
        speed.selectedIndex = 0;
    }
    else if (timeline.progress() === 1) {
        observ.innerHTML = "Please Restart the simulation";
    }
}
function startCircuit() {
    for(const text of textInput){
        if (text.textContent === "2") {
            observ.innerHTML = "Please set the input values";
            return;
        }
    }
    if (timeline.progress() !== 1) {
        if (!circuitStarted) {
            circuitStarted = true;
        }
        timeline.play();
        timeline.timeScale(1);
        observ.innerHTML = "Simulation has started.";
        decide = true;
        status.innerHTML = "Pause";
        speed.selectedIndex = 0;
    }
    else if (timeline.progress() === 1) {
        observ.innerHTML = "Please Restart the simulation";
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
timeline.add(outputSetter,10);
timeline.add(outputVisible,10);
timeline.eventCallback("onComplete", outputVisible);
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