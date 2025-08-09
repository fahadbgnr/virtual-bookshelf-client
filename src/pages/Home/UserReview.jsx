import React from 'react';
import { motion } from "framer-motion";

const UserReview = () => {
    const reviews = [
        {
            name: "Ayesha K.",
            comment: "This app helped me finally organize my reading habit. Loving the clean UI!",
            rating: 5,
        },
        {
            name: "Tanvir R.",
            comment: "Simple and effective. I can track my books and progress easily.",
            rating: 4,
        },
        {
            name: "Jasmine A.",
            comment: "Would love more categories, but overall a great experience.",
            rating: 4,
        },
        
    ];
    return (
      <section className="my-32 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-700 dark:text-purple-400">🗣️ What Readers Are Saying</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-md hover:shadow-xl transition duration-300 p-6 rounded-xl border border-gray-200"
          >
            <div className="text-lg font-semibold text-indigo-700 mb-2">{review.name}</div>
            <p className="text-gray-600 italic mb-4">"{review.comment}"</p>
            <div className="text-yellow-500 text-lg">
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
    );
};

export default UserReview;