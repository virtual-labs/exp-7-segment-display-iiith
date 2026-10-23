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

// Segments (a to g) that are ON for each BCD digit on a common-cathode 7-segment display
const DIGIT_SEGMENTS = {
    0: "abcdef",
    1: "bc",
    2: "abdeg",
    3: "abcdg",
    4: "bcfg",
    5: "acdfg",
    6: "acdefg",
    7: "abc",
    8: "abcdefg",
    9: "abcdfg"
};
const SEGMENTS = ["a", "b", "c", "d", "e", "f", "g"];

// Expected values of the segments a to g for a BCD digit (0 to 9)
function expectedSegments(digit) {
    return SEGMENTS.map(segment => DIGIT_SEGMENTS[digit].includes(segment) ? 1 : 0);
}

// Sets the 4 input bits (A is the most significant bit, D the least significant bit) to the given value
function setBcdInputs(value, inputs) {
    inputs[0].setOutput((value & 8) !== 0);
    inputs[1].setOutput((value & 4) !== 0);
    inputs[2].setOutput((value & 2) !== 0);
    inputs[3].setOutput((value & 1) !== 0);
}

// Only the BCD codes 0000 to 1001 are checked: the codes 1010 to 1111 are invalid, so any output is accepted for them
export function decoderTest(inputA, inputB, inputC, inputD, outputA, outputB, outputC, outputD, outputE, outputF, outputG) {

    let gates_list = gates;
    const inputs = [gates_list[inputA], gates_list[inputB], gates_list[inputC], gates_list[inputD]];
    const outputs = [outputA, outputB, outputC, outputD, outputE, outputF, outputG];

    let circuitIsCorrect = true;

    let dataTable = '';
    let head = '<tr><th colspan="4">Input</th><th colspan="7">Expected Values</th><th colspan="7">Observed Values</th></tr><tr><th>A</th><th>B</th><th>C</th><th>D</th><th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th><th>g</th><th>a</th><th>b</th><th>c</th><th>d</th><th>e</th><th>f</th><th>g</th></tr>';
    document.getElementById("table-head").innerHTML = head;

    for (let i = 0; i < 16; i++) {
        setBcdInputs(i, inputs);
        const bits = i.toString(2).padStart(4, '0');

        // simulate the circuit
        if (!testSimulation(gates_list)) {
            return;
        }
        const observed = outputs.map(id => gates_list[id].output ? 1 : 0);

        dataTable += `<tr class="bold-table"><th>${bits[0]}</th><th>${bits[1]}</th><th>${bits[2]}</th><th>${bits[3]}</th>`;
        if (i > 9) {
            // invalid BCD code: expected values are don't cares
            dataTable += SEGMENTS.map(() => '<td>x</td>').join('');
            dataTable += observed.map(v => `<td>${v}</td>`).join('') + '</tr>';
            continue;
        }

        const expected = expectedSegments(i);
        const correct = expected.every((v, k) => v === observed[k]);
        if (!correct) {
            circuitIsCorrect = false;
        }
        const className = correct ? "success-table" : "failure-table";
        dataTable += expected.map(v => `<td>${v}</td>`).join('');
        dataTable += observed.map(v => `<td class="${className}">${v}</td>`).join('') + '</tr>';
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
    const inputs = [gates_list[inputA], gates_list[inputB], gates_list[inputC], gates_list[inputD]];
    let circuitIsCorrect = true;

    // only the valid BCD digits 0 to 9 are checked
    for (let i = 0; i < 10; i++) {
        setBcdInputs(i, inputs);

        const val = testSimulationDecoder(decoderElem, display_elem);
        if (val === false) {
            return;
        }

        const expected = expectedSegments(i);
        if (SEGMENTS.some((segment, k) => val[segment] !== expected[k])) {
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
