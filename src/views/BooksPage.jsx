import Book from "../components/Book/Book";
import Header from "../components/Header/Header";
import { useBooks } from "../store/booksSlice";

function BooksPage() {
  const books = useBooks();
  const pageTitle = "📖 Book List with React Router & Redux Toolkit";

  return (
    <>
      <div className="container">
        <Header pageTitle={pageTitle} />
        <div className="books-container">
          <div className="books-list">
            {books.map((book) => (
              <Book key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksPage;
