import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router';
import axios from 'axios';



const colors = [
    'bg-purple-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-yellow-100',
    'bg-pink-100',
    'bg-orange-100',
];




const FeautureCategory = () => {
    const [categories, setCategories] = useState([]);
    

    useEffect(() => {
        axios.get('https://virtual-bookshelf-server-woad.vercel.app/books')
            .then(res => {
                const allBooks = res.data;
                const categorySet = new Set(allBooks.map(book => book.bookCategory));
                setCategories([...categorySet]);
                
            })
            .catch(err => console.error(err));
            
    }, []);
    

    return (
        <section className="my-32 px-4 max-w-7xl mx-auto">
            <motion.h2
                className="text-3xl font-bold text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                📚 Featured Categories
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((cat, index) => (
                    <Link key={index} to={`/category/${encodeURIComponent(cat)}`}>
                        <motion.div
                            className={`p-6 rounded-lg shadow hover:shadow-lg transition text-center ${colors[index % colors.length]}`}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{cat}</h3>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default FeautureCategory;