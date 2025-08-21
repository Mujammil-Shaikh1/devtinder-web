import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getFeed, removeFeed } from "../utils/feedSlice";
import type { AppError } from "../model/common";
import { toast } from "react-toastify";
import { useEffect } from "react";
import type { Store } from "../model/store";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state: Store) => state?.feed);
  const fetchFeed = async () => {
    try {
      const feed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(getFeed(feed?.data));
    } catch (err) {
      const error = err as AppError;
      toast.error(error?.response?.data, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  const handleUser = async (status: string, id: string) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (err) {
      console.error("err", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-6rem)] flex justify-center items-center">
      {feed.length > 0 ? (
        <div className="m-5">
          <UserCard user={feed[0]} handleUser={handleUser} />
        </div>
      ) : (
        <div>No Users found</div>
      )}
    </div>
  );
};

export default Feed;
