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
import { GET_AUTHORS } from '@/utils/queries';
import { Author } from '@/types';
import EditAuthor from './editAuthor';

interface AuthorsProps {
  token: string | null;
}

const Authors = ({ token }: AuthorsProps) => {
  const { data } = useQuery(GET_AUTHORS);
  return (
    <div>
      <h1 className='text-2xl font-bold'>Authors</h1>
      <Table>
        <TableCaption>Authors</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Born</TableHead>
            <TableHead>Books</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.allAuthors.map((author: Author) => (
            <TableRow key={author.id}>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.born}</TableCell>
              <TableCell>{author.bookCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {token && <EditAuthor />}
    </div>
  );
};

export default Authors;
