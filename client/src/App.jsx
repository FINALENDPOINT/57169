import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Breadcrumps from "./components/Breadcrumps";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Student_News from "./pages/Student_News/Student_News";
import StudentNews_Category from "./pages/Student_News/StudentNews_Category";
import Suara_Unteyo_Mahasiswa from "./pages/Suara_Unteyo_Mahasiswa/Suara_Unteyo_Mahasiswa";
import RegisterAuthor from "./pages/Suara_Unteyo_Mahasiswa/RegisterSUM";
import LoginAuthor from "./pages/Suara_Unteyo_Mahasiswa/LoginSUM";
import DashboardAuthor from "./pages/Suara_Unteyo_Mahasiswa/DashboardSUM";
import Student_News_Article from "./pages/Student_News/Student_News_Article";
import Youtube from "./pages/Youtube/Youtube";
import Youtube_Category from "./pages/Youtube/Youtube_Category";
import Youtube_Article from "./pages/Youtube/Youtube_Article";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Set base URL for axios
axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navbar />
      <Breadcrumps />
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        {/* User */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* reset password */}
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        {/* Menu */}
        <Route path="/StudentNews" element={<Student_News />} />
        {/* Fixed: Remove this problematic route with query param */}
        {/* <Route path="/StudentNews?category=Sosial" element={<Student_News />} /> */}
        <Route
          path="/StudentNews/:category"
          element={<StudentNews_Category />}
        />
        <Route
          path="/StudentNews/:category/:title"
          element={<Student_News_Article />}
        />
        <Route
          path="/SuaraUnteyo&Mahasiswa"
          element={<Suara_Unteyo_Mahasiswa />}
        />
        <Route path="/registerAuthor" element={<RegisterAuthor />} />
        <Route path="/loginAuthor" element={<LoginAuthor />} />
        <Route path="/dashboard-author" element={<DashboardAuthor />} />
        {/* Youtube */}
        <Route path="/Youtube" element={<Youtube />} />
        <Route path="/Youtube/:category" element={<Youtube_Category />} />
        <Route path="/Youtube/:category/:title" element={<Youtube_Article />} />
      </Routes>
    </>
  );
}

export default App;
