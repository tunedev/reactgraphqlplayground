import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    setValue(value - 1);
  };

  const reset = () => {
    setValue(0);
  };

  return {
    value,
    reset,
    increase,
    decrease,
  };
};

const useNotes = (url) => {
  const [values, setValues] = useState([]);
  useEffect(() => {
    axios.get(url).then((response) => {
      setValues(response.data);
    });
  }, [url]);
  return values;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );
  // const counter = useCounter();
  // return (
  //   <div className='container'>
  //     <h1>React with Webpack in session</h1>
  //     <p>Click Count: {counter.value}</p>
  //     <button onClick={() => counter.increase()}>Click me</button>
  //   </div>
  // );
};

export default App;
