import { printErrors } from "./gate.js";
import { registerGate } from "./main.js";
'use strict';
export let display = null;

export function clearDisplay() {
    display = null;
}

class Display {
    constructor() {
        this.id = "Display-" + window.numComponents++;
        this.inputs = {
            a: null,
            b: null,
            c: null,
            d: null,
            e: null,
            f: null,
            g: null
        }
        this.inputPoints = [];
    }

    generateComponent() {
        const component = `<div id=${this.id} class="display"> 
                            <div class="display-container display-size-12 display-no"> 
                                <div id=${this.id}-segment-a class="segment-x segment-a segment-off">
                                    <span class="segment-border"></span>
                                </div> 
                                <div id= ${this.id}-segment-b class="segment-y segment-b segment-off">
                                    <span class="segment-border"></span>
                                </div> 
                                <div id=${this.id}-segment-c +' class="segment-y segment-c segment-off">
                                    <span class="segment-border"></span>
                                </div> 
                                <div id= ${this.id}-segment-d class="segment-x segment-d segment-off">
                                    <span class="segment-border"></span>
                                </div> 
                                <div id= ${this.id}-segment-e class="segment-y segment-e segment-off">
                                    <span class="segment-border"></span>
                                </div> 
                                <div id= ${this.id}-segment-f class="segment-y segment-f segment-off">
                                    <span class="segment-border"></span>
                                </div> 
                                <div id= ${this.id}-segment-g class="segment-x segment-g segment-off">
                                    <span class="segment-border"></span>
                                </div>
                            </div>
                           </div>`;
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

    setInput(input, value) {
        this.inputs[input] = value;
    }

    addInputPoints(input) {
        this.inputPoints.push(input);
    }

    display() {
        let a = this.inputs.a;
        let b = this.inputs.b;
        let c = this.inputs.c;
        let d = this.inputs.d;
        let e = this.inputs.e;
        let f = this.inputs.f;
        let g = this.inputs.g;

        const el = document.getElementById(this.id);
        if(a == null || b==null || c==null || d==null || e==null || f==null || g==null) {
            printErrors("Input points of the Display are not connected properly\n",el);
            return;
        }

        const segments = {
            "a": a,
            "b": b,
            "c": c,
            "d": d,
            "e": e,
            "f": f,
            "g": g 
        }

        for(let segment in segments) {
            if(segments[segment])
            {
                switchOnSegment(this.id, segment);
            }
            else {
                switchOffSegment(this.id, segment);
            }
        }
    }

    clearInputs() {
        this.inputs.a = null;
        this.inputs.b = null;
        this.inputs.c = null;
        this.inputs.d = null;
        this.inputs.e = null;
        this.inputs.f = null;
        this.inputs.g = null;
    }
}

export function createDisplay(workingArea, x = 0, y = 0) {
    display = new Display();
    let component = display.generateComponent();
    const parent = document.getElementById(workingArea);
    parent.insertAdjacentHTML('beforeend', component);
    display.registerComponent(workingArea, x, y);
}


function switchOnSegment(id, segment) {
    document.getElementById(`${id}-segment-${segment}`).classList.replace("segment-off", "segment-on");
}

function switchOffSegment(id, segment) {
    document.getElementById(`${id}-segment-${segment}`).classList.replace("segment-on", "segment-off");
}
