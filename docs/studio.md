---
layout: page
title: 放映室
---

<div class="studio-page">

  <div class="section-divider">
    <span>💻 技术</span>
  </div>
  <div class="channel-grid">
    <ChannelCard icon="🚧" title="技术专栏 A" desc="敬请期待" :comingSoon="true" />
    <ChannelCard icon="🚧" title="技术专栏 B" desc="敬请期待" :comingSoon="true" />
    <ChannelCard icon="🚧" title="技术专栏 C" desc="敬请期待" :comingSoon="true" />
  </div>

  <div class="section-divider">
    <span>🎮 娱乐</span>
  </div>
  <div class="channel-grid">
    <ChannelCard icon="🗑️" title="捡垃圾" desc="二手好物、数码淘货记录" link="/junk-collection" />
    <ChannelCard icon="🚧" title="娱乐专栏 B" desc="敬请期待" :comingSoon="true" />
    <ChannelCard icon="🚧" title="娱乐专栏 C" desc="敬请期待" :comingSoon="true" />
  </div>

</div>

<style>
.studio-page {
  max-width: 900px;
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
.channel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
}
@media (max-width: 640px) {
  .channel-grid {
    grid-template-columns: 1fr;
  }
}
</style>
