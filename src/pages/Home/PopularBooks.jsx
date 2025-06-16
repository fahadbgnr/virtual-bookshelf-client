import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const PopularBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('https://virtual-bookshelf-server-woad.vercel.app/popularBooks')
            .then(res => {
                // Filter out books with no upvotes
                const filteredBooks = res.data.filter(book => parseInt(book.upvote) > 0);
                setBooks(filteredBooks);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <motion.section
            className="my-10 px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h2
                className="text-3xl font-bold text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                📚 Popular Books
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books.map((book, index) => (
                    <motion.div
                        key={book._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                    >
                        <Link
                            to={`/books/${book._id}`}
                            className="border p-4 rounded shadow hover:shadow-lg transition block bg-white"
                        >
                            <img
                                src={book.coverPhotoUrl}
                                alt={book.bookTitle}
                                className="w-full h-48 object-cover rounded mb-4"
                            />
                            <h3 className="text-xl font-semibold">{book.bookTitle}</h3>
                            <p className="text-gray-600">{book.authorName}</p>
                            <p className="text-sm mt-1 text-blue-600">Upvotes: {book.upvote || 0}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default PopularBooks;