import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { Helmet } from 'react-helmet';

const BookDetails = () => {
    const {
        _id,
        bookTitle,
        coverPhotoUrl,
        totalPage,
        authorName,
        bookCategory,
        readingStatus,
        upvote,
        email,
        name,
    } = useLoaderData();

    const { user } = useContext(AuthContext);

    const [currentUpvotes, setCurrentUpvotes] = useState(upvote || 0);
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState('');
    const [editingReview, setEditingReview] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(readingStatus);

    // 🔄 Load Reviews
    useEffect(() => {
        axios.get(`https://virtual-bookshelf-server-woad.vercel.app/reviews/${_id}`).then((res) => {
            setReviews(res.data);
            const existing = res.data.find((r) => r.userEmail === user?.email);
            if (existing) {
                setUserReview(existing.review);
                setEditingReview(true);
            } else {
                setUserReview('');
                setEditingReview(false);
            }
        });
    }, [_id, user?.email]);

    // 🔼 Handle Upvote
    const handleUpvote = () => {
        if (!user) return Swal.fire('Please login to upvote');
        if (user.email === email) return Swal.fire('You cannot upvote your own book');

        axios.post(`https://virtual-bookshelf-server-woad.vercel.app/booksUpvote/${_id}`, { userEmail: user.email })
            .then((res) => {
                if (res.data.success) {
                    setCurrentUpvotes(prev => prev + 1);
                    Swal.fire('Upvoted successfully');
                } else {
                    Swal.fire(res.data.message || 'Failed to upvote');
                }
            }).catch((err) => {
                Swal.fire('Error occurred', err.message || 'Unknown error', 'error');
            });
    };

    // 🔁 Handle Reading Status Update
    const handleStatusUpdate = () => {
        if (user?.email !== email) {
            Swal.fire('Only the owner can update reading status');
            return;
        }

        let nextStatus;
        if (updatedStatus === 'Want-to-Read') nextStatus = 'Reading';
        else if (updatedStatus === 'Reading') nextStatus = 'Read';
        else return Swal.fire('Already marked as Read');

        axios.patch(`https://virtual-bookshelf-server-woad.vercel.app/books/${_id}/status`, { readingStatus: nextStatus })
            .then(res => {
                if (res.data.success) {
                    setUpdatedStatus(nextStatus);
                    Swal.fire(`Reading status updated to "${nextStatus}"`);
                } else {
                    Swal.fire('Failed to update status');
                }
            })
            .catch(() => Swal.fire('Something went wrong'));
    };

    // ✍️ Review Submit
    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (!user) return Swal.fire('Login to post a review');

        const reviewData = {
            bookId: _id,
            userEmail: user.email,
            userName: user.displayName,
            review: userReview,
        };

        const apiCall = editingReview
            ? axios.put(`https://virtual-bookshelf-server-woad.vercel.app/reviews/${_id}`, reviewData)
            : axios.post(`https://virtual-bookshelf-server-woad.vercel.app/reviews`, reviewData);

        apiCall.then((res) => {
            if (res.data.success) {
                Swal.fire(editingReview ? 'Review updated' : 'Review posted');
                setEditingReview(true);
                setIsModalOpen(false);
                axios.get(`https://virtual-bookshelf-server-woad.vercel.app/reviews/${_id}`).then((r) => setReviews(r.data));
            }
        });
    };

    // 🗑️ Delete Review
    const handleDeleteReview = () => {
        axios.delete(`https://virtual-bookshelf-server-woad.vercel.app/reviews/${_id}`, { data: { userEmail: user.email } })
            .then((res) => {
                if (res.data.success) {
                    axios.get(`https://virtual-bookshelf-server-woad.vercel.app/reviews/${_id}`).then((r) => setReviews(r.data));
                    Swal.fire('Review deleted');
                    setUserReview('');
                    setEditingReview(false);
                }
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-4 my-16 text-gray-900 dark:text-gray-100">
            <Helmet>
                <title>BookNest || BookDetails</title>
            </Helmet>

            <div className="grid md:grid-cols-2 gap-6">
                <img src={coverPhotoUrl} alt={bookTitle} className="w-full rounded shadow" />
                <div>
                    <h2 className="text-3xl font-bold pb-5">{bookTitle}</h2>
                    <p className="pb-2"><strong>Author:</strong> {authorName}</p>
                    <p className="pb-2"><strong>Total Pages:</strong> {totalPage}</p>
                    <p className="pb-2"><strong>Category:</strong> {bookCategory}</p>
                    <p className="pb-2"><strong>Reading Status:</strong> {updatedStatus}</p>

                    {user?.email === email && updatedStatus !== 'Read' && (
                        <button
                            onClick={handleStatusUpdate}
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 mt-2"
                        >
                            Mark as {updatedStatus === 'Want-to-Read' ? 'Reading' : 'Read'}
                        </button>
                    )}

                    <p className="pb-2 mt-2"><strong>Uploaded by:</strong> {name} ({email})</p>

                    <div className="mt-4">
                        <button
                            onClick={handleUpvote}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            🔼 Upvote ({currentUpvotes})
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4 flex justify-between items-center">
                    Reviews
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                    >
                        {editingReview ? 'Edit Your Review' : 'Add Review'}
                    </button>
                </h3>

                <div className="space-y-3">
                    {reviews?.map((r, i) => (
                        <div key={i} className="border p-3 rounded shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                {r.userName} ({r.userEmail})
                            </p>
                            <p>{r.review}</p>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg w-full max-w-lg p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingReview ? 'Edit Your Review' : 'Add a Review'}
                        </h2>
                        <form onSubmit={handleReviewSubmit}>
                            <textarea
                                value={userReview}
                                onChange={(e) => setUserReview(e.target.value)}
                                placeholder="Write your review..."
                                className="w-full p-3 border rounded resize-y dark:bg-gray-800 dark:border-gray-600"
                                rows={6}
                                required
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </button>
                                {editingReview && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleDeleteReview();
                                            setIsModalOpen(false);
                                        }}
                                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                                >
                                    {editingReview ? 'Update' : 'Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetails;
