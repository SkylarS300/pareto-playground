export type Solution = {
    x: number;        // decision variable
    cost: number;     // objective 1 (minimize)
    quality: number;  // objective 2 (maximize)
};

// abstract objective functions
export function evaluate(x: number): Solution {
    return {
        x,
        cost: x * x,                 // convex increasing cost
        quality: Math.exp(-0.5 * x)  // diminishing quality
    };
}
