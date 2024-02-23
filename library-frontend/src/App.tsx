import { Navigate, Route, Routes } from 'react-router-dom';
import Authors from './components/Authors';
import Books from './components/Books';
import CreateBook from './components/createBook';
import { useState } from 'react';
import Menu from './components/Menu';
import LoginForm from './components/loginForm';

const App = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('library-user-token'),
  );

  if (!token) {
    <Navigate to='/login' replace />;
  }

  return (
    <div>
      <Menu token={token} />
      <h1 className='text-3xl font-bold text-center mt-3'>GraphQL Library</h1>
      <Routes>
        <Route path='/' element={<Authors token={token} />} />
        <Route path='/books' element={<Books />} />

        <Route
          path='/books/create'
          element={token ? <CreateBook /> : <Navigate to='/login' />}
        />

        <Route
          path='/login'
          element={
            token ? (
              <Navigate to='/books' replace />
            ) : (
              <LoginForm setToken={setToken} />
            )
          }
        />

        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;
