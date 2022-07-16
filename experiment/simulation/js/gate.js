import { registerGate, jsPlumbInstance } from "./main.js";
import { setPosition } from "./layout.js";
import { decoderTest, displayTest, computeAnd, computeOr, computeXor, computeXnor, computeNand, computeNor } from "./validator.js";

'use strict';

export let gates = {}; // Array of gates
window.numComponents = 0;
export function clearGates() {

    for (let gateId in gates) {
        delete gates[gateId];
    }

    gates = {};
}

export class Gate {
    constructor(type) {
        this.type = type;
        this.id = type + "-" + window.numComponents++;
        this.positionX = 0;
        this.positionY = 0;
        this.isConnected = false;
        this.inputPoints = [];
        this.outputPoints = [];
        this.inputs = []; // List of input gates
        this.output = null; // Output value
        this.isInput = false;
        this.isOutput = false;
        this.name = null;
    }
    setId(id) {
        this.id = id;
    }
    addInput(gate) {
        this.inputs.push(gate);
    }
    removeInput(gate) {
        let index = this.inputs.indexOf(gate);
        if (index > -1) {
            this.inputs.splice(index, 1);
        }
    }
    updatePosition(id) {
        this.positionY = window.scrollY + document.getElementById(id).getBoundingClientRect().top // Y

        this.positionX = window.scrollX + document.getElementById(id).getBoundingClientRect().left // X
    }
    setName(name) {
        this.name = name;
    }

    generateComponent() {
        let component = "";

        switch (this.type) {
            case "Input":
                component = `<div class="high" id= ${this.id} ><a ondblclick="setInput(event)">1</a><p> ${this.name}  </p></div>`;
                this.output = true;
                this.isInput = true;
                break;
            case "Output":
                component = `<div class="output" id= ${this.id}><a></a><p>  ${this.name}  </p></div>`;
                this.isOutput = true;
                break;
            default:
                component = `<div class="drag-drop logic-gate ${this.type.toLowerCase()}" id= ${this.id
                    }></div>`;
        }
        return component;
    }

    registerComponent(workingArea, x = 0, y = 0) {
        // get width of working area
        const width = document.getElementById(workingArea).offsetWidth;
        const height = document.getElementById(workingArea).offsetHeight;
        let scale = 900;
        let yScale = 800;
        x = (x / scale) * width;
        y = (y / yScale) * height;

        const el = document.getElementById(this.id);
        el.style.left = x + "px";
        el.style.top = y + "px";

        if (this.type != "Input" && this.type != "Output") {

            el.addEventListener(
                "contextmenu",
                function (ev) {
                    ev.preventDefault();
                    const origin = {
                        left: ev.pageX - document.getScroll()[0],
                        top: ev.pageY - document.getScroll()[1],
                    };
                    setPosition(origin);
                    window.selectedComponent = this.id;
                    window.componentType = "gate";
                    return false;
                },
                false
            );
        }
        gates[this.id] = this;
        registerGate(this.id, this);

        this.updatePosition(this.id);
    }

    addInputPoints(input) {
        this.inputPoints.push(input);
    }

    addOutputPoints(output) {
        this.outputPoints.push(output);
    }


    generateOutput() {
        switch (this.type) {
            case "AND":
                this.output = computeAnd(this.inputs[0].output, this.inputs[1].output);
                break;
            case "OR":
                this.output = computeOr(this.inputs[0].output, this.inputs[1].output);
                break;
            case "NOT":
                this.output = !this.inputs[0].output;
                break;
            case "NAND":
                this.output = computeNand(this.inputs[0].output, this.inputs[1].output);
                break;
            case "NOR":
                this.output = computeNor(this.inputs[0].output, this.inputs[1].output);
                break;
            case "XOR":
                this.output = computeXor(this.inputs[0].output, this.inputs[1].output);
                break;
            case "XNOR":
                this.output = computeXnor(this.inputs[0].output, this.inputs[1].output);
                break;
            case "Output":
                this.output = this.inputs[0].output;
                break;
        }
    }

    setOutput(val) {
        this.output = val;
    }
    setConnected(val) {
        this.isConnected = val;
    }
}



function addGate(event) {
    const type = event.target.innerHTML;
    const gate = new Gate(type);
    const component = gate.generateComponent();
    const parent = document.getElementById("working-area");
    parent.insertAdjacentHTML('beforeend', component);
    gate.registerComponent("working-area");
}

window.addGate = addGate;

export function getResult(gate) {
    if (gate.output != null) {
        return;
    }
    for (let i = 0; i < gate.inputs.length; i++) {
        if (gate.inputs[i].output == null) {
            getResult(gate.inputs[i]);
        }
    }
    gate.generateOutput();
    return;
}

function setInput(event) {
    let parentElement = event.target.parentElement;
    let element = event.target;
    let type = parentElement.className.split(" ")[0];
    let gate = gates[parentElement.id];
    if (type === "high") {
        // change class HIGH to LOW
        parentElement.classList.replace("high", "low");
        element.innerHTML = "0";
        gate.setOutput(false);
    }
    else if (type === "low") {
        parentElement.classList.replace("low", "high");
        element.innerHTML = "1";
        gate.setOutput(true);
    }
}

window.setInput = setInput;

export function clearResult() {
    const result = document.getElementById("result");
    result.innerHTML = "";
}

export function printErrors(message,objectId) {
    const result = document.getElementById('result');
    result.innerHTML += message;
    result.className = "failure-message";
    if(objectId !== null)
    {
        objectId.classList.add("highlight")
        setTimeout(function () {objectId.classList.remove("highlight")}, 5000);
    }
}

// Check if the connections are correct
export function checkConnections() {
    for (let gateId in gates) {
        const gate = gates[gateId];
        const id = document.getElementById(gate.id);
        if (gate.inputPoints.length != gate.inputs.length) {
            printErrors("Highlighted component not connected properly\n",id);
            return false;
        } else if (gate.isConnected === false && gate.isOutput === false) {
            printErrors("Highlighted component not connected properly\n",id);
            return false;
        }
    }
    return true;
}

// Simulate the circuit
export function simulate() {
    clearResult();
    if (!checkConnections()) {
        return;
    }

    // reset output in gate
    for (let gateId in gates) {
        if (!gates[gateId].isInput) {
            gates[gateId].output = null;
        }
    }

    for (let gateId in gates) {
        const gate = gates[gateId];
        if (gate.isOutput) {
            getResult(gate);
            let element = document.getElementById(gate.id);
            if (gate.output) {
                element.className = "high";
                element.childNodes[0].innerHTML = "1";
            } else {
                element.className = "low";
                element.childNodes[0].innerHTML = "0";
            }
        }
    }
}

window.simulate = simulate;

// Simulate the circuit for given gates; Used for testing the circuit for all possible inputss
export function testSimulation(gates) {
    if (!checkConnections()) {
        document.getElementById("table-body").innerHTML = "";
        return false;
    }

    // reset output in gate
    for (let gateId in gates) {
        if (!gates[gateId].isInput) {
            gates[gateId].output = null;
        }
    }

    for (let gateId in gates) {
        const gate = gates[gateId];
        if (gate.isOutput) {
            getResult(gate);
        }
    }
    return true;
}

// function to submit the desired circuit and get the final success or failure message
export function submitCircuit() {
    clearResult();
    document.getElementById("table-body").innerHTML = "";
    if (window.currentTab === "task1") {
        decoderTest("Input-0", "Input-1", "Input-2", "Input-3", "Output-4", "Output-5", "Output-6", "Output-7", "Output-8", "Output-9", "Output-10");
    }
    else if (window.currentTab === "task2") {
        displayTest("Input-0", "Input-1", "Input-2", "Input-3");
    }
}
window.submitCircuit = submitCircuit;


export function deleteElement(gateid) {

    let gate = gates[gateid];
    jsPlumbInstance.removeAllEndpoints(document.getElementById(gate.id));
    jsPlumbInstance._removeElement(document.getElementById(gate.id));
    for (let elem in gates) {
        if (gates[elem].inputs.includes(gate)) {
            gates[elem].removeInput(gate);
        }
    }
    delete gates[gateid];
}


