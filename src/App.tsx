import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";
import Settings from "./pages/settings";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";
import AuthFlipCard from "./pages/AuthFlipCard";

function App() {
  //  React.useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") || "dark";
  //   document.documentElement.setAttribute("data-theme", savedTheme);
  // }, []);
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout authenticated={false} />}>
        <Route path="/login" element={<div
  className="min-h-screen flex items-center justify-center
  bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"
><AuthFlipCard /></div>} />
         {/* <Route path="/create-account" element={<CreateProfile/>} /> */}
      </Route>

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout authenticated />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
      </Route>
    </Routes>
  );
}

export default App;
