'use client';
import React, { useEffect, useState } from 'react';
import { FiFileText, FiMail } from 'react-icons/fi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalSubscriptions: 0,
  });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogsRes = await axios.get('/api/blog');
        const emailsRes = await axios.get('/api/email');

        setStats({
          totalBlogs: blogsRes.data.blogs.length,
          totalSubscriptions: emailsRes.data.emails.length,
        });

        setBlogs(blogsRes.data.blogs);
      } catch (error) {
        toast.error('Failed to load data');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 pt-5 px-4 sm:pt-12 sm:pl-8 md:px-12 lg:px-16">
      <ToastContainer theme="dark" />
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <FiFileText size={32} className="text-blue-600" />
          <div>
            <p className="text-gray-500">Total Blogs</p>
            <p className="text-2xl font-semibold">{stats.totalBlogs}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
          <FiMail size={32} className="text-green-600" />
          <div>
            <p className="text-gray-500">Total Subscriptions</p>
            <p className="text-2xl font-semibold">{stats.totalSubscriptions}</p>
          </div>
        </div>
      </div>

      {/* Blog List Table */}
      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
        <table className="min-w-full w-full text-sm sm:text-base text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Blog Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.length > 0 ? (
              blogs.map((blog, idx) => (
                <tr key={idx} className="hover:bg-gray-100 transition">
                  <td className="px-6 py-4">{blog.title}</td>
                  <td className="px-6 py-4">{blog.author}</td>
                  <td className="px-6 py-4">{new Date(blog.date).toDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
