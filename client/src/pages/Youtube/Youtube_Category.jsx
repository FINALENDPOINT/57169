import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from 'axios'


function Youtube_Category() {
    const { category } = useParams()
    const [content, setContent] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    
    const handleArticleCLick = (title) => {
        navigate(`/StudentNews/${category}/${title}`)
    }

    useEffect(() => {
        axios
        .get(`https://server.unteyojourney.myhost.id/Youtube/category?category=${category}`)
        .then((response) => {
            setContent(response.data)
            setLoading(false)
        })
        .catch((error) => {
            setError(error.response)
            setLoading(false)
        })
    }, [category])

    console.log(category)

    if (loading) return <h4>Loading...</h4>
    if (error) return <h4>Error: {error}</h4>
  return (
    <div>
        <h1>{category}</h1>
        <div className='flex flex-row w-full h-[auto] overflow-x-scroll'>
      {content.map((item, index) => (
        <li key={index} className="flex flex-row w-[auto] shrink-[0]"
        onClick={() => handleArticleCLick(item.judul)}
        style={{cursor: "pointer"}}
        >
          <iframe width="1120" height="630" src={`https://www.youtube.com/embed/${item.video_id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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

export default Youtube_Category