import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../utils/hooks";
import Avatar from "../components/common/Avatar";
import type { User } from "../types/user";
import type { chat } from "../types/chat";
import { getChats } from "../service/chat";
import { formatTime } from "../utils/utils";

const Chat = ({ activeUser }: { activeUser: User }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<chat[]>([]);
  const { id } = useParams();
  const user = useAppSelector((store) => store.user.currentUser);
  const userID = user?._id;
  const socket = createSocketConnection();

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId: userID,
      id,
      message: message,
    });
    setMessage("");
  };

  const fetchChatMessages = async () => {
    await getChats({ id: id }).then((res) => {
      console.log(res);
      if (res?.data?.messages) {
        const messagesToMap = res.data.messages.map((msg: any) => {
          const { message, createdAt, senderId, _id } = msg;
          return {
            message,
            createdAt,
            senderId: senderId._id,
            _id,
          };
        });
        setMessages(messagesToMap);
      } else {
        setMessages([]);
      }
    });
  };

  useEffect(() => {
    if (!userID) return;
    console.log("joining chat ...");
    //as soon as the page loads,socket connection is made and joinchat event is emitted
    socket.emit("joinChat", { firstName: user?.firstName, userId: userID, id });

    socket.on("messageReceived", ({ id, message, senderId, createdAt }) => {
      setMessages((messages) => [
        ...messages,
        { _id: id, senderId, message, createdAt },
      ]);
    });

    fetchChatMessages();

    return () => {
      socket.disconnect();
    };
  }, [userID, id]);

  return (
    <div className="flex flex-col w-full h-full">
      {/* Header */}
      <div className="border-b border-base-300 p-4 flex items-center gap-3">
        <Avatar user={activeUser} size="w-10 h-10 rounded-full" />

        <div>
          <p className="font-semibold">{activeUser.firstName}</p>
          <p className="text-sm text-gray-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          return (
            <div
              key={msg._id}
              className={`chat ${
                msg.senderId === userID ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-bubble flex flex-col">
                <span>{msg.message}</span>
                <span className="text-[10px] opacity-70 mt-1 text-right">
                  {msg.createdAt && formatTime(msg.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="border-t border-base-300 p-4 flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="input input-bordered w-full"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
