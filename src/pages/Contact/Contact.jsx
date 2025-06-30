import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return Swal.fire({
        icon: 'error',
        title: 'All fields are required',
        text: 'Please fill out all the fields before submitting.'
      });
    }

    // এখানে তুমি API কল করতে পারো বা অন্য কোনো কাজ করতে পারো

    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Thank you for contacting us. We will get back to you shortly.'
    });

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg my-20">
      <h2 className="text-4xl font-extrabold mb-8 text-purple-600 text-center">Contact Us</h2>

      {/* Your Contact Info */}
      <div className="mb-10 text-center text-gray-700 space-y-2">
        <p><strong>Email:</strong> <a href="mailto:aminulislamfahad1@gmail.com" className="text-purple-600 ">aminulislamfahad1@gmail.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+8801959792191" className="text-purple-600">+8801959792191</a></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Write your message here..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-3 rounded-md hover:text-purple-600 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
