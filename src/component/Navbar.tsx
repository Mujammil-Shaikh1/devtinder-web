import { useDispatch, useSelector } from "react-redux";
import type { Store } from "../model/store";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const user = useSelector((state: Store) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const result = await axios.post(BASE_URL + "/logout");
      dispatch(removeUser(result.data));
      navigate("/login");
      toast.success("Logged out successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      console.error("err", err);
    }
  };
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            DevTinder
          </Link>
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
                  <Link to="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <span onClick={handleLogout}>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
    </>
  );
};

export default Navbar;
