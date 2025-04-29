import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import { useAuthStore } from "./store/auth.store";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import Register from "./pages/signup.jsx";
import Login from "./pages/loginPage.jsx";
import Jobs from "./pages/jobs.jsx";
import PostJob from "./pages/postJob.jsx";
import AdminDashboard from "./pages/adminDashboard.jsx";
import { useEffect, useState } from "react";
import Logout from "./pages/logout.jsx";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUserInfo(storedUserInfo);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while userInfo is being fetched
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/contact" element={<div>Contact</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route
          path="/admin"
          element={
            userInfo?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
