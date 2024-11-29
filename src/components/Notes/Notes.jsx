/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addNote, eraseNote, useNotes } from "../../store/notesSlice";

function Notes({ bookId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  let notes = useNotes().filter((note) => note.book_id == bookId);

  const dispatch = useDispatch();

  const handleEraseNote = (id) => {
    if (confirm("Are you sure you want to delete this note?")) {
      dispatch(eraseNote(id));
    }
  };

  const handleSubmitNote = (data) => {
    const noteId = Date.now();
    const newNote = { ...data, book_id: bookId, id: noteId };
    dispatch(addNote(newNote));
    resetField("text");
    resetField("title");
  };

  return (
    <>
      <div className="notes-wrapper">
        <h2>Reader's Notes</h2>
        {notes.length ? (
          <div className="notes">
            {notes.map((note) => (
              <div key={note.id} className="note">
                <div
                  className="erase-note"
                  onClick={() => handleEraseNote(note.id)}
                >
                  Erase note
                </div>
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <span>There's no notes yet</span>
          </div>
        )}
        <details>
          <summary>Add a note</summary>
          <form className="add-note" onSubmit={handleSubmit(handleSubmitNote)}>
            <div className="form-control">
              <label>Title *</label>
              <input
                type="text"
                {...register("title", { required: true })}
                placeholder="Add a note title"
              />
              {errors.title && <span>This field is required</span>}
            </div>
            <div className="form-control">
              <label>Note *</label>
              <textarea
                type="text"
                {...register("text", { required: true })}
                placeholder="Add note"
              />
              {errors.text && <span>This field is required</span>}
            </div>

            <button className="btn btn-block" type="onSubmit">
              Add Note
            </button>
          </form>
        </details>
      </div>
    </>
  );
}

export default Notes;
