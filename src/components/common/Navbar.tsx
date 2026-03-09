import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../service/auth";
import { useAppSelector } from "../../utils/hooks";
import { removeUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../store/slices/feedSlice";
import { removeConnections } from "../../store/slices/connectionSlice";
import { getRequestCount, removeReq } from "../../store/slices/requestSlice";
import { useState } from "react";
import { getAllConnectionRequestCount } from "../../service/user";
import Avatar from "./Avatar";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useAppSelector((store) => store.user.currentUser);
  const { currentReqCount } = useAppSelector((store) => store.request);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: any) => {
    e.stopPropagation();
    logout().then((res) => {
      if (res?.code === 200) {
        dispatch(removeUser());
        dispatch(removeFeed());
        dispatch(removeConnections());
        dispatch(removeReq());
        navigate("/login");
      }
    });
  };
  const handleDropdownToggle = async () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      await getAllConnectionRequestCount().then((res) => {
        if (res?.code === 200) {
          dispatch(getRequestCount(res?.count));
        }
      });
    }
  };

  return (
    <div className="navbar px-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
      {/* Logo */}
      <div className="flex-1">
        <Link
          className="text-xl font-bold tracking-wide flex items-center gap-2 cursor-pointer hover:text-pink-400 transition"
          to="/feed"
        >
          <span className="text-2xl">👩‍💻</span>
          Dev<span className="text-pink-400">Tinder</span>
        </Link>
      </div>

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Username (optional but classy) */}
          <p className="hidden sm:block text-sm text-gray-300">
            Hey,{" "}
            <span className="font-medium text-white">{user.firstName}</span>
          </p>

          {/* Avatar */}
          <div className="dropdown dropdown-end" onClick={handleDropdownToggle}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle avatar ring ring-pink-400 ring-offset-base-100 ring-offset-2 hover:scale-105 transition"
            >
              <Avatar user={user} size="w-10 h-full rounded-full" avatarSize="font-semibold"/>
              {/* <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={
                    user.photo ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div> */}
            </div>

            {/* Dropdown */}
            <ul className="menu menu-sm dropdown-content mt-3 w-56 rounded-xl bg-slate-800 text-gray-200 shadow-xl border border-slate-700">
              <li>
                <Link to="/profile" className="hover:bg-slate-700 rounded-lg">
                  👤 Profile
                </Link>
              </li>

              <div className="divider my-1" />

              <li>
                <Link
                  to="/connections"
                  className="hover:bg-slate-700 rounded-lg"
                >
                  🤝 Connections
                </Link>
              </li>

              <li>
                <Link
                  to="/requests"
                  className="flex justify-between items-center hover:bg-slate-700 rounded-lg"
                >
                  <span>💬 Requests</span>
                  {currentReqCount > 0 && (
                    <span className="badge badge-info badge-sm">
                      {currentReqCount}
                    </span>
                  )}
                </Link>
              </li>

              <div className="divider my-1" />

              <li>
                <Link to="/settings" className="hover:bg-slate-700 rounded-lg">
                  ⚙️ Settings
                </Link>
              </li>

              <li>
                <Link
                  to="/premium"
                  className="hover:bg-yellow-500/10 text-yellow-400 rounded-lg transition"
                >
                  👑 Premium
                </Link>
              </li>

              <li>
                <button
                  onClick={handleClick}
                  className="hover:bg-red-500/20 text-red-400 rounded-lg text-left"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
