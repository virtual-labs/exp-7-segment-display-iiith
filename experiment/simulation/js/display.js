import { registerGate } from "./main.js";

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
        let component = '';
        component += '<div id=' + this.id + ' class="display"> <div class="display-container display-size-12 display-no"> <div id='+ this.id + "-segment-a" +' class="segment-x segment-a segment-off"><span class="segment-border"></span></div> <div id='+ this.id + "-segment-b" +' class="segment-y segment-b segment-off"><span class="segment-border"></span></div> <div id='+ this.id + "-segment-c" +' class="segment-y segment-c segment-off"><span class="segment-border"></span></div> <div id='+ this.id + "-segment-d" +' class="segment-x segment-d segment-off"><span class="segment-border"></span></div> <div id='+ this.id + "-segment-e" +' class="segment-y segment-e segment-off"><span class="segment-border"></span></div> <div id='+ this.id + "-segment-f" +' class="segment-y segment-f segment-off"><span class="segment-border"></span></div> <div id='+ this.id + "-segment-g" +' class="segment-x segment-g segment-off"><span class="segment-border"></span></div> </div></div>';
        return component;
    }

    registerComponent(workingArea, x = 0, y = 0) {
        const width = document.getElementById(workingArea).offsetWidth;
        let scale = 900;
        x = (x / scale) * width;
        document.getElementById(this.id).style.left = x + "px";
        document.getElementById(this.id).style.top = y + "px";
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


        if(a == null || b==null || c==null || d==null || e==null || f==null || g==null) {
            alert("Invalid connections");
            return;
        }

        if(a) {
            document.getElementById(this.id + "-segment-a").classList.remove("segment-off");
            document.getElementById(this.id + "-segment-a").classList.add("segment-on");
        }
        else {
            document.getElementById(this.id + "-segment-a").classList.remove("segment-on");
            document.getElementById(this.id + "-segment-a").classList.add("segment-off");
        }

        if(b) {
            document.getElementById(this.id + "-segment-b").classList.remove("segment-off");
            document.getElementById(this.id + "-segment-b").classList.add("segment-on");
        }
        else {
            document.getElementById(this.id + "-segment-b").classList.remove("segment-on");
            document.getElementById(this.id + "-segment-b").classList.add("segment-off");
        }

        if(c) {
            document.getElementById(this.id + "-segment-c").classList.remove("segment-off");
            document.getElementById(this.id + "-segment-c").classList.add("segment-on");
        }
        else {
            document.getElementById(this.id + "-segment-c").classList.remove("segment-on");
            document.getElementById(this.id + "-segment-c").classList.add("segment-off");
        }

        if(d) {
            document.getElementById(this.id + "-segment-d").classList.remove("segment-off");
            document.getElementById(this.id + "-segment-d").classList.add("segment-on");
        }
        else {
            document.getElementById(this.id + "-segment-d").classList.remove("segment-on");
            document.getElementById(this.id + "-segment-d").classList.add("segment-off");
        }

        if(e) {
            document.getElementById(this.id + "-segment-e").classList.remove("segment-off");
            document.getElementById(this.id + "-segment-e").classList.add("segment-on");
        }
        else {
            document.getElementById(this.id + "-segment-e").classList.remove("segment-on");
            document.getElementById(this.id + "-segment-e").classList.add("segment-off");
        }

        if(f) {
            document.getElementById(this.id + "-segment-f").classList.remove("segment-off");
            document.getElementById(this.id + "-segment-f").classList.add("segment-on");
        }
        else {
            document.getElementById(this.id + "-segment-f").classList.remove("segment-on");
            document.getElementById(this.id + "-segment-f").classList.add("segment-off");
        }

        if(g) {
            document.getElementById(this.id + "-segment-g").classList.remove("segment-off");
            document.getElementById(this.id + "-segment-g").classList.add("segment-on");
        }
        else {
            document.getElementById(this.id + "-segment-g").classList.remove("segment-on");
            document.getElementById(this.id + "-segment-g").classList.add("segment-off");
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
