import { gates } from './gate.js';
import { registerGate } from "./main.js";
import { display } from './display.js';

'use strict';
export let decoder = null;

export function clearDecoder() {
    decoder = null;
}

class Decoder {
    constructor() {
        this.id = "Decoder-" + window.numComponents++;
        this.aIn = null;
        this.bIn = null;
        this.cIn = null;
        this.dIn = null;
        this.a = null;
        this.b = null;
        this.c = null;
        this.d = null;
        this.e = null;
        this.f = null;
        this.g = null;
        this.outputs = {
            a: null,
            b: null,
            c: null,
            d: null,
            e: null,
            f: null,
            g: null
        }
        this.inputPoints = [];
        this.outputPoints = [];
    }

    generateComponent() {
        const component = `<div class="drag-drop decoder" id=${this.id}></div>`;
        return component;
    }

    registerComponent(workingArea, x = 0, y = 0) {
        const width = document.getElementById(workingArea).offsetWidth;
        const height = document.getElementById(workingArea).offsetHeight;
        let scale = 900;
        let yScale = 800;
        x = (x / scale) * width;
        y = (y / yScale) * height;

        const el = document.getElementById(this.id);
        el.style.left = x + "px";
        el.style.top = y + "px";
        registerGate(this.id, this);
    }

    setA(aIn) {
        this.aIn = aIn;
    }
    setB(bIn) {
        this.bIn = bIn;
    }
    setC(cIn) {
        this.cIn = cIn;
    }
    setD(dIn) {
        this.dIn = dIn;
    }
    seta(a) {
        this.a = a;
    }
    setb(b) {
        this.b = b;
    }
    setc(c) {
        this.c = c;
    }
    setd(d) {
        this.d = d;
    }
    sete(e) {
        this.e = e;
    }
    setf(f) {
        this.f = f;
    }
    setg(g) {
        this.g = g;
    }

    addInputPoints(input) {
        this.inputPoints.push(input);
    }

    addOutputPoints(output) {
        this.outputPoints.push(output);
    }

    generateOutput() {

        // Here we generate the output of the decoder based on the inputs.
        this.outputs.a = this.aIn.output || this.cIn.output || (this.dIn.output && this.bIn.output) || (!this.dIn.output && !this.bIn.output) ? 1 : 0;
        this.outputs.b = !this.bIn.output || (!this.cIn.output && !this.dIn.output) || (this.cIn.output && this.dIn.output) ? 1 : 0;
        this.outputs.c = this.bIn.output || !this.cIn.output || this.dIn.output ? 1 : 0;
        this.outputs.d = this.aIn.output || (!this.bIn.output && !this.dIn.output) || (!this.bIn.output && this.cIn.output) || (this.cIn.output && !this.dIn.output) || (this.bIn.output && !this.cIn.output && this.dIn.output) ? 1 : 0;
        this.outputs.e = (!this.bIn.output && !this.dIn.output) || (this.cIn.output && !this.dIn.output) ? 1 : 0;
        this.outputs.f = this.aIn.output || (this.bIn.output && !this.cIn.output) || (this.bIn.output && !this.dIn.output) || (!this.cIn.output && !this.dIn.output) ? 1 : 0;
        this.outputs.g = this.aIn.output || (this.bIn.output && !this.cIn.output) || (this.bIn.output && !this.dIn.output) || (!this.bIn.output && this.cIn.output) ? 1 : 0;
    }

    clearOutputs() {
        this.outputs.a = null;
        this.outputs.b = null;
        this.outputs.c = null;
        this.outputs.d = null;
        this.outputs.e = null;
        this.outputs.f = null;
        this.outputs.g = null;
    }


}


export function addDecoder(workingArea, x = 0, y = 0) {
    decoder = new Decoder();
    let component = decoder.generateComponent();
    const parent = document.getElementById(workingArea);
    parent.insertAdjacentHTML('beforeend', component);
    decoder.registerComponent(workingArea, x, y);
}

function getResultDecoder() {
    for (let output in decoder.outputs) {
        if (decoder.outputs[output] == null) {
            decoder.generateOutput();
            break;
        }
    }
}

function checkConnections() {

    let correctConnection = true;
    if (decoder.aIn == null || decoder.bIn == null || decoder.cIn == null || decoder.dIn == null) {
        correctConnection = false;
    }
    if (decoder.a == null || decoder.b == null || decoder.c == null || decoder.d == null || decoder.e == null || decoder.f == null || decoder.g == null) {
        correctConnection = false;
    }
    for (let gateId in gates) {
        const gate = gates[gateId];
        if (gate.isInput) {
            if (!gate.isConnected) {
                correctConnection = false;
                break;
            }
        }
    }

    if (correctConnection) {
        return true;
    }
    else {
        alert("Connections are not correct");
        return false;
    }


}

export function simulateDecoder() {
    if (!checkConnections()) {
        return;
    }


    decoder.clearOutputs();
    display.clearInputs();

    // generate and send output to display
    getResultDecoder();

    display.setInput(decoder.a, decoder.outputs.a);
    display.setInput(decoder.b, decoder.outputs.b);
    display.setInput(decoder.c, decoder.outputs.c);
    display.setInput(decoder.d, decoder.outputs.d);
    display.setInput(decoder.e, decoder.outputs.e);
    display.setInput(decoder.f, decoder.outputs.f);
    display.setInput(decoder.g, decoder.outputs.g);

    // simulate display
    display.display();
}


export function testSimulationDecoder(decoder, display) {
    decoder.clearOutputs();
    display.clearInputs();

    // generate and send output to display
    getResultDecoder();

    display.setInput(decoder.a, decoder.outputs.a);
    display.setInput(decoder.b, decoder.outputs.b);
    display.setInput(decoder.c, decoder.outputs.c);
    display.setInput(decoder.d, decoder.outputs.d);
    display.setInput(decoder.e, decoder.outputs.e);
    display.setInput(decoder.f, decoder.outputs.f);
    display.setInput(decoder.g, decoder.outputs.g);

    let a = display.inputs.a;
    let b = display.inputs.b;
    let c = display.inputs.c;
    let d = display.inputs.d;
    let e = display.inputs.e;
    let f = display.inputs.f;
    let g = display.inputs.g;

    return {
        a: a,
        b: b,
        c: c,
        d: d,
        e: e,
        f: f,
        g: g
    }
}