import React from 'react';
import { motion } from "framer-motion";

const ReadingStatus = () => {
    return (
       <section className="bg-gray-100 py-16 px-4 md:px-10 my-32">
      <h2 className="text-3xl font-bold text-center mb-12">
        📊 Your Reading Progress
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[ 
          { label: "Books Read", value: 12 },
          { label: "Currently Reading", value: 3 },
          { label: "Goal for 2025", value: 20 }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            <h3 className="text-4xl font-bold text-indigo-600">{item.value}</h3>
            <p className="text-lg font-medium mt-2">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
    );
};

export default ReadingStatus;