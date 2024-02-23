import { LOGIN } from '@/utils/queries';
import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';

interface LoginFormProps {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginForm = ({ setToken }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, results] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (results.data) {
      const token = results.data.login.value;
      setToken(token);
      localStorage.setItem('library-user-token', token);
    }
  }, [results.data, setToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border p-2 m-2'
        />
      </div>
      <div>
        <input
          type='password'
          name='password'
          placeholder='Password'
          className='border p-2 m-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className='border p-2 m-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 cursor-pointer'>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
