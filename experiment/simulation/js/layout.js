import { simulate, deleteElement } from "./gate.js";
import {bindEvent1, bindEvent2, unbindEvent, initDecoder, init7Segment, refreshWorkingArea} from "./main.js";
import { simulateDecoder } from "./decoder.js";


// Wires
export const wireColours = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff", "#ff8000", "#00ff80", "#80ff00", "#ff0080", "#8080ff", "#c0c0c0"];

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
  if (e.target.innerHTML == "Delete") {
    if (window.componentType == "gate") {
      deleteElement(window.selectedComponent);
    }
  }
  window.selectedComponent = null;
  window.componentType = null;
});

// Tabs

function changeTabs(e) {
  const task = e.target.parentNode.id;
  if (window.currentTab == task) {
    return;
  }

  if (window.currentTab != null) {
    document.getElementById(window.currentTab).classList.remove("is-active");
  }
  window.currentTab = task;
  document.getElementById(task).classList.add("is-active");

  // Half adder
  if (task == "Task1") {
    unbindEvent();
    bindEvent1();
    refreshWorkingArea();
    initDecoder();
    window.simulate= simulate
  }
  else if (task == "Task2") {
    unbindEvent();
    bindEvent2();
    refreshWorkingArea();
    init7Segment();
    window.simulate= simulateDecoder
  }
  updateInstructions();
  updateToolbar();
  clearObservations();
}

window.changeTabs = changeTabs;

function updateInstructions() {
  if (window.currentTab == "Task1") {
    document.getElementById("TaskTitle").innerHTML = "Decoder";
    document.getElementById("TaskDescription").innerHTML = 'Implement a BCD to 7-segment decoder using logic gates.';
  }
  else if (window.currentTab == "Task2") {
    document.getElementById("TaskTitle").innerHTML = "7 Segment Display";
    document.getElementById("TaskDescription").innerHTML = 'Connect the 7-segment display to the decoder and observe the output.';
  }
}

// Toolbar

function updateToolbar() {
  let elem = "";
  if (window.currentTab == "Task1") {
    elem = '<div class="column is-one-half"><div class="component-button AND" onclick="Add(event)">AND</div><div class="component-button OR" onclick="Add(event)">OR</div><div class="component-button NOT" onclick="Add(event)">NOT</div><div class="component-button NAND" onclick="Add(event)">NAND</div></div><div class="column is-one-half"><div class="component-button NOR" onclick="Add(event)">NOR</div><div class="component-button XOR" onclick="Add(event)">XOR</div><div class="component-button XNOR" onclick="Add(event)">XNOR</div></div>'
  }
  else if (window.currentTab == "Task2") {
    elem = ''
  }
  document.getElementById("toolbar").innerHTML = elem;
}

// Clear observations
function clearObservations() {

  document.getElementById("table-body").innerHTML = "";
  let head = ''

  if (window.currentTab == "Task1") {
    head = '<tr><th colspan="4">Input</th><th colspan="8">Output</th></tr><tr><th>A</th><th>B</th><th>C</th><th>D</th><th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th><th>g</th></tr>'
  }
  else if (window.currentTab == "Task2") {
    head = ''
  }

  document.getElementById("table-head").innerHTML = head;
  document.getElementById('result').innerHTML = "";

}
