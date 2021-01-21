import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const dispatchAction = (e, actionLabel) => {
    store.dispatch({
      type: actionLabel.toUpperCase(),
    });
  };
  return (
    <div>
      <button
        onClick={(e) => {
          dispatchAction(e, 'good');
        }}
      >
        good
      </button>
      <button
        onClick={(e) => {
          dispatchAction(e, 'ok');
        }}
      >
        neutral
      </button>
      <button
        onClick={(e) => {
          dispatchAction(e, 'bad');
        }}
      >
        bad
      </button>
      <button
        onClick={(e) => {
          dispatchAction(e, 'zero');
        }}
      >
        reset stats
      </button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
