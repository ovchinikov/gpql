import { EDIT_AUTHOR, GET_AUTHORS } from '@/utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Author } from '@/types';

const EditAuthor = () => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });
  const { data } = useQuery(GET_AUTHORS);
  const [name, setName] = useState<string>('');
  const [born, setBorn] = useState<number>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editAuthor({ variables: { name, born } });
    e.currentTarget.reset();
  };
  return (
    <div>
      <h1 className='text-2xl font-bold'>Edit Author</h1>
      <form action='' onSubmit={handleSubmit}>
        <div>
          <select
            name=''
            id=''
            onChange={(e) => setName(e.target.value)}
            className='border p-2 mt-2'
          >
            <option value=''>Select Author</option>
            {data?.allAuthors.map((author: Author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type='text'
            name='born'
            onChange={(e) => setBorn(Number(e.target.value))}
            placeholder='Born Year'
            id='born'
            className='border p-2 m-2'
          />
        </div>
        <input
          type='submit'
          value='Update Author'
          className='border p-2 m-2 bg-blue-500 text-white hover:bg-blue-700 cursor-pointer'
        />
      </form>
    </div>
  );
};

export default EditAuthor;
