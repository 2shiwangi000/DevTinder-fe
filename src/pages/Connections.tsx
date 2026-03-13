import { useEffect, useState } from "react";
import { getAllConnections } from "../service/user";
import {
  addConnections,
  removeConnections,
} from "../store/slices/connectionSlice";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import type { User } from "../types/user";
import { genderBadgeClass } from "../utils/utils";
import Avatar from "../components/common/Avatar";
import Chat from "./Chat";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentConnections } = useAppSelector((state) => state.connections);
  const [activeUser, setActiveUser] = useState<User | null>(null);

  const getAllConnection = async () => {
    const res: any = await getAllConnections();
    if (res?.data) dispatch(addConnections(res.data));
  };

  useEffect(() => {
    getAllConnection();
    return () => {
      dispatch(removeConnections());
    };
  }, []);

  useEffect(() => {
    if (activeUser?._id) navigate(`/connections/${activeUser._id}`);
    else navigate("/connections");
  }, [activeUser]);

  if (!currentConnections?.length) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400 text-lg">
        No connections yet 🤝
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-base-100">
      {/* LEFT SIDEBAR */}
      <aside
        className={`
  ${activeUser ? "hidden md:flex" : "flex"}
  md:w-80 w-full border-r border-base-300 flex-col
`}
      >
        {/* Header */}
        <div className="p-4 font-semibold text-lg border-b border-base-300">
          Connections
        </div>

        {/* Scrollable users */}
        <div className="flex-1 overflow-y-auto">
          {currentConnections.map((user) => {
            const hobbies = user.hobbies?.slice(0, 2) || [];

            return (
              <div
                key={user._id}
                onClick={() => setActiveUser(user)}
                className={`flex gap-3 p-4 cursor-pointer hover:bg-base-200 transition
            ${activeUser?._id === user._id ? "bg-base-200" : ""}`}
              >
                <Avatar
                  user={user}
                  size="w-12 h-12 rounded-full"
                  avatarSize="font-semibold"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {user.firstName} {user.lastName || ""}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.age && (
                      <span className="badge badge-ghost badge-sm">
                        {user.age} yrs
                      </span>
                    )}

                    {user.gender && (
                      <span
                        className={`badge badge-sm ${genderBadgeClass(user.gender)} capitalize`}
                      >
                        {user.gender}
                      </span>
                    )}

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
            );
          })}
        </div>
      </aside>

      {/* RIGHT CHAT SECTION */}
      <section
        className={`
  flex-1 flex flex-col overflow-hidden
  ${activeUser ? "flex" : "hidden md:flex"}
`}
      >
        {activeUser ? (
          <Chat activeUser={activeUser} setActiveUser={setActiveUser} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <span className="text-lg">
              Select a connection to start chatting 💬
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

export default Connections;
