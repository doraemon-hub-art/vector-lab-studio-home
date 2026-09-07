---
layout: page
title: 放映室
---

<script setup>
import archives from '../bilibili_archives.json'

// 从 B站数据按标题【xx】标签取视频，转成网格卡片需要的字段
function toCardItems(videos) {
  return (videos || []).map(v => ({
    date: v.publish_time,
    title: v.title,
    desc: `${v.play_count.toLocaleString()} 播放`,
    cover: v.cover.replace(/^http:/, 'https:'),
    videoUrl: `https://www.bilibili.com/video/${v.bvid}`
  }))
}

const toolVideos = toCardItems(archives.data['【工具】'])
const junkVideos = toCardItems(archives.data['【捡垃圾】'])
const murmurVideos = toCardItems(archives.data['【牛码碎碎念】'])
</script>

<div class="studio-page">

  <div class="section-divider">
    <span>💻 技术</span>
  </div>
  <h2 class="channel-title">🔧 工具</h2>
  <p class="channel-desc">各种实用工具的使用心得与教程。</p>
  <VideoGrid :items="toolVideos" />

  <h2 class="channel-title">💬 牛码碎碎念</h2>
  <p class="channel-desc">工作中的编程心得与日常碎碎念。</p>
  <VideoGrid v-if="murmurVideos.length" :items="murmurVideos" />
  <p v-else class="channel-empty">该栏目暂无视频，敬请期待</p>

  <div class="section-divider">
    <span>🎮 娱乐</span>
  </div>
  <h2 class="channel-title">🗑️ 捡垃圾</h2>
  <p class="channel-desc">记录各种二手好物、数码淘货的经历与心得。</p>
  <VideoGrid :items="junkVideos" />

</div>

<style>
.studio-page {
  max-width: 1160px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}
.section-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2.5rem 0 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}
.section-divider::before,
.section-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--vp-c-divider);
}
.channel-title {
  font-size: 1.35rem;
  font-weight: 600;
  /* 同一大分区内栏目之间的大间隔 */
  margin: 3rem 0 0.2rem;
}
/* 紧跟分区线的首个栏目：间隔由分区线承担，不再叠加 */
.section-divider + .channel-title {
  margin-top: 0.5rem;
}
.channel-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}
.channel-empty {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  padding: 1rem 0 2rem;
}
</style>
