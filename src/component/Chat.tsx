import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import type { chatMessage, Store } from "../model/store";

const Chat = () => {
  const { toUserId } = useParams();

  const user = useSelector((state: Store) => state.user);
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<chatMessage[]>([]);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, toUserId, fullName: user?.fullName });

    socket.on("messageRecieved", (messagePayload: chatMessage) => {
      setChats((prev) => [...prev, messagePayload]);
      console.log("messagePayload", messagePayload);
    });

    return () => {
      socket.disconnect();
    };
  }, [toUserId, userId]);

  console.log("chats", chats);
  const handleSend = () => {
    if (!message) {
      alert("please write something :)");
    } else {
      const socket = createSocketConnection();
      const messagePayload = {
        userId,
        toUserId,
        user: {
          fullName: user?.fullName,
          userName: user?.userName,
          profilePic: user?.profilePic,
        },
        timeStamp: Date.now(),
        message,
      };

      socket.emit("sendMessage", { messagePayload });
      setMessage("");
    }
  };

  const isSelf = (id: string) => {
    return id === userId;
  };

  return (
    <div className="flex justify-center items-center h-[800px]">
      <div className="w-[700px]  h-[530px] border border-gray-700 rounded-2xl p-5 bg-base-200 ">
        <div className="h-[450px] overflow-y-auto">
          {chats.length > 0 &&
            chats?.map((chat: chatMessage, index) => {
              return (
                <div
                  className={`chat ${
                    isSelf(chat?.userId) ? "chat-end" : "chat-start"
                  }`}
                  key={index}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={chat?.user?.profilePic}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {chat?.user.fullName}
                    <time className="text-xs opacity-50">
                      {new Date(chat?.timeStamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <div className="chat-bubble">{chat?.message}</div>
                </div>
              );
            })}
        </div>
        <div className="flex gap-2 mt-2  w-full">
          <input
            type="text"
            value={message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            placeholder="Enter message here..."
            className="input w-[90%]"
          />
          <button className="btn btn-primary" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
