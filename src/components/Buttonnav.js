import React from 'react';
import "../css/Buttonnav.css";

function Buttonnav({ onGenerate, onCopy }) {
  return (
    <div className='d-flex justify-center'>
      <button className='button' onClick={onGenerate}>Generate Step Definitions</button>
      <button className='button' onClick={onCopy}>Copy To Clipboard</button>
    </div>
  );
}

export default Buttonnav;
