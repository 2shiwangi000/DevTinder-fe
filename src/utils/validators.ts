// utils/validators.ts
export const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const validateEmail = (email: string) => {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email address";
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "Password is required";
  if (!passwordRegex.test(password))
    return "Password must contain 8+ chars, uppercase, lowercase & number";
  return "";
};
