import { Solution } from "./objectives";

// A dominates B if:
// - no worse in all objectives
// - strictly better in at least one
export function dominates(a: Solution, b: Solution): boolean {
    const betterOrEqual =
        a.cost <= b.cost && a.quality >= b.quality;

    const strictlyBetter =
        a.cost < b.cost || a.quality > b.quality;

    return betterOrEqual && strictlyBetter;
}

// compute Pareto front from a set of solutions
export function paretoFront(solutions: Solution[]): Solution[] {
    return solutions.filter((s, i) =>
        !solutions.some((other, j) =>
            j !== i && dominates(other, s)
        )
    );
}
