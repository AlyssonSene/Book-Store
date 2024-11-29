import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { addBook } from "../store/booksSlice";

function AddBookPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
              autoFocus
              type="text"
              {...register("title", { required: true })}
              placeholder="Add Book Title"
            />
            {errors.title && <span>This field is required</span>}
          </div>
          <div className="form-control">
            <label>Book Cover *</label>
            <input
              type="text"
              {...register("cover", {
                required: true,
              })}
              placeholder="Add Cover"
            />
            {errors.cover && <span>This field is required</span>}
          </div>

          <div className="form-control">
            <label>Author *</label>
            <input
              type="text"
              {...register("author", { required: true })}
              placeholder="Add Author"
            />
            {errors.author && <span>This field is required</span>}
          </div>

          <div className="form-control">
            <label>Synopsis *</label>
            <textarea
              type="text"
              placeholder="Add a synopsis..."
              {...register("synopsis", { required: true })}
            />
            {errors.synopsis && <span>This field is required</span>}
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
