import type { Solution } from "./objectives";
import type { Weights } from "../types/optimization";

export function weightedScore(
    s: Solution,
    w: Weights
): number {
    // lower cost is better → subtract
    // higher quality is better → add
    return -w.cost * s.cost + w.quality * s.quality;
}
