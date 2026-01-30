import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../../Home/Shared/NavBar/NavBar';
import Footer from '../../Home/Shared/Footer/Footer';

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