/**
 * Ashok ❤️ Hemalatha - The Ultimate 3-Stage Anniversary Surprise
 * 
 * WEDDING DATE: 26 NOVEMBER 2025
 * 
 * Architecture:
 * - STAGE 1: The Mystery Gift (3D unboxing animation, emotional welcome, "LET'S CONTINUE ❤️")
 * - STAGE 2: The Memory Adventure
 *    - Part A: 3 Memory Mystery Boxes (Beautiful Moments, Sweet Memories, Forever Together)
 *    - Part B: Interactive Photo Puzzle Game (3x3 grid drag/click/touch to swap & solve with real photo)
 *    - Part C: Secret Love Message with animated wax envelope & "UNLOCK THE FINAL SURPRISE"
 * - STAGE 3: The Grand Celebration
 *    - Part A: Grand Entrance with opening golden curtains, rose petals, real couple portrait & Days-Together Counter
 *    - Part B: High-performance Canvas Fireworks Show ("LET'S CELEBRATE OUR LOVE!")
 *    - Part C: Exact Grand Greeting: "HAPPY ANNIVERSARY DAY ANNA VADINA ❤️" + "26 NOVEMBER 2025"
 *    - Part D: "ONE LAST SURPRISE ❤️" modal with golden fireworks & "ANNA & VADINA — TOGETHER FOREVER! ❤️"
 * - Progress Indicator (Stage 1, 2, 3), Session storage persistence, Skip animation option, and Music Controls.
 */

const ANNIVERSARY_DATA = {
  couple: {
    husband: "Ashok",
    wife: "Hemalatha",
    title: "Ashok ❤️ Hemalatha",
    date: "26 November 2025",
    anniversaryMessage: "Happy Wedding Anniversary, Ashok & Hemalatha!",
    subGreeting: "Celebrating Two Hearts, One Beautiful Journey",
    brotherNote: "With lots of love, Your Brother ❤️",
    puzzlePhoto: "images/photo-2.jpg",
    grandPhoto: "images/photo-1.jpg",
    stage1Photo: "images/photo-3.jpg"
  },

  // 9 Real Uploaded Photos split into 3 Memory Boxes
  memoryBoxes: {
    box1: {
      title: "Beautiful Moments",
      icon: "✨",
      desc: "Capturing everyday magic, laughter, and serene travels.",
      photos: [
        { src: "images/photo-2.jpg", title: "Sunset by Lake Pichola", desc: "A quiet moment of serene love by the royal waters." },
        { src: "images/photo-6.jpg", title: "Temple Path Walks", desc: "Walking side-by-side with genuine joy and devotion." },
        { src: "images/photo-7.jpg", title: "Ancient Heritage Smiles", desc: "Creating everlasting memories amidst historic pillars." }
      ]
    },
    box2: {
      title: "Sweet Memories",
      icon: "💖",
      desc: "Warm smiles, cheerful celebrations, and unforgettable sunshine.",
      photos: [
        { src: "images/photo-3.jpg", title: "Festive Sunshine & Canopies", desc: "Dressed in cheerful hues and welcomed with elder blessings." },
        { src: "images/photo-8.jpg", title: "Historic Sanctuaries", desc: "Exploring ancient architectural wonders hand-in-hand." },
        { src: "images/photo-9.jpg", title: "Radiant Harmony & Elegance", desc: "Looking at each other with pure warmth and affection." }
      ]
    },
    box3: {
      title: "Forever Together",
      icon: "💍",
      desc: "Sacred promises, floral garlands, and an unbreakable eternal bond.",
      photos: [
        { src: "images/photo-4.jpg", title: "The Sacred Garland Exchange", desc: "The divine moment of sacred vows and lifelong commitment." },
        { src: "images/photo-5.jpg", title: "Blessed Wedding Rituals", desc: "Surrounded by holy mantras, floral fragrance, and family love." },
        { src: "images/photo-1.jpg", title: "Timeless Grace & Togetherness", desc: "United as one soul, stepping forward into a lifetime of happiness." }
      ]
    }
  },

  // Timeline
  timeline: [
    {
      date: "26 November 2025",
      title: "Our Sacred Wedding Day",
      description: "Ashok Anna and Hemalatha Vadina stepped into sacred matrimony, blessed by family, surrounded by flowers, and bound by timeless vows.",
      photo: "images/photo-4.jpg"
    },
    {
      date: "Golden Moments",
      title: "Royal Travels & Evening Glow",
      description: "Quiet evenings by the water, sharing thoughts and building dreams together.",
      photo: "images/photo-2.jpg"
    },
    {
      date: "Festive Joy",
      title: "Festivals, Laughter & Heritage",
      description: "Exploring sanctuaries, laughing under floral canopies, and creating unforgettable memories.",
      photo: "images/photo-7.jpg"
    },
    {
      date: "Forever & Always",
      title: "Our Journey of Infinite Love",
      description: "May your bond continue to blossom brighter every single day, blessed with prosperity and joy.",
      photo: "images/photo-1.jpg"
    }
  ],

  // Stage 1 Welcome Message
  stage1Message: "Some moments are special, some people are precious, and some love stories are simply magical. Today, this little surprise is specially created for two wonderful people!",

  // Stage 2 Secret Love Letter Message
  stage2Letter: `Dear Anna & Vadina,

May your smiles never fade, may your love continue to grow, and may every new day bring another reason to celebrate each other.

You both deserve all the happiness in the world. Keep laughing, keep loving and keep creating beautiful memories together.

With lots of love ❤️`,

  // Stage 3 Final Blessing
  stage3Blessing: `May your journey together always be filled with endless love, beautiful memories, unlimited laughter and countless reasons to smile.

May you both continue to hold hands, support each other and create a lifetime of happiness.

Your love story is beautiful, and the best chapters are still waiting to be written.

LOTS OF LOVE TO YOU BOTH! ❤️`
};

/* ==========================================================================
   DAYS TOGETHER COUNTER CALCULATOR (From 26 November 2025 to today)
   ========================================================================== */
function calculateDaysTogether() {
  const weddingDate = new Date(2025, 10, 26); // Month index 10 = November, 26 Nov 2025
  const today = new Date();
  
  // Set both to midnight to count full calendar days
  const start = new Date(weddingDate.getFullYear(), weddingDate.getMonth(), weddingDate.getDate());
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const diffTime = now - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 0) {
    return { days: 0, text: "The Beginning of Our Forever ✨" };
  } else if (diffDays === 1) {
    return { days: 1, text: "1 Beautiful Day Together ❤️" };
  } else {
    return { days: diffDays, text: `${diffDays} Beautiful Days of Togetherness & Love 💖` };
  }
}
let currentStage = parseInt(sessionStorage.getItem('anniv_stage') || '1');
let unlockedStages = JSON.parse(sessionStorage.getItem('anniv_unlocked') || '[1]');
let isMusicPlaying = false;
let audioContext = null;
let melodyInterval = null;
let activeBoxKey = null;
let currentLightboxPhotos = [];
let currentLightboxIdx = 0;

function setStage(stageNum) {
  currentStage = stageNum;
  if (!unlockedStages.includes(stageNum)) {
    unlockedStages.push(stageNum);
    sessionStorage.setItem('anniv_unlocked', JSON.stringify(unlockedStages));
  }
  sessionStorage.setItem('anniv_stage', stageNum.toString());
  renderStages();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   ROMANTIC AUDIO SYNTHESIZER
   ========================================================================== */
function createRomanticAudio() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  const ctx = new AudioContext();
  
  const chordNotes = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00]  // G
  ];
  let chordIdx = 0;
  
  function playNote(freq, time, duration = 2.8) {
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.linearRampToValueAtTime(0.045, time + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + duration);
  }

  function playArpeggio() {
    const chord = chordNotes[chordIdx % chordNotes.length];
    const now = ctx.currentTime;
    chord.forEach((freq, i) => {
      playNote(freq, now + i * 0.45, 3.5);
    });
    playNote(chord[1] * 2, now + 1.8, 2.2);
    chordIdx++;
  }

  return { ctx, playArpeggio };
}

function toggleMusic() {
  const bgAudio = document.getElementById('bgAudio');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicLabel = document.getElementById('musicLabel');

  if (!isMusicPlaying) {
    const playPromise = bgAudio ? bgAudio.play() : Promise.reject();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isMusicPlaying = true;
        if (musicToggleBtn) musicToggleBtn.classList.add('playing');
        if (musicLabel) musicLabel.innerText = "Music Playing 💖";
      }).catch(() => {
        if (!window.romanticSynth) {
          window.romanticSynth = createRomanticAudio();
        }
        if (window.romanticSynth) {
          window.romanticSynth.playArpeggio();
          melodyInterval = setInterval(() => {
            window.romanticSynth.playArpeggio();
          }, 3200);
        }
        isMusicPlaying = true;
        if (musicToggleBtn) musicToggleBtn.classList.add('playing');
        if (musicLabel) musicLabel.innerText = "Music Playing 💖";
      });
    }
  } else {
    if (bgAudio) bgAudio.pause();
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
    isMusicPlaying = false;
    if (musicToggleBtn) musicToggleBtn.classList.remove('playing');
    if (musicLabel) musicLabel.innerText = "Play Music 🎵";
  }
}

// Background Floating Hearts and Rose Petals
function spawnFloatingHearts() {
  const container = document.getElementById('floating-elements');
  if (!container) return;
  const floralIcons = ['🌸', '🌹', '💖', '✨', '💕', '🌷', '🤍', '🌺'];
  
  setInterval(() => {
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.innerText = floralIcons[Math.floor(Math.random() * floralIcons.length)];
    el.style.left = Math.random() * 95 + '%';
    el.style.fontSize = (Math.random() * 18 + 14) + 'px';
    el.style.animationDuration = (Math.random() * 6 + 10) + 's';
    el.style.opacity = (Math.random() * 0.5 + 0.45).toString();
    container.appendChild(el);
    setTimeout(() => el.remove(), 16000);
  }, 850);
}

// Confetti & Rose Petal Bursts
function burstRomanticConfetti(originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
  const icons = ['🌸', '🌹', '💖', '✨', '⭐', '🌺', '💕'];
  for (let i = 0; i < 45; i++) {
    const petal = document.createElement('div');
    petal.innerText = icons[Math.floor(Math.random() * icons.length)];
    petal.style.position = 'fixed';
    petal.style.left = originX + 'px';
    petal.style.top = originY + 'px';
    petal.style.zIndex = '9999';
    petal.style.pointerEvents = 'none';
    petal.style.fontSize = Math.floor(Math.random() * 22 + 16) + 'px';
    petal.style.transition = 'all 1.4s cubic-bezier(0.25, 1, 0.5, 1)';
    
    document.body.appendChild(petal);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 260 + 80;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;
    
    requestAnimationFrame(() => {
      petal.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 360}deg) scale(0)`;
      petal.style.opacity = '0';
    });
    
    setTimeout(() => petal.remove(), 1500);
  }
}

/* ==========================================================================
   CANVAS FIREWORKS CELEBRATION (Pink, Gold, Heart Sparkles)
   ========================================================================== */
function triggerFireworks() {
  const canvas = document.getElementById('fireworksCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  burstRomanticConfetti();
  setTimeout(burstRomanticConfetti, 400);
  setTimeout(burstRomanticConfetti, 800);

  const particles = [];
  const colors = ['#f7a8b8', '#d4af37', '#ffccd5', '#ffffff', '#e63946', '#ffd700', '#ff69b4'];

  function createFirework(x, y) {
    const count = 75;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * 6 + 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3.5 + 1.5,
        decay: Math.random() * 0.018 + 0.012
      });
    }
  }

  createFirework(window.innerWidth * 0.25, window.innerHeight * 0.35);
  createFirework(window.innerWidth * 0.5, window.innerHeight * 0.25);
  createFirework(window.innerWidth * 0.75, window.innerHeight * 0.35);

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (frame % 28 === 0 && frame < 180) {
      createFirework(
        Math.random() * (canvas.width * 0.8) + canvas.width * 0.1,
        Math.random() * (canvas.height * 0.5) + canvas.height * 0.15
      );
    }
    
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    frame++;
    if (frame < 260 || particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
    }
  }
  animate();
}

/* ==========================================================================
   STAGE 2 PART B: INTERACTIVE PHOTO PUZZLE GAME
   ========================================================================== */
let puzzlePieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let selectedPieceIdx = null;

function renderPuzzle() {
  const container = document.getElementById('puzzleBoard');
  if (!container) return;
  container.innerHTML = '';

  let isSolved = puzzlePieces.every((val, idx) => val === idx);

  puzzlePieces.forEach((pieceId, currentPosition) => {
    const tile = document.createElement('div');
    tile.className = `puzzle-tile ${selectedPieceIdx === currentPosition ? 'selected' : ''}`;
    
    // 3x3 background position mapping (col: pieceId % 3, row: Math.floor(pieceId / 3))
    const col = pieceId % 3;
    const row = Math.floor(pieceId / 3);
    tile.style.backgroundImage = `url('${ANNIVERSARY_DATA.couple.puzzlePhoto}')`;
    tile.style.backgroundPosition = `${col * 50}% ${row * 50}%`;
    tile.style.backgroundSize = '300% 300%';

    // Click / Touch to swap
    tile.onclick = () => {
      if (selectedPieceIdx === null) {
        selectedPieceIdx = currentPosition;
        renderPuzzle();
      } else {
        // Swap pieces
        const temp = puzzlePieces[selectedPieceIdx];
        puzzlePieces[selectedPieceIdx] = puzzlePieces[currentPosition];
        puzzlePieces[currentPosition] = temp;
        selectedPieceIdx = null;
        renderPuzzle();
      }
    };

    container.appendChild(tile);
  });

  const banner = document.getElementById('puzzleSuccessBanner');
  if (isSolved && banner) {
    banner.classList.add('solved');
    burstRomanticConfetti();
  }
}

function shufflePuzzle() {
  selectedPieceIdx = null;
  // Fisher-Yates shuffle ensuring it doesn't start already solved
  for (let i = puzzlePieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [puzzlePieces[i], puzzlePieces[j]] = [puzzlePieces[j], puzzlePieces[i]];
  }
  const banner = document.getElementById('puzzleSuccessBanner');
  if (banner) banner.classList.remove('solved');
  renderPuzzle();
}

function autoSolvePuzzle() {
  puzzlePieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  selectedPieceIdx = null;
  renderPuzzle();
}

/* ==========================================================================
   RENDER APPLICATION LAYOUT & STAGES
   ========================================================================== */
function initApp() {
  const root = document.getElementById('root');
  
  root.innerHTML = `
    <!-- Background Ambient Glow & Rose Bokeh -->
    <div class="background-glow">
      <div class="glow-orb glow-orb-1"></div>
      <div class="glow-orb glow-orb-2"></div>
      <div class="glow-orb glow-orb-3"></div>
    </div>

    <!-- Floating hearts and flower petals -->
    <div class="floating-elements" id="floating-elements"></div>

    <!-- Floating Music Pill -->
    <button id="musicToggleBtn" class="music-toggle" title="Play romantic background music">
      <span class="music-icon">🎵</span>
      <span class="music-label" id="musicLabel">Play Music 🎵</span>
      <audio id="bgAudio" loop preload="none">
        <source src="music.mp3" type="audio/mp3">
      </audio>
    </button>

    <!-- 3-STAGE PROGRESS BAR (Allows revisiting unlocked stages) -->
    <div class="stage-progress-wrapper">
      <div class="stage-step-pill ${currentStage === 1 ? 'active' : ''} ${unlockedStages.includes(1) ? 'unlocked' : ''}" onclick="setStage(1)">
        <span class="step-num">1</span>
        <span class="step-text">The Mystery Gift 🎁</span>
      </div>
      <div class="stage-divider-line ${unlockedStages.includes(2) ? 'active' : ''}"></div>
      <div class="stage-step-pill ${currentStage === 2 ? 'active' : ''} ${unlockedStages.includes(2) ? 'unlocked' : ''}" onclick="if(unlockedStages.includes(2)) setStage(2);">
        <span class="step-num">2</span>
        <span class="step-text">Memory Adventure 📸</span>
      </div>
      <div class="stage-divider-line ${unlockedStages.includes(3) ? 'active' : ''}"></div>
      <div class="stage-step-pill ${currentStage === 3 ? 'active' : ''} ${unlockedStages.includes(3) ? 'unlocked' : ''}" onclick="if(unlockedStages.includes(3)) setStage(3);">
        <span class="step-num">3</span>
        <span class="step-text">Grand Celebration 👑</span>
      </div>
    </div>

    <!-- MAIN DYNAMIC STAGE CONTAINER -->
    <main id="stageContent" class="stage-main-container"></main>

    <!-- FULLSCREEN LIGHTBOX MODAL WITH NEXT / PREV -->
    <div id="lightboxModal" class="lightbox-modal">
      <div class="lightbox-container">
        <button id="closeLightboxBtn" class="lightbox-close-btn" title="Close">✕</button>
        <div class="lightbox-img-wrapper">
          <img id="lightboxImg" class="lightbox-img" src="" alt="Full view" />
          <button id="prevPhotoBtn" class="lightbox-nav-arrow prev" title="Previous Photo">❮</button>
          <button id="nextPhotoBtn" class="lightbox-nav-arrow next" title="Next Photo">❯</button>
        </div>
        <div class="lightbox-caption-area">
          <div>
            <div id="lightboxCategory" class="lightbox-category"></div>
            <div id="lightboxTitle" class="lightbox-title"></div>
            <div id="lightboxDesc" class="lightbox-desc"></div>
          </div>
          <div id="lightboxCounter" class="lightbox-counter"></div>
        </div>
      </div>
    </div>

    <!-- ONE LAST SURPRISE MODAL (Stage 3 Part D) -->
    <div id="lastSurpriseModal" class="last-surprise-modal">
      <div class="last-surprise-card">
        <button id="closeLastSurpriseBtn" class="modal-close-icon">✕</button>
        <div class="modal-heart-beat">💖</div>
        <div class="modal-photo-frame">
          <img src="${ANNIVERSARY_DATA.couple.grandPhoto}" alt="Anna & Vadina" />
        </div>
        <h2 class="last-surprise-headline">ANNA &amp; VADINA — TOGETHER FOREVER! ❤️</h2>
        <p class="last-surprise-sub">May your journey together always shine as bright as the stars!</p>
        <div class="grand-gold-crown">👑 ✨ 👑</div>
      </div>
    </div>
  `;

  setupGlobalListeners();
  spawnFloatingHearts();
  renderStages();
}

/* ==========================================================================
   RENDER STAGES: 1, 2, 3
   ========================================================================== */
function renderStages() {
  const container = document.getElementById('stageContent');
  if (!container) return;

  // Update Progress Pills
  document.querySelectorAll('.stage-step-pill').forEach((pill, idx) => {
    const stageNum = idx + 1;
    pill.classList.toggle('active', currentStage === stageNum);
    pill.classList.toggle('unlocked', unlockedStages.includes(stageNum));
  });

  if (currentStage === 1) {
    renderStage1(container);
  } else if (currentStage === 2) {
    renderStage2(container);
  } else if (currentStage === 3) {
    renderStage3(container);
  }
}

/* --------------------------------------------------------------------------
   STAGE 1: THE MYSTERY GIFT 🎁
   -------------------------------------------------------------------------- */
function renderStage1(container) {
  container.innerHTML = `
    <div class="stage-section stage-1-view fade-in">
      <div class="stage-badge-tag">Stage 1: The Mystery Gift 🎁</div>
      <div class="royal-crest">
        <span class="crest-flower">🌹</span>
        <span class="crest-title">A Special Surprise</span>
        <span class="crest-flower">🌹</span>
      </div>

      <h1 class="welcome-headline">Dear Anna &amp; Vadina ❤️</h1>
      <p class="welcome-tagline">Something special is waiting for you...</p>
      
      <!-- 3D Royal Pink & Gold Animated Gift Box -->
      <div class="mystery-gift-wrapper" id="mysteryGiftWrapper">
        <div class="roses-surround top-left">🌹 🌸</div>
        <div class="roses-surround top-right">🌸 🌹</div>
        
        <div class="gift-box" id="stage1GiftBox">
          <div class="gift-lid">
            <div class="gift-bow">🎀</div>
          </div>
          <div class="gift-body">
            <div class="gift-ribbon-vertical"></div>
            <div class="gift-ribbon-horizontal"></div>
          </div>
        </div>

        <div class="roses-surround bottom-left">🌹 🌸</div>
        <div class="roses-surround bottom-right">🌸 🌹</div>
      </div>

      <div style="margin: 25px auto 10px;">
        <button id="unwrapBtn" class="grand-gold-btn">
          <span>🎁 UNWRAP YOUR SURPRISE 🎁</span>
        </button>
      </div>

      <!-- Revealed Message Card (Hidden until unwrap clicked) -->
      <div id="unwrapRevealedCard" class="unwrap-revealed-card" style="display: none;">
        <div class="revealed-sparkles">✨ 💖 ✨</div>
        <div class="welcome-message-text">
          "${ANNIVERSARY_DATA.stage1Message}"
        </div>
        <div class="next-prompt-line">Ready for the next surprise?</div>
        <div style="margin-top: 20px;">
          <button id="stage1ContinueBtn" class="grand-gold-btn pulse-glow">
            <span>LET'S CONTINUE ❤️ ➔</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const unwrapBtn = document.getElementById('unwrapBtn');
  const stage1GiftBox = document.getElementById('stage1GiftBox');
  const unwrapRevealedCard = document.getElementById('unwrapRevealedCard');
  const stage1ContinueBtn = document.getElementById('stage1ContinueBtn');

  if (unwrapBtn) {
    unwrapBtn.addEventListener('click', () => {
      stage1GiftBox.classList.add('opened');
      burstRomanticConfetti();
      unwrapBtn.style.display = 'none';
      setTimeout(() => {
        unwrapRevealedCard.style.display = 'block';
        unwrapRevealedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
      if (!isMusicPlaying) toggleMusic();
    });
  }

  if (stage1ContinueBtn) {
    stage1ContinueBtn.addEventListener('click', () => {
      setStage(2);
    });
  }
}

/* --------------------------------------------------------------------------
   STAGE 2: THE MEMORY ADVENTURE 📸
   -------------------------------------------------------------------------- */
function renderStage2(container) {
  container.innerHTML = `
    <div class="stage-section stage-2-view fade-in">
      <div class="stage-badge-tag">Stage 2: The Memory Adventure 📸</div>
      
      <!-- PART A: THREE MEMORY BOXES -->
      <section class="section-container" style="padding-top: 10px;">
        <div class="section-head">
          <span class="section-badge">Part A: Mystery Memory Boxes</span>
          <h2 class="section-title">Unlock Our Cherished Memories</h2>
          <p class="section-desc">Click each royal memory box below to unlock beautiful photographs of your journey.</p>
        </div>

        <div class="memory-boxes-grid">
          <div class="memory-box-card ${activeBoxKey === 'box1' ? 'opened' : ''}" onclick="toggleMemoryBox('box1')">
            <div class="box-icon">✨</div>
            <h3 class="box-title">1. Beautiful Moments</h3>
            <p class="box-desc">Lakeside sunsets, temple walks &amp; gentle smiles.</p>
            <div class="box-action-hint">${activeBoxKey === 'box1' ? 'Click to Close ✕' : 'Tap to Open Box 📦'}</div>
          </div>

          <div class="memory-box-card ${activeBoxKey === 'box2' ? 'opened' : ''}" onclick="toggleMemoryBox('box2')">
            <div class="box-icon">💖</div>
            <h3 class="box-title">2. Sweet Memories</h3>
            <p class="box-desc">Festive celebrations, ancient heritage &amp; laughter.</p>
            <div class="box-action-hint">${activeBoxKey === 'box2' ? 'Click to Close ✕' : 'Tap to Open Box 📦'}</div>
          </div>

          <div class="memory-box-card ${activeBoxKey === 'box3' ? 'opened' : ''}" onclick="toggleMemoryBox('box3')">
            <div class="box-icon">💍</div>
            <h3 class="box-title">3. Forever Together</h3>
            <p class="box-desc">Sacred vows, floral garlands &amp; timeless promises.</p>
            <div class="box-action-hint">${activeBoxKey === 'box3' ? 'Click to Close ✕' : 'Tap to Open Box 📦'}</div>
          </div>
        </div>

        <!-- Unlocked Photos Drawer -->
        <div id="memoryBoxDrawer" class="memory-box-drawer" style="${activeBoxKey ? 'display: block;' : 'display: none;'}">
          ${activeBoxKey ? renderDrawerPhotos(activeBoxKey) : ''}
        </div>
      </section>

      <!-- PART B: PHOTO PUZZLE GAME -->
      <section class="section-container">
        <div class="section-head">
          <span class="section-badge">Part B: Interactive Photo Game</span>
          <h2 class="section-title">The Royal Photo Puzzle</h2>
          <p class="section-desc">Click or touch any two tiles to swap them until the picture is complete!</p>
        </div>

        <div class="puzzle-game-wrapper">
          <div class="puzzle-controls-top">
            <button class="small-pill-btn" onclick="shufflePuzzle()">🔀 Reshuffle Pieces</button>
            <button class="small-pill-btn" onclick="autoSolvePuzzle()">✨ Auto-Solve</button>
          </div>

          <div id="puzzleBoard" class="puzzle-board"></div>

          <div id="puzzleSuccessBanner" class="puzzle-success-banner">
            <div class="puzzle-sparkle-stars">🌟 💖 🌟</div>
            <h3 class="puzzle-success-title">Puzzle Complete!</h3>
            <p class="puzzle-success-text">
              "Every little piece makes a beautiful picture, just like every moment makes your love story special!"
            </p>
          </div>
        </div>
      </section>

      <!-- PART C: SECRET LOVE MESSAGE ENVELOPE -->
      <section class="section-container">
        <div class="section-head">
          <span class="section-badge">Part C: Sealed With Love</span>
          <h2 class="section-title">Secret Love Message</h2>
          <p class="section-desc">A heartfelt blessing personally sealed for both of you.</p>
        </div>

        <div class="secret-envelope-wrapper">
          <div id="stage2EnvelopeClosed" class="envelope-card-sealed" style="cursor: pointer;">
            <div class="wax-seal-badge">💌</div>
            <h3 class="envelope-prompt-text">OPEN YOUR SECRET LETTER</h3>
            <p class="envelope-sub-hint">Tap with love to reveal what's inside ✨</p>
          </div>

          <div id="stage2LetterPaper" class="royal-letter-paper" style="display: none;">
            <div class="letter-floral-header">❧ 🌹 ❦ 🌸 ❦ 🌹 ❧</div>
            <div class="letter-script-body" style="white-space: pre-line;">
              ${ANNIVERSARY_DATA.stage2Letter}
            </div>
            
            <div style="text-align: center; margin-top: 35px;">
              <button id="stage2FinishBtn" class="grand-gold-btn pulse-glow">
                <span>UNLOCK THE FINAL SURPRISE 👑</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  // Initialize Puzzle
  renderPuzzle();

  // Envelope Listeners
  const closedCard = document.getElementById('stage2EnvelopeClosed');
  const letterPaper = document.getElementById('stage2LetterPaper');
  const finishBtn = document.getElementById('stage2FinishBtn');

  if (closedCard) {
    closedCard.addEventListener('click', () => {
      closedCard.style.display = 'none';
      letterPaper.style.display = 'block';
      burstRomanticConfetti();
      letterPaper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      setStage(3);
    });
  }
}

function toggleMemoryBox(boxKey) {
  if (activeBoxKey === boxKey) {
    activeBoxKey = null;
  } else {
    activeBoxKey = boxKey;
    burstRomanticConfetti();
  }
  const drawer = document.getElementById('memoryBoxDrawer');
  if (drawer) {
    drawer.style.display = activeBoxKey ? 'block' : 'none';
    if (activeBoxKey) {
      drawer.innerHTML = renderDrawerPhotos(activeBoxKey);
      drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  // Update box cards
  document.querySelectorAll('.memory-box-card').forEach((card, idx) => {
    const keys = ['box1', 'box2', 'box3'];
    card.classList.toggle('opened', activeBoxKey === keys[idx]);
    const hint = card.querySelector('.box-action-hint');
    if (hint) {
      hint.innerText = activeBoxKey === keys[idx] ? 'Click to Close ✕' : 'Tap to Open Box 📦';
    }
  });
}

function renderDrawerPhotos(boxKey) {
  const box = ANNIVERSARY_DATA.memoryBoxes[boxKey];
  return `
    <div class="drawer-header">
      <h3 class="drawer-title">${box.icon} ${box.title}</h3>
      <p class="drawer-subtitle">${box.desc}</p>
    </div>
    <div class="drawer-photos-grid">
      ${box.photos.map((p, idx) => `
        <div class="drawer-photo-card" onclick="openBoxLightbox('${boxKey}', ${idx})">
          <div class="drawer-img-frame">
            <img src="${p.src}" alt="${p.title}" loading="lazy" />
            <div class="photo-card-overlay">
              <strong class="photo-card-title">${p.title}</strong>
              <p class="photo-card-desc">${p.desc}</p>
            </div>
            <div class="photo-zoom-icon">🔍</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openBoxLightbox(boxKey, photoIdx) {
  const box = ANNIVERSARY_DATA.memoryBoxes[boxKey];
  currentLightboxPhotos = box.photos.map(p => ({
    src: p.src,
    title: p.title,
    category: box.title,
    description: p.desc
  }));
  currentLightboxIdx = photoIdx;
  displayLightboxItem();
}

/* --------------------------------------------------------------------------
   STAGE 3: THE GRAND CELEBRATION 👑
   -------------------------------------------------------------------------- */
function renderStage3(container) {
  const daysInfo = calculateDaysTogether();

  container.innerHTML = `
    <div class="stage-section stage-3-view fade-in">
      <div class="stage-badge-tag">Stage 3: The Grand Celebration 👑</div>

      <!-- PART A: GRAND ENTRANCE WITH GOLDEN CURTAINS -->
      <section class="grand-entrance-wrapper">
        <div class="curtains-banner">
          <div class="floral-garland">🌹 ❧ 🌸 ❦ 🌹</div>
          <p class="hero-anniv-tag">The Royal Sanctuary of Love</p>
          <h1 class="hero-names">${ANNIVERSARY_DATA.couple.husband} ❤️ ${ANNIVERSARY_DATA.couple.wife}</h1>
          <div class="wedding-date-highlight">✦ Sacred Wedding Date: ${ANNIVERSARY_DATA.couple.date} ✦</div>
          <div class="days-together-badge">
            <span class="days-star">✨</span>
            <span class="days-count-text">${daysInfo.text}</span>
            <span class="days-star">✨</span>
          </div>
        </div>

        <div class="grand-entrance-portrait-frame">
          <div class="golden-curtain left"></div>
          <div class="golden-curtain right"></div>
          <img src="${ANNIVERSARY_DATA.couple.grandPhoto}" alt="Ashok & Hemalatha" class="grand-portrait-img" />
          <div class="grand-portrait-caption">
            <span>💍 Ashok &amp; Hemalatha • Eternal Journey</span>
          </div>
        </div>
      </section>

      <!-- PART B: FIREWORKS SHOW CTA -->
      <section class="section-container" style="text-align: center; padding: 40px 24px 20px;">
        <button id="stage3FireworksBtn" class="celebrate-fireworks-btn">
          <span>🎆 LET'S CELEBRATE OUR LOVE! 🎆</span>
        </button>
      </section>

      <!-- PART C: EXACT FINAL ANNIVERSARY GREETING -->
      <section class="final-anniversary-screen">
        <div class="final-floral-wreath">
          <div class="final-roses-top">🌹 🌸 🌺 🌸 🌹</div>
          
          <div class="grand-final-banner">
            <div class="grand-gold-crown">👑 ✨ 👑</div>
            <!-- EXACT HEADINGS REQUESTED -->
            <h1 class="grand-anniversary-headline">
              HAPPY ANNIVERSARY DAY ANNA VADINA ❤️
            </h1>
            <h2 class="grand-wedding-date-tag">26 NOVEMBER 2025</h2>
            
            <div class="gold-line-decor" style="justify-content: center; margin: 18px auto;">
              <span class="gold-line" style="width: 120px;"></span>
              <span class="gold-diamond">❖</span>
              <span class="gold-line" style="width: 120px;"></span>
            </div>
            
            <div class="grand-anniversary-blessing">
              ${ANNIVERSARY_DATA.stage3Blessing.replace(/\n\n/g, '<br><br>')}
            </div>
            
            <div class="grand-glowing-heart">💖</div>
          </div>

          <!-- PART D: FINAL SURPRISE BUTTON -->
          <div style="margin: 30px auto 10px;">
            <button id="oneLastSurpriseBtn" class="grand-gold-btn pulse-glow">
              <span>ONE LAST SURPRISE ❤️</span>
            </button>
          </div>

          <p class="final-crafted-tag">
            Handcrafted with endless love, blessings, and respect by your brother ✨
          </p>
        </div>
      </section>

      <!-- OUR BEAUTIFUL JOURNEY TIMELINE (Preserved) -->
      <section class="section-container">
        <div class="section-head">
          <span class="section-badge">Sacred Path</span>
          <h2 class="section-title">Our Beautiful Journey</h2>
          <p class="section-desc">Honoring the divine rituals, laughter, and milestones along the way.</p>
        </div>

        <div class="royal-timeline-container">
          <div class="royal-timeline-stem"></div>
          ${ANNIVERSARY_DATA.timeline.map((step, idx) => `
            <div class="timeline-row">
              <div class="timeline-node">🌹</div>
              <div class="timeline-card-content">
                <div class="timeline-photo-thumbnail">
                  <img src="${step.photo}" alt="${step.title}" />
                </div>
                <div class="timeline-text-body">
                  <span class="timeline-date-tag">${step.date}</span>
                  <h3 class="timeline-milestone-title">${step.title}</h3>
                  <p class="timeline-milestone-desc">${step.description}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="royal-footer">
        <div class="footer-names">${ANNIVERSARY_DATA.couple.husband} &amp; ${ANNIVERSARY_DATA.couple.wife}</div>
        <p class="footer-date">Celebrating Wedding Anniversary • ${ANNIVERSARY_DATA.couple.date}</p>
      </footer>
    </div>
  `;

  // Bind Stage 3 Listeners
  const fireworksBtn = document.getElementById('stage3FireworksBtn');
  if (fireworksBtn) {
    fireworksBtn.addEventListener('click', triggerFireworks);
  }

  const oneLastSurpriseBtn = document.getElementById('oneLastSurpriseBtn');
  const lastSurpriseModal = document.getElementById('lastSurpriseModal');
  const closeLastSurpriseBtn = document.getElementById('closeLastSurpriseBtn');

  if (oneLastSurpriseBtn) {
    oneLastSurpriseBtn.addEventListener('click', () => {
      triggerFireworks();
      if (lastSurpriseModal) lastSurpriseModal.classList.add('active');
    });
  }

  if (closeLastSurpriseBtn && lastSurpriseModal) {
    closeLastSurpriseBtn.addEventListener('click', () => {
      lastSurpriseModal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   LIGHTBOX DISPLAY & CONTROLS
   ========================================================================== */
function displayLightboxItem() {
  if (!currentLightboxPhotos.length) return;
  const photo = currentLightboxPhotos[currentLightboxIdx];
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const category = document.getElementById('lightboxCategory');
  const title = document.getElementById('lightboxTitle');
  const desc = document.getElementById('lightboxDesc');
  const counter = document.getElementById('lightboxCounter');

  img.src = photo.src;
  category.innerText = photo.category || 'Memory';
  title.innerText = photo.title || '';
  desc.innerText = photo.description || '';
  counter.innerText = `${currentLightboxIdx + 1} / ${currentLightboxPhotos.length}`;

  modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   GLOBAL LISTENERS
   ========================================================================== */
function setupGlobalListeners() {
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  if (musicToggleBtn) musicToggleBtn.addEventListener('click', toggleMusic);

  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const prevPhotoBtn = document.getElementById('prevPhotoBtn');
  const nextPhotoBtn = document.getElementById('nextPhotoBtn');
  const lightboxModal = document.getElementById('lightboxModal');

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (prevPhotoBtn) prevPhotoBtn.addEventListener('click', () => {
    currentLightboxIdx = (currentLightboxIdx - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length;
    displayLightboxItem();
  });
  if (nextPhotoBtn) nextPhotoBtn.addEventListener('click', () => {
    currentLightboxIdx = (currentLightboxIdx + 1) % currentLightboxPhotos.length;
    displayLightboxItem();
  });
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target.id === 'lightboxModal') closeLightbox();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (document.getElementById('lightboxModal')?.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        currentLightboxIdx = (currentLightboxIdx - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length;
        displayLightboxItem();
      }
      if (e.key === 'ArrowRight') {
        currentLightboxIdx = (currentLightboxIdx + 1) % currentLightboxPhotos.length;
        displayLightboxItem();
      }
    }
    if (e.key === 'Escape') {
      document.getElementById('lastSurpriseModal')?.classList.remove('active');
    }
  });
}

// Global window helpers
window.setStage = setStage;
window.toggleMemoryBox = toggleMemoryBox;
window.openBoxLightbox = openBoxLightbox;
window.shufflePuzzle = shufflePuzzle;
window.autoSolvePuzzle = autoSolvePuzzle;

document.addEventListener('DOMContentLoaded', initApp);
