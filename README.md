# Práctica 5 Frontend 

Autor: Jesús Cuesta Bartolomé

# Instrucciones de la actividad

Este proyecto consiste en desarrollar una interfaz web con Deno Fresh que consume la API del backend desplegado en https://back-p5-y0e1.onrender.com/ y utiliza su documentación en https://back-p5-y0e1.onrender.com/docs.

## 1. Páginas requeridas

1. / — Listado de posts
    * En el handler SSR, llama a GET https://back-p5-y0e1.onrender.com/api/post.
    * Renderiza una lista de tarjetas con título y resumen de cada post.
    * Añade una señal (useSignal<boolean>) que permita alternar entre vista lista y vista cuadrícula mediante un botón.
    * En vista cuadrícula, muestra además la imagen de cover de cada post, junto a título y autor.
* En vista lista, muestra solo título y autor (sin cover).
* El estado de la vista no se persiste fuera de la sesión actual.

2. /search — Búsqueda de posts
    * Incluye un campo de texto controlado con useSignal<string> para la palabra clave.
    * Al cambiar el término (con useEffect), ejecuta GET /post?search=<término> y muestra los resultados bajo el input siguendo el formato de lista.

3. /post/create — Formulario de creación
    * Formulario con campos: título, cover, contenido y autor.
    * Validación básica en cliente (required, longitud mínima).
    * Al enviar, haz POST https://back-p5-y0e1.onrender.com/api/post con el body JSON y muestra un mensaje de éxito (“Creado con ID …”) o de error.
    * Deshabilita el botón de envío mientras la petición esté en curso.
4. /post/[id] — Detalle de un post
    * Ruta dinámica: en SSR lee params.id y llama a GET https://back-p5-y0e1.onrender.com/api/post/<id>.
    * Muestra el contenido completo del post junto a comentarios
    * Añade un botón de “Me gusta” que, al pulsarlo, envíe una petición POST https://back-p5-y0e1.onrender.com/api/post/<id>/like al servidor y, tras recibir confirmación, recargue o revalide la página para mostrar el nuevo conteo.

## 2. Sugerencias de implementación
* Documentación oficial
* Para profundizar en Fresh, consulta la guía y referencias en: https://fresh.deno.dev/docs
* SSR y fetch
* Utiliza el handler de cada ruta para invocar la API del backend (fetch) y pasar los datos al componente con ctx.render.
* Señales y hooks
* Usa useSignal para gestionar estados reactivamente (toggle de vista, término de búsqueda).
* Usa useEffect para disparar acciones en cliente cuando cambien las señales (por ejemplo, lanzar la búsqueda).
* Rutas dinámicas
* Define archivos en routes/post/[id].tsx, lee params.id en el handler y realiza el fetch correspondiente para cada detalle, así como la petición de “Me gusta”.

## 3. Criterios de evaluación

Aspecto - Peso
Integración SSR con la API REST - 30 %
Rutas estáticas y dinámicas - 20 %
Uso de señales y hooks para interactividad - 20 %
Validación y UX en el formulario - 15 %
Limpieza de código y organización - 10 %
Presentación (claridad y completitud) - 5 %