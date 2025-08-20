import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Store } from "../model/store";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import type { AppError } from "../model/common";

const Profile = () => {
  const profile = useSelector((state: Store) => state?.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    fullName: profile?.fullName,
    userName: profile?.userName,
    profilePic: profile?.profilePic,
    age: profile?.age,
    gender: profile?.gender,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const result = await axios.patch(BASE_URL + "/profile/edit", user, {
        withCredentials: true,
      });
      dispatch(addUser(result.data));
      toast.success("Profile updated successfully", {
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
    <div className="flex justify-center gap-20 h-auto items-center overflow-y-auto">
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <div className="card card-border bg-base-200 w-96">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile</h2>
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
              <legend className="fieldset-legend">Username</legend>
              <input
                type="text"
                value={user?.userName}
                name="userName"
                onChange={handleChange}
                className="input"
                placeholder="Username"
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
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="number"
                value={user?.age}
                name="age"
                onChange={handleChange}
                className="input"
                placeholder="Age"
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
              <button className="btn btn-primary" onClick={handleSubmit}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={user} hideButton={true} />
    </div>
  );
};

export default Profile;
