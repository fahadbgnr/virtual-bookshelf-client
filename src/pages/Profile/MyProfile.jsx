import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { getAuth } from 'firebase/auth';



const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c'];
const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchUserBooks = async () => {
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;

                if (!currentUser) return;

                const accessToken = await currentUser.getIdToken();

                const res = await fetch(`https://virtual-bookshelf-server-woad.vercel.app/my-books?email=${user?.email}`, {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                });

                const data = await res.json();
                setBooks(data);

            } catch (error) {
                console.error("Failed to fetch user books:", error.message);
            }
        };

        if (user?.email) {
            fetchUserBooks();
        }
    }, [user]);


    const totalBooks = books.length;

    const categoryData = books.reduce((acc, book) => {
        const category = book.bookCategory;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.keys(categoryData).map(key => ({
        name: key,
        value: categoryData[key],
    }));
    return (
        <motion.div

            className="w-full max-w-7xl px-4 mx-auto my-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}

        >
            <motion.h2
                className="text-2xl font-bold mb-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                User Profile
            </motion.h2>

            <motion.div
                className="flex flex-col lg:flex-row items-center justify-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <div className="text-center w-full max-w-sm">
                    <Helmet>
                        <title>BookNest||MyProfile</title>
                    </Helmet>
                    <img
                        src={user?.photoURL}
                        alt="Profile"
                        className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-indigo-500 object-cover"
                    />
                    <p className="text-lg font-semibold">{user?.displayName}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    <p className="mt-2 text-indigo-600 font-medium">Total Books: {totalBooks}</p>
                </div>

                <div className="w-full max-w-md h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default MyProfile;