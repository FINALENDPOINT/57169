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
    jenisKelamin: "",
    alamat: "",
    pekerjaan: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const {
      namaLengkap,
      userName,
      email,
      password,
      jenisKelamin,
      alamat,
      pekerjaan,
    } = data;
    try {
      const { data } = await axios.post("/register", {
        namaLengkap,
        userName,
        email,
        password,
        jenisKelamin,     
        alamat,
        pekerjaan,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Selamat Anda Berhasil Mendaftar");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={registerUser}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Daftar Akun</h2>

          <label className="block mb-2">Nama Lengkap</label>
          <input
            type="text"
            name="nama"
            required
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={data.namaLengkap}
            onChange={(e) => setData({ ...data, namaLengkap: e.target.value })}
          />

          <label className="block mb-2">Username</label>
          <input
            type="text"
            name="username"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={data.userName}
            onChange={(e) => setData({ ...data, userName: e.target.value })}
          />

          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />

          <label className="block mb-2">Jenis Kelamin</label>
          <select
            name="jenis_kelamin"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={data.jenisKelamin}
            onChange={(e) => setData({ ...data, jenisKelamin: e.target.value })}
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>

          <label className="block mb-2">Alamat</label>
          <input
            type="text"
            name="alamat"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={data.alamat}
            onChange={(e) => setData({ ...data, alamat: e.target.value })}
          />

          <label className="block mb-2">Pekerjaan</label>
          <input
            type="text"
            name="pekerjaan"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={data.pekerjaan}
            onChange={(e) => setData({ ...data, pekerjaan: e.target.value })}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Daftar
          </button>
        </form>
      </div>
    </>
  );
}
