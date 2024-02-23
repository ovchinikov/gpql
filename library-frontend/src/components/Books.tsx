import { GET_BOOKS, GET_ME } from '@/utils/queries';
import { useQuery } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Book } from '@/types';
import { useState } from 'react';

const Books = () => {
  const [filter, setFilter] = useState('' as string);
  const { data } = useQuery(GET_BOOKS);
  const { data: me } = useQuery(GET_ME);
  console.log(me);
  console.log(data);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = event.target.value;
    setFilter(genre);
  };

  return (
    <div>
      <h1>Books</h1>
      <div>
        <label htmlFor='genre'>Filter by genre:</label>
        <select id='genre' onChange={handleFilter}>
          {Array.from(
            new Set<string>(
              data?.allBooks.flatMap((book: Book) => book.genres),
            ),
          ).map((genre: string) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
          <option value=''>All</option>
          <option value='recommended'>Recommended</option>
        </select>
      </div>
      <Table>
        <TableCaption>Books</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.allBooks
            .filter((book: Book) =>
              filter === ''
                ? true
                : filter === 'recommended'
                ? book.genres.includes(me?.me.favouriteGenre as string)
                : book.genres.includes(filter),
            )
            .map((book: Book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.published}</TableCell>
                <TableCell>{book.author.name}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Books;
