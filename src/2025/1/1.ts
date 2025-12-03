import { Solution } from "../../../utils/solution";

new Solution((s) => {
  s.describe("1a");

  let deg = 50;

  for (const instruction of s.input) {
    const op = instruction.slice(0, 1);
    const diff = op === "L" ? -instruction.slice(1) : +instruction.slice(1);
    deg = (deg + diff) % 100;
    if (deg === 0) s.solution += 1;
  }
});

new Solution((s) => {
  s.describe("1b");
  s.tests = [
    ["L50", "R50"], // 1
    ["L50", "L50"], // 1
    ["R50", "L50"], // 1
    ["R50", "R50"], // 1
    ["R150"], // 2
    ["L68", "L30", "R48", "L5", "R60", "L55", "L1", "L99", "R14", "L82"], // 6
    ["L150", "L50"], // 2
    ["L150", "R50"], // 2
    ["R150", "L50"], // 2
    ["R150", "R50"], // 2
    ["R150", "R50"], // 2
  ];

  let oldDeg = 50;

  for (const instruction of s.input) {
    const op = instruction.slice(0, 1);
    const diff = op === "L" ? -instruction.slice(1) : +instruction.slice(1);
    const newDeg = (((oldDeg + diff) % 100) + 100) % 100;
    const moveBy = oldDeg + diff;

    let passes = 0;
    if (moveBy > 100) {
      passes = Math.floor(moveBy / 100) - (newDeg == 0 ? 1 : 0); // we remove 1 because we are landing on 0 not passing it (same as moveBy % 100)
    } else if (moveBy < 0) {
      passes =
        Math.floor(Math.abs(moveBy) / 100) +
        (oldDeg == 0 || newDeg == 0 ? 0 : 1); // we don't add because we are not passing 0, we are landing on it
    }

    if (newDeg === 0) s.solution += 1;
    s.solution += passes;

    oldDeg = newDeg;
  }
});
