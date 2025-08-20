import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import type { Store } from "../model/store";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state: Store) => state.connection);
  const fetchConnection = async () => {
    try {
      const result = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(result.data.data));
    } catch (err) {
      console.log("err", err);
    }
  };
  console.log("connections", connections);
  useEffect(() => {
    fetchConnection();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-6rem)] flex flex-col items-center gap-5">
      <h1 className="my-5 text-3xl">Connections</h1>
      <ul className="list bg-base-200 rounded-box shadow-md w-1/2">
        {connections?.length > 0 ? (
          <>
            <li className="p-4 pb-2 text-xs opacity-80 tracking-wide">
              ✨ Congratulations on your new connections!
            </li>
            {connections?.map((connection) => {
              const { fullName, userName, profilePic, _id } = connection;
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
                </li>
              );
            })}
          </>
        ) : (
          <li className="p-4 pb-2 text-xs opacity-80 tracking-wide">
            No connections found!
          </li>
        )}
      </ul>
    </div>
  );
};

export default Connection;
