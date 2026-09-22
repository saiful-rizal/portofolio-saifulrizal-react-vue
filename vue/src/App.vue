<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Profile from "./components/Profile.vue";
import Project from "./components/Project.vue";
import Achievement from "./components/Achievement.vue";
import Certification from "./components/Certification.vue";
import Dashboard from "./components/Dashboard.vue";
import portfolio from "./data/portfolio.json";

const activeTab = ref("home");
const navigate = (tab) => {
  if (tab === "contact") tab = "about";
  activeTab.value = tab;
  window.scrollTo(0, 0);
};

const time = ref(new Date());
const mouse = ref({ x: 0, y: 0 });

let clock = null;

const handleMouseMove = (e) => {
  mouse.value = {
    x: (e.clientX / window.innerWidth - 0.5) * 14,
    y: (e.clientY / window.innerHeight - 0.5) * 14,
  };
};

onMounted(() => {
  clock = setInterval(() => {
    time.value = new Date();
  }, 1000);

  window.addEventListener("mousemove", handleMouseMove);
});

onUnmounted(() => {
  clearInterval(clock);
  window.removeEventListener("mousemove", handleMouseMove);
});

const hours = computed(() => String(time.value.getHours()).padStart(2, "0"));
const minutes = computed(() => String(time.value.getMinutes()).padStart(2, "0"));
const seconds = computed(() => String(time.value.getSeconds()).padStart(2, "0"));

const timerStyle = computed(() => ({
  transform: `translate(calc(-50% + ${mouse.value.x * 0.25}px), calc(-50% + ${
    mouse.value.y * 0.25
  }px))`,
}));
</script>

<template>
  <Profile
    v-if="activeTab === 'about'"
    :active="activeTab"
    @navigate="navigate"
  />
  <Project
    v-else-if="activeTab === 'project'"
    :active="activeTab"
    @navigate="navigate"
  />
  <Achievement
    v-else-if="activeTab === 'achievement'"
    :active="activeTab"
    @navigate="navigate"
  />
  <Certification
    v-else-if="activeTab === 'certification'"
    :active="activeTab"
    @navigate="navigate"
  />
  <Dashboard
    v-else-if="activeTab === 'dashboard'"
    @navigate="navigate"
  />
  <main v-else class="portfolio">
    <!-- BACKGROUND -->
    <div class="grain" />
    <div class="light" />
    <div class="grid" />
    <div class="grid bottom" />

    <!-- TOP -->
    <div class="top-left">WEB / MOBILE / AI ENGINEER</div>
    <div class="top-right">BUILD · LEARN · GROW</div>

    <!-- TIMER -->
    <div class="timer-background" :style="timerStyle">
      <div class="timer">{{ hours }}:{{ minutes }}:{{ seconds }}</div>
    </div>

    <!-- HERO -->
    <section class="main">
      <div class="hello">{{ portfolio.profile.hello }}</div>
      <div class="category">{{ portfolio.profile.title }}</div>

      <div class="title-row">
        <div class="line" />
        <h1 class="title">{{ portfolio.profile.shortName }}</h1>
        <div class="line" />
      </div>

      <div class="buttons">
        <a href="#about" class="button primary" @click.prevent="navigate('about')">Tentang Saya</a>
        <a href="#cv" class="button" @click.prevent="navigate('about')">Lihat CV</a>
        <a href="#certification" class="button" @click.prevent="navigate('certification')">Certification</a>
      </div>
    </section>

    <!-- BOTTOM -->
    <div class="bottom">
      <div class="bottom-line" />
      <span>LIFE IS AN EXPERIMENTATION</span>
      <div class="bottom-line" />
    </div>

    <!-- NAVBAR -->
    <nav class="bottom-nav">
      <!-- BERANDA -->
      <a href="#home" class="nav-item" :class="{ active: activeTab === 'home' }" @click.prevent="navigate('home')">
        <span class="nav-icon">
          <svg viewBox="0 0 24 24">
            <path d="M3 10.8 L12 3 L21 10.8 V21 H14.5 V14.5 H9.5 V21 H3 Z" />
          </svg>
        </span>
        <span class="nav-label">Beranda</span>
      </a>

      <!-- PROFIL -->
      <a href="#about" class="nav-item" :class="{ active: activeTab === 'about' }" @click.prevent="navigate('about')">
        <span class="nav-icon">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21 C4 16.8 7.5 14.5 12 14.5 C16.5 14.5 20 16.8 20 21" />
          </svg>
        </span>
        <span class="nav-label">Profil</span>
      </a>

      <!-- PROJECT -->
      <a href="#project" class="nav-item" :class="{ active: activeTab === 'project' }" @click.prevent="navigate('project')">
        <span class="nav-icon">
          <svg viewBox="0 0 24 24">
            <path d="M3 6 H9 L11 8 H21 V19 H3 Z" />
            <path d="M3 9 H21" />
          </svg>
        </span>
        <span class="nav-label">Project</span>
      </a>

      <!-- ACHIEVEMENT -->
      <a href="#achievement" class="nav-item" :class="{ active: activeTab === 'achievement' }" @click.prevent="navigate('achievement')">
        <span class="nav-icon">
          <svg viewBox="0 0 24 24">
            <path d="M7 4 H17 V8 C17 11 15 13 12 14 C9 13 7 11 7 8 Z" />
            <path d="M7 6 H4 V8 C4 10 5.5 11 8 11" />
            <path d="M17 6 H20 V8 C20 10 18.5 11 16 11" />
            <path d="M12 14 V18" />
            <path d="M8 21 H16" />
          </svg>
        </span>
        <span class="nav-label">Achievement</span>
      </a>

      <!-- CERTIFICATION -->
      <a href="#certification" class="nav-item" :class="{ active: activeTab === 'certification' }" @click.prevent="navigate('certification')">
        <span class="nav-icon">
          <svg viewBox="0 0 24 24">
            <path d="M4 4 H10 C11 4 12 5 12 6 V20 C11 19 10 18.5 8 18.5 H4 Z" />
            <path d="M20 4 H14 C13 4 12 5 12 6 V20 C13 19 14 18.5 16 18.5 H20 Z" />
          </svg>
        </span>
        <span class="nav-label">Certification</span>
      </a>
    </nav>

    <!-- CORNER -->
    <div class="mark one" />
    <div class="mark two" />
  </main>

  <button
    v-if="activeTab !== 'dashboard'"
    class="admin-fab"
    @click="navigate('dashboard')"
    aria-label="Buka Dashboard"
    title="Dashboard"
  >
    <svg viewBox="0 0 24 24">
      <path d="M12 8.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z" />
      <path d="M19.4 13.5c.05-.5.05-1 .05-1.5s0-1-.05-1.5l2-1.5-2-3.4-2.3 1a7.6 7.6 0 0 0-2.6-1.5L14 2h-4l-.5 2.6a7.6 7.6 0 0 0-2.6 1.5l-2.3-1-2 3.4 2 1.5c-.05.5-.05 1-.05 1.5s0 1 .05 1.5l-2 1.5 2 3.4 2.3-1a7.6 7.6 0 0 0 2.6 1.5L10 22h4l.5-2.6a7.6 7.6 0 0 0 2.6-1.5l2.3 1 2-3.4-2-1.5Z" />
    </svg>
  </button>
</template>

<style>
/* =====================================================
   RESET
===================================================== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
}
        body {
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          background: #090909;
          font-family: Arial, Helvetica, sans-serif;
        }
#app {
  width: 100%;
  min-height: 100vh;
}

/* =====================================================
   MAIN
===================================================== */
.portfolio {
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 520px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: radial-gradient(
    circle at 50% 45%,
    #303130 0%,
    #292a29 25%,
    #222322 57%,
    #181918 100%
  );
}

/* =====================================================
   GRAIN
===================================================== */
.grain {
  position: absolute;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  mix-blend-mode: screen;
}

/* =====================================================
   LIGHT
===================================================== */
.light {
  position: absolute;
  left: 50%;
  top: 50%;
  width: clamp(180px, 30vw, 430px);
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.025);
  filter: blur(clamp(40px, 5vw, 85px));
  pointer-events: none;
  animation: lightPulse 6s ease-in-out infinite;
}
@keyframes lightPulse {
  0%, 100% { opacity: 0.2; scale: 0.85; }
  50% { opacity: 0.6; scale: 1.12; }
}

/* =====================================================
   GRID
===================================================== */
.grid {
  position: absolute;
  left: 50%;
  top: 7%;
  width: min(48vw, 650px);
  height: clamp(90px, 17vh, 180px);
  transform: translateX(-50%);
  background-image:
    linear-gradient(rgba(150, 150, 150, 0.2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(150, 150, 150, 0.2) 1px, transparent 1px);
  background-size: clamp(18px, 2vw, 30px) clamp(18px, 2vw, 30px);
  opacity: 0.42;
  mask-image: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.45) 55%, transparent 100%);
}
.grid.bottom {
  top: auto;
  bottom: 12%;
  mask-image: linear-gradient(to top, black 0%, rgba(0, 0, 0, 0.45) 55%, transparent 100%);
}

/* =====================================================
   TIMER
===================================================== */
.timer-background {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease-out;
}
.timer {
  color: #353635;
  font-size: clamp(64px, 11vw, 180px);
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.55vw;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  opacity: 0.7;
  user-select: none;
  animation: timerAppear 1.2s ease-out both;
}
@keyframes timerAppear {
  from { opacity: 0; transform: scale(0.94); }
  to { opacity: 0.7; transform: scale(1); }
}

/* =====================================================
   TOP LABEL
===================================================== */
.top-left, .top-right {
  position: absolute;
  top: clamp(20px, 5.5vh, 60px);
  z-index: 15;
  color: #858585;
  font-size: clamp(6px, 0.55vw, 9px);
  font-weight: 600;
  letter-spacing: clamp(2px, 0.35vw, 5px);
  text-transform: uppercase;
  white-space: nowrap;
  animation: topAppear 1s ease-out both;
}
.top-left { left: clamp(18px, 4vw, 60px); }
.top-right { right: clamp(18px, 4vw, 60px); animation-delay: 0.15s; }
@keyframes topAppear {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =====================================================
   HERO
===================================================== */
.main {
  position: relative;
  z-index: 10;
  width: min(94vw, 1150px);
  padding: 20px;
  text-align: center;
}

/* =====================================================
   HELLO
===================================================== */
.hello {
  margin-bottom: clamp(13px, 2vh, 22px);
  color: #d2d2d2;
  font-size: clamp(14px, 1.2vw, 20px);
  font-weight: 700;
  letter-spacing: clamp(4px, 0.65vw, 9px);
  text-transform: uppercase;
  animation: heroTop 0.9s cubic-bezier(.2,.8,.2,1) 0.15s both;
}

/* =====================================================
   CATEGORY
===================================================== */
.category {
  margin-bottom: clamp(18px, 2.7vh, 29px);
  color: #9b9b9b;
  font-size: clamp(10px, 0.9vw, 15px);
  font-weight: 600;
  letter-spacing: clamp(3px, 0.58vw, 8px);
  text-transform: uppercase;
  animation: heroTop 0.9s cubic-bezier(.2,.8,.2,1) 0.3s both;
}
@keyframes heroTop {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =====================================================
   TITLE
===================================================== */
.title-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 1.3vw, 20px);
  animation: titleAppear 1.1s cubic-bezier(.2,.8,.2,1) 0.45s both;
}
.line {
  flex: 1;
  max-width: clamp(45px, 9vw, 125px);
  height: 1px;
  background: #b0b0b0;
  opacity: 0.85;
}
.title {
  flex-shrink: 1;
  color: #f5f5f5;
  font-size: clamp(44px, 6.5vw, 90px);
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: clamp(1px, 0.25vw, 3px);
  white-space: nowrap;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
}
@keyframes titleAppear {
  from { opacity: 0; transform: translateY(25px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

/* =====================================================
   BUTTON CONTAINER
===================================================== */
.buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: clamp(7px, 0.8vw, 13px);
  margin-top: clamp(21px, 3vh, 32px);
  animation: buttonsEntrance 1s cubic-bezier(.2,.8,.2,1) 0.65s both;
}
@keyframes buttonsEntrance {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =====================================================
   BUTTON
===================================================== */
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: clamp(105px, 9vw, 138px);
  height: clamp(32px, 3.5vh, 41px);
  padding: 0 clamp(14px, 1.5vw, 23px);
  overflow: hidden;
  border: 1px solid #707070;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.025);
  color: #dedede;
  font-size: clamp(7px, 0.65vw, 10px);
  font-weight: 700;
  letter-spacing: clamp(0.8px, 0.14vw, 1.7px);
  text-decoration: none;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
  transform: translateY(0);
  transition: transform 0.35s cubic-bezier(.2,.8,.2,1), background 0.35s ease, color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  animation: buttonFloat 4s ease-in-out infinite;
}
.button:nth-child(1) { animation-delay: 0s; }
.button:nth-child(2) { animation-delay: 0.25s; }
.button:nth-child(3) { animation-delay: 0.5s; }
@keyframes buttonFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
.button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -130%;
  width: 75%;
  height: 100%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.22), transparent);
  transform: skewX(-20deg);
  transition: left 0.65s ease;
  pointer-events: none;
}
.button:hover::before { left: 145%; }
.button::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.6);
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.35s ease, transform 0.35s ease;
  pointer-events: none;
}
.button:hover::after { opacity: 1; transform: scale(1); }
.button:hover {
  transform: translateY(-7px) scale(1.045);
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border-color: #aaaaaa;
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.09), 0 0 20px rgba(255, 255, 255, 0.07);
  animation-play-state: paused;
}
.button:active {
  transform: translateY(-1px) scale(0.95);
  transition: transform 0.1s ease;
}
.button.primary {
  background: #eeeeee;
  color: #1b1c1b;
  border-color: #eeeeee;
}
.button.primary:hover {
  background: #ffffff;
  color: #111111;
  border-color: #ffffff;
  box-shadow: 0 10px 35px rgba(255, 255, 255, 0.18), 0 0 25px rgba(255, 255, 255, 0.1);
}

/* =====================================================
   BOTTOM TEXT
===================================================== */
.bottom {
  position: absolute;
  left: 50%;
  bottom: clamp(91px, 13vh, 128px);
  z-index: 10;
  width: 90%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 2vw, 26px);
  color: #707070;
  font-size: clamp(5px, 0.5vw, 8px);
  font-weight: 600;
  letter-spacing: clamp(2px, 0.35vw, 5px);
  white-space: nowrap;
  animation: bottomAppear 1s ease-out 1s both;
}
.bottom-line {
  width: clamp(25px, 4vw, 60px);
  height: 1px;
  background: #646464;
}
@keyframes bottomAppear {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* =====================================================
   NAVBAR
===================================================== */
.bottom-nav {
  position: absolute;
  left: 50%;
  bottom: clamp(15px, 3.5vh, 38px);
  z-index: 30;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  max-width: calc(100vw - 30px);
  min-height: 52px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(34, 35, 34, 0.82);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  animation: navAppear 0.9s cubic-bezier(.2,.8,.2,1) 0.8s both;
}
@keyframes navAppear {
  from { opacity: 0; transform: translate(-50%, 25px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

/* =====================================================
   NAV ITEM
===================================================== */
.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  width: 50px;
  min-width: 50px;
  height: 42px;
  padding: 0 11px;
  border-radius: 999px;
  color: #dcdcdc;
  text-decoration: none;
  transition: width 0.3s ease, min-width 0.3s ease, background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}
.nav-icon {
  width: 19px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.nav-icon svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.3s ease;
}
.nav-label {
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 700;
  transition: max-width 0.3s ease, opacity 0.3s ease;
}
.nav-item.active {
  width: 101px;
  min-width: 101px;
  background: rgba(255, 255, 255, 0.17);
  color: #ffffff;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.08);
}
.nav-item.active .nav-label { max-width: 65px; opacity: 1; }
.nav-item:hover {
  background: rgba(255, 255, 255, 0.11);
  color: #ffffff;
  transform: translateY(-3px);
}
.nav-item:hover .nav-icon svg { transform: scale(1.12); }
.nav-item:hover .nav-label { max-width: 80px; opacity: 1; }

/* =====================================================
   CORNER
===================================================== */
.mark {
  position: absolute;
  width: clamp(12px, 1.4vw, 20px);
  aspect-ratio: 1;
  opacity: 0.45;
}
.mark::before, .mark::after {
  content: "";
  position: absolute;
  background: #999999;
}
.mark::before { width: 100%; height: 1px; left: 0; top: 50%; }
.mark::after { width: 1px; height: 100%; left: 50%; top: 0; }
.mark.one { left: 4%; bottom: 4%; }
.mark.two { right: 4%; bottom: 4%; }

/* =====================================================
   ADMIN FAB
===================================================== */
.admin-fab {
  position: fixed;
  right: 16px;
  bottom: 76px;
  z-index: 70;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(34, 35, 34, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #f5f5f5;
  cursor: pointer;
  backdrop-filter: blur(12px);
  transition: transform 0.25s ease, background 0.25s ease;
}
.admin-fab svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.admin-fab:hover { transform: translateY(-3px) scale(1.05); background: rgba(255, 255, 255, 0.14); }

/* =====================================================
   TABLET
===================================================== */
@media (max-width: 900px) {
  .main { width: 95vw; }
  .grid { width: 72vw; }
  .timer { font-size: clamp(60px, 14vw, 160px); }
  .title { font-size: clamp(40px, 7vw, 70px); }
}

/* =====================================================
   MOBILE
===================================================== */
@media (max-width: 600px) {
  .portfolio { min-height: 100svh; height: 100svh; }
  .grid { width: 90vw; height: 90px; top: 11%; background-size: 20px 20px; }
  .grid.bottom { bottom: 14%; }
  .timer { font-size: clamp(48px, 18vw, 90px); letter-spacing: -4px; }
  .top-left, .top-right { top: 4%; font-size: 5px; letter-spacing: 1.5px; }
  .top-left { left: 5%; }
  .top-right { right: 5%; }
  .main { width: 100%; padding: 15px 16px; }
  .hello { margin-bottom: 14px; font-size: 11px; letter-spacing: 3.8px; }
  .category { margin-bottom: 17px; font-size: 8px; letter-spacing: 3.2px; }
  .title-row { gap: 6px; }
  .line { max-width: 34px; }
  .title { font-size: clamp(31px, 9.5vw, 46px); letter-spacing: 0.8px; }
  .buttons { margin-top: 21px; gap: 7px; }
  .button { min-width: 91px; height: 30px; padding: 0 9px; font-size: 6.5px; }
  .bottom { display: none; }
  .bottom-nav { bottom: 12px; min-height: 49px; padding: 4px; max-width: calc(100vw - 20px); }
  .nav-item { width: 43px; min-width: 43px; height: 39px; padding: 0; gap: 6px; }
  .nav-item.active { width: 84px; min-width: 84px; padding: 0 11px; }
  .nav-icon { width: 18px; height: 18px; }
  .nav-icon svg { width: 17px; height: 17px; }
  .nav-item.active .nav-label { max-width: 53px; font-size: 9px; }
  .mark { display: none; }
}

/* =====================================================
   SMALL MOBILE
===================================================== */
@media (max-width: 380px) {
  .top-left, .top-right { font-size: 4.5px; letter-spacing: 1px; }
  .timer { font-size: 45px; letter-spacing: -3px; }
  .hello { font-size: 10px; letter-spacing: 3px; }
  .category { font-size: 7px; letter-spacing: 2.5px; }
  .title-row { gap: 4px; }
  .line { max-width: 21px; }
  .title { font-size: 27px; letter-spacing: 0.5px; }
  .buttons { gap: 4px; margin-top: 18px; }
  .button { min-width: 80px; height: 27px; font-size: 5.5px; }
  .bottom-nav { bottom: 9px; max-width: calc(100vw - 12px); }
  .nav-item { width: 39px; min-width: 39px; }
  .nav-item.active { width: 77px; min-width: 77px; }
  .nav-item.active .nav-label { font-size: 8px; }
}

/* =====================================================
   LANDSCAPE MOBILE
===================================================== */
@media (max-height: 500px) and (max-width: 900px) {
  .main { transform: scale(0.8); }
  .timer { font-size: 100px; }
  .grid { top: 2%; height: 65px; }
  .grid.bottom { bottom: 2%; }
  .bottom { display: none; }
  .bottom-nav { bottom: 7px; transform: translateX(-50%) scale(0.85); }
}

/* =====================================================
   LARGE SCREEN
===================================================== */
@media (min-width: 1600px) {
  .main { width: min(1050px, 70vw); }
  .hello { font-size: 20px; }
  .category { font-size: 15px; }
  .title { font-size: 88px; }
  .timer { font-size: 180px; }
}

/* =====================================================
   REDUCE MOTION
===================================================== */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
