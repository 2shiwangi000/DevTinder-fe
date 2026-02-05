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
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
