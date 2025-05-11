import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import Student_News_Navbar from './Student_News_Navbar'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Student_News() {
  const query = useQuery()
  const category = query.get("category")
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleArticleCLick = (category, title) => {
    navigate(`/StudentNews/${category}/${title}`)
}
  

  useEffect(() => {
    axios
    .get(`http://localhost:8000/StudentNews`)
    .then((response) => {
      setNews(response.data)
      setLoading(false)
    })
    .catch((error) => {
      setError(error.response)
      setLoading(false)
    })
  }, [category])
    
  if (loading) return <h4>Loading...</h4>;
  if (error) return <h4>Error: {error}</h4>;

  return (
    <div>
      <Student_News_Navbar/>
      <h1>{category}</h1>
      <div className='flex flex-row w-[auto] h-[auto] overflow-x-scroll'>
      {news.map((item, index) => (
        <li key={index} className="flex flex-row w-[500px] shrink-[0]"
        onClick={() => handleArticleCLick(item.kategori, item.judul)}
        style={{cursor: "pointer"}}
        >
          <img src={item.gambar} className='w-[100px] h-[100px]'></img>
          <div>
            <h3 className='text-[20px]'>{item.judul}</h3>
            <p>{item.kategori}</p>
            <p>{item.tanggal}</p>
          </div>
        </li>
      ))}
    </div>
    </div>
  )
}

export default Student_News