import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password harus minimal 8 karakter";
    }
    return null;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Password dan konfirmasi password tidak cocok");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`/resetPassword/${token}`, {
        password,
      });

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Password berhasil direset.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(
        err.response?.data?.error || "Terjadi kesalahan saat reset password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Reset Password
        </h2>

        <label className="block mb-2">Password Baru</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Minimal 8 karakter"
          required
        />

        <label className="block mb-2">Konfirmasi Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Masukkan kembali password baru"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? "Menyimpan..." : "Simpan Password Baru"}
        </button>
      </form>
    </div>
  );
}
