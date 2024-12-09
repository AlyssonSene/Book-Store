import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Book from "../components/Book/Book";
import Header from "../components/Header/Header";
import { db } from "../firebase/firebase.config";
import { addBook, useBooks } from "../store/booksSlice";
import { useUsers } from "../store/usersSlice";

function BooksPage() {
  const books = useBooks();
  const dispatch = useDispatch();
  const user = useUsers();

  const pageTitle = "📖 Book List with React Router & Redux Toolkit";
  const q = query(
    collection(db, "Books"),
    where("user_id", "==", user.currentUser.id)
  );

  const { data, isLoading } = useQuery({
    queryKey: ["Get-Books"],
    queryFn: async () => {
      const booksSnapshot = await getDocs(q);
      let bookList = [];
      booksSnapshot.forEach((book) => {
        bookList.push({ ...book.data(), id: book.id });
      });
      return bookList;
    },
  });

  useEffect(() => {
    if (!isLoading) {
      data.forEach(() => dispatch(addBook(...data)));
    }
  }, [data, dispatch, isLoading]);

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
