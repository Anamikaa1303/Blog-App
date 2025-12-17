import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
import path from "path";
const fs = require('fs')



// GET all blogs
export async function GET(request) {
  await connectDB();
  
  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }
  else{
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// API Endpoint for uploading Blogs
export async function POST(request) {
  await connectDB();
  const formData = await request.formData();
  const timestamp = Date.now();

  // Get image file
  const image = formData.get("image");

  if (!image) {
    return NextResponse.json(
      { error: "No image sent in formData" },
      { status: 400 }
    );
  }

  // Convert to buffer
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);

  // Absolute file path (FIXED)
  const filePath = path.join(process.cwd(), "public", `${timestamp}_${image.name}`);

  // Save file
  await writeFile(filePath, buffer);

  // Create image URL
  const imgUrl = `/${timestamp}_${image.name}`;
 

  const blogData = {
    title:`${formData.get('title')}`,
    description:`${formData.get('description')}`,
    category:`${formData.get('category')}`,
    author:`${formData.get('author')}`,
    image:`${imgUrl}`,
    authorImg:`${formData.get('authorImg')}`
  }
  
  
  await BlogModel.create(blogData);
  

  return NextResponse.json({ success: true, msg: "Blog Added" });
}

//Creating API endpoint to delete blog

//Creating API endpoint to delete blog
export async function DELETE(request) {
  await connectDB(); // Make sure DB is connected

  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: "No blog ID provided" }, { status: 400 });
  }

  try {
    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Delete image from public folder if it exists
    if (blog.image) {
      const imagePath = `./public${blog.image}`;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete blog from database
    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}