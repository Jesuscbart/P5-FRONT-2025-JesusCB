// Tipo para un post del blog
export type Post = {
  _id: string;
  title: string;
  content: string;
  author: string;
  cover: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

// Tipo para un comentario en un post
export type Comment = {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
};

// Tipos para respuestas de la API
export type ApiResponse = {
  success: boolean;
};

export type PostsResponse = ApiResponse & {
  data: {
    posts: Post[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type PostResponse = ApiResponse & {
  data: Post;
}; 