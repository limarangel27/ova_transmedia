# OVA · Ecosistemas Educativos Conectados — UIIX

Sitio web listo para subir a cualquier hosting. Objeto Virtual de Aprendizaje del MOOC
"Ecosistemas Educativos Conectados: Currículo, Transmedia y Mediación Crítica de la IA"
(Doctorado en Educación e Innovación, UIIX), basado en el documento fuente y alineado
con la rúbrica de evaluación de 5 criterios entregada.

## 1. Estructura de archivos

```
ova/
├── index.html              ← página única con todo el sitio (menú, unidades, quiz, agente)
├── css/style.css           ← estilos e identidad visual institucional
├── js/data.js              ← banco de preguntas, juegos y base de conocimiento del agente
├── js/app.js               ← lógica: navegación, juegos, quiz, agente de voz, puntos
├── assets/                 ← imágenes/íconos (poster de video incluido)
├── media/videos/           ← coloca aquí los .mp4 finales (ver LEEME.txt)
├── media/podcasts/         ← coloca aquí los .mp3 finales (ver LEEME.txt)
└── media/plantillas/       ← plantillas descargables ya incluidas (.md)
```

No requiere backend, base de datos ni build: es HTML/CSS/JS puro.

## 2. Cómo subirlo a tu hosting

**Opción cPanel / hosting compartido (Hostinger, GoDaddy, etc.):**
1. Comprime la carpeta `ova` completa en un .zip.
2. Entra al Administrador de Archivos de tu hosting → carpeta `public_html`.
3. Sube el .zip y descomprímelo ahí (o sube los archivos por FTP con FileZilla).
4. Asegúrate de que `index.html` quede en la raíz de `public_html` (o en la subcarpeta
   si el curso vivirá en `tudominio.com/ova/`).
5. Abre tu dominio en el navegador — el sitio funciona de inmediato.

**Opción Moodle/MoodleCloud (como paquete SCORM-like sencillo):**
Puedes subir la carpeta como recurso "Archivo" o "Página web" enlazando a `index.html`,
o incrustarla vía iframe en un módulo de Moodle si el hosting es externo.

**Opción GitHub Pages / Netlify / Vercel (gratuitas):**
Arrastra la carpeta `ova` al panel de Netlify, o sube el repositorio a GitHub y activa
GitHub Pages apuntando a la raíz. Funciona igual, sin costo.

## 3. Cómo agregar tus videos, podcasts e infografías reales

- **Videos (3 min):** reemplaza los archivos en `media/videos/` respetando los nombres
  indicados en `media/videos/LEEME.txt`. Los guiones de cada video ya están escritos
  dentro del sitio (botón "Ver guion" en cada tarjeta).
- **Podcasts (1 min):** igual que los videos, en `media/podcasts/`, ver `LEEME.txt`.
- **Infografías interactivas:** ya están construidas como tarjetas "flip" funcionales en
  HTML/CSS (no son imágenes estáticas). Si quieres reemplazarlas por infografías de Genially,
  edita el bloque `.info-card` correspondiente en `index.html` y pega el `<iframe>` de
  Genially en su lugar.

## 4. Colores institucionales

Los colores están centralizados en `css/style.css`, dentro de `:root`:

```css
--uiix-navy: #0A2647;   /* azul institucional profundo */
--uiix-blue: #144E8C;   /* azul secundario */
--uiix-gold: #E4A63A;   /* dorado — innovación */
--uiix-orange: #D9722E; /* acento cálido */
```

Estos tonos se inspiran en la identidad visual pública de UIIX (azul institucional +
dorado de innovación). Si cuentas con el manual de marca oficial con los códigos HEX
exactos, solo debes reemplazar estos 4 valores y todo el sitio se actualiza
automáticamente (botones, menú, tarjetas, gráficos).

## 5. El agente virtual (Aika)

- Funciona 100% en el navegador del visitante, sin necesidad de API ni servidor:
  usa las Web Speech APIs nativas (`SpeechSynthesis` para responder en voz alta y
  `SpeechRecognition` para escuchar preguntas por micrófono).
- Mejor soporte en **Chrome o Edge** (escritorio y Android). En Safari/iOS el
  reconocimiento de voz puede no estar disponible; el chat de texto siempre funciona
  y las respuestas se siguen leyendo en voz alta si el navegador lo soporta.
- Su conocimiento está en `js/data.js` (`AGENT_KB`): agrega más pares pregunta/respuesta
  ahí si quieres ampliar lo que puede contestar.
- Si más adelante quieres conectarlo a un modelo de IA real (respuestas más flexibles),
  se puede sustituir `findAnswer()` en `js/app.js` por una llamada a una API de IA;
  actualmente funciona por coincidencia de palabras clave para no depender de conexión
  a ningún servicio externo ni de costos por uso.

## 6. Gamificación y progreso

- Cada unidad tiene un minijuego (clasificar, detectar, verificar) que otorga puntos
  y desbloquea una insignia.
- La autoevaluación final (10 preguntas) también otorga puntos y una insignia si el
  puntaje es alto.
- El progreso se guarda en el navegador del visitante (`localStorage`), por lo que es
  individual por dispositivo/navegador — no requiere cuentas de usuario ni servidor.

## 7. Rúbrica de evaluación

La sección "Rúbrica" reproduce fielmente los 5 criterios del PDF entregado (Diagnóstico
del ecosistema, Fundamentación teórica, Diseño instruccional, Recursos y estrategias
digitales, Calidad académica y presentación), y la autoevaluación final referencia
explícitamente los criterios 3 y 5 en su retroalimentación.

## 8. Personalización rápida

| Quiero cambiar... | Dónde |
|---|---|
| Textos de cada unidad | `index.html`, buscar `id="unidad-1"`, etc. |
| Preguntas del cuestionario | `js/data.js` → `QUESTION_BANK` |
| Preguntas/juegos gamificados | `js/data.js` → `GAME_U1`...`GAME_U4` |
| Respuestas del agente virtual | `js/data.js` → `AGENT_KB` |
| Colores institucionales | `css/style.css` → `:root` |
| Logo | reemplazar el bloque `.brand__mark` en `index.html` por una `<img>` |

---
Generado a partir de: `OVA_Curso_MOOC_Completo.docx` y `rubrica.pdf`.
