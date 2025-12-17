import BlogPageClient from "./BlogPageClient";

export default async function Page({ params }) {
  const { id } = await params; // Next.js 14–16 requires await for dynamic params

  return (
    <div>
      <BlogPageClient id={id} />
    </div>
  );
}
