import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";
import React from "react";
import Settings from "./pages/settings";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";

function App() {
  //  React.useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") || "dark";
  //   document.documentElement.setAttribute("data-theme", savedTheme);
  // }, []);
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout authenticated={false} />}>
        <Route path="/login" element={<Login />} />
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
