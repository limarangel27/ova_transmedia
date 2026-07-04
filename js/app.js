/* ============================================================
   OVA UIIX — Lógica de la aplicación
   ============================================================ */

/* ---------------- Estado y persistencia (localStorage) ---------------- */
const STORAGE_KEY = "ova_uiix_progreso_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* almacenamiento no disponible */ }
  return { puntos: 0, insignias: [], juegos: {}, quiz: null };
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}
let state = loadState();

function addPoints(n) {
  state.puntos += n;
  saveState();
  renderProgress();
}
function unlockBadge(id, label) {
  if (!state.insignias.includes(id)) {
    state.insignias.push(id);
    saveState();
    renderProgress();
    toast(`🏅 Nueva insignia desbloqueada: ${label}`);
  }
}
function renderProgress() {
  const pts = document.getElementById("puntos-total");
  const badgeWrap = document.getElementById("insignias-lista");
  if (pts) pts.textContent = state.puntos;
  if (badgeWrap) {
    const labels = {
      arquitecto: "🗂️ Arquitecto Digital",
      dua: "🚦 Diseñador DUA",
      transmedia: "🔎 Detective Transmedia",
      etico: "🛡️ Guardián Ético",
      sabio: "🎓 Sabio del MOOC"
    };
    badgeWrap.innerHTML = state.insignias.length
      ? state.insignias.map(id => `<span class="badge">${labels[id] || id}</span>`).join("")
      : `<span class="badge badge--empty">Aún sin insignias — ¡empieza a jugar!</span>`;
  }
}

/* ---------------- Toast simple de notificación ---------------- */
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("toast--show"));
  setTimeout(() => {
    el.classList.remove("toast--show");
    setTimeout(() => el.remove(), 400);
  }, 3200);
}

/* ---------------- Navegación ---------------- */
function initNav() {
  const links = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("main > section");
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("site-nav");

  links.forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("nav--open");
    });
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach(s => obs.observe(s));

  menuBtn.addEventListener("click", () => nav.classList.toggle("nav--open"));
}

/* ---------------- Acordeones (temas y subtemas) ---------------- */
function initAccordions() {
  document.querySelectorAll(".accordion__trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
    });
  });
}

/* ---------------- Infografías interactivas (capas desplegables) ---------------- */
function initInfografias() {
  document.querySelectorAll(".info-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") card.classList.toggle("is-flipped");
    });
  });
}

/* ---------------- Guiones (mostrar/ocultar script de video y podcast) ---------------- */
function initScriptToggles() {
  document.querySelectorAll(".btn-guion").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      const hidden = target.hasAttribute("hidden");
      target.toggleAttribute("hidden");
      btn.textContent = hidden ? "Ocultar guion" : "Ver guion";
    });
  });
}

/* ================================================================
   JUEGOS GAMIFICADOS
   ================================================================ */

function buildBinaryGame(containerId, data, labelA, labelB, valA, valB, onComplete) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let correct = 0;
  let answered = 0;
  container.innerHTML = data.map((d, i) => `
    <div class="game-item" data-i="${i}">
      <p class="game-item__text">${d.item}</p>
      <div class="game-item__actions">
        <button class="btn btn--ghost" data-val="${valA}">${labelA}</button>
        <button class="btn btn--ghost" data-val="${valB}">${labelB}</button>
      </div>
      <p class="game-item__fb" hidden></p>
    </div>
  `).join("");

  container.querySelectorAll(".game-item").forEach(itemEl => {
    const i = Number(itemEl.dataset.i);
    const buttons = itemEl.querySelectorAll("button");
    buttons.forEach(b => b.addEventListener("click", () => {
      if (itemEl.classList.contains("is-done")) return;
      itemEl.classList.add("is-done");
      answered++;
      const val = b.dataset.val;
      const ok = val === data[i].answer;
      if (ok) correct++;
      buttons.forEach(x => x.disabled = true);
      b.classList.add(ok ? "is-correct" : "is-wrong");
      const fb = itemEl.querySelector(".game-item__fb");
      fb.hidden = false;
      fb.textContent = ok
        ? "✔ Correcto" + (data[i].tip ? " — " + data[i].tip : "")
        : "✘ No es así" + (data[i].tip ? " — " + data[i].tip : "");
      if (answered === data.length) {
        const pts = correct * 10;
        addPoints(pts);
        toast(`Actividad completada: ${correct}/${data.length} aciertos (+${pts} pts)`);
        if (onComplete) onComplete(correct, data.length);
      }
    }));
  });
}

function initGames() {
  buildBinaryGame("game-u1", GAME_U1, "✅ Usado pedagógicamente", "👻 Fantasma", "usado", "fantasma",
    (c, t) => { if (c >= t - 1) unlockBadge("arquitecto", "Arquitecto Digital"); });

  buildBinaryGame("game-u2", GAME_U2, "🟢 Verde", "🔴 Rojo / 🟡 Amarillo", "verde", "amarillo",
    (c, t) => { if (c >= t - 1) unlockBadge("dua", "Diseñador DUA"); });
  // Nota: el semáforo real tiene 3 estados; se simplifica a "flexible / no flexible" para la mecánica de juego.
  // Sobrescribimos manualmente para aceptar 'rojo' y 'amarillo' como "no verde":
  patchSemaforoGame();

  buildBinaryGame("game-u3", GAME_U3, "✅ Confiable", "🚩 Desinformación", "confiable", "desinformacion",
    (c, t) => { if (c >= t - 1) unlockBadge("transmedia", "Detective Transmedia"); });

  initSesgosGame();
}

/* Ajuste fino del juego del semáforo DUA para aceptar rojo/amarillo como "no verde" */
function patchSemaforoGame() {
  const container = document.getElementById("game-u2");
  if (!container) return;
  container.innerHTML = "";
  let correct = 0, answered = 0;
  container.innerHTML = GAME_U2.map((d, i) => `
    <div class="game-item" data-i="${i}">
      <p class="game-item__text">${d.item}</p>
      <div class="game-item__actions">
        <button class="btn btn--ghost" data-val="verde">🟢 Flexible</button>
        <button class="btn btn--ghost" data-val="amarillo">🟡 Parcial</button>
        <button class="btn btn--ghost" data-val="rojo">🔴 Rígida</button>
      </div>
      <p class="game-item__fb" hidden></p>
    </div>
  `).join("");
  container.querySelectorAll(".game-item").forEach(itemEl => {
    const i = Number(itemEl.dataset.i);
    const buttons = itemEl.querySelectorAll("button");
    buttons.forEach(b => b.addEventListener("click", () => {
      if (itemEl.classList.contains("is-done")) return;
      itemEl.classList.add("is-done");
      answered++;
      const ok = b.dataset.val === GAME_U2[i].answer;
      if (ok) correct++;
      buttons.forEach(x => x.disabled = true);
      b.classList.add(ok ? "is-correct" : "is-wrong");
      const fb = itemEl.querySelector(".game-item__fb");
      fb.hidden = false;
      fb.textContent = ok ? "✔ Clasificación correcta" : `✘ La clasificación esperada era: ${GAME_U2[i].answer}`;
      if (answered === GAME_U2.length) {
        const pts = correct * 10;
        addPoints(pts);
        toast(`Semáforo DUA completado: ${correct}/${GAME_U2.length} aciertos (+${pts} pts)`);
        if (correct >= GAME_U2.length - 1) unlockBadge("dua", "Diseñador DUA");
      }
    }));
  });
}

function initSesgosGame() {
  const container = document.getElementById("game-u4");
  if (!container) return;
  const opciones = [
    { v: "genero", l: "Sesgo de género" },
    { v: "clase", l: "Sesgo socioeconómico" },
    { v: "cultura", l: "Sesgo cultural" }
  ];
  let correct = 0, answered = 0;
  container.innerHTML = GAME_U4.map((d, i) => `
    <div class="game-item" data-i="${i}">
      <p class="game-item__text">${d.item}</p>
      <div class="game-item__actions">
        ${opciones.map(o => `<button class="btn btn--ghost" data-val="${o.v}">${o.l}</button>`).join("")}
      </div>
      <p class="game-item__fb" hidden></p>
    </div>
  `).join("");
  container.querySelectorAll(".game-item").forEach(itemEl => {
    const i = Number(itemEl.dataset.i);
    const buttons = itemEl.querySelectorAll("button");
    buttons.forEach(b => b.addEventListener("click", () => {
      if (itemEl.classList.contains("is-done")) return;
      itemEl.classList.add("is-done");
      answered++;
      const ok = b.dataset.val === GAME_U4[i].answer;
      if (ok) correct++;
      buttons.forEach(x => x.disabled = true);
      b.classList.add(ok ? "is-correct" : "is-wrong");
      const fb = itemEl.querySelector(".game-item__fb");
      fb.hidden = false;
      fb.textContent = (ok ? "✔ Correcto — " : "✘ No exactamente — ") + GAME_U4[i].tip;
      if (answered === GAME_U4.length) {
        const pts = correct * 10;
        addPoints(pts);
        toast(`Detective de sesgos completado: ${correct}/${GAME_U4.length} aciertos (+${pts} pts)`);
        if (correct >= GAME_U4.length - 1) unlockBadge("etico", "Guardián Ético");
      }
    }));
  });
}

/* ================================================================
   AUTOEVALUACIÓN FINAL (10 preguntas)
   ================================================================ */
function buildFinalQuiz() {
  const quizData = [
    ...QUESTION_BANK.u1.map(q => ({ ...q, unidad: 1 })),
    ...QUESTION_BANK.u2.map(q => ({ ...q, unidad: 2 })),
    ...QUESTION_BANK.u3.slice(0, 2).map(q => ({ ...q, unidad: 3 })),
    ...QUESTION_BANK.u3.slice(2, 3).map(q => ({ ...q, unidad: 3 })),
    ...QUESTION_BANK.u4.map(q => ({ ...q, unidad: 4 }))
  ].slice(0, 10);

  const form = document.getElementById("quiz-form");
  if (!form) return;
  form.innerHTML = quizData.map((q, i) => `
    <fieldset class="quiz-q" data-i="${i}">
      <legend><span class="quiz-q__tag">Unidad ${q.unidad} · Pregunta ${i + 1}</span>${q.q}</legend>
      ${q.options.map((opt, j) => `
        <label class="quiz-opt">
          <input type="radio" name="q${i}" value="${j}">
          <span>${opt}</span>
        </label>
      `).join("")}
      <p class="quiz-q__fb" hidden></p>
    </fieldset>
  `).join("");

  form.dataset.answers = JSON.stringify(quizData.map(q => q.correct));
  form.dataset.feedback = JSON.stringify(quizData.map(q => q.feedback));

  document.getElementById("quiz-submit").addEventListener("click", (e) => {
    e.preventDefault();
    gradeQuiz(quizData);
  });
  document.getElementById("quiz-reset").addEventListener("click", (e) => {
    e.preventDefault();
    buildFinalQuiz();
    document.getElementById("quiz-result").hidden = true;
  });
}

function gradeQuiz(quizData) {
  const form = document.getElementById("quiz-form");
  let score = 0;
  let unanswered = 0;
  quizData.forEach((q, i) => {
    const checked = form.querySelector(`input[name="q${i}"]:checked`);
    const fieldset = form.querySelector(`.quiz-q[data-i="${i}"]`);
    const fb = fieldset.querySelector(".quiz-q__fb");
    fb.hidden = false;
    if (!checked) {
      unanswered++;
      fb.textContent = "No respondida. " + q.feedback;
      fieldset.classList.add("quiz-q--missed");
      return;
    }
    const val = Number(checked.value);
    if (val === q.correct) {
      score++;
      fb.textContent = "✔ Correcto. " + q.feedback;
      fieldset.classList.add("quiz-q--ok");
    } else {
      fb.textContent = "✘ Incorrecto. " + q.feedback;
      fieldset.classList.add("quiz-q--bad");
    }
  });

  const resultBox = document.getElementById("quiz-result");
  resultBox.hidden = false;
  let tier, msg;
  if (score >= 9) { tier = "Excelente"; msg = "Dominas con solidez los conceptos de las cuatro unidades."; }
  else if (score >= 7) { tier = "Satisfactorio"; msg = "Buen manejo general, repasa los puntos señalados en rojo."; }
  else if (score >= 5) { tier = "En desarrollo"; msg = "Vas por buen camino; te conviene repasar las unidades con más detalle."; }
  else { tier = "Insuficiente"; msg = "Te recomendamos volver a revisar el contenido de cada unidad antes de continuar."; }

  resultBox.innerHTML = `
    <h3>Resultado: ${score}/10 — ${tier}</h3>
    <p>${msg}</p>
    <p class="quiz-rubrica-note">Este resultado aporta evidencia para el criterio <strong>“Diseño instruccional del MOOC”</strong> y
    <strong>“Calidad académica y presentación”</strong> de la rúbrica de evaluación del curso.</p>
  `;
  state.quiz = { score, date: new Date().toISOString() };
  saveState();
  addPoints(score * 5);
  if (score >= 8) unlockBadge("sabio", "Sabio del MOOC");
  resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ================================================================
   AGENTE VIRTUAL (texto + voz)
   ================================================================ */
function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim();
}

function findAnswer(text) {
  const n = normalize(text);
  let best = null, bestScore = 0;
  AGENT_KB.forEach(entry => {
    entry.keys.forEach(k => {
      if (n.includes(normalize(k))) {
        const score = k.length;
        if (score > bestScore) { bestScore = score; best = entry.a; }
      }
    });
  });
  return best || AGENT_DEFAULT;
}

let ttsVoice = null;
function pickSpanishVoice() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  ttsVoice = voices.find(v => /es-MX|es-CO|es-419/i.test(v.lang)) ||
             voices.find(v => /^es/i.test(v.lang)) ||
             null;
}
if (window.speechSynthesis) {
  pickSpanishVoice();
  window.speechSynthesis.onvoiceschanged = pickSpanishVoice;
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "es-MX";
  if (ttsVoice) utter.voice = ttsVoice;
  utter.rate = 1;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}

function appendMessage(role, text) {
  const log = document.getElementById("agent-log");
  const div = document.createElement("div");
  div.className = "agent-msg agent-msg--" + role;
  div.innerHTML = `<span class="agent-msg__role">${role === "user" ? "Tú" : "Aika"}</span><p>${text}</p>`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function handleAgentInput(text) {
  if (!text || !text.trim()) return;
  appendMessage("user", text);
  const answer = findAnswer(text);
  setTimeout(() => {
    appendMessage("bot", answer);
    speak(answer);
  }, 250);
}

function initAgent() {
  const form = document.getElementById("agent-form");
  const input = document.getElementById("agent-input");
  const micBtn = document.getElementById("agent-mic");
  const muteBtn = document.getElementById("agent-mute");
  if (!form) return;

  appendMessage("bot", "Hola, soy Aika 👋 Puedo responderte en voz alta sobre el curso: unidades, actividades gamificadas, rúbrica o autoevaluación. Escribe o usa el micrófono.");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = "";
    handleAgentInput(text);
  });

  let muted = false;
  muteBtn.addEventListener("click", () => {
    muted = !muted;
    muteBtn.textContent = muted ? "🔇 Voz desactivada" : "🔊 Voz activada";
    muteBtn.setAttribute("aria-pressed", String(muted));
    if (muted && window.speechSynthesis) window.speechSynthesis.cancel();
    window.__ovaMuted = muted;
  });

  const speakOriginal = speak;
  speak = function (text) { if (!window.__ovaMuted) speakOriginal(text); };

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    micBtn.disabled = true;
    micBtn.title = "El reconocimiento de voz no está disponible en este navegador (usa Chrome o Edge).";
    return;
  }
  const recognition = new SR();
  recognition.lang = "es-MX";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let listening = false;
  micBtn.addEventListener("click", () => {
    if (listening) { recognition.stop(); return; }
    try {
      recognition.start();
      listening = true;
      micBtn.classList.add("is-listening");
      micBtn.textContent = "🎙️ Escuchando…";
    } catch (err) { /* ya iniciado */ }
  });
  recognition.addEventListener("result", (e) => {
    const text = e.results[0][0].transcript;
    handleAgentInput(text);
  });
  recognition.addEventListener("end", () => {
    listening = false;
    micBtn.classList.remove("is-listening");
    micBtn.textContent = "🎙️ Hablar";
  });
  recognition.addEventListener("error", () => {
    listening = false;
    micBtn.classList.remove("is-listening");
    micBtn.textContent = "🎙️ Hablar";
  });
}

/* ---------------- Botón "leer en voz alta" para bloques de contenido ---------------- */
function initReadAloudButtons() {
  document.querySelectorAll(".btn-leer").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) speak(target.innerText);
    });
  });
}

/* ---------------- Init general ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("anio").textContent = new Date().getFullYear();
  initNav();
  initAccordions();
  initInfografias();
  initScriptToggles();
  initGames();
  buildFinalQuiz();
  initAgent();
  initReadAloudButtons();
  renderProgress();
});
