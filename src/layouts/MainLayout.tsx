import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

interface Props {
  authenticated: boolean;
}

const MainLayout = ({ authenticated }: Props) => {
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
    </div>
  );
};

export default MainLayout;
