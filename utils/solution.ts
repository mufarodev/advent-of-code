import readInput from "./readInput";

type RunFunction = (solution: Solution) => void;

export class Solution {
  public solution = 0;
  public input: string[] = [];
  public tests: Array<Array<string>> = [];
  public title = "";

  constructor(
    public run: RunFunction,
    public customParse?: (input: string[]) => string[],
  ) {
    this.runAsync();
  }

  public describe(newTitle: string) {
    this.title = newTitle;
  }

  public setTests(tests: [string[]]) {
    this.tests = tests;
  }

  private async runAsync() {
    this.input = await readInput();
    if (this.customParse) {
      this.input = this.customParse(this.input);
    }
    const start = performance.now();
    this.run(this);
    const end = performance.now();
    console.log(
      `${this.title && `[${this.title}]`} Solution: ${this.solution} (took ${(end - start).toFixed(2)} ms)`,
    );

    if (this.tests.length > 0) {
      for (const [index, testInput] of this.tests.entries()) {
        this.solution = 0;
        this.input = testInput;
        const testStart = performance.now();
        this.run(this);
        const testEnd = performance.now();
        console.log(
          `  [${this.title}:test-${index + 1}] Solution: ${this.solution} (took ${(testEnd - testStart).toFixed(2)} ms)`,
        );
      }
    }
  }
}
