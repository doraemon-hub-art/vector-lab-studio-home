---
title: more-effective-intrans
layout: page
---

<div class="project-page">

  <header class="project-header">
    <h1>more-effective-intrans</h1>
    <p class="project-tagline">一个轻量的拼音转英文翻译器。</p>
  </header>

  <div class="project-actions">
    <a class="download-btn" href="https://github.com/doraemon-hub-art/more-effective-intrans/releases/latest">下载 deb</a>
    <a class="repo-link" href="https://github.com/doraemon-hub-art/more-effective-intrans">源码仓库</a>
  </div>

  <!-- 要放截图：图丢进 docs/public/projects/，这里加 <img src="/projects/xxx.png" alt="..."> -->

  <h2>它是什么</h2>
  <p>写 NVim 时不用来回切中英文输入法：敲拼音，选词，英文直接落进焦点窗口。</p>

  <h2>装</h2>
  <p>deb 挂在 GitHub Releases 上，点上面的按钮下载后本地安装：</p>
  <pre><code>sudo apt install ./&lt;下载到的 deb 文件名&gt;</code></pre>
  <ul>
    <li>当前只支持 Linux + X11 会话，Wayland 下不可用（全局热键在 Linux 只实现了 X11）。</li>
  </ul>

  <h2>用</h2>
  <ol>
    <li>按 <code>Alt + ;</code> 唤出面板；</li>
    <li>在面板里敲拼音（例如 <code>pingguo</code>）回车，词库给出候选；</li>
    <li>按 <code>1</code> / <code>2</code> / <code>3</code> 或直接点击选一个词；</li>
    <li>译文直接落进"按热键那一刻焦点所在的窗口"里。</li>
  </ol>
  <p>程序常驻托盘，没有主窗口。托盘图标依赖系统的 SNI 宿主，GNOME 下由 <code>ubuntu-appindicators</code> 扩展提供（Ubuntu 默认自带）。</p>

  <h2>许可</h2>
  <p>GPL-3.0-only。技术选型、项目结构、开发细节见仓库里的 <code>docs/</code> 目录。</p>

</div>

<style>
.project-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;
}
.project-header h1 {
  margin: 0 0 0.25rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.3;
}
.project-tagline {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}
.project-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0 2.5rem;
}
.download-btn {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border: 1px solid var(--vp-button-brand-border);
  border-radius: 20px;
  background: var(--vp-button-brand-bg);
  color: var(--vp-button-brand-text);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.25s, border-color 0.25s;
}
.download-btn:hover {
  background: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
}
.repo-link {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  text-decoration: none;
}
.repo-link:hover {
  color: var(--vp-c-brand-1);
}
.project-page h2 {
  margin: 2.5rem 0 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}
.project-page p {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}
.project-page ul,
.project-page ol {
  margin: 0 0 1rem;
  padding-left: 1.25rem;
  color: var(--vp-c-text-2);
  line-height: 1.75;
}
.project-page li {
  margin: 0.2rem 0;
}
.project-page li p {
  margin: 0;
}
.project-page pre {
  margin: 0 0 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  overflow-x: auto;
}
.project-page pre code {
  background: none;
  padding: 0;
  font-size: 0.9rem;
}
</style>
