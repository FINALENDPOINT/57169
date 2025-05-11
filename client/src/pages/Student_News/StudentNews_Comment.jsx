// ArticleComments.jsx (seperti yang dibahas sebelumnya)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function StudentNews_Comment() {
    const { title } = useParams()
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [errorComments, setErrorComments] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/StudentNews/article/comments?slug=${title}`);
                setComments(response.data);
                setLoadingComments(false);
            } catch (error) {
                setErrorComments(error);
                setLoadingComments(false);
            }
        };

        fetchComments();
    }, [title]);
    
    if (loadingComments) {
        return <p>Loading comments...</p>;
    }

    if (errorComments) {
        return <p>Error loading comments: {errorComments.message}</p>;
    }

    return (
        <div>
            <h3>Komentar:</h3>
            {comments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.comment_text}</p>
                    {/* Tampilkan informasi komentar lainnya */}
                </div>
            ))}
            {comments.length === 0 && <p>Belum ada komentar.</p>}
        </div>
    );
}

export default StudentNews_Comment;