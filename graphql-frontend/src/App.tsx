import { useApolloClient, useQuery } from '@apollo/client';
import Persons from './components/persons';
import AddPerson from './components/addPerson';
import { GET_PERSONS } from './utils/queries';
import PhoneForm from './components/phoneForm';
import { useState } from 'react';
import LoginForm from './components/loginForm';

function App() {
  const [token, setToken] = useState<null | string>(
    localStorage.getItem('phonenumbers-user-token'),
  );
  const { data, error, loading } = useQuery(GET_PERSONS);
  const client = useApolloClient();

  if (error) {
    return <div>An error occured...Please try again later</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }
  if (!token) {
    return <LoginForm setToken={setToken} />;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <div>
        <button onClick={logout}>logout</button>
        <AddPerson />
        <Persons persons={data.allPersons} />
        <PhoneForm />
      </div>
    </div>
  );
}

export default App;
