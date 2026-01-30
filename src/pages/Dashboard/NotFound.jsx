import React from 'react';
import { Link } from "react-router-dom";
const NotFound = () => {
return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl my-4">Page Not Found</p>
      <Link to="/" className="btn btn-primary">
        Go to Homepage
      </Link>
    </div>
  );
};
export default NotFound;