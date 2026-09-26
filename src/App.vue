<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useGitHubContributions } from './composables/useGitHubContributions'

const A = 'var(--accent)'
const D = 'var(--dim)'
const LB = 'var(--line-b)'
const LN = 'var(--line)'
const M = 'var(--mute)'

const mouse = reactive({ x: 0, y: 0 })
const hAbout = ref(false)
const hCv = ref(false)
const activeNav = ref('Home')
const panel = ref<string | null>(null)
const closing = ref(false)
const ms = ref('00')

const digits = ['2', '0', '2', '5']
const tech = ['Flutter', 'Dart', 'Java', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Git']
const exps = [
  {
    year: '2024-Sekarang',
    role: 'Mahasiswa D4 Teknik Informatika',
    company: 'Politeknik Negeri Jember',
    tech: ['Flutter', 'Dart', 'Java', 'MySQL'],
  },
  {
    year: '2024-Sekarang',
    role: 'Ketua Divisi Kominfo',
    company: 'UKM PSHT Politeknik Negeri Jember',
    tech: ['Leadership', 'Publikasi', 'Kominfo'],
  },
  {
    year: '2023-2024',
    role: 'Pemuda Pelopor Bidang Pendidikan',
    company: 'Disparpora Hub Kabupaten Bondowoso',
    tech: ['Pendidikan', 'Pemberdayaan Pemuda', 'Advokasi'],
  },
  {
    year: '2022',
    role: 'Magang Teknik Elektronika Industri',
    company: 'Kantor PDAM Bondowoso',
    tech: ['Elektronika Industri', 'Teknikal', 'Maintenance'],
  },
]
const yearLabels = computed(() => {
    const weeks = contrib.value.length
    if (weeks === 0) return []
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - Math.ceil(weeks / 52)
    const labels = []
    const yearsToShow = Math.min(3, Math.ceil(weeks / 17))
    for (let y = 0; y < yearsToShow; y++) {
      const year = startYear + y
      const start = y * Math.floor(weeks / yearsToShow)
      const end = y === yearsToShow - 1 ? weeks : (y + 1) * Math.floor(weeks / yearsToShow)
      labels.push({ label: String(year), start, end })
    }
    return labels
  })
const mLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const mCols = [0, 4.33, 8.66, 13, 17.33, 21.66, 26, 30.33, 34.66, 39, 43.33, 47.66]
const cCol = [
  'rgba(99,102,241,0.04)',
  'rgba(99,102,241,0.15)',
  'rgba(99,102,241,0.32)',
  'rgba(99,102,241,0.55)',
  'rgba(99,102,241,0.85)',
]

const {
  contributions: githubContributions,
  totalContributions,
  loading: githubLoading,
  error: githubError,
  fetchContributions,
} = useGitHubContributions()

const contrib = computed(() => githubContributions.value.length > 0 ? githubContributions.value : genContrib())

function genContrib(): number[][] {
  const d: number[][] = []
  for (let w = 0; w < 20; w++) {
    const wk: number[] = []
    for (let dd = 0; dd < 7; dd++) {
      const we = dd >= 5
      const b = we ? 0.3 : 0.7
      let lv = Math.floor(Math.random() * 5 * b)
      if (w >= 2 && w <= 5) lv = Math.min(4, lv + 1)
      if (w >= 12 && w <= 16) lv = Math.min(4, lv + 2)
      if (w >= 8 && w <= 10) lv = Math.max(0, lv - 1)
      wk.push(Math.min(4, lv))
    }
    d.push(wk)
  }
  return d
}
const dust = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  s: Math.random() + 0.4,
  d: Math.random() * 14 + 8,
  dl: Math.random() * 5,
  o: Math.random() * 0.1 + 0.02,
}))
const dots = [
  { key: 'tl', x: '5%', y: '4%', delay: 0, s: 3 },
  { key: 'tr', x: '95%', y: '4%', delay: 0.5, s: 3 },
  { key: 'bl', x: '5%', y: '96%', delay: 1, s: 3 },
  { key: 'br', x: '95%', y: '96%', delay: 1.5, s: 3 },
]
const navLinks = [{ name: 'Home' }, { name: 'About' }, { name: 'Project' }, { name: 'Certificate' }]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/saiful-rizal',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/saiful-rizal-8606613ab/',
    icon: 'linkedin',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hai_saifulrizal',
    icon: 'instagram',
  },
]

function onMouseMove(e: MouseEvent) {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 4
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 4
}

const tx = computed(() => `translate(${mouse.x * 0.15}px, ${mouse.y * 0.15}px)`)

const timerStart = Date.now()
let rafId = 0
function tick() {
  const c = Math.floor(((Date.now() - timerStart) % 1000) / 10)
  ms.value = c < 10 ? '0' + c : String(c)
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  cancelAnimationFrame(rafId)
})

function openPanel(p: string) {
  if (closing.value) return
  closing.value = false
  panel.value = p
  activeNav.value = p === 'about' ? 'About' : p.charAt(0).toUpperCase() + p.slice(1)
}

function closePanel() {
  if (closing.value || !panel.value) return
  closing.value = true
  setTimeout(() => {
    panel.value = null
    closing.value = false
    activeNav.value = 'Home'
  }, 300)
}

function handleNav(name: string) {
  if (name === 'Home') {
    closePanel()
  } else if (name === 'About') {
    if (panel.value === 'about') closePanel()
    else openPanel('about')
  } else {
    openPanel(name.toLowerCase())
  }
}

function toggleAbout() {
  if (panel.value === 'about') closePanel()
  else openPanel('about')
}
</script>

<template>
  <div
    style="
      position: relative;
      width: 100vw;
      height: 100vh;
      background: var(--bg);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <!-- Navbar -->
    <nav
      class="nav-float"
      :style="{
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '62px',
        zIndex: 80,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(10,10,12,0.85)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        boxShadow:
          '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 1px 0 rgba(255,255,255,0.05) inset',
        opacity: 0,
        animation: 'navFloatIn 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both',
        minWidth: '380px',
      }"
    >
      <div
        :style="{
          position: 'absolute',
          bottom: '-20px',
          left: '15%',
          right: '15%',
          height: '40px',
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.07) 0%, transparent 70%)',
          animation: 'glowPulse 4s ease-in-out infinite',
          pointerEvents: 'none',
        }"
      />
      <div :style="{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 1rem', gap: '10px' }">
        <a
          v-for="(l, i) in navLinks"
          :key="l.name"
          class="nav-item"
          :class="{ 'nav-item-active': activeNav === l.name }"
          href="#"
          @click.prevent="handleNav(l.name)"
          :style="{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            padding: '10px 0',
            textDecoration: 'none',
            color: activeNav === l.name ? A : D,
            transition: 'color 0.3s ease',
            position: 'relative',
            opacity: 0,
            animation: `navItemIn 0.5s ease ${0.5 + i * 0.1}s both`,
            cursor: 'pointer',
          }"
        >
          <span
            :style="{
              position: 'absolute',
              inset: '4px 10px',
              borderRadius: '12px',
              background: activeNav === l.name ? 'rgba(99,102,241,0.1)' : 'transparent',
              border: activeNav === l.name ? '1px solid rgba(99,102,241,0.12)' : '1px solid transparent',
              transition: 'all 0.3s ease',
            }"
          />
          <span
            class="nav-item-icon"
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '24px',
              transition: 'transform 0.3s ease',
              transform: activeNav === l.name ? 'translateY(-1px)' : 'none',
              position: 'relative',
              zIndex: 1,
            }"
          >
            <svg v-if="l.name === 'Home'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            <svg v-else-if="l.name === 'About'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 1 0-16 0" /><line x1="12" y1="13" x2="12" y2="17" /></svg>
            <svg v-else-if="l.name === 'Project'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
            <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>
          </span>
          <span
            class="nav-item-label"
            :style="{
              fontSize: '9px',
              fontWeight: activeNav === l.name ? 600 : 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              lineHeight: 1,
              transition: 'all 0.3s ease',
              position: 'relative',
              zIndex: 1,
            }"
          >
            {{ l.name }}
          </span>
          <span
            :style="{
              position: 'absolute',
              bottom: '4px',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: A,
              opacity: activeNav === l.name ? 1 : 0,
              transform: activeNav === l.name ? 'scale(1)' : 'scale(0)',
              transition: 'all 0.3s cubic-bezier(0.25,0.1,0.25,1)',
              boxShadow: activeNav === l.name ? '0 0 8px rgba(99,102,241,0.6)' : 'none',
              zIndex: 1,
            }"
          />
        </a>
      </div>
    </nav>

    <!-- About Panel -->
    <div
      v-if="panel === 'about'"
      :style="{
        position: 'fixed',
        inset: '0px',
        zIndex: 70,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        animation: closing ? 'panelBgOut 0.3s cubic-bezier(0.4,0,0.2,1) both' : 'panelBgIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
      }"
      @click="closePanel"
    >
      <div
        class="panel-box panel-scroll"
        :style="{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(94vw,680px)',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'rgba(10,10,12,0.96)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '24px',
          boxShadow: '0 24px 96px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.02) inset',
          padding: 'clamp(32px,6vw,52px)',
          animation: closing
            ? 'panelOut 0.35s cubic-bezier(0.4,0,0.2,1) both'
            : 'panelIn 0.6s cubic-bezier(0.16,1,0.3,1) both',
          cursor: 'default',
          willChange: 'transform, opacity',
        }"
        @click.stop
      >
        <div
          class="close-btn"
          @click="closePanel"
          :style="{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: '1px solid ' + LN,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: D,
            zIndex: 5,
          }"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </div>

        <div
          :style="{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 'clamp(24px,4vh,40px)',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.5s ease 0.05s both',
          }"
        >
          <div
            :style="{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              border: '1.5px solid rgba(99,102,241,0.45)',
              background: 'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(99,102,241,0.03))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              position: 'relative',
            }"
          >
            <span :style="{ fontFamily: `'JetBrains Mono',monospace`, fontSize: '26px', fontWeight: 700, color: A, letterSpacing: '0.04em' }">SR</span>
            <span :style="{ position: 'absolute', inset: '-5px', borderRadius: '50%', border: '1px dashed rgba(99,102,241,0.15)', animation: 'ringRotate 12s linear infinite' }" />
          </div>
          <h2 :style="{ fontSize: 'clamp(20px,4vw,28px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '5px', textAlign: 'center' }">Saiful Rizal</h2>
          <span :style="{ fontSize: 'clamp(10px,1.8vw,14px)', fontWeight: 500, letterSpacing: '0.12em', color: D, textTransform: 'uppercase' }">Junior Web &amp; Mobile Developer</span>
        </div>

        <p
          :style="{
            fontSize: 'clamp(13px,1.8vw,16px)',
            lineHeight: 1.8,
            color: D,
            textAlign: 'center',
            maxWidth: '500px',
            margin: '0 auto clamp(22px,3.5vh,36px)',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.5s ease 0.1s both',
          }"
        >
          Informatics engineering student (D4 Teknik Informatika, Politeknik Negeri Jember) building responsive web & mobile apps with Flutter, Dart, Java, HTML, and CSS. Familiar with VS Code and Android Studio, passionate about clean code and guiding others to understand programming simply.
        </p>

        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: 'clamp(18px,3vh,28px)',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.5s ease 0.15s both',
          }"
        >
          <div :style="{ flex: 1, height: '1px', background: LB }" />
          <span :style="{ fontSize: 'clamp(8px,1.1vw,10px)', fontWeight: 600, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' }">Tech Stack</span>
          <div :style="{ flex: 1, height: '1px', background: LB }" />
        </div>

        <div
          :style="{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center',
            marginBottom: 'clamp(20px,3.5vh,32px)',
          }"
        >
          <span
            v-for="(t, i) in tech"
            :key="t"
            class="tech-pill"
            :style="{
              fontSize: 'clamp(10px,1.3vw,13px)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              padding: 'clamp(6px,1vw,8px) clamp(12px,1.8vw,18px)',
              borderRadius: '22px',
              border: '1px solid ' + LN,
              color: D,
              transition: 'all 0.25s ease',
              cursor: 'default',
              animation: closing ? undefined : `pillIn 0.4s ease ${0.25 + i * 0.05}s both`,
              opacity: closing ? 1 : 0,
            }"
          >
            {{ t }}
          </span>
        </div>

        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: 'clamp(16px,2.5vh,24px)',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.5s ease 0.3s both',
          }"
        >
          <div :style="{ flex: 1, height: '1px', background: LB }" />
          <span :style="{ fontSize: 'clamp(8px,1.1vw,10px)', fontWeight: 600, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' }">GitHub Activity</span>
          <div :style="{ flex: 1, height: '1px', background: LB }" />
        </div>

        <div
          :style="{
            maxWidth: 'min(220px,100%)',
            margin: '0 auto clamp(20px,3.5vh,32px)',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.5s ease 0.35s both',
          }"
        >
          <div
            v-if="githubLoading"
            :style="{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '20px',
            }"
          >
            <div
              :style="{
                width: '20px',
                height: '20px',
                border: '2px solid ' + LN,
                borderTopColor: A,
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }"
            />
            <span :style="{ fontSize: '10px', color: D }">Loading contributions...</span>
          </div>
          <div v-else-if="githubError" :style="{ textAlign: 'center', padding: '16px', color: 'rgba(255,100,100,0.8)', fontSize: '10px' }">
            {{ githubError }}
            <button
              @click="fetchContributions"
              :style="{
                marginTop: '8px',
                padding: '4px 12px',
                fontSize: '9px',
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid ' + A,
                borderRadius: '6px',
                color: A,
                cursor: 'pointer',
              }"
            >
              Retry
            </button>
          </div>
          <template v-else>
            <div :style="{ display: 'flex', justifyContent: 'space-between', padding: '0 2px', marginBottom: '6px' }">
              <span
                v-for="y in yearLabels"
                :key="y.label"
                class="year-label"
                :style="{
                  fontSize: 'clamp(7px,0.9vw,9px)',
                  fontWeight: 600,
                  color: y.start === 0 ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.15)',
                  letterSpacing: '0.05em',
                }"
              >
                {{ y.label }}
              </span>
            </div>
            <div class="month-label" :style="{ position: 'relative', height: '16px', marginBottom: '3px' }">
              <span
                v-for="(col, i) in mCols"
                :key="i"
                :style="{
                  position: 'absolute',
                  left: (col * 5 + 2.5) + '%',
                  fontSize: 'clamp(6px,0.8vw,8px)',
                  color: 'rgba(255,255,255,0.14)',
                  fontWeight: 500,
                  transform: 'translateX(-50%)',
                }"
              >
                {{ mLabels[i] }}
              </span>
            </div>
<div
              :style="{
                display: 'grid',
                gridTemplateColumns: `repeat(${contrib.length}, 1fr)`,
                gap: '1.5px',
                transition: 'opacity 0.3s ease',
              }"
            >
              <div
                v-for="(lv, i) in contrib.flat()"
                :key="i"
                class="contrib-cell"
                :title="lv + ' contributions'"
                :style="{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '1.5px',
                  background: cCol[lv],
                  animation: closing ? undefined : `cellPop 0.2s cubic-bezier(0.16,1,0.3,1) ${0.4 + i * 0.003}s both`,
                  opacity: closing ? 1 : 0,
                  transform: closing ? undefined : 'scale(0)',
                  transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
                }"
                @mouseenter="($event.target as HTMLElement).style.transform = 'scale(1.5)'"
                @mouseleave="($event.target as HTMLElement).style.transform = 'scale(1)'"
              />
            </div>
            <div :style="{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '6px', justifyContent: 'flex-end' }">
              <span :style="{ fontSize: 'clamp(6px,0.8vw,8px)', color: 'rgba(255,255,255,0.14)' }">Less</span>
              <div v-for="c in cCol" :key="c" :style="{ width: '6px', height: '6px', borderRadius: '1.5px', border: c }" />
              <span :style="{ fontSize: 'clamp(6px,0.8vw,8px)', color: 'rgba(255,255,255,0.14)' }">More</span>
            </div>
            <div
              :style="{
                marginTop: '10px',
                textAlign: 'right',
                fontSize: 'clamp(9px,1.1vw,11px)',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: `'JetBrains Mono',monospace`,
              }"
            >
              {{ totalContributions }} total contributions
            </div>
          </template>
        </div>

        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: 'clamp(18px,3vh,28px)',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.5s ease 0.4s both',
          }"
        >
          <div :style="{ flex: 1, height: '1px', background: LB }" />
          <span :style="{ fontSize: 'clamp(8px,1.1vw,10px)', fontWeight: 600, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' }">Experience</span>
          <div :style="{ flex: 1, height: '1px', background: LB }" />
        </div>

        <div :style="{ marginBottom: 'clamp(20px,3.5vh,32px)' }">
          <div
            v-for="(ex, i) in exps"
            :key="i"
            :style="{
              position: 'relative',
              paddingLeft: '24px',
              paddingBottom: i < exps.length - 1 ? 'clamp(18px,2.5vh,26px)' : '0',
              animation: closing ? undefined : `expIn 0.5s ease ${0.45 + i * 0.15}s both`,
              opacity: closing ? 1 : 0,
            }"
          >
            <div v-if="i < exps.length - 1" :style="{ position: 'absolute', left: '4px', top: '11px', bottom: '0px', width: '1px', background: LN }" />
            <div :style="{ position: 'absolute', left: '0px', top: '4px', width: '10px', height: '10px', borderRadius: '50%', border: '1.5px solid ' + (i === 0 ? A : LN), background: i === 0 ? 'rgba(99,102,241,0.2)' : 'transparent' }" />
            <div :style="{ animation: closing ? undefined : `numIn 0.35s ease ${0.5 + i * 0.15}s both`, opacity: closing ? 1 : 0 }">
              <span :style="{ fontFamily: `'JetBrains Mono',monospace`, fontSize: 'clamp(10px,1.3vw,12px)', fontWeight: 600, color: A, letterSpacing: '0.06em' }">{{ ex.year }}</span>
            </div>
            <div class="exp-role" :style="{ fontSize: 'clamp(14px,2vw,18px)', fontWeight: 600, marginTop: '2px', letterSpacing: '-0.01em' }">{{ ex.role }}</div>
            <div class="exp-company" :style="{ fontSize: 'clamp(11px,1.4vw,14px)', color: D, marginTop: '1px' }">{{ ex.company }}</div>
            <div :style="{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }">
              <span
                v-for="t in ex.tech"
                :key="t"
                class="exp-tech"
                :style="{ fontSize: 'clamp(8px,1vw,10px)', padding: '2px 10px', borderRadius: '10px', border: '1px solid ' + LN, color: 'rgba(255,255,255,0.25)', fontWeight: 500 }"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>

        <a
          href="https://github.com/saiful-rizal"
          target="_blank"
          rel="noopener noreferrer"
          class="gh-link"
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 24px',
            borderRadius: '12px',
            border: '1px solid ' + LN,
            textDecoration: 'none',
            color: D,
            fontSize: 'clamp(11px,1.4vw,14px)',
            fontWeight: 500,
            letterSpacing: '0.05em',
            transition: 'all 0.25s ease',
            marginBottom: '20px',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.5s ease 0.9s both',
          }"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.65.945 1.8 1.875 1.08 3.465 2.805 2.46 4.575-.105 1.08-.81 2.265-1.65 2.76.42.36.81 1.096.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
          github.com/saiful-rizal
        </a>

        <!-- Social Icons (dengan animasi socialIn staggered) -->
        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: 'clamp(20px,3vh,28px)',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.5s ease 1s both',
          }"
        >
          <a
            v-for="(s, i) in socialLinks"
            :key="s.label"
            class="social-icon"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :title="s.label"
            :style="{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              border: '1px solid ' + LN,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: D,
              transition: 'all 0.25s ease',
              opacity: closing ? 1 : 0,
              animation: closing ? undefined : `socialIn 0.4s ease ${1.05 + i * 0.1}s both`,
            }"
          >
            <!-- GitHub -->
            <svg v-if="s.icon === 'github'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.65.945 1.8 1.875 1.08 3.465 2.805 2.46 4.575-.105 1.08-.81 2.265-1.65 2.76.42.36.81 1.096.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
            <!-- LinkedIn (FIXED: path yang benar) -->
            <svg v-else-if="s.icon === 'linkedin'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            <!-- Instagram (FIXED: hapus line ekstra) -->
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
        </div>

        <div
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            opacity: closing ? 1 : 0,
            animation: closing ? undefined : 'fadeUp 0.4s ease 1.1s both',
          }"
        >
          <div :style="{ width: '16px', height: '1px', background: LN }" />
          <span :style="{ fontSize: 'clamp(6px,0.8vw,8px)', fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase' }">Developer</span>
          <div :style="{ width: '3px', height: '3px', borderRadius: '50%', background: A, opacity: 0.5 }" />
          <span :style="{ fontSize: 'clamp(6px,0.8vw,8px)', fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase' }">Portfolio</span>
          <div :style="{ width: '16px', height: '1px', background: LN }" />
        </div>
      </div>
    </div>

    <!-- Project Panel -->
    <div
      v-if="panel === 'project'"
      :style="{
        position: 'fixed',
        inset: '0px',
        zIndex: 70,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: closing ? 'panelBgOut 0.25s ease both' : 'panelBgIn 0.25s ease both',
      }"
      @click="closePanel"
    >
      <div
        :style="{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(75vw,340px)',
          background: 'rgba(12,12,14,0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '18px',
          boxShadow: '0 16px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset',
          padding: 'clamp(24px,5vw,40px)',
          textAlign: 'center',
          animation: closing ? 'panelOut 0.3s cubic-bezier(0.4,0,0.2,1) both' : 'panelIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
          cursor: 'default',
        }"
        @click.stop
      >
        <div
          class="close-btn"
          @click="closePanel"
          :style="{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '26px',
            height: '26px',
            borderRadius: '7px',
            border: '1px solid ' + LN,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: D,
          }"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </div>
        <div :style="{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid ' + LN, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: A, opacity: closing ? 1 : 0, animation: closing ? undefined : 'fadeUp 0.4s ease 0.15s both' }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
        </div>
        <h2 :style="{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px', opacity: closing ? 1 : 0, animation: closing ? undefined : 'fadeUp 0.4s ease 0.25s both' }">Project</h2>
        <p :style="{ fontSize: '11px', lineHeight: 1.6, color: D, maxWidth: '240px', margin: '0 auto', opacity: closing ? 1 : 0, animation: closing ? undefined : 'fadeUp 0.4s ease 0.35s both' }">Selected projects will be displayed here. Currently under curation.</p>
        <div :style="{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '16px', padding: '5px 14px', borderRadius: '16px', border: '1px dashed ' + LN, opacity: closing ? 1 : 0, animation: closing ? undefined : 'fadeUp 0.4s ease 0.45s both' }">
          <div :style="{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(99,102,241,0.3)' }" />
          <span :style="{ fontSize: '8px', fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }">Coming Soon</span>
        </div>
      </div>
    </div>

    <!-- Certificate Panel -->
    <div
      v-if="panel === 'certificate'"
      :style="{
        position: 'fixed',
        inset: '0px',
        zIndex: 70,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: closing ? 'panelBgOut 0.25s ease both' : 'panelBgIn 0.25s ease both',
      }"
      @click="closePanel"
    >
      <div
        :style="{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(75vw,340px)',
          background: 'rgba(12,12,14,0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '18px',
          boxShadow: '0 16px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset',
          padding: 'clamp(24px,5vw,40px)',
          textAlign: 'center',
          animation: closing ? 'panelOut 0.3s cubic-bezier(0.4,0,0.2,1) both' : 'panelIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
          cursor: 'default',
        }"
        @click.stop
      >
        <div
          class="close-btn"
          @click="closePanel"
          :style="{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '26px',
            height: '26px',
            borderRadius: '7px',
            border: '1px solid ' + LN,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            color: D,
          }"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </div>
        <div :style="{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid ' + LN, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: A, opacity: closing ? 1 : 0, animation: closing ? undefined : 'fadeUp 0.4s ease 0.15s both' }">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></svg>
        </div>
        <h2 :style="{ fontSize: '16px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '6px', opacity: closing ? 1 : 0, animation: closing ? undefined : 'fadeUp 0.4s ease 0.25s both' }">Certificate</h2>
        <p :style="{ fontSize: '11px', lineHeight: 1.6, color: D, maxWidth: '240px', margin: '0 auto', opacity: closing ? 1 : 0, animation: closing ? undefined : 'fadeUp 0.4s ease 0.35s both' }">Professional certificates will be listed here.</p>
        <div :style="{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '16px', padding: '5px 14px', borderRadius: '16px', border: '1px dashed ' + LN, opacity: closing ? 1 : 0, animation: closing ? undefined : 'fadeUp 0.4s ease 0.45s both' }">
          <div :style="{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(99,102,241,0.3)' }" />
          <span :style="{ fontSize: '8px', fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }">Coming Soon</span>
        </div>
      </div>
    </div>

    <!-- Decorative grid & frame -->
    <div :style="{ position: 'absolute', inset: '0px', display: 'grid', gridTemplateRows: 'repeat(6,1fr)', gridTemplateColumns: 'repeat(8,1fr)', animation: 'gridIn 2.5s ease 0.3s both', opacity: 0, pointerEvents: 'none' }">
      <div
        v-for="i in 48"
        :key="i"
        :style="{
          borderRight: (i - 1) % 8 !== 7 ? '1px solid ' + LN : 'none',
          borderBottom: i - 1 < 40 ? '1px solid ' + LN : 'none',
        }"
      />
    </div>
    <div :style="{ position: 'absolute', top: '4%', left: '5%', width: '90%', height: '1px', background: LB, transformOrigin: 'left', animation: 'drawH 1.6s cubic-bezier(0.25,0.1,0.25,1) 0.4s both' }" />
    <div :style="{ position: 'absolute', bottom: '4%', left: '5%', width: '90%', height: '1px', background: LB, transformOrigin: 'left', animation: 'drawH 1.6s cubic-bezier(0.25,0.1,0.25,1) 0.5s both' }" />
    <div :style="{ position: 'absolute', left: '5%', top: '4%', height: '92%', width: '1px', background: LN, transformOrigin: 'top', animation: 'drawV 1.6s cubic-bezier(0.25,0.1,0.25,1) 0.6s both' }" />
    <div :style="{ position: 'absolute', right: '5%', top: '4%', height: '92%', width: '1px', background: LN, transformOrigin: 'top', animation: 'drawV 1.6s cubic-bezier(0.25,0.1,0.25,1) 0.7s both' }" />
    <div
      v-for="d in dots"
      :key="d.key"
      :style="{
        position: 'absolute',
        left: `${d.x}%`,
        top: `${d.y}%`,
        width: `${d.s}px`,
        height: `${d.s}px`,
        borderRadius: '50%',
        background: A,
        transform: 'translate(-50%,-50%)',
        animation: `dotBeat 4s ease-in-out ${d.delay}s infinite`,
      }"
    />
    <div :style="{ position: 'absolute', top: '4%', left: '5%', width: '90%', height: '92%', pointerEvents: 'none' }">
      <div class="corner" :style="{ position: 'absolute', top: '0px', left: '0px', width: '30px', height: '30px', borderTop: '1px solid ' + LB, borderLeft: '1px solid ' + LB, opacity: 0, animation: 'fadeUp 0.8s ease 1.1s both' }" />
      <div class="corner" :style="{ position: 'absolute', top: '0px', right: '0px', width: '30px', height: '30px', borderTop: '1px solid ' + LB, borderRight: '1px solid ' + LB, opacity: 0, animation: 'fadeUp 0.8s ease 1.25s both' }" />
      <div class="corner" :style="{ position: 'absolute', bottom: '0px', left: '0px', width: '30px', height: '30px', borderBottom: '1px solid ' + LB, borderLeft: '1px solid ' + LB, opacity: 0, animation: 'fadeUp 0.8s ease 1.4s both' }" />
      <div class="corner" :style="{ position: 'absolute', bottom: '0px', right: '0px', width: '30px', height: '30px', borderBottom: '1px solid ' + LB, borderRight: '1px solid ' + LB, opacity: 0, animation: 'fadeUp 0.8s ease 1.55s both' }" />
    </div>

    <!-- Hero -->
    <div
      :style="{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: tx,
        transition: 'transform 0.4s cubic-bezier(0.25,0.1,0.25,1)',
        paddingTop: 'clamp(16px,4vh,40px)',
        paddingBottom: '20px',
      }"
    >
      <div :style="{ marginBottom: 'clamp(16px,2.8vh,30px)' }">
        <div :style="{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 0, animation: 'fadeDown 0.8s ease 0.3s both' }">
          <template v-for="(ch, i) in digits" :key="i">
            <span
              v-if="i === 2"
              class="sw-colon"
              :style="{
                fontFamily: `'JetBrains Mono',monospace`,
                fontSize: '30px',
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                marginLeft: '2px',
                marginRight: '2px',
                animation: 'colonBlink 1.2s step-end infinite, fadeUp 0.6s ease ' + (0.3 + i * 0.12) + 's both',
                opacity: 0,
              }"
            >
              :
            </span>
            <span
              class="sw-digit"
              :style="{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '46px',
                height: '58px',
                border: '1px solid ' + LB,
                borderRadius: '6px',
                fontFamily: `'JetBrains Mono',monospace`,
                fontWeight: 500,
                fontSize: '30px',
                letterSpacing: '0.01em',
                color: 'var(--text)',
                background: 'rgba(255,255,255,0.015)',
                overflow: 'hidden',
                position: 'relative',
                opacity: 0,
                animation: 'fadeUp 0.6s ease ' + (0.3 + i * 0.12) + 's both',
              }"
            >
              <span
                :style="{
                  display: 'inline-block',
                  animation: `digitRoll 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s both`,
                  transform: 'translateY(-100%)',
                }"
              >
                {{ ch }}
              </span>
            </span>
          </template>
          <span
            class="sw-ms"
            :style="{
              fontFamily: `'JetBrains Mono',monospace`,
              fontWeight: 400,
              fontSize: '18px',
              color: D,
              marginLeft: '4px',
              animation: 'msFlicker 0.8s step-end infinite, fadeUp 0.6s ease ' + (0.3 + digits.length * 0.12 + 0.3) + 's both',
              opacity: 0,
            }"
          >
            .{{ ms }}
          </span>
        </div>
      </div>
      <div :style="{ width: '28px', height: '1px', background: A, marginBottom: 'clamp(12px,2vh,20px)', opacity: 0, animation: 'fadeUp 0.6s ease 0.8s both' }" />
      <div :style="{ opacity: 0, animation: 'fadeUp 0.8s ease 0.9s both', marginBottom: 'clamp(10px,1.6vh,18px)' }">
        <span class="label-sm" :style="{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.3em', color: D, textTransform: 'uppercase' }">DEVELOPER</span>
      </div>
      <div :style="{ opacity: 0, animation: 'fadeUp 0.8s ease 1s both', marginBottom: 'clamp(3px,0.5vh,6px)' }">
        <span class="name-hello" :style="{ fontSize: 'clamp(12px,1.8vw,16px)', fontWeight: 400, letterSpacing: '0.05em', color: D }">Hello, I am</span>
      </div>
      <div :style="{ display: 'flex', alignItems: 'center', gap: 'clamp(8px,1.2vw,18px)', opacity: 0, animation: 'fadeUp 0.6s ease 1.05s both' }">
        <span class="tag-sym" :style="{ fontFamily: `'JetBrains Mono',monospace`, fontWeight: 300, fontSize: 'clamp(18px,3.5vw,38px)', color: A, lineHeight: 1, userSelect: 'none', animation: 'tagInL 0.8s ease 1.15s both', opacity: 0 }">&lt;</span>
        <h1 class="name-main" :style="{ fontSize: 'clamp(30px,7vw,100px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.95, textAlign: 'center', textTransform: 'uppercase', color: 'var(--text)', margin: 0, animation: 'clipIn 1.3s cubic-bezier(0.77,0,0.175,1) 1.1s both, subtleFloat 7s ease-in-out 3s infinite' }">Saiful Rizal</h1>
        <span class="tag-sym" :style="{ fontFamily: `'JetBrains Mono',monospace`, fontWeight: 300, fontSize: 'clamp(18px,3.5vw,38px)', color: A, lineHeight: 1, userSelect: 'none', animation: 'tagInR 0.8s ease 1.15s both', opacity: 0 }">/&gt;</span>
      </div>
      <div :style="{ opacity: 0, animation: 'typeIn 1s ease 1.35s both', marginTop: 'clamp(12px,2vh,22px)', maxWidth: '500px', textAlign: 'center', padding: '0 1.2rem' }">
        <p class="desc-text" :style="{ fontSize: 'clamp(11px,1.3vw,14px)', fontWeight: 400, lineHeight: 1.9, color: D, letterSpacing: '0.01em', margin: 0 }">
          Building efficient, modern, and impactful digital systems as a Junior Web &amp; Mobile Developer.
          <span
            :style="{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: A,
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
              animation: 'cursorBlink 1s step-end infinite, fadeUp 0.4s ease 2s both',
              opacity: 0,
              borderRadius: '1px',
            }"
          />
        </p>
      </div>
      <div class="btn-row" :style="{ display: 'flex', gap: '12px', marginTop: 'clamp(14px,2.2vh,26px)' }">
        <a
          href="#"
          class="btn-about"
          @click.prevent="toggleAbout"
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '11px 28px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: hAbout ? 'var(--text)' : D,
            background: hAbout ? 'rgba(255,255,255,0.04)' : 'transparent',
            border: '1px solid ' + (hAbout ? 'var(--dim)' : LB),
            borderRadius: '6px',
            cursor: 'pointer',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'all 0.25s ease',
            opacity: 0,
            animation: 'btnIn 0.5s ease 1.5s both',
            transform: hAbout ? 'translateY(-2px)' : 'translateY(0)',
          }"
          @mouseenter="hAbout = true"
          @mouseleave="hAbout = false"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
          About
        </a>
        <a
          href="/cv.pdf"
          download
          class="btn-cv"
          :style="{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '11px 28px',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            color: '#fff',
            background: hCv ? '#5558e6' : 'var(--accent)',
            border: '1px solid ' + (hCv ? '#5558e6' : 'var(--accent)'),
            borderRadius: '6px',
            cursor: 'pointer',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'all 0.25s ease',
            opacity: 0,
            animation: 'btnIn 0.5s ease 1.65s both',
            transform: hCv ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: hCv ? '0 6px 24px rgba(99,102,241,0.3)' : 'none',
          }"
          @mouseenter="hCv = true"
          @mouseleave="hCv = false"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
          Download CV
        </a>
      </div>
      <div :style="{ display: 'flex', alignItems: 'center', gap: '7px', marginTop: 'clamp(14px,2.2vh,22px)', opacity: 0, animation: 'fadeUp 0.8s ease 1.7s both' }">
        <div :style="{ width: '18px', height: '1px', background: LB }" />
        <div :style="{ width: '3px', height: '3px', borderRadius: '50%', background: A, animation: 'dotBeat 3s ease-in-out infinite' }" />
        <div :style="{ width: '36px', height: '1px', background: LB }" />
        <div :style="{ width: '2px', height: '2px', borderRadius: '50%', border: '1px solid ' + M }" />
        <div :style="{ width: '18px', height: '1px', background: LB }" />
      </div>
      <div :style="{ opacity: 0, animation: 'clipIn 1s cubic-bezier(0.77,0,0.175,1) 1.8s both', marginTop: 'clamp(8px,1.4vh,14px)' }">
        <span class="port-text" :style="{ fontSize: 'clamp(16px,3.2vw,40px)', fontWeight: 300, letterSpacing: '0.2em', color: 'var(--text)', textTransform: 'uppercase' }">Portfolio</span>
      </div>
      <div :style="{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginTop: 'clamp(12px,2vh,22px)', opacity: 0, animation: 'fadeUp 0.8s ease 2s both' }">
        <div :style="{ width: '1px', height: '16px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }" />
        <span class="foot-sm" :style="{ fontSize: '7px', fontWeight: 600, letterSpacing: '0.28em', color: D, textTransform: 'uppercase' }">SELECTED PROJECT</span>
        <div :style="{ display: 'flex', gap: '4px', marginTop: '1px' }">
          <div v-for="i in 5" :key="i" :style="{ width: '2px', height: '2px', borderRadius: '50%', background: i === 3 ? A : M, animation: 'breathe 2.5s ease ' + (i - 1) * 0.3 + 's infinite' }" />
        </div>
      </div>
    </div>

    <!-- Dust particles -->
    <div :style="{ position: 'absolute', inset: '0px', pointerEvents: 'none', zIndex: 1 }">
      <div
        v-for="p in dust"
        :key="p.id"
        :style="{
          position: 'absolute',
          left: p.x + '%',
          top: p.y + '%',
          width: `${p.s}px`,
          height: `${p.s}px`,
          borderRadius: '50%',
          background: p.id % 3 === 0 ? A : 'var(--text)',
          opacity: p.o,
          animation: `breathe ${p.d}s ease-in-out ${p.dl}s infinite`,
        }"
      />
    </div>

    <!-- Vignette -->
    <div
      :style="{
        position: 'absolute',
        inset: '0px',
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)',
        pointerEvents: 'none',
        zIndex: 5,
      }"
    />
  </div>
</template>

<style>
.close-btn:hover {
  border-color: var(--text) !important;
  color: var(--text) !important;
}

.tech-pill:hover {
  border-color: rgba(99, 102, 241, 0.45) !important;
  color: var(--accent) !important;
  background: rgba(99, 102, 241, 0.08) !important;
}

.gh-link:hover {
  border-color: rgba(99, 102, 241, 0.4) !important;
  color: var(--accent) !important;
  background: rgba(99, 102, 241, 0.04) !important;
}

.social-icon:hover {
  border-color: rgba(99, 102, 241, 0.4) !important;
  color: var(--accent) !important;
  background: rgba(99, 102, 241, 0.06) !important;
  transform: translateY(-2px) !important;
}

.nav-item:not(.nav-item-active):hover {
  color: var(--text) !important;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.contrib-cell {
  transition: transform 0.15s cubic-bezier(0.16,1,0.3,1), background 0.2s ease, box-shadow 0.2s ease;
}

.contrib-cell:hover {
  transform: scale(1.4) !important;
  z-index: 10;
  box-shadow: 0 0 12px rgba(99,102,241,0.6);
}

.panel-box {
  transition: box-shadow 0.3s cubic-bezier(0.16,1,0.3,1);
}

.nav-item {
  transition: color 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.2s cubic-bezier(0.16,1,0.3,1) !important;
}

.nav-item:not(.nav-item-active):hover {
  color: var(--text) !important;
  transform: translateY(-2px);
}

.gh-link, .social-icon, .tech-pill, .btn-about, .btn-cv, .close-btn {
  transition: all 0.25s cubic-bezier(0.16,1,0.3,1) !important;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.contrib-cell {
  transition: transform 0.15s cubic-bezier(0.16,1,0.3,1), background 0.2s ease, box-shadow 0.2s ease;
}

.contrib-cell:hover {
  transform: scale(1.4) !important;
  z-index: 10;
  box-shadow: 0 0 12px rgba(99,102,241,0.6);
}

.panel-box {
  transition: box-shadow 0.3s cubic-bezier(0.16,1,0.3,1);
}

.nav-item {
  transition: color 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.2s cubic-bezier(0.16,1,0.3,1) !important;
}

@keyframes panelBgIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes panelBgOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes panelIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

@keyframes panelOut {
  from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  to { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes cellPop {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes pillIn {
  from { opacity: 0; transform: translateY(8px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes expIn {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes numIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes socialIn {
  from { opacity: 0; transform: translateY(8px) scale(0.8); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes btnIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes tagInL {
  from { opacity: 0; transform: translateX(-16px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes tagInR {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes clipIn {
  from { opacity: 0; clip-path: inset(0 100% 0 0); }
  to { opacity: 1; clip-path: inset(0 0 0 0); }
}

@keyframes typeIn {
  from { opacity: 0; clip-path: inset(0 100% 0 0); }
  to { opacity: 1; clip-path: inset(0 0 0 0); }
}

@keyframes navFloatIn {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes navItemIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gridIn {
  from { opacity: 0; transform: scale(1.1); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes drawH {
  from { transform-origin: left; transform: scaleX(0); }
  to { transform-origin: left; transform: scaleX(1); }
}

@keyframes drawV {
  from { transform-origin: top; transform: scaleY(0); }
  to { transform-origin: top; transform: scaleY(1); }
}

@keyframes dotBeat {
  0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes colonBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@keyframes digitRoll {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

@keyframes msFlicker {
  0%, 90% { opacity: 1; }
  91%, 100% { opacity: 0.3; }
}

@keyframes subtleFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.nav-float {
  will-change: transform, opacity;
}

.panel-box {
  will-change: transform, opacity, box-shadow;
}

.contrib-cell {
  will-change: transform;
}

.social-icon, .tech-pill, .nav-item, .btn-about, .btn-cv {
  will-change: transform;
}
</style>









































































































































































































































































