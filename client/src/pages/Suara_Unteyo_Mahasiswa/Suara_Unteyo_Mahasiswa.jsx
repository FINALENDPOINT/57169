import React from "react";
import { Link } from "react-router-dom";

function Suara_Unteyo_Mahasiswa() {
  return (
    <>
      <div>Suara_Unteyo_Mahasiswa</div>
      <div>
        Jika kamu mau menulis tentang suaramu boleh klik ini{" "}
        <Link to="/registerAuthor">DAFTAR SEBAGAI PENULIS</Link>
      </div>
    </>
  );
}

export default Suara_Unteyo_Mahasiswa;
