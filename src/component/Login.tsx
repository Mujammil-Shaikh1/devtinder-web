import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import type { AppError } from "../model/common";

interface login {
  email: string;
  password: string;
}

const Login = () => {
  const [login, setLogin] = useState<login>({
    email: "rajatpatidar@gmail.com",
    password: "Rajat@123456",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const { name, value } = target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const result = await axios.post(BASE_URL + "/login", login, {
        withCredentials: true,
      });
      dispatch(addUser(result.data));
      navigate("/");
      toast.success("Logged in successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (err) {
      const error = err as AppError;
      console.log("Errro", error);
      toast.error(error?.response?.data, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              value={login?.email}
              name="email"
              onChange={handleChange}
              className="input"
              placeholder="Email Id"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={login?.password}
              name="password"
              onChange={handleChange}
              className="input"
              placeholder="Password"
            />
          </fieldset>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
