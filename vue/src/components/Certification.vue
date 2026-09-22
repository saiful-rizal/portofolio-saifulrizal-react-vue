<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["navigate"]);
defineProps({ active: { type: String, default: "certification" } });

const filter = ref("Semua");
const filters = ["Semua", "Cloud", "Web", "Mobile"];

const certs = [
  { init: "AWS", title: "Cloud Practitioner", issuer: "Amazon Web Services", year: "2025", id: "AWS-9K42-X1", cat: "Cloud", grad: "linear-gradient(135deg,#4d3a2b,#1a1410)" },
  { init: "FE", title: "Front-End Expert", issuer: "Dicoding Indonesia", year: "2024", id: "DCD-FE-2204", cat: "Web", grad: "linear-gradient(135deg,#2b3a4d,#101820)" },
  { init: "FL", title: "Flutter Developer", issuer: "Google / Udemy", year: "2024", id: "FLT-88Q2-MB", cat: "Mobile", grad: "linear-gradient(135deg,#2b4d3f,#101a14)" },
  { init: "LV", title: "Laravel Backend Pro", issuer: "BuildWithAngga", year: "2023", id: "BWA-LV-1031", cat: "Web", grad: "linear-gradient(135deg,#4d2b3a,#1a1014)" },
  { init: "AZ", title: "Azure Fundamentals AZ-900", issuer: "Microsoft", year: "2025", id: "MS-AZ-7734", cat: "Cloud", grad: "linear-gradient(135deg,#2b3f4d,#0f161c)" },
];

const shown = computed(() =>
  filter.value === "Semua" ? certs : certs.filter((c) => c.cat === filter.value)
);

const go = (tab) => emit("navigate", tab);
</script>

<template>
  <div class="profile-page">
    <div class="profile-card">
      <span class="pcorner tl" /><span class="pcorner tr" />
      <span class="pcorner bl" /><span class="pcorner br" />

      <p class="x-eyebrow">KREDENSIAL</p>
      <h1 class="x-title">Certification</h1>
      <p class="x-sub">Sertifikasi terverifikasi yang mendukung keahlian web, mobile, dan cloud.</p>

      <div class="x-filters">
        <button v-for="f in filters" :key="f" class="x-chip" :class="{ on: filter === f }" @click="filter = f">{{ f }}</button>
      </div>

      <div class="ct-list">
        <div v-for="c in shown" :key="c.id" class="ct-card">
          <div class="ct-logo" :style="{ background: c.grad }">{{ c.init }}</div>
          <div class="ct-body">
            <h3>{{ c.title }}</h3>
            <p class="ct-issuer">{{ c.issuer }} · {{ c.year }}</p>
            <p class="ct-id">ID: {{ c.id }}</p>
          </div>
          <a href="#" class="ct-btn" @click.prevent>Lihat ↗</a>
        </div>
      </div>

      <div class="ct-cta">
        <div>
          <b>Butuh CV lengkap?</b>
          <span>Unduh versi PDF dengan seluruh riwayat & portofolio.</span>
        </div>
        <a href="#" class="ct-dl" @click.prevent>Unduh CV</a>
      </div>

      <p class="p-copy">© 2026 YANUAR ARDHIKA, S.Tr.Kom.</p>
    </div>

    <nav class="p-nav" aria-label="Navigasi utama">
      <button class="p-nav-item" :class="{ active: active === 'home' }" @click="go('home')" aria-label="Beranda">
        <svg viewBox="0 0 24 24"><path d="M12 3 3 10.5V21h6v-6h6v6h6V10.5L12 3Z" fill="currentColor"/></svg>
      </button>
      <button class="p-nav-item" :class="{ active: active === 'about' }" @click="go('about')" aria-label="Tentang">
        <svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0v1H5v-1Z" fill="currentColor"/></svg>
      </button>
      <button class="p-nav-item" :class="{ active: active === 'project' }" @click="go('project')" aria-label="Project">
        <svg viewBox="0 0 24 24"><path d="M4 5h6l2 2h8v11H4V5Zm0 5h16v2H4v-2Z" fill="currentColor"/></svg>
      </button>
      <button class="p-nav-item" :class="{ active: active === 'achievement' }" @click="go('achievement')" aria-label="Achievement">
        <svg viewBox="0 0 24 24"><path d="M6 3h12v5a6 6 0 0 1-4 5.65V16h3v2H7v-2h3v-2.35A6 6 0 0 1 6 8V3Zm-2 2H2v2a4 4 0 0 0 4 4V9H4V5Zm16 0h-2v4h-2v2a4 4 0 0 0 4-4V5ZM9 20h6v2H9v-2Z" fill="currentColor"/></svg>
      </button>
      <button class="p-nav-item wide" :class="{ active: active === 'certification' }" @click="go('certification')">
        <svg viewBox="0 0 24 24"><path d="M4 4h7v16H4V4Zm11 0h5v16h-5V4ZM12 4v16" stroke="currentColor" stroke-width="1.8" fill="none"/></svg>
        <span>Certification</span>
      </button>
    </nav>
  </div>
</template>

<style>
.profile-page{min-height:100vh;min-height:100dvh;width:100%;background:#090909;color:#e8e8e8;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;display:flex;flex-direction:column;align-items:center;padding:28px 14px 110px;box-sizing:border-box}
.profile-card{position:relative;width:min(94vw,740px);background-color:#141414;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:16px 16px;border:1px solid rgba(255,255,255,.28);border-radius:16px;padding:34px 30px 22px;box-sizing:border-box;text-align:center}
.pcorner{position:absolute;width:16px;height:16px;opacity:.85}
.pcorner::before,.pcorner::after{content:"";position:absolute;background:#fff}
.pcorner::before{width:100%;height:2px}
.pcorner.tl::before,.pcorner.tr::before{top:0}
.pcorner.bl::before,.pcorner.br::before{bottom:0}
.pcorner::after{width:2px;height:100%}
.pcorner.tl::after,.pcorner.bl::after{left:0}
.pcorner.tr::after,.pcorner.br::after{right:0}
.pcorner.tl{top:10px;left:10px}.pcorner.tr{top:10px;right:10px}.pcorner.bl{bottom:10px;left:10px}.pcorner.br{bottom:10px;right:10px}
.x-eyebrow{font-size:10px;letter-spacing:3px;color:#888;margin:0 0 8px}
.x-title{font-size:22px;font-weight:800;color:#fff;margin:0 0 8px}
.x-sub{font-size:11px;line-height:1.7;color:#a0a0a0;max-width:520px;margin:0 auto 16px}
.x-filters{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:18px}
.x-chip{background:transparent;color:#cfcfcf;border:1px solid rgba(255,255,255,.25);border-radius:999px;font-family:inherit;font-size:10.5px;font-weight:700;padding:7px 16px;cursor:pointer;transition:all .2s}
.x-chip.on{background:#fff;color:#111;border-color:#fff}
.x-chip:hover{border-color:#fff;color:#fff}.x-chip.on:hover{color:#111}
.ct-list{display:flex;flex-direction:column;gap:10px;text-align:left}
.ct-card{display:flex;align-items:center;gap:13px;background:#0d0d0d;border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:13px 14px;transition:border-color .2s,transform .2s}
.ct-card:hover{border-color:rgba(255,255,255,.35);transform:translateY(-2px)}
.ct-logo{flex-shrink:0;width:52px;height:52px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;color:#fff;border:1px solid rgba(255,255,255,.15)}
.ct-body{flex:1;min-width:0}
.ct-body h3{font-size:12.5px;font-weight:800;color:#fff;margin:0 0 3px}
.ct-issuer{font-size:10.5px;color:#cfcfcf;margin:0 0 2px}
.ct-id{font-size:9.5px;color:#777;margin:0}
.ct-btn{flex-shrink:0;font-size:10px;font-weight:700;color:#111;background:#fff;border-radius:7px;padding:8px 13px;text-decoration:none}
.ct-btn:hover{box-shadow:0 4px 16px rgba(255,255,255,.2)}
.ct-cta{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:16px;background:#0d0d0d;border:1px dashed rgba(255,255,255,.3);border-radius:12px;padding:14px 15px;text-align:left}
.ct-cta b{display:block;font-size:12px;color:#fff;margin-bottom:3px}
.ct-cta span{font-size:10.5px;color:#9a9a9a}
.ct-dl{flex-shrink:0;font-size:10.5px;font-weight:700;color:#fff;border:1px solid rgba(255,255,255,.35);border-radius:8px;padding:9px 15px;text-decoration:none}
.ct-dl:hover{background:rgba(255,255,255,.1)}
.p-copy{font-size:10px;color:#555;margin:16px 0 0}
.p-nav{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:4px;background:rgba(22,22,22,.92);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:6px;z-index:60;backdrop-filter:blur(12px)}
.p-nav-item{border:none;background:transparent;color:#cfcfcf;cursor:pointer;min-width:44px;min-height:44px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:7px;font-family:inherit;font-size:11px;font-weight:700;padding:8px 10px;transition:background .2s,color .2s}
.p-nav-item svg{width:17px;height:17px}
.p-nav-item.wide{padding:8px 16px}
.p-nav-item.active{background:#333;color:#fff}
.p-nav-item:hover{background:rgba(255,255,255,.1);color:#fff}
@media(max-width:560px){.profile-card{padding:26px 16px 18px}.x-title{font-size:18px}.ct-cta{flex-direction:column;align-items:stretch;text-align:center}}
@media(prefers-reduced-motion:reduce){*{transition-duration:.01ms!important}}
</style>
