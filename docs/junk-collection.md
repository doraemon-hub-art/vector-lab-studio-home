---
layout: page
title: 捡垃圾
---

<div class="junk-page">
  <h1>🗑️ 捡垃圾</h1>
  <p class="subtitle">记录各种二手好物、数码淘货的经历与心得。</p>
  <Timeline :items="[
    {
      date: '2024-12-10',
      title: '测试 Demo1',
      desc: '测试数据1',
      cover: 'https://picsum.photos/seed/demo1/480/270',
      videoUrl: 'https://www.bilibili.com/video/BV1xx411c7mD',
      platform: 'bilibili'
    },
    {
      date: '2024-11-03',
      title: '测试 Demo2',
      desc: '测试数据2',
      cover: 'https://picsum.photos/seed/demo2/480/270',
      videoUrl: 'https://www.bilibili.com/video/BV1xx411c7mE',
      platform: 'bilibili'
    },
    {
      date: '2024-09-21',
      title: '测试 Demo3',
      desc: '测试数据3',
      cover: 'https://picsum.photos/seed/demo3/480/270',
      videoUrl: 'https://www.bilibili.com/video/BV1xx411c7mF',
      platform: 'bilibili'
    }
  ]" />
</div>

<style>
.junk-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}
.junk-page h1 {
  font-size: 2rem;
  margin-bottom: 0.4rem;
}
.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 3rem;
}
</style>
