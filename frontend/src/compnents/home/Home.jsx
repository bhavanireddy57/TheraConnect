/*import React from 'react';
import Home1 from './Home1';
import Home2 from './Home2';
import Home3 from './Home3';
import Navbar from '../navbar/Navbar';
const Home = () => {
  return (
    <div>
        <Navbar />
        <div className='mt-20'>
        <Home1 />
        <Home2 />
        <Home3 />
        </div>
    </div>
  )
}

export default <Home></Home>*/



import React from "react";
import Navbar from "../navbar/Navbar";
import Home1 from "./Home1";
import Home2 from "./Home2";
import Home3 from "./Home3";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#f8fbff] to-[#eef3f7] min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero + Sections */}
      <div className="mt-20 space-y-32">
        <Home1 />
        <Home2 />
        <Home3 />
      </div>

      {/* Footer */}
      <footer className="bg-white py-10 mt-32 shadow-inner">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-gray-700 font-semibold text-lg mb-3">
            Thera Connect
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            A safe space for self-reflection, growth, and mental well-being.
          </p>
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Thera Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;



