import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "半生瓜の四次元口袋",
  description: "为这个世界，做一名工程师。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '放映室', link: '/studio' },
      { text: '回到主站', link: 'https://banshengua.top/' }, // 外站必须添加https头
      { text: '笔记站', link: 'https://doc.banshengua.top/'}
    ],
    sidebar: [],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/doraemon-hub-art' }
    ]
  }
})
