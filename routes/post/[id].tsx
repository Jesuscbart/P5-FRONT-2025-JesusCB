import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../../types.ts";
import { getPostById } from "../../utils/api.ts";
import LikeButton from "../../islands/LikeButton.tsx";

type PostDetailProps = {
  post: Post;
  error?: string;
};

export const handler: Handlers<PostDetailProps> = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    try {
      const response = await getPostById(id);
      if (!response.success) {
        return ctx.render({ 
          post: {} as Post, 
          error: "Error al cargar el post" 
        });
      }
      return ctx.render({ post: response.data });
    } catch (error) {
      console.error("Error fetching post detail:", error);
      return ctx.render({ 
        post: {} as Post, 
        error: error instanceof Error ? error.message : "Error desconocido" 
      });
    }
  },
};

export default function PostDetail({ data }: PageProps<PostDetailProps>) {
  const { post, error } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (error) {
    return (
      <div class="container">
        <div class="error-message">
          <p>{error}</p>
          <a href="/">Volver al inicio</a>
        </div>
      </div>
    );
  }

  if (!post || !post._id) {
    return (
      <div class="container">
        <p>Post no encontrado</p>
        <a href="/">Volver al inicio</a>
      </div>
    );
  }

  return (
    <div class="container">
      <div class="post-detail">
        {post.cover && (
          <img 
            src={post.cover} 
            alt={`Portada de ${post.title}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Sin+imagen";
            }}
          />
        )}
        
        <h1>{post.title}</h1>
        
        <div>
          <span>Autor: {post.author}</span>
          <span>Publicado: {formatDate(post.createdAt)}</span>
        </div>
        
        <div>
          {post.content}
        </div>
        
        <LikeButton postId={post._id} initialLikes={post.likes} />
        
        <div class="comments-section">
          <h2>Comentarios ({post.comments?.length || 0})</h2>
          
          {post.comments && post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div class="comment" key={comment._id}>
                <p><strong>{comment.author}</strong></p>
                <p>{formatDate(comment.createdAt)}</p>
                <p>{comment.content}</p>
              </div>
            ))
          ) : (
            <p>No hay comentarios todavía.</p>
          )}
        </div>
      </div>
      
      <div>
        <a href="/">Volver al listado</a>
      </div>
    </div>
  );
} 