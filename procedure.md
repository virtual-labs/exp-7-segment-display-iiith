### BCD to 7-Segment Decoder

#### Circuit Diagram

<img src="images/bcd_decoder.png" alt="BCD to 7-Segment Decoder Circuit Diagram" style="width: 100%; max-width: 600px; margin: 10px 0;">

_Figure 1: BCD to 7-Segment Decoder circuit diagram showing the complete combinational logic implementation using logic gates. Reference: Theory section_

#### Components Required

- NOT, AND and OR gates (the reference circuit in Figure 1 also uses XNOR gates)

**Note**: The Input bits (A, B, C, D) and the Output bits (a, b, c, d, e, f, g) are pre-placed in the simulation workspace. Every gate in the simulator has two inputs (the NOT gate has one), so a gate with more inputs has to be built by chaining gates. The number of gates you need depends on how you implement the equations, and any circuit that produces the correct segment patterns for the digits 0 to 9 is accepted.

#### Circuit Connections

1. Drag logic gates from the Components panel on the left side to the circuit board.
2. Connect the input bits A, B, C, and D to the appropriate logic gates according to the circuit diagram. An input bit or a gate output can be connected to several gates: drag a new wire from an output point that is already connected.
3. Implement the Boolean expressions for each segment (a, b, c, d, e, f, g) using the required logic gates:
   - **Segment a**: a = A + C + BD + B'D'
   - **Segment b**: b = B' + C'D' + CD
   - **Segment c**: c = B + C' + D
   - **Segment d**: d = A + B'D' + B'C + CD' + BC'D
   - **Segment e**: e = B'D' + CD'
   - **Segment f**: f = A + C'D' + BC' + BD'
   - **Segment g**: g = A + BC' + B'C + CD'
4. Connect the outputs of your logic circuits to the corresponding output points (a, b, c, d, e, f, g).
5. Set the input values for A, B, C, and D by clicking on the input bits. Each click toggles the bit between 1 and 0.
6. Click on "Simulate" to test your decoder circuit and observe the output values.

#### Observations

- The output values a, b, c, d, e, f, and g correspond to the 7-segment display patterns for BCD inputs A, B, C, D as described in the theory section.
- Each BCD input (0000 to 1001) should produce the correct 7-segment pattern for digits 0-9.
- The truth table shown on "Submit" lists all 16 input combinations. Only the valid BCD codes 0000 to 1001 are checked; the expected values for the invalid codes 1010 to 1111 are don't cares (x), so any output is accepted for them.
- If the circuit has been implemented correctly as described above, a "Success" message will be displayed upon clicking "Submit".

### 7-Segment Display Interface

#### Circuit Diagram

<img src="images/7_segment_display_labeled.png" alt="7-Segment Display Interface Diagram" style="width: 100%; max-width: 500px; margin: 10px 0;">

_Figure 2: 7-Segment Display with its segments labeled. The figure uses capital letters A to G; in this experiment the segments are written in lowercase (a to g). Reference: Theory section_

#### Components Required

- 1 BCD to 7-Segment Decoder (pre-loaded)
- 1 7-Segment Display unit (pre-loaded)
- Input connections for A, B, C, D

#### Circuit Connections

1. The circuit board contains pre-loaded components: Input bits (A, B, C, D), BCD to 7-segment Decoder, and 7-segment Display.
2. Connect the input bits A, B, C, D to the corresponding inputs of the BCD decoder by dragging your cursor from one endpoint to another.
3. Connect the decoder outputs (a, b, c, d, e, f, g) to the corresponding inputs of the 7-segment display:
   - Connect decoder output 'a' to display input 'a'
   - Connect decoder output 'b' to display input 'b'
   - Continue this pattern for all seven segments (c, d, e, f, g)
4. Set the input values for A, B, C, D by clicking on the input bits to test different BCD combinations. The inputs are all 1 at the start (1111), which is not a valid BCD digit, so set them to a digit from 0000 to 1001.
5. Click on "Simulate" to activate the display and observe the digit representation.

#### Truth Table for BCD to 7-Segment Decoder

| A   | B   | C   | D   | Digit | a   | b   | c   | d   | e   | f   | g   |
| --- | --- | --- | --- | ----- | --- | --- | --- | --- | --- | --- | --- |
| 0   | 0   | 0   | 0   | 0     | 1   | 1   | 1   | 1   | 1   | 1   | 0   |
| 0   | 0   | 0   | 1   | 1     | 0   | 1   | 1   | 0   | 0   | 0   | 0   |
| 0   | 0   | 1   | 0   | 2     | 1   | 1   | 0   | 1   | 1   | 0   | 1   |
| 0   | 0   | 1   | 1   | 3     | 1   | 1   | 1   | 1   | 0   | 0   | 1   |
| 0   | 1   | 0   | 0   | 4     | 0   | 1   | 1   | 0   | 0   | 1   | 1   |
| 0   | 1   | 0   | 1   | 5     | 1   | 0   | 1   | 1   | 0   | 1   | 1   |
| 0   | 1   | 1   | 0   | 6     | 1   | 0   | 1   | 1   | 1   | 1   | 1   |
| 0   | 1   | 1   | 1   | 7     | 1   | 1   | 1   | 0   | 0   | 0   | 0   |
| 1   | 0   | 0   | 0   | 8     | 1   | 1   | 1   | 1   | 1   | 1   | 1   |
| 1   | 0   | 0   | 1   | 9     | 1   | 1   | 1   | 1   | 0   | 1   | 1   |

#### Observations

- The 7-segment display shows the corresponding decimal digit (0-9) for each valid BCD input combination (0000-1001).
- The display segments light up according to the truth table above, creating recognizable digit patterns.
- Invalid BCD inputs (1010-1111) may produce undefined patterns on the display. In this experiment, "Simulate" does not show a pattern for them and displays a message asking for a valid BCD digit.
- If the connections have been made correctly as described above, a "Success" message will be displayed upon clicking "Submit".

### General Instructions

#### Navigation Between Tasks

- Use the task tabs at the top to switch between "Decoder" and "7-segment Display" tasks.
- Each task has specific components and objectives tailored to the learning goals.
- The observations section will be cleared when switching between tasks to avoid confusion.

#### Circuit Building Guidelines

- **Components**: Click on logic gates in the Components panel to add them to the circuit board.
- **Movement**: Drag and drop components to position them appropriately on the circuit board.
- **Connections**: Create wire connections by dragging from one endpoint to another.
- **Input Values**: Click on input bits to toggle between 0 and 1 values.
- **Wire Deletion**: Right-click on wire connections and select delete to remove unwanted connections.
- **Component Deletion**: Right-click on components and select delete to remove them from the circuit.

#### Testing and Validation

- **Simulate**: Click the "Simulate" button to test your circuit with the current input values.
- **Submit**: Click the "Submit" button to validate your complete circuit implementation.
- **Reset**: Use the "Reset" button to clear the circuit board and start over.
- **Multiple Tests**: Try different input combinations to verify your circuit works for all valid BCD inputs (0-9).
