import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../utils/hooks";
import Avatar from "../components/common/Avatar";
import type { User } from "../types/user";
import type { chat } from "../types/chat";

const Chat = ({ activeUser }: { activeUser: User }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<chat[]>([]);
  console.log(messages);
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
    const chatMessages = await 
  }

  useEffect(() => {
    if (!userID) return;
    console.log("joining chat ...");
    //as soon as the page loads,socket connection is made and joinchat event is emitted
    socket.emit("joinChat", { firstName: user?.firstName, userId: userID, id });

    socket.on("messageReceived", ({ id, firstName, message }) => {
      console.log(message + "by -" + firstName);
      setMessages((messages) => [...messages, { id, firstName, message }]);
    });

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
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${
              msg.firstName === activeUser.firstName ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">{msg.message}</div>
          </div>
        ))}
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
