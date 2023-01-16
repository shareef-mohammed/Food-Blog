import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Posts from "./pages/Posts/Posts";
import SinglePost from "./pages/SinglePost/SinglePost";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminUserMan from "./pages/AdminUserMan/AdminUserMan";
import BannerMan from "./pages/BannerMan/BannerMan";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import RequireAuth from "./features/auth/RequireAuth";
import Layout from "./components/Layout";
import ReportManagement from "./pages/ReportManagement/ReportManagement";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth />}>
          <Route path="/Profile" element={<Profile />} />
          <Route path="/SinglePost/:id" element={<SinglePost />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/Posts" element={<Posts />} />
        <Route path="/Admin/Login" element={<AdminLogin />} />
        <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
        <Route path="/Admin/UserManagement" element={<AdminUserMan />} />
        <Route path="/Admin/BannerManagement" element={<BannerMan />} />
        <Route path="/Admin/ReportManagement" element={<ReportManagement />} />
        <Route path="/User/Login" element={<Login />} />
        <Route path="/User/Register" element={<Register />} />
        <Route path="/User/ForgotPassword" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
