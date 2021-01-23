import { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';
import { ALL_PERSONS } from './queries';

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null)
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();

  useEffect(() => {
    const tokenFromStorge = localStorage.getItem('phonenumbers-user-token');
    setToken(tokenFromStorge)
  }, []);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if(!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  if (result.loading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}> Logout </button>
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </>
  );
}

export default App;
