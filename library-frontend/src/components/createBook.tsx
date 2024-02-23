import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK, GET_AUTHORS, GET_BOOKS } from '@/utils/queries';

const CreateBook = () => {
  const [genreInput, setGenreInput] = useState<string>('');
  const [genres, setGenres] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [published, setPublished] = useState<number>();
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const addGenre = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setGenres([...genres, genreInput]);
    setGenreInput('');
  };

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBook({ variables: { title, author, published, genres } });

    e.currentTarget.reset();
    setGenres([]);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold'>Create Book</h1>
      <form action='' onSubmit={handleSumbit}>
        <div>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            name='title'
            placeholder='Title'
            className='border p-2 m-2'
          />
        </div>
        <div>
          <input
            type='text'
            name='published'
            onChange={(e) => setPublished(Number(e.target.value))}
            placeholder='Published'
            className='border p-2 m-2'
          />
        </div>
        <div>
          <input
            type='text'
            name='author'
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='Author'
            className='border p-2 m-2'
          />
        </div>
        <div>
          <input
            type='text'
            name='genre'
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            placeholder='genres'
            className='border p-2 m-2'
          />
          <button
            onClick={addGenre}
            className=' border p-2 rounded-md border-blue-500'
          >
            add genre
          </button>
          <div>
            {genres.map((genre, index) => (
              <ul key={index}>
                <li>{genre}</li>
              </ul>
            ))}
          </div>
        </div>
        <input
          type='submit'
          value='Create Book'
          className='border p-2 m-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 cursor-pointer'
        />
      </form>
    </div>
  );
};

export default CreateBook;
