import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Notes from "../components/Notes/Notes";
import { eraseBook, toogleIsRead, useBooks } from "../store/booksSlice";
import { eraseBookNotes } from "../store/notesSlice";

function SingleBookPage() {
  const books = useBooks();

  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const book = books.find((book) => book.id === parseInt(id));

  const handleEraseBook = (id) => {
    if (
      confirm(
        "Are you sure you want to erase this book and all note associated with it?"
      )
    ) {
      dispatch(eraseBook(id));
      dispatch(eraseBookNotes(id));
      navigate("/");
    }
  };

  const handleIsRead = (id) => {
    dispatch(toogleIsRead(id));
  };

  return (
    <>
      <div className="container">
        <Link to="/">
          <button className="btn">← Back to Books</button>
        </Link>

        {book ? (
          <div>
            <div className="single-book">
              <div className="book-cover">
                <img src={book.cover} />
              </div>

              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                <h4 className="book-author">{book.author}</h4>
                <p>{book.synopsis}</p>
                <div className="read-checkbox">
                  <input
                    type="checkbox"
                    defaultChecked={book.isRead}
                    onClick={() => handleIsRead(book.id)}
                  />
                  <label>
                    {book.isRead ? "Already Read It" : "Haven't Read it yet"}
                  </label>
                </div>
                <div
                  className="erase-book"
                  onClick={() => handleEraseBook(book.id)}
                >
                  Erase book
                </div>
              </div>
            </div>

            <Notes bookId={id} />
          </div>
        ) : (
          <div>
            <p>
              Book not found. Click the button above to go back to the books
              list.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default SingleBookPage;
