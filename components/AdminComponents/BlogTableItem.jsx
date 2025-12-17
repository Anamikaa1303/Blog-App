import React from "react";
import Image from "next/image";
import { assests } from "@/Assests/assests"; // contains profile_icon

const BlogTableItem = ({authorImg,title,author,date,deleteBlog,mongoId}) => {
    const BlogDate = new Date(date);
  return (
    <tr className='bg-white border-b'>
      <th
        scope='row'
        className='items-center gap-3 sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
      >
        <Image src={assests.profile_icon} width={40} alt='' />
        <p>{author?author:"No author"}</p>
      </th>

      <td className='px-6 py-4'>
        {title ? title : "No Title"}
      </td>

      <td className='px-6 py-4'>
        {BlogDate.toDateString()}
      </td>

      <td onClick={()=>deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer text-pink-600 font-bold'>X</td>
    </tr>
  );
};

export default BlogTableItem;
