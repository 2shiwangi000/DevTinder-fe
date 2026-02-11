import { useState } from "react";
import clsx from "clsx";
import Login from "./Login";
import CreateProfile from "./CreateProfile";

const AuthFlipCard = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="w-96 max-w-[90vw]">
      <div className="card bg-base-100/90 backdrop-blur shadow-2xl rounded-3xl overflow-hidden">
        {/* Header (fake flip) */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold">🔥 DevTinder</h2>
          <p className="text-sm opacity-70">
            {mode === "login"
              ? "Login to match with opportunities"
              : "Create your developer account"}
          </p>
        </div>

        {/* Body (cross fade) */}
        <div className="relative px-6 pb-6 grid">
          {/* Login */}
          <div
            className={clsx(
              "col-start-1 row-start-1 flex flex-col justify-center transition-all duration-300 ease-in-out",
              mode === "login"
                ? "opacity-100 translate-x-0 visible"
                : "opacity-0 -translate-x-6 pointer-events-none invisible",
            )}
          >
            <Login onSwitch={() => setMode("signup")} />
          </div>

          {/* Signup */}
          <div
            className={clsx(
              "col-start-1 row-start-1 transition-all duration-500 ease-in-out",
              mode === "signup"
                ? "opacity-100 translate-x-0 visible"
                : "opacity-0 translate-x-6 pointer-events-none invisible",
            )}
          >
            <CreateProfile onSwitch={() => setMode("login")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFlipCard;
