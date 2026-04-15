import React from "react";
import "../css/Textarea.css";

function Textarea({ input, setInput, output }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
      <textarea
        className='textArea'
        id="inputContent"
        placeholder='Write or paste your cucumber steps here!'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <textarea
        className='textArea'
        id="outputContent"
        placeholder='Waiting For Your Step-Definitions!'
        value={output}
        readOnly
      />
    </div>
  );
}

export default Textarea;
