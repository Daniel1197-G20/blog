import Link from "next/link";
import PostDetail from "@/components/blog/PostDetail/PostDetail";
import CommentSection from "@/components/blog/CommentSection/CommentSection";
import type { Metadata } from "next";
import { postsService } from "@/lib/postsService";

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const post = await postsService.getPostById(id);
    return { title: post.title, description: post.body.slice(0, 155), openGraph: { title: post.title, description: post.body.slice(0, 155), type: "article" } };
  } catch { return { title: "Article" }; }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-forest-700 hover:text-forest-900 dark:text-forest-300 dark:hover:text-forest-100"
        >
          &larr; Back to Journal
        </Link>
      </div>

      <PostDetail id={id} />

      <CommentSection postId={id} />
    </div>
  );
}
