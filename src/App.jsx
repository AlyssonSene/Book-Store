import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUsers } from "./store/usersSlice.js";
import AddBookPage from "./views/AddBookPage.jsx";
import BooksPage from "./views/BooksPage.jsx";
import LoginPage from "./views/LoginPage.jsx";
import SingleBookPage from "./views/SingleBookPage.jsx";

function App() {
  const queryClient = new QueryClient();
  const users = useUsers();
  return (
    <>
      {users.currentUser ? (
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route index element={<BooksPage />} />
              <Route path="add-book" element={<AddBookPage />} />
              <Route path="book/:id" element={<SingleBookPage />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
