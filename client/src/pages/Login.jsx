import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { userName, password } = data;
    try {
      const { data } = await axios.post("/login", {
        userName,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
        toast.success("Login berhasil!");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat login.");
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={loginUser}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Masuk Akun</h2>

        <label className="block mb-2">Username</label>
        <input
          type="text"
          name="userName"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.userName}
          onChange={(e) => setData({ ...data, userName: e.target.value })}
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
