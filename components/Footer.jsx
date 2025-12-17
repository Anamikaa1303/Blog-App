import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <h2 className="text-xl font-semibold tracking-wide">Blogger</h2>

        {/* Copyright */}
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} Blogger. All rights reserved.
        </p>

        {/* Icons */}
        <div className="flex gap-5 text-xl">
          <a href="#" className="hover:text-blue-500 transition">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
