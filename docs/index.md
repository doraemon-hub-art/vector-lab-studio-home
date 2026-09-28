---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: ""
  text: "<span class=\"hero-line\">为这个世界，做一名工程师。</span><span class=\"hero-sign\">—— 现在，我什么都不缺了。</span>"
  tagline: 
---

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
</style>
