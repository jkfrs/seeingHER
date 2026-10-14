const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let artState = { step: "opening", mode: "", room: 1, selectedAgeId: "", filter: "", guessedWrong: new Set(), solved: false };
let bookLanguage = "english";
let bookPage = 1;

function routeTo(name) {
  const route = SITE_DATA ? name : "home";
  $$(".page").forEach(page => page.classList.toggle("active", page.dataset.route === route));
  $$(".main-nav a").forEach(link => link.classList.toggle("active", link.dataset.page === route));
  $(".main-nav").classList.remove("open");
  $(".menu-toggle").setAttribute("aria-expanded", "false");
  if (location.hash !== `#${route}`) history.replaceState(null, "", `#${route}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function paintingTile(painting, options = {}) {
  const faded = options.faded ? " is-faded" : "";
  return `<button class="painting-tile${faded}" data-painting="${painting.id}" aria-label="Open painting ${painting.id.slice(1)}: ${painting.caption}" ${options.faded ? "tabindex='-1'" : ""}>
    <span class="tile-index">${painting.id.slice(1)}</span><img src="${painting.image}" alt="Child's painting: ${painting.caption}" loading="lazy">
  </button>`;
}

function renderHome() {
  const page = $("#page-home");
  const intro = SITE_DATA.introduction;
  page.innerHTML = `<section class="home-hero"><div class="hero-copy"><span class="eyebrow">A collection of care &amp; creativity</span><h1><span class="home-title-soft">seeing</span> <em class="home-title-hero">HER</em></h1><p class="home-subheading"><span class="home-sub-caregivers">Caregivers</span>: An <span class="home-sub-overlooked">Overlooked</span> Population Affected by <span class="home-sub-cancer">Cancer</span></p><div class="hero-foot"><span>Stories from the other side of illness</span><span>—</span><span>2026</span></div></div><div class="hero-art"><img src="${SITE_DATA.siteImages.cover}" alt="Cover image for the seeing HER website" width="3000" height="3000"><span class="hero-index">A small act of being together · 01</span></div></section>
  <section class="home-introduction"><div class="home-intro-inner"><img class="home-intro-photo" src="${SITE_DATA.siteImages.portrait}" alt="Portrait of Jinyuan He" width="3000" height="3000" loading="lazy"><div class="home-intro-copy"><span class="eyebrow">A note about Jinyuan</span><div class="intro-copy-paragraphs">${intro.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div><p class="intro-lead">${escapeHtml(intro.leadLine)}</p><ul class="intro-activities">${intro.activities.map(item => `<li>${item}</li>`).join("")}</ul><p class="intro-closing">${escapeHtml(intro.closing)}</p></div></div></section>
  <section class="home-note"><div class="definition-card"><div><span class="eyebrow">A word to hold close</span><h2>Caregiver</h2></div><p>A caregiver is an <span class="definition-emphasis">unpaid individual</span>, such as a family member, partner, friend, or neighbor, who provides regular <span class="definition-emphasis">care</span>, <span class="definition-emphasis">assistance</span>, or <span class="definition-emphasis">supervision</span> to someone with a chronic illness, disability, functional limitation, or old-age needs.</p></div></section>
  <section class="toc-section"><div class="toc-intro"><div><span class="eyebrow">Explore the collection</span><h2>Four ways to see <em class="home-title-hero">HER</em>.</h2></div><p>Stories, paintings, and notes made with care.</p></div><div class="toc-grid">
    <a class="toc-card" href="#documentary"><span class="card-number">01 / FILM</span><div><h3>Documentary</h3><p>A story told through quiet moments.</p></div><span class="toc-arrow">↗</span></a>
    <a class="toc-card" href="#art-works"><span class="card-number">02 / GALLERY</span><div><h3>Art Works</h3><p>Twenty-eight paintings, eight sessions.</p></div><span class="toc-arrow">↗</span></a>
    <a class="toc-card" href="#picture-book"><span class="card-number">03 / BOOK</span><div><h3>Published Artbook</h3><p>A keepsake made to remember.</p></div><span class="toc-arrow">↗</span></a>
    <a class="toc-card" href="#other-works"><span class="card-number">04 / STORIES</span><div><h3>Published Stories</h3><p>Families share what helped them through.</p></div><span class="toc-arrow">↗</span></a>
  </div></section>`;
}

function renderDocumentary() {
  const d = SITE_DATA.documentary;
  const media = `<iframe width="560" height="315" src="${d.youtubeEmbedSrc}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  const intro = d.intro.split("\n").map(escapeHtml).join("<br>");
  const items = d.descriptionItems.map(item => `<li>${item}</li>`).join("");
  $("#page-documentary").innerHTML = `<section class="interior-hero"><span class="eyebrow">A short documentary</span><h1>Documentary</h1><p class="documentary-intro">${intro}</p></section><div class="documentary-content"><div class="video-frame">${media}</div><a class="youtube-watch-link button" href="${d.youtubeWatchUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(d.youtubeLinkText)}</a><div class="video-meta"><div><h2>${d.title}</h2><ul class="documentary-points">${items}</ul></div><p class="credit"><span>${d.credit}</span> <span class="credit-name">${d.creditName}</span></p></div></div>`;
}

function renderOtherWorks() {
  $("#page-other-works").innerHTML = `<section class="interior-hero"><span class="eyebrow">Words that carry forward</span><h1>Published Stories</h1><p>These conversations with families whose children have recovered offer encouragement and company to parents whose children are still in treatment.</p></section><div class="purpose-band"><p>${SITE_DATA.storiesPurpose.map(line => `<span>${escapeHtml(line)}</span>`).join("")}</p></div><section class="section-wrap"><div class="article-grid">${SITE_DATA.articles.map(item => item.url ? `<a class="article-card" href="${item.url}" target="_blank" rel="noopener noreferrer"><span class="number">${item.number}</span><h3>${item.title}</h3><p>${item.summary}</p><span>Read the story ↗</span></a>` : `<article class="article-card"><span class="number">${item.number}</span><h3>${item.title}</h3><p>${item.summary}</p><span>Link coming soon</span></article>`).join("")}</div></section>`;
}

function renderBook() {
  const book = SITE_DATA.books[bookLanguage];
  const mobile = window.matchMedia("(max-width: 700px)").matches;
  const lastPage = mobile ? 1 + (book.pages.length - 1) * 2 : book.pages.length;
  bookPage = Math.min(bookPage, lastPage);
  const pdfPageIndex = mobile && bookPage > 1 ? 1 + Math.floor((bookPage - 2) / 2) : bookPage - 1;
  const side = mobile && bookPage > 1 ? ((bookPage - 2) % 2 === 0 ? "left" : "right") : "spread";
  const imageMode = bookPage === 1 ? "cover" : side;
  const pageAlt = `${book.label === "English" ? "English" : "Chinese"} artbook, page ${bookPage}`;
  const preview = `<div class="book-image-page ${imageMode === "cover" ? "is-cover" : ""} ${imageMode !== "spread" ? `is-${imageMode}` : "is-spread"}" aria-label="${pageAlt}"><img src="${book.pages[pdfPageIndex]}" alt="${pageAlt}" width="1208" height="825"></div>`;
  $("#page-picture-book").innerHTML = `<section class="interior-hero"><span class="eyebrow">Store memories in two languages</span><h1>Published Artbook</h1><p>Turn through a commemorative book made from the images and moments of art therapy sessions</p></section><section class="section-wrap"><div class="book-controls"><div class="language-toggle" aria-label="Choose book edition"><button data-language="english" class="${bookLanguage === "english" ? "active" : ""}">English</button><button data-language="chinese" class="${bookLanguage === "chinese" ? "active" : ""}">中文</button></div><span class="eyebrow">${book.label}</span></div><div class="book-stage is-page-images"><div class="book-image-spread">${preview}<span class="book-gutter"></span></div></div><div class="book-actions"><button class="button" data-book-page="prev" ${bookPage <= 1 ? "disabled" : ""}>← Previous page</button><span class="eyebrow">${bookPage} / ${lastPage}</span><button class="button" data-book-page="next" ${bookPage >= lastPage ? "disabled" : ""}>Next page →</button></div><div class="book-actions"><span></span><a href="${book.pdf}" download>Download ${book.label} ↓</a></div></section>`;
}

function artHeader() {
  return `<header class="art-top"><span class="eyebrow">28 paintings · 8 sessions</span><h1>Art Works</h1><p>Made by children during shared art therapy sessions. Take your time with each image; every painting holds its own small world.</p></header>`;
}

function roomMarkup() {
  const paintings = SITE_DATA.paintings.filter(p => p.session === artState.room);
  const room = artState.room;
  return `${artHeader()}<div class="art-stage"><button class="art-back" data-art-action="to-options">← Exhibition options</button><div class="room-heading"><div><div class="step-kicker">Chronological order · Room ${room} of 8</div><h2>Session ${room}</h2></div><span class="room-meta">${paintings[0]?.date || "Art therapy session"}</span></div><div class="room-wall">${paintings.map(p => `<div class="room-piece"><img src="${p.image}" alt="Child's painting: ${p.caption}"><div class="museum-label">${p.caption}<small>Age ${p.age} · Session ${p.session}</small></div></div>`).join("")}</div><div class="room-nav"><button class="arrow-button" data-art-action="room-prev" aria-label="Previous room" ${room === 1 ? "disabled" : ""}>←</button><div class="floor-plan" aria-label="Exhibition floor plan">${Array.from({length:8},(_,i)=>`<button class="${room === i+1 ? "active" : ""}" data-room="${i+1}" aria-label="Go to room ${i+1}">${String(i+1).padStart(2,"0")}</button>`).join("")}</div><button class="arrow-button" data-art-action="room-next" aria-label="Next room">→</button></div><div class="wall-actions"><button class="button button-dark" data-art-action="finish">Return to full wall <span>↗</span></button></div></div>`;
}

function timelineMarkup() {
  const sorted = [...SITE_DATA.paintings].sort((a,b)=>a.age-b.age || a.id.localeCompare(b.id));
  const selected = sorted.find(p => p.id === artState.selectedAgeId) || sorted[0];
  artState.selectedAgeId = selected.id;
  return `${artHeader()}<div class="art-stage"><button class="art-back" data-art-action="to-options">← Exhibition options</button><div class="step-kicker">Age order · youngest to oldest</div><div class="timeline-layout"><div class="timeline-list">${sorted.map((p,i)=>`<div role="button" tabindex="0" class="timeline-item ${p.id===selected.id?"active":""}" data-age-id="${p.id}">${p.age} years old <span>· ${String(i+1).padStart(2,"0")}</span></div>`).join("")}</div><div class="timeline-detail"><img src="${selected.image}" alt="Child's painting: ${selected.caption}"><div><span class="eyebrow">Age ${selected.age} · Session ${selected.session}</span><h3>A painting to pause with</h3><p>“${selected.caption}”</p><span class="room-meta">${selected.date}</span></div></div></div><div class="wall-actions"><button class="button button-dark" data-art-action="finish">Return to full wall <span>↗</span></button></div></div>`;
}

function optionsMarkup() {
  return `${artHeader()}<div class="art-stage"><div class="step-kicker">Step 2 · Choose how to view</div><div class="option-grid"><article class="option-card"><div><span class="eyebrow">Eight rooms · one session at a time</span><h3>Chronological Order</h3><p>Walk through the exhibition room by room, following the paintings from each session.</p></div><button class="button button-dark" data-art-action="chronological">Enter the rooms ↗</button></article><article class="option-card"><div><span class="eyebrow">From youngest to oldest</span><h3>Age Order</h3><p>Follow a vertical timeline and pause with each painting and its caption.</p></div><button class="button button-light" data-art-action="age-order">Open the timeline ↗</button></article></div><button class="art-back" data-art-action="opening">← Back to opening wall</button></div>`;
}

function splitMarkup() {
  let paintings = SITE_DATA.paintings;
  if (artState.filter === "gender") {
    const girls = paintings.filter(p=>p.gender==="girl"), boys = paintings.filter(p=>p.gender==="boy");
    return `<div class="split-labels"><div class="split-label">Girls<p>${girls.length} paintings</p></div><div class="split-label">Boys<p>${boys.length} paintings</p></div></div><div class="split-grid"><div class="split-column">${girls.map(p=>paintingTile(p)).join("")}</div><div class="split-column">${boys.map(p=>paintingTile(p)).join("")}</div></div>`;
  }
  if (artState.filter === "appearance") {
    const hair = paintings.filter(p=>p.hasHair), noHair = paintings.filter(p=>!p.hasHair);
    return `<div class="split-labels"><div class="split-label">Figures with hair<p>“Mother's wish: to return to the body before illness.”</p></div><div class="split-label">Figures without hair<p>“Mother's hope: to remember this special moment of life for the healthy future child.”</p></div></div><div class="split-grid"><div class="split-column">${hair.map(p=>paintingTile(p)).join("")}</div><div class="split-column">${noHair.map(p=>paintingTile(p)).join("")}</div></div>`;
  }
  return `<div class="guess-banner"><img src="${SITE_DATA.xuanGuessImage}" alt="A bald girl's painting shown as a guessing game clue"><div><span class="eyebrow">A small guessing game</span><h3>Who Is She?</h3><p>Which painting in the wall was made by the same girl? Choose a painting to find out.</p></div></div><p class="guess-status" aria-live="polite">${artState.solved ? "You found her painting." : `${artState.guessedWrong.size} paintings ruled out.`}</p>${artState.solved ? `<div class="guess-correct"><img src="${SITE_DATA.paintings.find(p=>p.id===SITE_DATA.xuanPaintingId).image}" alt="Xuan's painting: ${SITE_DATA.paintings.find(p=>p.id===SITE_DATA.xuanPaintingId).caption}"><div><span class="eyebrow">The painting belongs to Xuan</span><p>${SITE_DATA.xuanStory}</p><button class="button" data-art-action="play-again">Play again</button> <button class="button" data-art-action="to-options">View other options</button></div></div>` : `<div class="wall-grid">${paintings.map(p=>paintingTile(p,{faded:artState.guessedWrong.has(p.id)})).join("")}</div>`}`;
}

function exploreMarkup() {
  const grid = artState.filter ? splitMarkup() : `<div class="wall-grid">${SITE_DATA.paintings.map(p=>paintingTile(p)).join("")}</div>`;
  return `${artHeader()}<div class="art-stage"><div class="step-kicker">Step 3 · Return to the full wall</div><div class="filter-tabs"><button class="${artState.filter==="gender"?"active":""}" data-filter="gender">Gender</button><button class="${artState.filter==="appearance"?"active":""}" data-filter="appearance">Appearance</button><button class="${artState.filter==="guess"?"active":""}" data-filter="guess">Who Is She?</button></div>${grid}<div class="wall-actions"><button class="button" data-art-action="to-options">View exhibition options</button></div></div>`;
}

function renderArt() {
  const page = $("#page-art-works");
  if (artState.step === "room") page.innerHTML = roomMarkup();
  else if (artState.step === "timeline") page.innerHTML = timelineMarkup();
  else if (artState.step === "options") page.innerHTML = optionsMarkup();
  else if (artState.step === "explore") page.innerHTML = exploreMarkup();
  else page.innerHTML = `${artHeader()}<div class="art-stage"><div class="step-kicker">Step 1 · Opening wall</div><div class="wall-grid">${SITE_DATA.paintings.map(p=>paintingTile(p)).join("")}</div><div class="wall-actions"><button class="button button-dark" data-art-action="continue">Continue <span>→</span></button></div></div>`;
}

function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }

function renderPage(route) {
  if (route === "home") renderHome();
  if (route === "documentary") renderDocumentary();
  if (route === "art-works") window.resetArtWorks();
  if (route === "picture-book") renderBook();
  if (route === "other-works") renderOtherWorks();
}

function showPainting(id) {
  const painting = SITE_DATA.paintings.find(p=>p.id===id);
  if (!painting) return;
  $("#painting-dialog-content").innerHTML = `<div class="dialog-art"><img src="${painting.image}" alt="Child's painting: ${painting.caption}"><div><span class="eyebrow">Session ${painting.session} · ${painting.date}</span><h2>Age ${painting.age}</h2><p>“${painting.caption}”</p></div></div>`;
  $("#painting-dialog").showModal();
}

document.addEventListener("click", event => {
  const navLink = event.target.closest(".main-nav a, .wordmark, .toc-card, .site-footer a");
  if (navLink && navLink.getAttribute("href")?.startsWith("#")) {
    const route = navLink.getAttribute("href").slice(1);
    if ($(`#page-${route}`)) { event.preventDefault(); routeTo(route); renderPage(route); }
  }
  const menu = event.target.closest("#menu-toggle");
  if (menu) { const open = $(".main-nav").classList.toggle("open"); menu.setAttribute("aria-expanded", String(open)); }
  const tile = event.target.closest(".painting-tile");
  if (tile) {
    if (artState.step === "explore" && artState.filter === "guess" && !artState.solved) {
      const id = tile.dataset.painting;
      if (id === SITE_DATA.xuanPaintingId) artState.solved = true;
      else artState.guessedWrong.add(id);
      renderArt();
    } else showPainting(tile.dataset.painting);
  }
  const action = event.target.closest("[data-art-action]")?.dataset.artAction;
  if (action) {
    if (action === "continue") artState.step = "options";
    if (action === "opening") { artState = {step:"opening",mode:"",room:1,selectedAgeId:"",filter:"",guessedWrong:new Set(),solved:false}; }
    if (action === "chronological") { artState.step="room"; artState.room=1; artState.mode="chronological"; }
    if (action === "age-order") { artState.step="timeline"; artState.mode="age"; artState.selectedAgeId=""; }
    if (action === "room-prev") artState.room = Math.max(1,artState.room-1);
    if (action === "room-next") artState.room = Math.min(8,artState.room+1);
    if (action === "finish") { artState.step="explore"; artState.filter=""; }
    if (action === "to-options") { artState.step="options"; artState.filter=""; }
    if (action === "play-again") { artState.solved=false; artState.guessedWrong.clear(); }
    renderArt();
  }
  const roomButton = event.target.closest("[data-room]");
  if (roomButton) { artState.room=Number(roomButton.dataset.room); renderArt(); }
  const ageItem = event.target.closest("[data-age-id]");
  if (ageItem) { artState.selectedAgeId=ageItem.dataset.ageId; renderArt(); }
  const filter = event.target.closest("[data-filter]");
  if (filter) { artState.filter=filter.dataset.filter; artState.guessedWrong.clear(); artState.solved=false; renderArt(); }
  const language = event.target.closest("[data-language]");
  if (language) { bookLanguage=language.dataset.language; bookPage=1; renderBook(); }
  const pageButton = event.target.closest("[data-book-page]");
  if (pageButton) { bookPage=Math.max(1,bookPage+(pageButton.dataset.bookPage==="next"?1:-1)); renderBook(); }
});

$("#painting-dialog").addEventListener("click", event => { if (event.target === event.currentTarget || event.target.closest(".dialog-close")) event.currentTarget.close(); });
window.addEventListener("hashchange",()=>{const route=location.hash.slice(1)||"home";if($(`#page-${route}`)){routeTo(route);renderPage(route);}});
const firstRoute = location.hash.slice(1);
routeTo($(`#page-${firstRoute}`) ? firstRoute : "home");
renderPage($(`#page-${firstRoute}`) ? firstRoute : "home");
