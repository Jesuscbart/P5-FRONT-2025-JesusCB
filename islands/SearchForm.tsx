import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Post } from "../types.ts";
import { getPosts } from "../utils/api.ts";
import PostCard from "../components/PostCard.tsx";

export default function SearchForm() {
  const searchTerm = useSignal("");
  const posts = useSignal<Post[]>([]);
  const isLoading = useSignal(false);
  const error = useSignal("");

  const searchPosts = async () => {
    if (!searchTerm.value.trim()) {
      posts.value = [];
      return;
    }
    
    try {
      isLoading.value = true;
      error.value = "";
      
      const response = await getPosts(1, 10, searchTerm.value);
      if (response.success) {
        posts.value = response.data.posts;
      } else {
        error.value = "Error al buscar posts";
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
      posts.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  // Efecto para realizar la búsqueda cuando cambia la palabra
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.value.length >= 3) {
        searchPosts();
      } else if (searchTerm.value.length === 0) {
        posts.value = [];
      }
    }, 500);
    
    return () => clearTimeout(delaySearch);
  }, [searchTerm.value]);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Buscar posts..."
          value={searchTerm.value}
          onInput={(e) => {
            searchTerm.value = (e.target as HTMLInputElement).value;
          }}
        />
      </div>
      
      {isLoading.value && <p>Buscando...</p>}
      
      {error.value && (
        <div class="error-message">
          <p>{error.value}</p>
        </div>
      )}
      
      <div class="list-view">
        {posts.value.length > 0 ? (
          posts.value.map((post) => (
            <a href={`/post/${post._id}`} key={post._id}>
              <PostCard post={post} viewMode="list" />
            </a>
          ))
        ) : (
          searchTerm.value.length >= 3 && !isLoading.value && <p>No se encontraron posts con ese término.</p>
        )}
      </div>
    </>
  );
} 