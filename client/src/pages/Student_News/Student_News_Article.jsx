import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios"

function Student_News_Article() {
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
        .get(`https://server.unteyojourney.myhost.id/StudentNews/article?title=${encodeURIComponent(title)}`)
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
          <img src={article.gambar} alt={article.judul} />
          <p>{article.teks}</p>
        </div>
      )}
    </div>
  )
}

export default Student_News_Article