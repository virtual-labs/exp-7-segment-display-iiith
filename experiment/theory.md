**BCD to 7-segment Decoder**

- A BCD to 7-segment Decoder generates 7 outputs from a BCD (4-bit) input for driving a 7-segment LED display device to display BCD digits. 
- A 7-segment display consists of seven segments designated as a, b, c, d, e, f and g in a clockwise sequence. An optional DP decimal point (an "eighth segment") is used for the display of non-integer numbers. 
- In a 7-segment LED display, either all the anodes or all the cathodes of the LEDs in the seven segments are tied together and brought out at a single pin, and the device is accordingly called either a common-anode or a common-cathode display. In this experiment, we will be using a common-cathode display. 
- The objective of this experiment is to design, assemble and test a BCD to 7-segment Decoder generating these seven outputs. Note that each segment is lighted when the corresponding decoder output, also denoted by a, b, c, d, e, f and g, is HIGH.

<img width="150px" src="images/7_segment_display_labeled.png">  <img src="images/7-segments_Indicator.gif">

**BCD to 7-segment Decoder**
| A | B | C | D | a | b | c | d | e | f | g | Digit |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 0 | 0 |	0  | 	0  |1  |1  |1  |1  |1  |1  | 0  | 0  |
| 0 | 0 | 	0  | 	1  |0  |1  |1  |0  |0  |0  | 0  | 1  |
| 0 | 0 |	1  |	0  |1  |1  |0  |1  |1  |0  | 1  | 2  |
| 0 | 0 | 	1  | 	1  |1  |1  |1  |1  |0  |0  | 1  | 3  |
| 0 | 1 |	0  |	0  |0  |1  |1  |0  |0  |1  | 1  | 4  |
| 0 | 1 |	0  |	1  |1  |0  |1  |1  |0  |1  | 1  | 5  |
| 0 | 1 |	1  | 	0  |1  |0  |1  |1  |1  |1  | 1  | 6  |
| 0 | 1 | 	1  | 	1  |1  |1  |1  |0  |0  |0  | 0  | 7  |
| 1 | 0 | 	0  | 	0  |1  |1  |1  |1  |1  |1  | 1  | 8  |
| 1 | 0 | 	0  |	1  |1  |1  |1  |1  |0  |1  | 1  | 9  |

**7 segment display**
|Digit | Off Segments|
|------|-------------|
|0     |	g    |
|1     | a,d,e,f,g   |
|2     |c,f          |
|3     |e,f          |
|4     |a,d,e        |
|5     | b,e         |
|6     | b           |
|7     |d,e,f,g      |
|8     | -           |
|9     |e            |	



