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
      className={`card w-96 bg-base-100 shadow-2xl transition-all duration-300
    ${
      action === "accept"
        ? "opacity-0 scale-105 -translate-y-10"
        : action === "ignore"
          ? "opacity-0 rotate-6 translate-y-10"
          : "hover:scale-[1.02]"
    }
  `}
    >
      {/* Image */}
      <figure className="relative">
        <img
          src={user.photo}
          alt={`${user.firstName} ${user.lastName}`}
          className="h-72 w-full object-cover"
        />

        {/* Gender badge (top-right) */}
        {user.gender && (
          <span
            className={`absolute top-3 right-3 badge badge-sm capitalize
          ${
            user.gender === "male"
              ? "badge-info"
              : user.gender === "female"
                ? "badge-secondary"
                : "badge-accent"
          }
        `}
          >
            {user.gender}
          </span>
        )}
      </figure>

      <div className="card-body text-center">
        {/* Name + age */}
        <h2 className="text-2xl font-bold">
          {user.firstName} {user.lastName}
          {user.age && (
            <span className="text-base font-normal opacity-60">
              {" "}
              · {user.age}
            </span>
          )}
        </h2>

        {/* About (short preview) */}
        {user.about && (
          <p className="text-sm opacity-70 line-clamp-2 mt-1">{user.about}</p>
        )}

        {/* Hobbies */}
        {user.hobbies?.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {user.hobbies.slice(0, 3).map((hobby) => (
              <span key={hobby} className="badge badge-outline badge-sm">
                {hobby}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center gap-4 mt-8">
          <button
            onClick={handleIgnore}
            className="btn btn-outline btn-error flex-1 hover:scale-105 transition"
          >
            ❌ Skip
          </button>

          <button
            onClick={handleAccept}
            className="btn btn-primary flex-1 hover:scale-105 transition"
          >
            🤝 Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
