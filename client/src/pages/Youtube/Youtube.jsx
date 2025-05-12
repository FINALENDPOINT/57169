import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Youtube_Article from "./Youtube_Article";
import Youtube_Navbar from "./Youtube_Navbar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Youtube() {
  const query = useQuery();
  const category = query.get("category");
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleArticleCLick = (category, title) => {
    navigate(`/Youtube/${category}/${title}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/Youtube`)
      .then((response) => {
        setContent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error: {error}</h4>;

  return (
    <div>
      <Youtube_Navbar></Youtube_Navbar>
      <div>
        {content.map((item, index) => (
          <li
            key={index}
            className="flex flex-row w-[500px] shrink-[0]"
            onClick={() => handleArticleCLick(item.kategori, item.judul)}
            style={{ cursor: "pointer" }}
          >
            <iframe
              width="1120"
              height="630"
              src={`https://www.youtube.com/embed/${item.video_id}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <div>
              <h3 className="text-[20px]">{item.judul}</h3>
              <p>{item.kategori}</p>
              <p>{item.tanggal}</p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Youtube;
