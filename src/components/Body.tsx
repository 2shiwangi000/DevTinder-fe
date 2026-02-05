import React, { useEffect } from "react";
import Navbar from "./common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { userGetByID } from "../service/user";
import { addUser } from "../store/slices/userSlice";

const Body = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.currentUser);

  useEffect(() => {
    if (user) return;
    userGetByID().then((res) => {
      if (res?.code === 200) {
        dispatch(addUser(res?.data));
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
