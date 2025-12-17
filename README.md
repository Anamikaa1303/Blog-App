
📝 Blog App

A modern Blog Application built with Next.js and React, designed for creating and managing blog content with ease. It supports full CRUD operations, a clean UI, and responsive design—perfect for personal blogging or content showcase platforms.

🚀 Features

⚡ Built with Next.js 13+ and React 18

📱 Fully responsive (mobile & desktop)

✍️ Create, Read, Update & Delete blog posts

🖊️ Rich text editor for writing blog content

🖼️ Image optimization using Next.js Image

🌐 API handling with Axios

🔔 Toast notifications for success & error messages

🔐 Environment-based configuration support

🛠️ Tech Stack
Frontend

Next.js

React

Tailwind CSS / CSS Modules

Backend

Next.js API Routes

Database

MongoDB

Libraries & Tools

Axios

React-Toastify

Mongoose

📁 Project Structure
Blog-App/
├── app/
├── components/
│   ├── BlogItem.jsx
│   └── BlogList.jsx
├── lib/
│   ├── config/
│   │   └── db.js
│   └── models/
│       ├── BlogModel.js
│       └── EmailModel.js
├── assets/
│   ├── assets.js
│   └── images/
├── public/
├── .env.local
├── next.config.mjs
├── package.json
└── README.md

📦 Installation
1️⃣ Clone the Repository
git clone https://github.com/Anamikaa1303/Blog-App.git
cd Blog-App

2️⃣ Install Dependencies
npm install
# or
yarn install

3️⃣ Environment Setup

Create a .env.local file in the root directory:

MONGODB_URI=your_mongodb_connection_string

▶️ Run the Application
npm run dev
# or
yarn dev


Open your browser and visit:
👉 http://localhost:3000

🌐 Deployment

You can easily deploy this app using Vercel:

Push your code to GitHub

Import the repository into Vercel

Add environment variables in Vercel dashboard

Deploy 🚀

