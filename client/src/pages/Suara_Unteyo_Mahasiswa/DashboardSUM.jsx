import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddSuara() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    kategori: "",
    judul: "",
    gambar: null, // Tetap null di awal
    teks: "",
    tanggal: "",
    tagar: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.kategori || !data.judul || !data.teks || !data.tanggal) {
      toast.error("Harap isi semua field yang wajib diisi.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("kategori", data.kategori);
      formData.append("judul", data.judul);
      if (data.gambar) {
        formData.append("gambar", data.gambar);
      }
      formData.append("teks", data.teks);
      formData.append("tanggal", data.tanggal);
      formData.append("tagar", data.tagar);

      const response = await axios.post("/storeSuara", formData, {
        headers: {
          // "Content-Type": "multipart/form-data", // Axios biasanya mengatur ini secara otomatis untuk FormData
        },
      });

      toast.success(response.data.message || "Post berhasil disimpan!");
      setData({
        kategori: "",
        judul: "",
        gambar: null,
        teks: "",
        tanggal: "",
        tagar: "",
      });
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || "Gagal menyimpan post";
      toast.error(errorMessage);
      console.error("Error submitting form:", error); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Tambah Post</h2>

        <label className="block mb-2">Kategori</label>
        <input
          type="text"
          required
          value={data.kategori}
          onChange={(e) => setData({ ...data, kategori: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Judul</label>
        <input
          type="text"
          required
          value={data.judul}
          onChange={(e) => setData({ ...data, judul: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Gambar</label>
        <input
          type="file"
          accept="image/*"
          // Tidak perlu 'required' di sini jika gambar opsional,
          // logika required bisa ditangani di handleSubmit atau backend
          onChange={(e) => setData({ ...data, gambar: e.target.files[0] })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Teks</label>
        <textarea
          required
          value={data.teks}
          onChange={(e) => setData({ ...data, teks: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Tanggal</label>
        <input
          type="date"
          required
          value={data.tanggal}
          onChange={(e) => setData({ ...data, tanggal: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2">Tagar</label>
        <input
          type="text"
          value={data.tagar}
          placeholder="#tagar1, #tagar2"
          onChange={(e) => setData({ ...data, tagar: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Tambah Suara
        </button>
      </form>
    </div>
  );
}
