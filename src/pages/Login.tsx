import { FiEye, FiEyeOff } from "react-icons/fi";
import React, { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validators";
import { login } from "../service/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
const Login = ({ onSwitch }: { onSwitch: () => void }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) return;

    login(email, password).then((res) => {
      if (res?.code === 200) {
        showAlert(res?.message, "success");
        dispatch(addUser(res?.data));
        navigate("/");
        setShowPassword(false);
      } else {
        showAlert(res?.message || "Invalid credentials", "error");
      }
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <input
          className="input input-bordered rounded-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {errors.email && (
          <p className="text-error text-xs mt-1 ml-2">{errors.email}</p>
        )}
      </div>
      <div className="relative">
        <input
          className="input input-bordered rounded-full"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={`absolute right-6 ${errors.password ? "top-1/3" : "top-1/2"} -translate-y-1/2 text-gray-400 hover:text-gray-200 transition`}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
        {errors.password && (
          <p className="text-error text-xs mt-1 ml-2">{errors.password}</p>
        )}
      </div>

      <button
        className="btn rounded-full text-white border-0
    bg-gradient-to-r from-indigo-500 to-purple-600"
      >
        Login
      </button>
      <div
        className="mt-3 flex flex-col items-center gap-2 
  text-xs text-white/70"
      >
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-pink-400" />
          <span>Match with developers & recruiters</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-purple-400" />
          <span>No spam · No noise · Developer-first</span>
        </div>
      </div>

      <p
        onClick={onSwitch}
        className="text-center text-sm opacity-70 cursor-pointer"
      >
        New here? <span className="text-pink-500">Create account</span>
      </p>
    </form>
  );
};

export default Login;
