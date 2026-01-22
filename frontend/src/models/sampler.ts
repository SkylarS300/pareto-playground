import { evaluate, type Solution } from "./objectives";

export function sampleSolutions(
    min: number,
    max: number,
    step: number
): Solution[] {
    const results: Solution[] = [];

    for (let x = min; x <= max; x += step) {
        results.push(evaluate(x));
    }

    return results;
}
