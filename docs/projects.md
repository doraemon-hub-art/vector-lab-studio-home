---
layout: page
title: 个人项目
---

<script setup>
import { ref, onMounted } from 'vue'

// 加一个项目 = 在下面数组里加一行；desc 是简述，os 是支持的系统，repo 用来读 GitHub Releases
const projects = [
  {
    name: 'more-effective-intrans',
    link: '/projects/more-effective-intrans',
    desc: '一个轻量的拼音转英文翻译器。',
    os: 'Linux（X11）',
    repo: 'doraemon-hub-art/more-effective-intrans'
  }
]

// 每个项目的 Release：{ version, date } 或 { failed: true }
const releases = ref({})

// 进页面时逐个抓最新 Release：tag_name 即版本，published_at 即更新时间
onMounted(() => {
  projects.forEach(async (p) => {
    try {
      const res = await fetch(`https://api.github.com/repos/${p.repo}/releases/latest`)
      if (!res.ok) throw new Error(String(res.status))
      const release = await res.json()
      releases.value[p.name] = {
        version: release.tag_name || '',
        date: formatDate(release.published_at || release.created_at)
      }
    } catch {
      releases.value[p.name] = { failed: true }
    }
  })
})

// ISO 时间 -> YYYY-MM-DD（按东八区）
function formatDate(iso) {
  if (!iso) return ''
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(new Date(iso))
  const get = type => (parts.find(p => p.type === type) || {}).value || ''
  return `${get('year')}-${get('month')}-${get('day')}`
}

function updateText(name) {
  const r = releases.value[name]
  if (!r) return '读取中…'
  return r.failed ? '—' : r.date
}

function versionText(name) {
  const r = releases.value[name]
  if (!r) return '读取中…'
  return r.failed ? '—' : r.version
}
</script>

<div class="projects-page">

  <header class="projects-header">
    <h1>个人项目</h1>
    <p> ———————— 一些“无聊”的小东西。</p>
  </header>

  <table class="projects-table">
    <thead>
      <tr>
        <th>项目名</th>
        <th>简述</th>
        <th>支持的系统</th>
        <th>最近一次更新</th>
        <th>最新版本</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in projects" :key="p.name">
        <td><a :href="p.link">{{ p.name }}</a></td>
        <td class="projects-desc">{{ p.desc }}</td>
        <td>{{ p.os }}</td>
        <td>{{ updateText(p.name) }}</td>
        <td>{{ versionText(p.name) }}</td>
      </tr>
    </tbody>
  </table>

</div>

<style>
.projects-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}
.projects-header {
  margin-bottom: 1rem;
}
.projects-header h1 {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
}
.projects-header p {
  margin: 0;
}
.projects-page .projects-table {
  width: 100%;
  margin-top: 1.5rem;
  border-collapse: collapse;
  font-size: 0.95rem;
}
.projects-table th,
.projects-table td {
  padding: 0.75rem 0.75rem 0.75rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: left;
  line-height: 1.6;
}
.projects-table th {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
  font-weight: 600;
}
.projects-table td {
  color: var(--vp-c-text-2);
}
.projects-table a {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.25s;
}
.projects-table a:hover {
  color: var(--vp-c-brand-1);
}
.projects-table .projects-desc {
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}
</style>
