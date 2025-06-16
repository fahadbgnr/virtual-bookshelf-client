import React from 'react';
import { motion } from 'framer-motion';

const Loder = () => {
    return (
        <motion.div
            className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-pink-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Animated Dots Spinner */}
            <motion.span
                className="loading loading-dots loading-lg text-indigo-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </motion.div>
    );
};

export default Loder;