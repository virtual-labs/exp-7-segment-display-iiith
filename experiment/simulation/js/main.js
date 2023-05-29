import * as gatejs from "./gate.js";
import * as decoderjs from "./decoder.js";
import * as displayjs from "./display.js";
import {wireColours} from "./layout.js";

'use strict';

let num_wires = 0;

document.getScroll = function () {
    if (window.pageYOffset != undefined) {
        return [pageXOffset, pageYOffset];
    } else {
        let sx, sy, d = document,
            r = d.documentElement,
            b = d.body;
        sx = r.scrollLeft || b.scrollLeft || 0;
        sy = r.scrollTop || b.scrollTop || 0;
        return [sx, sy];
    }
}
const workingArea = document.getElementById("working-area");
export const jsPlumbInstance = jsPlumbBrowserUI.newInstance({
    container: workingArea,
    maxConnections: -1,
    endpoint: {
        type: "Dot",
        options: { radius: 7 },
    },
    dragOptions: {
        containment: "parentEnclosed",
        containmentPadding: 5,
    },
    connector: "Flowchart",
    paintStyle: { strokeWidth: 4, stroke: "#888888" },
    connectionsDetachable: false,
});

export const connectGate = function () {
    jsPlumbInstance.bind("beforeDrop", function (data) {
        const fromEndpoint = data.connection.endpoints[0];
        const toEndpoint = data.dropEndpoint;

        const start_uuid = fromEndpoint.uuid.split(":")[0];
        const end_uuid = toEndpoint.uuid.split(":")[0];

        if (fromEndpoint.elementId === toEndpoint.elementId) {
            return false;
        }

        if (start_uuid === "input" && end_uuid === "input") {
            return false;
        } else if (start_uuid === "output" && end_uuid === "output") {
            return false;
        } else if ((end_uuid==="input" && toEndpoint.connections.length > 0) || (start_uuid==="input" && fromEndpoint.connections.length>1)) {
            // If it already has a connection, do not establish a new connection
            return false;
        } else {
            jsPlumbInstance.connect({ uuids: [fromEndpoint.uuid, toEndpoint.uuid], paintStyle:{ stroke: wireColours[num_wires], strokeWidth:4 }});
            num_wires++;
            num_wires = num_wires % wireColours.length;

            if (start_uuid === "output") {
                const input = gatejs.gates[fromEndpoint.elementId];
                input.isConnected = true;
                gatejs.gates[toEndpoint.elementId].addInput(input);
            } else if (end_uuid === "output") {
                const input = gatejs.gates[toEndpoint.elementId];
                input.isConnected = true;
                gatejs.gates[fromEndpoint.elementId].addInput(input);
            }

        }
    });
}

export const connectDecoderDisplay = function () {
    jsPlumbInstance.bind("beforeDrop", function (data) {
        const fromEndpoint = data.connection.endpoints[0];
        const toEndpoint = data.dropEndpoint;

        const start_uuid = fromEndpoint.uuid.split(":")[0];
        const end_uuid = toEndpoint.uuid.split(":")[0];

        if (fromEndpoint.elementId === toEndpoint.elementId) {
            return false;
        }

        if (start_uuid === "input" && end_uuid === "input") {
            return false;
        } else if (start_uuid === "output" && end_uuid === "output") {
            return false;
        } else if ((end_uuid==="input" && toEndpoint.connections.length > 0) || (start_uuid==="input" && fromEndpoint.connections.length>1)) {
            // If it already has a connection, do not establish a new connection
            return false;
        } else {
            jsPlumbInstance.connect({ uuids: [fromEndpoint.uuid, toEndpoint.uuid], paintStyle:{ stroke: wireColours[num_wires], strokeWidth:4 }});
            num_wires++;
            num_wires = num_wires % wireColours.length;
            const start_type = fromEndpoint.elementId.split("-")[0];
            const end_type = toEndpoint.elementId.split("-")[0];
            if (start_type === "Decoder" && end_type === "Display") {
                if (start_uuid === "output") {
                    let outputEndpoint = "";
                    if (Object.keys(toEndpoint.overlays)[0].includes("a")) {
                        outputEndpoint = "a";
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("b")) {
                        outputEndpoint = "b";
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("c")) {
                        outputEndpoint = "c";
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("d")) {
                        outputEndpoint = "d";
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("e")) {
                        outputEndpoint = "e";
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("f")) {
                        outputEndpoint = "f";
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("g")) {
                        outputEndpoint = "g";
                    }

                    if (Object.keys(fromEndpoint.overlays)[0].includes("a")) {
                        decoderjs.decoder.seta(outputEndpoint);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("b")) {
                        decoderjs.decoder.setb(outputEndpoint);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("c")) {
                        decoderjs.decoder.setc(outputEndpoint);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("d")) {
                        decoderjs.decoder.setd(outputEndpoint);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("e")) {
                        decoderjs.decoder.sete(outputEndpoint);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("f")) {
                        decoderjs.decoder.setf(outputEndpoint);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("g")) {
                        decoderjs.decoder.setg(outputEndpoint);
                    }
                }
            }
            if (start_type === "Display" && end_type === "Decoder") {
                if (end_uuid === "output") {
                    let outputEndpoint = "";
                    if (Object.keys(fromEndpoint.overlays)[0].includes("a")) {
                        outputEndpoint = "a";
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("b")) {
                        outputEndpoint = "b";
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("c")) {
                        outputEndpoint = "c";
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("d")) {
                        outputEndpoint = "d";
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("e")) {
                        outputEndpoint = "e";
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("f")) {
                        outputEndpoint = "f";
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("g")) {
                        outputEndpoint = "g";
                    }

                    if (Object.keys(toEndpoint.overlays)[0].includes("a")) {
                        decoderjs.decoder.seta(outputEndpoint);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("b")) {
                        decoderjs.decoder.setb(outputEndpoint);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("c")) {
                        decoderjs.decoder.setc(outputEndpoint);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("d")) {
                        decoderjs.decoder.setd(outputEndpoint);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("e")) {
                        decoderjs.decoder.sete(outputEndpoint);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("f")) {
                        decoderjs.decoder.setf(outputEndpoint);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("g")) {
                        decoderjs.decoder.setg(outputEndpoint);
                    }
                }
            }
            // =======================================================
            else if (start_type === "Decoder" && end_type === "Input") {
                if (end_uuid === "output") {
                    const input = gatejs.gates[toEndpoint.elementId];
                    input.setConnected(true);
                    if (Object.keys(fromEndpoint.overlays)[0].includes("A")) {
                        decoderjs.decoder.setA(input);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("B")) {
                        decoderjs.decoder.setB(input);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("C")) {
                        decoderjs.decoder.setC(input);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("D")) {
                        decoderjs.decoder.setD(input);
                    }
                }
            }
            else if (start_type === "Input" && end_type === "Decoder") {
                if (start_uuid === "output") {
                    const input = gatejs.gates[fromEndpoint.elementId];
                    input.setConnected(true);
                    if (Object.keys(toEndpoint.overlays)[0].includes("A")) {
                        decoderjs.decoder.setA(input);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("B")) {
                        decoderjs.decoder.setB(input);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("C")) {
                        decoderjs.decoder.setC(input);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("D")) {
                        decoderjs.decoder.setD(input);
                    }
                }
            }
            else if (start_type === "Display" && end_type === "Input") {
                if (end_uuid === "output") {
                    const input = gatejs.gates[toEndpoint.elementId];
                    input.setConnected(true);
                    if (Object.keys(fromEndpoint.overlays)[0].includes("a")) {
                        displayjs.display.setInput("a", input.output);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("b")) {
                        displayjs.display.setInput("b", input.output);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("c")) {
                        displayjs.display.setInput("c", input.output);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("d")) {
                        displayjs.display.setInput("d", input.output);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("e")) {
                        displayjs.display.setInput("e", input.output);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("f")) {
                        displayjs.display.setInput("f", input.output);
                    }
                    else if (Object.keys(fromEndpoint.overlays)[0].includes("g")) {
                        displayjs.display.setInput("g", input.output);
                    }
                }
            }
            else if (start_type === "Input" && end_type === "Display") {
                if (start_uuid === "output") {
                    const input = gatejs.gates[fromEndpoint.elementId];
                    input.setConnected(true);
                    if (Object.keys(toEndpoint.overlays)[0].includes("a")) {
                        displayjs.display.setInput("a", input.output);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("b")) {
                        displayjs.display.setInput("b", input.output);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("c")) {
                        displayjs.display.setInput("c", input.output);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("d")) {
                        displayjs.display.setInput("d", input.output);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("e")) {
                        displayjs.display.setInput("e", input.output);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("f")) {
                        displayjs.display.setInput("f", input.output);
                    }
                    else if (Object.keys(toEndpoint.overlays)[0].includes("g")) {
                        displayjs.display.setInput("g", input.output);
                    }
                }
            }
        }
    });
}

export const unbindEvent = () => {
    jsPlumbInstance.unbind("beforeDrop");
}


export function registerGate(id, gate) {
    const element = document.getElementById(id);
    const gateType = id.split("-")[0];

    if (
        gateType === "AND" ||
        gateType === "OR" ||
        gateType === "XOR" ||
        gateType === "XNOR" ||
        gateType === "NAND" ||
        gateType === "NOR"
    ) {
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, -9],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
            })
        );
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, 10],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:1:" + id,
            })
        );
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.5, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
            })
        );
    } else if (gateType === "NOT") {
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
            })
        );
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.5, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
            })
        );
    } else if (gateType === "Input") {
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.5, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
            })
        );
    } else if (gateType === "Output") {
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.5, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
            })
        );
    }
    else if (gateType === "Decoder") {
        // a
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.125, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:0:" + id,
                overlays: [
                    { type: "Label", options: { label: "a", id: "a", location: [-0.7, 0.4] } }
                ],
            })
        );
        // b
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.250, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:1:" + id,
                overlays: [
                    { type: "Label", options: { label: "b", id: "b", location: [-0.7, 0.4] } }
                ],
            })
        );
        // c
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.375, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:2:" + id,
                overlays: [
                    { type: "Label", options: { label: "c", id: "c", location: [-0.7, 0.4] } }
                ],
            })
        );
        // d
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.500, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:3:" + id,
                overlays: [
                    { type: "Label", options: { label: "d", id: "d", location: [-0.7, 0.4] } }
                ],
            })
        );
        // e
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.625, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:4:" + id,
                overlays: [
                    { type: "Label", options: { label: "e", id: "e", location: [-0.7, 0.4] } }
                ],
            })
        );
        // f
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.750, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:5:" + id,
                overlays: [
                    { type: "Label", options: { label: "f", id: "f", location: [-0.7, 0.4] } }
                ],
            })
        );
        // g
        gate.addOutputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [1, 0.875, 1, 0, 7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "output:6:" + id,
                overlays: [
                    { type: "Label", options: { label: "g", id: "g", location: [-0.7, 0.4] } }
                ],
            })
        );
        // A
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.2, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
                overlays: [
                    { type: "Label", options: { label: "A", id: "A", location: [1.8, 0.4] } }
                ],
            })
        );
        // B
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.4, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:1:" + id,
                overlays: [
                    { type: "Label", options: { label: "B", id: "B", location: [1.8, 0.4] } }
                ],
            })
        );
        // C
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.6, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:2:" + id,
                overlays: [
                    { type: "Label", options: { label: "C", id: "C", location: [1.8, 0.4] } }
                ],
            })
        );
        // D
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.8, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:3:" + id,
                overlays: [
                    { type: "Label", options: { label: "D", id: "D", location: [1.8, 0.4] } }
                ],
            })
        );
    }
    else if (gateType === "Display") {
        // a
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.125, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:0:" + id,
                overlays: [
                    { type: "Label", options: { label: "a", id: "a", location: [2, 0.4], cssClass: "label-display" } }
                ],
            })
        );
        // b
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.250, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:1:" + id,
                overlays: [
                    { type: "Label", options: { label: "b", id: "b", location: [2, 0.4], cssClass: "label-display" } }
                ],
            })
        );
        // c
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.375, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:2:" + id,
                overlays: [
                    { type: "Label", options: { label: "c", id: "c", location: [2, 0.4], cssClass: "label-display" } }
                ],
            })
        );
        // d
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.500, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:3:" + id,
                overlays: [
                    { type: "Label", options: { label: "d", id: "d", location: [2, 0.4], cssClass: "label-display" } }
                ],
            })
        );
        // e
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.625, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:4:" + id,
                overlays: [
                    { type: "Label", options: { label: "e", id: "e", location: [2, 0.4], cssClass: "label-display" } }
                ],
            })
        );
        // f
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.750, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:5:" + id,
                overlays: [
                    { type: "Label", options: { label: "f", id: "f", location: [2, 0.4], cssClass: "label-display" } }
                ],
            })
        );
        // g
        gate.addInputPoints(
            jsPlumbInstance.addEndpoint(element, {
                anchor: [0, 0.875, -1, 0, -7, 0],
                source: true,
                target: true,
                connectionsDetachable: false,
                uuid: "input:6:" + id,
                overlays: [
                    { type: "Label", options: { label: "g", id: "g", location: [2, 0.4], cssClass: "label-display" } }
                ],
            })
        );
    }

}
export function initDecoder() {
    const ids = ["Input-0", "Input-1", "Input-2", "Input-3", "Output-4", "Output-5", "Output-6", "Output-7", "Output-8", "Output-9", "Output-10"];
    const types = ["Input", "Input", "Input", "Input", "Output", "Output", "Output", "Output", "Output", "Output", "Output"];
    const names = ["A", "B", "C", "D", "a", "b", "c", "d", "e", "f", "g"];
    const positions = [
        { x: 40, y: 100 },
        { x: 40, y: 300 },
        { x: 40, y: 500 },
        { x: 40, y: 700 },
        { x: 820, y: 100 },
        { x: 820, y: 200 },
        { x: 820, y: 300 },
        { x: 820, y: 400 },
        { x: 820, y: 500 },
        { x: 820, y: 600 },
        { x: 820, y: 700 }
    ];
    for (let i = 0; i < ids.length; i++) {
        let gate = new gatejs.Gate(types[i]);
        gate.setId(ids[i]);
        gate.setName(names[i]);
        const component = gate.generateComponent();
        const parent = document.getElementById("working-area");
        parent.insertAdjacentHTML('beforeend', component);
        gate.registerComponent("working-area", positions[i].x, positions[i].y);;
    }
}

export function init7Segment() {
    const ids = ["Input-0", "Input-1", "Input-2", "Input-3"]; // [A,B,C,D]
    const types = ["Input", "Input", "Input", "Input"];
    const names = ["A", "B", "C", "D"];
    const positions = [
        { x: 40, y: 130 },
        { x: 40, y: 290 },
        { x: 40, y: 450 },
        { x: 40, y: 610 }
    ];
    for (let i = 0; i < ids.length; i++) {
        let gate = new gatejs.Gate(types[i]);
        gate.setId(ids[i]);
        gate.setName(names[i]);
        const component = gate.generateComponent();
        const parent = document.getElementById("working-area");
        parent.insertAdjacentHTML('beforeend', component);
        gate.registerComponent("working-area", positions[i].x, positions[i].y);
    }
    decoderjs.addDecoder("working-area", 180, 175);
    displayjs.createDisplay("working-area", 600, 175);
}


export function refreshWorkingArea() {
    jsPlumbInstance.reset();
    window.numComponents = 0;

    gatejs.clearGates();
    decoderjs.clearDecoder();
    displayjs.clearDisplay();
}



window.currentTab = "task1";
connectGate();
refreshWorkingArea();
initDecoder();



