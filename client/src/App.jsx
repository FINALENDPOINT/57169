import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Student_News from "./pages/Student_News/Student_News";
import Suara_Unteyo_Mahasiswa from "./pages/Suara_Unteyo_Mahasiswa/Suara_Unteyo_Mahasiswa"
import Student_News_Article from "./pages/Student_News/Student_News_Article"
import Youtube from "./pages/Youtube/Youtube"
import axios from "axios";
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
        <Route path="/StudentNews/article" element={<Student_News_Article/>}></Route>
        <Route path="/SuaraUnteyo&Mahasiswa" element={<Suara_Unteyo_Mahasiswa/>}></Route>
        <Route path="/Youtube" element={<Youtube/>}></Route>
        {/* StudentNews */}
      </Routes>
    </>
  );
}

export default App;
