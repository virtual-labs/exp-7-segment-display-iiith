import { gates } from './gate.js';
import { registerGate } from "./main.js";
import {display} from './display.js';

export let decoder = null;

export function clearDecoder() {
    decoder = null;
}

class Decoder {
    constructor() {
        this.id = "Decoder-" + window.numComponents++;
        this.A = null;
        this.B = null;
        this.C = null;
        this.D = null;
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
        let component = '';
        component += '<div class="drag-drop Decoder" id=' + this.id + '></div>';
        return component;
    }

    registerComponent(workingArea,x=0,y=0) {
        const width = document.getElementById(workingArea).offsetWidth;
        let scale = 900;
        x = (x / scale) * width;
        document.getElementById(this.id).style.left = x + "px";
        document.getElementById(this.id).style.top = y + "px";
        registerGate(this.id, this);
    }

    setA(A) {
        this.A = A;
    }
    setB(B) {
        this.B = B;
    }
    setC(C) {
        this.C = C;
    }
    setD(D) {
        this.D = D;
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
        this.outputs.a = this.A.output || this.C.output || (this.D.output && this.B.output) || (!this.D.output && !this.B.output) ? 1 : 0;
        this.outputs.b = !this.B.output || (!this.C.output && !this.D.output) || (this.C.output && this.D.output) ? 1 : 0;
        this.outputs.c = this.B.output || !this.C.output || this.D.output ? 1 : 0;
        this.outputs.d = this.A.output || (!this.B.output && !this.D.output) || (!this.B.output && this.C.output) || (this.C.output && !this.D.output) || (this.B.output && !this.C.output && this.D.output) ? 1 : 0;
        this.outputs.e = (!this.B.output && !this.D.output) || (this.C.output && !this.D.output) ? 1 : 0;
        this.outputs.f = this.A.output || (this.B.output && !this.C.output) || (this.B.output && !this.D.output) || (!this.C.output && !this.D.output) ? 1 : 0;
        this.outputs.g = this.A.output || (this.B.output && !this.C.output) || (this.B.output && !this.D.output) || (!this.B.output && this.C.output) ? 1 : 0;
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
    decoder.registerComponent(workingArea,x,y);
}

function getResultDecoder() {
    for(let output in decoder.outputs) {
        if(decoder.outputs[output] == null) {
            decoder.generateOutput();
            break;
        }
    }
}

function checkConnections() {

    let flag = 0;
    if(decoder.A == null || decoder.B == null || decoder.C == null || decoder.D == null) {
        flag = 1;
    }
    if(decoder.a == null || decoder.b == null || decoder.c == null || decoder.d == null || decoder.e == null || decoder.f == null || decoder.g == null) {
        flag = 1;
    }
    for (let gateId in gates) {
        const gate = gates[gateId];
        if (gate.isInput == true) {
            if (gate.isConnected == false) {
                flag = 1;
                break;
            }
        }
    }

    if (flag == 0) {
        return true;
    }
    else {
        alert("Connections are not correct");
        return false;
    }


}

export function simulateDecoder() {
    if(!checkConnections()) {
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
