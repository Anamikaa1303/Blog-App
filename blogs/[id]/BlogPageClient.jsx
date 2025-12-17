"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaGooglePlusG } from "react-icons/fa";

// Components
import Footer from "@/Components/Footer";

// Assets
import { assests } from "@/Assests/assests";

const BlogPageClient = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlogData = async () => {
      try {
        const response = await axios.get("/api/blog", { params: { id } });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlogData();
  }, [id]);

  if (!data) return <p className="text-center mt-20">Loading...</p>;

  const blogImage = data.image || "/placeholder.png";
  const authorImage = data.authorImg || "/profile_icon.jpg";

  return (
    <>
      {/* HEADER */}
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/">
            <Image
              src={assests.logo || "/placeholder.png"}
              width={180}
              height={50}
              alt="Logo"
              className="w-[130px] sm:w-auto"
            />
          </Link>

          <Link href="/admin">
            <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000] hover:bg-black hover:text-white transition cursor-pointer">
              Get started
              <Image
                src={assests.arrow || "/placeholder.png"}
                width={25}
                height={25}
                alt="Arrow"
              />
            </button>
          </Link>
        </div>

        {/* TITLE + AUTHOR */}
        <div className="text-center my-12 sm:my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>

          <Image
            src={authorImage}
            width={50}   // smaller author image
            height={50}  // smaller author image
            alt={data.author || "Author"}
            className="mx-auto mt-6 border border-white rounded-full"
          />

          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-5 max-w-[700px] md:mx-auto mt-[-80px] sm:mt-[-100px] mb-20"> {/* Added more bottom margin */}
        <Image
          src={blogImage}
          width={800}   // smaller blog image width
          height={450}  // smaller blog image height
          alt={data.title}
          className="border-4 border-white rounded-md"
        />

        
        <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: data.description }}/>


        <div className="my-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <p className="font-semibold text-gray-700">Share this article:</p>
        <div className="flex gap-4">
    {/* Facebook */}
       <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition transform hover:scale-110"
    >
      <FaFacebookF size={20} />
    </a>

    {/* Twitter */}
    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition transform hover:scale-110"
    >
      <FaTwitter size={20} />
    </a>

    {/* Google Plus / Gmail */}
    <a
      href={`https://plus.google.com/share?url=${encodeURIComponent(window.location.href)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition transform hover:scale-110"
    >
      <FaGooglePlusG size={20} />
    </a>
  </div>
</div>

      </div>

      <Footer />
    </>
  );
};

export default BlogPageClient;
