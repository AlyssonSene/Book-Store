import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBookPage from "./views/AddBookPage.jsx";
import BooksPage from "./views/BooksPage.jsx";
import SingleBookPage from "./views/SingleBookPage.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/add-book" element={<AddBookPage />} />
          <Route path="/book/:id" element={<SingleBookPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
