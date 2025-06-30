import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer';
import NavBar from '../pages/Shared/NavBar';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
