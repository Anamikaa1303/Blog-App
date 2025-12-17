'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { assests } from '@/Assests/assests';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-black rounded shadow"
        onClick={toggleSidebar}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 w-72 h-screen bg-slate-100 border-r border-black z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          sm:translate-x-0 sm:relative sm:h-screen
        `}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b border-black flex justify-center sm:justify-start">
          <Image src={assests.logo} width={120} alt="Logo" />
        </div>

        {/* Links */}
        <div className="flex flex-col mt-8 px-4 sm:px-6 gap-4 h-full">
          <Link
            href="/admin/addProduct"
            className="flex items-center gap-2 font-medium px-3 py-2 bg-white border border-black shadow-[-5px_5px_0px_#000000] hover:bg-gray-100 transition"
          >
            <Image src={assests.add_icon} alt="" width={32} />
            <span className="hidden sm:inline">Add Blogs</span>
          </Link>

          <Link
            href="/admin/blogList"
            className="flex items-center gap-2 font-medium px-3 py-2 bg-white border border-black shadow-[-5px_5px_0px_#000000] hover:bg-gray-100 transition"
          >
            <Image src={assests.blog_icon} alt="" width={32} />
            <span className="hidden sm:inline">Blog Lists</span>
          </Link>

          <Link
            href="/admin/subscriptions"
            className="flex items-center gap-2 font-medium px-3 py-2 bg-white border border-black shadow-[-5px_5px_0px_#000000] hover:bg-gray-100 transition"
          >
            <Image src={assests.email_icon} alt="" width={32} />
            <span className="hidden sm:inline">Subscriptions</span>
          </Link>

          {/* Push content to bottom if needed */}
          <div className="mt-auto px-4 py-4">
            <p className="text-gray-500 text-sm">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
