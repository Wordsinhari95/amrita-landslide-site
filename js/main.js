/* =========================================================
   Reading the Land — Amrita WCE-LRR Landslide Field Atlas
   Map + scroll-driven storymap behaviour
   ========================================================= */

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------------------------------------------------
   0. CHAPTER COLOUR PALETTE
   --------------------------------------------------------- */
const CHAPTER_COLORS = {
  sikkim:          '#9c1b3f',
  kottayam:        '#2a9d8f',
  wayanad2019:     '#e76f51',
  chooralmala:     '#d62839',
  munnar:          '#6a4c93',
  kodagu:          '#577590',
  uttarakhand:     '#f4a261',
  odisha:          '#43aa8b',
  tirumala:        '#f0b429',
  mizoram:         '#8a5a44',
  arunachal:       '#4361ee',
  assam_meghalaya: '#b5838d'
};
const DEFAULT_COLOR = '#9c1b3f';

function colorFor(chapterId) {
  return CHAPTER_COLORS[chapterId] || DEFAULT_COLOR;
}

function popupHtml(site) {
  const lines = [];
  lines.push(`<b>${site.area || site.code}</b>`);
  lines.push(`${site.district || ''}${site.district ? ', ' : ''}${site.state || ''}`);
  if (site.code) lines.push(`Code: ${site.code}`);
  if (site.type) lines.push(site.type);
  if (site.date) lines.push(site.date);
  return lines.filter(Boolean).join('<br>');
}

/* ---------------------------------------------------------
   1. MAP SETUP (storymap map)
   --------------------------------------------------------- */
const map = L.map('map', {
  scrollWheelZoom: false,
  zoomControl: true
}).setView([22.5, 82.5], 5);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  maxZoom: 18
}).addTo(map);

// re-enable scroll zoom only when the user clicks into the map
map.on('focus', () => map.scrollWheelZoom.enable());
map.on('blur', () => map.scrollWheelZoom.disable());

const markersByCode = {};
const markerLayer = L.layerGroup().addTo(map);

ALL_SITES.forEach(site => {
  if (typeof site.lat !== 'number' || typeof site.lon !== 'number') return;
  const marker = L.circleMarker([site.lat, site.lon], {
    radius: 6,
    weight: 2,
    color: '#fff',
    fillColor: colorFor(site.chapter),
    fillOpacity: 0.9,
    className: 'site-marker'
  }).bindPopup(popupHtml(site));
  marker.addTo(markerLayer);
  markersByCode[site.code] = marker;
});

/* ---------------------------------------------------------
   1b. INDIA OVERVIEW MAP — all sites, colour-coded by chapter
   --------------------------------------------------------- */
const overviewMap = L.map('overview-map', {
  scrollWheelZoom: false,
  zoomControl: true
}).setView([22.5, 82.5], 4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
  maxZoom: 18
}).addTo(overviewMap);

overviewMap.on('focus', () => overviewMap.scrollWheelZoom.enable());
overviewMap.on('blur', () => overviewMap.scrollWheelZoom.disable());

const overviewBounds = [];
ALL_SITES.forEach(site => {
  if (typeof site.lat !== 'number' || typeof site.lon !== 'number') return;
  const marker = L.circleMarker([site.lat, site.lon], {
    radius: 5,
    weight: 1.5,
    color: '#fff',
    fillColor: colorFor(site.chapter),
    fillOpacity: 0.9
  }).bindPopup(popupHtml(site));
  marker.addTo(overviewMap);
  marker.on('click', () => {
    const target = document.getElementById(`chapter-${site.chapter}`);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  overviewBounds.push([site.lat, site.lon]);
});

if (overviewBounds.length) {
  overviewMap.fitBounds(overviewBounds, { padding: [30, 30] });
}

/* ---------------------------------------------------------
   1c. OVERVIEW LEGEND — clickable chapter chips
   --------------------------------------------------------- */
const legendEl = document.getElementById('overview-legend');
CHAPTERS.forEach(chapter => {
  const chip = document.createElement('a');
  chip.className = 'legend-chip';
  chip.href = `#chapter-${chapter.id}`;
  chip.innerHTML = `
    <span class="legend-swatch" style="background:${colorFor(chapter.id)}"></span>
    <span>${chapter.title}</span>
    <span class="legend-count">${chapter.sites.length}</span>
  `;
  legendEl.appendChild(chip);
});

/* ---------------------------------------------------------
   2. RENDER CHAPTERS
   --------------------------------------------------------- */
const content = document.getElementById('content');

function metaGrid(site) {
  const items = [];
  items.push(['Data Code', site.code]);
  if (typeof site.lat === 'number' && typeof site.lon === 'number') {
    items.push(['Coordinates', `${site.lat.toFixed(5)}, ${site.lon.toFixed(5)}`]);
  }
  if (site.type) items.push(['Type of Landslide', site.type]);
  if (site.date) {
    let dt = site.date;
    if (site.time) dt += ` &middot; ${site.time}`;
    items.push(['Date / Time of Event', dt]);
  }
  return `<div class="card-meta">${items.map(([label, value]) => `
    <div class="meta-item">
      <span class="meta-label">${label}</span>
      <span class="meta-value">${value}</span>
    </div>`).join('')}</div>`;
}

function siteCardHtml(site) {
  const area = (site.area || '').trim();
  const note = (site.note || '').trim();
  let photoBlock = '';
  if (site.photo) {
    photoBlock = `<img class="photo" src="${site.photo}" alt="${area}" loading="lazy">`;
    if (site.caption) {
      photoBlock += `<div class="photo-caption">${site.caption}</div>`;
    }
  }
  return `
  <article class="site-card" data-code="${site.code}" data-lat="${site.lat}" data-lon="${site.lon}">
    ${photoBlock}
    <div class="card-body">
      <div class="card-top">
        <h3>${area}</h3>
        <span class="card-code">${site.code}</span>
      </div>
      <div class="card-location">${[site.district, site.state].filter(Boolean).join(', ')}</div>
      ${metaGrid(site)}
      ${note ? `<p class="card-note">${note}</p>` : ''}
    </div>
  </article>`;
}

function siteTableHtml(sites) {
  const rows = sites.map(s => `
    <tr data-code="${s.code}" data-lat="${s.lat}" data-lon="${s.lon}">
      <td>${s.code}</td>
      <td>${(s.area || '').trim()}</td>
      <td>${(s.district || '').trim()}</td>
      <td>${s.type || ''}</td>
      <td>${s.date || '&mdash;'}</td>
    </tr>`).join('');
  return `
  <div class="site-table-wrap">
    <table class="site-table">
      <thead>
        <tr><th>Code</th><th>Area / Locality</th><th>District</th><th>Type of Landslide</th><th>Date</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

CHAPTERS.forEach(chapter => {
  const section = document.createElement('section');
  section.className = 'chapter';
  section.id = `chapter-${chapter.id}`;
  section.dataset.chapterId = chapter.id;
  section.dataset.lat = chapter.center[0];
  section.dataset.lon = chapter.center[1];
  section.dataset.zoom = chapter.zoom;
  section.dataset.title = chapter.title;
  section.dataset.subtitle = chapter.subtitle;

  let teamPhoto = '';
  if (chapter.team_photo) {
    teamPhoto = `<figure class="team-photo">
      <img src="${chapter.team_photo}" alt="Field team — ${chapter.title}">
      <figcaption>WCE-LRR field team during the ${chapter.title} investigation.</figcaption>
    </figure>`;
  }

  const body = chapter.table_only
    ? siteTableHtml(chapter.sites)
    : chapter.sites.map(siteCardHtml).join('');

  section.innerHTML = `
    <div class="chapter-header">
      <span class="chapter-eyebrow">Chapter</span>
      <h2 class="chapter-title">${chapter.title}</h2>
      <p class="chapter-subtitle">${chapter.subtitle}</p>
    </div>
    ${teamPhoto}
    ${body}
  `;

  content.appendChild(section);
});

/* ---------------------------------------------------------
   3. SCROLL-DRIVEN MAP BEHAVIOUR
   --------------------------------------------------------- */
const legendTitle = document.getElementById('legend-title');
const legendSub = document.getElementById('legend-sub');

let activeCard = null;
function setActiveCard(card) {
  if (activeCard === card) return;
  if (activeCard) activeCard.classList.remove('active');
  if (card) card.classList.add('active');
  activeCard = card;
}

let activeRow = null;
function setActiveRow(row) {
  if (activeRow === row) return;
  if (activeRow) activeRow.classList.remove('active');
  if (row) row.classList.add('active');
  activeRow = row;
}

function flyToSite(lat, lon, zoom, code) {
  map.flyTo([lat, lon], zoom || 12, { duration: 0.9 });
  if (code && markersByCode[code]) {
    markersByCode[code].openPopup();
  }
}

// Chapter-level observer: updates legend + base map view
const chapterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      legendTitle.textContent = el.dataset.title;
      const count = el.querySelectorAll('.site-card, .site-table tbody tr').length;
      legendSub.textContent = `${count} site${count === 1 ? '' : 's'} in this chapter`;
      map.flyTo([parseFloat(el.dataset.lat), parseFloat(el.dataset.lon)], parseInt(el.dataset.zoom, 10), { duration: 1.1 });
      map.closePopup();
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

document.querySelectorAll('.chapter').forEach(el => chapterObserver.observe(el));

// Site-card level observer: zooms in further and opens popup
const cardObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const lat = parseFloat(card.dataset.lat);
      const lon = parseFloat(card.dataset.lon);
      if (!isNaN(lat) && !isNaN(lon)) {
        flyToSite(lat, lon, 13, card.dataset.code);
      }
      setActiveCard(card);
    }
  });
}, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

document.querySelectorAll('.site-card').forEach(el => cardObserver.observe(el));

// Table rows: click to fly + highlight
document.querySelectorAll('.site-table tbody tr').forEach(row => {
  row.addEventListener('click', () => {
    const lat = parseFloat(row.dataset.lat);
    const lon = parseFloat(row.dataset.lon);
    if (!isNaN(lat) && !isNaN(lon)) {
      flyToSite(lat, lon, 12, row.dataset.code);
      setActiveRow(row);
    }
  });
});

// Marker click: highlight corresponding card if present
Object.entries(markersByCode).forEach(([code, marker]) => {
  marker.on('click', () => {
    const card = document.querySelector(`.site-card[data-code="${code}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// Fix Leaflet rendering after layout settles
window.addEventListener('load', () => setTimeout(() => {
  map.invalidateSize();
  overviewMap.invalidateSize();
  if (overviewBounds.length) overviewMap.fitBounds(overviewBounds, { padding: [30, 30] });
}, 300));
