import { useState } from "react";
import { sampleSolutions } from "./models/sampler";
import { paretoFront } from "./models/pareto";
import { weightedScore } from "./models/score";

function App() {
    const solutions = sampleSolutions(0, 5, 0.05);
    const front = paretoFront(solutions);

    const [costWeight, setCostWeight] = useState(1);
    const [qualityWeight, setQualityWeight] = useState(1);

    const best = solutions.reduce((best, s) => {
        const score = weightedScore(s, {
            cost: costWeight,
            quality: qualityWeight,
        });

        if (!best || score > best.score) {
            return { solution: s, score };
        }
        return best;
    }, null as null | { solution: any; score: number });

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Pareto Playground</h1>

            <p>
                Explore tradeoffs between <b>cost</b> (minimize) and{" "}
                <b>quality</b> (maximize).
            </p>

            {/* sliders */}
            <div style={{ marginBottom: "1rem" }}>
                <label>
                    Cost weight: {costWeight}
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={costWeight}
                        onChange={(e) => setCostWeight(+e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Quality weight: {qualityWeight}
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={qualityWeight}
                        onChange={(e) => setQualityWeight(+e.target.value)}
                    />
                </label>
            </div>

            <svg width={500} height={400} style={{ border: "1px solid #ccc" }}>
                {/* axes */}
                <line x1={50} y1={350} x2={450} y2={350} stroke="black" />
                <line x1={50} y1={350} x2={50} y2={50} stroke="black" />

                <text x={250} y={385} textAnchor="middle" fontSize={12}>
                    Cost (minimize)
                </text>
                <text
                    x={15}
                    y={200}
                    textAnchor="middle"
                    fontSize={12}
                    transform="rotate(-90 15 200)"
                >
                    Quality (maximize)
                </text>

                {/* all solutions */}
                {solutions.map((s, i) => (
                    <circle
                        key={`all-${i}`}
                        cx={50 + s.cost * 30}
                        cy={350 - s.quality * 300}
                        r={2}
                        fill="#bbb"
                    />
                ))}

                {/* Pareto front */}
                {front.map((s, i) => (
                    <circle
                        key={`front-${i}`}
                        cx={50 + s.cost * 30}
                        cy={350 - s.quality * 300}
                        r={4}
                        fill="crimson"
                    />
                ))}

                {/* weighted best */}
                {best && (
                    <circle
                        cx={50 + best.solution.cost * 30}
                        cy={350 - best.solution.quality * 300}
                        r={6}
                        fill="royalblue"
                    />
                )}
            </svg>

            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                Grey: all solutions · Red: Pareto-optimal · Blue: best under chosen weights
            </p>
        </div>
    );
}

export default App;
