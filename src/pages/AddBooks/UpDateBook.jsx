import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';

const UpDateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [upDateBook, setUpDateBook] = useState({
        bookTitle: '',
        coverPhotoUrl: '',
        totalPage: '',
        authorName: '',
        bookCategory: '',
        readingStatus: '',
        bookOverview: ''
    });

    useEffect(() => {
        fetch(`https://virtual-bookshelf-server-woad.vercel.app/books/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUpDateBook(data);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpDateBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { _id, ...updatedBookData } = upDateBook;
        updatedBookData.email = user?.email || '';
        updatedBookData.name = user?.displayName || '';

        try {
            const accessToken = await user.getIdToken();

            const res = await fetch(`https://virtual-bookshelf-server-woad.vercel.app/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(updatedBookData),
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire('Success', 'Book updated successfully!', 'success');
                navigate('/myBook');
            } else {
                Swal.fire('No Change', 'No updates were made to the book.', 'info');
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <motion.div
            className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-24 mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">📘 Update Book</h2>
            <Helmet>
                <title>BookNest || UpdateBook</title>
            </Helmet>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="label font-semibold text-gray-800">Book Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full placeholder-gray-400"
                        onChange={handleChange}
                        value={upDateBook.bookTitle}
                        placeholder="Book Title"
                        name="bookTitle"
                        required
                    />
                </div>

                <div>
                    <label className="label font-semibold text-gray-800">Cover Photo URL</label>
                    <input
                        type="text"
                        className="input input-bordered w-full placeholder-gray-400"
                        placeholder="Cover Photo URL"
                        onChange={handleChange}
                        value={upDateBook.coverPhotoUrl}
                        name="coverPhotoUrl"
                        required
                    />
                </div>

                <div>
                    <label className="label font-semibold text-gray-800">Total Pages</label>
                    <input
                        type="number"
                        className="input input-bordered w-full placeholder-gray-400"
                        placeholder="Total Pages"
                        onChange={handleChange}
                        value={upDateBook.totalPage}
                        name="totalPage"
                        required
                    />
                </div>

                <div>
                    <label className="label font-semibold text-gray-800">Author Name</label>
                    <input
                        type="text"
                        className="input input-bordered w-full placeholder-gray-400"
                        placeholder="Author Name"
                        onChange={handleChange}
                        value={upDateBook.authorName}
                        name="authorName"
                        required
                    />
                </div>

                <div>
                    <label className="label font-semibold text-gray-800">User Email</label>
                    <input
                        type="email"
                        value={user?.email || ''}
                        name="email"
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed text-gray-600"
                    />
                </div>

                <div>
                    <label className="label font-semibold text-gray-800">User Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        name="name"
                        readOnly
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed text-gray-600"
                    />
                </div>

                <div>
                    <label className="label font-semibold text-gray-800">Book Category</label>
                    <select
                        className="select select-bordered w-full"
                        name="bookCategory"
                        onChange={handleChange}
                        value={upDateBook.bookCategory}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                </div>

                <div>
                    <label className="label font-semibold text-gray-800">Reading Status</label>
                    <select
                        className="select select-bordered w-full"
                        name="readingStatus"
                        onChange={handleChange}
                        value={upDateBook.readingStatus}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Read">Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Want-to-Read">Want-to-Read</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="label font-semibold text-gray-800">Book Overview</label>
                    <textarea
                        className="textarea textarea-bordered w-full placeholder-gray-400"
                        rows="4"
                        placeholder="Book Overview"
                        onChange={handleChange}
                        value={upDateBook.bookOverview}
                        name="bookOverview"
                        required
                    />
                </div>

                <div>
                    <label className="label font-semibold text-gray-800">Upvote</label>
                    <input
                        type="number"
                        value={0}
                        readOnly
                        name="upvote"
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed text-gray-600"
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                    >
                        Update Book
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default UpDateBook;
