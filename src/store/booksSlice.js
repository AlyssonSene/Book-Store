import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const booksSlice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    addBook: (books, action) => {
      const bookExists = books.some((book) => book.id === action.payload.id);
      if (!bookExists) {
        books.push(action.payload);
      }
    },
    eraseBook: (books, action) => {
      return books.filter((book) => book.id !== action.payload);
    },
    toogleIsRead: (books, action) => {
      books.map((book) => {
        if (book.id === action.payload) {
          book.isRead = !book.isRead;
        }
      });
    },
  },
});

export const { addBook, eraseBook, toogleIsRead } = booksSlice.actions;

const selectBooks = (state) => state.books;

export default booksSlice.reducer;

export const useBooks = () => {
  const books = useSelector(selectBooks);
  return books;
};
