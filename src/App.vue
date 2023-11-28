<script>
import '@/scss/style.scss'

import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<template>
  <div id="app">
    <Header />
    <router-view/>

  </div>
</template>

<style lang="scss">
.router-link-exact-active {
    color: #42b983;
}
</style>
