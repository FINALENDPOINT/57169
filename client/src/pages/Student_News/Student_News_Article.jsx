// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import axios from "axios"
// import StudentNews_Comment from './StudentNews_Comment';
// import StudentNews_AddComment from './StudentNews_AddComment';

// function Student_News_Article() {
//     const { title } = useParams()
//     const [article, setArticle] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         if(!title) {
//             setError("Judul artikel tidak ditemukan di URL.")
//             setLoading(false)
//             return
//         }

//         axios
//         .get(`http://localhost:8000/StudentNews/article?slug=${title}`)
//         .then((response) => {
//             setArticle(response.data)
//             setLoading(false)
//         })
//         .catch((err) => {
//             setError(err.response?.data?.mesaage || err.message)
//         })
//     }, [title])

//     const handleCommentAdded = () => {
//         // Paksa ArticleComments untuk melakukan refetch data
//         // Kita bisa menggunakan state atau ref untuk memicu ini
//         setShouldRefetchComments(prev => !prev);
//     };

//     const [shouldRefetchComments, setShouldRefetchComments] = useState(false);


//     if (loading) return <h4>Loading...</h4>;
//     if (error) return <h4>Error: {error}</h4>;

    
//   return (
//     <div>
//         {article && (
//         <div>
//           <h1>{article.judul}</h1>
//           <img src={article.gambar} alt={article.judul} />
//           <p>{article.teks}</p>
//         </div>
//       )}
//       <StudentNews_AddComment shouldRefetch={shouldRefetchComments} slug={title}/>
//       <StudentNews_Comment onCommentAdded={handleCommentAdded}/>
//     </div>
//   )
// }

// export default Student_News_Article

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StudentNews_Comment from './StudentNews_Comment';
import StudentNews_AddComment from './StudentNews_AddComment';

function Student_News_Article() {
    const { title } = useParams();
    const [article, setArticle] = useState(null);
    const [loadingArticle, setLoadingArticle] = useState(true);
    const [errorArticle, setErrorArticle] = useState(null);

    // State untuk memicu refetch komentar
    const [shouldRefetchComments, setShouldRefetchComments] = useState(false);

    const fetchArticle = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/StudentNews/article?slug=${title}`);
            setArticle(response.data);
            setLoadingArticle(false);
        } catch (error) {
            setErrorArticle(error);
            setLoadingArticle(false);
        }
    };

    

    useEffect(() => {
        fetchArticle();
    }, [title]);

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:8000/StudentNews/article/like?slug=${title}`);
            // Setelah berhasil like, ambil ulang data artikel untuk memperbarui tampilan
            fetchArticle();
            console.log("like berhasil ditambahkan")
        } catch (error) {
            console.error('Gagal menyukai artikel:', error);
        }
    };

    const handleDislike = async () => {
        try {
            await axios.post(`http://localhost:8000/StudentNews/article/dislike?slug=${title}`);
            // Setelah berhasil like, ambil ulang data artikel untuk memperbarui tampilan
            fetchArticle();
            console.log("like berhasil ditambahkan")
        } catch (error) {
            console.error('Gagal menyukai artikel:', error);
        }
    };

    const handleShare = async () => {
        try {
            await axios.post(`http://localhost:8000/StudentNews/article/share?slug=${title}`);
            // Setelah berhasil like, ambil ulang data artikel untuk memperbarui tampilan
            fetchArticle();
            console.log("like berhasil ditambahkan")
        } catch (error) {
            console.error('Gagal menyukai artikel:', error);
        }
    };


    const handleCommentAdded = () => {
        // Set shouldRefetchComments ke nilai yang berbeda untuk memicu useEffect di ArticleComments
        setShouldRefetchComments(prev => !prev);
    };

    if (loadingArticle) {
        return <p>Loading article...</p>;
    }

    if (errorArticle) {
        return <p>Error loading article: {errorArticle.message}</p>;
    }

    if (!article) {
        return <p>Article not found.</p>;
    }

    return (
        <div>
            {article && (
        <div>
          <h1>{article.judul}</h1>
          <img src={article.gambar} alt={article.judul} />
          <p>{article.teks}</p>
        </div>
      )}
      <div className='flex flex-row'>
        <button className='cursor-pointer w-[40px] w-[40px]' onClick={handleLike}> klik Like ({article.popularity?.likes || 0})</button>
        <button className='cursor-pointer w-[40px] w-[40px]' onClick={handleDislike}> klik Dislike ({article.popularity?.dislikes || 0})</button>
        <button className='cursor-pointer w-[40px] w-[40px]' onClick={handleShare}> klik Share ({article.popularity?.shares || 0})</button>
      </div>

            {/* Kirim fungsi handleCommentAdded sebagai prop ke AddComment */}
            <StudentNews_AddComment onCommentAdded={handleCommentAdded} />
            {/* Kirim slug dan shouldRefetchComments sebagai props ke ArticleComments */}
            <StudentNews_Comment slug={title} shouldRefetch={shouldRefetchComments} />
        </div>
    );
}

export default Student_News_Article;