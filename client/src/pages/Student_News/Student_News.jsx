import React, { useState, useEffect } from 'react'
import axios from "axios"

function Student_News() {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
    .get('http://localhost:8000/StudentNews')
    .then((response) => {
      setNews(response.data)
      setLoading(false)
    })
    .catch((error) => {
      setError(error.response)
      setLoading(false)
    })
  }, [])
    
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error: {error}</h4>;

  return (
    <div>
      {news.map((item, index) => (
        <li key={index}>
          <img src={item.gambar}></img>
          <div>
            <h3>{item.judul}</h3>
            <p>{item.kateori}</p>
            <p>{item.tanggal}</p>
          </div>
        </li>
      ))}
    </div>
  )
}

export default Student_News