import React from 'react';
import { useLoaderData } from 'react-router';

const BookDetails = () => {
    const book = useLoaderData();
    console.log(book)
    return (
        <div>
            BookDetails
        </div>
    );
};

export default BookDetails;