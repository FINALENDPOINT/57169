import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const loginUser = (e) => {
    e.preventDefault();
    axios
      .get("/")
      .then((response) => console.log(response.data))
      .catch((error) => console.error("Error saat login:", error));
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
          name="username"
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
