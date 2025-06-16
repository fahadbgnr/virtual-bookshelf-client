import React, { use } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

const AddBook = () => {
    const navigate = useNavigate();
    const { user } = use(AuthContext);

   const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const newBook = Object.fromEntries(formData.entries());

    newBook.upvote = Number(newBook.upvote) || 0;
    newBook.email = user?.email || '';
    newBook.name = user?.displayName || '';

    if (!newBook.email || !newBook.name) {
        return Swal.fire({
            title: "User information missing",
            text: "Please login to add a task",
            icon: "error"
        });
    }

    try {
        const accessToken = await user.getIdToken(); //  Get Firebase JWT

        const res = await fetch('https://virtual-bookshelf-server-woad.vercel.app/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` //  Attach token
            },
            body: JSON.stringify(newBook)
        });

        const data = await res.json();

        if (data.insertedId) {
            Swal.fire({
                title: "New Book added successfully.",
                icon: "success",
                confirmButtonColor: "#3085d6"
            });
            form.reset();
            navigate('/myBook');
        }
    } catch (error) {
        Swal.fire({
            title: "Something went wrong!",
            text: error.message,
            icon: "error"
        });
    }
};
    return (
        <motion.div
            className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">📘 Add a New Book</h2>
            <Helmet>
                <title>BookNest||AddBook</title>
            </Helmet>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Book Title */}
                <div>
                    <label className="label font-semibold">Book Title</label>
                    <input type="text" className="input input-bordered w-full" placeholder="Book Title" name="bookTitle" required />
                </div>

                {/* Cover Photo */}
                <div>
                    <label className="label font-semibold">Cover Photo URL</label>
                    <input type="text" className="input input-bordered w-full" placeholder="Cover Photo URL" name="coverPhotoUrl" required />
                </div>

                {/* Total Pages */}
                <div>
                    <label className="label font-semibold">Total Pages</label>
                    <input type="number" className="input input-bordered w-full" placeholder="Total Pages" name="totalPage" required />
                </div>

                {/* Author Name */}
                <div>
                    <label className="label font-semibold">Author Name</label>
                    <input type="text" className="input input-bordered w-full" placeholder="Author Name" name="authorName" required />
                </div>

                {/* Email */}
                <div>
                    <label className="label font-semibold">User Email</label>
                    <input type="email" value={user?.email || ''} name="email" readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                </div>

                {/* Name */}
                <div>
                    <label className="label font-semibold">User Name</label>
                    <input type="text" value={user?.displayName || ''} name="name" readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                </div>

                {/* Category */}
                <div>
                    <label className="label font-semibold">Book Category</label>
                    <select className="select select-bordered w-full" name="bookCategory" required>
                        <option value="">Select Category</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                </div>

                {/* Reading Status */}
                <div>
                    <label className="label font-semibold">Reading Status</label>
                    <select className="select select-bordered w-full" name="readingStatus" required>
                        <option value="">Select Status</option>
                        <option value="Read">Read</option>
                        <option value="Reading">Reading</option>
                        <option value="Want-to-Read">Want-to-Read</option>
                    </select>
                </div>

                {/* Overview */}
                <div className="md:col-span-2">
                    <label className="label font-semibold">Book Overview</label>
                    <textarea className="textarea textarea-bordered w-full" rows="4" placeholder="Book Overview" name="bookOverview" required />
                </div>

                {/* Upvote */}
                <div>
                    <label className="label font-semibold">Upvote</label>
                    <input type="number" value={0} readOnly name="upvote" className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                    <button
                        type="submit"
                        className="btn btn-primary w-full">Submit Book</button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddBook;