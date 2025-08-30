import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
// import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import type { AppError } from "../model/common";
import type { Store } from "../model/store";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: Store) => state.user);
  const fetchUsers = async () => {
    if (user) return;
    try {
      const user = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (err) {
      const error = err as AppError;
      if (error?.status === 401) {
        navigate("/login");
      }
      console.error("error", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Main;
