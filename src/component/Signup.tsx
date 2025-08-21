import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { AppError } from "../model/common";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    gender: "",
    profilePic: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", user, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      navigate("/profile");
      toast.success("Signed up successfully", {
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
          <h2 className="card-title flex justify-center">Sign Up</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Full Name</legend>
            <input
              type="text"
              value={user?.fullName}
              name="fullName"
              onChange={handleChange}
              className="input"
              placeholder="Full Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">User Name</legend>
            <input
              type="text"
              value={user?.userName}
              name="userName"
              onChange={handleChange}
              className="input"
              placeholder="User Name"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Phone no</legend>
            <input
              type="text"
              value={user?.phone}
              name="phone"
              onChange={handleChange}
              className="input"
              placeholder="Phone no"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              value={user?.email}
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
              value={user?.password}
              name="password"
              onChange={handleChange}
              className="input"
              placeholder="Password"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              value={user?.age}
              name="age"
              onChange={handleChange}
              className="input"
              placeholder="Age"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Profile Pic</legend>
            <input
              type="text"
              value={user?.profilePic}
              name="profilePic"
              onChange={handleChange}
              className="input"
              placeholder="Profile Pic"
            />
          </fieldset>
          <fieldset className="fieldset flex gap-2">
            <legend className="fieldset-legend">Select Gender</legend>

            <label className="label cursor-pointer gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                className="radio radio-info radio-sm"
                checked={user.gender === "male"}
                onChange={handleChange}
              />
              <span className="label-text">Male</span>
            </label>

            <label className="label cursor-pointer gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                className="radio radio-info radio-sm"
                checked={user.gender === "female"}
                onChange={handleChange}
              />
              <span className="label-text">Female</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                type="radio"
                name="gender"
                value="other"
                className="radio radio-info radio-sm"
                checked={user.gender === "other"}
                onChange={handleChange}
              />
              <span className="label-text">Other</span>
            </label>
          </fieldset>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
