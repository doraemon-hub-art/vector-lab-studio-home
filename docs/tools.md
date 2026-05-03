---
layout: page
title: 工具
---

<script setup>
import archives from '../bilibili_archives.json'

const toolVideos = (archives.data['【工具】'] || []).map(v => ({
  date: v.publish_time,
  title: v.title,
  desc: `播放量: ${v.play_count.toLocaleString()}`,
  cover: v.cover.replace(/^http:/, 'https:'),
  videoUrl: `https://www.bilibili.com/video/${v.bvid}`
}))
</script>

<div class="tools-page">
  <h1>🔧 工具</h1>
  <p class="subtitle">各种实用工具的使用心得与教程。</p>
  <Timeline :items="toolVideos" />
</div>

<style>
.tools-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}
.tools-page h1 {
  font-size: 2rem;
  margin-bottom: 0.4rem;
}
.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
}
</style>
