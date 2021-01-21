import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeNotes } from './reducers/noteReducers';
import NewNote from './components/NewNotes';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';

const Note = () => (
  <div>
    <NewNote />
    <VisibilityFilter />
    <Notes />
  </div>
);

const App = () => {
  const dispatch = useDispatch();

  const padding = {
    padding: '5px',
  };

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Link style={padding} to='/'>
          Home
        </Link>
        <Link style={padding} to='/users'>
          users
        </Link>
        <Link style={padding} to='/notes'>
          notes
        </Link>
      </div>
      <Switch>
        <Route path='/notes'>
          <Note />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2020</i>
      </div>
    </Router>
  );
};

export default App;
