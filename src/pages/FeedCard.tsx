import { useState } from "react";
import type { PropsCard } from "../types/feed";

const FeedCard = ({ key, user, onAccept, onIgnore }: PropsCard) => {
  const [action, setAction] = useState<null | "accept" | "ignore">(null);

  const handleAccept = () => {
    setAction("accept");
    setTimeout(onAccept, 300);
  };

  const handleIgnore = () => {
    setAction("ignore");
    setTimeout(onIgnore, 300);
  };

  return (
    <div
      key={key}
      className={`card w-90 bg-base-100 shadow-xl transition-all duration-300
        ${
          action === "accept"
            ? "opacity-0 scale-105 -translate-y-10"
            : action === "ignore"
              ? "opacity-0 rotate-6 translate-y-10"
              : ""
        }
      `}
    >
      {/* Image */}
      <figure className="px-6 pt-6">
        <img
          src={user.photo}
          alt={`${user.firstName} ${user.lastName}`}
          className="rounded-xl h-60 w-full object-cover"
        />
      </figure>

      <div className="card-body text-center">
        {/* Name */}
        <h2 className="card-title justify-center">
          {user.firstName} {user.lastName}
        </h2>

        {/* Joined date */}
        <p className="text-sm opacity-60">
          Joined {new Date(user.createdAt).toLocaleDateString()}
        </p>

        {/* Hobbies */}
        {user.hobbies?.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            {user.hobbies.map((hobby) => (
              <span key={hobby} className="badge badge-outline">
                {hobby}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm opacity-50 mt-3">No hobbies added yet</p>
        )}

        {/* Actions */}
        <div className="card-actions justify-between mt-6">
          <button className="btn btn-outline btn-error" onClick={handleIgnore}>
            ❌ Ignore
          </button>

          <button className="btn btn-primary" onClick={handleAccept}>
            ✅ Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
