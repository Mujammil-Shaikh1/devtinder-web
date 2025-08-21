import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import type { RequestType, Store } from "../model/store";

const Request = () => {
  const requests = useSelector((state: Store) => state.request);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data));
  };

  const handleRequest = async (status: string, id: string) => {
    try {
      axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-6rem)] flex flex-col items-center gap-5">
      <h1 className="my-5 text-3xl">Requests</h1>
      <ul className="list bg-base-200 rounded-box shadow-md w-1/2">
        {requests?.length > 0 ? (
          <>
            <li className="p-4 pb-2 text-xs opacity-80 tracking-wide">
              ✨ Congratulations on your new connections!
            </li>
            {requests?.map((request: RequestType) => {
              const { fullName, userName, profilePic, _id } =
                request.fromUserId;
              return (
                <li className="list-row" key={_id}>
                  <div>
                    <img className="size-10 rounded-full" src={profilePic} />
                  </div>
                  <div>
                    <div>{fullName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      @{userName}
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn  btn-primary btn-sm"
                    onClick={() => handleRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </li>
              );
            })}
          </>
        ) : (
          <li className="p-4 pb-2 text-xs opacity-80 tracking-wide">
            No request found!
          </li>
        )}
      </ul>
    </div>
  );
};

export default Request;
