import { sampleSolutions } from "./models/sampler";
import { paretoFront } from "./models/pareto";

function App() {
    const solutions = sampleSolutions(0, 5, 0.05);
    const front = paretoFront(solutions);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>Pareto Playground</h1>
            <p>
                Abstract demo: minimize <b>cost</b>, maximize <b>quality</b>.
            </p>

            <svg width={500} height={400} style={{ border: "1px solid #ccc" }}>
                {/* axes */}
                <line x1={50} y1={350} x2={450} y2={350} stroke="black" />
                <line x1={50} y1={350} x2={50} y2={50} stroke="black" />

                {/* axis labels */}
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
            </svg>


            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                Grey points are all sampled solutions. Red points are Pareto-optimal.
            </p>
        </div>
    );
}

export default App;
