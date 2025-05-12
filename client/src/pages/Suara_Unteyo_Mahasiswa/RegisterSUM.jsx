import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    namaLengkap: "",
    userName: "",
    email: "",
    password: "",
  });

  const registerAuthor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/registerAuthor", data);

      toast.success(response.data.message || "Berhasil mendaftar!");
      setData({
        namaLengkap: "",
        userName: "",
        email: "",
        password: "",
      });
      navigate("/loginAuthor");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Terjadi kesalahan";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={registerAuthor}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Join Sebagai Penulis
        </h2>

        <label className="block mb-2">Nama Lengkap</label>
        <input
          type="text"
          required
          value={data.namaLengkap}
          onChange={(e) => setData({ ...data, namaLengkap: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Username</label>
        <input
          type="text"
          required
          value={data.userName}
          onChange={(e) => setData({ ...data, userName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          required
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Daftar
        </button>
      </form>
    </div>
  );
}
