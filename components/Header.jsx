"use client";

import React, { useState } from "react";
import { assests } from "@/Assests/assests";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post("/api/email", formData);

      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Error subscribing");
      }
    } catch (err) {
      toast.error("Server Error");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assests.logo}
          width={180}
          alt="logo"
          className="w-[130px] sm:w-auto"
        />

        {/* ✅ Redirects to /admin */}
        <Link href="/admin">
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000] cursor-pointer">
            Get started
            <Image
              src={assests.arrow}
              alt="arrow"
              className="w-[25px]"
            />
          </button>
        </Link>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          "Welcome to the Latest Insights Hub — your go-to destination for fresh updates on Technology, Lifestyle, and Startup innovations. Stay informed with trending stories, expert opinions, and real-world insights curated just for you."
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 text-gray-700 outline-none placeholder-gray-400"
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
