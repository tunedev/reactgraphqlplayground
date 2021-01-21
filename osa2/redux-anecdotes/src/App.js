import React, { useEffect } from 'react';
import './App.css';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdotesList from './components/AnecdotesList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { useDispatch } from 'react-redux';
import { initializeAnecdote } from './reducers/anecdoteReducer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdote());
  }, [dispatch]);
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteForm />
      <AnecdotesList />
    </div>
  );
};

export default App;
