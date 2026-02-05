import { useAppSelector } from "./utils/hooks";

 const Navbar = () => {
  const user = useAppSelector((store) => store.user.currentUser);
  console.log(user)
  return (
   <div className="navbar px-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
      {/* Logo */}
      <div className="flex-1">
        <a className="text-xl font-bold tracking-wide flex items-center gap-2 cursor-pointer hover:text-pink-400 transition">
          <span className="text-2xl">👩‍💻</span>
          Dev<span className="text-pink-400">Tinder</span>
        </a>
      </div>

      {/* Right Section */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Username (optional but classy) */}
          <p className="hidden sm:block text-sm text-gray-300">
            Hey, <span className="font-medium text-white">{user.firstName}</span>
          </p>

          {/* Avatar */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle avatar ring ring-pink-400 ring-offset-base-100 ring-offset-2 hover:scale-105 transition"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={
                    user.photo ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            {/* Dropdown */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-xl bg-slate-800 text-gray-200 shadow-xl border border-slate-700"
            >
              <li>
                <a className="hover:bg-slate-700 rounded-lg">
                  👤 Profile
                </a>
              </li>
              <li>
                <a className="hover:bg-slate-700 rounded-lg">
                  ⚙️ Settings
                </a>
              </li>
              <li>
                <a className="hover:bg-red-500/20 text-red-400 rounded-lg">
                  🚪 Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
