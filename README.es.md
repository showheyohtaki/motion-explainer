# Motion Explainer

**Enseña el lenguaje de tu oficio. Haz un mundo más creativo.**

[English](README.md) | [日本語](README.ja.md) | [中文](README.zh.md) | [한국어](README.ko.md) | **Español**

Un prompt para crear **animaciones explicativas de los "24 nombres" esenciales de tu campo**: tres videos en bucle con 8 tarjetas animadas cada uno y una guía rápida de una página, con los nombres que todo profesional de tu campo debería conocer.
Dale este repositorio a una IA de programación (Claude Code, Codex, Cursor, etc.), dile cuál es tu campo y te acompañará en todo el proceso.

![Dos ejemplos: movimientos de cámara (izquierda) y motion graphics (derecha)](assets/preview.gif)

*Dos colecciones hechas así. El estilo de la de cámara es el predeterminado; si tu campo pide otro, cámbialo con total libertad (la de motion graphics es un ejemplo).*

## Por qué lo hice

Estos últimos días he recibido todo tipo de comentarios.

Entre ellos, una persona que había visto mis publicaciones escribió algo que me llamó la atención:

"Lo que me frenaba no era la falta de imaginación, sino no saber cómo se llama este tipo de movimiento."

Cuando lo leí, pensé con fuerza: "Sí, es justo eso".

En tu cabeza ya tienes la imagen, e incluso la idea de "quiero que se mueva así". Lo que falta no es talento ni imaginación; creo que es un "lenguaje común" para pasarle esa imagen a la IA.

Si expertos de todo tipo de campos, en todo tipo de idiomas, mostraran como una biblioteca los términos que, como mínimo, querrían que todos compartiéramos para sacarle de verdad partido a la IA, sería increíblemente útil.

Así que pensé: ¿por qué no empezar por mí mismo? Y reuní todo esto en GitHub para compartirlo.

"this is how you become a creative director" ("así es como te conviertes en director creativo")

También recibí ese comentario, y creo que tiene toda la razón. La capacidad de poner en palabras la imagen que llevas dentro y pasársela a las personas y a la IA es, seguramente, el núcleo de la dirección creativa.

Si a partir de este repositorio surgen en todo el mundo cada vez más directores creativos que despliegan un gran talento junto con la IA, no podría estar más feliz.

— Shohei Ohtaki ([@showheyohtaki](https://x.com/showheyohtaki))

## Cómo usarlo

1. Instala [Node.js](https://nodejs.org/) 18 o superior y [ffmpeg](https://ffmpeg.org/), y en esta carpeta ejecuta:
   ```bash
   npm install
   npx playwright install chromium
   ```
2. Abre la carpeta con tu IA de programación y pega esto, en español:
   ```
   Lee PROMPT.md y síguelo.
   Campo: <tu campo, p. ej. "extracción de café", "iluminación escénica", "componentes de UI">
   Para quién es: <p. ej. "gente que pide fotos de producto a modelos de imagen con IA">
   ```
   PROMPT.md está en inglés, pero la colección se hace en el idioma en el que le hables a la IA: los nombres que de verdad se usan en tu campo en ese idioma, las etiquetas, la guía rápida y el texto de la publicación. Si ese idioma no es el inglés, cada nombre lleva además su nombre en inglés debajo, para que cualquiera sepa qué escribirle a una IA. Una versión en inglés o en otro idioma es opcional; la IA te lo pregunta una sola vez al final.

   **El estilo:** si no dices nada, sale con el estilo de los ejemplos. Añade unas palabras y las seguirá, por ejemplo "hazlo colorido" o "usa nuestro color de marca #1A73E8".
3. Trabaja con ella. Se detiene dos veces para que lo apruebes: cuando la **lista de 24 nombres** está lista y cuando se decide el **estilo** de las tarjetas. Tu experiencia cuenta sobre todo en la primera parada. Después construye, renderiza y revisa los videos, y te ayuda con la imagen de la guía rápida, una revisión independiente y el texto de la publicación.

## Qué hay aquí

```
PROMPT.md / PROMPT.ja.md   el prompt principal: de "mi campo" a una colección terminada, en 7 etapas (inglés / japonés)
prompts/                   prompts auxiliares que usa el principal
  cheatsheet-image.md        la imagen de la guía rápida (para una IA de generación de imágenes)
  review.md                  una revisión independiente en otra conversación
  post.md                    el texto de la publicación, con las publicaciones originales como ejemplo
  translate.md               la misma colección en otro idioma
  (cada uno tiene una versión .ja.md en japonés)
template/index.html        una página en blanco: título, cuadrícula 2x4, etiquetas, puntos de página, contrato de render
render.mjs                 HTML -> mp4, fotograma a fotograma (Playwright + ffmpeg), más imágenes de revisión
check.mjs                  mide los videos terminados: formato, unión del bucle, parpadeo
examples/
  camera-moves/            en/ y ja/: HTML, 3 videos, guía rápida. NAMES.md: los 24 nombres
  motion-graphics/         ja/: HTML, 3 videos, guía rápida. NAMES.md: los 24 nombres
```

## Los ejemplos

| Colección | Estilo | Etiquetas | Archivos |
|---|---|---|---|
| Movimientos de cámara y transiciones | Escenas en gris tipo wireframe dentro de un visor de cámara, solo el sujeto en azul | Inglés, japonés | [`examples/camera-moves`](examples/camera-moves) ・ [nombres](examples/camera-moves/NAMES.md) |
| Motion graphics | Fondo azul marino con cuatro colores; cada tarjeta como un plano de un reel de motion design | Japonés (con nombres en inglés) | [`examples/motion-graphics`](examples/motion-graphics) ・ [nombres](examples/motion-graphics/NAMES.md) |

El autor habla japonés, así que los ejemplos están en japonés; la colección de cámara tiene también versión en inglés. Los mp4 y PNG son los de las publicaciones originales. Cada `NAMES.md` incluye además breves notas sobre las decisiones tomadas al crearla (qué se cambió tras la revisión, cómo se mostraron los nombres difíciles de enseñar).

Abre cualquier `index.html` en un navegador basado en Chromium para ver el bucle. `?page=2` muestra la página 2 y `?t=3.5` un fotograma fijo en el segundo 3,5.

## Cómo funciona el render

Cada video es una página HTML que dibuja en un `<canvas>`. No se usa un reloj en tiempo real: cada fotograma se dibuja a partir de su número.

| En el HTML | Significado |
|---|---|
| `window.N_FRAMES` | fotogramas por página (282 = 9,4 s x 30 fps) |
| `window.renderFrame(i)` | dibuja el fotograma `i` |
| `window.prepareFrame(i)` | opcional, puede ser asíncrono |
| `window.READY` | `true` cuando las fuentes están listas |
| `?page=N`, `?render=1` | qué página / desactiva el bucle de vista previa |

`render.mjs` llama a `renderFrame(i)` en cada fotograma, lee el canvas y lo pasa a ffmpeg, así que no se pierde ningún fotograma aunque el equipo sea lento.

```bash
node render.mjs examples/camera-moves/en/index.html --page 1          # -> out/camera-moves-en-page1.mp4
node render.mjs examples/motion-graphics/ja/index.html --all --sheet --cards  # 3 videos + imágenes de revisión
node check.mjs out/motion-graphics-ja-page1.mp4                      # formato, unión del bucle, parpadeo
```

Opciones: `--page`, `--all`, `--pages`, `--out`, `--out-dir`, `--fps`, `--crf`, `--sheet` (una hoja de contactos por página), `--sheet-fps`, `--cards` (una imagen a tamaño real por tarjeta), `--cards-fps`, `--cards-seconds`. Ejecuta `node render.mjs --help`.
Salida: 1200x1350, 30 fps, H.264 (yuv420p), sin audio.

**Fuentes.** No se carga nada de internet y no se incluyen archivos de fuentes. Los ejemplos usan fuentes que vienen con macOS (Helvetica Neue, Hiragino Sans, Avenir Next, SF Mono). En Windows o Linux el navegador usa otras fuentes, así que el texto se ve un poco distinto, y el japonés necesita una fuente japonesa instalada (por ejemplo Noto Sans JP). Las fuentes se definen como constantes al principio de cada `index.html`. Un render nuevo también puede diferir un poco de los mp4 incluidos por los ajustes de codificación.

## Las publicaciones originales

La serie de la que nace esto (publicaciones en japonés):

- Animaciones de scroll para webs: https://x.com/showheyohtaki/status/2108065874511077598 (no incluida aquí)
- Movimientos de cámara y transiciones: https://x.com/showheyohtaki/status/2109112248832503895
- Motion graphics: https://x.com/showheyohtaki/status/2109840044554891464

## ¿Has hecho una para tu campo?

Publícala con **#MotionExplainer**. Pasaré a verla.

## Licencia

[MIT](LICENSE). Puedes usar los prompts, el código, los videos y las imágenes de este repositorio en tu propio trabajo, también con fines comerciales. Se agradece un enlace, pero no es obligatorio.
