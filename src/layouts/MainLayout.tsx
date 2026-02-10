import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ProfileCompletionToast from "../components/common/ProfileCompletionToast";
import { useAppSelector } from "../utils/hooks";
import { completion } from "../utils/utils";

interface Props {
  authenticated: boolean;
}

const MainLayout = ({ authenticated }: Props) => {
  const { currentUser } = useAppSelector((store) => store.user);
  const [showToast, setShowToast] = useState(true);

  const fields = {
    hobbies: (currentUser?.hobbies ?? []).length > 0,
    age: !!currentUser?.age,
    about: !!currentUser?.about,
    gender: !!currentUser?.gender,
  };

  const percent = Math.round(completion(fields));

  if (!authenticated) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      {/* Navbar → sticky top */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content → grows & scrolls */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer → bottom only, NOT sticky */}
      <Footer />

      {/* Floating profile completion toast */}
      {showToast && percent > 0 && percent < 100 && (
        <ProfileCompletionToast
          percent={percent}
          onClose={() => {
            setShowToast(false);
          }}
        />
      )}
    </div>
  );
};

export default MainLayout;
