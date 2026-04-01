const STORAGE_KEY = "jerjangmin-card-news-state";
const PREFS_KEY = "jerjangmin-card-news-prefs";
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const MAX_VIDEO_DURATION = 30;

const app = document.getElementById("app");

const state = createInitialState();
const runtime = {
  pendingRestore: null,
  status: "",
  statusType: "notice",
  exportBusy: false,
  exportProgress: null,
  thumbMeta: new Map(),
};

boot();

function boot() {
  loadSavedState();
  render();
}

function createEmptyCard(index) {
  return {
    id: `card-${index}`,
    title: "",
    body: "",
    showText: true,
    copyright: "",
    mediaType: "empty",
  };
}

function createCards(count) {
  return Array.from({ length: count }, (_, index) => createEmptyCard(index));
}

function createInitialState() {
  const prefs = loadJson(PREFS_KEY) || {};
  return {
    step: 1,
    logoType: "text",
    logoText: "",
    logoImage: "",
    logoImageFile: null,
    cardCount: 5,
    ratio: "4:5",
    ctaColor: "#000000",
    cards: createCards(5),
    selectedCardIndex: 0,
    ctaText: "",
    ctaShowText: true,
    coverShowLogo: prefs.coverShowLogo ?? true,
    coverLogoSize: prefs.coverLogoSize ?? 20,
    ctaShowLogo: prefs.ctaShowLogo ?? true,
    ctaLogoSize: prefs.ctaLogoSize ?? 50,
  };
}

function loadJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function loadSavedState() {
  const saved = loadJson(STORAGE_KEY);
  if (saved) runtime.pendingRestore = saved;
}

function persistState() {
  if (runtime.pendingRestore) return;
  if (state.step === 1) return;
  const serializable = {
    step: state.step,
    logoType: state.logoType,
    logoText: state.logoText,
    cardCount: state.cardCount,
    ratio: state.ratio,
    ctaColor: state.ctaColor,
    selectedCardIndex: state.selectedCardIndex,
    ctaText: state.ctaText,
    ctaShowText: state.ctaShowText,
    coverShowLogo: state.coverShowLogo,
    coverLogoSize: state.coverLogoSize,
    ctaShowLogo: state.ctaShowLogo,
    ctaLogoSize: state.ctaLogoSize,
    cards: state.cards.map((card) => ({
      id: card.id,
      title: card.title,
      body: card.body,
      showText: card.showText,
      copyright: card.copyright,
      mediaType: "empty",
    })),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  localStorage.setItem(
    PREFS_KEY,
    JSON.stringify({
      coverShowLogo: state.coverShowLogo,
      coverLogoSize: state.coverLogoSize,
      ctaShowLogo: state.ctaShowLogo,
      ctaLogoSize: state.ctaLogoSize,
    }),
  );
}

function restoreSavedState(restore) {
  if (restore && runtime.pendingRestore) {
    const saved = runtime.pendingRestore;
    state.step = 2;
    state.logoType = saved.logoType === "image" ? "image" : "text";
    state.logoText = saved.logoText || "";
    state.cardCount = clamp(saved.cardCount || 5, 3, 10);
    state.ratio = saved.ratio === "1:1" ? "1:1" : "4:5";
    state.ctaColor = saved.ctaColor || "#000000";
    state.selectedCardIndex = clamp(saved.selectedCardIndex || 0, 0, state.cardCount - 1);
    state.ctaText = saved.ctaText || "";
    state.ctaShowText = saved.ctaShowText ?? true;
    state.coverShowLogo = saved.coverShowLogo ?? true;
    state.coverLogoSize = clamp(saved.coverLogoSize || 20, 10, 100);
    state.ctaShowLogo = saved.ctaShowLogo ?? true;
    state.ctaLogoSize = clamp(saved.ctaLogoSize || 50, 10, 100);
    state.cards = createCards(state.cardCount).map((card, index) => ({
      ...card,
      ...(saved.cards?.[index] || {}),
      mediaType: "empty",
    }));
    runtime.status = "이전 작업의 텍스트와 설정을 복원했습니다. 미디어는 다시 업로드해 주세요.";
    runtime.statusType = "notice";
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  runtime.pendingRestore = null;
  render();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Number(value)));
}

function ratioClass() {
  return state.ratio === "4:5" ? "ratio-4-5" : "ratio-1-1";
}

function brandName() {
  return state.logoType === "text" ? (state.logoText.trim() || "card-news") : "card-news";
}

function notify(message, type = "notice") {
  runtime.status = message;
  runtime.statusType = type;
  renderStatus();
}

function clearStatus() {
  runtime.status = "";
  runtime.statusType = "notice";
  renderStatus();
}

function render() {
  app.innerHTML = `
    <main class="app-shell">
      <div class="topbar">
        <a href="/">← 기능 선택으로 돌아가기</a>
        <span class="badge">신규 기능 · 카드뉴스 메이커</span>
      </div>

      <section class="hero panel">
        <div class="badge">SNS Card News Tool</div>
        <h1>카드뉴스를 브라우저에서 바로 만들고 내보내세요.</h1>
        <p>
          이미지와 비디오를 섞어 카드뉴스를 구성할 수 있습니다. 표지 로고, 카드별 텍스트,
          CTA 카드까지 한 번에 만들고 이미지는 PNG, 비디오는 MP4, 전체 묶음은 ZIP으로 저장할 수 있습니다.
        </p>
      </section>

      <section class="stepper">
        ${renderStep(1, "기본 설정", "브랜드·비율 설정")}
        ${renderStep(2, "업로드", "이미지·비디오 업로드")}
        ${renderStep(3, "편집", "문구·CTA 편집")}
        ${renderStep(4, "내보내기", "PNG·MP4·ZIP 저장")}
      </section>

      <section class="panel content">
        <div id="status-slot"></div>
        ${runtime.pendingRestore ? renderRestorePrompt() : ""}
        ${renderCurrentStep()}
      </section>
      <div class="hidden-capture" id="hidden-capture"></div>
    </main>
  `;

  bindGlobalHandlers();
  renderStatus();
  hydrateUploadSlots();
  hydrateVideoThumbs();
}

function renderStep(step, title, caption) {
  const cls = step === state.step ? "step active" : step < state.step ? "step done" : "step";
  return `<div class="${cls}"><strong>${step}. ${title}</strong><span>${caption}</span></div>`;
}

function renderRestorePrompt() {
  return `
    <div class="notice" style="margin-bottom:16px;">
      이전 작업이 저장되어 있습니다. 텍스트와 설정만 복원할 수 있으며, 이미지/비디오는 다시 업로드해야 합니다.
      <div class="frame-actions" style="margin-top:10px;">
        <button class="soft-btn" data-action="restore-yes">이어서 하기</button>
        <button class="ghost-btn" data-action="restore-no">새로 시작</button>
      </div>
    </div>
  `;
}

function renderCurrentStep() {
  if (state.step === 1) return renderSetupStep();
  if (state.step === 2) return renderUploadStep();
  if (state.step === 3) return renderEditorStep();
  return renderExportStep();
}

function renderSetupStep() {
  const valid = state.logoType === "text" ? state.logoText.trim() : state.logoImage;
  return `
    <h2 class="section-title">기본 설정</h2>
    <p class="section-copy">브랜드 로고, 카드 수, 비율, CTA 오버레이 색상을 먼저 정합니다.</p>
    <div class="grid-2">
      <fieldset class="field">
        <legend>브랜드 로고</legend>
        <div class="segmented">
          <button type="button" class="${state.logoType === "text" ? "active" : ""}" data-logo-type="text">텍스트</button>
          <button type="button" class="${state.logoType === "image" ? "active" : ""}" data-logo-type="image">이미지</button>
        </div>
        ${state.logoType === "text"
          ? `<input class="input" id="logo-text" value="${escapeAttr(state.logoText)}" placeholder="브랜드 이름 입력" />`
          : `
            <input id="logo-file" type="file" accept="image/*" hidden />
            ${state.logoImage
              ? `<div class="inline"><img src="${state.logoImage}" alt="logo" style="height:72px;border:1px solid var(--line);border-radius:16px;padding:8px;background:#fff;" /><button class="ghost-btn" data-action="pick-logo">변경</button></div>`
              : `<button class="ghost-btn" data-action="pick-logo">로고 이미지 업로드</button>`}
            <small>어두운 배경 위에 노출되므로 흰색 또는 밝은 로고를 권장합니다.</small>`}
      </fieldset>

      <div class="stack">
        <div class="field">
          <label for="card-count">카드 수 (CTA 포함)</label>
          <div class="inline">
            <input id="card-count" type="range" min="3" max="10" value="${state.cardCount}" style="flex:1;" />
            <strong>${state.cardCount}</strong>
          </div>
          <small>마지막 카드는 CTA 카드로 자동 생성됩니다.</small>
        </div>

        <fieldset class="field">
          <legend>카드 비율</legend>
          <div class="segmented">
            <button type="button" class="${state.ratio === "4:5" ? "active" : ""}" data-ratio="4:5">4:5 (1080×1350)</button>
            <button type="button" class="${state.ratio === "1:1" ? "active" : ""}" data-ratio="1:1">1:1 (1080×1080)</button>
          </div>
        </fieldset>

        <div class="field">
          <label for="cta-color">CTA 오버레이 색상</label>
          <div class="inline">
            <input id="cta-color" type="color" value="${state.ctaColor}" />
            <input class="input" style="width:140px" id="cta-color-text" value="${escapeAttr(state.ctaColor)}" />
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <span></span>
      <button class="primary-btn" data-action="to-upload" ${valid ? "" : "disabled"}>다음</button>
    </div>
  `;
}

function renderUploadStep() {
  const uploadable = state.cardCount - 1;
  const hasMedia = state.cards.slice(0, uploadable).some((card) => card.mediaType !== "empty");
  return `
    <h2 class="section-title">미디어 업로드</h2>
    <p class="section-copy">첫 번째 카드는 표지이므로 이미지만 허용됩니다. 나머지 카드는 이미지와 비디오를 모두 넣을 수 있습니다.</p>
    <div class="upload-grid">
      ${Array.from({ length: uploadable }, (_, index) => renderUploadSlot(index)).join("")}
      <div class="upload-card">
        <div class="card-label">카드 ${state.cardCount} · CTA</div>
        <div class="dropzone ${ratioClass()}">
          <strong>자동 생성</strong>
          <span>표지 이미지와 CTA 색상을 조합해 마지막 카드가 생성됩니다.</span>
        </div>
      </div>
    </div>
    <div class="footer-note">
      비디오는 최대 100MB까지 업로드할 수 있으며, 내보내기 시 최대 ${MAX_VIDEO_DURATION}초까지만 포함됩니다.
    </div>
    <div class="actions">
      <button class="ghost-btn" data-action="back-setup">이전</button>
      <button class="primary-btn" data-action="to-editor" ${hasMedia ? "" : "disabled"}>다음</button>
    </div>
  `;
}

function renderUploadSlot(index) {
  const card = state.cards[index];
  const cover = index === 0;
  const fileLabel = cover ? "이미지 업로드" : "이미지 / 비디오 업로드";

  let body = `
    <div class="dropzone ${ratioClass()}" data-upload-index="${index}">
      <strong>${fileLabel}</strong>
      <span>${cover ? "표지 카드는 CTA 배경에도 재사용됩니다." : "드래그 앤 드롭 또는 클릭"}</span>
    </div>
  `;

  if (card.mediaType === "image") {
    body = `
      <div class="media-frame ${ratioClass()}">
        <img src="${card.imageUrl}" alt="card-${index + 1}" />
      </div>
      <div class="frame-actions">
        <button class="ghost-btn" data-action="change-media" data-index="${index}">변경</button>
        <button class="danger-btn" data-action="remove-media" data-index="${index}">제거</button>
      </div>
    `;
  }

  if (card.mediaType === "video") {
    const meta = runtime.thumbMeta.get(index) || { duration: 0, currentTime: 0 };
    body = `
      <div class="media-frame ${ratioClass()}">
        ${card.thumbnailUrl ? `<img src="${card.thumbnailUrl}" alt="thumb-${index + 1}" />` : `<video src="${card.videoUrl}" muted playsinline preload="metadata"></video>`}
        <div class="frame-badge">영상</div>
      </div>
      <video class="video-thumb-source" data-video-index="${index}" src="${card.videoUrl}" muted playsinline preload="metadata" hidden></video>
      <canvas data-canvas-index="${index}" hidden></canvas>
      <div class="range-row">
        <input type="range" min="0" max="${meta.duration || 0}" step="0.033" value="${meta.currentTime || 0}" data-thumb-range="${index}" ${meta.duration ? "" : "disabled"} />
        <div class="meta-row"><span>${formatTime(meta.currentTime || 0)}</span><span>${formatTime(meta.duration || 0)}</span></div>
        ${meta.duration > MAX_VIDEO_DURATION ? `<div class="warning">내보내기 시 ${MAX_VIDEO_DURATION}초까지만 포함됩니다.</div>` : ""}
      </div>
      <div class="frame-actions">
        <button class="ghost-btn" data-action="change-media" data-index="${index}">변경</button>
        <button class="danger-btn" data-action="remove-media" data-index="${index}">제거</button>
      </div>
    `;
  }

  return `
    <div class="upload-card">
      <div class="card-label">카드 ${index + 1}${cover ? " · 표지" : ""}</div>
      <input type="file" hidden id="media-input-${index}" accept="${cover ? "image/*" : "image/*,video/*"}" />
      ${body}
    </div>
  `;
}

function renderEditorStep() {
  const selected = state.selectedCardIndex;
  const card = state.cards[selected];
  const last = state.cardCount - 1;
  const isCta = selected === last;
  return `
    <h2 class="section-title">카드 편집</h2>
    <p class="section-copy">카드별 텍스트, 표지 로고, CTA 문구를 확인하면서 즉시 미리보기 할 수 있습니다.</p>
    <div class="editor-shell">
      <div class="thumb-list panel" style="padding:10px;">
        ${state.cards.map((item, index) => renderThumb(item, index)).join("")}
      </div>
      <div class="preview-wrap">
        <div class="preview-stage">${renderPreviewCard(selected)}</div>
      </div>
      <div class="panel" style="padding:18px;">
        ${isCta ? renderCtaControls() : renderCardControls(card, selected)}
      </div>
    </div>
    <div class="actions">
      <button class="ghost-btn" data-action="back-upload">이전</button>
      <button class="primary-btn" data-action="to-export">내보내기</button>
    </div>
  `;
}

function renderThumb(card, index) {
  const active = index === state.selectedCardIndex ? "thumb active" : "thumb";
  const isCta = index === state.cardCount - 1;
  return `<button class="${active}" data-select-card="${index}">${renderThumbInner(card, index, isCta)}</button>`;
}

function renderThumbInner(card, index, isCta) {
  if (isCta) {
    return `<div class="media-frame ${ratioClass()}" style="background:${state.ctaColor};display:flex;align-items:center;justify-content:center;color:white;font-weight:800;">CTA</div>`;
  }
  if (card.mediaType === "image") {
    return `<div class="media-frame ${ratioClass()}"><img src="${card.imageUrl}" alt="thumb-${index + 1}" /></div>`;
  }
  if (card.mediaType === "video") {
    return `<div class="media-frame ${ratioClass()}">${card.thumbnailUrl ? `<img src="${card.thumbnailUrl}" alt="thumb-${index + 1}" />` : ""}<div class="frame-badge">영상</div></div>`;
  }
  return `<div class="media-frame ${ratioClass()}" style="display:flex;align-items:center;justify-content:center;color:#94a3b8;background:#f8fafc;">${index + 1}</div>`;
}

function renderCardControls(card, index) {
  const isCover = index === 0;
  return `
    <h3 class="section-title" style="font-size:1.2rem;">${isCover ? "표지 편집" : `카드 ${index + 1} 편집`}</h3>
    <div class="stack">
      <div class="field">
        <label for="card-title">텍스트</label>
        <textarea class="textarea" id="card-title" placeholder="텍스트 입력...">${escapeHtml(card.title)}</textarea>
      </div>
      <div class="toggle">
        <strong>텍스트 표시</strong>
        <button class="switch ${card.showText ? "on" : ""}" data-action="toggle-card-text"></button>
      </div>
      ${isCover ? `
        <div class="toggle">
          <strong>표지 로고 표시</strong>
          <button class="switch ${state.coverShowLogo ? "on" : ""}" data-action="toggle-cover-logo"></button>
        </div>
        <div class="field">
          <label for="cover-logo-size">표지 로고 크기 (%)</label>
          <input class="input" id="cover-logo-size" type="number" min="10" max="100" value="${state.coverLogoSize}" ${state.coverShowLogo ? "" : "disabled"} />
        </div>
      ` : `
        <div class="field">
          <label for="card-copyright">저작권 (선택)</label>
          <input class="input" id="card-copyright" value="${escapeAttr(card.copyright)}" placeholder="예: 소미랜드" />
        </div>
      `}
    </div>
  `;
}

function renderCtaControls() {
  return `
    <h3 class="section-title" style="font-size:1.2rem;">CTA 카드</h3>
    <p class="section-copy" style="margin-bottom:12px;">표지 이미지와 CTA 색상을 기반으로 마지막 카드가 자동 생성됩니다.</p>
    <div class="stack">
      <div class="field">
        <label for="cta-text">CTA 문구</label>
        <textarea class="textarea" id="cta-text" placeholder="예: 지금 바로 팔로우하세요!" ${state.ctaShowText ? "" : "disabled"}>${escapeHtml(state.ctaText)}</textarea>
      </div>
      <div class="toggle">
        <strong>CTA 텍스트 표시</strong>
        <button class="switch ${state.ctaShowText ? "on" : ""}" data-action="toggle-cta-text"></button>
      </div>
      <div class="toggle">
        <strong>CTA 로고 표시</strong>
        <button class="switch ${state.ctaShowLogo ? "on" : ""}" data-action="toggle-cta-logo"></button>
      </div>
      <div class="field">
        <label for="cta-logo-size">CTA 로고 크기 (%)</label>
        <input class="input" id="cta-logo-size" type="number" min="10" max="100" value="${state.ctaLogoSize}" ${state.ctaShowLogo ? "" : "disabled"} />
      </div>
    </div>
  `;
}

function renderPreviewCard(index, hidden = false) {
  const card = state.cards[index];
  const isCta = index === state.cardCount - 1;
  const isCover = index === 0;
  const hiddenAttr = hidden ? "data-hidden-preview=\"true\"" : "";
  const fixedStyle = hidden ? getHiddenPreviewStyle() : "";
  if (isCta) return renderCtaPreview(hiddenAttr, fixedStyle);
  return `
    <div class="preview-card ${ratioClass()}" ${hiddenAttr} data-preview-index="${index}" style="${fixedStyle}">
      ${renderCardMedia(card)}
      ${isCover && card.mediaType === "image" ? `<div class="cover-tint" style="background:${state.ctaColor}"></div>` : ""}
      ${renderTextOverlay(card, isCover)}
    </div>
  `;
}

function renderCardMedia(card) {
  if (card.mediaType === "image") {
    return `<img class="preview-bg" src="${card.imageUrl}" alt="preview" />`;
  }
  if (card.mediaType === "video") {
    return card.thumbnailUrl
      ? `<img class="preview-bg" src="${card.thumbnailUrl}" alt="preview" />`
      : `<div class="preview-fill" style="background:#d1d5db"></div>`;
  }
  return `<div class="preview-fill" style="display:flex;align-items:center;justify-content:center;background:#f3f4f6;color:#94a3b8;font-weight:700;">미디어 없음</div>`;
}

function renderTextOverlay(card, isCover) {
  const pieces = [];
  if (isCover && state.coverShowLogo) {
    pieces.push(`<div class="logo-top">${renderLogo(state.coverLogoSize)}</div>`);
  }
  if (card.showText) {
    pieces.push(`<div class="overlay-gradient"></div>`);
    pieces.push(`
      <div class="copy-block ${isCover ? "cover" : ""}">
        ${card.title ? `<h3 class="copy-title ${isCover ? "cover" : "body"}">${escapeHtml(card.title).replace(/\n/g, "<br />")}</h3>` : ""}
      </div>
    `);
    if (!isCover && card.copyright) {
      pieces.push(`<div class="copy-copyright">${escapeHtml(formatCopyright(card.copyright))}</div>`);
    }
  }
  return pieces.join("");
}

function renderLogo(size) {
  if (state.logoType === "image" && state.logoImage) {
    return `<img src="${state.logoImage}" alt="logo" style="width:${size}cqw;" />`;
  }
  return `<span style="font-size:${size * 0.14}cqw;">${escapeHtml(state.logoText || "")}</span>`;
}

function renderCtaPreview(hiddenAttr = "", fixedStyle = "") {
  const bg = getCtaBackground();
  return `
    <div class="preview-card ${ratioClass()}" ${hiddenAttr} data-preview-index="${state.cardCount - 1}" style="${fixedStyle}">
      ${bg ? `<img class="preview-blur" src="${bg}" alt="cta-bg" />` : `<div class="preview-fill" style="background:${state.ctaColor}"></div>`}
      <div class="preview-fill" style="background:${state.ctaColor};opacity:${bg ? 0.6 : 1};"></div>
      <div class="cta-center">
        ${state.ctaShowLogo ? `<div class="cta-logo">${renderLogo(state.ctaLogoSize)}</div>` : ""}
        ${state.ctaShowText && state.ctaText ? `<div class="cta-text" style="font-size:3cqw;">${escapeHtml(state.ctaText).replace(/\n/g, "<br />")}</div>` : ""}
      </div>
    </div>
  `;
}

function renderExportStep() {
  return `
    <h2 class="section-title">내보내기</h2>
    <p class="section-copy">개별 다운로드 또는 전체 ZIP 다운로드를 선택할 수 있습니다. 비디오 카드는 MP4로 저장됩니다.</p>
    <div class="export-grid">
      ${state.cards.map((card, index) => renderExportCard(card, index)).join("")}
    </div>
    <div class="panel" style="padding:18px;margin-top:18px;">
      <div class="inline" style="justify-content:space-between;align-items:center;">
        <div>
          <strong>전체 내보내기</strong>
          <div class="footer-note" style="margin-top:6px;">빈 카드는 CTA를 제외하고 자동으로 건너뜁니다.</div>
        </div>
        <button class="primary-btn" data-action="download-all" ${runtime.exportBusy ? "disabled" : ""}>모두 다운로드 (ZIP)</button>
      </div>
      ${runtime.exportProgress ? `
        <div style="margin-top:14px;">
          <div class="progress"><span style="width:${(runtime.exportProgress.current / runtime.exportProgress.total) * 100}%"></span></div>
          <div class="footer-note">${runtime.exportProgress.current} / ${runtime.exportProgress.total} 처리 중</div>
        </div>
      ` : ""}
    </div>
    <div class="warning">
      비디오 MP4 내보내기는 WebCodecs(VideoEncoder)를 지원하는 브라우저에서만 동작합니다. 지원되지 않으면 해당 카드만 건너뜁니다.
    </div>
    <div class="actions">
      <button class="ghost-btn" data-action="back-editor">에디터로 돌아가기</button>
      <button class="danger-btn" data-action="reset-all" ${runtime.exportBusy ? "disabled" : ""}>처음부터 다시</button>
    </div>
  `;
}

function renderExportCard(card, index) {
  const isCta = index === state.cardCount - 1;
  const typeLabel = isCta ? "CTA · PNG" : card.mediaType === "video" ? "비디오 · MP4" : "이미지 · PNG";
  return `
    <div class="export-card">
      <div class="card-label">카드 ${index + 1} · ${typeLabel}</div>
      ${renderPreviewCard(index, false)}
      <div class="frame-actions">
        <button class="soft-btn" data-action="download-one" data-index="${index}" ${runtime.exportBusy ? "disabled" : ""}>개별 다운로드</button>
      </div>
    </div>
  `;
}

function renderStatus() {
  const slot = document.getElementById("status-slot");
  if (!slot) return;
  if (!runtime.status) {
    slot.innerHTML = "";
    return;
  }
  slot.innerHTML = `<div class="${runtime.statusType}">${escapeHtml(runtime.status)}</div>`;
}

function bindGlobalHandlers() {
  document.querySelectorAll("[data-logo-type]").forEach((button) => {
    button.onclick = () => {
      state.logoType = button.dataset.logoType;
      render();
    };
  });

  document.querySelectorAll("[data-ratio]").forEach((button) => {
    button.onclick = () => {
      state.ratio = button.dataset.ratio;
      render();
      persistState();
    };
  });

  document.querySelectorAll("[data-select-card]").forEach((button) => {
    button.onclick = () => {
      state.selectedCardIndex = Number(button.dataset.selectCard);
      render();
      persistState();
    };
  });

  bindInput("logo-text", (value) => {
    state.logoText = value;
    persistState();
    render();
  });
  bindInput("card-count", (value) => {
    resizeCards(Number(value));
    persistState();
    render();
  });
  bindInput("cta-color", (value) => {
    state.ctaColor = value || "#000000";
    persistState();
    render();
  });
  bindInput("cta-color-text", (value) => {
    state.ctaColor = value || "#000000";
    persistState();
    render();
  });
  bindInput("card-title", (value) => {
    const card = state.cards[state.selectedCardIndex];
    if (card) card.title = value;
    persistState();
    render();
  });
  bindInput("card-copyright", (value) => {
    const card = state.cards[state.selectedCardIndex];
    if (card) card.copyright = value;
    persistState();
    render();
  });
  bindInput("cover-logo-size", (value) => {
    state.coverLogoSize = clamp(value || 20, 10, 100);
    persistState();
    render();
  });
  bindInput("cta-text", (value) => {
    state.ctaText = value;
    persistState();
    render();
  });
  bindInput("cta-logo-size", (value) => {
    state.ctaLogoSize = clamp(value || 50, 10, 100);
    persistState();
    render();
  });

  action("pick-logo", () => document.getElementById("logo-file")?.click());
  action("restore-yes", () => restoreSavedState(true));
  action("restore-no", () => restoreSavedState(false));
  action("to-upload", () => {
    state.step = 2;
    state.selectedCardIndex = 0;
    persistState();
    render();
  });
  action("back-setup", () => {
    state.step = 1;
    render();
  });
  action("to-editor", () => {
    state.step = 3;
    state.selectedCardIndex = 0;
    persistState();
    render();
  });
  action("back-upload", () => {
    state.step = 2;
    render();
  });
  action("to-export", () => {
    state.step = 4;
    persistState();
    render();
  });
  action("back-editor", () => {
    state.step = 3;
    render();
  });
  action("toggle-card-text", () => {
    const card = state.cards[state.selectedCardIndex];
    if (card) card.showText = !card.showText;
    persistState();
    render();
  });
  action("toggle-cover-logo", () => {
    state.coverShowLogo = !state.coverShowLogo;
    persistState();
    render();
  });
  action("toggle-cta-text", () => {
    state.ctaShowText = !state.ctaShowText;
    persistState();
    render();
  });
  action("toggle-cta-logo", () => {
    state.ctaShowLogo = !state.ctaShowLogo;
    persistState();
    render();
  });
  action("download-all", downloadAll);
  action("reset-all", resetAll);

  document.getElementById("logo-file")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("로고는 이미지 파일만 업로드할 수 있습니다.", "warning");
      return;
    }
    if (state.logoImage.startsWith("blob:")) URL.revokeObjectURL(state.logoImage);
    state.logoImageFile = file;
    state.logoImage = URL.createObjectURL(file);
    state.logoType = "image";
    persistState();
    render();
  });

  document.querySelectorAll("[data-action='change-media']").forEach((button) => {
    button.onclick = () => document.getElementById(`media-input-${button.dataset.index}`)?.click();
  });

  document.querySelectorAll("[data-action='remove-media']").forEach((button) => {
    button.onclick = () => {
      const index = Number(button.dataset.index);
      replaceCardMedia(index, { ...createEmptyCard(index), ...pickCardText(index) });
      persistState();
      render();
    };
  });

  document.querySelectorAll("[data-action='download-one']").forEach((button) => {
    button.onclick = () => downloadSingle(Number(button.dataset.index));
  });
}

function bindInput(id, handler) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("input", (event) => handler(event.target.value));
}

function action(name, handler) {
  document.querySelectorAll(`[data-action='${name}']`).forEach((button) => {
    button.onclick = handler;
  });
}

function hydrateUploadSlots() {
  const uploadable = state.cardCount - 1;
  for (let index = 0; index < uploadable; index += 1) {
    const input = document.getElementById(`media-input-${index}`);
    const zone = document.querySelector(`[data-upload-index='${index}']`);
    if (!input || !zone) continue;

    input.onchange = (event) => {
      const file = event.target.files?.[0];
      if (file) handleMediaFile(index, file);
      input.value = "";
    };

    zone.onclick = () => input.click();
    zone.ondragover = (event) => {
      event.preventDefault();
      zone.style.borderColor = "#60a5fa";
      zone.style.background = "#eff6ff";
    };
    zone.ondragleave = () => {
      zone.style.borderColor = "#cbd5e1";
      zone.style.background = "#f8fafc";
    };
    zone.ondrop = (event) => {
      event.preventDefault();
      zone.style.borderColor = "#cbd5e1";
      zone.style.background = "#f8fafc";
      const file = event.dataTransfer.files?.[0];
      if (file) handleMediaFile(index, file);
    };
  }
}

function hydrateVideoThumbs() {
  document.querySelectorAll(".video-thumb-source").forEach((video) => {
    const index = Number(video.dataset.videoIndex);
    const range = document.querySelector(`[data-thumb-range='${index}']`);
    const canvas = document.querySelector(`[data-canvas-index='${index}']`);
    const meta = runtime.thumbMeta.get(index) || { duration: 0, currentTime: 0 };

    const capture = () => {
      if (!canvas || !video.videoWidth || !video.videoHeight) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumb = canvas.toDataURL("image/jpeg", 0.84);
      const card = state.cards[index];
      if (card?.mediaType === "video") card.thumbnailUrl = thumb;
      persistState();
      const frame = video.closest(".upload-card")?.querySelector(".media-frame img");
      if (frame) frame.src = thumb;
    };

    video.onloadedmetadata = () => {
      meta.duration = video.duration;
      if (!Number.isFinite(meta.currentTime)) meta.currentTime = 0;
      runtime.thumbMeta.set(index, meta);
      if (range) {
        range.max = String(video.duration);
        range.disabled = false;
      }
      video.currentTime = Math.min(meta.currentTime || 0, video.duration || 0);
      if (video.duration > MAX_VIDEO_DURATION) {
        notify(`카드 ${index + 1} 비디오는 내보내기 시 ${MAX_VIDEO_DURATION}초까지만 포함됩니다.`, "warning");
      }
    };

    video.onseeked = () => {
      meta.currentTime = video.currentTime;
      runtime.thumbMeta.set(index, meta);
      capture();
    };

    video.onerror = () => notify("지원하지 않는 비디오 형식입니다.", "warning");

    if (range) {
      range.oninput = () => {
        meta.currentTime = Number(range.value);
        runtime.thumbMeta.set(index, meta);
        video.currentTime = Math.min(meta.currentTime, meta.duration || 0);
        const row = range.parentElement.querySelector(".meta-row span");
        if (row) row.textContent = formatTime(meta.currentTime);
      };
    }
  });
}

function resizeCards(count) {
  const next = clamp(count, 3, 10);
  if (next > state.cards.length) {
    for (let index = state.cards.length; index < next; index += 1) state.cards.push(createEmptyCard(index));
  } else if (next < state.cards.length) {
    for (let index = next; index < state.cards.length; index += 1) revokeCardUrls(state.cards[index]);
    state.cards = state.cards.slice(0, next);
  }
  state.cardCount = next;
  state.selectedCardIndex = clamp(state.selectedCardIndex, 0, next - 1);
}

function pickCardText(index) {
  const current = state.cards[index] || createEmptyCard(index);
  return {
    id: current.id,
    title: current.title,
    body: current.body,
    showText: current.showText,
    copyright: current.copyright,
  };
}

function revokeCardUrls(card) {
  if (!card) return;
  if (card.mediaType === "image" && card.imageUrl?.startsWith("blob:")) URL.revokeObjectURL(card.imageUrl);
  if (card.mediaType === "video" && card.videoUrl?.startsWith("blob:")) URL.revokeObjectURL(card.videoUrl);
}

function replaceCardMedia(index, nextCard) {
  revokeCardUrls(state.cards[index]);
  state.cards[index] = nextCard;
  runtime.thumbMeta.delete(index);
}

function handleMediaFile(index, file) {
  clearStatus();
  const cover = index === 0;
  if (cover && file.type.startsWith("video/")) {
    notify("표지 카드는 이미지만 업로드할 수 있습니다.", "warning");
    return;
  }
  if (file.type.startsWith("image/")) {
    if (file.size > MAX_IMAGE_SIZE) {
      notify("이미지 파일은 10MB 이하만 업로드할 수 있습니다.", "warning");
      return;
    }
    replaceCardMedia(index, {
      ...pickCardText(index),
      mediaType: "image",
      imageUrl: URL.createObjectURL(file),
      imageFile: file,
    });
    persistState();
    render();
    return;
  }
  if (file.type.startsWith("video/")) {
    if (file.size > MAX_VIDEO_SIZE) {
      notify("비디오 파일은 100MB 이하만 업로드할 수 있습니다.", "warning");
      return;
    }
    if (!isVideoEncoderSupported()) {
      notify("현재 브라우저는 비디오 MP4 내보내기를 지원하지 않을 수 있습니다. 이미지 카드는 정상 동작합니다.", "warning");
    }
    replaceCardMedia(index, {
      ...pickCardText(index),
      mediaType: "video",
      videoUrl: URL.createObjectURL(file),
      videoFile: file,
      thumbnailUrl: "",
    });
    runtime.thumbMeta.set(index, { duration: 0, currentTime: 0 });
    persistState();
    render();
    return;
  }
  notify("이미지 또는 비디오 파일만 업로드할 수 있습니다.", "warning");
}

function getCtaBackground() {
  const first = state.cards[0];
  if (first?.mediaType === "image") return first.imageUrl;
  if (first?.mediaType === "video") return first.thumbnailUrl || "";
  return "";
}

function formatCopyright(text) {
  if (!text) return "";
  return text.startsWith("ⓒ") || text.startsWith("©") ? text : `ⓒ ${text}`;
}

function escapeHtml(text = "") {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(text = "") {
  return escapeHtml(text);
}

function formatTime(seconds) {
  const safe = Number.isFinite(seconds) ? seconds : 0;
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function isVideoEncoderSupported() {
  return typeof VideoEncoder !== "undefined";
}

function getCardExportName(index, ext) {
  return `${brandName()}-card-${String(index + 1).padStart(2, "0")}.${ext}`;
}

function ensureHiddenPreview(index) {
  const captureRoot = document.getElementById("hidden-capture");
  let existing = captureRoot.querySelector(`[data-preview-index='${index}']`);
  if (existing) return existing;
  captureRoot.insertAdjacentHTML("beforeend", renderPreviewCard(index, true));
  existing = captureRoot.querySelector(`[data-preview-index='${index}']`);
  return existing;
}

async function capturePreviewAsBlob(index) {
  const preview = ensureHiddenPreview(index);
  await document.fonts.ready;
  const canvas = await window.html2canvas(preview, {
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    scale: 1,
  });
  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("PNG 생성에 실패했습니다."))), "image/png", 1);
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function downloadSingle(index) {
  if (runtime.exportBusy) return;
  runtime.exportBusy = true;
  render();
  try {
    const card = state.cards[index];
    if (card.mediaType === "video" && index !== state.cardCount - 1) {
      const blob = await exportVideoCard(index);
      downloadBlob(blob, getCardExportName(index, "mp4"));
      notify(`카드 ${index + 1} 비디오를 MP4로 저장했습니다.`, "success");
    } else {
      const blob = await capturePreviewAsBlob(index);
      downloadBlob(blob, getCardExportName(index, "png"));
      notify(`카드 ${index + 1} 이미지를 PNG로 저장했습니다.`, "success");
    }
  } catch (error) {
    notify(error.message || "내보내기에 실패했습니다.", "warning");
  } finally {
    runtime.exportBusy = false;
    render();
  }
}

async function downloadAll() {
  if (runtime.exportBusy) return;
  runtime.exportBusy = true;
  runtime.exportProgress = { current: 0, total: state.cardCount };
  render();
  try {
    const zip = new window.JSZip();
    for (let index = 0; index < state.cardCount; index += 1) {
      const card = state.cards[index];
      runtime.exportProgress = { current: index + 1, total: state.cardCount };
      renderStatus();
      if (card.mediaType === "empty" && index !== state.cardCount - 1) continue;
      try {
        if (card.mediaType === "video" && index !== state.cardCount - 1) {
          const blob = await exportVideoCard(index);
          zip.file(getCardExportName(index, "mp4"), blob);
        } else {
          const blob = await capturePreviewAsBlob(index);
          zip.file(getCardExportName(index, "png"), blob);
        }
      } catch (error) {
        notify(`카드 ${index + 1} 내보내기에 실패해 건너뛰었습니다. ${error.message || ""}`.trim(), "warning");
      }
      render();
    }
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `${brandName()}-card-news.zip`);
    notify("전체 카드뉴스 ZIP 다운로드가 완료되었습니다.", "success");
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    notify(error.message || "ZIP 생성에 실패했습니다.", "warning");
  } finally {
    runtime.exportBusy = false;
    runtime.exportProgress = null;
    render();
  }
}

function getHiddenPreviewStyle() {
  const dims = state.ratio === "4:5" ? { width: 1080, height: 1350 } : { width: 1080, height: 1080 };
  return `width:${dims.width}px;height:${dims.height}px;`;
}

async function exportVideoCard(index) {
  if (!isVideoEncoderSupported()) {
    throw new Error("이 브라우저에서는 VideoEncoder를 지원하지 않아 MP4 내보내기가 불가능합니다.");
  }
  const card = state.cards[index];
  if (card.mediaType !== "video") {
    throw new Error("비디오 카드가 아닙니다.");
  }
  const { Muxer, ArrayBufferTarget } = await import("https://cdn.jsdelivr.net/npm/mp4-muxer@5.2.2/+esm");
  const dims = state.ratio === "4:5" ? { width: 1080, height: 1350 } : { width: 1080, height: 1080 };
  const video = document.createElement("video");
  video.src = card.videoUrl;
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";

  await new Promise((resolve, reject) => {
    video.onloadedmetadata = () => resolve();
    video.onerror = () => reject(new Error("비디오 로드에 실패했습니다."));
  });

  const fps = 30;
  const duration = Math.min(video.duration || 0, MAX_VIDEO_DURATION);
  const totalFrames = Math.max(1, Math.floor(duration * fps));
  const config = {
    codec: "avc1.640028",
    width: dims.width,
    height: dims.height,
    bitrate: 5_000_000,
    framerate: fps,
  };
  const support = await VideoEncoder.isConfigSupported(config);
  if (!support.supported) {
    throw new Error("현재 브라우저 설정에서는 H.264 MP4 인코딩을 지원하지 않습니다.");
  }

  const logoImage = state.logoType === "image" && state.logoImage ? await loadImage(state.logoImage).catch(() => null) : null;

  const target = new ArrayBufferTarget();
  const muxer = new Muxer({
    target,
    video: { codec: "avc", width: dims.width, height: dims.height },
    fastStart: "in-memory",
  });

  const encoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (error) => console.error(error),
  });
  encoder.configure(config);

  const canvas = typeof OffscreenCanvas !== "undefined"
    ? new OffscreenCanvas(dims.width, dims.height)
    : Object.assign(document.createElement("canvas"), { width: dims.width, height: dims.height });
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("비디오 렌더링 컨텍스트를 만들 수 없습니다.");

  try {
    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex += 1) {
      while (encoder.encodeQueueSize > 3) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      video.currentTime = frameIndex / fps;
      await new Promise((resolve) => {
        video.onseeked = () => resolve();
      });
      ctx.clearRect(0, 0, dims.width, dims.height);
      ctx.drawImage(video, 0, 0, dims.width, dims.height);
      drawVideoOverlay(ctx, card, index, dims.width, dims.height, logoImage);
      const frame = new VideoFrame(canvas, {
        timestamp: (frameIndex * 1_000_000) / fps,
        duration: 1_000_000 / fps,
      });
      encoder.encode(frame, { keyFrame: frameIndex % (fps * 2) === 0 });
      frame.close();
      runtime.exportProgress = { current: frameIndex + 1, total: totalFrames };
      render();
    }
    await encoder.flush();
    muxer.finalize();
    return new Blob([target.buffer], { type: "video/mp4" });
  } finally {
    encoder.close();
    video.src = "";
    video.load();
    runtime.exportProgress = null;
  }
}

function drawVideoOverlay(ctx, card, index, width, height, logoImage) {
  const isCover = index === 0;
  if (card.showText) {
    const gradient = ctx.createLinearGradient(0, height * 0.38, 0, height);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(0.5, "rgba(0,0,0,0.35)");
    gradient.addColorStop(1, "rgba(0,0,0,0.82)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  if (isCover && state.coverShowLogo) drawLogoOnCanvas(ctx, width, state.coverLogoSize, 30, logoImage);
  if (card.showText && card.title) {
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 12;
    const fontSize = isCover ? 60 : 48;
    ctx.font = `800 ${fontSize}px sans-serif`;
    wrapText(ctx, card.title, width * 0.054, height * (isCover ? 0.74 : 0.79), width * 0.88, fontSize * 1.2);
    ctx.shadowBlur = 0;
  }
  if (!isCover && card.showText && card.copyright) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "30px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(formatCopyright(card.copyright), width * 0.944, height * 0.955);
  }
}

function drawLogoOnCanvas(ctx, width, sizePercent, top, logoImage) {
  const pixelWidth = (width * sizePercent) / 100;
  if (state.logoType === "image" && logoImage) {
    const height = pixelWidth * (logoImage.height / logoImage.width || 0.4);
    ctx.drawImage(logoImage, width / 2 - pixelWidth / 2, top, pixelWidth, height);
    return;
  }
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = `800 ${Math.max(32, pixelWidth * 0.28)}px sans-serif`;
  ctx.fillText(state.logoText || "", width / 2, top + 28);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = String(text).split("\n");
  let currentY = y;
  lines.forEach((line) => {
    let current = "";
    line.split("").forEach((char) => {
      const test = current + char;
      if (ctx.measureText(test).width > maxWidth && current) {
        ctx.fillText(current, x, currentY);
        current = char;
        currentY += lineHeight;
      } else {
        current = test;
      }
    });
    if (current) ctx.fillText(current, x, currentY);
    currentY += lineHeight;
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("이미지를 불러오지 못했습니다."));
    img.src = src;
  });
}

function resetAll() {
  state.cards.forEach(revokeCardUrls);
  if (state.logoImage.startsWith("blob:")) URL.revokeObjectURL(state.logoImage);
  Object.assign(state, createInitialState());
  runtime.thumbMeta.clear();
  runtime.exportProgress = null;
  runtime.exportBusy = false;
  localStorage.removeItem(STORAGE_KEY);
  notify("초기화했습니다. 처음부터 다시 시작할 수 있습니다.", "success");
  render();
}
