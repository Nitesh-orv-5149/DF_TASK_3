import React from 'react';
import Link from 'next/link';

interface PageProps {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
}

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center overflow-hidden relative">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/5 left-1/10 w-20 h-20 bg-gray-100 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/5 w-15 h-15 bg-gray-200 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/5 w-10 h-10 bg-white rounded-full opacity-10 animate-pulse delay-2000"></div>
      </div>
      
      <div className="text-center p-8 max-w-md w-full relative z-10">
        <div className="text-5xl text-gray-100 mb-4 opacity-80">🔒</div>
        <div className="text-8xl md:text-9xl font-black text-gray-100 mb-4 opacity-90 animate-pulse">
          401
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Unauthorized
        </h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed opacity-90">
          You don't have permission to access this resource. Please check your credentials and try again.
        </p>
        <Link 
          href="/" 
          className="inline-block px-8 py-4 bg-gradient-to-r from-gray-800 to-black text-white no-underline rounded-full font-semibold text-lg border-2 border-gray-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 hover:border-gray-100 active:translate-y-0 relative overflow-hidden group"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
          <span className="relative">Go to Home Page</span>
        </Link>
      </div>
    </div>
  );
}