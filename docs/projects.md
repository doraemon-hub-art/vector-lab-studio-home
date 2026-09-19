---
layout: page
title: 个人项目
---

<div class="projects-page">

  <header class="projects-header">
    <h1>个人项目</h1>
    <p>自己动手写的东西，都归置在这里。</p>
  </header>

  <!-- 加一个项目就照下面这个形状写：标题链到详情页，详情页放 docs/projects/<slug>.md
  ## [项目名](/projects/slug)
  两三行简介：它是干什么的、为什么做、做成什么样。
  -->

  <div class="project-slot">第一个项目待添加</div>

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
/* 项目条目：整条标题就是详情页入口，悬停变色并推出箭头 */
.projects-page h2 {
  margin: 2.5rem 0 0.5rem;
  padding-top: 1.5rem;
  font-size: 1.45rem;
  font-weight: 600;
  line-height: 1.4;
}
.projects-page h2 a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.25s;
}
.projects-page h2 a::after {
  content: '→';
  margin-left: 0.5rem;
  font-size: 1.1rem;
  color: var(--vp-c-text-3);
  transition: color 0.25s, margin-left 0.25s;
}
.projects-page h2 a:hover {
  color: var(--vp-c-brand-1);
}
.projects-page h2 a:hover::after {
  margin-left: 0.75rem;
  color: var(--vp-c-brand-1);
}
.projects-page p {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}
.project-slot {
  padding: 1.5rem;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}
</style>
