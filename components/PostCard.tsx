import { Post } from "../types.ts";

type PostCardProps = {
  post: Post;
  viewMode: "list" | "grid";
};

export default function PostCard({ post, viewMode }: PostCardProps) {
  
  if (viewMode === "list") {
    return (
      <div>
        <div>
          <h3>{post.title}</h3>
          <p>Autor: {post.author}</p>
        </div>
        <div>
          <span>{post.likes} likes</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <img 
        src={post.cover} 
        alt={`Portada de ${post.title}`} 
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x150?text=Sin+imagen";
        }}
      />
      <div>
        <h3>{post.title}</h3>
        <div>
          <p>Autor: {post.author}</p>
          <span>{post.likes} likes</span>
        </div>
      </div>
    </div>
  );
} 