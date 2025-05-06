import { useSignal } from "@preact/signals";
import { likePost } from "../api.ts";

type LikeButtonProps = {
  postId: string;
  initialLikes: number;
};

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const likes = useSignal(initialLikes);
  const isLoading = useSignal(false);
  const error = useSignal("");

  const handleLike = async () => {
    try {
      isLoading.value = true;
      error.value = "";
      
      const response = await likePost(postId);
      if (response.success) {
        likes.value = response.data.likes;
      } else {
        error.value = "Error al dar like";
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Error desconocido";
    } finally {
      isLoading.value = false;
    }
  };

  return (
    <div>
      <button 
        type="button"
        onClick={handleLike}
        disabled={isLoading.value}
      >
        {isLoading.value ? "Procesando..." : `❤️ Me gusta (${likes.value})`}
      </button>
      {error.value && <p class="error-message">{error.value}</p>}
    </div>
  );
} 