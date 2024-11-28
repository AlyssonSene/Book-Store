import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

function AddBookPage() {
  const navigate = useNavigate();
  const handleAddBook = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <Header pageTitle={"Add Book"} />

        <form className="add-form">
          <div className="form-control">
            <label>Title *</label>
            <input type="text" name="title" placeholder="Add Book Title" />
          </div>
          <div className="form-control">
            <label>Book Cover *</label>
            <input type="text" name="cover" placeholder="Add Cover" />
          </div>

          <div className="form-control">
            <label>Author *</label>
            <input type="text" name="author" placeholder="Add Author" />
          </div>

          <div className="form-control">
            <label>Synopsis *</label>
            <textarea
              type="text"
              name="synopsis"
              placeholder="Add a synopsis..."
            />
          </div>

          <button onClick={(e) => handleAddBook(e)} className="btn btn-block">
            Save Book
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBookPage;
