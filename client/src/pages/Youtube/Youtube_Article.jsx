import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"


function Youtube_Article() {
    const { title } = useParams()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(!title) {
            setError("Judul artikel tidak ditemukan di URL.")
            setLoading(false)
            return
        }

        axios
        .get(`https://backend.unteyojourney.myhost.id/Youtube/article?title=${encodeURIComponent(title)}`)
        .then((response) => {
            setArticle(response.data)
            setLoading(false)
        })
        .catch((err) => {
            setError(err.response?.data?.mesaage || err.message)
        })
    }, [title])

    if (loading) return <h4>Loading...</h4>;
    if (error) return <h4>Error: {error}</h4>;
  return (
    <div>
        {article && (
        <div>
          <h1>{article.judul}</h1>
          <iframe width="1120" height="630" src={`https://www.youtube.com/embed/${article.video_id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <p>{article.teks}</p>
        </div>
      )}
    </div>
  )
}

export default Youtube_Article