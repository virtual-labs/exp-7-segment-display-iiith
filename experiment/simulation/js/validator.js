import { gates, testSimulation } from './gate.js';
import { decoder, testSimulationDecoder } from './decoder.js';
import { display } from './display.js';

"use strict";

// Helper functions
export function computeXor(a, b) {
    return a != b;
}
export function computeAnd(a, b) {
    return a && b;
}
export function computeOr(a, b) {
    return a || b;
}
export function computeXnor(a, b) {
    return a == b;
}
export function computeNand(a, b) {
    return !(a && b);
}
export function computeNor(a, b) {
    return !(a || b);
}

export function decoderTest(inputA, inputB, inputC, inputD, outputA, outputB, outputC, outputD, outputE, outputF, outputG) {

    let gates_list = gates;


    let input0 = gates_list[inputA];
    let input1 = gates_list[inputB];
    let input2 = gates_list[inputC];
    let input3 = gates_list[inputD];

    let circuitIsCorrect = true;

    let dataTable = ''
    let head = '<tr><th colspan="4">Input</th><th colspan="8">Output</th></tr><tr><th>A</th><th>B</th><th>C</th><th>D</th><th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th><th>g</th></tr>';
    document.getElementById("table-head").innerHTML = head;

    for (let i = 0; i < 16; i++) {
        //convert i to binary
        let binary = i.toString(2).padStart(5, '0');
        binary = binary.split("").reverse().join("");


        input3.setOutput(binary[0] === "1");
        input2.setOutput(binary[1] === "1");
        input1.setOutput(binary[2] === "1");
        input0.setOutput(binary[3] === "1");


        const aIn = input0.output;
        const bIn = input1.output;
        const cIn = input2.output;
        const dIn = input3.output;

        const a = computeOr(aIn, cIn) || computeAnd(dIn,bIn) || computeNor(dIn,bIn) ? 1 : 0;
        const b = !bIn || computeNor(cIn,dIn) || computeAnd(cIn, dIn) ? 1 : 0;
        const c = bIn || !cIn || dIn ? 1 : 0;
        const d = aIn || computeNor(bIn,dIn) || computeAnd(!bIn,cIn) || computeAnd(cIn,!dIn) || (bIn && !cIn && dIn) ? 1 : 0;
        const e = computeNor(bIn,dIn) || computeAnd(cIn,!dIn) ? 1 : 0;
        const f = aIn || computeAnd(bIn,!cIn) || computeAnd(bIn,!dIn) || computeNor(cIn,dIn) ? 1 : 0;
        const g = aIn || computeAnd(bIn,!cIn) || computeAnd(bIn,!dIn) || computeAnd(!bIn,cIn) ? 1 : 0;

        // simulate the circuit
        if(!testSimulation(gates_list)) {
            return;
        }
        const a0 = gates_list[outputA].output ? 1 : 0;
        const b0 = gates_list[outputB].output ? 1 : 0;
        const c0 = gates_list[outputC].output ? 1 : 0;
        const d0 = gates_list[outputD].output ? 1 : 0;
        const e0 = gates_list[outputE].output ? 1 : 0;
        const f0 = gates_list[outputF].output ? 1 : 0;
        const g0 = gates_list[outputG].output ? 1 : 0;

        
        let className = "";
        if (a0 != a || b0 != b || c0 != c || d0 != d || e0 != e || f0 != f || g0 != g) {
            circuitIsCorrect = false;
            className = "failure-table"
        }
        else {
            className = "success-table"
        }
        dataTable += `<tr class="bold-table"><th>${binary[3]}</th><th>${binary[2]}</th><th>${binary[1]}</th><th>${binary[0]}</th><td class="${className}">${a0}</td><td class="${className}">${b0}</td><td class="${className}">${c0}</td><td class="${className}">${d0}</td><td class="${className}">${e0}</td><td class="${className}">${f0}</td><td class="${className}">${g0}</td></tr>`
    }

    const table_elem = document.getElementById('table-body');
    table_elem.insertAdjacentHTML('beforeend', dataTable);

    const result = document.getElementById('result');

    if (circuitIsCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}

export function displayTest(inputA, inputB, inputC, inputD) {
    let decoderElem = decoder;
    let display_elem = display;
    let gates_list = gates;
    let input0 = gates_list[inputA];
    let input1 = gates_list[inputB];
    let input2 = gates_list[inputC];
    let input3 = gates_list[inputD];
    let circuitIsCorrect = true;

    for (let i = 0; i < 16; i++) {
        // covert i to binary
        let binary = i.toString(2).padStart(4, '0');


        input0.setOutput(binary[3] === "1");
        input1.setOutput(binary[2] === "1");
        input2.setOutput(binary[1] === "1");
        input3.setOutput(binary[0] === "1");

        const aIn = input0.output;
        const bIn = input1.output;
        const cIn = input2.output;
        const dIn = input3.output;

        const a = computeOr(aIn, cIn) || computeAnd(dIn,bIn) || computeNor(dIn,bIn) ? 1 : 0;
        const b = !bIn || computeNor(cIn,dIn) || computeAnd(cIn, dIn) ? 1 : 0;
        const c = bIn || !cIn || dIn ? 1 : 0;
        const d = aIn || computeNor(bIn,dIn) || computeAnd(!bIn,cIn) || computeAnd(cIn,!dIn) || (bIn && !cIn && dIn) ? 1 : 0;
        const e = computeNor(bIn,dIn) || computeAnd(cIn,!dIn) ? 1 : 0;
        const f = aIn || computeAnd(bIn,!cIn) || computeAnd(bIn,!dIn) || computeNor(cIn,dIn) ? 1 : 0;
        const g = aIn || computeAnd(bIn,!cIn) || computeAnd(bIn,!dIn) || computeAnd(!bIn,cIn) ? 1 : 0;

        const val = testSimulationDecoder(decoderElem,display_elem);
        if(val===false)
        {
            return;
        }
        const outputs = val;

        if (outputs.a != a || outputs.b != b || outputs.c != c || outputs.d != d || outputs.e != e || outputs.f != f || outputs.g != g) {
            circuitIsCorrect = false;
        }
    }

    const result = document.getElementById('result');

    if (circuitIsCorrect) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}