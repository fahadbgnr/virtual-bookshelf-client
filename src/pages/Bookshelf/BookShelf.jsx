
import { Link, useLoaderData } from 'react-router';
import { motion } from 'framer-motion';
import Bookcard from './Bookcard';
import { div } from 'framer-motion/client';
import { useState } from 'react';

const BookShelf = () => {
    const books = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [readingStatus, setReadingStatus] = useState('');

   
    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.authorName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = readingStatus
            ? book.readingStatus === readingStatus
            : true;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="w-11/12 mx-auto my-5">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">📚 Explore Books</h2>

           
            <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-4">
                <input
                    type="text"
                    placeholder="Search by title or author..."
                    className="input input-bordered w-full md:w-1/2"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />

                <select
                    className="select select-bordered w-full md:w-1/3"
                    value={readingStatus}
                    onChange={e => setReadingStatus(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="Read">Read</option>
                    <option value="Reading">Reading</option>
                    <option value="Want-to-Read">Want-to-Read</option>
                </select>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <Bookcard key={book._id} book={book} />
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">
                        No books found matching your criteria.
                    </p>
                )}
            </div>
        </div>
    );
};

export default BookShelf;