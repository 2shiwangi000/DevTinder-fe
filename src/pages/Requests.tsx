import React, { useEffect } from "react";
import {
  getAllConnectionRequest,
  reviewConnectionRequest,
} from "../service/user";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { appendReq } from "../store/slices/requestSlice";
import type { User } from "../types/user";
import { useNotification } from "../context/NotificationContext";
import { genderBadgeClass } from "../utils/utils";

const Requests = () => {
  const dispatch = useAppDispatch();
  const { currentReq } = useAppSelector((state) => state.request);
  const { showAlert } = useNotification();

  const getAllRequests = async () => {
    await getAllConnectionRequest().then((res) => {
      if (res?.data) {
        dispatch(appendReq(res?.data));
      }
    });
  };

  const handleAction = (id: string, status: string) => {
    reviewConnectionRequest({
      userid: id,
      status: status,
    }).then((res) => {
      if (res) {
        showAlert(res?.message, status === "rejected" ? "info" : "success");
        getAllRequests();
      } else {
        showAlert(res?.message || "something went wrong", "error");
      }
    });
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
                      {user?.age} yrs
                    </span>
                  )}

                  {user.gender && (
                    <span
                      className={`badge badge-sm ${genderBadgeClass(user?.gender)} capitalize`}
                    >
                      {user?.gender}
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
                  onClick={() => handleAction(user._id, "rejected")}
                >
                  Reject
                </button>

                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleAction(user._id, "accepted")}
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
