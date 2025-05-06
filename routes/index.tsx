import { Handlers, PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";
import { getPosts } from "../api.ts";
import PostCard from "../components/PostCard.tsx";
import ViewToggle from "../islands/ViewToggle.tsx";

type HomeProps = {
  posts: Post[];
  error?: string;
};

export const handler: Handlers<HomeProps> = {
  async GET(_req, ctx) {
    try {
      const response = await getPosts();
      if (!response.success) {
        return ctx.render({ posts: [], error: "Error al cargar los posts" });
      }
      return ctx.render({ posts: response.data.posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return ctx.render({ 
        posts: [], 
        error: error instanceof Error ? error.message : "Error desconocido" 
      });
    }
  },
};

export default function Home({ data }: PageProps<HomeProps>) {
  const { posts, error } = data;
  const isGridView = useSignal(false);

  const handleViewToggle = (isGrid: boolean) => {
    isGridView.value = isGrid;
  };
  
  return (
    <div class="container">
      <h1>Listado de Posts</h1>
      
      <ViewToggle onToggle={handleViewToggle} />
      
      {error && (
        <div class="error-message">
          <p>{error}</p>
        </div>
      )}
      
      <div class={isGridView.value ? "grid-view" : "list-view"}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <a href={`/post/${post._id}`} key={post._id}>
              <PostCard post={post} viewMode={isGridView.value ? "grid" : "list"} />
            </a>
          ))
        ) : (
          <p>No hay posts disponibles.</p>
        )}
      </div>
    </div>
  );
}
