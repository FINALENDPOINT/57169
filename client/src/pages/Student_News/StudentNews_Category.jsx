import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'


function StudentNews_Category() {
    const { category } = useParams()
    const [news, setNews] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const handleArticleCLick = (title) => {
        navigate(`/StudentNews/${category}/${title}`)
    }

    useEffect(() => {
        axios
        .get(`https://server.unteyojourney.myhost.id/StudentNews/category?category=${category.toLocaleLowerCase()}`)
        .then((response) => {
            setNews(response.data)
            setLoading(false)
        })
        .catch((error) => {
            setError(error.response)
            setLoading(false)
        })
    }, [category])

    if (loading) return <h4>Loading...</h4>
    if (error) return <h4>Error: {error}</h4>

  return (
    <div>
        <h1>{category}</h1>
        <div className='flex flex-row w-[auto] h-[auto] overflow-x-scroll'>
      {news.map((item, index) => (
        <li key={index} className="flex flex-row w-[500px] shrink-[0]"
        onClick={() => handleArticleCLick(item.judul)}
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

export default StudentNews_Category