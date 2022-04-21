import { simulate, deleteElement } from "./gate.js";
import { connectGate, connectDecoderDisplay, unbindEvent, initDecoder, init7Segment, refreshWorkingArea } from "./main.js";
import { simulateDecoder } from "./decoder.js";
"use strict";

// Wires
export const wireColours = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#bf6be3",
  "#ff00ff",
  "#00ffff",
  "#ff8000",
  "#00ff80",
  "#80ff00",
  "#ff0080",
  "#8080ff",
  "#c0c0c0",
];

// Contextmenu
const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");
let menuVisible = false;

const toggleMenu = command => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

export const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", e => {
  if (menuVisible) toggleMenu("hide");
  window.selectedComponent = null;
  window.componentType = null;
});

menuOption.addEventListener("click", e => {
  if (e.target.innerHTML === "Delete") {
    if (window.componentType === "gate") {
      deleteElement(window.selectedComponent);
    }
  }
  window.selectedComponent = null;
  window.componentType = null;
});

// Tabs

function changeTabs(e) {
  const task = e.target.parentNode.id;
  if (window.currentTab === task) {
    return;
  }

  if (window.currentTab != null) {
    document.getElementById(window.currentTab).classList.remove("is-active");
  }
  window.currentTab = task;
  document.getElementById(task).classList.add("is-active");

  // Half adder
  if (task === "task1") {
    unbindEvent();
    connectGate();
    refreshWorkingArea();
    initDecoder();
    window.simulate = simulate
  }
  else if (task === "task2") {
    unbindEvent();
    connectDecoderDisplay();
    refreshWorkingArea();
    init7Segment();
    window.simulate = simulateDecoder
  }
  updateInstructions();
  updateToolbar();
  clearObservations();
  resize();
}

window.changeTabs = changeTabs;

function updateInstructions() {
  if (window.currentTab === "task1") {
    document.getElementById("TaskTitle").innerHTML = "Decoder";
    document.getElementById("TaskDescription").innerHTML = 'Implement a BCD to 7-segment decoder using logic gates.';
  }
  else if (window.currentTab === "task2") {
    document.getElementById("TaskTitle").innerHTML = "7 Segment Display";
    document.getElementById("TaskDescription").innerHTML = 'Connect the 7-segment display to the decoder and observe the output.';
  }
}

// Toolbar

function updateToolbar() {
  let elem = "";
  if (window.currentTab === "task1") {
    elem = '<div class="component-button and" onclick="addGate(event)">AND</div><div class="component-button or" onclick="addGate(event)">OR</div><div class="component-button not" onclick="addGate(event)">NOT</div><div class="component-button nand" onclick="addGate(event)">NAND</div><div class="component-button nor" onclick="addGate(event)">NOR</div><div class="component-button xor" onclick="addGate(event)">XOR</div><div class="component-button xnor" onclick="addGate(event)">XNOR</div>'
  }
  else if (window.currentTab === "task2") {
    elem = ''
  }
  document.getElementById("toolbar").innerHTML = elem;
}

// Clear observations
function clearObservations() {

  document.getElementById("table-body").innerHTML = "";
  let head = ''

  if (window.currentTab === "task1") {
    head = '<tr><th colspan="4">Input</th><th colspan="8">Output</th></tr><tr><th>A</th><th>B</th><th>C</th><th>D</th><th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th><th>g</th></tr>'
  }
  else if (window.currentTab === "task2") {
    head = ''
  }

  document.getElementById("table-head").innerHTML = head;
  document.getElementById('result').innerHTML = "";

}

// Instruction box
const instructionBox = document.getElementsByClassName("instructions-box")[0];
instructionBox.addEventListener("click", (e) => {
  instructionBox.classList.toggle("expand");
});

// Making webpage responsive

// Dimensions of working area
const circuitBoard = document.getElementById("circuit-board");
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

function resize() {
  const circuitBoard = document.getElementById("circuit-board");
  const sidePanels = document.getElementsByClassName("v-datalist-container");

  if (width >= 1024) {
    for (let i = 0; i < sidePanels.length; i++) {
      sidePanels[i].style.height = circuitBoard.style.height;
    }
  }
}

resize();