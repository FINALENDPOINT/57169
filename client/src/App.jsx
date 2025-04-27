import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Breadcrumps from "./components/Breadcrumps";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Student_News from "./pages/Student_News/Student_News";
import StudentNews_Category from "./pages/Student_News/StudentNews_Category";
import Suara_Unteyo_Mahasiswa from "./pages/Suara_Unteyo_Mahasiswa/Suara_Unteyo_Mahasiswa"
import Student_News_Article from "./pages/Student_News/Student_News_Article"
import Youtube from "./pages/Youtube/Youtube"
import Youtube_Category from "./pages/Youtube/Youtube_Category"
import Youtube_Article from "./pages/Youtube/Youtube_Article"
import axios from "axios";
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navbar />
      <Breadcrumps/>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />}></Route>
        {/* User */}
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* Menu */}
        <Route path="/StudentNews" element={<Student_News />}></Route>
        <Route path="/StudentNews?category=Sosial" element={<Student_News />}></Route>
        <Route path="/StudentNews/:category" element={<StudentNews_Category/>}></Route>
        <Route path="/StudentNews/:category/:title" element={<Student_News_Article/>}></Route>
        <Route path="/SuaraUnteyo&Mahasiswa" element={<Suara_Unteyo_Mahasiswa/>}></Route>
        {/* StudentNews */}
        {/* Youtube */}
        <Route path="/Youtube" element={<Youtube/>}></Route>
        <Route path="/Youtube/:category" element={<Youtube_Category/>}></Route>
        <Route path="/Youtube/:category/:title" element={<Youtube_Article/>}></Route>
      </Routes>
    </>
  );
}

export default App;
