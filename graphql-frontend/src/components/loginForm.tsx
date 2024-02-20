import { useMutation } from '@apollo/client';
import React, { Dispatch, useEffect, useState } from 'react';
import { LOGIN } from '../utils/queries';

interface LoginFormProps {
  setToken: Dispatch<React.SetStateAction<string | null>>;
}
const LoginForm = ({ setToken }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('phonenumbers-user-token', token);
    }
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
