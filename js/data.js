/* ============================================================
   OVA UIIX — Banco de datos
   Ecosistemas Educativos Conectados: Currículo, Transmedia
   y Mediación Crítica de la IA
   ============================================================ */

/* ---------- Banco de preguntas por unidad (fuente: documento OVA) ---------- */
const QUESTION_BANK = {
  u1: [
    {
      q: "¿Cuál de las siguientes situaciones describe mejor el modelo de 'aula insular'?",
      options: [
        "Un curso que integra videoconferencia, correo institucional y nube en un solo flujo visible para toda la comunidad.",
        "Un curso sostenido en un blog personal del docente, desconectado de las demás plataformas institucionales.",
        "Un curso que centraliza sus recursos en carpetas compartidas de OneDrive accesibles para el estudiantado.",
        "Un curso que usa Teams únicamente para reuniones administrativas del área."
      ],
      correct: 1,
      feedback: "El aula insular se caracteriza por el aislamiento de un canal frente al resto del ecosistema institucional, como ocurre con los blogs personales atomizados."
    },
    {
      q: "Según el diagnóstico del Colegio Castilla IED, ¿qué elemento evidencia una infraestructura 'fantasma'?",
      options: [
        "El uso diario del correo institucional por parte de los estudiantes.",
        "Herramientas pagadas por la institución que no se habitan pedagógicamente.",
        "La existencia de carpetas compartidas de OneDrive para el alumnado.",
        "La autonomía técnica total sobre los servidores institucionales."
      ],
      correct: 1,
      feedback: "La infraestructura 'fantasma' refiere a licencias y plataformas ya pagadas que permanecen subutilizadas pedagógicamente."
    },
    {
      q: "La sostenibilidad financiera de la propuesta de la Unidad 1 se basa en:",
      options: [
        "La adquisición de nuevos servidores físicos para la institución.",
        "La contratación de licencias adicionales de videoconferencia.",
        "El aprovechamiento pedagógico de plataformas corporativas ya pagadas (Teams y OneDrive).",
        "La migración total a plataformas gratuitas externas no institucionales."
      ],
      correct: 2,
      feedback: "La propuesta opera a costo cero al habitar pedagógicamente licencias corporativas ya pagadas."
    }
  ],
  u2: [
    {
      q: "El principio DUA de 'representación múltiple' se refiere principalmente a:",
      options: [
        "Ofrecer el mismo contenido en más de un formato (texto, audio, video).",
        "Calificar a todos los estudiantes con el mismo instrumento sin variaciones.",
        "Limitar el contenido a un único canal para simplificar la gestión docente.",
        "Aumentar la cantidad de tareas evaluativas por unidad."
      ],
      correct: 0,
      feedback: "La representación múltiple busca ofrecer distintas vías de acceso al mismo contenido."
    },
    {
      q: "En el diseño instruccional inverso (Backward Design), el primer paso consiste en:",
      options: [
        "Seleccionar los recursos audiovisuales disponibles.",
        "Definir la evidencia de desempeño auténtica esperada.",
        "Elegir la plataforma de videoconferencia a utilizar.",
        "Programar la fecha de entrega de la actividad."
      ],
      correct: 1,
      feedback: "El diseño inverso parte de los resultados de aprendizaje esperados y sus evidencias."
    },
    {
      q: "¿Qué estrategia responde mejor al reto de conectividad móvil intermitente del 'estudiante Castilla'?",
      options: [
        "Exigir videollamadas sincrónicas obligatorias todas las tardes.",
        "Diseñar actividades asincrónicas con formatos livianos descargables previamente.",
        "Publicar únicamente videos en alta definición sin alternativas de texto.",
        "Restringir el curso a estudiantes con conexión de fibra óptica."
      ],
      correct: 1,
      feedback: "El diseño de bajo consumo de datos y las actividades asincrónicas garantizan equidad socio-técnica."
    }
  ],
  u3: [
    {
      q: "Según el modelo de alfabetización crítica de Selwyn, el uso meramente instrumental de la tecnología se caracteriza por:",
      options: [
        "Cuestionar quién produce el contenido y con qué intereses.",
        "Utilizar la herramienta sin reflexionar sobre sus implicaciones sociales o políticas.",
        "Verificar sistemáticamente las fuentes antes de compartir información.",
        "Diseñar contenido propio a partir de fuentes verificadas."
      ],
      correct: 1,
      feedback: "El uso instrumental se limita al manejo técnico sin reflexión crítica sobre sus efectos."
    },
    {
      q: "El concepto de 'convergencia mediática' de Jenkins (2006) describe:",
      options: [
        "La desaparición total de los medios tradicionales.",
        "La circulación de contenidos entre distintos medios y la participación activa de las audiencias.",
        "La prohibición del uso de dispositivos móviles en el aula.",
        "La centralización exclusiva del contenido en un solo canal oficial."
      ],
      correct: 1,
      feedback: "La convergencia mediática refiere al flujo de contenidos mediado por la participación activa de las audiencias."
    },
    {
      q: "Una señal típica de una fake news amplificada algorítmicamente es:",
      options: [
        "Citar la fuente original y la metodología de la información.",
        "Provocar una reacción emocional intensa que favorece su viralización sin verificación.",
        "Estar publicada en una revista indexada.",
        "Incluir referencias bibliográficas verificables."
      ],
      correct: 1,
      feedback: "Las fake news apelan a la emocionalidad para maximizar su viralización algorítmica."
    }
  ],
  u4: [
    {
      q: "Un riesgo frecuentemente asociado al uso no mediado de la IA generativa en el aula es:",
      options: [
        "El fortalecimiento automático del pensamiento crítico del estudiante.",
        "La posible dependencia cognitiva y homogeneización de las respuestas del estudiantado.",
        "La eliminación total de la necesidad de evaluación docente.",
        "La imposibilidad de generar cualquier tipo de sesgo."
      ],
      correct: 1,
      feedback: "El uso no mediado puede generar dependencia cognitiva y homogeneizar producciones si no hay mediación pedagógica."
    },
    {
      q: "Según los lineamientos de la UNESCO (2023), un aspecto prioritario en el uso de IA con estudiantes es:",
      options: [
        "Maximizar la recolección de datos personales de los menores sin restricción.",
        "La protección de la privacidad y los datos de los menores de edad.",
        "Eliminar cualquier normativa institucional sobre el tema.",
        "Delegar toda decisión ética exclusivamente a la empresa desarrolladora."
      ],
      correct: 1,
      feedback: "La UNESCO enfatiza la protección de la privacidad y los datos de los menores."
    },
    {
      q: "¿Cuál estrategia mitiga mejor el plagio mecánico mediado por IA generativa?",
      options: [
        "Evaluar únicamente el producto final entregado.",
        "Diseñar rúbricas que evalúen el proceso, incluyendo el uso declarado de la IA.",
        "Prohibir cualquier mención al uso de IA en las evaluaciones.",
        "Aumentar la longitud exigida de los trabajos sin cambiar la forma de evaluación."
      ],
      correct: 1,
      feedback: "La evaluación procesual reduce el riesgo de plagio mecánico."
    }
  ]
};

/* ---------- Juego Unidad 1: Cazadores de plataformas fantasma ---------- */
const GAME_U1 = [
  { item: "Canal de Teams del curso, usado semanalmente para foros y anuncios", answer: "usado" },
  { item: "Licencia de videoconferencia premium pagada, sin una sola reunión agendada este semestre", answer: "fantasma" },
  { item: "Carpeta maestra en OneDrive con evidencias históricas del curso, sincronizada y consultada", answer: "usado" },
  { item: "Plataforma de encuestas institucional pagada anualmente, ignorada por el 90% de docentes", answer: "fantasma" },
  { item: "Blog personal del docente, aislado del resto de canales institucionales", answer: "fantasma" },
  { item: "Pestaña de tareas en Teams enlazada al plan de estudios vigente", answer: "usado" }
];

/* ---------- Juego Unidad 2: El semáforo DUA ---------- */
const GAME_U2 = [
  { item: "Guía en PDF plano, un solo formato, sin audio ni alternativas", answer: "rojo" },
  { item: "Video con subtítulos + versión en audio descargable + resumen en texto", answer: "verde" },
  { item: "Actividad con dos formatos (texto y video) pero sin opción offline", answer: "amarillo" },
  { item: "Tarea que exige videollamada obligatoria sin alternativa asincrónica", answer: "rojo" },
  { item: "Contenido descargable liviano, disponible antes de clase, con ejemplos resueltos", answer: "verde" },
  { item: "Lectura única en inglés técnico sin glosario ni apoyos", answer: "rojo" }
];

/* ---------- Juego Unidad 3: Verificador de hilos ---------- */
const GAME_U3 = [
  { item: "\"¡Esto que descubrieron va a cambiar TODO lo que sabías! Compártelo antes de que lo borren 😱\"", answer: "desinformacion", tip: "Apela a la emoción y la urgencia, sin fuente verificable." },
  { item: "\"Según el estudio publicado en Redalyc (2023), el 62% de docentes reporta...\", con enlace a la fuente", answer: "confiable", tip: "Cita fuente académica verificable y con licenciamiento claro." },
  { item: "\"Un profesor anónimo reveló en un video viral que las universidades ocultan esto...\"", answer: "desinformacion", tip: "Fuente anónima, sin evidencia, lenguaje conspirativo." },
  { item: "Hilo con capturas de pantalla de datos oficiales del Ministerio de Educación, con fecha y enlace", answer: "confiable", tip: "Fuente oficial, trazable y verificable." },
  { item: "\"Todos están hablando de esto, no puede ser casualidad, compártelo ya\"", answer: "desinformacion", tip: "Apela a la presión social sin ninguna evidencia." }
];

/* ---------- Juego Unidad 4: Detective de sesgos ---------- */
const GAME_U4 = [
  { item: "La IA sugiere siempre nombres y ejemplos de un solo género al describir 'un buen científico'.", answer: "genero", tip: "Sesgo de género en la representación de roles profesionales." },
  { item: "La IA asume que todos los estudiantes tienen acceso a laptop e internet estable en casa.", answer: "clase", tip: "Sesgo socioeconómico / de clase social." },
  { item: "La IA usa ejemplos culturales de un solo país como si fueran universales.", answer: "cultura", tip: "Sesgo cultural por falta de contextualización local." },
  { item: "La IA responde distinto según el nombre propio incluido en el prompt, sin relación con el contenido.", answer: "genero", tip: "Sesgo asociativo ligado a nombres propios (género/origen)." }
];

/* ---------- Base de conocimiento del Agente Virtual ---------- */
const AGENT_KB = [
  {
    keys: ["hola", "buenas", "buenos dias", "buenas tardes", "hey"],
    a: "Hola, soy Aika, el agente virtual del curso. Puedo contarte sobre las unidades, las actividades gamificadas, la autoevaluación o la rúbrica de evaluación. ¿Qué te gustaría saber?"
  },
  {
    keys: ["unidad 1", "arquitecturas distribuidas", "ecosistema digital disperso"],
    a: "La Unidad 1, Arquitecturas Distribuidas y Unificación del Ecosistema Digital, se estudia en la semana 1 durante 10 horas. Su meta es diseñar una arquitectura digital unificada usando Microsoft Teams y OneDrive corporativo para resolver la fragmentación institucional."
  },
  {
    keys: ["unidad 2", "dua", "diseño universal", "actividades autenticas"],
    a: "La Unidad 2, Actividades Auténticas e Inclusión Digital por Diseño, trabaja el Diseño Universal para el Aprendizaje y el diseño instruccional inverso, pensando en la equidad frente a la conectividad inestable."
  },
  {
    keys: ["unidad 3", "transmedia", "literacidad", "redes sociales", "fake news"],
    a: "La Unidad 3, Narrativas Transmedia y Literacidad Crítica en el Aula, conecta el consumo informal de redes sociales con competencias de argumentación, curaduría de recursos abiertos y detección de desinformación."
  },
  {
    keys: ["unidad 4", "inteligencia artificial", "etica", "ia generativa", "unesco"],
    a: "La Unidad 4, Inteligencia Artificial en la Escuela, propone construir de forma participativa un marco ético-normativo institucional para el uso de la IA generativa, siguiendo lineamientos de la UNESCO."
  },
  {
    keys: ["rubrica", "evaluacion", "criterios", "puntaje", "calificacion"],
    a: "La rúbrica de evaluación considera cinco criterios de igual peso: diagnóstico del ecosistema digital, fundamentación teórica, diseño instruccional del MOOC, recursos y estrategias digitales, y calidad académica y presentación. Cada uno aporta 1.6 puntos en la escala Excelente, para un total de 8 puntos por actividad."
  },
  {
    keys: ["autoevaluacion", "cuestionario", "quiz", "preguntas", "examen"],
    a: "La autoevaluación final tiene diez preguntas de selección múltiple, tomadas de las cuatro unidades del curso, con retroalimentación inmediata para cada respuesta."
  },
  {
    keys: ["actividad gamificada", "juego", "gamificacion", "puntos", "insignia", "badge"],
    a: "Cada unidad tiene una actividad gamificada distinta: cazadores de plataformas fantasma, el semáforo DUA, el verificador de hilos y el detective de sesgos. Al completarlas ganas puntos e insignias que se guardan en tu progreso."
  },
  {
    keys: ["autor", "autores", "quien hizo", "creadores"],
    a: "Este Objeto Virtual de Aprendizaje fue elaborado por Erika Liced Martínez Ángel, Ángela Patricia Gómez Mejía y Jorge Eliécer Martínez Bustos, del Doctorado en Educación e Innovación de la UIIX."
  },
  {
    keys: ["plataforma", "moodle", "teams", "onedrive", "hosting"],
    a: "El curso está pensado para implementarse en Moodle o MoodleCloud, integrado con Microsoft Teams y OneDrive, aunque este sitio web puede alojarse de forma independiente en cualquier hosting."
  },
  {
    keys: ["video", "podcast", "infografia", "recursos"],
    a: "Cada unidad incluye un video corto de aproximadamente tres minutos, una infografía interactiva y un podcast reflexivo de un minuto. Puedes encontrarlos en la sección de cada unidad."
  },
  {
    keys: ["gracias", "chao", "adios", "hasta luego"],
    a: "Con gusto. Éxitos en tu recorrido por el curso."
  }
];

const AGENT_DEFAULT =
  "No tengo información exacta sobre eso todavía. Puedes preguntarme por las unidades del curso, la rúbrica, la autoevaluación o las actividades gamificadas.";
