import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import type { ChatMessage, Store } from "../model/store";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { toUserId } = useParams();

  const user = useSelector((state: Store) => state.user);
  const [message, setMessage] = useState<string>("");
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const userId = user?._id;
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, toUserId, fullName: user?.fullName });

    socket.on("messageRecieved", (messagePayload: ChatMessage) => {
      setChats((prev) => [...prev, messagePayload]);
    });

    return () => {
      socket.disconnect();
    };
  }, [toUserId, user?.fullName, userId]);

  const handleSend = () => {
    if (!message) {
      alert("please write something :)");
    } else {
      const socket = createSocketConnection();
      const messagePayload = {
        userId,
        toUserId,
        fullName: user?.fullName,
        userName: user?.userName,
        profilePic: user?.profilePic,
        timeStamp: Date.now(),
        message,
      };

      socket.emit("sendMessage", { messagePayload });
      setMessage("");
    }
  };

  const fetchChats = async () => {
    const messages = await axios.get(BASE_URL + "/chat/" + toUserId, {
      withCredentials: true,
    });
    console.log("messages", messages);
    setChats(messages.data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const isSelf = (id: string) => {
    return id === userId;
  };

  return (
    <div className="flex justify-center items-center h-[800px]">
      <div className="w-[700px]  h-[530px] border border-gray-700 rounded-2xl p-5 bg-base-200 ">
        <div className="h-[450px] overflow-y-auto" ref={chatContainerRef}>
          {chats.length > 0 &&
            chats?.map((chat: ChatMessage, index) => {
              return (
                <div
                  className={`chat ${
                    isSelf(chat?.senderId) ? "chat-end" : "chat-start"
                  }`}
                  key={index}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={chat?.profilePic}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {chat?.fullName}
                    <time className="text-xs opacity-50">
                      {new Date(chat?.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>
                  <div className="chat-bubble w-[300px] break-words">
                    {chat?.message}
                  </div>
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
