import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Student_News from "./pages/Student_News/Student_News";
import Suara_Unteyo_Mahasiswa from "./pages/Suara_Unteyo_Mahasiswa/Suara_Unteyo_Mahasiswa"
import Youtube from "./pages/Youtube/Youtube"
import axios from "axios";
import Sosial from "./pages/Student_News/kategori/Sosial"
import Hiburan from "./pages/Student_News/kategori/Hiburan"
import Bisnis from "./pages/Student_News/kategori/Bisnis"
import Lifestyle from "./pages/Student_News/kategori/Lifestyle"
import Olahraga from "./pages/Student_News/kategori/Olahraga"
import { Toaster } from "react-hot-toast";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />}></Route>
        {/* User */}
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* Menu */}
        <Route path="/StudentNews/category" element={<Student_News />}></Route>
        <Route path="/StudentNews/category?category=Sosial" element={<Student_News />}></Route>
        <Route path="/SuaraUnteyo&Mahasiswa" element={<Suara_Unteyo_Mahasiswa/>}></Route>
        <Route path="/Youtube" element={<Youtube/>}></Route>
        {/* StudentNews */}
        <Route path={"/StudentNews/Sosial"} element={<Student_News />}></Route>
        <Route path={"/StudentNews/Hiburan"} element={<Student_News />}></Route>
        <Route path={"/StudentNews/Bisnis"} element={<Student_News />}></Route>
        <Route path={"/StudentNews/Lifestyle"} element={<Student_News />}></Route>
        <Route path={"/StudentNews/Olahraga"} element={<Student_News />}></Route>
      </Routes>
    </>
  );
}

export default App;
