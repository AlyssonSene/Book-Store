import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { setUser } from "../../store/usersSlice";

/* eslint-disable react/prop-types */
function Header({ pageTitle }) {
  const dispatch = useDispatch();
  const logout = () => {
    signOut(auth);
    dispatch(setUser(null));
  };

  return (
    <>
      <h1>{pageTitle}</h1>

      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Books</button>
        </NavLink>
        <NavLink to="/add-book">
          <button className="btn">Add Book +</button>
        </NavLink>
        <button onClick={logout} className="btn">
          Logout
        </button>
      </div>
    </>
  );
}

export default Header;
