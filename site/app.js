/* Cardiff Community Meals — demo data layer.
   Uses localStorage as a stand-in database so the prototype works with
   no backend. In production this would be replaced by real API calls.
   Static UI text is translated via i18n.js (I18N); this file translates
   the small set of *dynamic* labels it generates (statuses, tiers) using
   I18N.t() directly, and re-renders on the "ccm:langchange" event. */

const CCM = (() => {
  const KEYS = {
    requests: "ccm_requests", donations: "ccm_donations", businesses: "ccm_businesses",
    rotas: "ccm_rotas", rotaSignups: "ccm_rota_signups", rotaMessages: "ccm_rota_messages",
    comments: "ccm_comments",
  };

  const CARDIFF_AREAS = ["Cathays", "Riverside", "Grangetown", "Splott", "Roath", "Canton",
    "Ely", "Llanrumney", "Adamsdown", "Butetown", "Rumney", "Whitchurch", "Llandaff"];

  // A quiet skyline silhouette (castle keep + clock tower, Principality
  // Stadium's arched roof, generic rooftops either side) used as low-opacity
  // background texture on every hero-gradient section. Defined once here and
  // injected into any ".hero-skyline" placeholder so five pages don't each
  // carry a duplicate 30-line SVG. Plain fills/strokes only, no clip-path —
  // same lesson as the flag icons and the earlier story-avatar rework.
  const HERO_SKYLINE_SVG = `
    <svg viewBox="0 0 1400 200" preserveAspectRatio="xMidYMax slice" width="100%" height="100%" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <g fill="#ffffff" fill-opacity="0.14">
        <rect x="0" y="130" width="50" height="70"/>
        <rect x="55" y="110" width="40" height="90"/>
        <rect x="100" y="145" width="55" height="55"/>
        <rect x="160" y="120" width="35" height="80"/>
        <rect x="200" y="150" width="60" height="50"/>
        <rect x="265" y="135" width="45" height="65"/>
        <rect x="330" y="70" width="90" height="130"/>
        <rect x="330" y="55" width="14" height="15"/>
        <rect x="352" y="55" width="14" height="15"/>
        <rect x="374" y="55" width="14" height="15"/>
        <rect x="396" y="55" width="14" height="15"/>
        <circle cx="375" cy="115" r="16" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="4"/>
        <rect x="430" y="140" width="50" height="60"/>
        <rect x="490" y="115" width="40" height="85"/>
        <rect x="540" y="150" width="55" height="50"/>
        <rect x="605" y="125" width="35" height="75"/>
      </g>
      <path d="M660,200 L660,165 Q750,138 840,165 L840,200 Z" fill="#ffffff" fill-opacity="0.13"/>
      <path d="M668,172 Q706,88 750,86 Q794,88 832,172" fill="none" stroke="#ffffff" stroke-opacity="0.32" stroke-width="6" stroke-linecap="round"/>
      <path d="M690,176 Q717,112 750,110 Q783,112 810,176" fill="none" stroke="#ffffff" stroke-opacity="0.26" stroke-width="5" stroke-linecap="round"/>
      <g fill="#ffffff" fill-opacity="0.14">
        <rect x="855" y="140" width="45" height="60"/>
        <rect x="905" y="115" width="35" height="85"/>
        <rect x="945" y="150" width="60" height="50"/>
        <rect x="1010" y="130" width="40" height="70"/>
        <rect x="1055" y="145" width="55" height="55"/>
        <rect x="1115" y="115" width="35" height="85"/>
        <rect x="1155" y="150" width="50" height="50"/>
        <rect x="1210" y="130" width="45" height="70"/>
        <rect x="1260" y="150" width="60" height="50"/>
        <rect x="1325" y="120" width="35" height="80"/>
        <rect x="1365" y="150" width="35" height="50"/>
      </g>
    </svg>`;

  // Situation options are stored as canonical English values (the "data"),
  // but shown to the user translated via their i18n keys (the "UI").
  const SITUATIONS = [
    { key: "situation.illness", value: "Recovering from illness" },
    { key: "situation.disability", value: "Living with a disability" },
    { key: "situation.discharged", value: "Recently discharged from hospital" },
    { key: "situation.other", value: "Other ongoing need" },
  ];

  const ROTA_OCCASIONS = [
    { key: "rota.form.occasion.baby", value: "New baby" },
    { key: "rota.form.occasion.surgery", value: "Surgery or illness recovery" },
    { key: "rota.form.occasion.bereavement", value: "Bereavement" },
    { key: "rota.form.occasion.other", value: "Other" },
  ];

  function uid(prefix) {
    return prefix + "_" + Math.random().toString(36).slice(2, 9);
  }

  function load(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; }
    catch (e) { return []; }
  }
  function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }

  function seedIfEmpty() {
    if (localStorage.getItem("ccm_seeded")) return;

    const businesses = [
      { id: uid("biz"), name: "Cathays Kitchen", cuisine: "Welsh & British comfort food", hygiene: 5, delivery: "Own drivers", approved: true, joinedAt: daysAgo(210) },
      { id: uid("biz"), name: "Taste of Grangetown", cuisine: "Caribbean", hygiene: 5, delivery: "Own drivers", approved: true, joinedAt: daysAgo(160) },
      { id: uid("biz"), name: "Roath Bakes", cuisine: "Bakery & soups", hygiene: 4, delivery: "Courier partner", approved: true, joinedAt: daysAgo(95) },
      { id: uid("biz"), name: "Canton Curry House", cuisine: "South Asian", hygiene: 5, delivery: "Own drivers", approved: true, joinedAt: daysAgo(60) },
      { id: uid("biz"), name: "Bay Bites Café", cuisine: "Vegetarian & vegan", hygiene: 4, delivery: "Collection or courier", approved: true, joinedAt: daysAgo(20) },
    ];
    save(KEYS.businesses, businesses);

    const requests = [
      { id: uid("req"), name: "Margaret", area: "Cathays", situation: "Recently discharged from hospital", dietary: "No nuts", urgency: "This week", mealsNeeded: 5, createdAt: daysAgo(3), referrerType: "Family member" },
      { id: uid("req"), name: "David", area: "Grangetown", situation: "Living with a disability", dietary: "Halal", urgency: "Ongoing", mealsNeeded: 10, createdAt: daysAgo(6), referrerType: "Self" },
      { id: uid("req"), name: "Iris", area: "Roath", situation: "Recovering from illness", dietary: "Soft food, low salt", urgency: "Urgent — next 48 hours", mealsNeeded: 3, createdAt: daysAgo(1), referrerType: "Neighbour" },
    ];
    save(KEYS.requests, requests);

    const donations = [
      mkDonation(null, "Sioned W.", businesses[0].id, 40, 40 * 7, "delivered", daysAgo(180)),
      mkDonation(null, "Tom & Alys", businesses[0].id, 15, 15 * 7, "delivered", daysAgo(140)),
      mkDonation(null, "Anonymous", businesses[1].id, 28, 28 * 7, "delivered", daysAgo(120)),
      mkDonation(null, "Rhys P.", businesses[1].id, 12, 12 * 7, "delivered", daysAgo(80)),
      mkDonation(null, "Anonymous", businesses[2].id, 9, 9 * 7, "delivered", daysAgo(60)),
      mkDonation(null, "The Jenkins family", businesses[3].id, 20, 20 * 7, "delivered", daysAgo(40)),
      mkDonation(null, "Anonymous", businesses[3].id, 6, 6 * 7, "delivered", daysAgo(15)),
      mkDonation(null, "Cerys H.", businesses[4].id, 5, 5 * 7, "delivered", daysAgo(9)),
    ];
    save(KEYS.donations, donations);

    // Community Voices — a small public wall, gated by human review before
    // anything appears. Three approved messages so the wall doesn't look
    // empty on first visit, plus one still "pending" so the moderation
    // queue (moderate.html) has something real to demonstrate.
    const comments = [
      { id: uid("cmt"), name: "Bethan", area: "Grangetown",
        message: "Found out about this through my GP after I came out of hospital. Didn't expect strangers to care that much. Diolch o galon.",
        status: "approved", createdAt: daysAgo(35), reviewedAt: daysAgo(34) },
      { id: uid("cmt"), name: "Mr Hughes", area: "Whitchurch",
        message: "Our café signed up as a partner in March — best decision we made all year. A few of the regulars have started asking if they can chip in too.",
        status: "approved", createdAt: daysAgo(22), reviewedAt: daysAgo(21) },
      { id: uid("cmt"), name: "", area: "",
        message: "Just donated my first meal. Small thing, but it's nice knowing exactly where it's going instead of just guessing.",
        status: "approved", createdAt: daysAgo(4), reviewedAt: daysAgo(4) },
      { id: uid("cmt"), name: "Rhodri", area: "Canton",
        message: "Could this ever expand to include grocery deliveries too, not just cooked meals? Would help my nan loads.",
        status: "pending", createdAt: daysAgo(1), reviewedAt: null },
    ];
    save(KEYS.comments, comments);

    localStorage.setItem("ccm_seeded", "1");
  }

  function mkDonation(requestId, donorName, businessId, mealCount, amount, status, createdAt) {
    return { id: uid("don"), requestId, donorName, donorEmail: "", mealCount, amount, businessId, message: "", status, createdAt };
  }

  function daysAgo(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString();
  }

  // --- Public data API ---
  function getRequests() { return load(KEYS.requests); }
  function saveRequests(r) { save(KEYS.requests, r); }
  function getBusinesses() { return load(KEYS.businesses); }
  function saveBusinesses(b) { save(KEYS.businesses, b); }
  function getDonations() { return load(KEYS.donations); }
  function saveDonations(d) { save(KEYS.donations, d); }

  function addRequest(req) {
    const requests = getRequests();
    req.id = uid("req");
    req.createdAt = new Date().toISOString();
    requests.unshift(req);
    saveRequests(requests);
    return req;
  }

  function addBusiness(biz) {
    const businesses = getBusinesses();
    biz.id = uid("biz");
    biz.joinedAt = new Date().toISOString();
    biz.approved = true; // demo: auto-approved. Production requires admin + FSA check.
    businesses.unshift(biz);
    saveBusinesses(businesses);
    return biz;
  }

  function addDonation(don) {
    const donations = getDonations();
    don.id = uid("don");
    don.createdAt = new Date().toISOString();
    don.status = "booked";
    donations.unshift(don);
    saveDonations(donations);
    return don;
  }

  function advanceDonationStatus(id) {
    const order = ["booked", "prepared", "delivered"];
    const donations = getDonations();
    const d = donations.find(x => x.id === id);
    if (!d) return;
    const idx = order.indexOf(d.status);
    if (idx < order.length - 1) d.status = order[idx + 1];
    saveDonations(donations);
  }

  // --- Community Voices: public wall, gated by human review ---
  // Unlike the other forms on this site (which auto-approve for demo
  // convenience), comments deliberately do NOT go live on submit. They sit
  // as "pending" until a real person reviews them on moderate.html — this
  // is a genuine review step, not a simulated one, because the point of
  // the feature is to demonstrate moderated, human-inspected public text.
  function getComments() { return load(KEYS.comments); }
  function saveComments(c) { save(KEYS.comments, c); }

  function addComment(comment) {
    const comments = getComments();
    comment.id = uid("cmt");
    comment.createdAt = new Date().toISOString();
    comment.status = "pending";
    comment.reviewedAt = null;
    comments.unshift(comment);
    saveComments(comments);
    return comment;
  }

  function approveComment(id) {
    const comments = getComments();
    const c = comments.find(x => x.id === id);
    if (c) { c.status = "approved"; c.reviewedAt = new Date().toISOString(); }
    saveComments(comments);
  }

  function rejectComment(id) {
    const comments = getComments();
    const c = comments.find(x => x.id === id);
    if (c) { c.status = "rejected"; c.reviewedAt = new Date().toISOString(); }
    saveComments(comments);
  }

  function resetCommentToPending(id) {
    const comments = getComments();
    const c = comments.find(x => x.id === id);
    if (c) { c.status = "pending"; c.reviewedAt = null; }
    saveComments(comments);
  }

  function approvedComments() {
    return getComments().filter(c => c.status === "approved")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  function pendingComments() {
    return getComments().filter(c => c.status === "pending")
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }

  function reviewedComments() {
    return getComments().filter(c => c.status !== "pending")
      .sort((a, b) => new Date(b.reviewedAt || b.createdAt) - new Date(a.reviewedAt || a.createdAt));
  }

  // --- Cook & Book: private cooking rotas ---
  // A separate, closed-group feature from the public request/donate flow:
  // one organiser sets up a private rota for someone they know (new baby,
  // bereavement, recovery, etc.), shares a link + access code with a small
  // group, and that group signs up for dates, updates them, and talks
  // amongst themselves. Access-code gating is a demo simulation of
  // "private" — production would use real invite-based accounts.
  function getRotas() { return load(KEYS.rotas); }
  function saveRotas(r) { save(KEYS.rotas, r); }
  function getRotaSignups() { return load(KEYS.rotaSignups); }
  function saveRotaSignups(s) { save(KEYS.rotaSignups, s); }
  function getRotaMessages() { return load(KEYS.rotaMessages); }
  function saveRotaMessages(m) { save(KEYS.rotaMessages, m); }

  function generateAccessCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I ambiguity
    let code = "";
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
  }

  function addRota(rota) {
    const rotas = getRotas();
    rota.id = uid("rota");
    rota.accessCode = generateAccessCode();
    rota.createdAt = new Date().toISOString();
    rotas.unshift(rota);
    saveRotas(rotas);
    return rota;
  }

  function findRota(id) {
    return getRotas().find(r => r.id === id) || null;
  }

  function checkRotaCode(id, code) {
    const rota = findRota(id);
    return !!rota && String(code).trim().toUpperCase() === rota.accessCode;
  }

  function rotaDates(rota) {
    const dates = [];
    const start = new Date(rota.startDate + "T00:00:00");
    for (let i = 0; i < Number(rota.days); i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      dates.push(d.toISOString().slice(0, 10));
    }
    return dates;
  }

  function addRotaSignup(signup) {
    const signups = getRotaSignups();
    signup.id = uid("slot");
    signup.createdAt = new Date().toISOString();
    signups.push(signup);
    saveRotaSignups(signups);
    return signup;
  }

  function releaseRotaSignup(signupId) {
    saveRotaSignups(getRotaSignups().filter(s => s.id !== signupId));
  }

  function addRotaMessage(msg) {
    const messages = getRotaMessages();
    msg.id = uid("msg");
    msg.createdAt = new Date().toISOString();
    messages.push(msg);
    saveRotaMessages(messages);
    return msg;
  }

  function fmtDayDate(iso) {
    const lang = I18N.currentLang();
    return new Date(iso + "T00:00:00").toLocaleDateString(lang === "cy" ? "cy-GB" : "en-GB", { weekday: "short", day: "numeric", month: "short" });
  }

  function mealsFundedFor(requestId, donations) {
    return donations.filter(d => d.requestId === requestId).reduce((sum, d) => sum + Number(d.mealCount), 0);
  }

  function requestStatus(request, donations) {
    const linked = donations.filter(d => d.requestId === request.id);
    const funded = linked.reduce((s, d) => s + Number(d.mealCount), 0);
    if (funded < request.mealsNeeded) return "open";
    const allDelivered = linked.length > 0 && linked.every(d => d.status === "delivered");
    if (allDelivered) return "delivered";
    const anyPrepared = linked.some(d => d.status === "prepared" || d.status === "delivered");
    if (anyPrepared) return "prepared";
    return "funded";
  }

  function statusLabel(status) {
    return I18N.t("status." + status);
  }

  function situationLabel(value) {
    const match = SITUATIONS.find(s => s.value === value);
    return match ? I18N.t(match.key) : value;
  }

  function occasionLabel(value) {
    const match = ROTA_OCCASIONS.find(o => o.value === value);
    return match ? I18N.t(match.key) : value;
  }

  function businessMealsDelivered(businessId, donations) {
    return donations.filter(d => d.businessId === businessId && d.status === "delivered")
      .reduce((s, d) => s + Number(d.mealCount), 0);
  }

  function businessTier(mealsDelivered) {
    if (mealsDelivered >= 60) return { key: "biz.tier.gold", cls: "badge-tier-gold" };
    if (mealsDelivered >= 25) return { key: "biz.tier.silver", cls: "badge-tier-silver" };
    if (mealsDelivered >= 1) return { key: "biz.tier.bronze", cls: "badge-tier-bronze" };
    return { key: "biz.tier.new", cls: "badge-tier-bronze" };
  }

  function impactStats() {
    const donations = getDonations();
    const requests = getRequests();
    const mealsDelivered = donations.filter(d => d.status === "delivered").reduce((s, d) => s + Number(d.mealCount), 0);
    const totalRaised = donations.reduce((s, d) => s + Number(d.amount), 0);
    const openRequests = requests.filter(r => requestStatus(r, donations) === "open").length;
    const peopleHelped = new Set(
      donations.filter(d => d.status === "delivered" && d.requestId).map(d => d.requestId)
    ).size + Math.round(mealsDelivered / 12);
    return { mealsDelivered, totalRaised, openRequests, peopleHelped, totalDonations: donations.length };
  }

  function fmtGBP(n) {
    return "£" + Number(n).toLocaleString("en-GB", { maximumFractionDigits: 0 });
  }

  function fmtDate(iso) {
    const lang = I18N.currentLang();
    return new Date(iso).toLocaleDateString(lang === "cy" ? "cy-GB" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  }

  // --- Shared header/footer injection ---
  function renderChrome(activePage) {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");
    const primaryNav = [
      ["index.html", "nav.home"],
      ["request.html", "nav.request"],
      ["donate.html", "nav.donate"],
      ["businesses.html", "nav.partners"],
    ];
    const moreNav = [
      ["rota.html", "nav.rota"],
      ["voices.html", "nav.voices"],
      ["stories.html", "nav.stories"],
      ["impact.html", "nav.impact"],
      ["track.html", "nav.track"],
      ["about.html", "nav.about"],
    ];
    const moreActive = moreNav.some(([href]) => href === activePage);
    const logoSvg = `
      <span class="brand-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 2.5c-.6 1-.6 2 0 3s.6 2 0 3" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M14 2.5c-.6 1-.6 2 0 3s.6 2 0 3" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M3.5 11.5h17c.4 0 .7.35.63.75C20.4 16.7 16.6 20 12 20s-8.4-3.3-9.13-7.75c-.07-.4.23-.75.63-.75z" fill="#fff"/>
        </svg>
      </span>`;
    // Flag icons for the language toggle — hand-drawn, not fetched from a
    // third-party set, so there are no licensing questions or broken CDN
    // links. Kept as plain fills/strokes (no clip-path) after an earlier
    // lesson learned re-drawing the story avatars: complex SVG clip-path
    // content is unreliable across renderers, plain geometry is not.
    const flagUkSvg = `
      <svg viewBox="0 0 200 120" width="26" height="16" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="#00247d"/>
        <path d="M0,0 L200,120 M200,0 L0,120" stroke="#ffffff" stroke-width="24"/>
        <path d="M0,0 L200,120 M200,0 L0,120" stroke="#cf142b" stroke-width="10"/>
        <path d="M100,0 V120 M0,60 H200" stroke="#ffffff" stroke-width="40"/>
        <path d="M100,0 V120 M0,60 H200" stroke="#cf142b" stroke-width="22"/>
      </svg>`;
    const flagCySvg = `
      <svg viewBox="0 0 200 120" width="26" height="16" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="60" fill="#ffffff"/>
        <rect y="60" width="200" height="60" fill="#00a651"/>
        <g fill="#c8102e">
          <path d="M170,78 C150,70 140,45 115,42 C100,40 92,48 88,52 C78,45 68,42 60,45 C52,48 46,44 40,50 L38,58 C44,60 50,58 55,55 C62,60 72,62 82,60 C88,66 96,70 108,68 C130,72 150,85 170,78 Z"/>
          <polygon points="40,50 34,38 46,46"/>
          <polygon points="88,52 84,43 80,50"/>
          <polygon points="78,49 74,41 70,48"/>
          <polygon points="68,47 64,40 60,46"/>
          <path d="M100,45 C110,35 125,38 130,48 C120,50 108,52 100,45 Z"/>
          <path d="M80,60 C78,68 74,74 68,76 L72,78 C76,74 80,70 84,64 Z"/>
          <polygon points="68,76 64,78 68,80"/>
          <polygon points="70,78 67,81 71,82"/>
          <path d="M145,68 C143,74 138,78 132,80 L136,82 C140,78 144,74 148,70 Z"/>
          <polygon points="132,80 128,82 132,84"/>
          <polygon points="134,82 131,85 135,86"/>
        </g>
      </svg>`;
    if (header) {
      header.innerHTML = `
        <div class="cy-ribbon">Croeso i Gaerdydd · Cardiff welcomes you</div>
        <nav class="navbar navbar-expand-xl navbar-dark bg-teal py-2">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center gap-2 py-1" href="index.html">
              ${logoSvg}
              <span class="d-flex flex-column lh-sm">
                <span class="fw-bold fs-5">Cardiff Community Meals</span>
                <small class="text-white-50" data-i18n="brand.tagline" style="font-size:.72rem;">a meal, delivered with care</small>
              </span>
            </a>
            <div class="d-flex align-items-center order-xl-last">
              <div class="lang-toggle" role="group" aria-label="Language / Iaith">
                <button type="button" class="lang-btn" data-lang="cy" title="Cymraeg" aria-label="Cymraeg" onclick="I18N.setLang('cy')">${flagCySvg}</button>
                <button type="button" class="lang-btn" data-lang="en" title="English" aria-label="English" onclick="I18N.setLang('en')">${flagUkSvg}</button>
              </div>
              <button class="navbar-toggler ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="mainNav">
              <ul class="navbar-nav ms-auto gap-1 py-2 py-xl-0">
                ${primaryNav.map(([href, key]) => `<li class="nav-item"><a class="nav-link${activePage === href ? " active" : ""}" href="${href}" data-i18n="${key}">${key}</a></li>`).join("")}
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle${moreActive ? " active" : ""}" href="#" id="moreNavDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-i18n="nav.more">More</a>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="moreNavDropdown">
                    ${moreNav.map(([href, key]) => `<li><a class="dropdown-item${activePage === href ? " active" : ""}" href="${href}" data-i18n="${key}">${key}</a></li>`).join("")}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>`;
    }
    if (footer) {
      const daffodilSvg = `
        <svg width="30" height="30" viewBox="0 0 80 80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <g fill="#e8c46a">
            <circle cx="56" cy="40" r="13"/>
            <circle cx="48" cy="53.9" r="13"/>
            <circle cx="32" cy="53.9" r="13"/>
            <circle cx="24" cy="40" r="13"/>
            <circle cx="32" cy="26.1" r="13"/>
            <circle cx="48" cy="26.1" r="13"/>
          </g>
          <circle cx="40" cy="40" r="11" fill="#a3273c"/>
        </svg>`;
      footer.innerHTML = `
        <div class="container py-4 d-flex flex-wrap justify-content-between gap-4">
          <div>
            <strong class="text-white d-flex align-items-center gap-2 mb-1">${daffodilSvg} Cardiff Community Meals</strong>
            <span data-i18n="footer.about">A community pilot serving Cardiff, Wales.</span><br>
            <span data-i18n="footer.demo">This is a working prototype — donations and payments are simulated.</span>
          </div>
          <div>
            <a href="partner.html" class="d-block" data-i18n="footer.partner">Become a business partner</a>
            <a href="about.html" class="d-block" data-i18n="footer.safeguarding">Safeguarding &amp; how it works</a>
            <a href="moderate.html" class="d-block small text-white-50" data-i18n="footer.moderate">Moderation queue (demo)</a>
            <a href="mailto:hello@cardiffcommunitymeals.example">hello@cardiffcommunitymeals.example</a>
          </div>
        </div>`;
    }
    injectHeroSkyline();
    if (window.I18N) I18N.apply();
  }

  // Fills any ".hero-skyline" placeholder present on the page with the
  // shared skyline SVG. A no-op on pages without a hero (about.html,
  // track.html, moderate.html, etc.) since the selector simply matches
  // nothing there.
  function injectHeroSkyline() {
    document.querySelectorAll(".hero-skyline").forEach(el => {
      el.innerHTML = HERO_SKYLINE_SVG;
    });
  }

  // Scroll-reveal for elements with class="reveal" (skips entirely if the
  // user has requested reduced motion).
  function initScrollReveal() {
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".reveal");
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("reveal-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }

  return {
    CARDIFF_AREAS, SITUATIONS, ROTA_OCCASIONS,
    seedIfEmpty, getRequests, saveRequests, getBusinesses, saveBusinesses,
    getDonations, saveDonations, addRequest, addBusiness, addDonation,
    advanceDonationStatus, mealsFundedFor, requestStatus, statusLabel, situationLabel, occasionLabel,
    businessMealsDelivered, businessTier, impactStats, fmtGBP, fmtDate,
    renderChrome, initScrollReveal, uid,
    getRotas, saveRotas, getRotaSignups, saveRotaSignups, getRotaMessages, saveRotaMessages,
    addRota, findRota, checkRotaCode, rotaDates, addRotaSignup, releaseRotaSignup,
    addRotaMessage, fmtDayDate,
    getComments, saveComments, addComment, approveComment, rejectComment,
    resetCommentToPending, approvedComments, pendingComments, reviewedComments,
  };
})();

// Seed runs immediately (synchronously) — app.js loads before any page's
// own inline render script, so data must exist in localStorage before
// those scripts read it. Scroll-reveal wiring can safely wait for
// DOMContentLoaded since it only needs elements to exist, not data.
CCM.seedIfEmpty();
document.addEventListener("DOMContentLoaded", () => CCM.initScrollReveal());
