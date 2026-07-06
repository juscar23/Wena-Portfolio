/* ======================================================================
   📸 YOUR PHOTOS GO HERE
   ======================================================================
   Sample placeholder photos are already sitting in the /photos folder
   (named 01.jpg – 10.jpg) so this page works the moment you open it.

   TO USE YOUR OWN PHOTOS:
   1. Drop your image files into the /photos folder next to this file
      (overwrite the sample ones, or use new filenames).
   2. Change "src" below to match your filename, e.g. "photos/sunset.jpg"
   3. Fill in title / loc (location) / year — these show in the caption.
   4. Add or delete lines to add or remove photos — the order here is
      the order they play in.

   You can also point "src" at an image already hosted online, e.g.:
      src: "https://yoursite.com/images/sunset.jpg"

   Recommended photo size: at least 1600px wide, landscape orientation,
   for the sharpest look on the main stage.
   ====================================================================== */

const slides = [
  { src: "photos/1.jpg", title: "Calyx Residences", loc: "Cebu, PH",        year: 2026 },
  { src: "photos/2.jpg", title: "Talisay, Tower Restaurant",           loc: "Cebu, PH",         year: 2026 },
  { src: "photos/3.jpg", title: "I forgot lol",            loc: "Cebu, PH",           year: 2026 },
  { src: "photos/4.jpg", title: "Calyx Residences",                loc: "Cebu, PH",            year: 2026 },
  { src: "photos/5.jpg", title: "Kate balay",             loc: "Cebu, PH",          year: 2026 },
  { src: "photos/6.jpg", title: "Somewhere North Cebu",         loc: "Cebu, PH",       year: 2021 },
  { src: "photos/7.jpg", title: "Bantayan Dinner",              loc: "Cebu, PH",  year: 2022 },
  { src: "photos/8.jpg", title: "Talisay Tower",              loc: "Cebu, PH",          year: 2026 },
  { src: "photos/9.jpg", title: "Oslob",             loc: "Cebu, PH",         year: 2026 },
  { src: "photos/10.jpg", title: "Oslob Blvrd",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/11.jpg", title: "Oslob Blvrd",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/12.jpg", title: "Oslob Blvrd",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/13.jpg", title: "Oslob Blvrd",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/14.jpg", title: "Somewhere Oslob",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/15.jpg", title: "Oslob Gihapon",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/16.jpg", title: "Tumalog Falls",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/17.jpg", title: "Entrance Tumalog Falls",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/18.jpg", title: "Somilon Islands",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/19.jpg", title: "Somilon Islands",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/20.jpg", title: "Whale Watching, Oslob",                loc: "Cebu, PH",              year: 2026 },
  { src: "photos/21.jpg", title: "Yukga",                loc: "Cebu, PH",              year: 2026 },

];

/* ======================================================================
   ⚙️  EVERYTHING BELOW THIS LINE RUNS THE SLIDESHOW.
   You shouldn't need to touch it — but feel free to explore!
   ====================================================================== */

const DURATION = 5000; // ms each slide stays on screen during autoplay

const stage = document.getElementById('stage');
const imgA = document.getElementById('imgA');
const imgB = document.getElementById('imgB');
const capTitle = document.getElementById('capTitle');
const capLoc = document.getElementById('capLoc');
const frameTag = document.getElementById('frameTag');
const curNum = document.getElementById('curNum');
const totNum = document.getElementById('totNum');
const thumbTrack = document.getElementById('thumbTrack');
const progressFill = document.getElementById('progressFill');
const playToggle = document.getElementById('playToggle');
const playIcon = document.getElementById('playIcon');
const favBtn = document.getElementById('favBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let current = 0;
let playing = true;
let timer = null;
let activeImg = imgA;
let inactiveImg = imgB;
const favorites = new Set();

totNum.textContent = String(slides.length).padStart(2, '0');

function buildThumbs(){
  slides.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.className = 'thumb' + (i === 0 ? ' active' : '');
    btn.setAttribute('aria-label', `Go to photo ${i+1}: ${s.title}`);
    btn.innerHTML = `<img src="${s.src}" alt="" loading="lazy"><span class="tnum">${String(i+1).padStart(2,'0')}</span>`;
    btn.addEventListener('click', () => go(i, true));
    thumbTrack.appendChild(btn);
  });
}

function updateThumbs(){
  [...thumbTrack.children].forEach((el, i) => {
    el.classList.toggle('active', i === current);
    if (i === current) el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  });
}

function updateFavIcon(){
  const isFav = favorites.has(current);
  favBtn.classList.toggle('is-fav', isFav);
  favBtn.setAttribute('aria-pressed', String(isFav));
}

function restartProgress(){
  progressFill.classList.remove('run');
  progressFill.style.width = '0%';
  void progressFill.offsetWidth; // reflow to restart animation
  progressFill.style.setProperty('--dur', DURATION + 'ms');
  progressFill.classList.add('run');
  progressFill.classList.toggle('paused', !playing);
}

function showSlide(index){
  const s = slides[index];
  inactiveImg.src = s.src;
  inactiveImg.alt = `${s.title} — ${s.loc}`;
  requestAnimationFrame(() => {
    activeImg.classList.remove('active');
    inactiveImg.classList.add('active');
    const tmp = activeImg; activeImg = inactiveImg; inactiveImg = tmp;
  });

  capTitle.textContent = s.title;
  capLoc.innerHTML = `${s.loc} <span class="dot">●</span> ${s.year}`;
  frameTag.textContent = 'FR. ' + String(index+1).padStart(2,'0');
  curNum.textContent = String(index+1).padStart(2,'0');

  updateThumbs();
  updateFavIcon();
  restartProgress();
}

function go(index, userInitiated){
  current = (index + slides.length) % slides.length;
  showSlide(current);
  if (userInitiated) resetTimer();
}

function next(){ go(current + 1); }
function prev(){ go(current - 1); }

function resetTimer(){
  clearInterval(timer);
  if (playing) timer = setInterval(next, DURATION);
}

function setPlaying(state){
  playing = state;
  playToggle.setAttribute('aria-pressed', String(playing));
  playToggle.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
  playIcon.innerHTML = playing
    ? '<rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/>'
    : '<path d="M7 5l12 7-12 7V5z"/>';
  progressFill.classList.toggle('paused', !playing);
  resetTimer();
}

playToggle.addEventListener('click', () => setPlaying(!playing));
nextBtn.addEventListener('click', () => go(current + 1, true));
prevBtn.addEventListener('click', () => go(current - 1, true));

favBtn.addEventListener('click', () => {
  if (favorites.has(current)) favorites.delete(current);
  else favorites.add(current);
  updateFavIcon();
  favBtn.classList.remove('pop');
  void favBtn.offsetWidth;
  favBtn.classList.add('pop');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight'){ go(current + 1, true); }
  else if (e.key === 'ArrowLeft'){ go(current - 1, true); }
  else if (e.code === 'Space'){ e.preventDefault(); setPlaying(!playing); }
});

// pause on hover, resume on leave
stage.addEventListener('mouseenter', () => { clearInterval(timer); progressFill.classList.add('paused'); });
stage.addEventListener('mouseleave', () => { if (playing){ resetTimer(); progressFill.classList.remove('paused'); } });

// basic touch swipe
let touchX = null;
stage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
stage.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) dx < 0 ? go(current + 1, true) : go(current - 1, true);
  touchX = null;
}, { passive: true });

// init
buildThumbs();
imgA.src = slides[0].src;
imgA.alt = `${slides[0].title} — ${slides[0].loc}`;
updateFavIcon();
restartProgress();
resetTimer();
