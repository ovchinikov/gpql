import { Link, Route, Routes } from "react-router-dom"
import Authors from "./components/Authors"
import Books from "./components/Books"
import CreateBook from "./components/createBook"



const App = () => {
  return (
    <div>
      <div className="text-white p-6 bg-blue-500">
        <Link className="p-2 hover:underline" to="/">authors</Link>
        <Link className="p-2 hover:underline" to="/books">books</Link>
        <Link className="p-2 hover:underline" to="/books/create">add book</Link>
      </div>
      <h1 className="text-3xl font-bold text-center mt-3">GraphQL Library</h1>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  )
}


export default App
