import { useApolloClient } from '@apollo/client';
import { Link } from 'react-router-dom';

interface MenuProps {
  token: string | null;
}
const Menu = ({ token }: MenuProps) => {
  const client = useApolloClient();
  const logout = () => {
    localStorage.clear();
    client.resetStore();
    window.location.reload();
  };
  return (
    <div className='text-white p-6 bg-blue-500'>
      <Link className='p-2 hover:underline' to='/'>
        authors
      </Link>
      <Link className='p-2 hover:underline' to='/books'>
        books
      </Link>
      <Link className='p-2 hover:underline' to='/books/create'>
        add book
      </Link>
      {token ? (
        <button onClick={logout} className='p-2 hover:underline'>
          logout
        </button>
      ) : (
        <Link className='p-2 hover:underline' to='/login'>
          login
        </Link>
      )}
    </div>
  );
};

export default Menu;
