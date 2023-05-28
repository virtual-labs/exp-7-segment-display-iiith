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

export const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  menu.style.display = "block";
};

window.addEventListener("click", e => {
  menu.style.display = "none";
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
  unbindEvent();
  if (task === "task1") {
    connectGate();
    refreshWorkingArea();
    initDecoder();
    window.simulate = simulate
  }
  else if (task === "task2") {
    connectDecoderDisplay();
    refreshWorkingArea();
    init7Segment();
    window.simulate = simulateDecoder
  }
  else
  {
    console.log("Error: Unknown task");
  }
  updateInstructions();
  updateToolbar();
  clearObservations();
  resize();
}

window.changeTabs = changeTabs;

// Instruction box
const updateInstructions = () => {
  const task = window.currentTab;
  const instructionBox = document.getElementById("instruction-title");
  const delete_inst = document.getElementById("delete");
  const truthtable_inst = document.getElementById("truth-table");
  const components = document.getElementById("comp");
  let title = ""; 
  let tt_inst="";
  let del_ins = "";
  let cmps = "";
  if (task === "task1") {
    title = `Instructions<br>Implement a BCD to 7-segment decoder using logic gates`;
    del_ins = `<li>You can delete components by right clicking on them and selecting the delete option</li>`;
    tt_inst = `<li>Clicking on 'Submit' will display a 'Success' or 'Failure' message in the Observations Section according to the correctness of your circuit. It will also display a Truth Table verifying your circuit for different input values.</li>`;
    cmps = `<li>Click on components on the left side to add them to the circuit board.</li>`
  } else if (task === "task2") {
    title = `Instructions<br>Test a BCD decoder with a 7-segment display`;
    tt_inst = `<li>Clicking on 'Submit' will display a 'Success' or 'Failure' message in the Observations Section according to the correctness of your circuit.</li>`;
  }
  instructionBox.innerHTML = title;
  delete_inst.innerHTML = del_ins;
  truthtable_inst.innerHTML = tt_inst;
  components.innerHTML = cmps;
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