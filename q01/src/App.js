import React, { useState } from 'react';
import './App.css';

const factorial = n => {
  let ans = 1;
  for (let i = 1; i <= n; i++) ans *= i;
  return ans;
};

const App = () => {
  const [value, setValue] = useState();
  const [answer, setAnswer] = useState();
  const handleOnChange = e => setValue(e.target.value);
  const handleOnClick = _ => setAnswer(factorial(value));
  return (
    <div>
      <h1>Factorial Calculator</h1>
      <form>
        <input
          type="number"
          placeholder="Enter a number..."
          value={value}
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
