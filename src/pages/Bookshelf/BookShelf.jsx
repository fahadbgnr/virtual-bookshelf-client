
import { Link, useLoaderData } from 'react-router';
import { motion } from 'framer-motion';
import Bookcard from './Bookcard';
import { div } from 'framer-motion/client';

const BookShelf = () => {

    const books = useLoaderData();
    console.log(books)


    return (
        <div className='w-11/12 mx-auto my-5'>
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">📚 Explore Books</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    books.map(book => <Bookcard key={book._id} book={book} ></Bookcard>)
                }

            </div>

        </div>
    );
};

export default BookShelf;