import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 p-6">
      <h1 className="text-9xl font-bold text-slate-700">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-slate-400 mt-2 text-center max-w-md">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition transform hover:-translate-y-1 hover:shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
