/* =========================================================
   Reading the Land — single-page orchestration
   Sections: hero → overview (choropleth) → sites → about
   ========================================================= */

document.getElementById('year').textContent = new Date().getFullYear();

/* ─────────────────────────────────────────────────────────
   COLOUR HELPERS
   ───────────────────────────────────────────────────────── */
function densityColor(n) {
  if (!n || n === 0) return '#ebe6e0';
  if (n <= 2)        return '#f5c0cb';
  if (n <= 6)        return '#d46080';
  if (n <= 12)       return '#a8284e';
  return '#6e1430';
}

const LEGEND_ROWS = [
  { label: 'Not investigated', color: '#ebe6e0' },
  { label: '1–2 sites',        color: '#f5c0cb' },
  { label: '3–6 sites',        color: '#d46080' },
  { label: '7–12 sites',       color: '#a8284e' },
  { label: '13+ sites',        color: '#6e1430' },
];

/* ─────────────────────────────────────────────────────────
   1. CHOROPLETH MAP
   ───────────────────────────────────────────────────────── */
const choroplethMap = L.map('choropleth-map', {
  scrollWheelZoom: false,
  zoomControl: true,
}).setView([22.5, 82.5], 4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors ' +
    '&copy; <a href="https://carto.com/">CARTO</a>',
  maxZoom: 18,
}).addTo(choroplethMap);

choroplethMap.on('focus', () => choroplethMap.scrollWheelZoom.enable());
choroplethMap.on('blur',  () => choroplethMap.scrollWheelZoom.disable());

/* Legend */
const legendCtrl = L.control({ position: 'bottomright' });
legendCtrl.onAdd = () => {
  const div = L.DomUtil.create('div', 'choropleth-legend');
  div.innerHTML =
    '<b>Site density</b>' +
    LEGEND_ROWS.map(r =>
      `<div class="leg-row"><span class="leg-sw" style="background:${r.color}"></span>${r.label}</div>`
    ).join('');
  return div;
};
legendCtrl.addTo(choroplethMap);

/* GeoJSON styles */
function baseStyle(cid) {
  const n = cid && STATE_RESEARCH[cid] ? STATE_RESEARCH[cid].siteCount : 0;
  return { fillColor: densityColor(n), fillOpacity: n ? 0.82 : 0.50, color: '#ffffff', weight: 0.8 };
}
function hoverStyle(cid) {
  const n = cid && STATE_RESEARCH[cid] ? STATE_RESEARCH[cid].siteCount : 0;
  return { fillColor: densityColor(n), fillOpacity: n ? 0.95 : 0.72, color: '#9c1b3f', weight: 2.2 };
}

let activeGeoLayer = null;

L.geoJSON(INDIA_STATES_GEO, {
  style(feature) {
    return baseStyle(GEO_NAME_TO_CHAPTER[feature.properties.NAME_1 || ''] || null);
  },
  onEachFeature(feature, layer) {
    const rawName = feature.properties.NAME_1 || '';
    const cid     = GEO_NAME_TO_CHAPTER[rawName] || null;
    const info    = cid ? STATE_RESEARCH[cid] : null;
    const tip     = info
      ? `<b>${rawName}</b><br>${info.siteCount} site${info.siteCount !== 1 ? 's' : ''} documented`
      : `<b>${rawName}</b><br><i>Not investigated</i>`;

    layer.bindTooltip(tip, { sticky: true, className: 'state-tooltip' });

    layer.on({
      mouseover(e) {
        if (e.target !== activeGeoLayer) e.target.setStyle(hoverStyle(cid));
        e.target.bringToFront();
      },
      mouseout(e) {
        if (e.target !== activeGeoLayer) e.target.setStyle(baseStyle(cid));
      },
      click(e) {
        if (activeGeoLayer && activeGeoLayer !== e.target) {
          const prev = activeGeoLayer.feature.properties.NAME_1 || '';
          activeGeoLayer.setStyle(baseStyle(GEO_NAME_TO_CHAPTER[prev] || null));
        }
        activeGeoLayer = e.target;
        e.target.setStyle(hoverStyle(cid));
        handleStateSelect(rawName, cid, info);
      },
    });
  },
}).addTo(choroplethMap);

window.addEventListener('load', () => setTimeout(() => choroplethMap.invalidateSize(), 300));

/* ─────────────────────────────────────────────────────────
   2. STATE PANEL  (immediately below choropleth)
   ───────────────────────────────────────────────────────── */
const statePanel     = document.getElementById('state-panel');
const statePanelBody = document.getElementById('state-panel-body');

function handleStateSelect(rawName, cid, info) {
  if (info) {
    renderPanel(info);
    populateSites(info);
    enableSitesNav(true);
  } else {
    renderPanelEmpty(rawName);
    enableSitesNav(false);
  }
}

function renderPanelEmpty(name) {
  statePanelBody.innerHTML = `
    <div class="panel-hd">
      <div class="panel-count" style="color:#ccc">&mdash;</div>
      <div>
        <h3 class="panel-title">${name}</h3>
        <p class="panel-sub">No sites investigated in this atlas.</p>
      </div>
    </div>`;
  openPanel();
}

function renderPanel(info) {
  const color = densityColor(info.siteCount);

  const typeRows  = info.typeBreakdown.map(t =>
    `<li><span class="type-dot" style="background:${color}"></span>${t.label}<span class="type-ct">&times;${t.count}</span></li>`
  ).join('');
  const causeItems = info.causative.map(c  => `<li>${c}</li>`).join('');
  const trigItems  = info.triggering.map(t => `<li>${t}</li>`).join('');
  const refLine    = info.references.map(r => `<cite>${r}</cite>`).join(' &middot; ');

  statePanelBody.innerHTML = `
    <div class="panel-hd" style="border-left:5px solid ${color}">
      <div class="panel-count" style="color:${color}">${info.siteCount}</div>
      <div>
        <h3 class="panel-title">${info.displayName}</h3>
        <p class="panel-sub">${info.subtitle}</p>
      </div>
    </div>

    <div class="panel-grid">
      <div class="panel-col">
        <h4 class="panel-sh">Landslide Types</h4>
        <ul class="panel-types">${typeRows}</ul>
        <h4 class="panel-sh" style="margin-top:1.4em">Geological Setting</h4>
        <p class="panel-body">${info.geology}</p>
      </div>
      <div class="panel-col">
        <h4 class="panel-sh">Causative Factors</h4>
        <ul class="panel-factors">${causeItems}</ul>
        <h4 class="panel-sh" style="margin-top:1.4em">Triggering Factors</h4>
        <ul class="panel-factors">${trigItems}</ul>
      </div>
    </div>

    <div class="panel-footer">
      <button class="btn-panel-cta" onclick="goToSites()">
        View ${info.siteCount} site${info.siteCount !== 1 ? 's' : ''} in detail &#x2193;
      </button>
      <p class="panel-refs">${refLine}</p>
    </div>`;

  openPanel();
}

function openPanel() {
  statePanel.hidden = false;
  setTimeout(() => statePanel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}

function goToSites() {
  document.getElementById('sites').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
window.goToSites = goToSites;

/* ─────────────────────────────────────────────────────────
   3. SITES SECTION
   ───────────────────────────────────────────────────────── */
let sitesMap      = null;
const siteMarkers = {};

function initSitesMap() {
  if (sitesMap) return;
  sitesMap = L.map('site-map', { scrollWheelZoom: false, zoomControl: true });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    maxZoom: 18,
  }).addTo(sitesMap);
  sitesMap.on('focus', () => sitesMap.scrollWheelZoom.enable());
  sitesMap.on('blur',  () => sitesMap.scrollWheelZoom.disable());
}

function populateSites(info) {
  const chapters   = CHAPTERS.filter(c => info.allChapters.includes(c.id));
  const allSites   = chapters.flatMap(c => c.sites);
  const validSites = allSites.filter(s => typeof s.lat === 'number' && typeof s.lon === 'number');
  const color      = densityColor(info.siteCount);

  document.getElementById('sites-empty').hidden   = true;
  document.getElementById('sites-content').hidden = false;

  /* ── Hero strip ── */
  document.getElementById('sites-hero').innerHTML = `
    <div class="sites-hero-inner" style="background:linear-gradient(135deg,${color}f0 0%,${color}88 100%)">
      <p class="sh-kicker">Field Sites</p>
      <h2 class="sh-name">${info.displayName}</h2>
      <p class="sh-sub">${info.subtitle}</p>
    </div>`;

  /* ── Quick stats ── */
  const typeCount = {};
  allSites.forEach(s => { if (s.type) typeCount[s.type] = (typeCount[s.type] || 0) + 1; });
  const topTypes  = Object.entries(typeCount).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const districts = [...new Set(allSites.map(s => s.district).filter(Boolean))];

  document.getElementById('sites-stats').innerHTML = `
    <div class="ss-item">
      <span class="ss-num" style="color:${color}">${allSites.length}</span>
      <span class="ss-lbl">Sites</span>
    </div>
    <span class="ss-sep"></span>
    <div class="ss-item">
      <span class="ss-num" style="color:${color}">${chapters.length}</span>
      <span class="ss-lbl">Chapter${chapters.length > 1 ? 's' : ''}</span>
    </div>
    <span class="ss-sep"></span>
    <div class="ss-item">
      <span class="ss-num" style="color:${color}">${districts.length}</span>
      <span class="ss-lbl">District${districts.length !== 1 ? 's' : ''}</span>
    </div>
    <span class="ss-sep"></span>
    <div class="ss-item ss-types">
      <span class="ss-lbl">Top failure types</span>
      <div class="ss-chips">${topTypes.map(([t]) => `<span class="type-chip">${t}</span>`).join('')}</div>
    </div>`;

  /* ── Sites map ── */
  initSitesMap();

  Object.values(siteMarkers).forEach(m => sitesMap.removeLayer(m));
  Object.keys(siteMarkers).forEach(k => delete siteMarkers[k]);

  const bounds = [];
  validSites.forEach(site => {
    const ll = [site.lat, site.lon];
    bounds.push(ll);
    const m = L.circleMarker(ll, {
      radius: 7, color: '#fff', weight: 2,
      fillColor: color, fillOpacity: 0.9,
    }).addTo(sitesMap);
    m.bindPopup(`<b>${(site.area || '').trim()}</b><br>${site.code} &mdash; ${site.type || ''}`);
    m.on('click', () => {
      const card = document.querySelector(`.site-card[data-code="${site.code}"]`);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    siteMarkers[site.code] = m;
  });

  if (bounds.length) sitesMap.fitBounds(bounds, { padding: [40, 40] });
  setTimeout(() => sitesMap.invalidateSize(), 200);

  /* ── Research context ── */
  const causeHtml = info.causative.map(c  => `<li>${c}</li>`).join('');
  const trigHtml  = info.triggering.map(t => `<li>${t}</li>`).join('');

  document.getElementById('sites-context').innerHTML = `
    <div class="ctx-block">
      <h4 class="ctx-sh">Geological Setting</h4>
      <p class="ctx-body">${info.geology}</p>
    </div>
    <div class="ctx-block">
      <h4 class="ctx-sh">Causative Factors</h4>
      <ul class="ctx-list">${causeHtml}</ul>
    </div>
    <div class="ctx-block">
      <h4 class="ctx-sh">Triggering Factors</h4>
      <ul class="ctx-list">${trigHtml}</ul>
    </div>`;

  /* ── Site cards ── */
  document.getElementById('inventory-title').textContent =
    `${allSites.length} Sites — ${info.displayName}`;

  const grid = document.getElementById('site-cards');
  grid.innerHTML = '';

  allSites.forEach(site => {
    const area = (site.area || '').trim();
    const card = document.createElement('article');
    card.className    = 'site-card';
    card.dataset.code = site.code;
    card.innerHTML = `
      ${site.photo === 'placeholder'
        ? `<div class="sc-img-wrap sc-img-placeholder">
             <div class="sc-placeholder-inner"><span class="sc-placeholder-icon">&#x1F4F7;</span><span class="sc-placeholder-txt">Field photograph pending</span></div>
           </div>`
        : site.photo
          ? `<div class="sc-img-wrap">
               <img class="sc-img" src="${site.photo}" alt="${area}" loading="lazy">
               ${site.caption ? `<p class="sc-caption">${site.caption}</p>` : ''}
             </div>`
          : ''}
      <div class="sc-body">
        <div class="sc-head">
          <div>
            <h4 class="sc-name">${area || site.code}</h4>
            <p class="sc-loc">${[site.district, site.state].filter(Boolean).join(', ')}</p>
          </div>
          <span class="sc-code" style="background:${color}1a;color:${color}">${site.code}</span>
        </div>
        <dl class="sc-dl">
          ${site.type ? `<div class="sc-row"><dt>Type</dt><dd>${site.type}</dd></div>` : ''}
          ${site.date ? `<div class="sc-row"><dt>Date</dt><dd>${site.date}${site.time ? ' &middot; ' + site.time : ''}</dd></div>` : ''}
          ${typeof site.lat === 'number'
            ? `<div class="sc-row"><dt>Coords</dt><dd>
                <a class="sc-coords" href="https://maps.google.com/?q=${site.lat},${site.lon}"
                   target="_blank" rel="noopener">${site.lat.toFixed(5)}, ${site.lon.toFixed(5)} &#x2197;</a>
               </dd></div>`
            : ''}
        </dl>
        ${site.note ? `<p class="sc-note">${site.note}</p>` : ''}
        ${typeof site.lat === 'number'
          ? `<button class="btn-show-map"
                     data-code="${site.code}"
                     data-lat="${site.lat}"
                     data-lon="${site.lon}">Show on map &#x2191;</button>`
          : ''}
      </div>`;
    grid.appendChild(card);
  });

  /* ── References ── */
  document.getElementById('sites-refs').innerHTML = `
    <div class="refs-inner">
      <h4 class="refs-hd">Key References</h4>
      <ol class="refs-list">${info.references.map(r => `<li>${r}</li>`).join('')}</ol>
    </div>`;
}

/* Delegated: "Show on map" button inside a site card */
document.getElementById('site-cards').addEventListener('click', e => {
  const btn = e.target.closest('.btn-show-map');
  if (!btn || !sitesMap) return;
  const lat  = parseFloat(btn.dataset.lat);
  const lon  = parseFloat(btn.dataset.lon);
  const code = btn.dataset.code;
  if (!isNaN(lat)) {
    sitesMap.flyTo([lat, lon], 13, { duration: 0.8 });
    if (siteMarkers[code]) siteMarkers[code].openPopup();
    document.getElementById('site-map').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ─────────────────────────────────────────────────────────
   4. NAVIGATION STATE
   ───────────────────────────────────────────────────────── */
function enableSitesNav(on) {
  document.querySelector('.nav-sites').classList.toggle('nav-disabled', !on);
}

/* Sites nav click while disabled → redirect to map */
document.querySelector('.nav-sites').addEventListener('click', e => {
  if (e.currentTarget.classList.contains('nav-disabled')) {
    e.preventDefault();
    document.getElementById('overview').scrollIntoView({ behavior: 'smooth' });
  }
});

/* Scroll-based active highlight */
const navLinks = document.querySelectorAll('.nav-link[data-sec]');
const secObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => a.classList.toggle('nav-active', a.dataset.sec === id));
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

['overview', 'sites', 'about'].forEach(id => {
  const el = document.getElementById(id);
  if (el) secObserver.observe(el);
});
