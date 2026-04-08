import DefaultTheme from 'vitepress/theme'
import ChannelCard from './components/ChannelCard.vue'
import Timeline from './components/Timeline.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ChannelCard', ChannelCard)
    app.component('Timeline', Timeline)
  }
}
