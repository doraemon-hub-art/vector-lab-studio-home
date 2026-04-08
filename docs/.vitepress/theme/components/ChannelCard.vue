<template>
  <a :href="link" :class="['channel-card', { disabled: !link || comingSoon }]">
    <div class="channel-icon">{{ icon }}</div>
    <div class="channel-title">{{ title }}</div>
    <div class="channel-desc">{{ desc }}</div>
    <span v-if="comingSoon" class="channel-badge">建设中</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  desc: string
  link?: string
  comingSoon?: boolean
}>()
</script>

<style scoped>
.channel-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.8rem 1.6rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  width: 100%;
  text-decoration: none;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.channel-card:not(.disabled):hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}
.channel-card.disabled {
  opacity: 0.55;
  cursor: default;
  pointer-events: none;
}
.channel-icon { font-size: 2.4rem; }
.channel-title { font-weight: 600; font-size: 1.1rem; }
.channel-desc { font-size: 0.9rem; color: var(--vp-c-text-2); }
.channel-badge {
  margin-top: 0.3rem;
  display: inline-block;
  font-size: 0.72rem;
  padding: 2px 8px;
  border-radius: 20px;
  background: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-2);
  width: fit-content;
}
</style>
