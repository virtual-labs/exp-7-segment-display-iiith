import { gates, testSimulation } from './gate.js';
import { decoder, testSimulationDecoder } from './decoder.js';
import { display } from './display.js';


export function decoderTest(Input0, Input1, Input2, Input3, Output0, Output1, Output2, Output3, Output4, Output5, Output6) {

    // Gates[input0].outputs = true;
    // Gates[input1].outputs = true;
    let gates_list = gates;


    let input0 = gates_list[Input0];
    let input1 = gates_list[Input1];
    let input2 = gates_list[Input2];
    let input3 = gates_list[Input3];

    let flag = 0;

    let dataTable = ''

    for (let i = 0; i < 32; i++) {
        //convert i to binary
        let binary = i.toString(2);
        if (binary.length < 2)
            binary = '0' + binary;
        if (binary.length < 3)
            binary = '0' + binary;
        if (binary.length < 4)
            binary = '0' + binary;

        const bit0 = binary[3];
        const bit1 = binary[2];
        const bit2 = binary[1];
        const bit3 = binary[0];

        input3.setOutput(bit0 == "1");
        input2.setOutput(bit1 == "1");
        input1.setOutput(bit2 == "1");
        input0.setOutput(bit3 == "1");


        const A = input0.output;
        const B = input1.output;
        const C = input2.output;
        const D = input3.output;

        const a = A || C || (D && B) || (!D && !B) ? 1 : 0;
        const b = !B || (!C && !D) || (C && D) ? 1 : 0;
        const c = B || !C || D ? 1 : 0;
        const d = A || (!B && !D) || (!B && C) || (C && !D) || (B && !C && D) ? 1 : 0;
        const e = (!B && !D) || (C && !D) ? 1 : 0;
        const f = A || (B && !C) || (B && !D) || (!C && !D) ? 1 : 0;
        const g = A || (B && !C) || (B && !D) || (!B && C) ? 1 : 0;

        // simulate the circuit
        testSimulation(gates_list);
        const a0 = gates_list[Output0].output ? 1 : 0;
        const b0 = gates_list[Output1].output ? 1 : 0;
        const c0 = gates_list[Output2].output ? 1 : 0;
        const d0 = gates_list[Output3].output ? 1 : 0;
        const e0 = gates_list[Output4].output ? 1 : 0;
        const f0 = gates_list[Output5].output ? 1 : 0;
        const g0 = gates_list[Output6].output ? 1 : 0;

        dataTable += '<tr><th>' + bit3 + '</th><th>' + bit2 + '</th><th>' + bit1 + '</th><th>' + bit0 + '</th><td>' + a0 + '</td><td>' + b0 + '</td><td>' + c0 + '</td><td>' + d0 + '</td><td>' + e0 + '</td><td>' + f0 + '</td><td>' + g0 + '</td></tr>'

        if (a0 != a || b0 != b || c0 != c || d0 != d || e0 != e || f0 != f || g0 != g) {
            flag = 1;
        }
    }

    const table_elem = document.getElementById('table-body');
    table_elem.insertAdjacentHTML('beforeend', dataTable);

    const result = document.getElementById('result');

    if (flag == 0) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}

export function displayTest(Input0, Input1, Input2, Input3) {
    let decoder_elem = decoder;
    let display_elem = display;
    let gates_list = gates;
    let input0 = gates_list[Input0];
    let input1 = gates_list[Input1];
    let input2 = gates_list[Input2];
    let input3 = gates_list[Input3];
    let flag = 0;
    let dataTable = ''

    for (let i = 0; i < 16; i++) {
        // covert i to binary
        let binary = i.toString(2);
        if (binary.length < 2)
            binary = '0' + binary;
        if (binary.length < 3)
            binary = '0' + binary;
        if (binary.length < 4)
            binary = '0' + binary;
        const bit0 = binary[3] || 0;
        const bit1 = binary[2] || 0;
        const bit2 = binary[1] || 0;
        const bit3 = binary[0] || 0;

        input0.setOutput(bit3 == "1");
        input1.setOutput(bit2 == "1");
        input2.setOutput(bit1 == "1");
        input3.setOutput(bit0 == "1");

        const A = input0.output;
        const B = input1.output;
        const C = input2.output;
        const D = input3.output;

        const a = A || C || (D && B) || (!D && !B);
        const b = !B || (!C && !D) || (C && D);
        const c = B || !C || D;
        const d = A || (!B && !D) || (!B && C) || (C && !D) || (B && !C && D);
        const e = (!B && !D) || (C && !D);
        const f = A || (B && !C) || (B && !D) || (!C && !D);
        const g = A || (B && !C) || (B && !D) || (!B && C);

        decoder_elem.setA(input0);
        decoder_elem.setB(input1);
        decoder_elem.setC(input2);
        decoder_elem.setD(input3);

        const outputs = testSimulationDecoder(decoder_elem,display_elem);
        dataTable += ''

        if (outputs.a != a || outputs.b != b || outputs.c != c || outputs.d != d || outputs.e != e || outputs.f != f || outputs.g != g) {
            flag = 1;
        }
    }

    const table_elem = document.getElementById('table-body');
    table_elem.insertAdjacentHTML('beforeend', dataTable);

    const result = document.getElementById('result');

    if (flag == 0) {
        result.innerHTML = "<span>&#10003;</span> Success";
        result.className = "success-message";
    }
    else {
        result.innerHTML = "<span>&#10007;</span> Fail";
        result.className = "failure-message";
    }
}