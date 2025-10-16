import * as gatejs from "./gate.js";
import * as decoderjs from "./decoder.js";
import * as displayjs from "./display.js";
import { wireColours } from "./layout.js";

("use strict");

let num_wires = 0;

document.getScroll = function () {
  if (window.scrollX != undefined) {
    return [scrollX, scrollY];
  } else {
    let sx,
      sy,
      d = document,
      r = d.documentElement,
      b = d.body;
    sx = r.scrollLeft || b.scrollLeft || 0;
    sy = r.scrollTop || b.scrollTop || 0;
    return [sx, sy];
  }
};
const workingArea = document.getElementById("working-area");
export const jsPlumbInstance = jsPlumbBrowserUI.newInstance({
  container: workingArea,
  maxConnections: -1,
  endpoint: {
    type: "Dot",
    options: { radius: 5 },
  },
  dragOptions: {
    containment: "parentEnclosed",
    containmentPadding: 5,
  },
  connector: "Flowchart",
  paintStyle: { strokeWidth: 4, stroke: "#888888" },
  connectionsDetachable: false,
});

// Add connection hover events for deletion
jsPlumbInstance.bind("connection", function (info) {
  const connection = info.connection;
  const connectorElement = connection.connector.canvas;

  if (connectorElement) {
    // Add hover class on mouse enter
    connectorElement.addEventListener("mouseenter", function () {
      connectorElement.classList.add("jtk-hover");
    });

    // Remove hover class on mouse leave
    connectorElement.addEventListener("mouseleave", function () {
      connectorElement.classList.remove("jtk-hover");
    });
  }
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
    } else if (
      (end_uuid === "input" && toEndpoint.connections.length > 0) ||
      (start_uuid === "input" && fromEndpoint.connections.length > 1)
    ) {
      // If it already has a connection, do not establish a new connection
      return false;
    } else {
      jsPlumbInstance.connect({
        uuids: [fromEndpoint.uuid, toEndpoint.uuid],
        paintStyle: { stroke: wireColours[num_wires], strokeWidth: 4 },
      });
      num_wires++;
      num_wires = num_wires % wireColours.length;

      if (start_uuid === "output") {
        const input = gatejs.gates[fromEndpoint.elementId];
        input.isConnected = true;
        gatejs.gates[toEndpoint.elementId].addInput(input);
        input.addOutput(gatejs.gates[toEndpoint.elementId]);
      } else if (end_uuid === "output") {
        const input = gatejs.gates[toEndpoint.elementId];
        input.isConnected = true;
        gatejs.gates[fromEndpoint.elementId].addInput(input);
        input.addOutput(gatejs.gates[fromEndpoint.elementId]);
      }
    }
  });
};

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
    } else if (
      (end_uuid === "input" && toEndpoint.connections.length > 0) ||
      (start_uuid === "input" && fromEndpoint.connections.length > 1)
    ) {
      // If it already has a connection, do not establish a new connection
      return false;
    } else {
      jsPlumbInstance.connect({
        uuids: [fromEndpoint.uuid, toEndpoint.uuid],
        paintStyle: { stroke: wireColours[num_wires], strokeWidth: 4 },
      });
      num_wires++;
      num_wires = num_wires % wireColours.length;
      const start_type = fromEndpoint.elementId.split("-")[0];
      const end_type = toEndpoint.elementId.split("-")[0];
      if (start_type === "Decoder" && end_type === "Display") {
        if (start_uuid === "output") {
          let outputEndpoint = "";
          if (Object.keys(toEndpoint.overlays)[0].includes("a")) {
            outputEndpoint = "a";
          } else if (Object.keys(toEndpoint.overlays)[0].includes("b")) {
            outputEndpoint = "b";
          } else if (Object.keys(toEndpoint.overlays)[0].includes("c")) {
            outputEndpoint = "c";
          } else if (Object.keys(toEndpoint.overlays)[0].includes("d")) {
            outputEndpoint = "d";
          } else if (Object.keys(toEndpoint.overlays)[0].includes("e")) {
            outputEndpoint = "e";
          } else if (Object.keys(toEndpoint.overlays)[0].includes("f")) {
            outputEndpoint = "f";
          } else if (Object.keys(toEndpoint.overlays)[0].includes("g")) {
            outputEndpoint = "g";
          }

          if (Object.keys(fromEndpoint.overlays)[0].includes("a")) {
            decoderjs.decoder.seta(outputEndpoint);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("b")) {
            decoderjs.decoder.setb(outputEndpoint);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("c")) {
            decoderjs.decoder.setc(outputEndpoint);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("d")) {
            decoderjs.decoder.setd(outputEndpoint);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("e")) {
            decoderjs.decoder.sete(outputEndpoint);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("f")) {
            decoderjs.decoder.setf(outputEndpoint);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("g")) {
            decoderjs.decoder.setg(outputEndpoint);
          }
        }
      }
      if (start_type === "Display" && end_type === "Decoder") {
        if (end_uuid === "output") {
          let outputEndpoint = "";
          if (Object.keys(fromEndpoint.overlays)[0].includes("a")) {
            outputEndpoint = "a";
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("b")) {
            outputEndpoint = "b";
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("c")) {
            outputEndpoint = "c";
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("d")) {
            outputEndpoint = "d";
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("e")) {
            outputEndpoint = "e";
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("f")) {
            outputEndpoint = "f";
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("g")) {
            outputEndpoint = "g";
          }

          if (Object.keys(toEndpoint.overlays)[0].includes("a")) {
            decoderjs.decoder.seta(outputEndpoint);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("b")) {
            decoderjs.decoder.setb(outputEndpoint);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("c")) {
            decoderjs.decoder.setc(outputEndpoint);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("d")) {
            decoderjs.decoder.setd(outputEndpoint);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("e")) {
            decoderjs.decoder.sete(outputEndpoint);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("f")) {
            decoderjs.decoder.setf(outputEndpoint);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("g")) {
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
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("B")) {
            decoderjs.decoder.setB(input);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("C")) {
            decoderjs.decoder.setC(input);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("D")) {
            decoderjs.decoder.setD(input);
          }
        }
      } else if (start_type === "Input" && end_type === "Decoder") {
        if (start_uuid === "output") {
          const input = gatejs.gates[fromEndpoint.elementId];
          input.setConnected(true);
          if (Object.keys(toEndpoint.overlays)[0].includes("A")) {
            decoderjs.decoder.setA(input);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("B")) {
            decoderjs.decoder.setB(input);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("C")) {
            decoderjs.decoder.setC(input);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("D")) {
            decoderjs.decoder.setD(input);
          }
        }
      } else if (start_type === "Display" && end_type === "Input") {
        if (end_uuid === "output") {
          const input = gatejs.gates[toEndpoint.elementId];
          input.setConnected(true);
          if (Object.keys(fromEndpoint.overlays)[0].includes("a")) {
            displayjs.display.setInput("a", input.output);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("b")) {
            displayjs.display.setInput("b", input.output);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("c")) {
            displayjs.display.setInput("c", input.output);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("d")) {
            displayjs.display.setInput("d", input.output);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("e")) {
            displayjs.display.setInput("e", input.output);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("f")) {
            displayjs.display.setInput("f", input.output);
          } else if (Object.keys(fromEndpoint.overlays)[0].includes("g")) {
            displayjs.display.setInput("g", input.output);
          }
        }
      } else if (start_type === "Input" && end_type === "Display") {
        if (start_uuid === "output") {
          const input = gatejs.gates[fromEndpoint.elementId];
          input.setConnected(true);
          if (Object.keys(toEndpoint.overlays)[0].includes("a")) {
            displayjs.display.setInput("a", input.output);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("b")) {
            displayjs.display.setInput("b", input.output);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("c")) {
            displayjs.display.setInput("c", input.output);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("d")) {
            displayjs.display.setInput("d", input.output);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("e")) {
            displayjs.display.setInput("e", input.output);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("f")) {
            displayjs.display.setInput("f", input.output);
          } else if (Object.keys(toEndpoint.overlays)[0].includes("g")) {
            displayjs.display.setInput("g", input.output);
          }
        }
      }
    }
  });
};

export const unbindEvent = () => {
  jsPlumbInstance.unbind("beforeDrop");
};

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
  } else if (gateType === "Decoder") {
    // a
    gate.addOutputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [1, 0.125, 1, 0, 7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "output:0:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "a", id: "a", location: [-0.7, 0.4] },
          },
        ],
      })
    );
    // b
    gate.addOutputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [1, 0.25, 1, 0, 7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "output:1:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "b", id: "b", location: [-0.7, 0.4] },
          },
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
          {
            type: "Label",
            options: { label: "c", id: "c", location: [-0.7, 0.4] },
          },
        ],
      })
    );
    // d
    gate.addOutputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [1, 0.5, 1, 0, 7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "output:3:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "d", id: "d", location: [-0.7, 0.4] },
          },
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
          {
            type: "Label",
            options: { label: "e", id: "e", location: [-0.7, 0.4] },
          },
        ],
      })
    );
    // f
    gate.addOutputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [1, 0.75, 1, 0, 7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "output:5:" + id,
        overlays: [
          {
            type: "Label",
            options: { label: "f", id: "f", location: [-0.7, 0.4] },
          },
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
          {
            type: "Label",
            options: { label: "g", id: "g", location: [-0.7, 0.4] },
          },
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
          {
            type: "Label",
            options: { label: "A", id: "A", location: [1.8, 0.4] },
          },
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
          {
            type: "Label",
            options: { label: "B", id: "B", location: [1.8, 0.4] },
          },
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
          {
            type: "Label",
            options: { label: "C", id: "C", location: [1.8, 0.4] },
          },
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
          {
            type: "Label",
            options: { label: "D", id: "D", location: [1.8, 0.4] },
          },
        ],
      })
    );
  } else if (gateType === "Display") {
    // a
    gate.addInputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [0, 0.125, -1, 0, -7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "input:0:" + id,
        overlays: [
          {
            type: "Label",
            options: {
              label: "a",
              id: "a",
              location: [2, 0.4],
              cssClass: "label-display",
            },
          },
        ],
      })
    );
    // b
    gate.addInputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [0, 0.25, -1, 0, -7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "input:1:" + id,
        overlays: [
          {
            type: "Label",
            options: {
              label: "b",
              id: "b",
              location: [2, 0.4],
              cssClass: "label-display",
            },
          },
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
          {
            type: "Label",
            options: {
              label: "c",
              id: "c",
              location: [2, 0.4],
              cssClass: "label-display",
            },
          },
        ],
      })
    );
    // d
    gate.addInputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [0, 0.5, -1, 0, -7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "input:3:" + id,
        overlays: [
          {
            type: "Label",
            options: {
              label: "d",
              id: "d",
              location: [2, 0.4],
              cssClass: "label-display",
            },
          },
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
          {
            type: "Label",
            options: {
              label: "e",
              id: "e",
              location: [2, 0.4],
              cssClass: "label-display",
            },
          },
        ],
      })
    );
    // f
    gate.addInputPoints(
      jsPlumbInstance.addEndpoint(element, {
        anchor: [0, 0.75, -1, 0, -7, 0],
        source: true,
        target: true,
        connectionsDetachable: false,
        uuid: "input:5:" + id,
        overlays: [
          {
            type: "Label",
            options: {
              label: "f",
              id: "f",
              location: [2, 0.4],
              cssClass: "label-display",
            },
          },
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
          {
            type: "Label",
            options: {
              label: "g",
              id: "g",
              location: [2, 0.4],
              cssClass: "label-display",
            },
          },
        ],
      })
    );
  }
}
export function initDecoder() {
  const ids = [
    "Input-0",
    "Input-1",
    "Input-2",
    "Input-3",
    "Output-4",
    "Output-5",
    "Output-6",
    "Output-7",
    "Output-8",
    "Output-9",
    "Output-10",
  ];
  const types = [
    "Input",
    "Input",
    "Input",
    "Input",
    "Output",
    "Output",
    "Output",
    "Output",
    "Output",
    "Output",
    "Output",
  ];
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
    { x: 820, y: 700 },
  ];
  for (let i = 0; i < ids.length; i++) {
    let gate = new gatejs.Gate(types[i]);
    gate.setId(ids[i]);
    gate.setName(names[i]);
    const component = gate.generateComponent();
    const parent = document.getElementById("working-area");
    parent.insertAdjacentHTML("beforeend", component);
    gate.registerComponent("working-area", positions[i].x, positions[i].y);
  }
}

export function init7Segment() {
  const ids = ["Input-0", "Input-1", "Input-2", "Input-3"]; // [A,B,C,D]
  const types = ["Input", "Input", "Input", "Input"];
  const names = ["A", "B", "C", "D"];
  const positions = [
    { x: 10, y: 130 },
    { x: 10, y: 290 },
    { x: 10, y: 450 },
    { x: 10, y: 610 },
  ];
  for (let i = 0; i < ids.length; i++) {
    let gate = new gatejs.Gate(types[i]);
    gate.setId(ids[i]);
    gate.setName(names[i]);
    const component = gate.generateComponent();
    const parent = document.getElementById("working-area");
    parent.insertAdjacentHTML("beforeend", component);
    gate.registerComponent("working-area", positions[i].x, positions[i].y);
  }
  decoderjs.addDecoder("working-area", 180, 175);
  displayjs.createDisplay("working-area", 650, 100);
}

export function updateInstructions(currentTab) {
  const taskDescription = document.getElementById("task-description");
  const instructionList = document.getElementById("instruction-list");
  const componentsColumn = document.getElementById("components-column");
  const circuitColumn = document.getElementById("circuit-column");
  const toolbar = document.getElementById("toolbar");

  if (currentTab === "task1") {
    // Decoder task - show components and use original instructions
    taskDescription.innerHTML =
      "Implement a BCD to 7-segment decoder using logic gates";

    // Show components section with content
    componentsColumn.style.display = "block";
    componentsColumn.className =
      "column is-2-desktop is-12-tablet is-12-mobile";
    circuitColumn.className = "column is-7-desktop is-12-tablet is-12-mobile";

    // Restore component buttons
    if (toolbar) {
      toolbar.innerHTML = `
        <div class="component-button and" onclick="addGate(event)">AND</div>
        <div class="component-button or" onclick="addGate(event)">OR</div>
        <div class="component-button not" onclick="addGate(event)">NOT</div>
        <div class="component-button nand" onclick="addGate(event)">NAND</div>
        <div class="component-button nor" onclick="addGate(event)">NOR</div>
        <div class="component-button xor" onclick="addGate(event)">XOR</div>
        <div class="component-button xnor" onclick="addGate(event)">XNOR</div>
      `;
    }

    instructionList.innerHTML = `
            <li>Click on components on the left side to add them to the circuit board.</li>
            <li>Drag and drop components to move them around, connect them using wires by dragging your cursor from one endpoint to another.</li>
            <li>You can delete components by right clicking on them and selecting the delete option.</li>
            <li>You can delete wire connections by right clicking on them and selecting the delete option.</li>
            <li>You can set the input bits, which are by default 1, to any values of your choice for testing, by double-clicking on them.</li>
            <li>Click on the "Simulate" button after setting the input bits as per your choice. This will simulate the circuit you built for the input bits set and will change the output bit values accordingly, for you to test your circuit.</li>
            <li>Click on the "Submit" button to submit the circuit once you think you have built the required circuit.</li>
            <li>Clicking on 'Submit' will display a 'Success' or 'Failure' message in the Observations Section according to the correctness of your circuit. It will also display a Truth Table verifying your circuit for different input values.</li>
        `;
  } else if (currentTab === "task2") {
    // 7-segment Display task - keep components section but empty, hide on small screens
    taskDescription.innerHTML =
      "Connect the BCD decoder to the 7-segment display";

    // Keep components section visible on desktop but empty, hide on mobile/tablet
    componentsColumn.style.display = "block";
    componentsColumn.className =
      "column is-2-desktop is-hidden-tablet is-hidden-mobile";
    circuitColumn.className = "column is-7-desktop is-12-tablet is-12-mobile";

    // Clear component buttons for 7-segment task
    if (toolbar) {
      toolbar.innerHTML = "";
    }

    instructionList.innerHTML = `
            <li>The circuit board contains pre-loaded components: Input bits (A, B, C, D), BCD to 7-segment Decoder, and 7-segment Display.</li>
            <li>Connect the input bits A, B, C, D to the corresponding inputs of the BCD decoder by dragging your cursor from one endpoint to another.</li>
            <li>Connect the decoder outputs (a, b, c, d, e, f, g) to the corresponding inputs of the 7-segment display.</li>
            <li>You can delete wire connections by right clicking on them and selecting the delete option.</li>
            <li>You can set the input bits, which are by default 1, to any values of your choice for testing, by double-clicking on them.</li>
            <li>Click on the "Simulate" button after setting the input bits as per your choice. This will simulate the circuit and display the corresponding digit on the 7-segment display.</li>
            <li>Click on the "Submit" button to submit the circuit once you think you have made all the required connections.</li>
            <li>Clicking on 'Submit' will display a 'Success' or 'Failure' message in the Observations Section according to the correctness of your connections. It will also show how the display responds to different BCD inputs.</li>
        `;
  }
}

// Make the function available globally for the changeTabs function
window.updateInstructions = updateInstructions;

export function refreshWorkingArea() {
  jsPlumbInstance.reset();
  window.numComponents = 0;

  // Clear DOM elements from working area
  const workingArea = document.getElementById("working-area");
  if (workingArea) {
    workingArea.innerHTML = "";
  }

  gatejs.clearGates();
  decoderjs.clearDecoder();
  displayjs.clearDisplay();
}
refresh.addEventListener("click", function (event) {
  jsPlumbInstance.reset();
  window.numComponents = 0;

  // Clear DOM elements from working area
  const workingArea = document.getElementById("working-area");
  if (workingArea) {
    workingArea.innerHTML = "";
  }

  gatejs.clearGates();
  decoderjs.clearDecoder();
  displayjs.clearDisplay();
  if (window.currentTab === "task1") {
    initDecoder();
  } else if (window.currentTab === "task2") {
    init7Segment();
  }

  // Update instructions based on current tab
  updateInstructions(window.currentTab);
  console.log(window.currentTab);
});

// Context menu functionality for wire deletion
const menu = document.querySelector(".menu");
const menuOption = document.querySelector(".menu-option");
let menuVisible = false;

const toggleMenu = (command) => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = command === "show";
};

export const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", () => {
  if (menuVisible) toggleMenu("hide");
  window.selectedComponent = null;
  window.componentType = null;
});

document.addEventListener("contextmenu", function (event) {
  // Only show custom context menu for specific elements
  const target = event.target;
  const isComponent =
    target.closest(".drag-drop") ||
    target.closest(".logic-gate") ||
    target.closest(".high") ||
    target.closest(".low") ||
    target.closest(".output") ||
    target.closest(".decoder") ||
    target.closest(".display");
  const isConnection = target.closest(".jtk-connector");
  const isWorkingArea =
    target.closest("#working-area") && !isComponent && !isConnection;

  // Only prevent default context menu for our interactive elements
  if (isComponent || isConnection || isWorkingArea) {
    event.preventDefault(); // Prevent the default context menu from appearing
    menu.style.display = "block";
    menu.style.left = `${event.clientX}px`;
    menu.style.top = `${event.clientY}px`;

    // Store the target element and check if it's a connection
    window.contextMenuTarget = event.target;
    window.isConnectionContext =
      event.target.closest(".jtk-connector") !== null;

    toggleMenu("show");
  }
  // If it's not one of our elements, let the browser handle the context menu normally
});

// Menu option click handler
menuOption.addEventListener("click", (e) => {
  if (e.target.innerHTML === "Delete") {
    if (window.componentType === "gate") {
      console.log("Deleting gate component");
      gatejs.deleteElement(window.selectedComponent);
    } else if (window.componentType === "decoder") {
      console.log("Deleting decoder component");
      decoderjs.clearDecoder();
    } else if (window.componentType === "display") {
      console.log("Deleting display component");
      displayjs.clearDisplay();
    } else {
      console.log("Deleting wire connections");
      console.log(
        "Available JSPlumb methods:",
        Object.getOwnPropertyNames(jsPlumbInstance)
      );

      let connectionDeleted = false;

      // Try to delete connection that was right-clicked
      if (window.isConnectionContext && window.contextMenuTarget) {
        const connectorElement =
          window.contextMenuTarget.closest(".jtk-connector");
        if (connectorElement) {
          console.log(
            "Connector element properties:",
            Object.keys(connectorElement)
          );

          // Try to find the connection by its DOM element
          try {
            // Method 1: Try JSPlumb's select and check entries
            if (jsPlumbInstance.select) {
              const allConnections = jsPlumbInstance.select();

              if (allConnections.entries && allConnections.entries.length > 0) {
                for (let i = 0; i < allConnections.entries.length; i++) {
                  const connection = allConnections.entries[i];
                  if (
                    connection.connector &&
                    connection.connector.canvas === connectorElement
                  ) {
                    console.log("Found matching connection, deleting...");
                    jsPlumbInstance.deleteConnection(connection);
                    connectionDeleted = true;
                    console.log(
                      "Deleting specific connection via JSPlumb deleteConnection"
                    );
                    break;
                  }
                }
              }
            }

            // Method 2: Use the connections property directly
            if (!connectionDeleted && jsPlumbInstance.connections) {
              for (let i = 0; i < jsPlumbInstance.connections.length; i++) {
                const connection = jsPlumbInstance.connections[i];
                if (
                  connection.connector &&
                  connection.connector.canvas === connectorElement
                ) {
                  console.log(
                    "Found matching connection via connections array, deleting..."
                  );
                  jsPlumbInstance.deleteConnection(connection);
                  connectionDeleted = true;
                  console.log(
                    "Deleting specific connection via connections array"
                  );
                  break;
                }
              }
            }

            // Method 3: Remove the DOM element directly (fallback)
            if (!connectionDeleted && connectorElement.parentNode) {
              connectorElement.parentNode.removeChild(connectorElement);
              connectionDeleted = true;
              console.log(
                "Deleting specific connection via DOM removal (fallback)"
              );
            }
          } catch (error) {
            console.log("Error deleting specific connection:", error);
          }
        }
      }

      // Fallback: delete hovered connections
      if (!connectionDeleted) {
        const elementsToDelete = document.querySelectorAll(
          ".jtk-connector.jtk-hover"
        );
        console.log("Elements found for deletion:", elementsToDelete);

        if (elementsToDelete.length > 0) {
          elementsToDelete.forEach(function (connectorElement) {
            try {
              // Method 1: Try JSPlumb's select and check entries
              if (jsPlumbInstance.select && !connectionDeleted) {
                const allConnections = jsPlumbInstance.select();
                if (
                  allConnections.entries &&
                  allConnections.entries.length > 0
                ) {
                  for (let i = 0; i < allConnections.entries.length; i++) {
                    const connection = allConnections.entries[i];
                    if (
                      connection.connector &&
                      connection.connector.canvas === connectorElement
                    ) {
                      jsPlumbInstance.deleteConnection(connection);
                      connectionDeleted = true;
                      console.log(
                        "Deleting hovered connection via JSPlumb deleteConnection"
                      );
                      break;
                    }
                  }
                }
              }

              // Method 2: Use the connections property directly
              if (!connectionDeleted && jsPlumbInstance.connections) {
                for (let i = 0; i < jsPlumbInstance.connections.length; i++) {
                  const connection = jsPlumbInstance.connections[i];
                  if (
                    connection.connector &&
                    connection.connector.canvas === connectorElement
                  ) {
                    jsPlumbInstance.deleteConnection(connection);
                    connectionDeleted = true;
                    console.log(
                      "Deleting hovered connection via connections array"
                    );
                    break;
                  }
                }
              }

              // Method 3: Fallback to DOM removal
              if (!connectionDeleted && connectorElement.parentNode) {
                connectorElement.parentNode.removeChild(connectorElement);
                console.log(
                  "Deleting hovered connection via DOM removal (fallback)"
                );
                connectionDeleted = true;
              }
            } catch (error) {
              console.log("Error deleting hovered connection:", error);
            }
          });
        }
      }

      if (!connectionDeleted) {
        console.log("No connections found to delete");
      }
    }
  }
  // Reset context variables
  window.contextMenuTarget = null;
  window.isConnectionContext = false;
  toggleMenu("hide"); // Hide menu after selection
});

// Global function for tab switching
window.changeTabs = function (event) {
  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".v-tabs li");
  tabs.forEach((tab) => tab.classList.remove("is-active"));

  // Add active class to clicked tab
  event.target.closest("li").classList.add("is-active");

  // Update current tab
  const tabId = event.target.closest("li").id;
  window.currentTab = tabId;

  // Clear observations when switching tasks
  const result = document.getElementById("result");
  if (result) result.innerHTML = "";

  const tableBody = document.getElementById("table-body");
  if (tableBody) tableBody.innerHTML = "";

  const tableHead = document.getElementById("table-head");
  if (tableHead) tableHead.innerHTML = "";

  // Clear and reinitialize workspace
  unbindEvent(); // Unbind existing events
  refreshWorkingArea();

  if (tabId === "task1") {
    connectGate();
    initDecoder();
  } else if (tabId === "task2") {
    connectDecoderDisplay();
    init7Segment();
  }

  // Update instructions based on current tab
  updateInstructions(tabId);
};

window.currentTab = "task1";
connectGate();
refreshWorkingArea();
initDecoder();
updateInstructions("task1");
