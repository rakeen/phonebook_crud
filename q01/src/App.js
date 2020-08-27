import React, { useState } from 'react';
import './App.css';

/* eslint-disable no-undef */
const factorial = n => {
  let ans = 1, i = 1;
  if (typeof BigInt === 'function') {
    n = BigInt(n);
    ans = BigInt(1);
    i = BigInt(1);
  }
  for (; i <= n; i++) ans *= i;
  return ans.toString();
};

const App = () => {
  const [value, setValue] = useState();
  const [answer, setAnswer] = useState();
  const handleOnChange = e => setValue(e.target.value);
  const handleOnClick = e => { e.preventDefault(); setAnswer(factorial(value)); };
  return (
    <div>
      <h1 id="info">Factorial Calculator</h1>
      <form aria-describedby="info" onSubmit={handleOnClick}>
        <input
          type="number"
          placeholder="Enter a number..."
          value={value}
          autoFocus
          onChange={handleOnChange}
        />
        <br />
        <button type="button" onClick={handleOnClick}>Calculate Factorial</button>
      </form>
      <h2>Factorial: {answer}</h2>
    </div>
  );
}

export default App;
