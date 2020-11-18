<template>
  <div id="app">
    <News :apiKey="apiKey"></News>
  </div>
</template>

<script>
import News from './components/News'

export default {
  name: 'App',
  components: {
    News
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
