import React, { useState, useEffect } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blog');
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <div className='flex justify-center gap-6 my-10'>
        {['All', 'Technology', 'Startup', 'Lifestyle'].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={menu === cat ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className='flex flex-wrap justify-around gap-4 gap-y-10 mb-16 xl:mx-24'>
        {blogs
          .filter((item) => (menu === 'All' ? true : item.category === menu))
          .map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
