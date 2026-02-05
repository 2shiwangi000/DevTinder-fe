import React, { useState } from "react";
import { validateEmail, validatePassword } from "../utils/validators";
import { login } from "../service/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./common/NotificationContext";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showAlert } = useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      console.log(res);
      if (res?.code === 200) {
        showAlert(res?.message, "success");
        dispatch(addUser(res?.data));
        navigate("/");
      } else {
        showAlert(res?.message || "Invalid credentials", "error");
      }
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"
    >
      <div className="card w-96 bg-base-100/90 backdrop-blur shadow-2xl rounded-3xl">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold">🔥 DevTinder</h2>
            <p className="text-sm opacity-70">
              Login to match with opportunities
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="input input-bordered flex items-center gap-2 rounded-full">
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            {errors.email && (
              <p className="text-error text-xs mt-1 ml-2">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="input input-bordered flex items-center gap-2 rounded-full">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {errors.password && (
              <p className="text-error text-xs mt-1 ml-2">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <button
            className="btn rounded-full text-white border-0 
  bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            Login
          </button>

          {/* Footer */}
          <p className="text-center text-sm opacity-70">
            New here?{" "}
            <span className="link link-hover text-pink-500">
              Create account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
