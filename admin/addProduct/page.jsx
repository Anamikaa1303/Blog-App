'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { assests } from '@/Assests/assests';
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: 'Alex Bennett',
    authorImg: '/author_img.png',
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          title: '',
          description: '',
          category: 'Startup',
          author: 'Alex Bennett',
          authorImg: '/author_img.png',
        });
        setImage(null);
      }
    } catch (error) {
      toast.error('Server error: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center sm:justify-start px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-12 w-full">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        {/* Upload Thumbnail */}
        <p className="text-lg sm:text-xl font-semibold">Upload Thumbnail</p>
        <label htmlFor="image">
          <div className="relative w-full h-40 sm:h-48 md:h-52 lg:h-60 cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Image
              src={!image ? assests.upload_area : URL.createObjectURL(image)}
              alt="thumbnail"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />

        {/* Blog Title */}
        <p className="text-lg sm:text-xl font-semibold">Blog Title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          placeholder="Type here"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
        />

        {/* Blog Description */}
        <p className="text-lg sm:text-xl font-semibold">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          placeholder="Write content here..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition resize-none"
        />

        {/* Blog Category */}
        <p className="text-lg sm:text-xl font-semibold">Category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition text-gray-700"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>

        {/* Submit Button */}
        <button className="w-full sm:w-48 py-3 bg-black text-white rounded-lg shadow-md hover:shadow-xl hover:bg-gray-800 transition-all duration-300">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Page;
