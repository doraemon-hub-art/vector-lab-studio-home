<script setup lang="ts">
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

const props = defineProps<{
  items: {
    date: string | number
    title: string
    desc?: string
    cover?: string
    videoUrl?: string
  }[]
}>()
</script>

<template>
  <div class="video-grid">
    <a
      v-for="(item, index) in items"
      :key="index"
      :href="item.videoUrl"
      target="_blank"
      rel="noopener"
      class="video-card"
    >
      <div class="video-cover-wrap">
        <img
          v-if="item.cover"
          :src="item.cover"
          :alt="item.title"
          loading="lazy"
          referrerpolicy="no-referrer"
          class="video-cover"
        />
      </div>
      <div class="video-title">{{ item.title }}</div>
      <div class="video-meta">
        <span v-if="item.desc" class="video-desc">{{ item.desc }}</span>
        <span class="video-date">{{ formatDate(item.date) }}</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.video-grid {
  display: grid;
  /* 每行最多 6 个卡片（配合放映室 1160px 容器），窗口变窄时自动减少列数 */
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 1rem;
}
.video-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-decoration: none;
  color: var(--vp-c-text-1);
}
.video-cover-wrap {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  aspect-ratio: 16 / 9;
}
.video-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.video-card:hover .video-cover-wrap {
  border-color: var(--vp-c-brand-1);
}
.video-card:hover .video-title {
  color: var(--vp-c-brand-1);
}
.video-title {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.video-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}
.video-desc {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.video-date {
  flex-shrink: 0;
}
@media (max-width: 640px) {
  .video-title {
    font-size: 0.8rem;
  }
}
</style>
