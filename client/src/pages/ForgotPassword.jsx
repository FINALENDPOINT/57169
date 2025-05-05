import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    error: false,
  });

  const forgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ submitted: false, error: false });

    if (!data.email) {
      toast.error("Email tidak boleh kosong.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/forgotPassword", {
        email: data.email,
      });

      console.log("Server response:", response.data);

      if (response.data.error) {
        toast.error(response.data.error);
        setSubmitStatus({ submitted: true, error: true });
      } else {
        setData({ email: "" });
        toast.success("Silahkan cek email Anda untuk link reset password.");
        setSubmitStatus({ submitted: true, error: false });
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      console.error("Error details:", error);

      let errorMessage;
      if (error.response) {
        // The server responded with a status code outside of 2xx range
        console.error("Server error response:", error.response.data);
        errorMessage =
          error.response.data.error || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "Tidak dapat menghubungi server. Periksa koneksi Anda.";
      } else {
        // Something happened in setting up the request
        errorMessage = "Terjadi kesalahan saat memproses permintaan.";
      }

      toast.error(errorMessage);
      setSubmitStatus({ submitted: true, error: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Lupa Password
        </h2>

        {submitStatus.submitted && !submitStatus.error ? (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <p>
              Email reset password telah dikirim. Silakan periksa kotak masuk
              email Anda.
            </p>
            <p className="mt-2">
              Tidak menerima email? Periksa folder spam atau{" "}
              <button
                onClick={() =>
                  setSubmitStatus({ submitted: false, error: false })
                }
                className="text-blue-500 underline"
              >
                coba lagi
              </button>
            </p>
          </div>
        ) : (
          <form onSubmit={forgotPassword}>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Masukkan email Anda"
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              disabled={isLoading}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 mb-4"
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Reset Password"}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-blue-500 hover:underline">
                Kembali ke halaman login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
