import { useState } from "react";
import { analyseObjection } from "./api/api";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const data = await analyseObjection(input);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Backend Error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ObjectionAI</h1>

      <textarea
        rows="5"
        cols="60"
        placeholder="Enter objection..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleSubmit}>
        Analyse
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Category: {result.category}</h2>

          <h3>{result.emotionalRoot}</h3>

          {result.responses.map((response, index) => (
            <div
              key={index}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <strong>{response.style}</strong>

              <p>{response.response}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;