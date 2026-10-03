---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: ""
  text: "<span class=\"hero-line\">为这个世界，做一名工程师。</span><span class=\"hero-sign\">—— 现在，我什么都不缺了。</span>"
  tagline: 
---

<script setup>
import { onMounted } from 'vue'

// 打字机：正文逐字打出，打完后落款直接闪现
const LINE_1 = '为这个世界，做一名工程师。'
const CHAR_MS = 70

function type(el, text, done) {
  el.classList.add('is-typing')
  let i = 0
  const step = () => {
    if (i > text.length) {
      el.classList.remove('is-typing')
      if (done) done()
      return
    }
    el.textContent = text.slice(0, i)
    i += 1
    setTimeout(step, CHAR_MS)
  }
  step()
}

onMounted(() => {
  const line = document.querySelector('.VPHero .hero-line')
  const sign = document.querySelector('.VPHero .hero-sign')
  if (!line || !sign) return
  // 系统开了"减少动态效果"就不做动画，直接显示完整句子
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  line.textContent = ''
  sign.style.visibility = 'hidden'
  type(line, LINE_1, () => {
    sign.style.visibility = ''
    sign.classList.add('is-flashing')
    setTimeout(() => sign.classList.remove('is-flashing'), 1600)
  })
})
</script>

<style>
/* hero 只剩一句话：横向居中（垂直位置不动），并给这句话加淡蓝底 */
.VPHero .main {
  width: 100%;
}
.VPHero .heading {
  align-items: center;
  text-align: center;
}
/* 正文那句话：去掉淡蓝底后不再需要额外样式。
   （.hero-line 标记保留着，想把底色加回来只需在这里补 background/padding/border-radius） */
.VPHero .text {
  max-width: none;
}
/* 落款：贴在正文那句话的右下角。
   参考值：正文末尾那个全角「。」字面只有 21px / 56px，右侧留白 35px；落款 18px 的「。」留白 11px。
   两块右边界本来就相同，所以 padding-right: 24px 时两行句号刚好对齐成一条竖线。
   现在 0 + margin-right: -8px，是在对齐位置的基础上再往右 32px（观感偏好，想回对齐就填 24px）。 */
.VPHero .hero-sign {
  display: block;
  margin-top: 10px;
  padding-right: 0;
  margin-right: -8px;
  text-align: right;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.7;
  letter-spacing: 0;
  color: var(--vp-c-text-3);
}
@media (max-width: 639px) {
  .VPHero .hero-sign {
    padding-right: 0;
  }
}
/* 打字机光标：正在打字的那行行尾，一个随文字颜色的方块光标 */
.VPHero .is-typing::after {
  content: '';
  display: inline-block;
  width: 0.5em;
  height: 1em;
  margin-left: 3px;
  vertical-align: -0.1em;
  background: currentColor;
  animation: hero-cursor-blink 1s step-end infinite;
}
@keyframes hero-cursor-blink {
  50% {
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .VPHero .is-typing::after {
    animation: none;
  }
}
/* 落款闪现：正文打完后出现，闪几下提醒，然后常亮 */
.VPHero .is-flashing {
  animation: hero-sign-flash 0.4s ease-in-out 3;
}
@keyframes hero-sign-flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.15;
  }
}
@media (prefers-reduced-motion: reduce) {
  .VPHero .is-flashing {
    animation: none;
  }
}
</style>
