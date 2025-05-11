import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AddComment({ onCommentAdded }) {
    const { title } = useParams();
    const [newComment, setNewComment] = useState('');
    const [commentError, setCommentError] = useState('');

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
        setCommentError('');
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            setCommentError('Komentar tidak boleh kosong.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8000/StudentNews/article/comments?slug=${title}`, {
                userId: 1, // Ganti dengan ID pengguna yang sebenarnya
                commentText: newComment,
            });

            if (response.status === 201) {
                setNewComment('');
                setCommentError('');
                console.log('Komentar berhasil ditambahkan:', response.data);
                // Kirim kembali data komentar yang (mungkin) dikembalikan oleh server
                // Jika server tidak mengembalikan data lengkap, kita bisa membuat objek sementara
                const newCommentData = {
                    comment_text: newComment,
                    user_id: 1, // Asumsi userId
                    created_at: new Date().toISOString(), // Buat timestamp di klien
                    id: response.data.commentId // Jika server mengembalikan ID komentar
                };
                onCommentAdded(newCommentData);
            } else {
                setCommentError('Gagal menambahkan komentar.');
                console.error('Gagal menambahkan komentar:', response.data);
            }
        } catch (error) {
            setCommentError('Terjadi kesalahan saat menambahkan komentar.');
            console.error('Error menambahkan komentar:', error);
        }
    };

    return (
        <div>
            <h3>Kirim Komentar</h3>
            <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Tulis komentar Anda..."
            />
            {commentError && <p className="error">{commentError}</p>}
            <button onClick={handleAddComment}>Kirim Komentar</button>
        </div>
    );
}

export default AddComment;