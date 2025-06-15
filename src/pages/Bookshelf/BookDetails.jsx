import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'; // Added useState here
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

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
    const [isModalOpen, setIsModalOpen] = useState(false); // <<< ADDED: State for modal visibility

    // Load all reviews
    useEffect(() => {
        axios.get(`http://localhost:3000/reviews/${_id}`).then((res) => {
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

    // Handle Upvote (unchanged)
    const handleUpvote = () => {
        if (!user) {
            Swal.fire('Please login to upvote');
            return;
        }
        if (user.email === email) {
            Swal.fire('You cannot upvote your own book');
            return;
        }

        axios
            .post(`http://localhost:3000/booksUpvote/${_id}`, { userEmail: user.email })
            .then((res) => {
                if (res.data.success) {
                    // Increase local upvote count if backend update successful
                    setCurrentUpvotes((prev) => prev + 1);
                    Swal.fire('Upvoted successfully');
                } else {
                    Swal.fire(res.data.message || 'Failed to upvote');
                }
            })
            .catch((err) => {
                Swal.fire('Error occurred', err.message || 'Unknown error', 'error');
            });
    };

    // Handle Review Submit from modal (UPDATED to close modal on success)
    const handleReviewSubmit = (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire('Login to post a review');
            return;
        }

        const reviewData = {
            bookId: _id,
            userEmail: user.email,
            userName: user.displayName,
            review: userReview,
        };

        const apiCall = editingReview
            ? axios.put(`http://localhost:3000/reviews/${_id}`, reviewData)
            : axios.post(`http://localhost:3000/reviews`, reviewData);

        apiCall.then((res) => {
            if (res.data.success) {
                Swal.fire(editingReview ? 'Review updated' : 'Review posted');
                setEditingReview(true);
                setIsModalOpen(false); // <<< ADDED: close modal on success
                axios.get(`http://localhost:3000/reviews/${_id}`).then((r) => setReviews(r.data));
            }
        });
    };

    // Handle Delete Review (unchanged, but modal closes on delete)
    const handleDeleteReview = () => {
        axios
            .delete(`http://localhost:3000/reviews/${_id}`, { data: { userEmail: user.email } })
            .then((res) => {
                if (res.data.success) {
                    axios.get(`http://localhost:3000/reviews/${_id}`).then((r) => setReviews(r.data));
                    Swal.fire('Review deleted');
                    setUserReview('');
                    setEditingReview(false);
                }
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="grid md:grid-cols-2 gap-6">
                <img src={coverPhotoUrl} alt={bookTitle} className="w-full rounded" />
                <div>
                    <h2 className="text-3xl font-bold pb-5">{bookTitle}</h2>
                    <p className="pb-5">
                        <strong>Author:</strong> {authorName}
                    </p>
                    <p className="pb-5">
                        <strong>Total Pages:</strong> {totalPage}
                    </p>
                    <p className="pb-5">
                        <strong>Category:</strong> {bookCategory}
                    </p>
                    <p className="pb-5">
                        <strong>Status:</strong> {readingStatus}
                    </p>
                    <p className="pb-5">
                        <strong>Uploaded by:</strong> {name} ({email})
                    </p>
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

            {/* Reviews Section */}
            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4 flex justify-between items-center">
                    Reviews
                    {/* <<< ADDED: Button to open modal */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {editingReview ? 'Edit Your Review' : 'Add Review'}
                    </button>
                </h3>

                <div className="space-y-3">
                    {/* List all reviews */}
                    {reviews?.map((r, i) => (
                        <div key={i} className="border p-3 rounded shadow-sm">
                            <p className="text-sm text-gray-600 mb-1">
                                {r.userName} ({r.userEmail})
                            </p>
                            <p>{r.review}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* <<< ADDED: Modal Section */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
                        <h2 className="text-xl font-semibold mb-4">
                            {editingReview ? 'Edit Your Review' : 'Add a Review'}
                        </h2>
                        <form onSubmit={handleReviewSubmit}>
                            <textarea
                                value={userReview}
                                onChange={(e) => setUserReview(e.target.value)}
                                placeholder="Write your review..."
                                className="w-full p-3 border rounded resize-y"
                                rows={6}
                                required
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)} // <<< Close modal on cancel
                                    className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                {/* Delete button only shows if editing */}
                                {editingReview && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleDeleteReview();
                                            setIsModalOpen(false); // close modal on delete
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