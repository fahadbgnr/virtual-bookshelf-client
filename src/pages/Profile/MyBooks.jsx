import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';

const MyBooks = () => {
    const { user } = use(AuthContext);
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({
        bookTitle: '',
        authorName: '',
        totalPage: '',
        bookCategory: '',
        readingStatus: '',
        coverPhotoUrl: '',
    });

    // Fetch user's books
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;

                if (!currentUser) return;

                //  Get Firebase ID token (JWT)
                const accessToken = await currentUser.getIdToken();

                const res = await axios.get(`http://localhost:3000/my-books?email=${user?.email}`, {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                });
                setBooks(res.data);
            } catch (err) {
                console.error('Error fetching books:', err);
            }
        };

        fetchBooks();
    }, [user]);

    // Delete book handler
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;
                const accessToken = await currentUser.getIdToken();

                await axios.delete(`http://localhost:3000/books/${id}`, {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                });

                setBooks(prevBooks => prevBooks.filter(book => book._id !== id));

                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your book has been deleted.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (err) {
                console.error(err);
                Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
            }
        }
    };


    return (
        <motion.div
            className="w-11/12 mx-auto my-10 overflow-x-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-semibold mb-4 text-center">My Added Books</h2>
            <Helmet>
                <title>BookNest||MyBooks</title>
            </Helmet>
            <motion.table
                className="w-full border border-gray-300 text-sm md:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <thead>
                    <tr className="bg-gray-200 text-center">
                        <th className="border px-2 md:px-4 py-2">Title</th>
                        <th className="border px-2 md:px-4 py-2">Author</th>
                        <th className="border px-2 md:px-4 py-2">Pages</th>
                        <th className="border px-2 md:px-4 py-2">Category</th>
                        <th className="border px-2 md:px-4 py-2">Status</th>
                        <th className="border px-2 md:px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <motion.tr
                            key={book._id}
                            className="text-center hover:bg-gray-100"
                            whileHover={{ scale: 1.01 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {editingBook === book._id ? (
                                <>
                                    <td className="border px-2 md:px-4 py-2">
                                        <input
                                            type="text"
                                            name="bookTitle"
                                            value={formData.bookTitle}

                                            className="border px-2 py-1 w-full"
                                        />
                                    </td>
                                    <td className="border px-2 md:px-4 py-2">
                                        <input
                                            type="text"
                                            name="authorName"
                                            value={formData.authorName}

                                            className="border px-2 py-1 w-full"
                                        />
                                    </td>
                                    <td className="border px-2 md:px-4 py-2">
                                        <input
                                            type="number"
                                            name="totalPage"
                                            value={formData.totalPage}

                                            className="border px-2 py-1 w-full"
                                        />
                                    </td>
                                    <td className="border px-2 md:px-4 py-2">
                                        <input
                                            type="text"
                                            name="bookCategory"
                                            value={formData.bookCategory}

                                            className="border px-2 py-1 w-full"
                                        />
                                    </td>
                                    <td className="border px-2 md:px-4 py-2">
                                        <input
                                            type="text"
                                            name="readingStatus"
                                            value={formData.readingStatus}

                                            className="border px-2 py-1 w-full"
                                        />
                                    </td>

                                </>
                            ) : (
                                <>
                                    <td className="border px-2 md:px-4 py-2">{book.bookTitle}</td>
                                    <td className="border px-2 md:px-4 py-2">{book.authorName}</td>
                                    <td className="border px-2 md:px-4 py-2">{book.totalPage}</td>
                                    <td className="border px-2 md:px-4 py-2">{book.bookCategory}</td>
                                    <td className="border px-2 md:px-4 py-2">{book.readingStatus}</td>
                                    <td className="border px-2 md:px-4 py-2 space-y-2 md:space-x-2 md:space-y-0">
                                        <Link to={`/upDateBook/${book._id}`}>  <button

                                            className="bg-blue-500 text-white px-2 py-1 rounded w-full md:w-auto"
                                        >
                                            Update
                                        </button></Link>
                                        <button
                                            onClick={() => handleDelete(book._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded w-full md:w-auto"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </>
                            )}
                        </motion.tr>
                    ))}
                </tbody>
            </motion.table>
        </motion.div>
    );
};

export default MyBooks;