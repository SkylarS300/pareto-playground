import type { Solution } from "./objectives";

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

// The Pareto front represents solutions where no objective
// can be improved without worsening another.
export function paretoFront(solutions: Solution[]): Solution[] {
    return solutions.filter((s, i) =>
        !solutions.some((other, j) =>
            j !== i && dominates(other, s)
        )
    );
}
