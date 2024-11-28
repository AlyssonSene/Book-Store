import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { addBook } from "../store/booksSlice";

function AddBookPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const handleBookSubmit = (data) => {
    const id = Date.now();

    dispatch(addBook({ ...data, id, isRead: false }));
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <Header pageTitle={"Add Book"} />

        <form className="add-form" onSubmit={handleSubmit(handleBookSubmit)}>
          <div className="form-control">
            <label>Title *</label>
            <input
              type="text"
              {...register("title")}
              placeholder="Add Book Title"
            />
          </div>
          <div className="form-control">
            <label>Book Cover *</label>
            <input type="text" {...register("cover")} placeholder="Add Cover" />
          </div>

          <div className="form-control">
            <label>Author *</label>
            <input
              type="text"
              {...register("author")}
              placeholder="Add Author"
            />
          </div>

          <div className="form-control">
            <label>Synopsis *</label>
            <textarea
              type="text"
              placeholder="Add a synopsis..."
              {...register("synopsis")}
            />
          </div>

          <button type="submit" className="btn btn-block">
            Save Book
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBookPage;
