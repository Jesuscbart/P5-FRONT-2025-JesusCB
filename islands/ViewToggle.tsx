import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

type ViewToggleProps = {
  onToggle: (isGrid: boolean) => void;
  initialValue?: boolean;
};

export default function ViewToggle({ onToggle, initialValue = false }: ViewToggleProps) {
  const isGrid = useSignal(initialValue);

  useEffect(() => {
    onToggle(isGrid.value);
  }, [isGrid.value]);

  return (
    <button type="button"onClick={() => isGrid.value = !isGrid.value}>
      Cambiar a vista {isGrid.value ? "lista" : "cuadrícula"}
    
    </button>
  );
} 