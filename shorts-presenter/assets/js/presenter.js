const params = new URLSearchParams(window.location.search);
const deckName = params.get("deck") || "it-001-005";
const initialCue = Math.max(0, Number.parseInt(params.get("cue") || params.get("slide") || "0", 10) || 0);
const debug = params.get("debug") === "1";

const stage = document.querySelector("#stage");
const hookEl = document.querySelector("#hook");
const overlayEl = document.querySelector("#overlay");
const statusEl = document.querySelector("#status");

let deck = null;
let cueIndex = initialCue;
let lastHook = "";
let replayNonce = 0;

if (debug) {
  document.body.classList.add("debug");
}

function normalizeDeckPath(name) {
  if (name.endsWith(".json") || name.includes("/")) return name;
  return `./data/${name}.json`;
}

async function loadDeck() {
  const deckPath = normalizeDeckPath(deckName);
  const response = await fetch(deckPath, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`덱을 불러오지 못했습니다: ${deckPath} (${response.status})`);
  }
  return response.json();
}

function clampCue(index) {
  if (!deck?.cues?.length) return 0;
  return Math.min(Math.max(index, 0), deck.cues.length - 1);
}

function setStatus(message) {
  statusEl.textContent = message;
}

function renderError(error) {
  overlayEl.innerHTML = `<div class="error">${escapeHtml(error.message || String(error))}</div>`;
  setStatus("error");
}

function renderCue({ replay = false } = {}) {
  if (!deck?.cues?.length) return;

  cueIndex = clampCue(cueIndex);
  const cue = deck.cues[cueIndex];
  const hookText = cue.hook ?? lastHook ?? deck.meta?.hook ?? "";
  lastHook = hookText;

  if (hookText) {
    hookEl.textContent = hookText;
    hookEl.classList.remove("is-visible");
    // Force replay when cue changes or user presses R.
    void hookEl.offsetWidth;
    hookEl.classList.add("is-visible");
  } else {
    hookEl.textContent = "";
    hookEl.classList.remove("is-visible");
  }

  replayNonce += 1;
  overlayEl.innerHTML = "";

  const fragment = document.createDocumentFragment();
  for (const item of cue.items || []) {
    const el = document.createElement("div");
    el.className = [
      "item",
      `pos-${item.position || "mid2"}`,
      `style-${item.style || "keyword"}`,
      `anim-${item.animation || "normal"}`,
    ].join(" ");
    el.dataset.replay = String(replayNonce);
    el.textContent = item.text || "";

    if (item.color) {
      el.style.setProperty("--sfx-color", item.color);
    }
    if (item.offsetX) {
      el.style.marginLeft = item.offsetX;
    }
    if (item.offsetY) {
      el.style.marginTop = item.offsetY;
    }
    if (item.maxWidth) {
      el.style.maxWidth = item.maxWidth;
    }

    fragment.appendChild(el);
  }

  overlayEl.appendChild(fragment);

  const cueLabel = cue.id || `${cueIndex + 1}`;
  setStatus(`${deck.meta?.title || deckName} · ${cueIndex + 1}/${deck.cues.length} · ${cueLabel}${replay ? " · replay" : ""}`);
}

function nextCue() {
  if (!deck) return;
  cueIndex = clampCue(cueIndex + 1);
  renderCue();
}

function previousCue() {
  if (!deck) return;
  cueIndex = clampCue(cueIndex - 1);
  renderCue();
}

function replayCue() {
  renderCue({ replay: true });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if ([" ", "Spacebar", "ArrowRight", "PageDown"].includes(key)) {
    event.preventDefault();
    nextCue();
  }
  if (["ArrowLeft", "PageUp"].includes(key)) {
    event.preventDefault();
    previousCue();
  }
  if (key.toLowerCase() === "r") {
    event.preventDefault();
    replayCue();
  }
  if (key.toLowerCase() === "d") {
    document.body.classList.toggle("debug");
  }
});

stage.addEventListener("click", () => {
  window.focus();
});

loadDeck()
  .then((loadedDeck) => {
    deck = loadedDeck;
    cueIndex = clampCue(cueIndex);
    renderCue();
  })
  .catch(renderError);
