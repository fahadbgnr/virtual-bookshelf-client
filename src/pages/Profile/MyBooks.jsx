import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';

const MyBooks = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) return;
        const accessToken = await currentUser.getIdToken();

        const res = await axios.get(
          `https://virtual-bookshelf-server-woad.vercel.app/my-books?email=${user?.email}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setBooks(res.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
    fetchBooks();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const accessToken = await currentUser.getIdToken();

        await axios.delete(`https://virtual-bookshelf-server-woad.vercel.app/books/${id}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });

        setBooks((prev) => prev.filter((b) => b._id !== id));

        Swal.fire({
          title: 'Deleted!',
          text: 'Your book has been deleted.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error(err);
        Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
      }
    }
  };

  return (
    <motion.div
      className="w-11/12 mx-auto my-10 transition-colors duration-500"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>BookNest || MyBooks</title>
      </Helmet>

      <h2 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
        My Added Books
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-900 rounded-md shadow-md">
        <table className="w-full border border-gray-300 dark:border-gray-700 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800 text-center">
              <th className="border px-4 py-2 text-gray-800 dark:text-gray-200">Title</th>
              <th className="border px-4 py-2 text-gray-800 dark:text-gray-200">Author</th>
              <th className="border px-4 py-2 text-gray-800 dark:text-gray-200">Pages</th>
              <th className="border px-4 py-2 text-gray-800 dark:text-gray-200">Category</th>
              <th className="border px-4 py-2 text-gray-800 dark:text-gray-200">Status</th>
              <th className="border px-4 py-2 text-gray-800 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book._id}
                className="text-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">{book.bookTitle}</td>
                <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">{book.authorName}</td>
                <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">{book.totalPage}</td>
                <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">{book.bookCategory}</td>
                <td className="border px-4 py-2 text-gray-900 dark:text-gray-100">{book.readingStatus}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Link to={`/upDateBook/${book._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-6 mt-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-900 rounded-md shadow p-4 space-y-2 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-purple-700 dark:text-purple-400">
              {book.bookTitle}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Author:</strong> {book.authorName}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Pages:</strong> {book.totalPage}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Category:</strong> {book.bookCategory}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Status:</strong> {book.readingStatus}
            </p>
            <div className="flex gap-2 mt-2">
              <Link to={`/upDateBook/${book._id}`} className="w-full">
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(book._id)}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyBooks;
