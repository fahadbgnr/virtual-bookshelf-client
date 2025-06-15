import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Category = () => {
    const { categoryName } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/books`)
      .then(res => {
        const filtered = res.data.filter(
          book => book.bookCategory === categoryName
        );
        setBooks(filtered);
      });
  }, [categoryName]);
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6">📚 {categoryName} Books</h2>
            {books.length === 0 ? (
                <p>No books found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {books.map(book => (
                        <div key={book._id} className="border p-4 rounded shadow">
                            <img src={book.coverPhotoUrl} alt={book.bookTitle} className="w-full h-48 object-cover rounded mb-3" />
                            <h3 className="text-xl font-semibold">{book.bookTitle}</h3>
                            <p className="text-gray-600">{book.authorName}</p>
                            <p className="text-sm text-blue-500">{book.readingStatus}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;