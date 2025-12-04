import { Solution } from "../../../utils/solution";

new Solution(
  (s) => {
    s.describe("2a");

    for (const line of s.input) {
      const [min, max] = line.split("-").map((v) => +v);
      for (let i = min; i <= max; i++) {
        let str = i.toString();
        if (str.length % 2 !== 0) continue;

        let arr = str.split("");
        let split = str.length / 2;

        const [left, right] = [arr.slice(0, split), arr.slice(split)].map((e) =>
          e.join(""),
        );

        if (left == right) {
          s.solution += +(left + right);
        }
      }
    }
  },
  (input) => input[0].split(","),
);

new Solution(
  (s) => {
    s.describe("2b");

    for (const line of s.input) {
      const [min, max] = line.split("-").map((v) => +v);
      for (let i = min; i <= max; i++) {
        let str = i.toString().repeat(2);

        if (str.indexOf(str, 1) < str.length) {
          s.solution += i;
        }
      }
    }
  },
  (input) => input[0].split(","),
);
