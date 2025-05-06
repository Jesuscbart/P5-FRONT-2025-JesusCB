import CreatePostForm from "../../islands/CreatePostForm.tsx";

/**
 * Página para crear un nuevo post
 */
export default function CreatePost() {
  return (
    <div class="container">
      <CreatePostForm />
      
      <div>
        <a href="/">Volver al listado</a>
      </div>
    </div>
  );
} 