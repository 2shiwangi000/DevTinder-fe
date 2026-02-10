import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, signup } from "../service/auth";
import { useNotification } from "../context/NotificationContext";
import { addUser } from "../store/slices/userSlice";
import { useAppDispatch } from "../utils/hooks";

const CreateProfile = ({ onSwitch }: { onSwitch: () => void }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showAlert } = useNotification();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [autoLogin, setAutoLogin] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    // basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    // if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.emailId) newErrors.emailId = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    signup(formData).then((res) => {
      if (res?.code === 200) {
        showAlert(res?.message, "success");
        setTimeout(() => {
          if (autoLogin) {
            login(formData?.emailId, formData?.password).then((res) => {
              if (res?.code === 200) {
                //   showAlert(res?.message, "success");
                dispatch(addUser(res?.data));
                navigate("/");
              } else {
                showAlert(res?.message || "Invalid credentials", "error");
              }
            });
          } else {
            onSwitch();
          }
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
        showAlert(res?.message, "error");
      }
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <input
          name="firstName"
          className="input input-bordered rounded-full"
          placeholder="First name"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && (
          <p className="text-error text-xs ml-2">{errors.firstName}</p>
        )}
      </div>
      <div>
        <input
          name="lastName"
          className="input input-bordered rounded-full"
          placeholder="Last name"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && (
          <p className="text-error text-xs ml-2">{errors.lastName}</p>
        )}
      </div>

      <div>
        {" "}
        <input
          name="emailId"
          type="email"
          className="input input-bordered rounded-full"
          placeholder="Email"
          value={formData.emailId}
          onChange={handleChange}
        />
        {errors.emailId && (
          <p className="text-error text-xs ml-2">{errors.emailId}</p>
        )}
      </div>

      <div>
        {" "}
        <input
          name="password"
          type="password"
          className="input input-bordered rounded-full"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-error text-xs ml-2">{errors.password}</p>
        )}
      </div>
      <label className="flex items-center gap-2 text-sm opacity-70 cursor-pointer">
        <input
          type="checkbox"
          className="checkbox checkbox-sm checkbox-primary"
          checked={autoLogin}
          onChange={(e) => setAutoLogin(e.target.checked)}
        />
        <span>Log me in automatically after signup</span>
      </label>

      <button
        disabled={loading}
        type="submit"
        className="btn rounded-full text-white border-0
  bg-gradient-to-r from-indigo-500 to-purple-600"
      >
        Create Account
      </button>

      <p
        onClick={!loading ? onSwitch : undefined}
        className={`text-center text-sm opacity-70
    ${loading ? "cursor-not-allowed opacity-40" : "cursor-pointer"}
  `}
      >
        Already have an account? <span className="text-pink-500">Login</span>
      </p>
    </form>
  );
};

export default CreateProfile;
