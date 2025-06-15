import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const Bookcard = ({ book }) => {
    const { bookTitle,
        coverPhotoUrl,
        authorName, bookCategory,
        upvote, readingStatus } = book;
    return (
        <div>

            <motion.div
                key={book._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition-all duration-300"
            >
                <img
                    src={
                        coverPhotoUrl}
                    alt=''
                    className="w-full h-56 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold text-indigo-700">{bookTitle}</h3>
                    <p className="text-sm text-gray-600 mb-1">👤 {authorName}</p>
                    <p className="text-sm text-gray-500 mb-2">📚 Category: {bookCategory}</p>
                    <p className="text-sm text-gray-500 mb-2">📚 Book: {readingStatus}</p>
                    <p className="text-sm text-yellow-600 mb-3">👍 Upvotes: {upvote}</p>
                    <Link to={`/bookDetails/${book._id}`} className="btn btn-sm btn-outline btn-primary w-full">
                        🔍 View Details
                    </Link>
                </div>
            </motion.div>

        </div>
    );
};

export default Bookcard;