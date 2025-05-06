// Utilidades para interactuar con la API

const API_URL = "https://back-p5-y0e1.onrender.com/api";

/**
 * Obtiene todos los posts con paginación opcional y búsqueda
 */
export async function getPosts(page = 1, limit = 10, search = "") {
  const searchParams = new URLSearchParams();
  if (page) searchParams.append("page", page.toString());
  if (limit) searchParams.append("limit", limit.toString());
  if (search) searchParams.append("search", search);

  const queryString = searchParams.toString();
  const url = `${API_URL}/posts${queryString ? "?" + queryString : ""}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Error al obtener posts: ${response.status}`);
  }
  
  return await response.json();
}

/**
 * Obtiene un post por su ID
 */
export async function getPostById(id: string) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  
  if (!response.ok) {
    throw new Error(`Error al obtener el post: ${response.status}`);
  }
  
  return await response.json();
}

/**
 * Crea un nuevo post
 */
export async function createPost(postData: {
  title: string;
  content: string;
  author: string;
  cover: string;
}) {
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  
  if (!response.ok) {
    throw new Error(`Error al crear el post: ${response.status}`);
  }
  
  return await response.json();
}

/**
 * Da like a un post
 */
export async function likePost(id: string) {
  const response = await fetch(`${API_URL}/posts/${id}/like`, {
    method: "POST",
  });
  
  if (!response.ok) {
    throw new Error(`Error al dar like al post: ${response.status}`);
  }
  
  return await response.json();
}

/**
 * Añade un comentario a un post
 */
export async function addComment(postId: string, commentData: {
  author: string;
  content: string;
}) {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  
  if (!response.ok) {
    throw new Error(`Error al añadir el comentario: ${response.status}`);
  }
  
  return await response.json();
} 