import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../utils/hooks";
import Avatar from "../components/common/Avatar";
import type { User } from "../types/user";

const Chat = ({ activeUser }: { activeUser: User }) => {
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const user = useAppSelector((store) => store.user.currentUser);
  const userID = user?._id;
  const socket = createSocketConnection();

  const messages = [
    { id: 1, text: "Hey! How are you?", sender: "them" },
    { id: 2, text: "I'm good! What about you?", sender: "me" },
    { id: 3, text: "Doing great 😊", sender: "them" },
  ];

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userID,
      id,
      message: message,
    });
  };

  useEffect(() => {
    if (!userID) return;
    //as soon as the page loads,socket connection is made and joinchat event is emitted
    socket.emit("joinChat", { firstName: user?.firstName, userID, id });

    socket.on("messageReceived", ({ firstName, message }) => {
      console.log(firstName + ":" + message);
    });

    // return () => {
    //   socket.disconnect();
    // };
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
              msg.sender === "me" ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-bubble">{msg.text}</div>
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
