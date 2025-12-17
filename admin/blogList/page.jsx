'use client';
import React, { useEffect, useState } from 'react';
import BlogTableItem from '@/components/AdminComponents/BlogTableItem';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId },
      });
      toast.success(response.data.msg);
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-4 sm:pt-12 sm:pl-8 md:px-12 lg:px-16">
      <ToastContainer theme="dark" />
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">All Blogs</h1>

      {/* Large screens: Table */}
      <div className="hidden md:block overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
        <table className="min-w-full w-full text-sm sm:text-base text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs sm:text-sm">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">Author</th>
              <th scope="col" className="px-6 py-3 text-left">Blog Title</th>
              <th scope="col" className="px-6 py-3 text-left">Date</th>
              <th scope="col" className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((item, index) => (
              <BlogTableItem
                key={index}
                mongoId={item._id}
                title={item.title}
                author={item.author}
                authorImg={item.authorImg}
                date={item.date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Small screens: Card layout */}
      <div className="flex flex-col gap-4 md:hidden">
        {blogs.map((item) => (
          <div key={item._id} className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              {item.authorImg && (
                <img
                  src={item.authorImg}
                  alt={item.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{item.author}</span>
                <span className="text-sm text-gray-500">{new Date(item.date).toDateString()}</span>
              </div>
            </div>
            <div className="mt-2">
              <h2 className="font-semibold text-gray-700">{item.title}</h2>
            </div>
            <button
              onClick={() => deleteBlog(item._id)}
              className="mt-2 self-start px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
        <p className="mt-6 text-center text-gray-500 text-sm sm:text-base">
          No blogs found.
        </p>
      )}
    </div>
  );
};

export default Page;
