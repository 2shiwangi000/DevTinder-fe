import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { useAppDispatch } from "../utils/hooks";
import { addUser, removeUser } from "../store/slices/userSlice";
import { userGetByID } from "../service/user";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verify = async () => {
      const res = await userGetByID();

      if (res.authenticated && res?.user?.code === 200) {
        dispatch(addUser(res.user?.data));
        setAllowed(true);
      } else {
        dispatch(removeUser());
        setAllowed(false);
      }

      setLoading(false);
    };

    verify();
  }, [dispatch]);

  if (loading) return null; // or spinner
  if (!allowed) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
