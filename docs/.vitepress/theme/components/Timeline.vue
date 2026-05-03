<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  items: {
    date: string | number
    title: string
    desc?: string
    cover?: string
    videoUrl?: string
    platform?: string
    bvid?: string
  }[]
}>()

function formatDate(date: string | number): string {
  // 如果是数字（秒级时间戳），格式化为 YYYY-MM-DD
  if (typeof date === 'number') {
    const d = new Date(date * 1000)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  }
  return date
}
</script>

<template>
  <div class="timeline">
    <div v-for="(item, index) in items" :key="index" class="timeline-item">
      <div class="timeline-left">
        <div class="timeline-date">{{ formatDate(item.date) }}</div>
        <div class="timeline-line">
          <div class="timeline-dot"></div>
        </div>
      </div>
      <a :href="item.videoUrl" target="_blank" rel="noopener" class="timeline-card">
        <img v-if="item.cover" :src="item.cover" :alt="item.title" referrerpolicy="no-referrer" class="timeline-cover" />
        <div class="timeline-info">
          <div class="timeline-title">{{ item.title }}</div>
          <div v-if="item.desc" class="timeline-desc">{{ item.desc }}</div>
        </div>
      </a>
    </div>
  </div>
</template>


<style scoped>
.timeline {
  position: relative;
  padding: 0.5rem 0;
}
.timeline-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}
.timeline-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  flex-shrink: 0;
}
.timeline-date {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
  text-align: center;
  margin-bottom: 0.4rem;
  white-space: nowrap;
}
.timeline-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-height: 100px;
}
.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.timeline-line::after {
  content: '';
  width: 2px;
  flex: 1;
  background: var(--vp-c-divider);
  margin-top: 4px;
}
.timeline-item:last-child .timeline-line::after {
  display: none;
}
.timeline-card {
  flex: 1;
  display: flex;
  gap: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.timeline-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.timeline-cover {
  width: 180px;
  height: 101px;
  object-fit: cover;
  flex-shrink: 0;
}
.timeline-info {
  padding: 0.8rem 1rem 0.8rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.timeline-title {
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.4;
}
.timeline-desc {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
@media (max-width: 640px) {
  .timeline-card { flex-direction: column; }
  .timeline-cover { width: 100%; height: auto; }
  .timeline-info { padding: 0.8rem; }
}
</style>
