import { useDispatch, useSelector } from "react-redux";
import type { Store } from "../model/store";
import axios from "axios";
import { useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await axios.post("http://localhost:4000/logout");
      dispatch(removeUser(result.data));
      navigate("/login");
    } catch (err) {
      console.error("err", err);
    }
  };
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">DevTinder</a>
      </div>
      {user && (
        <div className="flex gap-1 items-center">
          <h1>Welcome, {user?.fullName}</h1>
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.profilePic}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
