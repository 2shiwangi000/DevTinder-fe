import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, text: "Hey! How are you?", sender: "them" },
    { id: 2, text: "I'm good! What about you?", sender: "me" },
    { id: 3, text: "Doing great 😊", sender: "them" },
  ];

  return (
    <div className="flex flex-col w-full h-full">

      {/* Header */}
      <div className="border-b border-base-300 p-4 flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>

        <div>
          <p className="font-semibold">User Name</p>
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
            <div className="chat-bubble">
              {msg.text}
            </div>
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

        <button className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;