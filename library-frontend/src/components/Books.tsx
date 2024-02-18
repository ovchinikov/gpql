import { GET_BOOKS } from "@/utils/queries"
import { useQuery } from "@apollo/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Book } from "@/types"


const Books = () => {
    const {data} = useQuery(GET_BOOKS)
    console.log(data)

    return (
        <div>
            <h1>Books</h1>
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
                    {data?.allBooks.map((book: Book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.published}</TableCell>
                            <TableCell>{book.author}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>    
            </Table>
        </div>
    )
}


export default Books