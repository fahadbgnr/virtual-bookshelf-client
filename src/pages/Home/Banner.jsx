import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
    const slides = [
        {
            id: 1,
            title: "Explore Your Virtual Bookshelf",
            description: "Organize and access your favorite books anytime, anywhere.",
            bgColor: "bg-gradient-to-r from-purple-500 to-indigo-600",
        },
        {
            id: 2,
            title: "Seamless Book Management",
            description: "Add, remove, and categorize books with just a few clicks.",
            bgColor: "bg-gradient-to-r from-green-400 to-blue-500",
        },
        {
            id: 3,
            title: "Read, Learn, and Grow",
            description: "Dive into your collection and keep your knowledge expanding.",
            bgColor: "bg-gradient-to-r from-pink-500 to-red-500",
        },
    ];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearTimeout(timer);
    }, [current]);
    return (
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8 }}
                    className={`${slides[current].bgColor} w-full h-full flex flex-col justify-center items-start px-8 md:px-16 text-white`}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                        {slides[current].title}
                    </h2>
                    <p className="text-lg md:text-2xl mb-6 drop-shadow-md">
                        {slides[current].description}
                    </p>
                    <button className="btn btn-primary btn-outline btn-lg">
                        Explore Now
                    </button>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-4 h-4 rounded-full ${idx === current ? "bg-white" : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;