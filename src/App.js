import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Buttonnav from "./components/Buttonnav";
import Navbar from "./components/Navbar";
import Textarea from "./components/Textarea";
import Welcome from "./components/Welcome";

function App() {
  const [input, setInput] = useState(localStorage.getItem("input") || "");
  const [output, setOutput] = useState(localStorage.getItem("output") || "");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("input", input);
    if (!input.trim()) {
      setOutput("");
      localStorage.setItem("output", "");
    }
  }, [input]);

  useEffect(() => {
    localStorage.setItem("output", output);
  }, [output]);

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 3000);
  };

  const generateStepDefinitions = useCallback(() => {
    const steps = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && /^(Given|When|Then|And)\s/.test(line));

    if (steps.length === 0) {
      setOutput("");
      localStorage.setItem("output", "");
      showCustomAlert("⚠️ No valid Cucumber steps found!");
      return;
    }

    let stepDefinitions = `import io.cucumber.java.en.*;\n\n`;

    steps.forEach((step) => {
      let matches = step.match(/^(Given|When|Then|And)\s+(.*)$/);
      if (!matches) return;

      let annotation = `@${matches[1]}`;
      let stepText = matches[2];

      let methodName = stepText
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .split(/\s+/)
        .map((word, index) =>
          index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join("");

      stepDefinitions += `${annotation}("${stepText}")\npublic void ${methodName}() {\n\n}\n\n`;
    });

    setOutput(stepDefinitions);
    showCustomAlert("Step Definitions Updated!");
  }, [input]);

  const handleCopy = () => {
    if (output.trim()) {
      navigator.clipboard.writeText(output);
      showCustomAlert("Step Definitions Copied!");
    } else {
      showCustomAlert("No output to copy!");
    }
  };

  return (
    <>
      {alertMessage && <div className="custom-alert">{alertMessage}</div>}
      <Welcome />
      <Navbar />
      <Textarea input={input} setInput={setInput} output={output} />
      <Buttonnav onGenerate={generateStepDefinitions} onCopy={handleCopy} />
    </>
  );
}

export default App;
