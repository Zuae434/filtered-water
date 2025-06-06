import { useState, useMemo } from "react";
import Stepper, { Step } from "./Stepper";
import LiquidChrome from "./Liquid-Chrome-background";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [filterinput, setFilterInput] = useState("");
  const [filteredoutput, setFilteredOutput] = useState<string[]>([]);

  const handleFilter = () => {
    const items = input.split(",").map((item) => item.trim());
    setFilteredOutput(items.filter((item) => !filterinput.includes(item)));
  };

  const background = useMemo(
    () => (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          right: 0,
        }}
      >
        <LiquidChrome
          baseColor={[0.1, 0.3, 0.5]}
          speed={0.15}
          amplitude={0.3}
          interactive={false}
        />
      </div>
    ),
    [],
  );

  return (
    <>
      <title>Filtered Water</title>

      {background}

      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => console.log("All steps completed!")}
        backButtonText="Previous"
        nextButtonText="Next"
      >
        <Step>
          <h2>Insert the list of drum contents! (comma seperated)</h2>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="List the drum contents"
            className="input-drum-contents"
          />
        </Step>
        <Step>
          <h2>Insert the list of items to filter out! (comma seperated)</h2>
          <input
            type="text"
            value={filterinput}
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder="List of items to filter out"
            className="input-drum-contents"
          />
        </Step>
        <Step>
          <h2>Click to Filter!</h2>
          <button className="filter-button" onClick={handleFilter}>
            Filter
          </button>
          <p>{filteredoutput.join(", ")}</p>
        </Step>
        <Step>
          <h2>Good job!</h2>
          <p>You filtered the drums!</p>
        </Step>
      </Stepper>
    </>
  );
}

export default App;
