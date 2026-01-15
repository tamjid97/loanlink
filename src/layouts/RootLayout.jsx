import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/Home/Shared/NavBar/NavBar';
import Footer from '../pages/Home/Shared/Footer/Footer';

const RootLayout = () => {
  return (
    <div>
      <NavBar/>
      <Outlet></Outlet>
      <Footer/>
    </div>
  );
};

export default RootLayout;