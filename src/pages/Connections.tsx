import React, { useEffect, useState } from "react";
import { getAllConnections } from "../service/user";
import { addConnections } from "../store/slices/connectionSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import type { User } from "../types/user";

const Connections = () => {
  const dispatch = useAppDispatch();
  const { currentConnections } = useAppSelector((state) => state.connections);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const getAllConnection = async () => {
    await getAllConnections().then((res: any) => {
      if (res?.data) {
        dispatch(addConnections(res?.data));
      }
    });
  };

  useEffect(() => {
    getAllConnection();
  }, []);

  if (!currentConnections?.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        No connections yet 🤝
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-base-100">
      {/* LEFT: Connections list */}
      <aside className="w-80 border-r border-base-300 overflow-y-auto">
        <h2 className="p-4 font-semibold text-lg">Connections</h2>

        {currentConnections?.map((user) => {
          const metaParts = [
            user.age && `${user.age}`,
            user.gender && user.gender,
            user.hobbies?.slice(0, 2).join(", "),
          ].filter(Boolean);
          const hobbies = user.hobbies?.slice(0, 2) || [];

          const genderStyle =
            user.gender === "male"
              ? "badge-info"
              : user.gender === "female"
                ? "badge-secondary"
                : "badge-accent";

          return (
            <div
              key={user._id}
              onClick={() => setActiveUser(user)}
              className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-base-200 transition
        ${activeUser?._id === user._id ? "bg-base-200" : ""}
      `}
            >
              {/* Info */}
              <div
                key={user._id}
                onClick={() => setActiveUser(user)}
                className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-base-200 transition
    ${activeUser?._id === user._id ? "bg-base-200" : ""}
  `}
              >
                {/* Avatar */}
                <div className="avatar mt-1">
                  <div className="w-12 rounded-full">
                    <img
                      src={
                        user.photo ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt={user.firstName}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {/* Name */}
                  <p className="font-medium truncate">
                    {user.firstName} {user.lastName || ""}
                  </p>

                  {/* Chips row */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {/* Age */}
                    {user.age && (
                      <span className="badge badge-ghost badge-sm">
                        {user.age} yrs
                      </span>
                    )}

                    {/* Gender */}
                    {user.gender && (
                      <span className={`badge badge-sm ${genderStyle}`}>
                        {user.gender}
                      </span>
                    )}

                    {/* Hobbies */}
                    {hobbies.map((hobby) => (
                      <span
                        key={hobby}
                        className="badge badge-outline badge-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </aside>

      {/* RIGHT: Chat window (placeholder) */}
      <section className="flex-1 flex items-center justify-center text-gray-400">
        {activeUser ? (
          <span>
            Chat with{" "}
            <span className="font-semibold">{activeUser.firstName}</span>
          </span>
        ) : (
          <span>Select a connection to start chatting 💬</span>
        )}
      </section>
    </div>
  );
};

export default Connections;
