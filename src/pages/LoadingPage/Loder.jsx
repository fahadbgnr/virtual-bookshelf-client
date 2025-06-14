import React from 'react';
import { motion } from 'framer-motion';

const Loder = () => {
    return (
        <motion.div
            className='min-h-screen flex justify-center items-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <motion.span
                className="loading loading-dots loading-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            />
        </motion.div>
    );
};

export default Loder;