import { useState } from "react";
import type { AvatarProps } from "../../types/user";

function Avatar({
  user,
  size = "w-10 h-10",
  avatarSize = "font-semibold",
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`${size} bg-gray-300 flex items-center justify-center overflow-hidden`}
    >
      {!imgError && user?.photo ? (
        <img
          src={user.photo}
          alt="User avatar"
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={`${avatarSize} text-gray-700`}>
          {user?.firstName?.charAt(0).toUpperCase()}
          {user?.lastName?.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}

export default Avatar;
