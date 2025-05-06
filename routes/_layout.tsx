import { PageProps } from "$fresh/server.ts";

// Layaout básico para nevegar por la app
export default function Layout({ Component }: PageProps) {
  return (
        <div class="container">
            <nav>
                <ul>
                <li>
                    <a href="/">Inicio</a>
                </li>
                <li>
                    <a href="/search">Búsqueda</a>
                </li>
                <li>
                    <a href="/post/create">Crear Post</a>
                </li>
                </ul>
            </nav>
            <div>
                <Component />
            </div>
        </div>
        
  );
}