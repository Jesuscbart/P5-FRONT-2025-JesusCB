import { useSignal } from "@preact/signals";
import { createPost } from "../api.ts";

export default function CreatePostForm() {
  const title = useSignal("");
  const author = useSignal("");
  const content = useSignal("");
  const cover = useSignal("");
  
  const isLoading = useSignal(false);
  const error = useSignal("");
  const success = useSignal("");
  const newPostId = useSignal("");
  
  // Validaciones
  const titleError = useSignal("");
  const authorError = useSignal("");
  const contentError = useSignal("");
  
  // Validación básica
  const validateForm = () => {
    let isValid = true;
    
    // Validar título
    if (!title.value.trim()) {
      titleError.value = "El título es obligatorio";
      isValid = false;
    } else if (title.value.trim().length < 5) {
      titleError.value = "El título debe tener al menos 5 caracteres";
      isValid = false;
    } else {
      titleError.value = "";
    }
    
    // Validar autor
    if (!author.value.trim()) {
      authorError.value = "El autor es obligatorio";
      isValid = false;
    } else {
      authorError.value = "";
    }
    
    // Validar contenido
    if (!content.value.trim()) {
      contentError.value = "El contenido es obligatorio";
      isValid = false;
    } else if (content.value.trim().length < 10) {
      contentError.value = "El contenido debe tener al menos 10 caracteres";
      isValid = false;
    } else {
      contentError.value = "";
    }
    
    return isValid;
  };
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      isLoading.value = true;
      error.value = "";
      success.value = "";
      newPostId.value = "";
      
      const response = await createPost({
        title: title.value,
        content: content.value,
        author: author.value,
        cover: cover.value || "https://via.placeholder.com/800x400?text=Sin+imagen",
      });
      
      if (response.success) {
        success.value = "Post creado correctamente";
        newPostId.value = response.data._id;
        
        // Limpiar formulario
        title.value = "";
        author.value = "";
        content.value = "";
        cover.value = "";
      } else {
        error.value = "Error al crear el post";
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
    } finally {
      isLoading.value = false;
    }
  };
  
  return (
    <div>
      <h1>Crear nuevo post</h1>
      
      {error.value && (
        <div class="error-message">
          <p>{error.value}</p>
        </div>
      )}
      
      {success.value && (
        <div class="success-message">
          <p>{success.value}</p>
          {newPostId.value && (
            <p>
              ID del post: {newPostId.value} - 
              <a href={`/post/${newPostId.value}`}>Ver post</a>
            </p>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            value={title.value}
            onInput={(e) => {
              title.value = (e.target as HTMLInputElement).value;
            }}
          />
          {titleError.value && <p>{titleError.value}</p>}
        </div>
        
        <div>
          <label htmlFor="author">Autor *</label>
          <input
            type="text"
            id="author"
            value={author.value}
            onInput={(e) => {
              author.value = (e.target as HTMLInputElement).value;
            }}
          />
          {authorError.value && <p>{authorError.value}</p>}
        </div>
        
        <div>
          <label htmlFor="cover">URL de la imagen de portada</label>
          <input
            type="text"
            id="cover"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={cover.value}
            onInput={(e) => {
              cover.value = (e.target as HTMLInputElement).value;
            }}
          />
        </div>
        
        <div>
          <label htmlFor="content">Contenido *</label>
          <textarea
            id="content"
            value={content.value}
            onInput={(e) => {
              content.value = (e.target as HTMLTextAreaElement).value;
            }}
          />
          {contentError.value && <p>{contentError.value}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isLoading.value}
        >
          {isLoading.value ? "Creando..." : "Crear post"}
        </button>
      </form>
    </div>
  );
} 