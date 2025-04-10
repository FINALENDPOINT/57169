import React from "react";
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <section className="flex flex-col">
        <Link to="/StudentNews">Student_News</Link>
        <Link to="/SuaraUnteyo&Mahasiswa">Suara Unteyo & Mahasiswa</Link>
        <Link to="/Youtube">Youtube</Link>
      </section>
    </div>
  );
}
