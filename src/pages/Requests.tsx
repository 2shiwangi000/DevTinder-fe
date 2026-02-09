import React, { useEffect } from "react";
import { getAllConnectionRequest } from "../service/user";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { appendReq } from "../store/slices/requestSlice";
import type { User } from "../types/user";

const Requests = () => {
  const dispatch = useAppDispatch();
  const { currentReq } = useAppSelector((state) => state.request);

  const getAllRequests = async () => {
    await getAllConnectionRequest().then((res) => {
      if (res) {
        dispatch(appendReq(res));
      }
    });
  };

  const handleAccept = (id: string) => {
    // 🔜 API call: accept request
    // dispatch(removeReqById(id));
  };

  const handleReject = (id: string) => {
    // 🔜 API call: reject request
    // dispatch(removeReqById(id));
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  if (!currentReq.length) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400">
        No pending requests ✨
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Connection Requests</h1>

      <div className="space-y-4">
        {currentReq.map((user: User) => {
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
              className="flex items-center gap-4 p-4 bg-base-100 rounded-xl border shadow-sm"
            >
              {/* Avatar */}
              <div className="avatar">
                <div className="w-14 rounded-full">
                  <img src={user.photo} alt={user.firstName} />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="font-semibold">
                  {user.firstName} {user.lastName || ""}
                </p>

                {/* Chips */}
                <div className="flex gap-1 mt-1 flex-wrap">
                  {user.age && (
                    <span className="badge badge-ghost badge-sm">
                      {user.age} yrs
                    </span>
                  )}

                  {user.gender && (
                    <span className={`badge badge-sm ${genderStyle}`}>
                      {user.gender}
                    </span>
                  )}

                  {hobbies.map((hobby) => (
                    <span key={hobby} className="badge badge-outline badge-sm">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => handleReject(user._id)}
                >
                  Reject
                </button>

                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleAccept(user._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
