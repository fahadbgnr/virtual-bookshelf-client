import React from 'react';

const About = () => {
  return (
    <section className="max-w-6xl mx-auto p-8 my-20 bg-white rounded-xl shadow-lg">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-600">About BookNest</h2>

      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        Welcome to <strong>BookNest</strong>, your all-in-one digital bookshelf platform designed to revolutionize how you organize, discover, and engage with books. Whether you're a casual reader or a dedicated bibliophile, BookNest empowers you to create a personalized library accessible anytime, anywhere.
      </p>

      <p className="text-lg leading-relaxed text-gray-700 mb-6">
        With an intuitive interface and powerful features, BookNest makes managing your book collection effortless. Add books with detailed metadata, track your reading progress, and explore curated categories that inspire your next read. Our interactive community features like upvotes and reviews foster meaningful engagement and help surface the best books recommended by fellow readers.
      </p>

      <h3 className="text-3xl font-semibold mt-12 mb-4 text-purple-600">Why BookNest?</h3>
      <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 mb-8">
        <li><strong>Seamless Organization:</strong> Easily add, update, and categorize your books with comprehensive details.</li>
        <li><strong>Personalized Insights:</strong> Track your reading habits, set goals, and analyze your preferences through dynamic charts and stats.</li>
        <li><strong>Community Interaction:</strong> Rate, review, and upvote books to connect with readers and discover trending titles.</li>
        <li><strong>Secure & Reliable:</strong> Powered by Firebase authentication ensuring your data and profile are safe.</li>
        <li><strong>Modern & Responsive UI:</strong> Built with Tailwind CSS and enhanced with smooth animations for an engaging user experience on all devices.</li>
      </ul>

      <h3 className="text-3xl font-semibold mb-4 text-purple-600">Technology Stack</h3>
      <p className="text-lg leading-relaxed text-gray-700 mb-8">
        BookNest leverages modern technologies to deliver performance, security, and scalability:
      </p>
      <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-8">
        <li><strong>React:</strong> For building a fast, interactive, and component-driven frontend.</li>
        <li><strong>Firebase:</strong> Handles secure authentication and backend data storage.</li>
        <li><strong>Tailwind CSS:</strong> Utility-first CSS framework enabling responsive and clean UI design.</li>
        <li><strong>Framer Motion:</strong> Smooth and appealing animations enhancing user engagement.</li>
        <li><strong>Recharts:</strong> Powerful charting library for insightful data visualization.</li>
        <li><strong>SweetAlert2:</strong> User-friendly alerts and confirmations for better UX.</li>
      </ul>

      <h3 className="text-3xl font-semibold mb-4 text-purple-600">Future Plans</h3>
      <p className="text-lg leading-relaxed text-gray-700 mb-8">
        We are committed to evolving BookNest with exciting new features such as:
      </p>
      <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
        <li><strong>Social Sharing:</strong> Enable users to share their collections and reviews on social media platforms.</li>
        <li><strong>Reading Challenges:</strong> Introduce gamification through reading goals and achievements.</li>
        <li><strong>Offline Mode:</strong> Allow access to your bookshelf even without an internet connection.</li>
        <li><strong>Personalized Recommendations:</strong> Use AI-powered suggestions based on your reading history.</li>
        <li><strong>Multi-language Support:</strong> Expand accessibility with localization options.</li>
      </ul>
    </section>
  );
};

export default About;
